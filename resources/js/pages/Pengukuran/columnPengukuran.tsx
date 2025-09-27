'use client';

import { ColumnDef } from '@tanstack/react-table';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type PengukuranTb = {
    id: string;
    tb: string;
    tgl_pengukuran: string;
};
type PengukuranBb = {
    id: string;
    bb: string;
    tgl_pengukuran: string;
};
export type Gabungan = {
    balita: {
        id: string;
        nama: string;
        tgl_lahir: Date;
    };
    tgl: string;
    tb?: number;
    bb?: number;
    usia?: number;
};
export type Balita = {
    id: string;
    nama: string;
    tgl_lahir: Date;
    pengukurantb: PengukuranTb[];
    pengukuranbb: PengukuranBb[];
};
export type Wilayah = {
    id: string;
    nama_wilayah: string;
};
export type Posyandu = {
    id: string;
    wilayah_id: string;
    nama_posyandu: string;
};

export const columns: ColumnDef<Gabungan>[] = [
    {
        header: 'Tanggal Pengukuran',
        accessorFn: (row) => new Date(row.tgl).toLocaleDateString('id-ID'),
    },

    {
        header: 'Berat Badan',
        accessorFn: (row) => (row.bb ? `${row.bb} kg` : '-'),
    },
    {
        header: 'Tinggi Badan',
        accessorFn: (row) => (row.tb ? `${row.tb} cm` : '-'),
    },
    {
        header: 'Usia',
         accessorFn: (row) => (row.usia ? `${row.usia} Bulan` : '-'),
    },
];
