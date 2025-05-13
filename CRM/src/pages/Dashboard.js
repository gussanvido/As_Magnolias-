// src/pages/Dashboard.js
import React from "react";
import { produtosAPI, clientesAPI, vendasAPI } from "../services/api";

function Dashboard() {
  const produtos = produtosAPI.getAll();
  const clientes = clientesAPI.getAll();
  const vendas = vendasAPI.getAll();

  return (
    <>
      <h2>Dashboard</h2>

      <div className="cards">
        <div className="card">
          <h3>Produtos</h3>
          <p className="number">{produtos.length}</p>
        </div>
        <div className="card">
          <h3>Clientes</h3>
          <p className="number">{clientes.length}</p>
        </div>
        <div className="card">
          <h3>Vendas</h3>
          <p className="number">{vendas.length}</p>
        </div>
      </div>

      <div className="chart-container">
        <h3>Vendas por Faixa de Preço</h3>
        <div className="chart">
          <div className="bar" style={{ height: "50px" }}>
            <span>0-50</span>
          </div>
          <div className="bar" style={{ height: "100px" }}>
            <span>51-100</span>
          </div>
          <div className="bar" style={{ height: "150px" }}>
            <span>101-200</span>
          </div>
          <div className="bar" style={{ height: "80px" }}>
            <span>201-500</span>
          </div>
          <div className="bar" style={{ height: "30px" }}>
            <span>&gt;500</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
