<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class KmsController extends Controller
{
    public function index()
    {
        return Inertia::render('Kms/Grafik', []);
    }
}
