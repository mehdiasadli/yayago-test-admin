import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  href: string;
  text: string;
  icon?: React.ReactNode;
  className?: string;
  linkClassName?: string;
  buttonProps?: Omit<React.ComponentProps<typeof Button>, 'asChild' | 'className' | 'children'>;
  linkProps?: Omit<React.ComponentProps<typeof Link>, 'href' | 'className'>;
}

export function BackButton({ href, text, icon, className, buttonProps, linkProps, linkClassName }: BackButtonProps) {
  return (
    <Button asChild className={className} variant='outline' {...buttonProps}>
      <Link href={href} className={linkClassName} {...linkProps}>
        {icon ?? <ArrowLeft className='size-4' />}
        {text}
      </Link>
    </Button>
  );
}
