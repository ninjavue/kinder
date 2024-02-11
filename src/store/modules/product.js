

const product = {
    state: {
        product: {},
        products: []
    },
    getters: {
        product(state) {
            return state.product
        },
        products(state) {
            return state.products
        }
    },
    mutations: {
        product(state, payload) {
            state.product = payload
        },
        products(state, payload) {
            state.products = payload
        },
        addProduct(state, payload) {
            state.products.push(payload)
        },
        saveProduct(state, payload) {
            state.products = state.products.map(product => {
                if (product.id == payload.id) {
                    return payload
                }
                return product
            })
        },
        deleteProduct(state, payload) {
            let index = state.products.findIndex(product => product.id == payload.id)
            state.products.splice(index, 1)
        }
    },
    actions: {
        getProduct(context, payload) {
            return context.dispatch('getAxios', `product/${payload}`)
        },
        allProducts(context) {
            context.dispatch('getAxios', 'product')
                .then(res => {
                    context.commit('products', res.data)
                })
        },
        addProduct(context, payload) {
            context.dispatch('postAxios', {
                url: 'product',
                data: payload
            }).then(res => {
                context.commit('addProduct', res.data)
            })
        },
        editProduct(context, payload) {
            context.dispatch('putAxios', {
                url: `product/${payload.id}`,
                data: payload
            }).then(res => {
                context.commit('saveProduct', res.data)
            })
        },
        deleteProduct(context, payload) {
            context.dispatch('deleteAxios', `product/${payload}`)
                .then(res => {
                    context.commit('deleteProduct', res.data)
                })
        }
    }
}

export default product