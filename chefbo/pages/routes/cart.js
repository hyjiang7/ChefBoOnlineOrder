import store from "../../state/GlobalState";
import CartItem from "../../components/CartItem";
import { deleteFromCart, setSubtotal, deleteFromLunch } from "../../state/Actions";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

const cart = () => {


  const { Cart,lunch } = store.getState();
  const router = useRouter();
  const [cartTotal, setCartTotal] = useState(0);
  const [totalCartItems, setTotalCartItems] = useState(0);

  //get total the first time

    useEffect(() =>{
        var temp = 0;
        var count = 0;
        Cart.map((item,index) =>{
            temp += item.itemTotal;
            count += 1;
        })
        setCartTotal(temp)
        setTotalCartItems(count)
        store.dispatch(setSubtotal(temp));

        
    }, [totalCartItems])



  const deleteCartItem = (index) => {

    console.log(Cart[index])
    if(lunch.includes(Cart[index].item.ID))
    {
        store.dispatch(deleteFromLunch())
    }

    store.dispatch(deleteFromCart(index, Cart));

    

    setTotalCartItems(totalCartItems -1)
  };

  

  if (Cart.length == 0)
    return (
        <div className=" w-75 text-center m-auto">
            <p > Cart is empty! Add items to begin order.</p>
           <button className="btn btn-danger" onClick={() => {router.push("/routes/pickup")}}>Begin Order!</button>
        </div>
    );

  return (
    <div className="col-12 col-md-10 col-lg-8 m-auto ">
      {Cart.map((item, index) => (
        
        <CartItem
          key={index}
          item={item}
          index={index}
          deleteHandle={deleteCartItem}
        ></CartItem>

        
      ))}
      {/* <div className="d-flex justify-content-center my-2"></div> */}
      <div className="row d-flex justify-content-between my-2 ">
        <button className="btn btn-secondary col-11 col-lg-4 m-1" onClick={() => {router.push("/routes/pickup")}}>Continue Shopping</button>
        <button  className="btn btn-danger col-11 col-lg-4 m-1" onClick={() => {router.push("/routes/checkout")}}>Checkout Subtotal: ${cartTotal.toFixed(2)}</button>
      </div>
    </div>
  );
};

export default cart;
