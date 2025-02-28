
export interface Aluno {
  matricula: string;
  nome: string;
  notas: Record<string, number[]>;
}

export function calcularMedia(notas: Record<string, number[]>): number {
  let totalNotas = 0;
  let soma = 0;
  
  Object.values(notas).forEach(notasDisciplina => {
    notasDisciplina.forEach(nota => {
      soma += nota;
      totalNotas++;
    });
  });
  
  return totalNotas === 0 ? 0 : soma / totalNotas;
}
