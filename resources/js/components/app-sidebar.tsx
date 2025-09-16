import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { HousePlus, UserCog, Users } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItemsMaster: NavItem[] = [
    { title: 'Data Balita', href: '/data-balita', icon: Users },
    { title: 'Data Wilayah', href: '/data-wilayah', icon: UserCog },
    { title: 'Data Tenaga Kesehatan', href: '/data-nakes', icon: Users },
    { title: 'Data Posyandu', href: '/pengurus', icon: HousePlus },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItemsMaster} />
            </SidebarContent>
        </Sidebar>
    );
}
