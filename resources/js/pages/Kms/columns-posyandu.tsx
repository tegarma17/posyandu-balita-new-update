'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { ColumnDef } from '@tanstack/react-table';

export type Posyandu = {
    id: string;
    wilayah?: {
        id: string;
        nama_wilayah: string;
    };
    nama_posyandu: string;
    jadwal: Date;
    status: string;
};

export const columns: ColumnDef<Posyandu>[] = [
    {
        accessorKey: 'nama_posyandu',
        header: 'Nama Posyandu',
    },
    {
        accessorFn: (row) => row.wilayah?.nama_wilayah ?? '—',
        accessorKey: 'nama_wilayah',
        header: 'Wilayah',
    },
    {
        accessorKey: 'jadwal',
        header: 'Jadwal',
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('status') as string;

            const statusMap: Record<string, { label: string; className: string }> = {
                aktif: { label: 'Aktif', className: 'bg-amber-400' },
                nonaktif: { label: 'Nonaktif', className: 'bg-rose-600' },
                ditunda: { label: 'Menunggu', className: 'bg-yellow-700' },
                selesai: { label: 'Selesai', className: 'bg-teal-400' },
            };

            const { label, className } = statusMap[status] ?? {
                label: 'Tidak Diketahui',
                className: 'bg-black',
            };

            return <Badge className={className}>{label}</Badge>;
        },
    },

    {
        header: 'Action',
        id: 'actions',
        cell: ({ row }) => {
            const posyandu = row.original;

            return (
                <>
                    <Button asChild>
                        <Link href={route('kms.balitaByPosyandu', posyandu.id)}>LIhat Data PGS Balita</Link>
                    </Button>
                </>
            );
        },
    },
];
