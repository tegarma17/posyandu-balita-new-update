import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Data Tenaga Kesehatan',
        href: '/data-nakes',
    },
];

export default function Tambah() {
    const { data, setData, post, processing, errors } = useForm({
        kd_wilayah: '',
        nama_wilayah: '',
    });
    const handleSimpan = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);
        post(route('wilayah.simpan'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Tenaga Kesehatan" />
            <div className="m-4">
                <Link href={route('nakes.index')}>
                    <Button className="bg-yellow-400">Kembali</Button>
                </Link>
            </div>
            <div className="m-4">
                <h1 className="text-xl font-bold">Tambah Data Tenaga Kesehatan Baru</h1>
            </div>
            <div className="w-full p-4">
                <form encType="multipart/form-data" onSubmit={handleSimpan}>
                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <CircleAlert />
                            <AlertTitle>Gagal!</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}
                    <div className="m-2 grid w-full items-center gap-3">
                        <Label htmlFor="nik">Kode Wilayah</Label>
                        <Input
                            type="text"
                            id="nik"
                            placeholder="Kode Wilayah"
                            value={data.kd_wilayah}
                            onChange={(e) => setData('kd_wilayah', e.target.value)}
                        />
                    </div>
                    <div className="m-2 grid w-full items-center gap-3">
                        <Label htmlFor="nama_wilayah">Nama Wilayah</Label>
                        <Input
                            type="text"
                            id="nama_wilayah"
                            placeholder="Nama Lengkap"
                            value={data.nama_wilayah}
                            onChange={(e) => setData('nama_wilayah', e.target.value)}
                        />
                    </div>
                    <Button className="m-2 bg-teal-400" disabled={processing}>
                        Simpan
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
