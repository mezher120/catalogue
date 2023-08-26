const initialState = {
    furnitures: [],
    categories: [],
    keys: [],
    filtered: [],
    covers: [],
    color: 'gray',
}

export default function rootReducer(state=initialState, action) {
    switch (action.type) {
        case "GET_ALL":
            return {
                ...initialState,
                furnitures: action.data,
                filtered: action.data,
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
                furnitures: state.furnitures.map(item => (item.codigo === action.payload.id) ? action.payload.newData : item),
            }
        case "FILTER_BY_CATEGORY":
            return {
                ...state,
                filtered: state.furnitures.filter(item => item.categoria === action.payload),
            }   
        case "GET_COLOR":
            return {
                ...state,
                color: action.payload
            }
    
        default:
            return state;
    }
}