const type = {
    state: () => ({
        types: ['kg', 'litr', 'dona'],
        typesList: ['gr', 'ml', 'dona'],
    }),
    getters: {
        typesList(state) {
            return state.typesList
        },
        types(state) {
            return state.types
        }
    }
}

export default type