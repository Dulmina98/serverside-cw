import './App.css';
import Login from "./components/login";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
          <Login/>
      </BrowserRouter>
  );
}

export default App;
