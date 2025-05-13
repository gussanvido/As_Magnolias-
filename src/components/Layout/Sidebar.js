// src/components/Layout/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/produtos"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Produtos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/clientes"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Clientes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/vendas"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Vendas
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/fornecedores"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Fornecedores
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
