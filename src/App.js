import "./App.css";
import Header from "./components/Header";
import { Messages } from "./constants/messages";
import { AppRoutes } from "./routes/routes";

function App() {
  return (
    <div className="container-fluid">
      <Header message={Messages.APP_NAME} />

      <AppRoutes />
    </div>
  );
}

export default App;
