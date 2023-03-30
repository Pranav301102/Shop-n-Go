import styled from "styled-components";
import React from 'react'
import { useLocation ,useNavigate} from 'react-router-dom'
function PaymentSucessful() {
  
  return (
    <div><p><CenterID>Payment Failed<div id="countdown"></div></CenterID></p></div>
  )
}


const Pad = styled.div`
  padding-left:50px;
  padding-top:25px;
  font-weight: bold;
  font-size: 2vw;
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
`;

export default PaymentSucessful