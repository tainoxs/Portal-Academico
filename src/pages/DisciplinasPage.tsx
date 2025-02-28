
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Header } from "@/components/ui/Header";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DisciplinaForm } from "@/components/disciplinas/DisciplinaForm";
import { DisciplinaCard } from "@/components/disciplinas/DisciplinaCard";
import { Disciplina } from "@/models/Disciplina";
import { gerenciadorAcademico } from "@/services/GerenciadorAcademico";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const DisciplinasPage = () => {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>(gerenciadorAcademico.listarDisciplinas());
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleCadastrarDisciplina = (nome: string) => {
    setIsLoading(true);
    try {
      const novaDisciplina = gerenciadorAcademico.cadastrarDisciplina(nome);
      setDisciplinas(gerenciadorAcademico.listarDisciplinas());
      toast({
        title: "Disciplina cadastrada",
        description: `${nome} foi cadastrada com sucesso.`,
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Erro ao cadastrar",
        description: "Não foi possível cadastrar a disciplina.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AppLayout>
      <Header 
        title="Disciplinas" 
        subtitle="Gerencie as disciplinas do sistema"
        action={
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle size={16} className="mr-2" />
                Nova Disciplina
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cadastrar Disciplina</DialogTitle>
                <DialogDescription>
                  Preencha os dados para cadastrar uma nova disciplina.
                </DialogDescription>
              </DialogHeader>
              <DisciplinaForm onSubmit={handleCadastrarDisciplina} isLoading={isLoading} />
            </DialogContent>
          </Dialog>
        }
      />
      
      {disciplinas.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h3 className="text-lg font-semibold mb-2">Nenhuma disciplina cadastrada</h3>
          <p className="text-muted-foreground mb-4">Cadastre disciplinas para começar a gerenciar.</p>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle size={16} className="mr-2" />
                Cadastrar Primeira Disciplina
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cadastrar Disciplina</DialogTitle>
                <DialogDescription>
                  Preencha os dados para cadastrar uma nova disciplina.
                </DialogDescription>
              </DialogHeader>
              <DisciplinaForm onSubmit={handleCadastrarDisciplina} isLoading={isLoading} />
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {disciplinas.map((disciplina) => (
            <DisciplinaCard 
              key={disciplina.codigo} 
              disciplina={disciplina} 
            />
          ))}
        </div>
      )}
    </AppLayout>
  );
};

export default DisciplinasPage;
