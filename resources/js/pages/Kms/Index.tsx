import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { columns, Gabungan, Posyandu } from './columns';
import { DataTable } from './data-table';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Data Wilayah',
        href: '/data-wilayah',
    },
];

interface PageProps {
    flash: {
        message?: string;
    };
}

export default function Dashboard({ gabungan, posyandu }: { gabungan: Gabungan[]; posyandu: Posyandu }) {
    const { flash } = usePage().props as unknown as PageProps;
    console.log(posyandu);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Wilayah" />
            <div className="m-4">
                <Link href={route('kms.index')}>
                    <Button className="bg-yellow-400">Kembali</Button>
                </Link>
            </div>
            <div className="m-4">
                <h1 className="text-xl font-bold">
                    {posyandu.nama_posyandu} / {posyandu.jadwal}
                </h1>
            </div>
            <div className="mx-auto w-full p-4">
                <DataTable columns={columns} data={gabungan} />
            </div>
        </AppLayout>
    );
}
