import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Megaphone } from 'lucide-react';
import { Nakes, columns } from './columns';
import { DataTable } from './data-table';
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

interface PageProps {
    flash: {
        message?: string;
    };
}

export default function Dashboard({ nakes }: { nakes: Nakes[] }) {
    const { flash } = usePage().props as unknown as PageProps;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Tenaga Kesehatan" />
            <div className="m-4">
                <Link href={route('nakes.tambah')}>
                    <Button className="bg-teal-500 hover:bg-teal-800">Tambah Data Tenaga Kesehatan Baru</Button>
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
                <DataTable columns={columns} data={nakes} />
            </div>
        </AppLayout>
    );
}
