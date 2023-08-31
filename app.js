const vm = new Vue({

    el: "#app",
    data: {
        produtos: [],
        produto: false,
        carrinho: []
    },
    filters: {
        numeroPreco(valor) {
            return valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        }
    },
    computed: {
        carrinhoTotal() {
            let total = 0;
            if (this.carrinho.length) {
                this.carrinho.forEach(item => {
                    total += item.preco;
                });
            }
            return total;
        }
    },
    methods: {
        fetchProdutos() {
            fetch("./api/produtos.json")
                .then((resposta => resposta.json()))
                .then((json) => {
                    this.produtos = json;
                })
        },
        fetchProduto(id) {
            fetch(`api/produtos/${id}/dados.json`)
                .then((resposta) => resposta.json())
                .then((json) => {
                    this.produto = json;
                })
        },
        abriModal(id) {
            this.fetchProduto(id)
            window.scrollTo({
                top: 0,

                behavior: "smooth"
            })
        },
        fecharModal({ target, currentTarget }) {
            if (target === currentTarget) this.produto = false;
        },
        adicionarItem() {
            this.produto.estoque--;
            const { id, nome, preco } = this.produto;
            this.carrinho.push({ id, nome, preco });
        },
        removerItem(index) {
            this.carrinho.splice(index, 1);
        }
    },
    created() {
        this.fetchProdutos();
    }

});