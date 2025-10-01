import { Card, CardContent, CardHeader } from '@/components/ui/card';
import bbL from '@/data/bbL.json';
import bbP from '@/data/bbP.json';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend, // ← ini wajib untuk skala X
    LinearScale,
    LineElement,
    PointElement, // ← ini untuk skala Y
    Title,
    Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const beratBadanLaki = {
        labels: Array.from({ length: 61 }, (_, i) => i),
        ...bbL,
    };
    const beratBadanPerempuan = {
        labels: Array.from({ length: 61 }, (_, i) => i),
        ...bbP,
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card className="w-full overflow-auto">
                    <CardHeader className="text-lg font-bold">Grafik (BB/U)</CardHeader>
                    <CardContent className="mx-auto p-0">
                        <div className="min-h-[600px] min-w-[1400px] origin-top-left scale-100">
                            <Line
                                data={beratBadanLaki}
                                options={{
                                    responsive: true,

                                    plugins: {
                                        legend: {
                                            position: 'top',
                                        },
                                        title: {
                                            display: true,
                                            text: 'Berat Badan per Umur (Laki - Laki)',
                                        },
                                    },
                                    scales: {
                                        x: {
                                            title: {
                                                display: true,
                                                text: 'Usia (bulan)',
                                            },
                                        },
                                        y: {
                                            title: {
                                                display: true,
                                                text: 'Berat Badan (kg)',
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-full overflow-auto">
                    <CardHeader className="text-lg font-bold">Grafik (BB/U)</CardHeader>
                    <CardContent className="mx-auto p-0">
                        <div className="min-h-[600px] min-w-[1200px] origin-top-left scale-100">
                            <Line
                                data={beratBadanPerempuan}
                                options={{
                                    responsive: true,

                                    plugins: {
                                        legend: {
                                            position: 'top',
                                        },
                                        title: {
                                            display: true,
                                            text: 'Berat Badan per Umur (Perempuan)',
                                        },
                                    },
                                    scales: {
                                        x: {
                                            title: {
                                                display: true,
                                                text: 'Usia (bulan)',
                                            },
                                        },
                                        y: {
                                            title: {
                                                display: true,
                                                text: 'Berat Badan (kg)',
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
