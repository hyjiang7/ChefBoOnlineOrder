import PropTypes from "prop-types";
import MenuItemName from "./MenuItemName";
import MenuItemDes from "./MenuItemDes";
import MenuItemPrice from "./MenuItemPrice";
import Link from "next/link";


const MenuItem = ({ item, type }) => {


    const {ID, Name, Description, Price, Spicy} = item;

    const uri = type === "menu" ? "#" : `items/${ID}`

  return (
    <>
      <Link href={uri}><div style={{ padding: '2em'}} className="col-12 col-md-5 col-lg-3 border m-1">

        <MenuItemName name={Name} spicy={Spicy}/>
        <MenuItemDes des={Description} />
        <MenuItemPrice price={Price} />
      </div>
      </Link>


    </>
  );
};


MenuItem.propTypes = {
  style: PropTypes.string,
};

export default MenuItem;
