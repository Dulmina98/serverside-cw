import './App.css';
import {BrowserRouter} from "react-router-dom";
import AdminDashboard from "./components/admin";

function App() {
  return (
      <BrowserRouter>
          <AdminDashboard/>
      </BrowserRouter>
  );
}

export default App;
