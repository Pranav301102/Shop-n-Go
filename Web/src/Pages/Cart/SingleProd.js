import * as React from 'react';
import './cart.css'


export default function SingleProd({Name,Quantity ,Price, Img}) {
  
  return (
    <>
      <div className='prod' >
        <div className='img' >
          <img src={Img}  alt='prod img'/>
        </div>
        <div className='price' >
          <p>Name : {Name}</p>
          <p>Quantity: {Quantity}</p>
          <p>Price: {Price}</p>
        </div>
        
      </div>
    </>
  )
}


