// Atividade 1, Etapa 2: adiciona endereço (Objeto) e compras (Array de Objetos)
const db = connect('mongodb://localhost:27017/lojadb');

db.vendas.updateOne({ nome: 'João' }, { $set: {
  endereco: { rua: 'Rua Um', numero: 1000, complemento: 'Apto 1 Bloco 1', cidade: 'São Paulo', estado: 'SP' },
  compras: [ { produto: 'notebook', preco: 5000, quantidade: 1 } ]
} });

db.vendas.updateOne({ nome: 'Marcos' }, { $set: {
  endereco: { rua: 'Rua Dois', numero: 4000, cidade: 'Campinas', estado: 'SP' },
  compras: [
    { produto: 'Caderno',  preco: 20, quantidade: 1 },
    { produto: 'Caneta',   preco: 3,  quantidade: 5 },
    { produto: 'Borracha', preco: 2,  quantidade: 2 }
  ]
} });

db.vendas.updateOne({ nome: 'Maria' }, { $set: {
  endereco: { rua: 'Rua Três', numero: 3000, cidade: 'Londrina', estado: 'PR' },
  compras: [
    { produto: 'Tablet',           preco: 2500, quantidade: 1 },
    { produto: 'Capa para tablet', preco: 50,   quantidade: 1 }
  ]
} });

print('Documentos com endereço: ' + db.vendas.countDocuments({ endereco: { $exists: true } }));