
import { Link } from "react-router-dom";
import { 
  Users, BookOpen, GraduationCap, 
  Home, FileSpreadsheet, PlusCircle 
} from "lucide-react";

export function SidebarNav() {
  return (
    <aside className="w-64 bg-sidebar border-r border-border h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-semibold flex items-center gap-2 text-sidebar-foreground">
          <GraduationCap className="text-accent" size={24} />
          <span>Portal Acadêmico</span>
        </h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <NavItem to="/" icon={<Home size={18} />} label="Início" />
        <NavItem to="/alunos" icon={<Users size={18} />} label="Alunos" />
        <NavItem to="/disciplinas" icon={<BookOpen size={18} />} label="Disciplinas" />
        <NavItem to="/notas" icon={<FileSpreadsheet size={18} />} label="Notas" />
      </nav>
      
      <div className="p-4 border-t border-border">
        <Link 
          to="/sobre" 
          className="text-sm text-muted-foreground hover:text-foreground transition-all-200"
        >
          © 2023 Portal Acadêmico
        </Link>
      </div>
    </aside>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

function NavItem({ to, icon, label }: NavItemProps) {
  return (
    <Link 
      to={to}
      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent transition-all-200 text-muted-foreground hover:text-sidebar-foreground"
    >
      <span className="text-accent">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
