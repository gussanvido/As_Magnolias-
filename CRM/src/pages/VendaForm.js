// src/pages/VendaForm.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { vendasAPI, clientesAPI, produtosAPI } from "../services/api";
import ImageUpload from "../components/UI/ImageUpload";

function VendaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [venda, setVenda] = useState({
    clienteId: "",
    dataVenda: new Date().toISOString().split("T")[0],
    formaPagamento: "Dinheiro",
    itens: [],
    valorTotal: 0,
    fotos: [],
  });
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [fotoDescricao, setFotoDescricao] = useState("");

  useEffect(() => {
    setClientes(clientesAPI.getAll());
    setProdutos(produtosAPI.getAll().filter((p) => p.status === "Disponível"));

    if (id) {
      const vendaData = vendasAPI.getById(id);
      if (vendaData) {
        setVenda(vendaData);
      } else {
        alert("Venda não encontrada!");
        navigate("/vendas");
      }
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenda({
      ...venda,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (venda.itens.length === 0) {
      alert("Adicione pelo menos um produto à venda.");
      return;
    }

    try {
      if (id) {
        vendasAPI.update(id, venda);
      } else {
        // Ao criar uma nova venda, atualizar o status dos produtos para "Vendido"
        venda.itens.forEach((item) => {
          const produto = produtosAPI.getById(item.produtoId);
          if (produto) {
            produtosAPI.update(produto.id, { ...produto, status: "Vendido" });
          }
        });

        vendasAPI.create(venda);
      }

      navigate("/vendas");
    } catch (error) {
      alert("Erro ao salvar venda: " + error.message);
    }
  };

  const handleAddItem = () => {
    if (!selectedProduct) {
      alert("Selecione um produto");
      return;
    }

    const produto = produtosAPI.getById(selectedProduct);
    if (!produto) return;

    const novoItem = {
      id: Date.now(), // ID temporário
      produtoId: produto.id,
      descricao: produto.descricao,
      valorUnitario: produto.valorFinal,
      quantidade: quantidade,
      subtotal: produto.valorFinal * quantidade,
    };

    const novosItens = [...venda.itens, novoItem];
    const novoTotal = novosItens.reduce(
      (total, item) => total + item.subtotal,
      0
    );

    setVenda({
      ...venda,
      itens: novosItens,
      valorTotal: novoTotal,
    });

    setSelectedProduct("");
    setQuantidade(1);
  };

  const handleRemoveItem = (itemId) => {
    const novosItens = venda.itens.filter((item) => item.id !== itemId);
    const novoTotal = novosItens.reduce(
      (total, item) => total + item.subtotal,
      0
    );

    setVenda({
      ...venda,
      itens: novosItens,
      valorTotal: novoTotal,
    });
  };

  const handleImageAdded = (imageUrl) => {
    setVenda({
      ...venda,
      fotos: [
        ...venda.fotos,
        {
          url: imageUrl,
          descricao: fotoDescricao || "Documento da venda",
        },
      ],
    });
    setFotoDescricao("");
  };

  const removeFoto = (index) => {
    const updatedFotos = venda.fotos.filter((_, i) => i !== index);
    setVenda({
      ...venda,
      fotos: updatedFotos,
    });
  };

  return (
    <>
      <h2>{id ? "Detalhes da Venda" : "Nova Venda"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Cliente:</label>
            <select
              name="clienteId"
              value={venda.clienteId}
              onChange={(e) =>
                setVenda({
                  ...venda,
                  clienteId: e.target.value ? parseInt(e.target.value) : "",
                })
              }
              required
              disabled={id}
            >
              <option value="">Selecione um cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Data:</label>
            <input
              type="date"
              name="dataVenda"
              value={venda.dataVenda}
              onChange={handleChange}
              required
              disabled={id}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Forma de Pagamento:</label>
          <select
            name="formaPagamento"
            value={venda.formaPagamento}
            onChange={handleChange}
            required
            disabled={id}
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de Débito">Cartão de Débito</option>
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="PIX">PIX</option>
          </select>
        </div>

        {!id && (
          <div className="add-item-section">
            <h4>Adicionar Produto</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Produto:</label>
                <select
                  value={selectedProduct}
                  onChange={(e) =>
                    setSelectedProduct(
                      e.target.value ? parseInt(e.target.value) : ""
                    )
                  }
                >
                  <option value="">Selecione um produto</option>
                  {produtos.map((produto) => (
                    <option key={produto.id} value={produto.id}>
                      {produto.descricao} - R$ {produto.valorFinal.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group" style={{ maxWidth: "100px" }}>
                <label>Qtd:</label>
                <input
                  type="number"
                  min="1"
                  value={quantidade}
                  onChange={(e) => setQuantidade(parseInt(e.target.value))}
                />
              </div>
              <div
                className="form-group"
                style={{ display: "flex", alignItems: "flex-end" }}
              >
                <button type="button" onClick={handleAddItem}>
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="items-section">
          <h4>Itens da Venda</h4>
          {venda.itens.length === 0 ? (
            <p>Nenhum item adicionado</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Valor Unit.</th>
                  <th>Qtd</th>
                  <th>Subtotal</th>
                  {!id && <th>Ações</th>}
                </tr>
              </thead>
              <tbody>
                {venda.itens.map((item) => (
                  <tr key={item.id}>
                    <td>{item.descricao}</td>
                    <td>R$ {item.valorUnitario.toFixed(2)}</td>
                    <td>{item.quantidade}</td>
                    <td>R$ {item.subtotal.toFixed(2)}</td>
                    {!id && (
                      <td>
                        <button
                          type="button"
                          className="btn-small btn-danger"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Remover
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan={!id ? "4" : "3"}
                    style={{ textAlign: "right", fontWeight: "bold" }}
                  >
                    Total:
                  </td>
                  <td colSpan={!id ? "1" : "1"} style={{ fontWeight: "bold" }}>
                    R$ {venda.valorTotal.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>

        <div className="foto-section">
          <h4>Comprovantes e Documentos</h4>

          {!id && (
            <>
              <div className="form-group">
                <label>Descrição do Documento:</label>
                <input
                  type="text"
                  placeholder="Ex: Comprovante de pagamento, Recibo, etc."
                  value={fotoDescricao}
                  onChange={(e) => setFotoDescricao(e.target.value)}
                />
              </div>

              <ImageUpload onImageAdded={handleImageAdded} />
            </>
          )}

          {venda.fotos && venda.fotos.length > 0 ? (
            <div className="fotos-container">
              <h5>Documentos Adicionados ({venda.fotos.length})</h5>
              <div className="fotos-grid">
                {venda.fotos.map((foto, index) => (
                  <div key={index} className="foto-item">
                    <img
                      src={foto.url}
                      alt={foto.descricao || `Documento ${index + 1}`}
                    />
                    <div className="foto-info">
                      <p>{foto.descricao || "Sem descrição"}</p>
                      {!id && (
                        <button
                          type="button"
                          className="btn-danger"
                          onClick={() => removeFoto(index)}
                        >
                          Remover
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>Nenhum documento adicionado</p>
          )}
        </div>

        {!id && (
          <div className="form-buttons">
            <button type="submit">Finalizar Venda</button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/vendas")}
            >
              Cancelar
            </button>
          </div>
        )}

        {id && (
          <div className="form-buttons">
            <button type="button" onClick={() => navigate("/vendas")}>
              Voltar
            </button>
          </div>
        )}
      </form>
    </>
  );
}

export default VendaForm;
