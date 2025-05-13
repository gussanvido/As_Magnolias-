// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Produtos from "./pages/Produtos";
import ProdutoForm from "./pages/ProdutoForm";
import Clientes from "./pages/Clientes";
import ClienteForm from "./pages/ClienteForm";
import Vendas from "./pages/Vendas";
import VendaForm from "./pages/VendaForm";
import Fornecedores from "./pages/Fornecedores";
import FornecedorForm from "./pages/FornecedorForm";
import "./styles.css";

// Componente para proteger rotas
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />

            <Route path="produtos">
              <Route index element={<Produtos />} />
              <Route path="novo" element={<ProdutoForm />} />
              <Route path=":id" element={<ProdutoForm />} />
            </Route>

            <Route path="clientes">
              <Route index element={<Clientes />} />
              <Route path="novo" element={<ClienteForm />} />
              <Route path=":id" element={<ClienteForm />} />
            </Route>

            <Route path="vendas">
              <Route index element={<Vendas />} />
              <Route path="nova" element={<VendaForm />} />
              <Route path=":id" element={<VendaForm />} />
            </Route>

            <Route path="fornecedores">
              <Route index element={<Fornecedores />} />
              <Route path="novo" element={<FornecedorForm />} />
              <Route path=":id" element={<FornecedorForm />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
