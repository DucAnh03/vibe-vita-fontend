import Routes from "./routes/Routes";
import { AuthProvider } from "./context/AuthContextProvider";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
