'use client';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { ColumnDef } from '@tanstack/react-table';

export type Gabungan = {
    id: string;
    nama: string;
    usia: string;
    z_score_bb_u: string;
    z_score_tb_u: string;
    status_gizi_bbu: string;
    status_gizi_tbu: string;
};
export type Posyandu = {
    id: string;
    nama_posyandu: string;
    jadwal: string;
};

export const columns: ColumnDef<Gabungan>[] = [
    {
        accessorKey: 'nama',
        header: 'Nama Balita',
    }, // akan rowSpan=2

    {
        header: 'Usia',
        accessorKey: 'usia',
    }, // akan rowSpan=2
    {
        header: 'Z-Score',
        columns: [{ header: 'BB/U', accessorKey: 'z_score_bb_u' }, { header: 'TB/U', accessorKey: 'z_score_tb_u' }, { header: 'BB/TB' }],
    },
    {
        header: 'Status',
        columns: [{ header: 'BB/U', accessorKey: 'status_gizi_bbu' }, { header: 'TB/U', accessorKey: 'status_gizi_tbu' }, { header: 'BB/TB' }],
    },
];
