<?php

namespace App\Http\Controllers;

use App\Models\MasterData;
use App\Enums\MasterDataType;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MasterDataController extends Controller
{
    
    public function index()
    {
        $master_data = MasterData::all();
        return Inertia::render('master_data/index',['master_data'=>$master_data]);
    }


    public function create()
    {
        // $types = [
        //     'blood_group',
        //     'grade',
        //     'bank',
        //     'religion',
        //     'designation',
        //     'department',
        //     'division',
        //     'company',
        //     'branch',
        // ];


$types = MasterDataType::values();

        return Inertia::render('master_data/create',[
            'types' => $types
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'body' => 'required'
        ]);

        MasterData::create([
            'title' => $request->title,
            'body' => $request->body,
        ]);

        return redirect()->route('master_data.index');
    }


    public function show(string $id)
    {
        //
    }


    public function edit(string $id)
    {
        $post = MasterData::find($id);
        return Inertia::render('master_data/edit',['post'=>$post]);
    }


    public function update(Request $request, string $id)
    {
        $request->validate([
            'title' => 'required',
            'body' => 'required'
        ]);

        $post = MasterData::find($id);
        $post->title = $request->title;
        $post->body = $request->body;
        $post->save();

        return redirect()->route('master_data.index');
    }

    public function destroy(string $id)
    {
        MasterData::destroy($id);
        return redirect()->route('master_data.index');
    }
}
