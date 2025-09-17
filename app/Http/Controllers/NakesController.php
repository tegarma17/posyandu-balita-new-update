<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Nakes;
use Illuminate\Http\Request;

class NakesController extends Controller
{
    public function index()
    {
        $nakes = Nakes::all();
        return Inertia::render('Nakes/Index', compact('nakes'));
    }

    public function add()
    {
        return Inertia::render('Nakes/Tambah');
    }
    public function simpan(Request $request)
    {
        $message = [
            'required' => ':attribute Harap wajib diisi',
            'numeric' => ':attribute Harap diisi dengan angka',
            'max' => ':atribute Terlalu panjang, maksimal :max karakter',
            'regex' => ':attribute format tidak valid',
        ];
        $atribute = [
            'no_nakes' => 'Nomer Tenaga Kesehatan',
            'nama' => 'Nama',
            'jk' => 'Jenis Kelamin',
            'no_hp' => 'No Handphone',
            'alamat' => 'Alamat',
            'rt' => 'RT',
            'rw' => 'RW',
        ];

        $validated =  $request->validate([
            'no_nakes' => 'required|max:16',
            'nama' => 'required|regex:/^[a-zA-Z\s]+$/',
            'jk' => 'required',
            'no_hp' => 'required|regex:/^08[0-9]{8,10}$/|numeric',
            'alamat' => 'required',
            'rt' => 'required|numeric',
            'rw' => 'required|numeric',
        ], $message, $atribute);

        $user =  [
            'name' => $validated['nama'],
            'email' => $validated['no_nakes'],
            'password' => bcrypt('nakes123'),
            'role_id' => 2
        ];
        User::create($user);
        $dataNakes = [
            'user_id' => User::where('email', $validated['no_nakes'])->first()->id,
            'no_nakes' => $validated['no_nakes'],
            'nama' => $validated['nama'],
            'jk' => $validated['jk'],
            'no_hp' => $validated['no_hp'],
            'alamat' => $validated['alamat'],
            'rt' => $validated['rt'],
            'rw' => $validated['rw'],
        ];
        Nakes::create($dataNakes);
        return redirect()->route('nakes.index')->with('message', 'Data Tenaga Kesehatan berhasil ditambah');
    }
    public function view(Nakes $nakes)
    {
        return Inertia::render('Nakes/Edit', compact('nakes'));
    }
    public function update(Request $request, Nakes $nakes)
    {
        $message = [
            'required' => ':attribute Harap wajib diisi',
            'numeric' => ':attribute Harap diisi dengan angka',
            'max' => ':atribute Terlalu panjang, maksimal :max karakter',
            'regex' => ':attribute format tidak valid',
        ];
        $atribute = [
            'no_nakes' => 'Nomer Tenaga Kesehatan',
            'nama' => 'Nama',
            'jk' => 'Jenis Kelamin',
            'no_hp' => 'No Handphone',
            'alamat' => 'Alamat',
            'rt' => 'RT',
            'rw' => 'RW',
        ];

        $request->validate([
            'no_nakes' => 'required|max:16',
            'nama' => 'required|regex:/^[a-zA-Z\s]+$/',
            'jk' => 'required',
            'no_hp' => 'required|regex:/^08[0-9]{8,10}$/|numeric',
            'alamat' => 'required',
            'rt' => 'required|numeric',
            'rw' => 'required|numeric',
        ], $message, $atribute);
        $nakes->update([
            'no_nakes' => $request->input('no_nakes'),
            'nama' => $request->input('nama'),
            'jk' => $request->input('jk'),
            'no_hp' => $request->input('no_hp'),
            'alamat' => $request->input('alamat'),
            'rt' => $request->input('rt'),
            'rw' => $request->input('rw'),
        ], $message, $atribute);
        return redirect()->route('nakes.index')->with('message', 'Data Tenaga Kesehatan berhasil diupdate');
    }

    public function delete(Nakes $nakes)
    {
        $nakes->delete();
        $user_id = User::where('id', $nakes->user_id)->first();
        $user_id->delete();
        return redirect()->route('nakes.index')->with('message', 'Data Tenaga Kesehatan berhasil dihapus');
    }
}
