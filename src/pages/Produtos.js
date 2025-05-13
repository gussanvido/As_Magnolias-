// src/pages/Produtos.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { produtosAPI, fornecedoresAPI } from "../services/api";

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    setProdutos(produtosAPI.getAll());
    setFornecedores(fornecedoresAPI.getAll());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      produtosAPI.delete(id);
      setProdutos(produtosAPI.getAll());
    }
  };

  const getFornecedorNome = (fornecedorId) => {
    const fornecedor = fornecedores.find((f) => f.id === fornecedorId);
    return fornecedor ? fornecedor.nome : "Não especificado";
  };

  return (
    <>
      <h2>Produtos</h2>
      <Link to="/produtos/novo" className="btn-add">
        Adicionar Produto
      </Link>

      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Foto</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Marca</th>
              <th>Fornecedor</th>
              <th>Valor Final</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.id}</td>
                <td>
                  {produto.fotos && produto.fotos.length > 0 ? (
                    <img
                      src={
                        produto.fotos.find((f) => f.principal)?.url ||
                        produto.fotos[0].url
                      }
                      alt={produto.descricao}
                      className="produto-thumbnail"
                    />
                  ) : (
                    <div className="no-image">Sem foto</div>
                  )}
                </td>
                <td>{produto.descricao}</td>
                <td>{produto.categoria}</td>
                <td>{produto.marca}</td>
                <td>{getFornecedorNome(produto.fornecedorId)}</td>
                <td>R$ {produto.valorFinal.toFixed(2)}</td>
                <td>{produto.status}</td>
                <td>
                  <Link to={`/produtos/${produto.id}`} className="btn-small">
                    Editar
                  </Link>
                  <button
                    className="btn-small btn-danger"
                    onClick={() => handleDelete(produto.id)}
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

export default Produtos;
