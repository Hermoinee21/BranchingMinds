import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/pages/home";
import AssessmentPage from "@/pages/assessment";
import ResultsPage from "@/pages/results";
import InsightsPage from "@/pages/insights";
import DoctorsPage from "@/pages/doctors";
import ResourcesPage from "@/pages/resources";
import Navigation from "@/components/navigation";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/assessment" component={AssessmentPage} />
        <Route path="/results/:id" component={ResultsPage} />
        <Route path="/insights" component={InsightsPage} />
        <Route path="/doctors" component={DoctorsPage} />
        <Route path="/resources" component={ResourcesPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
