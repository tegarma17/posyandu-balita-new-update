<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Nakes extends Model
{
    protected $table = 'nakes';
    protected $fillable = ['user_id', 'no_nakes',  'nama', 'jk', 'no_hp', 'alamat',  'rt', 'rw'];
}
