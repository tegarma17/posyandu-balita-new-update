'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';

import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Posyandu = {
    id: string;
    nama_posyandu: string;
    alamat: string;
    jadwal: string;
    status: string;
    pj: string;
};

export const columns: ColumnDef<Posyandu>[] = [
    {
        accessorKey: 'pj_name',
        header: 'Penanggung Jawab',
    },
    {
        accessorKey: 'nama_posyandu',
        header: 'Nama Posyandu',
    },
    {
        accessorKey: 'alamat',
        header: 'Alamat',
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
        id: 'actions',
        cell: ({ row }) => {
            const posyandu = row.original;
            const [openDialog, setOpenDialog] = useState(false);
            const updateStatus = (status: string) => {
                router.put(
                    route('posyandu.status.update', posyandu.id),
                    {
                        status,
                    },
                    {
                        preserveScroll: true,
                    },
                );
            };

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                                <Link className="block w-full" href={route('posyandu.view', posyandu.id)} as="button" prefetch>
                                    View Posyandu
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setOpenDialog(true)} className="text-red-600">
                                Hapus
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Status</DropdownMenuLabel>
                            <DropdownMenuItem className="text-teal-600" onClick={() => updateStatus('selesai')}>
                                Selesai
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-yellow-400" onClick={() => updateStatus('ditunda')}>
                                Ditunda
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-rose-400" onClick={() => updateStatus('nonaktif')}>
                                Nonaktif
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-sky-400" onClick={() => updateStatus('aktif')}>
                                Aktif
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                        <AlertDialogTrigger asChild></AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Hapus Data Balita</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Data <strong>{posyandu.nama_posyandu}</strong> akan dihapus secara permanen. Lanjutkan?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() =>
                                        router.delete(route('posyandu.hapus', posyandu.id), {
                                            preserveScroll: true,
                                            onSuccess: () => {
                                                console.log('Data berhasil dihapus');
                                            },
                                            onError: (err) => {
                                                console.error('Gagal menghapus:', err);
                                            },
                                        })
                                    }
                                >
                                    Hapus
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            );
        },
    },
];
