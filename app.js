const vm = new Vue({

    el: "#app",
    data: {
        produtos: [],
        produto: false
    },
    filters: {
        numeroPreco(valor) {
            return valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
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
        fecharModal({ target, currentTarget }) {
            if (target === currentTarget) this.produto = false;
        },
        abriModal(id) {
            this.fetchProduto(id)
            window.scrollTo({
                top: 0,

                behavior: "smooth"
            })
        }
    },
    created() {
        this.fetchProdutos();
    }

});