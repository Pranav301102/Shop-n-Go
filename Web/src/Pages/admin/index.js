import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import  axios  from 'axios';  
import AllProd from './../Cart/AllProd';
import { useNavigate } from "react-router-dom";


const  Admin = () => {
  const { state } = useLocation();
  const [data, changeData] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    axios.get(`http://127.0.0.1:8085/api/productManagement/fetch_all_products`)
     .then(res => {
    changeData(res.data);
  })
  },[]);
  if (state == null){
    timer();
    return(<div><p><CenterID>Login First, redirecting in :  <div id="countdown" > </div></CenterID></p></div>);
  }

  function timer(){
    var timeleft = 2;
    window.setInterval(function(){
      if(timeleft == 0){
        window.location.href = "http://localhost:3000/signin";
      } else {
        document.getElementById("countdown").innerHTML =timeleft+1 ;
      }
      timeleft -=1;
  }, 1000);
  }
  console.log(data)
  

  //ADMIN PROFILE

  return (
    <>
      <ProfileContainer>
        <section className="profile-img">
          <img src="/bg-pattern.png" alt="profile" />
        </section>
        <section className="profile-desc">
          <h2>Admin</h2>
          <div>
            <h3>Admin details</h3>
            <div>
              <p>Email</p>
              <p></p>
            </div>
            <div>
              <p>Contact</p>
              <p>Lorem, ipsum dolor.</p>
            </div>
          </div>
        </section>
      </ProfileContainer>
      <h1>Inventory</h1>
      <Grid>
        {
          data === [] ? <h1>loading</h1> : 
           data.map((item) => {
            return (
              <Product
                ID= {item.Prod_ID}
                Name={item.Prod_Name}
                Quantity={item.Prod_Qty}
                Price={item.Prod_Price}
                Img={item.Prod_Image}
                Token={state.accessToken}
              />
            );
          })
        }
      </Grid>
      <Grid>
        <div>
          <h1>New Product</h1>
          <NewProd Token={state.accessToken}/>
        </div>
      </Grid>
    </>
  );
};

export default Admin;

function NewProd({Token}){
  const [name, setName] = React.useState("");
  const [quantity, setQuantity] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [img, setImg] = React.useState("");

  async function refreshPage() {
    window.location.reload();
}

//CREATE NEW PRODUCT

  async function createProd() {
    const res = await axios.post(`http://127.0.0.1:8085/api/productManagement/create_new_product`,
    {Prod_Name: name, Prod_Qty: quantity, Prod_Price: price, Prod_Image: img},
    {
      headers: { authorization : `Bearer ${Token}` },
    });
    console.log(res);
  }
    return(
    <>
    <div>
      <h4>Name</h4>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <h4>Quantity</h4>
      <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      <h4>Price</h4>
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      <h4>Image</h4>
      <input type="text" value={img} onChange={(e) => setImg(e.target.value)} />
      <button onClick={createProd}>Add</button>
      <button onClick={refreshPage}>Refresh</button>
    </div>
    </>
  )
}

//UPDATE PRODUCTS

function Product({ Name, Quantity, Price, Img ,ID,Token}) {
  const [newPrice, setNewPrice] = React.useState(Price);
  const [newQuantity, setNewQuantity] = React.useState(Quantity);
  const [newImg, setNewImg] = React.useState(Img);
  
  function incQ() {
    setNewQuantity(newQuantity + 1);
  }
  function decQ() {
    setNewQuantity(newQuantity - 1);
  }
  function incP() {
    setNewPrice(newPrice + 1);
  }
  function decP() {
    setNewPrice(newPrice - 1);
  }

  async function UpdateData() {
    const res = await axios.post(`http://127.0.0.1:8085/api/productManagement/updateProduct`,
    {Prod_ID: ID,  Prod_Qty: newQuantity, Prod_Price: newPrice},
    {
      headers: { authorization : `Bearer ${Token}` },
    }
    )
    console.log(res);
  }

  async function DeleteData() {
    const res = await axios.post(`http:////127.0.0.1:8085/api/productManagement/deleteProduct`,
    {Prod_ID: ID},
    {
      headers: { authorization : `Bearer ${Token}` },
    })
    console.log(res);
  }
  console.log(Img)

  return (
    <>
      <Prod>
        <div>
          <img src={Img} alt="Product Image" />
        </div>
        <h3>{Name}a</h3>
        <h4>ID={ID}</h4>
        <div className="_p-qty">
          <p>Quantity: </p>
          <div
            className="value-button decrease_"
            id=""
            value="Decrease Value"
            onClick={decQ}
          >
            -
          </div>
          {newQuantity}
          <div
            className="value-button increase_"
            id=""
            value="Increase Value "
            onClick={incQ}
          >
            +
          </div>
        </div>
        <div className="_p-qty">
          <p>Price: </p>
          <div
            className="value-button decrease_"
            id=""
            value="Decrease Value"
            onClick={decP}
          >
            -
          </div>
          {newPrice}
          <div
            className="value-button increase_"
            id=""
            value="Increase Value "
            onClick={incP}
          >
            +
          </div>
        </div>
     
        <Update onClick={UpdateData}>Update</Update>
        <Update onClick={DeleteData}>Delete</Update>
      </Prod>
    </>
  );
}

const Prod = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1px 2px 0px;
  border-radius: 15px;
  padding: 20px;
  align-items: center;
`;
const ImgDiv = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 15px;
`;
const Update = styled.button`
  border-radius: 15px;
  height: 30px;
  background-color: #4caf50;
  width: 100px;
`;

const Grid = styled.div`
  margin-top: 70px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 40px;
  margin-left: 50px;
  padding-bottom: 10px;
`;

const ProfileContainer = styled.main`
  width: 100%;
  max-width: 1128px;
  display: flex;
  justify-content: center;
  align-items: center;
  & .profile-img {
    width: 45%;
    display: flex;
    flex-grow: 1;
    & > img {
      width: 100%;
      border-radius: 50%;
      object-fit: contain;
    }
  }
  & .profile-desc {
    width: 50%;
    flex-grow: 1;
    & > div {
      & > div {
        gap: 1rem;
        display: grid;
        grid-template-columns: 0.1fr 1fr;
      }
    }
  }
`;
 
const CenterID = styled.div`
  width: 100%;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 3vw;
  padding-top : 25vh;
  color : #3A3B3C;
`;

const Btn = styled.div`
  cursor: pointer;
  background-color: #fff;
  border: none;
  outline: none;
  padding: 0 3px;
  text-decoration: underline;
  background-color: transparent;
  color: blue;
  font-size: 3vh;
  width: 100%;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top : 2vh;
`;
 
