import { useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "@/pages/home";
import About from "@/pages/about";
import Benefits from "@/pages/benefits";
import FAQ from "@/pages/faq";
import Blog from "@/pages/blog";
import BlogAdmin from "@/pages/blog-admin";
import Login from "@/pages/login";
import Partners from "@/pages/partners";
import Trainers from "@/pages/trainers";
import PrivacyPolicy from "@/pages/privacy-policy";
import Terms from "@/pages/terms";
import NotFound from "@/pages/not-found";

function Redirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.href = to;
  }, [to]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/benefits" component={Benefits} />
      <Route path="/howitworks" component={Benefits} />
      <Route path="/faq" component={FAQ} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={Blog} />
      <Route path="/blogs" component={Blog} />
      <Route path="/admin/blog" component={BlogAdmin} />
      <Route path="/login" component={Login} />
      <Route path="/partners" component={Partners} />
      <Route path="/trainers" component={Trainers} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/privacypolicy" component={PrivacyPolicy} />
      <Route path="/terms" component={Terms} />
      <Route path="/termsandconditions" component={Terms} />
      <Route path="/contactus" component={Home} />
      <Route path="/waitlistsignup" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
