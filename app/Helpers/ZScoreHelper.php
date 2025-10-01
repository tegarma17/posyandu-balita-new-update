<?php

namespace App\Helpers;

class ZScoreHelper
{
    public static function calculate($x, $l, $m, $s)
    {
        if ($l == 0) return log($x / $m) / $s;
        return (pow($x / $m, $l) - 1) / ($l * $s);
    }

    public static function interpretBB(float $z): string
    {
        if ($z <= -3) return 'Gizi Buruk';
        if ($z > -3 && $z <= -2) return 'Gizi Kurang';
        if ($z > -2 && $z <= 2) return 'Gizi Normal';
        if ($z > 2 && $z <= 3) return 'Gizi Lebih';
        return 'Obesitas';
    }

    public static function interpretTB(float $z): string
    {
        if ($z <= -3) return 'Sangat Pendek';
        if ($z > -3 && $z <= -2) return 'Pendek';
        if ($z > -2 && $z <= 2) return 'Normal';
        if ($z > 2 && $z <= 3) return 'Tinggi';
        return 'Sangat Tinggi';
    }
}
