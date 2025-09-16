<?php

use App\Http\Controllers\BalitaController;
use App\Http\Controllers\NakesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


    Route::get('/data-balita', [BalitaController::class, 'index'])->name('balita.index');
    Route::get('/tambah-data-balita-baru', [BalitaController::class, 'add'])->name('balita.create');
    Route::post('/simpan-data-balita-baru', [BalitaController::class, 'store'])->name('balita.simpan');
    Route::get('/tampil-data-balita/{balita}', [BalitaController::class, 'view'])->name('balita.view');
    Route::put('/update-data-balita/{balita}', [BalitaController::class, 'update'])->name('balita.update');
    Route::delete('/hapus-data-balita/{balita}', [BalitaController::class, 'delete'])->name('balita.hapus');

    Route::get('/data-nakes', [NakesController::class, 'index'])->name('nakes.index');
    Route::get('/tambah-data-nakes', [NakesController::class, 'add'])->name('nakes.tambah');
    Route::post('/simpan-data-nakes', [NakesController::class, 'simpan'])->name('nakes.simpan');
    Route::get('/tampil-data-nakes/{nakes}', [NakesController::class, 'view'])->name('nakes.view');
    Route::put('/update-data-nakes/{nakes}/update', [NakesController::class, 'update'])->name('nakes.update');
    Route::delete('/hapus-data-nakes/{nakes}/delete', [NakesController::class, 'delete'])->name('nakes.hapus');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
