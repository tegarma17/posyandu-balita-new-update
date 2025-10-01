import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { columns, Posyandu } from './columns-posyandu';
import { DataTable } from './data-table-posyandu';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Data PGS',
        href: '',
    },
];

interface PageProps {
    flash: {
        message?: string;
    };
}

export default function Dashboard({ posyandu }: { posyandu: Posyandu[] }) {
    const { flash } = usePage().props as unknown as PageProps;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data PGS" />

            <div className="mx-auto w-full p-4">
                <DataTable columns={columns} data={posyandu} />
            </div>
        </AppLayout>
    );
}
