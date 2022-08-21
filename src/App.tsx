import axios from "axios";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ResturantView } from "./components/index";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ResturantView />
    </QueryClientProvider>
  );
}

export default App;
