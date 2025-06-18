import Header from './header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="py-6 text-center text-xs text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} TaskTriumph. All rights reserved.</p>
        <p>Built with Next.js and Firebase.</p>
      </footer>
    </div>
  );
};

export default MainLayout;