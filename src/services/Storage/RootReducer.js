

const initialState={
  user:null
 }

 export default function RootReducer(state=initialState,actions)
 {
    switch(actions.type)
    {
        case 'ADD_USER':
        
            state.user=actions.payload
            console.log("REDUCER K ANDAR:",state.user)
            localStorage.setItem("USER",JSON.stringify(actions.payload))
            return ({user:state.user})
        case 'DELETE_USER':    
        state.user=null
        localStorage.setItem("USER",state.user)
        return ({user:state.user})

  
        default:
            return state

    }
   
 }