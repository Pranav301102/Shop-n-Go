import React from "react";
import styled, { keyframes } from "styled-components";

const Loader = () => {
  return (
    <LoaderContainer>
      <Spinner /> <span>Loading...</span>
    </LoaderContainer>
  );
};

export default Loader;

const LoaderContainer = styled.section`
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  height: 100%;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  & .spinner {
    display: inline;
    width: 20%;
    height: 20%;
    color: blue;
    fill: white;
    & .spin {
      background-position: bottom;
    }
  }
  & span {
    margin-left: 1rem;
  }
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid whitesmoke;
  border-right: 2px solid whitesmoke;
  border-bottom: 2px solid whitesmoke;
  border-left: 4px solid blue;
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;
