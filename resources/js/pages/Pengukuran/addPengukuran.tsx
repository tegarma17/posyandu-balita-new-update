import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Balita, columns, Pengukuran, Posyandu, Wilayah } from './columnPengukuran';
import { DataTable } from './data-table';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Data Pengukuran Balita',
        href: '/data-balita',
    },
    {
        title: 'View Data Pengukuran Balita',
        href: '/data-balita',
    },
];

export default function Dashboard({
    pengukuran,
    wilayah,
    posyandu,
    balita,
}: {
    pengukuran: Pengukuran[];
    wilayah: Wilayah[];
    posyandu: Posyandu[];
    balita: Balita;
}) {
    const [selectedWilayah, setSelectedWilayah] = useState('');
    const filteredPosyandu = posyandu.filter((p) => String(p.wilayah_id) === String(selectedWilayah));

    function hitungUsiaBulan(tglLahir: string | Date): number {
        const lahir = new Date(tglLahir);
        const sekarang = new Date();

        const tahun = sekarang.getFullYear() - lahir.getFullYear();
        const bulan = sekarang.getMonth() - lahir.getMonth();
        let totalBulan = tahun * 12 + bulan;
        // Jika lahir di bulan dan tahun yang sama → anggap 1 bulan
        if (totalBulan === 0) {
            totalBulan = 1;
        }
        return totalBulan;
    }
    const usia = hitungUsiaBulan(balita.tgl_lahir);

    const { data, setData, post, processing, errors } = useForm({
        balita_id: balita.id,
        posyandu_id: '',
        tb: '',
        usia: usia,
        j_pengukuran: '',
    });
    const handleSimpan = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);
        post(route('pengukuran.simpan'));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <h1 className="font-2xl p-3 text-center font-bold">Input Data Pengukuran {balita.nama}</h1>
                    <form encType="multipart/form-data" onSubmit={handleSimpan}>
                        <div className="grid grid-cols-2">
                            <div className="grid w-full items-center gap-3 p-3">
                                <Label htmlFor="email">Wilayah</Label>
                                <Select
                                    onValueChange={(value) => {
                                        setSelectedWilayah(value);
                                        setData('posyandu_id', ''); // reset posyandu saat wilayah berubah
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Wilayah" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {wilayah.map((w) => (
                                            <SelectItem key={w.id} value={String(w.id)}>
                                                {w.nama_wilayah}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid w-full items-center gap-3 p-3">
                                <Label htmlFor="email">Posyandu</Label>
                                <Select disabled={!selectedWilayah} value={data.posyandu_id} onValueChange={(value) => setData('posyandu_id', value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Posyandu" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filteredPosyandu.length > 0 ? (
                                            filteredPosyandu.map((p) => (
                                                <SelectItem key={p.id} value={String(p.id)}>
                                                    {p.nama_posyandu}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem disabled value="placeholder">
                                                Tidak ada Posyandu di wilayah ini
                                            </SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2">
                            {/* <div className="grid w-full items-center gap-3 p-3">
                                <Label htmlFor="email">Berat Badan</Label>
                                <Input type="number" placeholder="Berat Badan (Kg)" />
                            </div> */}
                            <div className="grid w-full items-center gap-3 p-3">
                                <Label htmlFor="email">Tinggi Badan</Label>
                                <Input
                                    type="number"
                                    value={data.tb}
                                    onChange={(e) => setData('tb', e.target.value)}
                                    placeholder="Tinggi Badan (Kg)"
                                />
                            </div>
                        </div>
                        <div className="grid w-full items-center gap-3 p-3">
                            <Label htmlFor="email">Jenis Pengukuran</Label>
                            <Select onValueChange={(val) => setData('j_pengukuran', val)} value={data.j_pengukuran}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Jenis Pengukuran Tinggi Badan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Jenis Pengukuran</SelectLabel>
                                        <SelectItem value="berdiri">Berdiri</SelectItem>
                                        <SelectItem value="terlentang">Terlentang</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 p-3 md:flex-row">
                            <Button>Button</Button>
                        </div>
                    </form>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <DataTable columns={columns} data={pengukuran} />
                </div>
            </div>
        </AppLayout>
    );
}
