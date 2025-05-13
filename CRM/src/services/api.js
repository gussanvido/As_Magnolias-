// src/services/api.js
import { v4 as uuidv4 } from "uuid";

// Função para inicializar dados no localStorage se não existirem
const initializeData = () => {
  if (!localStorage.getItem("usuarios")) {
    localStorage.setItem(
      "usuarios",
      JSON.stringify([
        {
          id: 1,
          nome: "Admin",
          email: "admin@magnolias.com",
          senha: "admin123",
          perfil: "admin",
        },
      ])
    );
  }

  if (!localStorage.getItem("produtos")) {
    localStorage.setItem(
      "produtos",
      JSON.stringify([
        {
          id: 1,
          descricao: "Vestido Floral",
          categoria: "Roupas",
          marca: "Zara",
          consignacao: true,
          fornecedorId: 1,
          valorEntrada: 50.0,
          valorMinimo: 70.0,
          valorIdeal: 90.0,
          valorFinal: 85.0,
          lucro: 35.0,
          valorPagar: 42.5,
          dataCadastro: "2023-05-15",
          periodo: 30,
          status: "Disponível",
          fotos: [
            {
              url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
              principal: true,
            },
          ],
        },
        {
          id: 2,
          descricao: "Calça Jeans",
          categoria: "Roupas",
          marca: "Levis",
          consignacao: false,
          fornecedorId: 2,
          valorEntrada: 60.0,
          valorMinimo: 80.0,
          valorIdeal: 100.0,
          valorFinal: 95.0,
          lucro: 35.0,
          valorPagar: 0.0,
          dataCadastro: "2023-05-10",
          periodo: 30,
          status: "Disponível",
          fotos: [
            {
              url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
              principal: true,
            },
          ],
        },
      ])
    );
  }

  if (!localStorage.getItem("clientes")) {
    localStorage.setItem(
      "clientes",
      JSON.stringify([
        {
          id: 1,
          nome: "Maria Silva",
          telefone: "(11) 98765-4321",
          email: "maria@email.com",
          endereco: "Rua das Flores, 123",
          observacoes: "Cliente frequente, prefere roupas vintage",
        },
        {
          id: 2,
          nome: "João Santos",
          telefone: "(11) 91234-5678",
          email: "joao@email.com",
          endereco: "Av. Principal, 456",
          observacoes: "Compra presentes para a esposa",
        },
        {
          id: 3,
          nome: "Ana Oliveira",
          telefone: "(11) 99876-5432",
          email: "ana@email.com",
          endereco: "Rua dos Pinheiros, 789",
          observacoes: "Interessada em bolsas de marca",
        },
      ])
    );
  }

  if (!localStorage.getItem("fornecedores")) {
    localStorage.setItem(
      "fornecedores",
      JSON.stringify([
        {
          id: 1,
          nome: "Ana Consignadora",
          telefone: "(11) 99876-5432",
          email: "ana@email.com",
          endereco: "Rua dos Fornecedores, 789",
        },
        {
          id: 2,
          nome: "Carlos Vendedor",
          telefone: "(11) 98765-9876",
          email: "carlos@email.com",
          endereco: "Av. do Comércio, 321",
        },
      ])
    );
  }

  if (!localStorage.getItem("vendas")) {
    localStorage.setItem(
      "vendas",
      JSON.stringify([
        {
          id: 1,
          clienteId: 1,
          dataVenda: "2023-06-01",
          valorTotal: 85.0,
          formaPagamento: "Cartão de Crédito",
          status: "Concluída",
          itens: [
            {
              id: 1,
              produtoId: 1,
              valorUnitario: 85.0,
              quantidade: 1,
              subtotal: 85.0,
            },
          ],
          fotos: [
            {
              url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
              descricao: "Comprovante de pagamento",
            },
          ],
        },
        {
          id: 2,
          clienteId: 2,
          dataVenda: "2023-06-05",
          valorTotal: 95.0,
          formaPagamento: "Dinheiro",
          status: "Concluída",
          itens: [
            {
              id: 1,
              produtoId: 2,
              valorUnitario: 95.0,
              quantidade: 1,
              subtotal: 95.0,
            },
          ],
          fotos: [],
        },
      ])
    );
  }
};

// Inicializar dados
initializeData();

// API para produtos
export const produtosAPI = {
  getAll: () => {
    return JSON.parse(localStorage.getItem("produtos") || "[]");
  },

  getById: (id) => {
    const produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
    return produtos.find(
      (produto) => produto.id === parseInt(id) || produto.id === id
    );
  },

  create: (produto) => {
    const produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
    const novoProduto = {
      ...produto,
      id: uuidv4(),
      dataCadastro: new Date().toISOString().split("T")[0],
    };

    produtos.push(novoProduto);
    localStorage.setItem("produtos", JSON.stringify(produtos));
    return novoProduto;
  },

  update: (id, produto) => {
    let produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
    const index = produtos.findIndex(
      (p) => p.id === parseInt(id) || p.id === id
    );

    if (index !== -1) {
      produtos[index] = { ...produtos[index], ...produto };
      localStorage.setItem("produtos", JSON.stringify(produtos));
      return produtos[index];
    }

    return null;
  },

  delete: (id) => {
    let produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
    produtos = produtos.filter((p) => p.id !== parseInt(id) && p.id !== id);
    localStorage.setItem("produtos", JSON.stringify(produtos));
    return true;
  },
};

// API para clientes
export const clientesAPI = {
  getAll: () => {
    return JSON.parse(localStorage.getItem("clientes") || "[]");
  },

  getById: (id) => {
    const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
    return clientes.find(
      (cliente) => cliente.id === parseInt(id) || cliente.id === id
    );
  },

  create: (cliente) => {
    const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
    const novoCliente = {
      ...cliente,
      id: uuidv4(),
    };

    clientes.push(novoCliente);
    localStorage.setItem("clientes", JSON.stringify(clientes));
    return novoCliente;
  },

  update: (id, cliente) => {
    let clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
    const index = clientes.findIndex(
      (c) => c.id === parseInt(id) || c.id === id
    );

    if (index !== -1) {
      clientes[index] = { ...clientes[index], ...cliente };
      localStorage.setItem("clientes", JSON.stringify(clientes));
      return clientes[index];
    }

    return null;
  },

  delete: (id) => {
    let clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
    clientes = clientes.filter((c) => c.id !== parseInt(id) && c.id !== id);
    localStorage.setItem("clientes", JSON.stringify(clientes));
    return true;
  },
};

// API para fornecedores
export const fornecedoresAPI = {
  getAll: () => {
    return JSON.parse(localStorage.getItem("fornecedores") || "[]");
  },

  getById: (id) => {
    const fornecedores = JSON.parse(
      localStorage.getItem("fornecedores") || "[]"
    );
    return fornecedores.find(
      (fornecedor) => fornecedor.id === parseInt(id) || fornecedor.id === id
    );
  },

  create: (fornecedor) => {
    const fornecedores = JSON.parse(
      localStorage.getItem("fornecedores") || "[]"
    );
    const novoFornecedor = {
      ...fornecedor,
      id: uuidv4(),
    };

    fornecedores.push(novoFornecedor);
    localStorage.setItem("fornecedores", JSON.stringify(fornecedores));
    return novoFornecedor;
  },

  update: (id, fornecedor) => {
    let fornecedores = JSON.parse(localStorage.getItem("fornecedores") || "[]");
    const index = fornecedores.findIndex(
      (f) => f.id === parseInt(id) || f.id === id
    );

    if (index !== -1) {
      fornecedores[index] = { ...fornecedores[index], ...fornecedor };
      localStorage.setItem("fornecedores", JSON.stringify(fornecedores));
      return fornecedores[index];
    }

    return null;
  },

  delete: (id) => {
    let fornecedores = JSON.parse(localStorage.getItem("fornecedores") || "[]");
    fornecedores = fornecedores.filter(
      (f) => f.id !== parseInt(id) && f.id !== id
    );
    localStorage.setItem("fornecedores", JSON.stringify(fornecedores));
    return true;
  },
};

// API para vendas
export const vendasAPI = {
  getAll: () => {
    return JSON.parse(localStorage.getItem("vendas") || "[]");
  },

  getById: (id) => {
    const vendas = JSON.parse(localStorage.getItem("vendas") || "[]");
    return vendas.find((venda) => venda.id === parseInt(id) || venda.id === id);
  },

  create: (venda) => {
    const vendas = JSON.parse(localStorage.getItem("vendas") || "[]");
    const novaVenda = {
      ...venda,
      id: uuidv4(),
      status: "Concluída",
    };

    vendas.push(novaVenda);
    localStorage.setItem("vendas", JSON.stringify(vendas));
    return novaVenda;
  },

  update: (id, venda) => {
    let vendas = JSON.parse(localStorage.getItem("vendas") || "[]");
    const index = vendas.findIndex((v) => v.id === parseInt(id) || v.id === id);

    if (index !== -1) {
      vendas[index] = { ...vendas[index], ...venda };
      localStorage.setItem("vendas", JSON.stringify(vendas));
      return vendas[index];
    }

    return null;
  },

  delete: (id) => {
    let vendas = JSON.parse(localStorage.getItem("vendas") || "[]");
    vendas = vendas.filter((v) => v.id !== parseInt(id) && v.id !== id);
    localStorage.setItem("vendas", JSON.stringify(vendas));
    return true;
  },
};

// API para autenticação
export const authAPI = {
  login: (email, senha) => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const usuario = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (usuario) {
      const { senha, ...usuarioSemSenha } = usuario;
      return usuarioSemSenha;
    }

    return null;
  },
};
