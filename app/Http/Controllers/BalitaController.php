<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Balita;
use Illuminate\Http\Request;

class BalitaController extends Controller
{
    public function index()
    {
        $balita = Balita::all();
        return Inertia::render('Balita/Index', compact('balita'));
    }

    public function add()
    {
        return Inertia::render('Balita/Tambah');
    }
    public function store(Request $request)
    {
        $message = [
            'required' => ':attribute Harap wajib diisi',
            'date' => ':attribute gunakan forma tanggal yang benar',
            'numeric' => ':attribute Harap diisi dengan angka',
            'max' => ':atribute Terlalu panjang, maksimal :max karakter',
            'regex' => ':attribute format tidak valid',
            'unique' => ':attribute sudah terdaftar',
        ];
        $atribute = [
            'nik' => 'NIK',
            'nama' => 'Nama',
            'jk' => 'Jenis Kelamin',
            'tgl_lahir' => 'Tanggal Lahir',
            'bb_awal' => 'Berat Badan Awal',
            'tb_awal' => 'Tinggi Badan Awal',
            'nama_ortu' => 'Nama Orang Tua',
            'no_hp' => 'No Handphone',
            'anak_ke' => 'Anak Ke',
            'alamat' => 'Alamat',
            'rt' => 'RT',
            'rw' => 'RW',
        ];

        $validated =  $request->validate([

            'nik' => 'required|unique:balita,nik,|max:16',
            'nama' => 'required|regex:/^[a-zA-Z\s]+$/',
            'jk' => 'required',
            'tgl_lahir' => 'required|date',
            'bb_awal' => 'required|numeric',
            'tb_awal' => 'required|numeric',
            'nama_ortu' => 'required|regex:/^[a-zA-Z\s]+$/',
            'no_hp' => 'required|regex:/^08[0-9]{8,10}$/|numeric',
            'anak_ke' => 'required|numeric',
            'alamat' => 'required',
            'rt' => 'required|numeric',
            'rw' => 'required|numeric',
        ], $message, $atribute);

        $user =  [
            'name' => $validated['nama'],
            'email' => $validated['nik'],
            'password' => bcrypt('balita123'),
            'role_id' => 3
        ];
        User::create($user);
        $dataBalita = [
            'user_id' => User::where('email', $validated['nik'])->first()->id,
            'nik' => $validated['nik'],
            'nama' => $validated['nama'],
            'jk' => $validated['jk'],
            'tgl_lahir' => $validated['tgl_lahir'],
            'bb_awal' => $validated['bb_awal'],
            'tb_awal' => $validated['tb_awal'],
            'nama_ortu' => $validated['nama_ortu'],
            'no_hp' => $validated['no_hp'],
            'anak_ke' => $validated['anak_ke'],
            'alamat' => $validated['alamat'],
            'rt' => $validated['rt'],
            'rw' => $validated['rw'],
        ];
        Balita::create($dataBalita);
        return redirect()->route('balita.index')->with('message', 'Data balita berhasil ditambah');
    }
    public function view(Balita $balita)
    {
        return Inertia::render('Balita/Edit', compact('balita'));
    }
    public function update(Request $request, Balita $balita)
    {
        $message = [
            'required' => ':attribute Harap wajib diisi',
            'date' => ':attribute gunakan forma tanggal yang benar',
            'numeric' => ':attribute Harap diisi dengan angka',
            'max' => ':atribute Terlalu panjang, maksimal :max karakter',
            'regex' => ':attribute format tidak valid',
            'unique' => ':attribute sudah terdaftar',
        ];
        $atribute = [
            'nik' => 'NIK',
            'nama' => 'Nama',
            'jk' => 'Jenis Kelamin',
            'tgl_lahir' => 'Tanggal Lahir',
            'bb_awal' => 'Berat Badan Awal',
            'tb_awal' => 'Tinggi Badan Awal',
            'nama_ortu' => 'Nama Orang Tua',
            'no_hp' => 'No Handphone',
            'anak_ke' => 'Anak Ke',
            'alamat' => 'Alamat',
            'rt' => 'RT',
            'rw' => 'RW',
        ];
        $request->validate([

            'nik' => 'required|max:16',
            'nama' => 'required|regex:/^[a-zA-Z\s]+$/',
            'jk' => 'required',
            'tgl_lahir' => 'required|date',
            'bb_awal' => 'required|numeric',
            'tb_awal' => 'required|numeric',
            'nama_ortu' => 'required|regex:/^[a-zA-Z\s]+$/',
            'no_hp' => 'required|regex:/^08[0-9]{8,10}$/|numeric',
            'anak_ke' => 'required|numeric',
            'alamat' => 'required',
            'rt' => 'required|numeric',
            'rw' => 'required|numeric',
        ]);

        $balita->update([
            'nik' => $request->input('nik'),
            'nama' => $request->input('nama'),
            'jk' => $request->input('jk'),
            'tgl_lahir' => $request->input('tgl_lahir'),
            'bb_awal' => $request->input('bb_awal'),
            'tb_awal' => $request->input('tb_awal'),
            'nama_ortu' => $request->input('nama_ortu'),
            'no_hp' => $request->input('no_hp'),
            'anak_ke' => $request->input('anak_ke'),
            'alamat' => $request->input('alamat'),
            'rt' => $request->input('rt'),
            'rw' => $request->input('rw'),
        ]);
        return redirect()->route('balita.index')->with('message', 'Data balita berhasil diupdate');
    }
    public function delete(Balita $balita)
    {
        $balita->delete();
        $user_id = User::where('id', $balita->user_id)->first();
        $user_id->delete();
        return redirect()->route('balita.index')->with('message', 'Data balita berhasil dihapus');
    }
}
