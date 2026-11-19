let produtos = [
  { id: 1, nome: "Camiseta Preta Oversized", categoria: "camisas", preco: 49.9, imagem: "img/camisa-preta.jpg" },
  { id: 2, nome: "Camisa Verde de Botão", categoria: "camisas", preco: 79.9, imagem: "img/camisa-verde.jpg" },
  { id: 3, nome: "Calça Casual Cinza", categoria: "calças", preco: 109.9, imagem: "img/calça-cinza.jpg" },
  { id: 4, nome: "Calça Casual Bege", categoria: "calças", preco: 139.9, imagem: "img/calça-marrom.jpg" },
  { id: 5, nome: "Tênis Esportivo Preto", categoria: "calçados", preco: 189.9, imagem: "img/Tenis-casual.jpg" },
  { id: 6, nome: "Boné Cinza", categoria: "acessórios", preco: 59.9, imagem: "img/bone-cinza.jpg" }
];

function formatarPreco(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

function mostrarProdutos(lista) {
  let area = document.getElementById("lista-produtos");
  let total = 0;
  area.innerHTML = "";

  for (let i = 0; i < lista.length; i++) {
    let p = lista[i];
    total = total + p.preco;

    let card = document.createElement("article");
    card.className = "card";
    card.innerHTML =
      "<img src='" + p.imagem + "' alt='" + p.nome + "'>" +
      "<h3>" + p.nome + "</h3>" +
      "<p>" + p.categoria + "</p>" +
      "<p class='preco'>" + formatarPreco(p.preco) + "</p>";
    area.appendChild(card);
  }

  document.getElementById("contador").textContent = lista.length;
  document.getElementById("total").textContent = formatarPreco(total);
}

function filtrarProdutos(categoria) {
  if (categoria === "todos") {
    mostrarProdutos(produtos);
  } else {
    let filtrados = produtos.filter(function (p) {
      return p.categoria === categoria;
    });
    mostrarProdutos(filtrados);
  }
}

if (document.getElementById("lista-produtos")) {
  mostrarProdutos(produtos);

  let botoes = document.querySelectorAll(".filtro");
  for (let i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener("click", function () {
      filtrarProdutos(botoes[i].dataset.categoria);
    });
  }
}
function calcularTotal(preco, quantidade) {
  let pares = Math.floor(quantidade / 2);
  let desconto = pares * preco * 0.2;
  let total = preco * quantidade - desconto;
  return { desconto: desconto, total: total };
}

function preencherSelect() {
  let select = document.getElementById("item");
  for (let i = 0; i < produtos.length; i++) {
    let opcao = document.createElement("option");
    opcao.value = produtos[i].id;
    opcao.textContent = produtos[i].nome + " - " + formatarPreco(produtos[i].preco);
    select.appendChild(opcao);
  }
}

function simular() {
  let id = Number(document.getElementById("item").value);
  let quantidade = Number(document.getElementById("quantidade").value);
  let resultado = document.getElementById("resultado");

  if (quantidade < 1 || isNaN(quantidade)) {
    resultado.textContent = "Digite uma quantidade válida.";
    return;
  }

  let escolhido = produtos.find(function (p) {
    return p.id === id;
  });

  let conta = calcularTotal(escolhido.preco, quantidade);

  if (quantidade >= 2) {
    resultado.innerHTML =
      "Desconto: " + formatarPreco(conta.desconto) + "<br>Total: " + formatarPreco(conta.total);
  } else {
    resultado.innerHTML = "Sem desconto com 1 peça.<br>Total: " + formatarPreco(conta.total);
  }
}

if (document.getElementById("botao-calcular")) {
  preencherSelect();
  document.getElementById("botao-calcular").addEventListener("click", simular);
}