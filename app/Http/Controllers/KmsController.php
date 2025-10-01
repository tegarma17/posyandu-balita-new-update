<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Posyandu;
use App\Models\Penimbangan;
use Illuminate\Http\Request;
use App\Helpers\ZScoreHelper;
use App\Models\Pengukuran;
use Illuminate\Support\Facades\Storage;

class KmsController extends Controller
{
    public function index()
    {
        $posyandu = Posyandu::with('wilayah')->get();

        return Inertia::render('Kms/Index-posyandu', compact('posyandu'));
    }
    public function viewBalitabyPosyandu(Posyandu $posyandu)
    {
        $posyandu = Posyandu::where('id', $posyandu->id)->first();

        $penimbangan = Penimbangan::with('balita')->where('posyandu_id', $posyandu->id)->get();
        $pengukuran = Pengukuran::with('balita')->where('posyandu_id', $posyandu->id)->get();

        $lmsWeight = json_decode(Storage::disk('lms')->get('lms/lmsWeightForAge.json'), true);
        $lmsHeight = json_decode(Storage::disk('lms')->get('lms/lmsHeightForAge.json'), true);

        $dataGabungan = $penimbangan->map(function ($p) use ($pengukuran, $lmsWeight, $lmsHeight) {
            $usia = (int) $p->usia;
            $gender = $p->balita->jk === 'l' ? 'male' : 'female';
            $balita_id = $p->balita_id;

            $match = $pengukuran->first(function ($g) use ($balita_id, $usia) {
                return $g->balita_id === $balita_id && (int) $g->usia === $usia;
            });

            $tb = $match?->tb ?? $p->tb;
            $bb = $p->bb;

            // Ambil referensi LMS
            $refBBU = $lmsWeight['weightForAge'][$gender][$usia] ?? null;
            $refTBU = $lmsHeight['heightForAge'][$gender][$usia] ?? null;


            // Hitung Z-score
            $z_bbu = $refBBU ? round(ZScoreHelper::calculate($bb, $refBBU['L'], $refBBU['M'], $refBBU['S']), 2) : null;
            $z_tbu = $refTBU ? round(ZScoreHelper::calculate($tb, $refTBU['L'], $refTBU['M'], $refTBU['S']), 2) : null;

            $status_bbu = ZScoreHelper::interpretBB($z_bbu);
            $status_tbu = ZScoreHelper::interpretTB($z_tbu);

            return [
                'nama' => $p->balita->nama,
                'usia' => $usia,
                'bb' => $bb,
                'tb' => $tb,
                'z_score_bb_u' => $z_bbu,
                'z_score_tb_u' => $z_tbu,
                'status_gizi_bbu' => $status_bbu,
                'status_gizi_tbu' => $status_tbu,
            ];
        });



        return Inertia::render('Kms/Index', [
            'gabungan' => $dataGabungan,

            'posyandu' => $posyandu,
        ]);
    }
}
