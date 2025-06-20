<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;

class RoleController extends Controller
{
 
    public function index()
    {
        $roles = Role::with('permissions')->get();
        return Inertia::render('roles/index',['roles'=>$roles]);
    }

    public function create()
    {
        $permissions = Permission::pluck('name');
        return Inertia::render('roles/create',['permissions'=>$permissions]);
    }

    public function store(Request $request)
    {
        
        $request->validate([
            'name' => 'required',
        ]);

        $role = Role::create([
            'name' => $request->name,
        ]);

        $role->syncPermissions($request->permissions);

        return redirect()->route('roles.index');
    }

 
    public function show(string $id)
    {
        $role = Role::find($id);
        return Inertia::render('roles/show',[
            'role'=>$role,
            'permissions' => $role->permissions->pluck('name')
        ]);
    }

    public function edit(string $id)
    {
        $role = Role::find($id);
        $permissions = Permission::pluck('name');
        $rolePermissions = $role->permissions->pluck('name');
        return Inertia::render('roles/edit',[
            'role' => $role, 
            'permissions' => $permissions,
            'rolePermissions' => $rolePermissions
        ]);
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $role = Role::find($id);
        $role->name = $request->name;
        $role->save();

        $role->syncPermissions($request->permissions);

        return redirect()->route('roles.index');
    }

    public function destroy(string $id)
    {
        Role::destroy($id);
        return redirect()->route('roles.index');
    }
}
