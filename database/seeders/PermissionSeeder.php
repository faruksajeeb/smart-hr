<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            // "users.view",
            // "users.edit",
            // "users.create",
            // "users.delete",
            // "roles.view",
            // "roles.edit",
            // "roles.create",
            // "roles.delete",
            // "employees.view",
            // "employees.edit",
            // "employees.create",
            // "employees.delete",
        ];

        foreach($permissions as $key => $permission):
            Permission::create([
                'name' => $permission
            ]);
        endforeach;
    }
}
