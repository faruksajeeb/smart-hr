<?php

namespace App\Providers;

use App\Models\MasterData;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Force Laravel to use master_data instead of master_datum
        Route::model('master_data', MasterData::class);
    }
}
