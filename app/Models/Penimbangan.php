<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Penimbangan extends Model
{
    protected $table = 'penimbangan';
    protected $fillable = [
        'balita_id',
        'posyandu_id',
        'ditambahkan_by',
        'diedit_by',
        'bb',
        'usia',
        'tgl_pengukuran'
    ];
    public function balita()
    {
        return $this->belongsTo(Balita::class);
    }
    public function posyandu()
    {
        return $this->belongsTo(Posyandu::class);
    }
    public function ditambahkanOleh()
    {
        return $this->belongsTo(User::class, 'ditambahkan_by');
    }

    public function dieditOleh()
    {
        return $this->belongsTo(User::class, 'diedit_by');
    }
}
