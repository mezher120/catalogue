const initialState = {
    furnitures: [],
    categories: [],
    keys: []
}

export default function rootReducer(state=initialState, action) {
    switch (action.type) {
        case "GET_ALL":
            return {
                ...initialState,
                furnitures: action.data,
                categories: Array.from(new Set(action.data.map((item) => item.categoria))),
                keys: Object.keys(action.data[0])
            }
            
    
        default:
            return state;
    }
}