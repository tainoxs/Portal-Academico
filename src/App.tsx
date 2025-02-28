
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AlunosPage from "./pages/AlunosPage";
import DisciplinasPage from "./pages/DisciplinasPage";
import NotasPage from "./pages/NotasPage";
import AlunoDetalhes from "./pages/AlunoDetalhes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/alunos" element={<AlunosPage />} />
          <Route path="/alunos/:matricula" element={<AlunoDetalhes />} />
          <Route path="/disciplinas" element={<DisciplinasPage />} />
          <Route path="/notas" element={<NotasPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
