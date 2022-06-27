import React from "react";

function CartItem({item, index, deleteHandle}) {


   const deleteItem = (e) =>
   {
       e.preventDefault();
        deleteHandle(index)
   }
  return (
    <div className="card border-bottom-0 border-right-0 border-left-0">
      <div className="card-body" style={{fontSize: '0.75em'}}>
        <div className="card-title">
            <div className="d-flex justify-content-between" >
                <div className="col-6" >{item.item.Name}</div>
                <div className="col-4">${item.item.Price}</div>
                {deleteHandle? <div className="col-1"><a onClick={deleteItem} href="#">  <i className="fas fa-trash-alt text-danger"></i></a></div> : null}
            </div>

          
        </div>
        <div className="card-text">
          {item.mods.map((m, i) => (
            <div className="d-flex justify-content-between" key={i}>
                <div className="col-6">{m.Name}</div>
                {m.Price > 0? <div className="col-4">${m.Price}</div>: null}
                {deleteHandle? <div className="col-1"></div> : null}
            </div>
          ))}
        </div>

       
      </div>
    </div>
  );
}

export default CartItem;

