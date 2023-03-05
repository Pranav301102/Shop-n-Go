import React from 'react'
import SingleProd from './SingleProd'
import './cart.css'
function AllProd() {

  const [data, setData] = React.useState([])

  // axios.get('URL',).then((result) => {
  //   setData(result.data)
  // }).catch((err) => {
  //   console.log(err);
  // });

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
          data.map((item) => {
            return (
              <SingleProd Name={item.Name} Price={item.Price} Img={item.Img} />
            )
          })
        }
      </div>
    </>
  )
}

export default AllProd