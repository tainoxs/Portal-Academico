
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface DisciplinaFormProps {
  onSubmit: (nome: string) => void;
  isLoading?: boolean;
}

export function DisciplinaForm({ onSubmit, isLoading = false }: DisciplinaFormProps) {
  const [nome, setNome] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome.trim()) {
      onSubmit(nome.trim());
      setNome("");
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="nome">Nome da Disciplina</Label>
        <Input
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome da disciplina"
          required
        />
      </div>
      
      <Button type="submit" disabled={isLoading || !nome.trim()}>
        {isLoading ? "Cadastrando..." : "Cadastrar Disciplina"}
      </Button>
    </form>
  );
}
