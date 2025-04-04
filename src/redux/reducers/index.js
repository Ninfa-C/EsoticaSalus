const initialState = {
  profile: {
    name: null,
    email: null,
    role: null,
    expire: null,
    isExpired: true,
  },
  cart: [],
  update: false
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_PROFILE":
      return {
        ...state,
        profile: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        profile: {
          name: null,
          email: null,
          role: null,
          expire: null,
          isExpired: true,
        },
      };

    case "CHECK_TOKEN":
      return {
        ...state,
        profile: {
          ...state.profile,
          isExpired: true,
        },
      };
    case "ADD_PRODUCT": {
      const productExists = state.cart.some(item => item.idProduct === action.payload.idProduct);  
      if (productExists) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.idProduct === action.payload.idProduct
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }      
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };}
      
      case "UPDATE": 
      return {
        ...state,
        update: !state.update,
      };
    
    default:
      return state;
  }
};

export default mainReducer;
