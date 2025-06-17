<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{

    public function index()
    {
        $posts = Post::all();
        return Inertia::render('posts/index',['posts'=>$posts]);
    }


    public function create()
    {
        return Inertia::render('posts/create',[]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'body' => 'required'
        ]);

        Post::create([
            'title' => $request->title,
            'body' => $request->body,
        ]);

        return redirect()->route('posts.index');
    }


    public function show(string $id)
    {
        //
    }


    public function edit(string $id)
    {
        $post = Post::find($id);
        return Inertia::render('posts/edit',['post'=>$post]);
    }


    public function update(Request $request, string $id)
    {
        $request->validate([
            'title' => 'required',
            'body' => 'required'
        ]);

        $post = Post::find($id);
        $post->title = $request->title;
        $post->body = $request->body;
        $post->save();

        return redirect()->route('posts.index');
    }

    public function destroy(string $id)
    {
        Post::destroy($id);
        return redirect()->route('posts.index');
    }
}
