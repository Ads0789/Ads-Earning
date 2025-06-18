'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, DollarSign, UserCircle, Users, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/earnings', label: 'Earnings', icon: DollarSign },
  { href: '/redeem', label: 'Redeem', icon: Gift },
  { href: '/referral', label: 'Referrals', icon: Users },
  { href: '/profile', label: 'Profile', icon: UserCircle },
];

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 md:space-x-4">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out',
              isActive
                ? 'bg-primary/10 text-primary dark:bg-primary/20'
                : 'text-muted-foreground hover:bg-primary/5 hover:text-primary dark:hover:bg-primary/10',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background'
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            <item.icon className={cn('h-5 w-5', isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary')} />
            <span className="hidden sm:inline">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavLinks;