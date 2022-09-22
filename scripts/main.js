import {Item, pratoSelecionado, bebidaSelecionada, sobremesaSelecionada, Pedido} from "./item";

const btnConfirmar = document.querySelector(".confirmar");
const btnCancelar = document.querySelector(".cancelar");
const btnPedir = document.querySelector(".fazer-pedido");

const pratos = [
  new Item("prato", "Estrombelete de Frango", "img/frango_yin_yang.png", "Um pouco de batata, um pouco de salada", 14.9),
  new Item("prato", "Asa de Boi", "img/frango_yin_yang.png", "Com molho shoyu", 14.9),
  new Item("prato", "Carne de Monstro", "img/frango_yin_yang.png", "Com batata assada e farofa", 14.9)
];

const bebidas = [
  new Item("bebida", "Coquinha gelada", "img/coquinha_gelada.png", "Lata 350ml", 4.9),
  new Item("bebida", "Caldo de Cana", "img/coquinha_gelada.png", "Copo 600ml", 4.9),
  new Item("bebida", "Corote Gelado", "img/coquinha_gelada.png", "Garrafa 400ml", 4.9)
];

const sobremesas = [
  new Item("sobremesa", "Pudim", "img/pudim.png", "Gosto de doce de leite", 7.9),
  new Item("sobremesa", "Flam", "img/pudim.png", "Gosto de chocolate", 7.9),
  new Item("sobremesa", "Brigadeiro", "img/pudim.png", "3 unidades", 7.9)
];

function getPrecoTotal() {
  return (
    pratoSelecionado.preco +
    bebidaSelecionada.preco +
    sobremesaSelecionada.preco
  );
}

function confirmarPedido() {
  const modal = document.querySelector(".overlay");
  modal.classList.remove("escondido");

  new Pedido("prato", pratoSelecionado);
  new Pedido("bebida", bebidaSelecionada);
  new Pedido("sobremesa", sobremesaSelecionada);

  document.querySelector(".confirmar-pedido .total .preco").innerHTML =
    getPrecoTotal().toFixed(2);
}

function cancelarPedido() {
  const modal = document.querySelector(".overlay");
  modal.classList.add("escondido");
}

function enviarZap() {
  const telefoneRestaurante = 553299999999;
  const encodedText = encodeURIComponent(
    `Olá, gostaria de fazer o pedido: \n- Prato: ${
      pratoSelecionado.nome
    } \n- Bebida: ${bebidaSelecionada.nome} \n- Sobremesa: ${
      sobremesaSelecionada.nome
    } \nTotal: R$ ${getPrecoTotal().toFixed(2)}`
  );

  const urlWhatsapp = `https://wa.me/${telefoneRestaurante}?text=${encodedText}`;
  window.open(urlWhatsapp);
}

pratos.forEach((prato) => 
  document.querySelector(".opcoes.prato").appendChild(prato.getView())
);
bebidas.forEach((bebida) => 
  document.querySelector(".opcoes.bebida").appendChild(bebida.getView())
);
sobremesas.forEach((sobremesa) => 
  document.querySelector(".opcoes.sobremesa").appendChild(sobremesa.getView())
);

btnConfirmar.addEventListener("click", () => enviarZap());

btnCancelar.addEventListener("click", () => cancelarPedido());

btnPedir.addEventListener("click", () => confirmarPedido());
