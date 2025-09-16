import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
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
        no_nakes: '',
        nama: '',
        jk: '',
        no_hp: '',
        alamat: '',
        rt: '',
        rw: '',
    });
    const handleSimpan = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);
        post(route('nakes.simpan'));
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
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                        <div className="m-2 grid w-full items-center gap-3">
                            <Label htmlFor="nik">Nomer Tenaga Kesehatan</Label>
                            <Input
                                type="text"
                                id="nik"
                                placeholder="Nomer Tenaga Kesehatan"
                                value={data.no_nakes}
                                onChange={(e) => setData('no_nakes', e.target.value)}
                            />
                        </div>
                        <div className="m-2 grid w-full items-center gap-3">
                            <Label htmlFor="nama">Nama</Label>
                            <Input
                                type="text"
                                id="nama"
                                placeholder="Nama Lengkap"
                                value={data.nama}
                                onChange={(e) => setData('nama', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                        <div className="m-2 grid w-full items-center gap-3">
                            <Label htmlFor="jk">Jenis Kelamin</Label>
                            <Select onValueChange={(val) => setData('jk', val)} value={data.jk}>
                                <SelectTrigger className="w-full items-center">
                                    <SelectValue placeholder="Pilih Jenis Kelamin" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Jenis Kelamin</SelectLabel>
                                        <SelectItem value="l">Laki - Laki</SelectItem>
                                        <SelectItem value="p">Perempuan</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="m-2 grid w-full items-center gap-3">
                            <Label htmlFor="no_hp">Nomer Handphone</Label>
                            <Input
                                type="text"
                                id="no_hp"
                                placeholder="Nomer yang bisa dihubungi via WA"
                                value={data.no_hp}
                                onChange={(e) => setData('no_hp', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="m-2 grid w-full items-center gap-3">
                        <Label htmlFor="alamat">Alamat</Label>
                        <Input
                            type="text"
                            id="alamat"
                            placeholder="Alamat Lengkap"
                            value={data.alamat}
                            onChange={(e) => setData('alamat', e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                        <div className="m-2 grid w-full items-center gap-3">
                            <Label htmlFor="rt">RT</Label>
                            <Input type="text" id="rt" placeholder="RT" value={data.rt} onChange={(e) => setData('rt', e.target.value)} />
                        </div>
                        <div className="m-2 grid w-full items-center gap-3">
                            <Label htmlFor="rw">RW</Label>
                            <Input type="text" id="rw" placeholder="RW" value={data.rw} onChange={(e) => setData('rw', e.target.value)} />
                        </div>
                    </div>
                    <Button className="m-2 bg-teal-400" disabled={processing}>
                        Simpan
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
