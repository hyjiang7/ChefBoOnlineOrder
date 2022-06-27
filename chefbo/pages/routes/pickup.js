import MenuItemCate from "../../components/MenuItemCate";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import store from "../../state/GlobalState";
import {
    Accordion,
  } from "react-bootstrap";

  
const Pickup = ({ categories, cateMenuItems }) => {

    const {Cart} = store.getState();
    const [cartCount, setCartCount] = useState(Cart.length)

  
    useEffect(()=>{
        setCartCount(store.getState().Cart.length)
    }, [cartCount])

    const executeScrollTop = ()=>{
      window.scrollTo(0, 0)
    }

  return (
    <>
      <Head>
        <title>Order Pickup Online</title>
      </Head>
      
      <div style={fixedLeftTop}> 
            <Link href="/routes/cart" passHref><div>
                <img src="/shopping-cart.png" alt="Spicy" width="50" height="50"/>
                <div style={countPosition} className="p-1 bg-danger border border-danger text-white" >{cartCount}</div>
                </div>
            </Link>

      </div>

      <div style={fixedLeftBottom}>
        <button className="btn btn-light border border-secondary font-weight-bold rounded-circle" style={{height: "50px", width: "50px"}} onClick={executeScrollTop}>^</button>
      </div>
      

      <Accordion defaultActiveKey="1">
        {categories.map((category, index) => (
          <MenuItemCate key={index} id={index+1} cate={category.Name} menuItem={cateMenuItems[index]} />
        ))}

      </Accordion>  
    </>
  );
};

const countPosition = {
        position: "absolute",
        bottom: 0,
        borderRadius: "50%",
    }


const fixedLeftTop = {
    position: "fixed",
    right: "0%",
    zIndex: 100, 
    color: "red",
    cursor: "pointer",
  
}

const fixedLeftBottom = {
    position: "fixed",
    right: "0%",
    bottom: "5%",
    zIndex: 99, 
    cursor: "pointer",
}

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/categories`);
  var categories = await res.json();
  categories = categories.results
  if (!categories) {
    return {
      notFound: true,
    };
  }
  var cateMenuItems = [];

  for (var i = 0; i < categories.length; i++) {
    cateMenuItems[i] = [];
    const {ID, Category} = categories[i]
    const URI = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/` + ID;
    const encodedURI = encodeURI(URI);

    const res2 = await fetch(encodedURI);
     const results = await res2.json();

    cateMenuItems[i].push(results.results);
  }

  return {
    props: {
      categories,
      cateMenuItems: cateMenuItems,
    },
  };
};

export default Pickup;
