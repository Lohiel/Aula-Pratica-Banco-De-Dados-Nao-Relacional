// Atividade 1, Etapa 1: insere os clientes na collection vendas
const db = connect('mongodb://localhost:27017/lojadb');

// Limpa a collection para evitar clientes duplicados se rodar de novo
db.vendas.deleteMany({});

db.vendas.insertMany([
  { nome: 'João',   vip: 1, email: 'joao@email.com',  telefone: ['9999-1111', '8888-1111'] },
  { nome: 'Marcos', vip: 0,                           telefone: ['9999-2222'] },
  { nome: 'Maria',  vip: 1, email: 'maria@email.com', telefone: ['9999-3333', '8888-3333', '9988-3000'] }
]);

print('Clientes inseridos: ' + db.vendas.countDocuments());