const initialState = {
    furnitures: [],
    categories: [],
    keys: [],
    filtered: [],
    filteredByName: []
}

export default function rootReducer(state=initialState, action) {
    switch (action.type) {
        case "GET_ALL":
            return {
                ...initialState,
                furnitures: action.data,
                filtered: action.data,
                filteredByName: action.data,
                categories: Array.from(new Set(action.data.map((item) => item.categoria))),
                keys: Object.keys(action.data[0])
            }
        case "DELETE_ONE":
            return {
                ...state,
                furnitures: state.furnitures.filter(item => item.codigo !== action.data),
                
            }
        case "UPDATE_ONE":
            return {
                ...state,
                furnitures: state.furnitures.map(item => (item.codigo === action.payload.id) ? action.payload.data : item),
            }
        case "FILTER_BY_CATEGORY":
            return {
                ...state,
                filtered: state.furnitures.filter(item => item.categoria === action.payload),
            }
        case "FILTER_BY_NAME":
            return {
                ...state,
                filteredByName: action.payload.length > 3 ? state.furnitures.filter(item => item.nombre.includes(action.payload)) : state.furnitures ,
            }
            
    
        default:
            return state;
    }
}