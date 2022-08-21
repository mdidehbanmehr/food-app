import axios from "axios";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ResturantView } from "./components/index";

interface Resturants {
  name: string;
  photo: {
    height: number;
    html_attributions: object;
    photo_reference: string;
    width: number;
  };
  rating: number;
  lat: number;
  lng: number;
}

interface ResturantDistance extends Resturants {
  distance: string;
  duration: string;
}

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ResturantView />
    </QueryClientProvider>
  );
}

export default App;
