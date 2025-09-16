import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Megaphone } from 'lucide-react';
import { Balita, columns } from './columns';
import { DataTable } from './data-table';
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

interface PageProps {
    flash: {
        message?: string;
    };
}

export default function Dashboard({ balita }: { balita: Balita[] }) {
    const { flash } = usePage().props as unknown as PageProps;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Balita" />
            <div className="m-4">
                <Link href={route('balita.create')}>
                    <Button className="bg-teal-500 hover:bg-teal-800">Tambah Data Balita Baru</Button>
                </Link>
            </div>
            <div className="m-4">
                {flash.message && (
                    <Alert>
                        <Megaphone className="h-4 w-4" />
                        <AlertTitle>Notifikasi !!</AlertTitle>
                        <AlertDescription>{flash.message}</AlertDescription>
                    </Alert>
                )}
            </div>

            <div className="mx-auto w-full p-4">
                <DataTable columns={columns} data={balita} />
            </div>
        </AppLayout>
    );
}
