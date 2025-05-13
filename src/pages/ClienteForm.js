// src/pages/ClienteForm.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { clientesAPI } from "../services/api";

function ClienteForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({
    nome: "",
    telefone: "",
    email: "",
    endereco: "",
    observacoes: "",
  });

  useEffect(() => {
    if (id) {
      const clienteData = clientesAPI.getById(id);
      if (clienteData) {
        setCliente(clienteData);
      } else {
        alert("Cliente não encontrado!");
        navigate("/clientes");
      }
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({
      ...cliente,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (id) {
        clientesAPI.update(id, cliente);
      } else {
        clientesAPI.create(cliente);
      }

      navigate("/clientes");
    } catch (error) {
      alert("Erro ao salvar cliente: " + error.message);
    }
  };

  return (
    <>
      <h2>{id ? "Editar Cliente" : "Novo Cliente"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={cliente.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Telefone:</label>
          <input
            type="text"
            name="telefone"
            value={cliente.telefone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={cliente.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Endereço:</label>
          <input
            type="text"
            name="endereco"
            value={cliente.endereco}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Observações:</label>
          <textarea
            name="observacoes"
            value={cliente.observacoes || ""}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

        <div className="form-buttons">
          <button type="submit">{id ? "Atualizar" : "Adicionar"}</button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate("/clientes")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
}

export default ClienteForm;
