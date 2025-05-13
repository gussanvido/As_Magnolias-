// src/pages/Fornecedores.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fornecedoresAPI } from "../services/api";

function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    setFornecedores(fornecedoresAPI.getAll());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este fornecedor?")) {
      fornecedoresAPI.delete(id);
      setFornecedores(fornecedoresAPI.getAll());
    }
  };

  return (
    <>
      <h2>Fornecedores</h2>
      <Link to="/fornecedores/novo" className="btn-add">
        Adicionar Fornecedor
      </Link>

      {fornecedores.length === 0 ? (
        <p>Nenhum fornecedor cadastrado.</p>
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
            {fornecedores.map((fornecedor) => (
              <tr key={fornecedor.id}>
                <td>{fornecedor.id}</td>
                <td>{fornecedor.nome}</td>
                <td>{fornecedor.telefone}</td>
                <td>{fornecedor.email}</td>
                <td>{fornecedor.endereco}</td>
                <td>
                  <Link
                    to={`/fornecedores/${fornecedor.id}`}
                    className="btn-small"
                  >
                    Editar
                  </Link>
                  <button
                    className="btn-small btn-danger"
                    onClick={() => handleDelete(fornecedor.id)}
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

export default Fornecedores;
