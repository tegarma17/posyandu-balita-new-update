<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('balita', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('nik', 20)->unique();
            $table->string('nama', 50);
            $table->enum('jk', ['l', 'p']);
            $table->date('tgl_lahir');
            $table->string('bb_awal', 3);
            $table->string('tb_awal', 3);
            $table->string('nama_ortu', 100);
            $table->string('no_hp', 15);
            $table->string('anak_ke', 2);
            $table->string('alamat', 100);
            $table->string('rt',3);
            $table->string('rw',3);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('balita');
    }
};
