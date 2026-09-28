export const initialCartState = { items: [] }

export function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD': {
            const existing = state.items.find(item => item.id === action.payload.id)

            if (existing) {
                return {
                    items: state.items.map(item =>
                        item.id === action.payload.id
                            ? { ...item, qty: item.qty + 1 }
                            : item
                    )
                }
            }

            return { items: [...state.items, { ...action.payload, qty: 1 }] }
        }

        case 'REMOVE': {
            return { items: state.items.filter(item => item.id !== action.payload.id) }
        }

        case 'CLEAR': {
            return initialCartState
        }

        default:
            return state
    }
}