import Link from "next/link";
import React from "react";
import utility from "../styles/utility.module.css";
import MenuItemName from "./MenuItemName"


const BestSellerItem = ({ item }) => {
  const {ID, Name, Spicy, Popular} = item
     console.log(Popular)
  return (
    <Link href={`/routes/items/${ID}`} >
      <span className="col-12 col-md-4">
          <img
          className={`${utility.pointerCursor} img-thumbnail col-12`}
          src={`/${Popular}`}
          alt={Popular}
        />
        
        <MenuItemName name={Name} spicy={Spicy} style="title"></MenuItemName>
      </span>
    </Link>
  );
}

export default BestSellerItem;
    