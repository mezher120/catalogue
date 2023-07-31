const initialState = {
    furnitures: [],
    categories: []
}

export default function rootReducer(state=initialState, action) {
    switch (action.type) {
        case "GET_ALL":
            return {
                ...initialState,
                furnitures: action.data,
                categories: Array.from(new Set(action.data.map((item) => item.categoria)))
            }
            
    
        default:
            return state;
    }
}