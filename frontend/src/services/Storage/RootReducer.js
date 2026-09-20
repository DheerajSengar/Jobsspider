let savedUser = null;
try {
  const item = localStorage.getItem("USER");
  savedUser = item && item !== 'null' && item !== 'undefined' ? JSON.parse(item) : null;
} catch (e) {
  savedUser = null;
}

const initialState = {
  user: savedUser
};

export default function RootReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_USER':
      localStorage.setItem("USER", JSON.stringify(action.payload));
      if (action.token) {
        localStorage.setItem("token", action.token);
      }
      return { ...state, user: action.payload };

    case 'DELETE_USER':
      localStorage.removeItem("USER");
      localStorage.removeItem("token");
      return { ...state, user: null };

    default:
      return state;
  }
}
