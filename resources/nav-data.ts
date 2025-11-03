import { Bell, Calendar, Car, Home, LucideIcon, Settings, Users } from 'lucide-react';

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
