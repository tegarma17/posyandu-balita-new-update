<?php

use App\Http\Controllers\BalitaController;
use App\Http\Controllers\KmsController;
use App\Http\Controllers\NakesController;
use App\Http\Controllers\PengukuranController;
use App\Http\Controllers\PosyanduController;
use App\Http\Controllers\WilayahController;
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

    Route::get('/data-wilayah', [WilayahController::class, 'index'])->name('wilayah.index');
    Route::get('/tambah-data-wilayah', [WilayahController::class, 'add'])->name('wilayah.tambah');
    Route::post('/simpan-data-wilayah', [WilayahController::class, 'simpan'])->name('wilayah.simpan');
    Route::get('/tampil-data-wilayah/{wilayah}', [WilayahController::class, 'view'])->name('wilayah.view');
    Route::put('/data-wilayah/{wilayah}/update', [WilayahController::class, 'update'])->name('wilayah.update');
    Route::delete('/hapus-data-wilayah/{wilayah}/delete', [WilayahController::class, 'delete'])->name('wilayah.hapus');

    Route::get('/data-posyandu', [PosyanduController::class, 'index'])->name('posyandu.index');
    Route::get('/tambah-data-posyandu', [PosyanduController::class, 'add'])->name('posyandu.tambah');
    Route::post('/simpan-data-posyandu', [PosyanduController::class, 'simpan'])->name('posyandu.simpan');
    Route::get('/tampil-data-posyandu/{posyandu}', [PosyanduController::class, 'view'])->name('posyandu.view');
    Route::put('/data-posyandu/{posyandu}/status-update', [PosyanduController::class, 'updateStatus'])->name('posyandu.status.update');
    Route::put('/data-posyandu/{posyandu}/update', [PosyanduController::class, 'update'])->name('posyandu.update');

    Route::get('/data-pengukuran-balita', [PengukuranController::class, 'index'])->name('pengukuran.index');
    Route::get('/data-pengukuran/{balita}', [PengukuranController::class, 'editPengukuran'])->name('pengukuran.balita');
    Route::post('/data-pengukuran-balita/simpan', [PengukuranController::class, 'simpanPengukuran'])->name('pengukuran.simpan');

    Route::get('/grafik-data-kms', [KmsController::class, 'index'])->name('kms.index');
    Route::get('/grafik-data-kms/{posyandu}', [KmsController::class, 'viewBalitabyPosyandu'])->name('kms.balitaByPosyandu');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
