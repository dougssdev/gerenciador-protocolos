import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListaProtocolos from "./pages/ListarProtocolos";
import EditarProtocolo from "./pages/EditarProtocolo";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListaProtocolos />} />
        <Route path="/protocolos/editar/:id" element={<EditarProtocolo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;