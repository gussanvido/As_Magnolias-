// src/pages/ProdutoForm.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { produtosAPI, fornecedoresAPI } from "../services/api";
import ImageUpload from "../components/UI/ImageUpload";

function ProdutoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fornecedores, setFornecedores] = useState([]);
  const [produto, setProduto] = useState({
    descricao: "",
    categoria: "",
    marca: "",
    consignacao: false,
    fornecedorId: "",
    valorEntrada: 0,
    valorMinimo: 0,
    valorIdeal: 0,
    valorFinal: 0,
    status: "Disponível",
    fotos: [],
  });

  useEffect(() => {
    // Carregar fornecedores
    setFornecedores(fornecedoresAPI.getAll());

    // Se for edição, carregar dados do produto
    if (id) {
      const produtoData = produtosAPI.getById(id);
      if (produtoData) {
        setProduto(produtoData);
      } else {
        alert("Produto não encontrado!");
        navigate("/produtos");
      }
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduto({
      ...produto,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // src/pages/ProdutoForm.js (continuação)
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setProduto({
      ...produto,
      [name]: parseFloat(value) || 0,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // Validar se fornecedor foi selecionado para produtos em consignação
      if (produto.consignacao && !produto.fornecedorId) {
        alert(
          "Por favor, selecione um fornecedor para produtos em consignação."
        );
        return;
      }

      if (id) {
        produtosAPI.update(id, produto);
      } else {
        produtosAPI.create(produto);
      }

      navigate("/produtos");
    } catch (error) {
      alert("Erro ao salvar produto: " + error.message);
    }
  };

  const handleImageAdded = (imageUrl) => {
    setProduto({
      ...produto,
      fotos: [
        ...produto.fotos,
        {
          url: imageUrl,
          principal: produto.fotos.length === 0, // Se for a primeira foto, definir como principal
        },
      ],
    });
  };

  const removeFoto = (index) => {
    const updatedFotos = produto.fotos.filter((_, i) => i !== index);
    // Se removermos a foto principal e ainda houver fotos, definir a primeira como principal
    if (produto.fotos[index].principal && updatedFotos.length > 0) {
      updatedFotos[0].principal = true;
    }
    setProduto({
      ...produto,
      fotos: updatedFotos,
    });
  };

  const setFotoPrincipal = (index) => {
    const updatedFotos = produto.fotos.map((foto, i) => ({
      ...foto,
      principal: i === index,
    }));
    setProduto({
      ...produto,
      fotos: updatedFotos,
    });
  };

  return (
    <>
      <h2>{id ? "Editar Produto" : "Novo Produto"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Descrição:</label>
          <input
            type="text"
            name="descricao"
            value={produto.descricao}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Categoria:</label>
          <input
            type="text"
            name="categoria"
            value={produto.categoria}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Marca:</label>
          <input
            type="text"
            name="marca"
            value={produto.marca}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="consignacao"
              checked={produto.consignacao}
              onChange={handleChange}
            />
            Consignação
          </label>
        </div>

        <div className={`form-group ${produto.consignacao ? "required" : ""}`}>
          <label>
            Fornecedor:
            {produto.consignacao && <span className="required-mark">*</span>}
          </label>
          <select
            name="fornecedorId"
            value={produto.fornecedorId || ""}
            onChange={(e) =>
              setProduto({
                ...produto,
                fornecedorId: e.target.value ? parseInt(e.target.value) : "",
              })
            }
            required={produto.consignacao}
            disabled={!produto.consignacao}
          >
            <option value="">Selecione um fornecedor</option>
            {fornecedores.map((fornecedor) => (
              <option key={fornecedor.id} value={fornecedor.id}>
                {fornecedor.nome}
              </option>
            ))}
          </select>
          {produto.consignacao && !produto.fornecedorId && (
            <p className="field-error">
              Fornecedor é obrigatório para produtos em consignação
            </p>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Valor de Entrada:</label>
            <input
              type="number"
              name="valorEntrada"
              step="0.01"
              value={produto.valorEntrada}
              onChange={handleNumberChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Valor Mínimo:</label>
            <input
              type="number"
              name="valorMinimo"
              step="0.01"
              value={produto.valorMinimo}
              onChange={handleNumberChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Valor Ideal:</label>
            <input
              type="number"
              name="valorIdeal"
              step="0.01"
              value={produto.valorIdeal}
              onChange={handleNumberChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Valor Final:</label>
            <input
              type="number"
              name="valorFinal"
              step="0.01"
              value={produto.valorFinal}
              onChange={handleNumberChange}
              required
            />
          </div>
        </div>

        {produto.consignacao && (
          <div className="form-row">
            <div className="form-group">
              <label>Valor a Pagar ao Fornecedor:</label>
              <input
                type="number"
                name="valorPagar"
                step="0.01"
                value={produto.valorPagar || 0}
                onChange={handleNumberChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Lucro Estimado:</label>
              <input
                type="number"
                step="0.01"
                value={
                  produto.valorFinal && produto.valorPagar
                    ? (produto.valorFinal - produto.valorPagar).toFixed(2)
                    : 0
                }
                readOnly
                className="read-only"
              />
            </div>
          </div>
        )}

        <div className="form-group">
          <label>Status:</label>
          <select name="status" value={produto.status} onChange={handleChange}>
            <option value="Disponível">Disponível</option>
            <option value="Vendido">Vendido</option>
            <option value="Reservado">Reservado</option>
          </select>
        </div>

        <div className="form-group">
          <label>Foto do Produto:</label>
          <ImageUpload onImageAdded={handleImageAdded} />

          {produto.fotos.length > 0 && (
            <div className="fotos-container">
              <h4>Fotos do Produto</h4>
              <div className="fotos-grid">
                {produto.fotos.map((foto, index) => (
                  <div
                    key={index}
                    className={`foto-item ${foto.principal ? "principal" : ""}`}
                  >
                    <img src={foto.url} alt={`Foto ${index + 1}`} />
                    <div className="foto-actions">
                      <button
                        type="button"
                        onClick={() => setFotoPrincipal(index)}
                        disabled={foto.principal}
                      >
                        {foto.principal ? "Principal" : "Tornar Principal"}
                      </button>
                      <button
                        type="button"
                        className="btn-danger"
                        onClick={() => removeFoto(index)}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="form-buttons">
          <button type="submit">{id ? "Atualizar" : "Adicionar"}</button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate("/produtos")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
}

export default ProdutoForm;
