# Aula Prática: MongoDB (lojadb)

Atividade da disciplina **Bancos de Dados Não Relacionais**. Cria o banco `lojadb` com a collection `vendas`, insere e atualiza documentos de clientes e compras e executa cinco consultas.

## Estrutura do repositório

```
.
├── README.md
├── scripts/
│   ├── 01-insercao.js       # insere os 3 clientes
│   ├── 02-atualizacao.js    # adiciona endereço e compras
│   └── 03-consultas.js      # executa as 5 consultas
└── prints/                  # capturas de tela das consultas
```

## O que você precisa

- [MongoDB Community Server](https://www.mongodb.com/try/download/community), em execução
- [mongosh](https://www.mongodb.com/try/download/shell) (já vem com o MongoDB Compass e com o instalador do servidor)
- [MongoDB Compass](https://www.mongodb.com/try/download/compass) (opcional, para ver os dados em interface gráfica)

## Como executar

Com o servidor rodando, execute os scripts **na ordem**, a partir da pasta do projeto:

```bash
mongosh --file scripts/01-insercao.js
mongosh --file scripts/02-atualizacao.js
mongosh --file scripts/03-consultas.js
```

O banco e a collection são criados automaticamente na primeira inserção. O `01` limpa a collection antes de inserir, então pode ser repetido sem duplicar clientes (mas apaga o que o `02` adicionou, por isso rode o `02` em seguida).

Para conferir pelo Compass, conecte em `mongodb://localhost:27017` e abra `lojadb` > `vendas`.

### Executar comando por comando

Se preferir digitar no shell, abra o `mongosh`, selecione o banco com `use lojadb` e cole o conteúdo dos scripts (sem a linha `const db = connect(...)`).

## Modelo dos documentos

Cada cliente é um documento. Como o banco é não relacional, os documentos não precisam ter os mesmos campos: o Marcos não tem `email`, e cada cliente tem uma quantidade diferente de telefones.

```javascript
{
  nome: "Maria",
  vip: 1,
  email: "maria@email.com",
  telefone: ["9999-3333", "8888-3333", "9988-3000"],       // Array
  endereco: { rua: "Rua Três", numero: 3000,
              cidade: "Londrina", estado: "PR" },          // Objeto
  compras: [                                               // Array de Objetos
    { produto: "Tablet", preco: 2500, quantidade: 1 },
    { produto: "Capa para tablet", preco: 50, quantidade: 1 }
  ]
}
```

## Consultas

| # | O que faz | Comando |
|---|-----------|---------|
| 1 | Todos os documentos | `db.vendas.find().pretty()` |
| 2 | Dados da Maria | `db.vendas.find({ nome: "Maria" }).pretty()` |
| 3 | Clientes VIP (só o nome) | `db.vendas.find({ vip: 1 }, { nome: 1, _id: 0 }).pretty()` |
| 4 | Compras do Marcos | `db.vendas.find({ nome: "Marcos" }, { compras: 1, _id: 0 }).pretty()` |
| 5 | Todos os produtos comprados | `db.vendas.distinct("compras.produto")` |

Resultado esperado da consulta 5: `Borracha`, `Caderno`, `Caneta`, `Capa para tablet`, `Tablet` e `notebook`.

## Problemas comuns

| Sintoma | O que fazer |
|---------|-------------|
| `ECONNREFUSED` ao conectar | O servidor não está rodando. Inicie o serviço do MongoDB e tente de novo |
| `mongosh: command not found` | O mongosh não está instalado ou não está no PATH. Instale pelo link acima |
| Clientes duplicados | Rode o `01-insercao.js` de novo, que limpa a collection antes |
| Campo `endereco` não aparece | Faltou rodar o `02-atualizacao.js` |

## Autor

Lohan Hiel
