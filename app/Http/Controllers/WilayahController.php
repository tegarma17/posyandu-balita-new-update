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
    public function add()
    {
        return Inertia::render('Wilayah/Tambah');
    }
    public function simpan(Request $request)
    {
        $message = [
            'required' => ':attribute Harap wajib diisi',
        ];
        $atribute = [
            'kd_wilayah' => 'Kode Wilayah',
            'nama_wilayah' => 'Nama Wilayah',

        ];
        $validated =  $request->validate([
            'kd_wilayah' => 'required',
            'nama_wilayah' => 'required',
        ], $message, $atribute);
        $dataWilayah = [
            'kd_wilayah' => $validated['kd_wilayah'],
            'nama_wilayah' => $validated['nama_wilayah'],
        ];
        Wilayah::create($dataWilayah);
        return redirect()->route('wilayah.index')->with('message', 'Data Wilayah berhasil ditambah');
    }
    public function view(Wilayah $wilayah)
    {
        return Inertia::render('Wilayah/Edit', compact('wilayah'));
    }
}
