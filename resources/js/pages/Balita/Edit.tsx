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
        title: 'Data Balita',
        href: '/data-balita',
    },
];

interface Balita {
    id: number;
    nik: number;
    nama: string;
    jk: string;
    tgl_lahir: Date;
    bb_awal: number;
    tb_awal: number;
    nama_ortu: string;
    no_hp: string;
    anak_ke: number;
    alamat: string;
    rt: string;
    rw: string;
}
interface Props {
    balita: Balita;
}
export default function Edit({ balita }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        nik: balita.nik,
        nama: balita.nama,
        jk: balita.jk,
        tgl_lahir: balita.tgl_lahir,
        bb_awal: balita.bb_awal,
        tb_awal: balita.tb_awal,
        nama_ortu: balita.nama_ortu,
        no_hp: balita.no_hp,
        anak_ke: balita.anak_ke,
        alamat: balita.alamat,
        rt: balita.rt,
        rw: balita.rw,
    });
    const tanggal = new Date(data.tgl_lahir).toISOString().slice(0, 10);
    const handleSimpan = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);
        put(route('balita.update', balita.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Data Balita " />
            <div className="m-4">
                <Link href={route('balita.index')}>
                    <Button className="bg-yellow-400">Kembali</Button>
                </Link>
            </div>
            <div className="m-4">
                <h1 className="text-xl font-bold">Tambah Data Balita</h1>
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
                            <Label htmlFor="nik">NIK</Label>
                            <Input
                                type="text"
                                id="nik"
                                placeholder="Nomer NIK"
                                value={data.nik}
                                onChange={(e) => setData('nik', Number(e.target.value))}
                            />
                        </div>
                        <div className="m-2 grid w-full items-center gap-3">
                            <Label htmlFor="nama">Nama</Label>
                            <Input
                                type="text"
                                id="nama"
                                placeholder="Nama Balita"
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
                            <Label htmlFor="tgl_lahir">Tanggal Lahir</Label>
                            <Input
                                type="date"
                                id="tgl_lahir"
                                placeholder="Tanggal Lahir"
                                value={tanggal}
                                onChange={(e) => setData('tgl_lahir', new Date(e.target.value))}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                        <div className="m-2 grid w-full items-center gap-3">
                            <Label htmlFor="bb_awal">Berat Badan</Label>
                            <Input
                                type="number"
                                id="bb_awal"
                                placeholder="Berat Badan pertama kali timbang"
                                value={data.bb_awal}
                                onChange={(e) => setData('bb_awal', Number(e.target.value))}
                            />
                        </div>
                        <div className="m-2 grid w-full items-center gap-3">
                            <Label htmlFor="email">Tinggi Badan</Label>
                            <Input
                                type="number"
                                id="tb_awal"
                                placeholder="Tinggi Badan pertama kali timban"
                                value={data.tb_awal}
                                onChange={(e) => setData('tb_awal', Number(e.target.value))}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                        <div className="m-2 grid w-full items-center gap-3">
                            <Label htmlFor="nama_ortu">Nama Orang Tua</Label>
                            <Input
                                type="text"
                                id="nama_ortu"
                                placeholder="Nama Ayah / Ibu"
                                value={data.nama_ortu}
                                onChange={(e) => setData('nama_ortu', e.target.value)}
                            />
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
                        <div className="m-2 grid w-full items-center gap-3">
                            <Label htmlFor="anak_ke">Anak Ke-</Label>
                            <Input
                                type="number"
                                id="anak_ke"
                                placeholder="Anak Ke-"
                                value={data.anak_ke}
                                onChange={(e) => setData('anak_ke', Number(e.target.value))}
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
