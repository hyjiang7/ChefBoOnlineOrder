import { ACTIONS } from "./Actions";

const reducers = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART:
      return {
        ...state,
        Cart: action.payload,
      };
    case ACTIONS.DELETE_FROM_CART:
      return {
        ...state,
        Cart: action.payload,
      };
    case ACTIONS.ADD_CUSTOMER_INFO:
      return {
        ...state,
        customer: action.payload,
      };
    case ACTIONS.SET_SUBTOTAL:
      return {
        ...state,
        subtotal: action.payload,
      };
    case ACTIONS.SET_TIPS:
      return {
        ...state,
        tips: action.payload,
      };
    case ACTIONS.SET_LUNCH:
        return{
            ...state,
            lunch: action.payload
        };
    case ACTIONS.ADD_LUNCH:
        return{
            ...state,
            lunchInCart : state.lunchInCart + 1
        }
    case ACTIONS.DELETE_LUNCH:
        return{
            ...state,
            lunchInCart : state.lunchInCart - 1
        }
    case ACTIONS.CLEAR_CART:
        return {
            ...state,
            Cart: [],
            subtotal: 0,
            lunchInCart: 0,
            tips: 0
        }
    default:
      return state;
  }
};

export default reducers;
