import Link from 'next/link';
import { Gem } from 'lucide-react';

const Logo = ({ size = 'default' }: { size?: 'default' | 'large' }) => {
  const textSizeClass = size === 'large' ? 'text-3xl md:text-4xl' : 'text-2xl';
  const iconSizeClass = size === 'large' ? 'h-8 w-8 md:h-10 md:w-10' : 'h-7 w-7';

  return (
    <Link href="/" className="flex items-center gap-2 group" aria-label="TaskTriumph Home">
      <Gem className={`${iconSizeClass} text-primary group-hover:animate-pulse transition-transform duration-300 group-hover:scale-110`} />
      <span className={`${textSizeClass} font-headline font-bold text-primary group-hover:text-primary/80 transition-colors`}>
        TaskTriumph
      </span>
    </Link>
  );
};

export default Logo;
