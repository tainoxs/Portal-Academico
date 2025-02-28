
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Header } from "@/components/ui/Header";
import { NotaForm } from "@/components/notas/NotaForm";
import { Aluno } from "@/models/Aluno";
import { Disciplina } from "@/models/Disciplina";
import { gerenciadorAcademico } from "@/services/GerenciadorAcademico";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const NotasPage = () => {
  const [alunos, setAlunos] = useState<Aluno[]>(gerenciadorAcademico.listarAlunos());
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>(gerenciadorAcademico.listarDisciplinas());
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    setAlunos(gerenciadorAcademico.listarAlunos());
    setDisciplinas(gerenciadorAcademico.listarDisciplinas());
  }, []);
  
  const handleAdicionarNota = (matricula: string, codigoDisciplina: string, nota: number) => {
    setIsLoading(true);
    try {
      const sucesso = gerenciadorAcademico.adicionarNota(matricula, codigoDisciplina, nota);
      
      if (sucesso) {
        setAlunos(gerenciadorAcademico.listarAlunos());
        const aluno = gerenciadorAcademico.buscarAluno(matricula);
        const disciplina = gerenciadorAcademico.buscarDisciplina(codigoDisciplina);
        
        toast({
          title: "Nota adicionada",
          description: `Nota ${nota.toFixed(1)} adicionada para ${aluno?.nome} em ${disciplina?.nome}.`,
        });
      } else {
        toast({
          title: "Erro ao adicionar nota",
          description: "Aluno ou disciplina não encontrados.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao adicionar nota",
        description: "Ocorreu um erro ao adicionar a nota.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AppLayout>
      <Header 
        title="Notas" 
        subtitle="Adicione e visualize notas dos alunos"
      />
      
      <Tabs defaultValue="adicionar">
        <TabsList className="mb-6">
          <TabsTrigger value="adicionar">Adicionar Nota</TabsTrigger>
          <TabsTrigger value="visualizar">Visualizar Notas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="adicionar">
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Nova Nota</CardTitle>
              <CardDescription>
                Selecione um aluno, uma disciplina e insira a nota.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {alunos.length === 0 || disciplinas.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-2">
                    {alunos.length === 0 && disciplinas.length === 0 && (
                      "É necessário cadastrar alunos e disciplinas primeiro."
                    )}
                    {alunos.length === 0 && disciplinas.length > 0 && (
                      "É necessário cadastrar alunos primeiro."
                    )}
                    {alunos.length > 0 && disciplinas.length === 0 && (
                      "É necessário cadastrar disciplinas primeiro."
                    )}
                  </p>
                </div>
              ) : (
                <NotaForm 
                  alunos={alunos}
                  disciplinas={disciplinas}
                  onSubmit={handleAdicionarNota}
                  isLoading={isLoading}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="visualizar">
          <Card>
            <CardHeader>
              <CardTitle>Notas dos Alunos</CardTitle>
              <CardDescription>
                Visualize as notas de todos os alunos por disciplina.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {alunos.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">
                    Nenhum aluno cadastrado no sistema.
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Matrícula</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Disciplinas</TableHead>
                      <TableHead className="text-right">Média Geral</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alunos.map((aluno) => (
                      <TableRow key={aluno.matricula}>
                        <TableCell className="font-medium">{aluno.matricula}</TableCell>
                        <TableCell>{aluno.nome}</TableCell>
                        <TableCell>
                          {Object.entries(aluno.notas).length > 0 ? (
                            <div className="space-y-1">
                              {Object.entries(aluno.notas).map(([codigo, notas]) => {
                                const disciplina = gerenciadorAcademico.buscarDisciplina(codigo);
                                const media = notas.reduce((a, b) => a + b, 0) / notas.length;
                                
                                return (
                                  <div key={codigo} className="text-sm">
                                    <span className="font-medium">{disciplina?.nome || codigo}:</span>{" "}
                                    {notas.map((n, i) => (
                                      <span key={i}>
                                        {n.toFixed(1)}{i < notas.length - 1 ? ", " : ""}
                                      </span>
                                    ))}
                                    {" → "}<span className="font-medium">{media.toFixed(1)}</span>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">Sem notas</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {gerenciadorAcademico.calcularMediaAluno(aluno.matricula).toFixed(1)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default NotasPage;
