const initialState = {
  profile : {
    name : null,
    email : null,
    role : null,
    expire: null,
    isExpired : true,
  },
  Cart:{}
}

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
              name : null,
              email : null,
              role : null,
              expire: null,
              isExpired : true,
            },
          };

          case "CHECK_TOKEN":
            return{
              ...state,
              profile:{
                ...state.profile,
                isExpired : true,
              }
            }

            
      default:
        return state;
    }
  };
  
  export default mainReducer;