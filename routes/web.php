<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\MasterDataController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});
Route::middleware(['auth'])->group(function () {
    Route::resource('posts', PostController::class);
    Route::resource('users', UserController::class);
    Route::resource('roles', RoleController::class);
    Route::resource('master_data', MasterDataController::class);
    Route::get('/master_data_export', [MasterDataController::class, 'export'])->name('master_data.export');
    Route::put('master_data/{id}/toggle-status', [MasterDataController::class, 'toggleStatus'])
    ->name('master_data.toggleStatus');
    Route::post('/master_data/bulk-delete', [MasterDataController::class, 'bulkDelete'])->name('master_data.bulkDelete');
    Route::post('/master_data/bulk-toggle', [MasterDataController::class, 'bulkToggle'])->name('master_data.bulkToggle');


});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
