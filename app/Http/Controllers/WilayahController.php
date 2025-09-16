<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Wilayah;
use Illuminate\Http\Request;

class WilayahController extends Controller
{
    public function index()
    {
        $wilayah = Wilayah::all();
        return Inertia::render('Wilayah/Index', compact('wilayah'));
    }
}
