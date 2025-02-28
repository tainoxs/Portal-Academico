
import { SidebarNav } from "./SidebarNav";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <SidebarNav />
      <main className="flex-1 p-6 md:p-10 animate-fade-in">
        {children}
      </main>
    </div>
  );
}
