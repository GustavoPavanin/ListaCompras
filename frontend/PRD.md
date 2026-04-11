# PRD: Aplicação de Lista de Compras (Frontend)

## 1. Visão geral

Aplicação frontend para gerenciar listas de compras de supermercado como um checklist simples. O objetivo é treinar desenvolvimento com React e Material UI, mantendo a interface limpa e o fluxo intuitivo.

O foco inicial é somente o frontend, com contract points para comunicação com um backend fictício ou futuro.

## 2. Objetivos

- Criar listas de compras novas.
- Exibir uma lista de listas de compras disponíveis.
- Editar uma lista de compras existente.
- Adicionar, marcar concluído e remover itens da lista.
- Sincronizar alterações com o backend.
- Excluir lista de compras existente.
- Construir uma interface simples com Material UI.

## 3. Público-alvo

Usuários que desejam montar e controlar listas de compras de supermercado facilmente, sem necessidade de muitos recursos extras.

## 4. Principais telas

### 4.1 Tela de listagem de listas de compras

Componentes principais:
- Título: "Listas de Compras"
- Botão `Criar lista de compras`
- Card ou linha para cada lista existente
- Botão `Editar lista` em cada lista
- Possível indicador de quantos itens existem ou status resumido

Comportamento:
- `Criar lista de compras` inicia o processo de criação e chama o backend para gerar a nova lista.
- Ao clicar em `Editar lista`, abre a tela de detalhes da lista.

### 4.2 Tela de edição de lista de compras

Componentes principais:
- Cabeçalho com nome da lista
- Botões:
  - `Sincronizar`
  - `Excluir lista`
- Campo para adicionar item novo
- Checklist de itens:
  - Checkbox para marcar como atendido
  - Texto do item
  - Botão para remover item
- Feedback visual para itens concluídos

Comportamento:
- Ao adicionar um item, ele aparece imediatamente na checklist.
- Ao marcar como atendido, o status é atualizado no frontend.
- Ao remover um item, ele desaparece da lista.
- `Sincronizar` envia as alterações para o backend.
- `Excluir lista` remove a lista do backend e retorna para a tela de listagem.

## 5. Requisitos funcionais

### 5.1 Listagem de listas

- Exibir todas as listas de compras disponíveis.
- Permitir criar uma nova lista.
- Permitir editar uma lista existente.
- Mostrar informações básicas de cada lista.

### 5.2 Criação de lista

- Botão `Criar lista de compras` chama método de criação.
- A nova lista deve gerar um ID único no backend.
- Após criação, navegar para a tela de edição da lista.

### 5.3 Edição de lista

- Permitir adicionar item com um texto curto.
- Permitir marcar/desmarcar cada item como atendido.
- Permitir remover itens.
- Manter estado local até sincronizar.
- Enviar atualizações para backend quando usuario clicar `Sincronizar`.
- Permitir excluír lista e navegar de volta à listagem.

### 5.4 Sincronização

- O botão `Sincronizar` envia a lista completa ou somente as alterações.
- Pode ser exibido um indicador de carregamento durante a sincronização.
- Em caso de erro, exibir mensagem de falha.

### 5.5 Exclusão

- `Excluir lista` remove a lista no backend.
- Pode solicitar confirmação antes de excluir.
- Após exclusão, retorno para tela de listagem.

## 6. Requisitos não funcionais

- Usar React (criado com Create React App ou equivalente).
- Usar Material UI para componentes e estilo.
- Interface responsiva e simples.
- Preferência por acessibilidade básica.
- Código organizado em componentes reutilizáveis.

## 7. API contratual (frontend-only)

Definir contrato simples para o backend esperado.

### 7.1 Endpoints

- `GET /listas` - retorna uma lista de objetos de lista de compras.
- `POST /listas` - cria uma nova lista e retorna o objeto criado.
- `PUT /listas/:id` - atualiza a lista completa.
- `DELETE /listas/:id` - exclui a lista.

### 7.2 Modelo de dados

Lista de compras:

```json
{
  "id": "string",
  "nome": "Lista de compras",
  "itens": [
    {
      "id": "string",
      "texto": "Leite",
      "atendido": false
    }
  ]
}
```

## 8. Estapas de implementação

### 8.1 Preparação do projeto

- Confirmar dependências do frontend.
- Adicionar Material UI (`@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`).
- Estruturar pastas de componentes.

### 8.2 Tela de listagem

- Criar componente `ListaListagem`.
- Implementar exibição de cartas/linhas de listas.
- Criar botão `Criar lista de compras`.
- Mockar chamadas ao backend ou usar `fetch`/`axios` para o contrato.

### 8.3 Tela de edição

- Criar componente `ListaEdicao`.
- Implementar formulário para adicionar itens e checklist.
- Adicionar botões `Sincronizar` e `Excluir lista`.
- Controlar estado local dos itens.

### 8.4 Navegação

- Implementar navegação simples entre telas.
- Pode usar rotas com React Router.

### 8.5 Integração com backend fictício

- Implementar chamadas `fetch` simulando endpoints.
- Usar dados locais ou `localStorage` para persistência inicial.

### 8.6 Finalização

- Validar comportamentos de criação, edição, sincronização e exclusão.
- Refinar UI com Material UI.
- Testar fluxo e corrigir eventuais bugs.
- implementar testes unitários para os componentes com jest
- incrementar o README.md do projeto

## 9. Critérios de aceitação

- A tela de listagem mostra listas e possui botão `Criar lista de compras`.
- É possível criar uma nova lista e navegar para edição.
- A edição mostra checklist de itens, permite adicionar, marcar e remover.
- `Sincronizar` aciona a lógica de envio ao backend.
- `Excluir lista` remove a lista e retorna à listagem.
- A interface usa Material UI e segue layout simples.

## 10. Observações

- Como o foco é frontend, a integração com backend pode ser mockada inicialmente.
- Depois, o backend real deve expor os endpoints descritos no contrato.
- É recomendável documentar o fluxo de dados por componentes e separar lógica de UI.
