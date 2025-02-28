
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-6 max-w-md animate-fade-in">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">Página não encontrada</h2>
        <p className="text-muted-foreground">
          A página que você está procurando não existe ou foi removida.
        </p>
        <Link to="/">
          <Button className="mt-4">
            <ArrowLeft size={16} className="mr-2" />
            Voltar para o início
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
