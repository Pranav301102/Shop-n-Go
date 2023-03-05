import * as React from 'react';
import './cart.css'

export default function SingleProd({Name, Price, Img}) {
  return (
    <>
      <div className='prod' >
        <div className='img' >
          <img src={Img}  alt='prod img'/>
        </div>
        <div className='price' >
          <p>Name : {Name}</p>
          <p>Price: {Price}</p>
        </div>
        <button className='btn' >Buy Now</button>
      </div>
    </>
  )
}


