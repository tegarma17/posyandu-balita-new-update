import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
interface GrafikWHOProps {
    data: any;
    options?: any;
}

export default function Dashboard({ data, options }: GrafikWHOProps) {
    const whoBBU = {
        labels: Array.from({ length: 60 }, (_, i) => i), // usia 0–12 bulan
        datasets: [
            {
                label: '-3 SD',
                data: [
                    2, 2.7, 3.4, 4, 4.4, 4.8, 5.1, 5.3, 5.6, 5.8, 5.9, 6.1, 6.3, 6.4, 6.6, 6.7, 6.9, 7, 7.2, 7.3, 7.5, 7.6, 7.8, 7.9, 8.1, 8.2, 8.4,
                    8.5, 8.6, 8.8, 8.9, 9, 9.1, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9, 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9, 11, 11.1,
                    11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8, 11.9, 12, 12.1,
                ],
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239,68,68,0.2)',
            },
            {
                label: '-2 SD',
                data: [
                    2.4, 3.2, 3.9, 4.5, 5, 5.4, 5.7, 6, 6.3, 6.5, 6.7, 6.9, 7, 7.2, 7.4, 7.6, 7.7, 7.9, 8.1, 8.2, 8.4, 8.6, 8.7, 8.9, 9, 9.2, 9.4,
                    9.5, 9.7, 9.8, 10, 10.1, 10.3, 10.4, 10.5, 10.7, 10.8, 10.9, 11.1, 11.2, 11.3, 11.5, 11.6, 11.7, 11.8, 12, 12.1, 12.2, 12.3, 12.4,
                    12.6, 12.7, 12.8, 12.9, 13, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7,
                ],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59,130,246,0.2)',
            },
            {
                label: '-1 SD',
                data: [
                    2.8, 3.6, 4.5, 5.2, 5.7, 6.1, 6.5, 6.8, 7, 7.3, 7.5, 7.7, 7.9, 8.1, 8.3, 8.5, 8.7, 8.9, 9.1, 9.2, 9.4, 9.6, 9.8, 10, 10.2, 10.3,
                    10.5, 10.7, 10.9, 11.1, 11.2, 11.4, 11.6, 11.7, 11.9, 12, 12.2, 12.4, 12.5, 12.7, 12.8, 13, 13.1, 13.3, 13.4, 13.6, 13.7, 13.9,
                    14, 14.2, 14.3, 14.5, 14.6, 14.8, 14.9, 15.1, 15.2, 15.3, 15.5, 15.6, 15.8,
                ],
                borderColor: '#5878b8',
                backgroundColor: 'rgba(59,130,246,0.2)',
            },
            {
                label: '0 SD',
                data: [
                    3.2, 4.2, 5.1, 5.8, 6.4, 6.9, 7.3, 7.6, 7.9, 8.2, 8.5, 8.7, 8.9, 9.2, 9.4, 9.6, 9.8, 10, 10.2, 10.4, 10.6, 10.9, 11.1, 11.3, 11.5,
                    11.7, 11.9, 12.1, 12.3, 12.5, 12.7, 12.9, 13.1, 13.3, 13.5, 13.7, 13.9, 14, 14.2, 14.4, 14.6, 14.8, 15, 15.2, 15.3, 15.5, 15.7,
                    15.9, 16.1, 16.3, 16.4, 16.6, 16.8, 17, 17.2, 17.3, 17.5, 17.7, 17.9, 18, 18.2,
                ],
                borderColor: '#444547',
                backgroundColor: 'rgba(59,130,246,0.2)',
            },
            {
                label: '+1 SD',
                data: [
                    3.7, 4.8, 5.8, 6.6, 7.3, 7.8, 8.2, 8.6, 9, 9.3, 9.6, 9.9, 10.1, 10.4, 10.6, 10.9, 11.1, 11.4, 11.6, 11.8, 12.1, 12.3, 12.5, 12.8,
                    13, 13.3, 13.5, 13.7, 14, 14.2, 14.4, 14.7, 14.9, 15.1, 15.4, 15.6, 15.8, 16, 16.3, 16.5, 16.7, 16.9, 17.2, 17.4, 17.6, 17.8,
                    18.1, 18.3, 18.5, 18.8, 19, 19.2, 19.4, 19.7, 19.9, 20.1, 20.3, 20.6, 20.8, 21, 21.2,
                ],
                borderColor: '#38802d',
                backgroundColor: 'rgba(34,197,94,0.2)',
            },
            {
                label: '+2 SD',
                data: [
                    4.2, 5.5, 6.6, 7.5, 8.2, 8.8, 9.3, 9.8, 10.2, 10.5, 10.9, 11.2, 11.5, 11.8, 12.1, 12.4, 12.6, 12.9, 13.2, 13.5, 13.7, 14, 14.3,
                    14.6, 14.8, 15.1, 15.4, 15.7, 16, 16.2, 16.5, 16.8, 17.1, 17.3, 17.6, 17.9, 18.1, 18.4, 18.7, 19, 19.2, 19.5, 19.8, 20.1, 20.4,
                    20.7, 20.9, 21.2, 21.5, 21.8, 22.1, 22.4, 22.6, 22.9, 23.2, 23.5, 23.8, 24.1, 24.4, 24.6, 24.9,
                ],
                borderColor: '#52b543',
                backgroundColor: 'rgba(34,197,94,0.2)',
            },
            {
                label: '+3 SD',
                data: [
                    4.8, 6.2, 7.5, 8.5, 9.3, 10, 10.6, 11.1, 11.6, 12, 12.4, 12.8, 13.1, 13.5, 13.8, 14.1, 14.5, 14.8, 15.1, 15.4, 15.7, 16, 16.4,
                    16.7, 17, 17.3, 17.7, 18, 18.3, 18.7, 19, 19.3, 19.6, 20, 20.3, 20.6, 20.9, 21.3, 21.6, 22, 22.3, 22.7, 23, 23.4, 23.7, 24.1,
                    24.5, 24.8, 25.2, 25.5, 25.9, 26.3, 26.6, 27, 27.4, 27.7, 28.1, 28.5, 28.8, 29.2, 29.5,
                ],
                borderColor: '#22c55e',
                backgroundColor: 'rgba(34,197,94,0.2)',
            },
        ],
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card className="w-full overflow-auto">
                    <CardHeader className="text-lg font-bold">Grafik KMS WHO (BB/U)</CardHeader>
                    <CardContent className="mx-auto p-0">
                        <div className="min-h-[600px] min-w-[1200px] origin-top-left scale-100">
                            <Line
                                data={whoBBU}
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
                <Card className="w-full overflow-auto">
                    <CardHeader className="text-lg font-bold">Grafik KMS WHO (BB/U)</CardHeader>
                    <CardContent className="mx-auto p-0">
                        <div className="min-h-[600px] min-w-[1200px] origin-top-left scale-100">
                            <Line
                                data={whoBBU}
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
