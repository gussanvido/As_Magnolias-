// src/pages/FornecedorForm.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fornecedoresAPI } from "../services/api";

function FornecedorForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fornecedor, setFornecedor] = useState({
    nome: "",
    telefone: "",
    email: "",
    endereco: "",
    observacoes: "",
  });

  useEffect(() => {
    if (id) {
      const fornecedorData = fornecedoresAPI.getById(id);
      if (fornecedorData) {
        setFornecedor(fornecedorData);
      } else {
        alert("Fornecedor não encontrado!");
        navigate("/fornecedores");
      }
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFornecedor({
      ...fornecedor,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (id) {
        fornecedoresAPI.update(id, fornecedor);
      } else {
        fornecedoresAPI.create(fornecedor);
      }

      navigate("/fornecedores");
    } catch (error) {
      alert("Erro ao salvar fornecedor: " + error.message);
    }
  };

  return (
    <>
      <h2>{id ? "Editar Fornecedor" : "Novo Fornecedor"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={fornecedor.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Telefone:</label>
          <input
            type="text"
            name="telefone"
            value={fornecedor.telefone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={fornecedor.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Endereço:</label>
          <input
            type="text"
            name="endereco"
            value={fornecedor.endereco}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Observações:</label>
          <textarea
            name="observacoes"
            value={fornecedor.observacoes || ""}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

        <div className="form-buttons">
          <button type="submit">{id ? "Atualizar" : "Adicionar"}</button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate("/fornecedores")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
}

export default FornecedorForm;
