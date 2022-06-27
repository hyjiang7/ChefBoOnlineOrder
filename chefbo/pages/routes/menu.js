//Menu.js is a react component with associated route
import MenuItemCate from "../../components/MenuItemCate";
import React, { useRef, useEffect, useState } from "react";
import Head from "next/head";
import {
  Accordion,
  
} from "react-bootstrap";

const Menu = ({ categories, cateMenuItems }) => {

    const [activeKey, setActiveKey] = useState(0)
    const myRefArr = []
    categories.map((i, ind) =>{
        myRefArr[ind] = useRef(null)
    })


    const executeScrollTop = ()=>{
      window.scrollTo(0, 0)
    }
 
  
  return (
    <div >
      <Head>
        <title>Order Pickup Online</title>
      </Head>

      <div className="" style={fixedLeftBottom}>
        <button className="btn btn-light border border-secondary font-weight-bold rounded-circle" style={{height: "50px", width: "50px"}} onClick={executeScrollTop}>^</button>
      </div>
      <Accordion defaultActiveKey={activeKey}>
        {categories.map((category, index) => (
              <MenuItemCate key={index} id={index+1} myRef={myRefArr[index]} cate={category.Name} menuItem={cateMenuItems[index]} type="menu"/>
        ))}
      </Accordion> 
    </div>
  );
};

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

export default Menu;
