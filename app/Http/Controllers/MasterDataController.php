<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\MasterData;
use App\Enums\MasterDataType;

use Illuminate\Http\Request;
use App\Http\Requests\StoreMasterDataRequest;
use App\Http\Requests\UpdateMasterDataRequest;

use App\Exports\MasterDataExport;
use Maatwebsite\Excel\Facades\Excel;

use Inertia\Inertia;

class MasterDataController extends Controller
{
    public function index(Request $request)
    {
        //sleep(2); // Delay for 2 seconds
        if (!auth()->user()->can('master_data.view')) {
            abort(403, 'Unauthorized');
        }

        $query = MasterData::with('parent');

        // Apply search filter
        if ($request->filled('search')) {
            $searchTerm = $request->input('search');
            $query->where(function ($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                ->orWhere('code', 'like', "%{$searchTerm}%")
                ->orWhere('type', 'like', "%{$searchTerm}%");
            });
        }

        // Filter by type if provided
        if ($request->filled('type')) {
            $query->where('type', $request->input('type'));
        }

        // Filter by type if provided
        if ($request->filled('parent')) {
            $query->where('parent_id', $request->input('parent'));
        }

        // Filter by status if provided
        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        $sort = $request->get('sortBy', 'id');
        $direction = $request->get('direction', 'desc');

        $query->orderBy($sort, $direction);

        // Paginate with query string
        $perPage = $request->get('perPage', 10);

        $master_data = $query->paginate($perPage)->withQueryString();

        return Inertia::render('master_data/index', [
            'types' =>  MasterDataType::values(),
            'parents' => MasterData::whereNull('parent_id')->get(),
            'master_data' => $master_data,
            'filters' => $request->only('search', 'type','parent', 'status', 'sortBy', 'direction', 'perPage'),
        ]);
    }

    public function export(Request $request)
    {
        if (!auth()->user()->can('master_data.export')) {
            abort(403, 'Unauthorized');
        }
        $filters = $request->only(['type', 'status','parent', 'search']);

        return Excel::download(new MasterDataExport($filters), 'master_data.xlsx');
    }

    public function create()
    {
       
        if (!auth()->user()->can('master_data.create')) {
            abort(403, 'Unauthorized');
        }
        $types = MasterDataType::values();
        $parents = MasterData::whereNull('parent_id')->get();
        
        return Inertia::render('master_data/create',[
            'types' => $types,
            'parents' => $parents,
        ]);
    }


    public function store(StoreMasterDataRequest $request)
    {
        MasterData::create($request->validated());
        return redirect()->route('master_data.index')->with('success', 'Master Data added successfully.');
    }


    public function show(string $id)
    {
        //
    }


    public function edit($id)
    {
        if (!auth()->user()->can('master_data.edit')) {
            abort(403, 'Unauthorized');
        }
        $master_data = MasterData::find($id);

        return Inertia::render('master_data/edit', [
            'master_data' => $master_data,
            'types' => MasterDataType::values(),
            'parents' => MasterData::whereNull('parent_id')->where('id', '!=', $master_data->id)->get(),
        ]);
    }


    public function update(UpdateMasterDataRequest $request, $id)
    {
        $master_data = MasterData::find($id);
        $master_data->update($request->validated());
        return redirect()->route('master_data.index')->with('success', 'Master Data updated successfully.');
    }
    

    public function destroy(string $id)
    {
        if (!auth()->user()->can('master_data.delete')) {
            abort(403, 'Unauthorized');
        }
        MasterData::destroy($id);
        return redirect()->route('master_data.index')->with('success', 'Master Data deleted successfully.');
    }

    public function toggleStatus($id)
    {
        if (!auth()->user()->can('master_data.edit')) {
            abort(403, 'Unauthorized');
        }
        $record = MasterData::findOrFail($id);
        $record->status = !$record->status;
        $record->save();

        return back()->with('success', 'Status updated successfully.');
    }

    public function bulkDelete(Request $request)
    {
        if (!auth()->user()->can('master_data.delete')) {
            abort(403, 'Unauthorized');
        }
        MasterData::whereIn('id', $request->ids)->delete();
        return back()->with('success', 'Selected items deleted.');
    }

    public function bulkToggle(Request $request)
    {
        if (!auth()->user()->can('master_data.edit')) {
            abort(403, 'Unauthorized');
        }
        $items = MasterData::whereIn('id', $request->ids)->get();
        foreach ($items as $item) {
            $item->status = !$item->status;
            $item->save();
        }
        return back()->with('success', 'Status toggled for selected items.');
    }

}
