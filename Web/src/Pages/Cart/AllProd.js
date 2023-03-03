import React from 'react'
import SingleProd from './SingleProd'

function AllProd() {

  const [data, setData] = React.useState([])

  // axios.get('URL',).then((result) => {
  //   setData(result.data)
  // }).catch((err) => {
  //   console.log(err);
  // });

  return (
    <>
      <SingleProd Name={"Item1"} Price="500" Img={''}/>
    </>
  )
}

export default AllProd