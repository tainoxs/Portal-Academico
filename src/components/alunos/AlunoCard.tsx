
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Aluno, calcularMedia } from "@/models/Aluno";
import { MoreVertical, User, Trash } from "lucide-react";
import { Link } from "react-router-dom";

interface AlunoCardProps {
  aluno: Aluno;
  onRemover: (matricula: string) => void;
}

export function AlunoCard({ aluno, onRemover }: AlunoCardProps) {
  const media = calcularMedia(aluno.notas);
  const totalDisciplinas = Object.keys(aluno.notas).length;
  
  return (
    <Card className="w-full overflow-hidden transition-all hover:shadow-lg animate-scale-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
              <User size={16} className="text-accent" />
            </div>
            <div>
              <CardTitle className="text-base">{aluno.nome}</CardTitle>
              <CardDescription>Matrícula: {aluno.matricula}</CardDescription>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={`/alunos/${aluno.matricula}`}>Ver detalhes</Link>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-destructive"
                onClick={() => onRemover(aluno.matricula)}
              >
                <Trash size={16} className="mr-2" />
                Remover
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="text-sm text-muted-foreground">
          {totalDisciplinas === 0 ? (
            <p>Nenhuma disciplina matriculada</p>
          ) : (
            <p>{totalDisciplinas} disciplina(s) matriculada(s)</p>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t bg-muted/30 text-sm justify-between">
        <span>Média Geral:</span>
        <div className="font-medium">
          {media.toFixed(1)}
        </div>
      </CardFooter>
    </Card>
  );
}
