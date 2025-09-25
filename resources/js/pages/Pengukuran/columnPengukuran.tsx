'use client';

import { ColumnDef } from '@tanstack/react-table';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Pengukuran = {
    id: string;
    tb: string;
    tgl_pengukuran: Date;
};
export type Balita = {
    id: string;
    nama: string;
    tgl_lahir: Date;
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

export const columns: ColumnDef<Pengukuran>[] = [
    {
        accessorKey: 'tgl_pengukuran',
        header: 'Tanggal Pengukuran',
    },
    {
        header: 'Berat Badan',
    },
    {
        accessorKey: 'tb',
        header: 'Tinggi Badan',
        cell: ({ row }) => `${row.getValue('tb')} cm`,
    },
    {
        header: 'Status Perkembangan',
    },
];
