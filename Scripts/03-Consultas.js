// Atividade 2: as 5 consultas
const db = connect('mongodb://localhost:27017/lojadb');

print('--- 1. Todos os documentos ---');
printjson(db.vendas.find().toArray());

print('--- 2. Informações da cliente Maria ---');
printjson(db.vendas.find({ nome: 'Maria' }).toArray());

print('--- 3. Clientes VIP (só o nome) ---');
printjson(db.vendas.find({ vip: 1 }, { nome: 1, _id: 0 }).toArray());

print('--- 4. Compras do Marcos ---');
printjson(db.vendas.find({ nome: 'Marcos' }, { compras: 1, _id: 0 }).toArray());

print('--- 5. Nomes de todos os produtos comprados ---');
printjson(db.vendas.distinct('compras.produto'));