const API_URL = process.env.REACT_APP_API_URL || '/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const getShoppingLists = async () => {
  const response = await fetch(`${API_URL}/shopping-lists`);
  const data = await handleResponse(response);
  // Mapeia o formato do backend para o formato esperado pelo frontend
  return data.map(list => ({
    id: String(list.id),
    nome: list.nome,
    quantidadeItens: list.quantidadeItens || 0,
    itens: [] // Summary não tem itens, será carregado no editor
  }));
};

export const getShoppingListById = async (id) => {
  const response = await fetch(`${API_URL}/shopping-lists/${id}`);
  const data = await handleResponse(response);
  // Mapeia o formato do backend para o formato esperado pelo frontend
  return {
    id: String(data.id),
    nome: data.nome,
    itens: data.itens.map(item => ({
      id: String(item.id),
      texto: item.texto,
      atendido: item.atendido,
      quantidade: item.quantidade || 1
    }))
  };
};

export const createShoppingList = async () => {
  const response = await fetch(`${API_URL}/shopping-lists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await handleResponse(response);
  return {
    id: String(data.id),
    nome: data.nome,
    itens: []
  };
};

export const updateShoppingList = async (id, updatedList) => {
  // Mapeia o formato do frontend para o formato esperado pelo backend
  const payload = {
    id: parseInt(id, 10),
    nome: updatedList.nome,
    itens: updatedList.itens.map(item => ({
      id: item.id ? parseInt(item.id, 10) : null,
      texto: item.texto,
      atendido: item.atendido,
      quantidade: item.quantidade || 1
    }))
  };

  const response = await fetch(`${API_URL}/shopping-lists/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await handleResponse(response);
  return {
    id: String(data.id),
    nome: data.nome,
    itens: data.itens.map(item => ({
      id: String(item.id),
      texto: item.texto,
      atendido: item.atendido,
      quantidade: item.quantidade || 1
    }))
  };
};

export const deleteShoppingList = async (id) => {
  const response = await fetch(`${API_URL}/shopping-lists/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `HTTP error! status: ${response.status}`);
  }
  return true;
};
