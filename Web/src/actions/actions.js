//Action Creator

export const fetchAllItems = (data)=> {
    console.log(data);
    return{
        type:'ALL_ITEMS',
        data
        
    }
}
export const pushToCart = (item) => {
    return{
        type:'ADD_TO_CART',
        item
    }
}
export const deleteItem = (id) => {
    return{
        type:'REMOVE_FROM_CART',
        id
    }
}
export const updateItemQuantity = (qty,item) => {
    return{
        type:'UPDATE_ITEM_QTY',
        item,
        qty
    }
}