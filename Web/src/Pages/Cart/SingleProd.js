import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

import './cart.css'

export default function SingleProd({Name, Price, Img}) {
  return (
    <>
      <div className='prod' >
        <div className='img' >
          <img src={Img}  alt='prod img'/>
        </div>
        <div className='price' >
          <h2>Name : {Name}</h2>
          <h2>Price: {Price}</h2>
        </div>
        <button className='btn' >Buy Now</button>
      </div>
    </>
  )
}