export default function cartlist(state = {
    list:[],
}, action){
    console.log(state.list.length);
    switch(action.type){
    case 'ADD_TO_CART':
                return {...state,
                    list: [...state.list,
                        {
                            id:action.item.id,
                            name:action.item.name,
                            Price:action.item.Price,
                            quantity:1,
                            total:action.item.Price
                        }
                    ]
                }
    case 'REMOVE_FROM_CART':
            return {
                list:state.list.filter((list)=>list.id !== action.id)
            }
    case 'UPDATE_ITEM_QTY':
            return{...state,
                list: [...state.list,
                    {
                        id:action.item.id,
                        name:action.item.name,
                        Price:action.item.Price,
                        quantity:action.qty,
                        total:action.item.Price * action.qty
                    }
                ]
            }
    default:
        return state
    }
}
