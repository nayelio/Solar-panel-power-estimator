import Home from "@/components/organisms/Home";
import { PositionProvider } from "@/contexts/PositionContext";
import { RateProvider } from "@/contexts/RateContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PositionProvider>
        <RateProvider>
          <Home />
          <style jsx global>{`
            html,
            body {
              padding: 0;
              margin: 0;
            }
          `}</style>
        </RateProvider>
      </PositionProvider>
    </QueryClientProvider>
  );
};

export default App;
