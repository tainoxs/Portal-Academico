
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
import { AlunoForm } from "@/components/alunos/AlunoForm";
import { AlunoCard } from "@/components/alunos/AlunoCard";
import { Aluno } from "@/models/Aluno";
import { gerenciadorAcademico } from "@/services/GerenciadorAcademico";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AlunosPage = () => {
  const [alunos, setAlunos] = useState<Aluno[]>(gerenciadorAcademico.listarAlunos());
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alunoParaRemover, setAlunoParaRemover] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleCadastrarAluno = (nome: string) => {
    setIsLoading(true);
    try {
      const novoAluno = gerenciadorAcademico.cadastrarAluno(nome);
      setAlunos(gerenciadorAcademico.listarAlunos());
      toast({
        title: "Aluno cadastrado",
        description: `${nome} foi cadastrado com sucesso.`,
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Erro ao cadastrar",
        description: "Não foi possível cadastrar o aluno.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const confirmarRemocao = (matricula: string) => {
    setAlunoParaRemover(matricula);
  };
  
  const removerAluno = () => {
    if (!alunoParaRemover) return;
    
    const alunoRemovido = gerenciadorAcademico.buscarAluno(alunoParaRemover);
    const removido = gerenciadorAcademico.removerAluno(alunoParaRemover);
    
    if (removido && alunoRemovido) {
      setAlunos(gerenciadorAcademico.listarAlunos());
      toast({
        title: "Aluno removido",
        description: `${alunoRemovido.nome} foi removido com sucesso.`,
      });
    } else {
      toast({
        title: "Erro ao remover",
        description: "Não foi possível remover o aluno.",
        variant: "destructive",
      });
    }
    
    setAlunoParaRemover(null);
  };
  
  return (
    <AppLayout>
      <Header 
        title="Alunos" 
        subtitle="Gerencie os alunos cadastrados no sistema"
        action={
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle size={16} className="mr-2" />
                Novo Aluno
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cadastrar Aluno</DialogTitle>
                <DialogDescription>
                  Preencha os dados para cadastrar um novo aluno.
                </DialogDescription>
              </DialogHeader>
              <AlunoForm onSubmit={handleCadastrarAluno} isLoading={isLoading} />
            </DialogContent>
          </Dialog>
        }
      />
      
      {alunos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h3 className="text-lg font-semibold mb-2">Nenhum aluno cadastrado</h3>
          <p className="text-muted-foreground mb-4">Cadastre alunos para começar a gerenciar.</p>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle size={16} className="mr-2" />
                Cadastrar Primeiro Aluno
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cadastrar Aluno</DialogTitle>
                <DialogDescription>
                  Preencha os dados para cadastrar um novo aluno.
                </DialogDescription>
              </DialogHeader>
              <AlunoForm onSubmit={handleCadastrarAluno} isLoading={isLoading} />
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {alunos.map((aluno) => (
            <AlunoCard 
              key={aluno.matricula} 
              aluno={aluno} 
              onRemover={confirmarRemocao}
            />
          ))}
        </div>
      )}
      
      <AlertDialog 
        open={alunoParaRemover !== null} 
        onOpenChange={(open) => !open && setAlunoParaRemover(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover Aluno</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover este aluno? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={removerAluno} className="bg-destructive text-destructive-foreground">
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
};

export default AlunosPage;
