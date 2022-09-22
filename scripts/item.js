export let pratoSelecionado = null;
export let bebidaSelecionada = null;
export let sobremesaSelecionada = null;

export class Item {
  constructor(item, nome, imagem, descricao, preco) {
    this.item = item;
    this.nome = nome;
    this.imagem = imagem;
    this.descricao = descricao;
    this.preco = preco;
  }

  selecionar(elemento) {
    const selecionado = document.querySelector(`.${this.item} .selecionado`);
    if (selecionado !== null) {
      selecionado.classList.remove("selecionado");
    }
    elemento.classList.add("selecionado");
    if (this.item === "prato") {
        pratoSelecionado = {
            nome: this.nome,
            preco: this.preco,
        };
    } 
    if (this.item === "bebida") {
        bebidaSelecionada = {
            nome: this.nome,
            preco: this.preco,
        };
    } 
    if (this.item === "sobremesa") {
        sobremesaSelecionada = {
            nome: this.nome,
            preco: this.preco,
        };
    } 
    this.verificarPedido();
  }

  getView() {
    const view = document.createElement("div");
    view.classList.add("opcao");
    view.addEventListener("click", () => {
      this.selecionar(view);
    });
    view.innerHTML = `
      <img src="${this.imagem}" />
      <div class="titulo">${this.nome}</div>
      <div class="descricao">${this.descricao}</div>
      <div class="fundo">
        <div class="preco">R$ ${this.preco.toFixed(2)}</div>
        <div class="check">
          <ion-icon name="checkmark-circle"></ion-icon>
        </div>
      </div>
    `;
    return view;
  }

  verificarPedido() {
    if (pratoSelecionado && bebidaSelecionada && sobremesaSelecionada) {
      const btnPedir = document.querySelector(".fazer-pedido");    
      btnPedir.classList.add("ativo");
      btnPedir.disabled = false;
      btnPedir.innerHTML = "Fazer pedido";
    }
  } 
}

export class Pedido {
  constructor(item, itemSelecionado) {
    this.item = item;
    this.itemSelecionado = itemSelecionado;
  }

  confirmarPedido() {
    const modal = document.querySelector(".overlay");
    modal.classList.remove("escondido");

    document.querySelector(`.confirmar-pedido .${this.item} .nome`).innerHTML =
      this.itemSelecionado.nome;
    document.querySelector(`.confirmar-pedido .${this.item} .preco`).innerHTML =
      this.itemSelecionado.preco.toFixed(2);
  }
}
