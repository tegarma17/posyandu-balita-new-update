<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Posyandu extends Model
{
    protected $table = 'posyandu';
    protected $fillable = [
        'wilayah_id',
        'nama_posyandu',
        'alamat',
        'rt',
        'rw',
        'pj',
        'no_hp',
        'dibuat_oleh',
        'diupdate_oleh',
        'jadwal',
        'status'
    ];
    public function nakes()
    {
        return $this->belongsTo(Nakes::class, 'pj');
    }
    public function wilayah()
    {
        return $this->belongsTo(Wilayah::class);
    }
    public function penimbangan()
    {
        return $this->hasMany(Penimbangan::class);
    }

    public function pengukuran()
    {
        return $this->hasMany(Pengukuran::class);
    }
}
