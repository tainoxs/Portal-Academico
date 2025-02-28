
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Header } from "@/components/ui/Header";
import { gerenciadorAcademico } from "@/services/GerenciadorAcademico";
import { Aluno } from "@/models/Aluno";
import { Disciplina } from "@/models/Disciplina";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RelacionamentoPage = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);

  useEffect(() => {
    setAlunos(gerenciadorAcademico.listarAlunos());
    setDisciplinas(gerenciadorAcademico.listarDisciplinas());
  }, []);

  return (
    <AppLayout>
      <Header 
        title="Relacionamentos" 
        subtitle="Visualização da relação entre alunos, disciplinas e notas"
      />
      
      <Tabs defaultValue="alunos">
        <TabsList className="mb-6">
          <TabsTrigger value="alunos">Por Aluno</TabsTrigger>
          <TabsTrigger value="disciplinas">Por Disciplina</TabsTrigger>
          <TabsTrigger value="completo">Relatório Completo</TabsTrigger>
        </TabsList>
        
        <TabsContent value="alunos">
          <Card>
            <CardHeader>
              <CardTitle>Notas por Aluno</CardTitle>
              <CardDescription>
                Visualize todas as notas organizadas por aluno
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
                      <TableHead className="text-right">Média</TableHead>
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
                                
                                return (
                                  <div key={codigo} className="text-sm">
                                    <span className="font-medium">{disciplina?.nome || codigo}:</span>{" "}
                                    {notas.map((n, i) => (
                                      <span key={i}>
                                        {n.toFixed(1)}{i < notas.length - 1 ? ", " : ""}
                                      </span>
                                    ))}
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
        
        <TabsContent value="disciplinas">
          <Card>
            <CardHeader>
              <CardTitle>Notas por Disciplina</CardTitle>
              <CardDescription>
                Visualize todas as notas organizadas por disciplina
              </CardDescription>
            </CardHeader>
            <CardContent>
              {disciplinas.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">
                    Nenhuma disciplina cadastrada no sistema.
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Disciplina</TableHead>
                      <TableHead>Alunos</TableHead>
                      <TableHead className="text-right">Média da Turma</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {disciplinas.map((disciplina) => {
                      const alunosComNota = alunos.filter(
                        (aluno) => aluno.notas[disciplina.codigo]?.length > 0
                      );
                      
                      // Calcular média da disciplina
                      let somaNotas = 0;
                      let totalNotas = 0;
                      
                      alunosComNota.forEach(aluno => {
                        aluno.notas[disciplina.codigo].forEach(nota => {
                          somaNotas += nota;
                          totalNotas++;
                        });
                      });
                      
                      const mediaDisciplina = totalNotas > 0 ? somaNotas / totalNotas : 0;
                      
                      return (
                        <TableRow key={disciplina.codigo}>
                          <TableCell className="font-medium">{disciplina.codigo}</TableCell>
                          <TableCell>{disciplina.nome}</TableCell>
                          <TableCell>
                            {alunosComNota.length > 0 ? (
                              <div className="space-y-1">
                                {alunosComNota.map((aluno) => {
                                  const notas = aluno.notas[disciplina.codigo] || [];
                                  const media = notas.reduce((a, b) => a + b, 0) / notas.length;
                                  
                                  return (
                                    <div key={aluno.matricula} className="text-sm">
                                      <span className="font-medium">{aluno.nome} ({aluno.matricula}):</span>{" "}
                                      {notas.map((n, i) => (
                                        <span key={i}>
                                          {n.toFixed(1)}{i < notas.length - 1 ? ", " : ""}
                                        </span>
                                      ))}
                                      {notas.length > 0 && ` → ${media.toFixed(1)}`}
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <span className="text-muted-foreground">Nenhum aluno com nota</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {mediaDisciplina.toFixed(1)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completo">
          <Card>
            <CardHeader>
              <CardTitle>Relatório Completo</CardTitle>
              <CardDescription>
                Visualização detalhada de todas as notas em formato tabular
              </CardDescription>
            </CardHeader>
            <CardContent>
              {(alunos.length === 0 || disciplinas.length === 0) ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">
                    {alunos.length === 0 && disciplinas.length === 0 && 
                      "Nenhum aluno ou disciplina cadastrados no sistema."}
                    {alunos.length === 0 && disciplinas.length > 0 && 
                      "Nenhum aluno cadastrado no sistema."}
                    {alunos.length > 0 && disciplinas.length === 0 && 
                      "Nenhuma disciplina cadastrada no sistema."}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Matrícula</TableHead>
                        <TableHead className="w-[180px]">Aluno</TableHead>
                        {disciplinas.map((disciplina) => (
                          <TableHead key={disciplina.codigo} className="text-center">
                            {disciplina.nome}<br />
                            <span className="text-xs text-muted-foreground">({disciplina.codigo})</span>
                          </TableHead>
                        ))}
                        <TableHead className="text-right">Média Geral</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {alunos.map((aluno) => (
                        <TableRow key={aluno.matricula}>
                          <TableCell className="font-medium">{aluno.matricula}</TableCell>
                          <TableCell>{aluno.nome}</TableCell>
                          
                          {disciplinas.map((disciplina) => {
                            const notas = aluno.notas[disciplina.codigo] || [];
                            const media = notas.length > 0 
                              ? notas.reduce((a, b) => a + b, 0) / notas.length 
                              : null;
                            
                            return (
                              <TableCell key={disciplina.codigo} className="text-center">
                                {notas.length > 0 ? (
                                  <div>
                                    <div className="text-xs space-x-1 mb-1">
                                      {notas.map((nota, idx) => (
                                        <span key={idx} className="inline-block">
                                          {nota.toFixed(1)}
                                          {idx < notas.length - 1 && ", "}
                                        </span>
                                      ))}
                                    </div>
                                    {media !== null && (
                                      <div className="font-medium text-sm">
                                        {media.toFixed(1)}
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-muted-foreground text-xs">-</span>
                                )}
                              </TableCell>
                            );
                          })}
                          
                          <TableCell className="text-right font-medium">
                            {gerenciadorAcademico.calcularMediaAluno(aluno.matricula).toFixed(1)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default RelacionamentoPage;
