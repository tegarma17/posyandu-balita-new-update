<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Nakes;
use App\Models\Wilayah;
use App\Models\Posyandu;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class PosyanduController extends Controller
{
    public function index()
    {
        $posyandu = Posyandu::with('nakes')->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'pj_name' => $item->nakes->nama ?? '—',
                    'nama_posyandu' => $item->nama_posyandu,
                    'alamat' => $item->alamat,
                    'jadwal' => $item->jadwal,
                    'status' => $item->status,

                ];
            });

        return Inertia::render('Posyandu/Index', compact('posyandu'));
    }
    public function add()
    {
        $wilayah = Wilayah::all();
        $nakes = Nakes::all();
        return Inertia::render('Posyandu/Tambah', [
            'wilayah' => $wilayah,
            'nakes' => $nakes
        ]);
    }
    public function simpan(Request $request)
    {
        $user = Auth::user()->id;


        $message = [
            'required' => ':attribute Harap wajib diisi',
            'regex' => ':attribute Format Tidak Sesuai',
            'date' => ':attribute Format Harus Tanggal',
            'numeric' => ':attribute Format Harus Angka'
        ];
        $atribute = [
            'wilayah_id' => 'Kode Wilayah',
            'nama_posyandu' => 'Nama Posyandu',
            'alamat' => 'Alamat Posyandu',
            'rt' => 'RT Posyandu',
            'rw' => 'RW Posyandu',
            'pj' => 'Penanggung Jawab Posyandu',
            'no_hp' => 'Nomer Hp Posyandu',
            'dibuat_oleh' => 'Pembuat Data Posyandu',
            'diupdate_oleh' => 'Pengupdate DataPosyandu',
            'jadwal' => 'Jadwal Posyandu',
            'status' => 'Status Posyandu',

        ];
        $validated =  $request->validate([
            'wilayah_id' => 'required',
            'nama_posyandu' => 'required',
            'alamat' => 'required',
            'rt' => 'required',
            'rw' => 'required',
            'pj' => 'required',
            'jadwal' => 'date|required',
        ], $message, $atribute);

        $cek =  Nakes::find($validated['pj']);
        $no_hp = $cek ? $cek->no_hp : null;

        $dataPosyandu = [
            'wilayah_id' => $validated['wilayah_id'],
            'nama_posyandu' => $validated['nama_posyandu'],
            'alamat' => $validated['alamat'],
            'rt' => $validated['rt'],
            'rw' => $validated['rw'],
            'pj' => $validated['pj'],
            'no_hp' => $no_hp,
            'dibuat_oleh' => $user,
            'diupdate_oleh' => $user,
            'jadwal' => $validated['jadwal'],
            'status' => 'aktif',
        ];
        Posyandu::create($dataPosyandu);
        return redirect()->route('posyandu.index')->with('message', 'Data Posyandu berhasil ditambah');
    }
    public function view(Posyandu $posyandu)
    {
        $wilayah = Wilayah::all();
        $nakes = Nakes::all();
        return Inertia::render('Posyandu/Edit', [
            'posyandu' => $posyandu,
            'wilayah' => $wilayah,
            'nakes' => $nakes
        ]);
    }

    public function updateStatus(Request $request, Posyandu $posyandu)
    {
        $user = Auth::user()->id;
        $request->validate([
            'status' => 'required|in:aktif,nonaktif,ditunda,selesai'
        ]);
        $posyandu->update([
            'status' => $request->status,
            'diupdate_oleh' => $user
        ]);
        return back()->with('message', 'Status Posyandu berhasil dirubah');
    }

    public function update(Request $request, Posyandu $posyandu)
    {
        $user = Auth::user()->id;
        $message = [
            'required' => ':attribute Harap wajib diisi',
            'regex' => ':attribute Format Tidak Sesuai',
            'date' => ':attribute Format Harus Tanggal',
            'numeric' => ':attribute Format Harus Angka'
        ];
        $atribute = [
            'wilayah_id' => 'Kode Wilayah',
            'nama_posyandu' => 'Nama Posyandu',
            'alamat' => 'Alamat Posyandu',
            'rt' => 'RT Posyandu',
            'rw' => 'RW Posyandu',
            'pj' => 'Penanggung Jawab Posyandu',
            'no_hp' => 'Nomer Hp Posyandu',
            'dibuat_oleh' => 'Pembuat Data Posyandu',
            'diupdate_oleh' => 'Pengupdate DataPosyandu',
            'jadwal' => 'Jadwal Posyandu',
            'status' => 'Status Posyandu',

        ];
        $request->validate([
            'wilayah_id' => 'required',
            'nama_posyandu' => 'required',
            'alamat' => 'required',
            'rt' => 'required',
            'rw' => 'required',
            'pj' => 'required',
            'jadwal' => 'date|required',
        ], $message, $atribute);

        $cek =  Nakes::find($request->input('pj'));
        $no_hp = $cek ? $cek->no_hp : null;

        $posyandu->update([
            'wilayah_id' => $request->input('wilayah_id'),
            'nama_posyandu' => $request->input('nama_posyandu'),
            'alamat' => $request->input('alamat'),
            'rt' => $request->input('rt'),
            'rw' => $request->input('rw'),
            'pj' => $request->input('pj'),
            'no_hp' => $no_hp,
            'jadwal' => $request->input('jadwal'),
        ]);

        return redirect()->route('posyandu.index')->with('message', 'Data Posyandu berhasil diupdate');
    }
    public function delete(Posyandu $posyandu)
    {
        $posyandu->delete();
        return redirect()->route('wilayah.index')->with('message', 'Data Posyandu berhasil dihapus');
    }
}
