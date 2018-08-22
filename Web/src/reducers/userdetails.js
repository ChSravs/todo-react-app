export default function userdetails(state = {
    users:['sravya@gmail.com','kalyani@gmail.com'],
    passwords:['Asdf!2345','Lkjh!9999']
}, action){
    switch(action.type){
        case 'ADD_USER':
            return{...state,
                users: [...state.users,action.un],
                passwords: [...state.users,action.pwd]
            }
    default:
        return state
    }
}