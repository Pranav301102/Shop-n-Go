import React from 'react'
import SingleProd from './SingleProd'
import './cart.css'
import { useLocation ,useNavigate} from 'react-router-dom'
function AllProd() {
  const {state} = useLocation()
  const navigate = useNavigate()
  console.log(state);
  var price = 0;
  var item = [];
  for (item in state){
    price = price + item.price;
  }

  if(state == null){
    return(
      <div>
        <h1>Cart is Empty</h1>
      </div>
    )
  }
  else{
  return (
    <>
      <h1 className='title' >My Cart</h1>

      <div className='grid' >

        {/* Example ke liye hardcode kiya hai */}

        {/* <SingleProd Name={"Item1"} Price="500" Img={''} />
        <SingleProd Name={"Item1"} Price="500" Img={''} />
        <SingleProd Name={"Item1"} Price="500" Img={''} />
        <SingleProd Name={"Item1"} Price="500" Img={''} /> */}

        {
          state.map((item) => {
            return (
              <SingleProd Name={item.name} Price={item.price} Img={''} Quantity={item.quantity} />
            )
          })
        }
        <h1>Total Price: {price}</h1>
        <button className='btn' onClick={()=>{navigate("/payment" ,{ state: price })}}>Buy Now</button>
      </div>
    </>
  )
}
}

export default AllProd