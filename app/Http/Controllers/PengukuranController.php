<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Balita;
use Illuminate\Http\Request;

class PengukuranController extends Controller
{
    public function index()
    {
        $balita = Balita::all();
        return Inertia::render('Pengukuran/Index', compact('balita'));
    }
    public function editPengukuran()
    {
        return Inertia::render('Pengukuran/addPengukuran');
    }
}
