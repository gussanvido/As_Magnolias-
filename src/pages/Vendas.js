// src/pages/Vendas.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { vendasAPI, clientesAPI } from "../services/api";

function Vendas() {
  const [vendas, setVendas] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    setVendas(vendasAPI.getAll());
    setClientes(clientesAPI.getAll());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta venda?")) {
      vendasAPI.delete(id);
      setVendas(vendasAPI.getAll());
    }
  };

  const getClienteNome = (clienteId) => {
    const cliente = clientes.find((c) => c.id === clienteId);
    return cliente ? cliente.nome : "Cliente não encontrado";
  };

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR");
  };

  return (
    <>
      <h2>Vendas</h2>
      <Link to="/vendas/nova" className="btn-add">
        Registrar Venda
      </Link>

      {vendas.length === 0 ? (
        <p>Nenhuma venda registrada.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Data</th>
              <th>Valor Total</th>
              <th>Forma de Pagamento</th>
              <th>Status</th>
              <th>Docs</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((venda) => (
              <tr key={venda.id}>
                <td>{venda.id}</td>
                <td>{getClienteNome(venda.clienteId)}</td>
                <td>{formatarData(venda.dataVenda)}</td>
                <td>R$ {venda.valorTotal.toFixed(2)}</td>
                <td>{venda.formaPagamento}</td>
                <td>{venda.status}</td>
                <td>
                  {venda.fotos && venda.fotos.length > 0 ? (
                    <span
                      className="doc-icon"
                      title={`${venda.fotos.length} documento(s)`}
                    >
                      📄
                    </span>
                  ) : (
                    <span className="no-doc">-</span>
                  )}
                </td>
                <td>
                  <Link to={`/vendas/${venda.id}`} className="btn-small">
                    Detalhes
                  </Link>
                  <button
                    className="btn-small btn-danger"
                    onClick={() => handleDelete(venda.id)}
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

export default Vendas;
