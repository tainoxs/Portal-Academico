
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Aluno } from "@/models/Aluno";
import { Disciplina } from "@/models/Disciplina";
import { useState } from "react";

interface NotaFormProps {
  alunos: Aluno[];
  disciplinas: Disciplina[];
  onSubmit: (matricula: string, codigoDisciplina: string, nota: number) => void;
  isLoading?: boolean;
}

export function NotaForm({ alunos, disciplinas, onSubmit, isLoading = false }: NotaFormProps) {
  const [matricula, setMatricula] = useState("");
  const [codigoDisciplina, setCodigoDisciplina] = useState("");
  const [nota, setNota] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (matricula && codigoDisciplina && nota) {
      onSubmit(matricula, codigoDisciplina, parseFloat(nota));
      setNota("");
    }
  };
  
  const isFormValid = matricula && codigoDisciplina && nota && !isNaN(parseFloat(nota));
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="aluno">Aluno</Label>
        <Select value={matricula} onValueChange={setMatricula}>
          <SelectTrigger id="aluno">
            <SelectValue placeholder="Selecione um aluno" />
          </SelectTrigger>
          <SelectContent>
            {alunos.map((aluno) => (
              <SelectItem key={aluno.matricula} value={aluno.matricula}>
                {aluno.nome} (Matrícula: {aluno.matricula})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="disciplina">Disciplina</Label>
        <Select value={codigoDisciplina} onValueChange={setCodigoDisciplina}>
          <SelectTrigger id="disciplina">
            <SelectValue placeholder="Selecione uma disciplina" />
          </SelectTrigger>
          <SelectContent>
            {disciplinas.map((disciplina) => (
              <SelectItem key={disciplina.codigo} value={disciplina.codigo}>
                {disciplina.nome} (Código: {disciplina.codigo})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="nota">Nota</Label>
        <Input
          id="nota"
          type="number"
          min="0"
          max="10"
          step="0.1"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          placeholder="Insira uma nota de 0 a 10"
          required
        />
      </div>
      
      <Button type="submit" disabled={isLoading || !isFormValid}>
        {isLoading ? "Adicionando..." : "Adicionar Nota"}
      </Button>
    </form>
  );
}
