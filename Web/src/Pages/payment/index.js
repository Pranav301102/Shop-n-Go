import React, { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
const Payment = () => {
  const {state} = useLocation();
  console.log("payment",state);
  
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
            <div>
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
            </div>

            <input type="submit" value="Submit" />
          </form>
        </section>
        <section>
          <div>
            <p>Subtotal</p>
            <p>{state.price}</p>
          </div>
          <button>Pay and Checkout</button>
        </section>
      </article>
    </PaymentContainer>
  );
};

export default Payment;

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
