import { useState, useEffect, useRoute, useRef } from 'react'
import MenuItem from './MenuItem'
import {
    Card,
  } from "react-bootstrap";
  import Accordion from 'react-bootstrap/Accordion'
  import store from '../state/GlobalState';
import { setLunch } from '../state/Actions';


  //all the items in one category
const MenuItemCate = ({cate, menuItem, id, type, myRef, onScrollChange}) => {
    
    const items = menuItem[0]
    var lunch = (cate == "Lunch Specials") ? true : false

    // const [newScroll, setScroll] = useState(0)
    //     const executeScroll = () =>{
    //         console.log(myRef)
    //         const offsetTop = myRef.current.offsetTop
    //         setScroll(offsetTop)
    //         window.scrollTo({ behavior: 'smooth', top: myRef.current.offsetTop })

    //         // onScrollChange(offsetTop);
    //     }

    // useEffect(()=>{
    //     console.log(newScroll)
    //     // myRef.current.scrollTop = newScroll;

    // }, [newScroll])

    if(lunch)
    {
        var lunchIds = [];
        items.map((item, index) =>{
            lunchIds.push(item.ID)
        })

        store.dispatch(setLunch(lunchIds))
    }

    return  (
        <div>  
            <Card ref={myRef}>
                <Accordion.Toggle as={Card.Header}  eventKey={id}  style={{fontWeight:500}} >
                {cate}
                {lunch? " (11:00am - 3:00pm only)" : null}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={id} >
                <Card.Body className="w-80 m-auto" id={id} >
                    <div className="d-flex flex-wrap justify-content-center" >
                    {
                        items.map((item, index) =>
                        (
                            <MenuItem key={index} item={item} type={type}/>
                        ))
                    }
                    </div>

                </Card.Body>
                </Accordion.Collapse>

            </Card>
        </div>
    )
    
}


export default MenuItemCate
