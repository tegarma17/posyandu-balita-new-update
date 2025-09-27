<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Balita;
use App\Models\Wilayah;
use App\Models\Posyandu;
use App\Models\Pengukuran;
use App\Models\Penimbangan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PengukuranController extends Controller
{
    public function index()
    {
        $balita = Balita::all();
        return Inertia::render('Pengukuran/Index', compact('balita'));
    }
    public function editPengukuran(Balita $balita)
    {
        // Preload relasi
        $balita->load(['pengukurantb', 'pengukuranbb']);

        $gabungan = [];

        // Gabungkan pengukuran tinggi
        foreach ($balita->pengukurantb as $p) {
            $tgl = Carbon::parse($p->tgl_pengukuran)->toDateString();
            $key = $balita->id . '|' . $tgl;

            $gabungan[$key] = [
                'balita' => [
                    'id' => $balita->id,
                    'nama' => $balita->nama,
                    'tgl_lahir' => $balita->tgl_lahir,
                ],
                'tgl' => $tgl,
                'tb' => $p->tb,
                'usia' => $p->usia,
                'bb' => null,
                'status' => null,
            ];
        }
        // Gabungkan penimbangan berat
        foreach ($balita->pengukuranbb as $p) {
            $tgl = Carbon::parse($p->tgl_pengukuran)->toDateString();
            $key = $balita->id . '|' . $tgl;

            if (isset($gabungan[$key])) {
                $gabungan[$key]['bb'] = $p->bb;
            } else {
                $gabungan[$key] = [
                    'balita' => [
                        'id' => $balita->id,
                        'nama' => $balita->nama,
                        'tgl_lahir' => $balita->tgl_lahir,
                    ],
                    'tgl' => $tgl,
                    'tb' => null,
                    'usia' => $p->usia,
                    'bb' => $p->bb,
                ];
            }
        }


        $wilayah = Wilayah::all();
        $posyandu = Posyandu::all();

        return Inertia::render('Pengukuran/addPengukuran', [
            'gabungan' => array_values($gabungan),
            'balita' => $balita,
            'posyandu' => $posyandu,
            'wilayah' => $wilayah,

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
            'bb' => 'required',
            'j_pengukuran' => 'required',
            'tgl_pengukuran' => 'required',
        ]);


        Pengukuran::upsert(
            [
                'balita_id' => $validated['balita_id'],
                'posyandu_id' => $validated['posyandu_id'],
                'tgl_pengukuran' => Carbon::parse($validated['tgl_pengukuran'])->toDateString(),
                'j_pengukuran' => $validated['j_pengukuran'],
                'usia' => $validated['usia'],
                'tb' => $validated['tb'],
                'ditambahkan_by' => $user,
                'diedit_by' =>  $user,
            ],
            ['balita_id', 'tgl_pengukuran'],
            [
                'diedit_by',
                'tb',
                'j_pengukuran',
                'posyandu_id',
            ]
        );
        Penimbangan::upsert(
            [
                'balita_id' => $validated['balita_id'],
                'posyandu_id' => $validated['posyandu_id'],
                'tgl_pengukuran' => Carbon::parse($validated['tgl_pengukuran'])->toDateString(),
                'usia' => $validated['usia'],
                'bb' => $validated['bb'],
                'ditambahkan_by' => $user,
                'diedit_by' =>  $user,
            ],
            ['balita_id', 'tgl_pengukuran'],
            [
                'diedit_by',
                'bb',
                'posyandu_id',
            ]
        );
        return redirect()->route('pengukuran.index')->with('message', 'Data Pengukuran Berhasil disimpan');
    }
}
