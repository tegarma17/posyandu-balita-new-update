<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Balita;
use App\Models\Pengukuran;
use App\Models\Wilayah;
use App\Models\Posyandu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PengukuranController extends Controller
{
    public function index()
    {
        $pengukuran = Pengukuran::all();
        return Inertia::render('Pengukuran/Index', compact('pengukuran'));
    }
    public function editPengukuran(Balita $balita)
    {
        $wilayah = Wilayah::all();
        $posyandu = Posyandu::all();
        $pengukuran = Pengukuran::where('balita_id', $balita->id)->get();
        return Inertia::render('Pengukuran/addPengukuran', [
            'balita' => $balita,
            'posyandu' => $posyandu,
            'wilayah' => $wilayah,
            'pengukuran' => $pengukuran,
        ]);
    }
    public function simpanPengukuran(Request $request)
    {
        $user = Auth::user()->id;

        // $message = [
        //     'required' => ':attribute Harap wajib diisi',
        //     'date' => ':attribute Format Harus Tanggal',
        //     'numeric' => ':attribute Format Harus Angka'
        // ];
        // $atribute = [
        //     'balita_id' => 'Kode Balita',
        //     'posyandu_id' => 'Kode Posyandu',
        //     'tb' => 'Tinggi Badan',
        //     'j_pengukuran' => 'Jenis Pengukuran',
        //     'usia' => 'Usia',
        //     'tgl_pengukuran' => 'Tanggal Pengukuran',
        // ];


        $validated =  $request->validate([
            'balita_id' => 'required',
            'posyandu_id' => 'required',
            'usia' => 'required',
            'tb' => 'required',
            'j_pengukuran' => 'required',
        ]);

        $dataPengukuran = [
            'balita_id' => $validated['balita_id'],
            'posyandu_id' => $validated['posyandu_id'],
            'j_pengukuran' => $validated['j_pengukuran'],
            'usia' => $validated['usia'],
            'tb' => $validated['tb'],
            'ditambahkan_by' => $user,
            'diedit_by' =>  $user,
            'tgl_pengukuran' => date(now()),
        ];
        Pengukuran::create($dataPengukuran);
        return back()->with('success', 'Data Pengukuran Balita Berhasil Disimpan');
    }
}
