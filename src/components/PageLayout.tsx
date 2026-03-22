import React from 'react';
import { cn } from '@/lib/utils';
import Navbar from './Navbar';
import Footer from './Footer';

type PageLayoutProps = {
  children: React.ReactNode;
  className?: string;
  showFooter?: boolean;
  hasHero?: boolean;
};

export default function PageLayout({
  children,
  className = '',
  showFooter = false,
  hasHero = false,
}: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-hidden">
      <Navbar />
      <main className={cn(
        "flex-grow w-full",
        !hasHero && "pt-[140px] lg:pt-[180px]",
        className
      )}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}