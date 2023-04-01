import React from "react";
import styled from "styled-components";
import "../index.css";
const Background = () => {
  return (
    <BackgroundContainer>
      <svg
        id="sw-js-blob-svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <defs>
          {" "}
          <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
            {" "}
            <stop id="stop1" stop-color="skyblue" offset="0%"></stop>{" "}
            <stop id="stop2" stop-color="skyblue" offset="100%"></stop>{" "}
          </linearGradient>{" "}
        </defs>{" "}
        <path
          fill="url(#sw-gradient)"
          d="M19.3,-30.4C24.5,-30.3,28,-24.2,31.1,-18.2C34.2,-12.1,37,-6.1,36.9,-0.1C36.8,5.9,33.8,11.9,29.6,16.1C25.4,20.3,20,22.7,14.8,24.9C9.7,27,4.8,28.9,-1.5,31.6C-7.9,34.2,-15.8,37.6,-17.4,33.4C-19,29.2,-14.3,17.4,-14.6,10.5C-14.9,3.7,-20.3,1.8,-25.8,-3.2C-31.3,-8.2,-37,-16.4,-34.4,-19.3C-31.8,-22.2,-20.9,-19.7,-13.7,-18.7C-6.6,-17.7,-3.3,-18.2,1.8,-21.4C7,-24.6,14,-30.5,19.3,-30.4Z"
          width="100%"
          height="100%"
          transform="translate(50 50)"
          stroke-width="0"
          style={{ transition: "all 0.3s ease 0s;" }}
        ></path>{" "}
      </svg>
    </BackgroundContainer>
  );
};

export default Background;

const BackgroundContainer = styled.article`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  z-index: -1000;
  overflow: hidden;
  & svg {
    transform: translateX(-25vh) translateY(-30vh) scale(1.5);
    z-index: -1000;
  }
`;
