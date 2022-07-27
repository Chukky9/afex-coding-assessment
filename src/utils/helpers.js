export const formReducer = (state, event = null) => {
    if (!event) {
        return {}
    }
    return {
        ...state,
        [event.name]: event.value
    }
}