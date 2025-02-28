
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Header } from "@/components/ui/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, BookOpen } from "lucide-react";
import { gerenciadorAcademico } from "@/services/GerenciadorAcademico";
import { Aluno } from "@/models/Aluno";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AlunoDetalhes = () => {
  const { matricula } = useParams<{ matricula: string }>();
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (matricula) {
      const alunoEncontrado = gerenciadorAcademico.buscarAluno(matricula);
      if (alunoEncontrado) {
        setAluno(alunoEncontrado);
      }
    }
  }, [matricula]);
  
  if (!aluno) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h3 className="text-lg font-semibold mb-2">Aluno não encontrado</h3>
          <p className="text-muted-foreground mb-4">O aluno com a matrícula {matricula} não foi encontrado.</p>
          <Button onClick={() => navigate("/alunos")}>
            <ArrowLeft size={16} className="mr-2" />
            Voltar para Lista de Alunos
          </Button>
        </div>
      </AppLayout>
    );
  }
  
  const mediaGeral = gerenciadorAcademico.calcularMediaAluno(aluno.matricula);
  const temDisciplinas = Object.keys(aluno.notas).length > 0;
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <Header 
          title={aluno.nome}
          subtitle={`Matrícula: ${aluno.matricula}`}
          action={
            <Button variant="outline" onClick={() => navigate("/alunos")}>
              <ArrowLeft size={16} className="mr-2" />
              Voltar
            </Button>
          }
        />
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <User size={20} className="text-accent" />
                </div>
                <div>
                  <CardTitle>Informações do Aluno</CardTitle>
                  <CardDescription>Dados cadastrais</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Nome</dt>
                  <dd className="mt-1 text-base">{aluno.nome}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Matrícula</dt>
                  <dd className="mt-1 text-base">{aluno.matricula}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Disciplinas Matriculadas</dt>
                  <dd className="mt-1 text-base">{Object.keys(aluno.notas).length}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Média Geral</dt>
                  <dd className="mt-1 text-xl font-semibold">{mediaGeral.toFixed(1)}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <BookOpen size={20} className="text-accent" />
                </div>
                <div>
                  <CardTitle>Notas do Aluno</CardTitle>
                  <CardDescription>Desempenho acadêmico</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {!temDisciplinas ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Este aluno ainda não possui notas registradas.
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Disciplina</TableHead>
                      <TableHead>Notas</TableHead>
                      <TableHead className="text-right">Média</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(aluno.notas).map(([codigo, notas]) => {
                      const disciplina = gerenciadorAcademico.buscarDisciplina(codigo);
                      const media = notas.reduce((a, b) => a + b, 0) / notas.length;
                      
                      return (
                        <TableRow key={codigo}>
                          <TableCell className="font-medium">
                            {disciplina?.nome || codigo}
                          </TableCell>
                          <TableCell>
                            {notas.map((nota, index) => (
                              <span key={index} className="mr-1">
                                {nota.toFixed(1)}{index < notas.length - 1 ? "," : ""}
                              </span>
                            ))}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {media.toFixed(1)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default AlunoDetalhes;
