import React, {useState, useEffect} from 'react'
import CartItem from '../../components/CartItem';
import { useRouter } from "next/router";
import store from "../../state/GlobalState";
import CheckoutForm from '../../components/checkoutForm';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {clearCart} from "../../state/Actions"
import styles from "../../styles/utility.module.css"


const promise = loadStripe("pk_test_51JWue1Fc67rFacssY7SKoHB5qPzr7axnSJliBWUHcWxRGepLSfsprnhi2xT17O6E3bgNDNGFKPOaGt03yfAwDEAh006igurJKK");


const TAXRATE = 0.0875
function submit() {

    const { Cart, customer } = store.getState();
    const router = useRouter();

    const [totals, setTotals] = useState({});
    const [serverError, setServerError] = useState("");
    const [orderComplete, setOrderComplete] = useState(false)

    var costs; 
    async function checkPrices()
    {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/order/total`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(store.getState())
        });
        costs = await res.json();
        if(costs.error)
        {
            setServerError(costs.error)
        }
        setTotals(costs)
        
    };



    useEffect( ()=>{
        checkPrices();
      
    }, [])

    useEffect(()=>{
        if(serverError != ""){
            console.log("server error??")
            router.push("/routes/pickup")
        }
    }, [serverError])


   async function SendCartData ()
    {
        //go to complete page
       const res =  await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/order/submit`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(store.getState())
        });
        const data = await res.json()
        if(data.error)
        {
            setServerError("ORDER NOT PROCESSED,PLEASE TRY AGAIN...REDIRECTING...")
        }
        else{
            setOrderComplete(true)
            store.dispatch(clearCart())
        }

    }

    if(serverError)
    {
        return (<p className="text-center text-danger">{serverError}</p>)
    }

    return (
        <div className="d-flex justify-content-center">
        <div className="col-lg-8 col-12">
            <p className="text-center">{customer.fname}, please review your order below</p>

            {Cart.map((item, index) => (
        
                <CartItem
                key={index}
                item={item}
                index={index}
                ></CartItem>                
            ))}
            <div className="card border-bottom-0 border-right-0 border-left-0">
                <div className="card-body" style={{fontSize: '0.75em'}}>
                    <div className="card-text">
                    
                        <div className="d-flex justify-content-between">
                            <div className="col-6 font-weight-bold">Subtotal: </div>
                           <div className="col-4">${totals.subtotal}</div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="col-6 font-weight-bold">Tip: </div>
                           <div className="col-4">${totals.tip}</div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="col-6 font-weight-bold">Tax: </div>
                           <div className="col-4">${totals.tax}</div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="col-6 font-weight-bold">Total: </div>
                           <div className="col-4">${totals.total}</div>
                        </div>
                    
                    </div>
                </div>
            </div>
            {orderComplete ? 
                <p className="text-danger text-center">Thank you for placing an order with us! Please wait for confirmation email from restaurant.</p> 
                : 
                <Elements stripe={promise} >
                    <CheckoutForm submit={SendCartData}/>
                </Elements>
            }
        </div></div>
    )
}

export default submit


