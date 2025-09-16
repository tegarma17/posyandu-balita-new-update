<?php

namespace Database\Seeders;

use App\Models\Daerah;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DaerahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Daerah::insert(
            [
                ['kd_desa' => '35.15.10.2001', 'nama_desa' => 'Tanggul'],
                ['kd_desa' => '35.15.10.2002', 'nama_desa' => 'Simoketawang'],
                ['kd_desa' => '35.15.10.2003', 'nama_desa' => 'Popoh'],
                ['kd_desa' => '35.15.10.2004', 'nama_desa' => 'Jimbarankulon'],
                ['kd_desa' => '35.15.10.2005', 'nama_desa' => 'Jimbaranwetan'],
                ['kd_desa' => '35.15.10.2006', 'nama_desa' => 'Ketimang'],
                ['kd_desa' => '35.15.10.2007', 'nama_desa' => 'Pilang'],
                ['kd_desa' => '35.15.10.2008', 'nama_desa' => 'Sumberrejo'],
                ['kd_desa' => '35.15.10.2009', 'nama_desa' => 'Mojorangagung'],
                ['kd_desa' => '35.15.10.2010', 'nama_desa' => 'Wonokasian'],
                ['kd_desa' => '35.15.10.2011', 'nama_desa' => 'Ploso'],
                ['kd_desa' => '35.15.10.2012', 'nama_desa' => 'Mulyodadi'],
                ['kd_desa' => '35.15.10.2013', 'nama_desa' => 'Wonoayu'],
                ['kd_desa' => '35.15.10.2014', 'nama_desa' => 'Semambung'],
                ['kd_desa' => '35.15.10.2015', 'nama_desa' => 'Simoangin-angin'],
                ['kd_desa' => '35.15.10.2016', 'nama_desa' => 'Wonokalang'],
                ['kd_desa' => '35.15.10.2017', 'nama_desa' => 'Pagerngumbuk'],
                ['kd_desa' => '35.15.10.2018', 'nama_desa' => 'Plaosan'],
                ['kd_desa' => '35.15.10.2019', 'nama_desa' => 'Lambangan'],
                ['kd_desa' => '35.15.10.2020', 'nama_desa' => ' Sawocangkring'],
                ['kd_desa' => '35.15.10.2021', 'nama_desa' => 'Becirongengor'],
                ['kd_desa' => '35.15.10.2022', 'nama_desa' => 'Karangpuri'],
                ['kd_desa' => '35.15.10.2023', 'nama_desa' => 'Candinegoro'],
            ]
        );
    }
}
