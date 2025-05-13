// src/components/Layout/Header.js
import React from "react";
import { useAuth } from "../../contexts/AuthContext";

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <h1>Brechó "As Magnólias" - CRM</h1>
      <div className="user-info">
        <span>Olá, {user.nome}</span>
        <button onClick={logout}>Sair</button>
      </div>
    </header>
  );
}

export default Header;
