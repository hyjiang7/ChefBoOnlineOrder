export const ACTIONS = {
  ADD_TO_CART: "ADD_TO_CART",
  DELETE_FROM_CART: "DELETE_FROM_CART",
  ADD_CUSTOMER_INFO : "ADD_CUSTOMER_INFO",
  SET_SUBTOTAL : "SET_SUBTOTAL",
  SET_TIPS: "SET_TIPS",
  SET_LUNCH: "SET_LUNCH",
    ADD_LUNCH : "ADD_LUNCH",
    DELETE_LUNCH : "DELETE_LUNCH",
    CLEAR_CART: "CLEAR_CART"
  // UPDATE_ITEM_PRICE: 'UPDATE_ITEM_PRICE'
};

// export const updateItemPrice = (item) => {
//     // if(product.inStock === 0)
//     // return ({ type: 'NOTIFY', payload: {error: 'This product is out of stock.'} })

//     // const check = cart.every(item => {
//     //     return item._id !== product._id
//     // })

//     // if(!check) return ({ type: 'NOTIFY', payload: {error: 'The product has been added to cart.'} })

//     // return ({ type: 'ADD_CART', payload: [...cart, {...product, quantity: 1}] })

//     const price = item.price;
//     return({type: ADD_CART, payload: [{...item, itemTotal: price}]})
// }

export const addToCart = (item, Cart) => {
  return { type: "ADD_TO_CART", payload: [...Cart, { ...item, quantity: 1 }] };
};

export const deleteFromCart = (index, Cart) => {

  Cart.splice(index, 1);
  const tempCart = Cart;

  return { type: "DELETE_FROM_CART", payload: tempCart };
};

export const addCustomerInfo = (info) =>{

    return {type:"ADD_CUSTOMER_INFO", payload: info};
}

export const setSubtotal = (subtotal) =>{


    return {type: "SET_SUBTOTAL", payload: subtotal}
}

export const setTips = (tips) =>{


    return {type: "SET_TIPS", payload: tips}
}

export const setLunch = (lunchIDs) =>{
    
    return {type: "SET_LUNCH", payload: lunchIDs}
}

export const addToLunch = () =>{
    return{type: "ADD_LUNCH"}
}

export const deleteFromLunch = () =>{

    return {type: "DELETE_LUNCH"}
}

export const clearCart = () =>{

    return {type: "CLEAR_CART"}

}