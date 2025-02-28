
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Disciplina } from "@/models/Disciplina";
import { BookOpen } from "lucide-react";

interface DisciplinaCardProps {
  disciplina: Disciplina;
}

export function DisciplinaCard({ disciplina }: DisciplinaCardProps) {
  return (
    <Card className="w-full overflow-hidden transition-all hover:shadow-lg animate-scale-in">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
            <BookOpen size={16} className="text-accent" />
          </div>
          <div>
            <CardTitle className="text-base">{disciplina.nome}</CardTitle>
            <CardDescription>Código: {disciplina.codigo}</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="text-sm text-muted-foreground">
          <p>Disciplina acadêmica</p>
        </div>
      </CardContent>
    </Card>
  );
}
