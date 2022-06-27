import React from 'react'

const MenuItemName = ({name, spicy, style}) => {

    style == "inlineStyle" ? style = inlineStyle : style = titleStyle
    return (
        <>
             {spicy? <p style={style} >{name}
             <img src="/chili_pepper.png" alt="Spicy" width="25" height="25"/>
             </p>
             : 
             <p style={style}>{name}</p>}
        </>
    )
}

const titleStyle = {
    fontWeight : "bold",

}

const inlineStyle = {
    fontWeight : 300,
    paddingBottom: 0,
    marginBottom: 0,
}

export default MenuItemName
