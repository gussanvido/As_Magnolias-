// src/pages/Clientes.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { clientesAPI } from "../services/api";

function Clientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    setClientes(clientesAPI.getAll());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      clientesAPI.delete(id);
      setClientes(clientesAPI.getAll());
    }
  };

  return (
    <>
      <h2>Clientes</h2>
      <Link to="/clientes/novo" className="btn-add">
        Adicionar Cliente
      </Link>

      {clientes.length === 0 ? (
        <p>Nenhum cliente cadastrado.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.email}</td>
                <td>{cliente.endereco}</td>
                <td>
                  <Link to={`/clientes/${cliente.id}`} className="btn-small">
                    Editar
                  </Link>
                  <button
                    className="btn-small btn-danger"
                    onClick={() => handleDelete(cliente.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Clientes;
