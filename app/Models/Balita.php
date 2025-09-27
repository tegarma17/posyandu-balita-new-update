<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Balita extends Model
{
    protected $table = 'balita';
    protected $fillable = [
        'user_id',
        'nik',
        'nama',
        'jk',
        'tgl_lahir',
        'bb_awal',
        'tb_awal',
        'nama_ortu',
        'no_hp',
        'anak_ke',
        'alamat',
        'rt',
        'rw'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function pengukurantb()
    {
        return $this->hasMany(Pengukuran::class);
    }
    public function pengukuranbb()
    {
        return $this->hasMany(Penimbangan::class);
    }
}
