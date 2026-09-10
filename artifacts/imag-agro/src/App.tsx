import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, useLocation, useParams, Router as WouterRouter } from 'wouter';
import { AboutPage, ArticlePage, ContactPage, HomePage, InformationPage, NotFoundPage, ServicePage, SolutionsPage } from '@/pages/public-pages';

const queryClient = new QueryClient();

function ServiceRoute() {
  const { slug } = useParams<{ slug: string }>();
  return <ServicePage slug={slug} />;
}

function ArticleRoute() {
  const { slug } = useParams<{ slug: string }>();
  return <ArticlePage slug={slug} />;
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/soluciones" component={SolutionsPage} />
        <Route path="/soluciones/:slug" component={ServiceRoute} />
        <Route path="/informacion" component={InformationPage} />
        <Route path="/informacion/:slug" component={ArticleRoute} />
        <Route path="/nosotros" component={AboutPage} />
        <Route path="/contacto" component={ContactPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;