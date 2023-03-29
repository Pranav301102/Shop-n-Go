import React, { useState ,useEffect} from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import  axios  from 'axios';
import QRCode from "react-qr-code";


// QRCode.toCanvas(canvas, 'sample text', function (error) {
//   if (error) console.error(error)
//   console.log('success!');
// })

const Payment = () => {
  const {state} = useLocation();
  const [paymentData,setPaymentData] = useState(0)
  const [dataUPI,setUPI] = useState("")
  const data = state.state[0].price;
  console.log("here",state.state.length);

  useEffect(()=>{
    // if (state){
    //  for(let i=0;i<state.state.length;i++){
    //     setPaymentData(paymentData + state.state[i].price)
    //  }}
    if(state){
      setPaymentData(state.price)
    }

  },[state])

  useEffect(()=>{
    setUPI(`upi://pay?pa=sdhanawade558@okicici&pn=SwayamDhanawade&am=${paymentData.toFixed(2)}&cu=INR&aid=uGICAgMDgqPSDDA`)

  },[paymentData])
  // generateQR();
  // function generateQR() {
  //   QRCode.toString('I am a pony!',{type:'terminal'}, function (err, url) {
  //     console.log(url)
  //   })
  // }

  function updateData(){
    var i = 0;
    for(i in data){
      updateQuantity(data[i].id,data[i].quantity);
    }
  }

  function updateQuantity(id, quantity) {
    axios.post(`http://127.0.0.1:8085/api/productManagement/update_product_sold`,
    {
      "Prod_ID": id,
      "Prod_Sold": quantity
      },
    )
    .then((res) => {
      console.log(res);
    })
  }
  
  const existingCards = [
    {
      type: "paypal",
      cardNo: "666622221111",
      postal: "700000",
      expiry: "08/2030",
      cvv: "",
    },
    {
      type: "credit",
      cardNo: "666622221111",
      postal: "700000",
      expiry: "08/2030",
      cvv: "",
    },
    {
      type: "debit",
      cardNo: "666622221111",
      postal: "700000",
      expiry: "08/2030",
      cvv: "",
    },
  ];

  const [cardName, setCardName] = useState(null);
  const [cardNumber, setCardNumber] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const [cvvNumber, setCvvNumber] = useState(null);

  function handleCardChange() {}

  return (
    <PaymentContainer>
      <img src="/bg-pattern.png" alt="background-pattern" />
      <article>
        <header>
          <h3>Payment Details</h3>
        </header>
        <section>
          <div className="card-selector">
            <div>
              <input type="radio" name="card" value={"newCard"} id="card" />
              <label htmlFor="card">new card</label>
            </div>
            {existingCards.map((card) => {
              const { type, cardNo, postal, expiry, cvv } = card;
              return (
                <div>
                  <input type="radio" name="card" value={type} id={type} />
                  <label htmlFor={type}>{type}</label>
                </div>
              );
            })}
          </div>
          <form>
            {/* <div>
              <div>
                <label for="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={cardNumber}
                  required
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <div>
                <label for="postalCode">Postal Code</label>
                <input
                  type="text"
                  id="postalCode"
                  value={postalCode}
                  name="postalCode"
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div>
                <label for="expirationDate">Expiration Date</label>
                <input
                  type="text"
                  value={expirationDate}
                  id="expirationDate"
                  name="expirationDate"
                  required
                  onChange={(e) => setExpirationDate(e.target.value)}
                />
              </div>
              <div>
                <label for="cvv">CVV</label>
                <input
                  type="text"
                  value={cvvNumber}
                  id="cvv"
                  name="cvv"
                  required
                  onChange={(e) => setCvvNumber(e.target.value)}
                />
              </div>
            </div> */}

            <input type="submit" value="Submit" />
          </form>
        </section>
        <section>
          <div>
            <p>Subtotal</p>
            <p>{paymentData}</p>
          </div>
          <button onClick={updateData}>Pay and Checkout</button>
        </section>
      </article>
      <div style={{ background: 'white', padding: '16px' }}>
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={dataUPI}
        viewBox={`0 0 256 256`}
    />
      </div>
    </PaymentContainer>
  );
};

export default Payment;

const qrdiv = styled.section`
  width:160px;
  height:160px;
  margin-top:15px;
`

const PaymentContainer = styled.section`
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 4rem;
  & img {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.1;
    width: 60vw;
    height: 100vh;
    object-fit: cover;
    z-index: -1000;
  }
  & > article {
    z-index: 1000;
    height: auto;
    padding: 2rem;
    width: 50%;
    display: flex;
    flex-direction: column;
    background-color: #000000aa;
    border-radius: 3rem;
    color: whitesmoke;
    & > section {
      & .card-selector {
        display: flex;
        gap: 1rem;
      }
      & form {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 2rem 0;
        flex-direction: column;
        gap: 1rem;
        & > div {
          display: grid;
          width: 100%;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          & > div {
            display: grid;
            width: 100%;
            grid-template-columns: 0.5fr 1fr;
            & input {
              padding: 0.4rem 0.6rem;
              border-radius: 2rem;
              border: none;
              outline: none;
            }
          }
        }
        & > input {
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          border: none;
          outline: none;
          font-size: large;
          font-weight: bold;
        }
      }
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      & > div {
        border-top: 2px solid whitesmoke;
        padding: 2rem 0 0 0;
        width: 100%;
        display: flex;
        justify-content: space-evenly;
      }
      & button {
        padding: 0.5rem 1rem;
        border-radius: 2rem;
        border: none;
        outline: none;
        font-size: large;
        font-weight: bold;
      }
    }
  }
`;
