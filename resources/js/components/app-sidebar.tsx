import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { ChartNoAxesCombined, ClipboardList, HousePlus, UserCog, Users } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItemsMaster: NavItem[] = [
    { title: 'Data Balita', href: '/data-balita', icon: Users },
    { title: 'Data Tenaga Kesehatan', href: '/data-nakes', icon: Users },
];
const mainNavItemPosyandu: NavItem[] = [
    { title: 'Data Posyandu', href: '/data-posyandu', icon: HousePlus },
    { title: 'Data Wilayah', href: '/data-wilayah', icon: UserCog },
];
const mainNavItemPp: NavItem[] = [
    { title: 'Data Pengukuran', href: '/data-pengukuran-balita', icon: ClipboardList },
    { title: 'Data KMS', href: '/grafik-data-kms', icon: ChartNoAxesCombined },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="offcanvas" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton variant="default" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain nameLabel="Data Master" items={mainNavItemsMaster} />
                <NavMain nameLabel="Data Posyandu" items={mainNavItemPosyandu} />
                <NavMain nameLabel="Data Pengukuran dan Penimbangan" items={mainNavItemPp} />
            </SidebarContent>
        </Sidebar>
    );
}
