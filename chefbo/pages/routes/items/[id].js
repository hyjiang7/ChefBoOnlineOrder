import React, { useState } from "react";
import OptionalMods from "../../../components/OptionalMods";
import RequiredMods from "../../../components/RequiredMods";
import utility from "../../../styles/utility.module.css";
import MenuItemDes from "../../../components/MenuItemDes";
import MenuItemName from "../../../components/MenuItemName";
import MenuItemPrice from "../../../components/MenuItemPrice";
import { addToCart, addToLunch } from "../../../state/Actions";
import store from "../../../state/GlobalState";
import { useRouter } from 'next/router';



const itemDetail = ({ item }) => {

  console.log(item)

    if (item.error) return <p>Error 500</p> 
  const { Price, Name, Description } = item.detail;

  const [itemTotal, setItemTotal] = useState(Price);
  const [selectedMods, setSelectedMods] = useState([]);
  const [reqModSelected, setReqModSelected] = useState({status:false, error:""});
  const [sideModSelected, setSideModSelected] = useState({status:false, error:""});
  const router = useRouter();

  const handleModChange = (modIdAdd, modIdRemove, price, mod, modType) => {
    let removeIndex;
    let selectedModsTemp = selectedMods;

    if (modType == "reqMod"){
        setReqModSelected(prevState =>{
            return {...prevState, status:true} 
        })
    }
    if(modType == "sideMod"){
        setSideModSelected(prevState =>{
            return {...prevState, status:true} 
        })
    }
    
    var modObj = {};
    modObj.ID = modIdAdd;
    modObj.Price = price;
    modObj.Name = mod.Name;
    modObj.ChineseName = mod.ChineseName;


    if (modIdRemove) {
      removeIndex = selectedModsTemp.findIndex((i) => {
        return i.ID == modIdRemove.toString();
      });
      selectedModsTemp.splice(removeIndex, 1);
    }

    if (modIdAdd) {
      selectedModsTemp.push(modObj);
    }

    setSelectedMods(selectedModsTemp);
    setItemTotal(price + itemTotal);
  };

  

  const handleAddToCart = (e) => {
    
    e.preventDefault();

    if(!reqModSelected.status && item.RequiredMods.length > 0){

        setReqModSelected(prevState =>{return {...prevState, status: false, error:"Please choose a selection!"}})
        
    }
    else if(!sideModSelected.status && item.RequiredSides.length > 0)
    {
        setSideModSelected(prevState =>{return {...prevState, status: false, error:"Please choose a selection!"}})

    }
    else{

        const sendItem = {
            item: item.detail,
            mods: selectedMods,
            itemTotal: itemTotal
        };
    
        const { Cart, lunch } = store.getState();
        
        store.dispatch(addToCart(sendItem, Cart));

        if(lunch.includes(item.detail.ID) )
        {
            store.dispatch(addToLunch())
        }
        router.push("/routes/pickup")
    }

  };

  return (
    <div className="p-2 px-3 col col-sm-6 col-lg-4 m-auto justify-content-center">
      <div>
        <div className="mb-2">
            <div className="row d-flex ">
                <i onClick={ () => router.back()}
                className={` far fa-arrow-circle-left pr-4`}
                ></i>
                <MenuItemName name={Name} style={"titleStyle"} className=""/>
            </div>
          <MenuItemDes des={Description} />
          <MenuItemPrice price={Price} />
        </div>
        <div>
          <form>

          {item.RequiredSides <= 0 ? null : (
                <div className="mb-0 border-top">
                    <p className="mt-2" style={{fontWeight : 400}}>Choose a Side</p>
                    {sideModSelected.status? null:<p className="m-0 p-0 text-danger">{sideModSelected.error}</p>}
                    <RequiredMods
                        mods={item.RequiredSides}
                        type="sideMod"
                        onchange={handleModChange}
                    />
                </div>
            )}


            {item.RequiredMods <= 0 ? null : (
                <div className="mb-0 border-top">
                    <p className="mt-2" style={{fontWeight : 400}}>Required Selection</p>
                    {reqModSelected.status? null:<p className="m-0 p-0 text-danger">{reqModSelected.error}</p>}
                    <RequiredMods
                        mods={item.RequiredMods}
                        type="reqMod"
                        onchange={handleModChange}
                    />
                </div>
                
            )}


            {item.OptionalMods <= 0 ? null : (
                <div className="mb-0 border-top mt-2 pt-2">

                <p style={{fontWeight : 400}}>Optional Modifications</p>
              <OptionalMods
                mods={item.OptionalMods}
                type="optMod"
                onchange={handleModChange}
              />
                </div>

            )}

            <div className=" px-3 row justify-content-center">
              <button
                className="btn btn-dark col col-md-6"
                type="submit"
                onClick={handleAddToCart}
              >
                Add to Cart $ {itemTotal.toFixed(2)}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/details/${id}`);
  const item = await res.json();
  // server side rendering
  return {
    props: { item }, // will be passed to the page component as props
  };
}

export default itemDetail;
