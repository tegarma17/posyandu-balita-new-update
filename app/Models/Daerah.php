<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Daerah extends Model

{
    protected $table = 'desa';
    protected $fillable = ['kd_desa', 'nama_desa'];
}
