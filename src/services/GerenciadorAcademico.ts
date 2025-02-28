
import { Aluno, calcularMedia } from "../models/Aluno";
import { Disciplina } from "../models/Disciplina";

let contadorMatricula = 1000;
let contadorCodigoDisciplina = 1;

class GerenciadorAcademico {
  private alunos: Aluno[] = [];
  private disciplinas: Disciplina[] = [];
  
  constructor() {
    this.carregarDados();
  }
  
  private carregarDados() {
    // Carregar do localStorage (simulando persistência)
    const alunosString = localStorage.getItem('alunos');
    const disciplinasString = localStorage.getItem('disciplinas');
    
    if (alunosString) {
      this.alunos = JSON.parse(alunosString);
      // Encontrar o maior número de matrícula para continuar a contagem
      this.alunos.forEach(aluno => {
        const matriculaNum = parseInt(aluno.matricula);
        if (matriculaNum >= contadorMatricula) {
          contadorMatricula = matriculaNum + 1;
        }
      });
    }
    
    if (disciplinasString) {
      this.disciplinas = JSON.parse(disciplinasString);
      // Encontrar o maior código de disciplina para continuar a contagem
      this.disciplinas.forEach(disciplina => {
        const codigo = parseInt(disciplina.codigo.substring(1));
        if (codigo >= contadorCodigoDisciplina) {
          contadorCodigoDisciplina = codigo + 1;
        }
      });
    }
  }
  
  private salvarDados() {
    localStorage.setItem('alunos', JSON.stringify(this.alunos));
    localStorage.setItem('disciplinas', JSON.stringify(this.disciplinas));
  }
  
  // Métodos para gerenciar alunos
  public cadastrarAluno(nome: string): Aluno {
    const aluno: Aluno = {
      matricula: String(contadorMatricula++),
      nome,
      notas: {}
    };
    
    this.alunos.push(aluno);
    this.salvarDados();
    return aluno;
  }
  
  public removerAluno(matricula: string): boolean {
    const tamanhoInicial = this.alunos.length;
    this.alunos = this.alunos.filter(aluno => aluno.matricula !== matricula);
    
    const removido = tamanhoInicial > this.alunos.length;
    if (removido) {
      this.salvarDados();
    }
    
    return removido;
  }
  
  public buscarAluno(matricula: string): Aluno | undefined {
    return this.alunos.find(aluno => aluno.matricula === matricula);
  }
  
  public listarAlunos(): Aluno[] {
    return [...this.alunos];
  }
  
  // Métodos para gerenciar disciplinas
  public cadastrarDisciplina(nome: string): Disciplina {
    const disciplina: Disciplina = {
      codigo: `D${contadorCodigoDisciplina++}`,
      nome
    };
    
    this.disciplinas.push(disciplina);
    this.salvarDados();
    return disciplina;
  }
  
  public listarDisciplinas(): Disciplina[] {
    return [...this.disciplinas];
  }
  
  public buscarDisciplina(codigo: string): Disciplina | undefined {
    return this.disciplinas.find(disciplina => disciplina.codigo === codigo);
  }
  
  // Método para adicionar nota
  public adicionarNota(matricula: string, codigoDisciplina: string, nota: number): boolean {
    const aluno = this.buscarAluno(matricula);
    const disciplina = this.buscarDisciplina(codigoDisciplina);
    
    if (!aluno || !disciplina) {
      return false;
    }
    
    if (!aluno.notas[codigoDisciplina]) {
      aluno.notas[codigoDisciplina] = [];
    }
    
    aluno.notas[codigoDisciplina].push(nota);
    this.salvarDados();
    return true;
  }
  
  // Método para obter a média de um aluno
  public calcularMediaAluno(matricula: string): number {
    const aluno = this.buscarAluno(matricula);
    if (!aluno) return 0;
    
    return calcularMedia(aluno.notas);
  }
}

// Singleton
export const gerenciadorAcademico = new GerenciadorAcademico();
