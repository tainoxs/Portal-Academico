
import { Header } from "@/components/ui/Header";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { gerenciadorAcademico } from "@/services/GerenciadorAcademico";
import { Users, BookOpen, FileSpreadsheet, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const totalAlunos = gerenciadorAcademico.listarAlunos().length;
  const totalDisciplinas = gerenciadorAcademico.listarDisciplinas().length;
  
  return (
    <AppLayout>
      <Header 
        title="Dashboard Acadêmico" 
        subtitle="Bem-vindo ao sistema de gerenciamento acadêmico"
      />
      
      <div className="grid md:grid-cols-3 gap-6">
        <DashboardCard 
          title="Alunos" 
          value={totalAlunos}
          description="Total de alunos cadastrados"
          icon={<Users size={24} />}
          linkTo="/alunos"
        />
        
        <DashboardCard 
          title="Disciplinas" 
          value={totalDisciplinas}
          description="Total de disciplinas cadastradas"
          icon={<BookOpen size={24} />}
          linkTo="/disciplinas"
        />
        
        <DashboardCard 
          title="Notas" 
          description="Gerenciar notas dos alunos"
          icon={<FileSpreadsheet size={24} />}
          linkTo="/notas"
          customContent
        />
      </div>
    </AppLayout>
  );
};

interface DashboardCardProps {
  title: string;
  value?: number;
  description: string;
  icon: React.ReactNode;
  linkTo: string;
  customContent?: boolean;
}

function DashboardCard({ 
  title, 
  value, 
  description, 
  icon, 
  linkTo,
  customContent = false
}: DashboardCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
            <span className="text-accent">{icon}</span>
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        {customContent ? (
          <Link to={linkTo}>
            <Button className="w-full" variant="outline">
              Acessar
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        ) : (
          <div className="flex justify-between items-center">
            <span className="text-3xl font-bold">{value}</span>
            <Link to={linkTo}>
              <Button size="sm" variant="ghost">
                Ver todos
                <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default Dashboard;
