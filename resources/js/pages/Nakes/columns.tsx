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
export type Nakes = {
    id: string;
    no_nakes: string;
    nama: string;
    no_hp: string;
    alamat: string;
};

export const columns: ColumnDef<Nakes>[] = [
    {
        accessorKey: 'no_nakes',
        header: 'Nomer Tenaga Kesehatan',
    },
    {
        accessorKey: 'nama',
        header: 'Nama',
    },

    {
        accessorKey: 'no_hp',
        header: 'Nomer Handphone',
    },
    {
        accessorKey: 'alamat',
        header: 'Alamat',
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const nakes = row.original;
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
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(nakes.id)}>Copy Tenaga Kesehatan ID</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link className="block w-full" href={route('nakes.view', nakes.id)} as="button" prefetch>
                                    View Data Tenaga Kesehatan
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
                                    Data <strong>{nakes.nama}</strong> akan dihapus secara permanen. Lanjutkan?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() =>
                                        router.delete(route('nakes.hapus', nakes.id), {
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
