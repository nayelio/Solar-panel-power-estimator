import Home from "@/components/organisms/Home";
import { PanelProvider } from "@/contexts/PanelsContext";
import { PositionProvider } from "@/contexts/PositionContext";
import { RateProvider } from "@/contexts/RateContext";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY ?? "";

const libraries: Libraries = ["places", "maps", "drawing"];
const App = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries,
  });
  if (!isLoaded) return null;
  return (
    <QueryClientProvider client={queryClient}>
      <PositionProvider>
        <RateProvider>
          <PanelProvider>
            <Home />
            <style jsx global>{`
              body {
                margin: 0px;
                padding: 0px;
              }
            `}</style>
          </PanelProvider>
        </RateProvider>
      </PositionProvider>
    </QueryClientProvider>
  );
};

export default App;
