import React, { useState } from "react";
import MenuItemName from "./MenuItemName";
import MenuItemPrice from "./MenuItemPrice";
import utility from "../styles/utility.module.css";

function RequiredMods({ mods, type, onchange }) {


  const [selected, setSelected] = useState(Array(mods.length).fill(false));
  var checked = false

  function handleChange(event) {
    var price = 0;
    var newSelected = selected;
    const modIdAdd = event.target.id;
    const index = event.target.value;
    var name = mods[index].Name;
    var modIdRemove;

    //remove the unchecked value
    const prev = newSelected.indexOf(true);
    if (prev != -1) {
      modIdRemove = mods[prev].ID;
      price -= mods[prev].Price;
      newSelected[prev] = false;
    }

    //add the checked value
    newSelected[index] = true;
    price += mods[index].Price;

    setSelected(newSelected);
    onchange(modIdAdd, modIdRemove, price, mods[index], type);
  }

  return (
    <div >
        {mods.map((mod, index) => (
          <div key={index} >
            <input
              type="radio"
              id={mod.ID}
              name={type}
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

export default RequiredMods;


