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
        title: 'Data Posyandu',
        href: '/data-posyandu',
    },
];
interface Wilayah {
    id: number;
    nama_wilayah: string;
}
interface Nakes {
    id: number;
    nama: string;
}
interface Props {
    wilayah: Wilayah[];
    nakes: Nakes[];
}

export default function Tambah({ wilayah, nakes }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        wilayah_id: '',
        nama_posyandu: '',
        alamat: '',
        rt: '',
        rw: '',
        pj: '',
        jadwal: '',
    });
    const handleSimpan = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('posyandu.simpan'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Posyandu" />
            <div className="m-4">
                <Link href={route('posyandu.index')}>
                    <Button className="bg-yellow-400">Kembali</Button>
                </Link>
            </div>
            <div className="m-4">
                <h1 className="text-xl font-bold">Tambah Jadwal Posyandu Baru</h1>
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
                        <Label htmlFor="nik">Nama Posyandu</Label>
                        <Input
                            type="text"
                            id="nik"
                            placeholder="Nama Posyandu"
                            value={data.nama_posyandu}
                            onChange={(e) => setData('nama_posyandu', e.target.value)}
                        />
                    </div>
                    <div className="m-2 grid w-full items-center gap-3">
                        <Label htmlFor="nik">Wilayah</Label>
                        <Select onValueChange={(val) => setData('wilayah_id', val)} value={data.wilayah_id}>
                            <SelectTrigger className="w-full items-center">
                                <SelectValue placeholder="Pilih wilayah" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Wilayah</SelectLabel>
                                    {wilayah.map((w) => (
                                        <SelectItem key={w.id} value={String(w.id)}>
                                            {w.nama_wilayah}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="m-2 grid w-full items-center gap-3">
                        <Label htmlFor="nik">Alamat</Label>
                        <Input
                            type="text"
                            id="nik"
                            placeholder="Alamat Lengkap"
                            value={data.alamat}
                            onChange={(e) => setData('alamat', e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                        <div className="m-2 grid w-full items-center gap-3">
                            <Label htmlFor="nik">RT</Label>
                            <Input type="text" id="nik" placeholder="001 / 01" value={data.rt} onChange={(e) => setData('rt', e.target.value)} />
                        </div>
                        <div className="m-2 grid w-full items-center gap-3">
                            <Label htmlFor="nik">RW</Label>
                            <Input type="text" id="nik" placeholder="001 / 01" value={data.rw} onChange={(e) => setData('rw', e.target.value)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                        <div className="m-2 grid w-full items-center gap-3">
                            <Label htmlFor="nik">Penanggung Jawab</Label>
                            <Select onValueChange={(val) => setData('pj', val)} value={data.pj}>
                                <SelectTrigger className="w-full items-center">
                                    <SelectValue placeholder="Pilih Penanggung Jawab" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Penanggung Jawab</SelectLabel>
                                        {nakes.map((n) => (
                                            <SelectItem key={n.id} value={String(n.id)}>
                                                {n.nama}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="m-2 grid w-full items-center gap-3">
                            <Label htmlFor="nik">Jadwal</Label>
                            <Input type="date" id="jadwal" value={data.jadwal} onChange={(e) => setData('jadwal', e.target.value)} />
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
