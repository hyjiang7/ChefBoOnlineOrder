import React, {useEffect, useState} from "react";
import BestSellerItem from "./BestSellerItem";
import utility from "../styles/utility.module.css";


const BestSellers = () => {
  
    const [popularItems, setPopularItems] = useState([0])

    async function getPopularItems(){
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/popular`);
        const popular = await res.json();
        setPopularItems(popular.results)
       
    }

  useEffect(()=>{
        getPopularItems()

  }, [])

  return (
    <>
      <div className={`${utility.bgRed} card text-center text-white` } >
        <div className="card-body">
          <div className={`${utility.fontSizeLarge} card-title`}>Best Sellers</div>
          <div className="card-text ">
            <div className="row justify-content-around">
              
              {popularItems? 
                  popularItems.map((i, index)=>
                  (
                      <BestSellerItem key={index} item={i} />
                  ))
                  : null
              }
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

BestSellers.propTypes = {};

export default BestSellers;
