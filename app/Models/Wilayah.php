<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wilayah extends Model
{
    protected $table = 'wilayah';
    protected $fillable = ['kd_wilayah', 'nama_wilayah'];

    public function posyandu()
{
    return $this->hasMany(Posyandu::class);
}

}
