const STORAGE_KEY = 'shoppingListsFrontend';

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const loadLists = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveLists = (lists) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
};

export const getShoppingLists = async () => {
  return loadLists();
};

export const getShoppingListById = async (id) => {
  const lists = loadLists();
  return lists.find((list) => list.id === id) || null;
};

export const createShoppingList = async () => {
  const lists = loadLists();
  const newList = {
    id: createId(),
    nome: 'Nova lista de compras',
    itens: [],
  };
  const nextLists = [newList, ...lists];
  saveLists(nextLists);
  return newList;
};

export const updateShoppingList = async (id, updatedList) => {
  const lists = loadLists();
  const nextLists = lists.map((list) => (list.id === id ? updatedList : list));
  saveLists(nextLists);
  return updatedList;
};

export const deleteShoppingList = async (id) => {
  const lists = loadLists();
  const nextLists = lists.filter((list) => list.id !== id);
  saveLists(nextLists);
  return true;
};
