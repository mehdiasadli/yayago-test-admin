import { Bell, Calendar, Car, Globe, Home, LucideIcon, Settings, Users } from 'lucide-react';

export const mainNavigationLinks: MainNavigationLink[] = [
  {
    title: 'Dashboard',
    url: '/',
    icon: Home,
  },
  {
    title: 'Users',
    url: '/users',
    icon: Users,
  },
  {
    title: 'Vehicles',
    url: '/vehicles',
    icon: Car,
  },
  {
    title: 'Bookings',
    url: '/bookings',
    icon: Calendar,
  },
];

export const secondaryNavigationLinks: SecondaryNavigationLink[] = [
  {
    title: 'Public Website',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    icon: Globe,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
  {
    title: 'Notifications',
    url: '/notifications',
    icon: Bell,
  },
];

export type NavigationLink = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export type MainNavigationLink = NavigationLink & {
  isActive?: boolean;
  items?: MainNavigationLinkItem[];
};

export type MainNavigationLinkItem = Omit<NavigationLink, 'icon'>;

export type SecondaryNavigationLink = NavigationLink;
