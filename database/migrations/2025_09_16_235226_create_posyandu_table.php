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
        Schema::create('posyandu', function (Blueprint $table) {
            $table->id();
            $table->foreignId('wilayah_id')->constrained('wilayah')->onDelete('cascade');
            $table->string('nama_posyandu', 50);
            $table->string('alamat', 100);
            $table->string('rt', 3);
            $table->string('rw', 3);
            $table->foreignId('pj')->constrained('nakes')->onDelete('cascade');
            $table->string('no_hp', 14);
            $table->foreignId('dibuat_oleh')->constrained('users')->onDelete('cascade');
            $table->foreignId('diupdate_oleh')->constrained('users')->onDelete('cascade');
            $table->date('jadwal');
            $table->enum('status', ['aktif', 'nonaktif', 'ditunda', 'selesai']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posyandu');
    }
};
