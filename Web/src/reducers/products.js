export default function products(state = {}, action){
    console.log(action.data);
    switch(action.type){
    case 'ALL_ITEMS':
        return action.data

    default:
        return state
    }
}
