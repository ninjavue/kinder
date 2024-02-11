

const food = {
    state: {
        food: {},
        foods: []
    },
    getters: {
        food(state) {
            return state.food
        },
        foods(state) {
            return state.foods
        }
    },
    mutations: {
        food(state, payload) {
            state.food = payload
        },
        foods(state, payload) {
            state.foods = payload
        },
        addFood(state, payload) {
            state.foods.push(payload)
        },
        saveFood(state, payload) {
            state.foods = state.foods.map(food => {
                if (food.id == payload.id) {
                    return payload
                }
                return food
            })
        },
        deleteFood(state, payload) {
            let index = state.foods.findIndex(food => food.id == payload.id)
            state.foods.splice(index, 1)
        }
    },
    actions: {
        getFood(context, payload) {
            return context.dispatch('getAxios', `food/${payload}`)
        },
        allFoods(context) {
            context.dispatch('getAxios', 'food')
                .then(res => {
                    console.log(res);
                    context.commit('foods', res.data)
                })
        },
        addFood(context, payload) {
            context.dispatch('postAxios', {
                url: 'food',
                data: payload
            }).then(res => {
                context.commit('addFood', res.data)
            })
        },
        editFood(context, payload) {
            context.dispatch('putAxios', {
                url: `food/${payload.id}`,
                data: payload
            }).then(res => {
                context.commit('saveFood', res.data)
            })
        },
        deleteFood(context, payload) {
            context.dispatch('deleteAxios', `food/${payload}`)
                .then(res => {
                    context.commit('deleteFood', res.data)
                })
        }
    }
}

export default food