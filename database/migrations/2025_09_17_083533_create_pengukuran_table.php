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
        Schema::create('pengukuran', function (Blueprint $table) {
            $table->id();
            $table->foreignId('balita_id')->constrained('balita')->onDelete('cascade');
            $table->foreignId('posyandu_id')->constrained('posyandu')->onDelete('cascade');
            $table->foreignId('ditambahkan_by')->constrained('users')->onDelete('cascade');
            $table->foreignId('diedit_by')->constrained('users')->onDelete('cascade');
            $table->double('tb');
            $table->enum('j_pengukuran', ['berdiri', 'terlentang']);
            $table->integer('usia');
            $table->date('tgl_pengukuran');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengukuran');
    }
};
