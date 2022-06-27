import React, { useState } from "react";
import MenuItemName from "./MenuItemName";
import MenuItemPrice from "./MenuItemPrice";
import utility from "../styles/utility.module.css";

const REMOVE = -1;

function OptionalMods({ mods, type, onchange }) {

    
  const [selected, setSelected] = useState(Array(mods.length).fill(false));

  function handleChange(event) {
    const index = event.target.value;
    const modIdAdd = event.target.id;

    var price = mods[index].Price;
    var name = mods[index].Name;

    if (event.target.checked) {
      onchange(modIdAdd, null, price, mods[index]);
    } else {
      onchange(null, modIdAdd, price * REMOVE, mods[index]);
    }
  }

  return (
    <div className="">

      {mods.map((mod, index) => (
        <div key={index}>
          
          <input
            type="checkbox"
            id={mod.ID} 
            name={`optMod${mod.Name}`}
            value={index}
            onChange={handleChange}
          />

          <label
            className="d-inline-flex w-75 justify-content-between p-1"
            htmlFor={mod.ID}
          >
            <MenuItemName name={mod.Name} style={"inlineStyle"}/>
            <MenuItemPrice price={mod.Price} />
          </label>
        </div>
      ))}
    </div>
  );
}

export default OptionalMods;
