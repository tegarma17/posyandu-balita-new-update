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
export type Balita = {
    id: string;
    nama: string;
    jk: string;
    alamat: string;
    nama_ortu: string;
};

export const columns: ColumnDef<Balita>[] = [
    {
        accessorKey: 'nama',
        header: 'Nama',
    },
    {
        accessorKey: 'jk',
        header: 'Jenis Kelamin',
        cell: (info) => {
            const value = info.getValue() as string;
            const label = value === 'l' ? 'Laki-laki' : value === 'p' ? 'Perempuan' : 'Tidak diketahui';
            return label;
        },
    },
    {
        accessorKey: 'alamat',
        header: 'Alamat',
    },
    {
        accessorKey: 'nama_ortu',
        header: 'Nama Orang Tua',
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const balita = row.original;
            const [openDialog, setOpenDialog] = useState(false);

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
                            <DropdownMenuLabel>Pengukuran dan Penimbangan</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                                <Link className="block w-full" href={route('pengukuran.balita', balita.id)} as="button" prefetch>
                                    Data Pengukuran
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Vaksin dan Imunisasi</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                                <Link className="block w-full" href={route('balita.view', balita.id)} as="button" prefetch>
                                    View Data Balita
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setOpenDialog(true)} className="text-red-600">
                                Hapus
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                        <AlertDialogTrigger asChild></AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Hapus Data Balita</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Data <strong>{balita.nama}</strong> akan dihapus secara permanen. Lanjutkan?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() =>
                                        router.delete(route('balita.hapus', balita.id), {
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
