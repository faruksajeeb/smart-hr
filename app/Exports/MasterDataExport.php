<?php

namespace App\Exports;

use App\Models\MasterData;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;

class MasterDataExport implements FromCollection, WithHeadings
{
    protected $filters;

    public function __construct(array $filters = [])
    {
        $this->filters = $filters;
    }

    public function collection()
    {
        $query = MasterData::with('parent');

        if (!empty($this->filters['type'])) {
            $query->where('type', $this->filters['type']);
        }

        if (!empty($this->filters['parent'])) {
            $query->where('parent_id', $this->filters['parent']);
        }

        if (isset($this->filters['status']) && $this->filters['status'] !== '') {
            $query->where('status', $this->filters['status']);
        }

        if (!empty($this->filters['search'])) {
            //$query->where('name', 'like', '%' . $this->filters['search'] . '%');
            $searchTerm = $this->filters['search'];
            $query->where(function ($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                ->orWhere('code', 'like', "%{$searchTerm}%")
                ->orWhere('type', 'like', "%{$searchTerm}%");
            });
        }

        return $query->get()->map(function ($data) {
            return [
                // 'ID' => $data->id,
                'Type' => $data->type,
                'Name' => $data->name,
                'Code' => $data->code,
                'Parent Name' => optional($data->parent)->name,
                'Status' => $data->status ? 'Active' : 'Inactive',
            ];
        });
    }

    public function headings(): array
    {
        return [
            // 'ID',
            'Type',
            'Name',
            'Code',
            'Parent Name',
            'Status',
        ];
    }
}

