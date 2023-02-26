import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  const navigate = useNavigate();
  const handleStartButtonClick = () => {
    navigate("/scan");
  };
  return (
    <HomeContainer>
      <section className="desc">
        <h1>Shop & Go</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          neque enim culpa non, voluptatem reprehenderit, officia minus iste in
          tenetur vitae consectetur nemo ipsam nihil dicta, cupiditate quae
          sequi? Corporis.
        </p>
        <button onClick={handleStartButtonClick}>Start</button>
      </section>
      <section className="banner">
        <div></div>
      </section>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.main`
  position: relative;
  overflow-y: none;
  width: 100%;
  display: grid;
  place-items: center;
  grid-template-columns: 0.8fr 1fr;
  padding: 0 10rem;
  overflow: hidden;
  & .desc {
    padding: 0 40% 0 0;
    display: flex;
    flex-direction: column;
    text-align: justify;
    & h1 {
      font-size: 3rem;
      margin: 0;
    }
    & button {
      padding: 1rem;
      border-radius: 2rem;
      border: none;
      outline: none;
      background: rgba(47, 114, 184, 0.8);
      color: whitesmoke;
      font-size: large;
      font-weight: bold;
      transition: transform 0.45s, background 0.45s;
      &:hover {
        transform: scale(1.02);
        background: rgb(47, 114, 184);
      }
      cursor: pointer;
    }
  }
  & .banner {
    position: relative;
    width: 100%;
    height: 92vh;
    overflow-y: hidden;
    background: url("/bg-banner.webp");
    border-radius: 100% 0% 100% 0% / 100% 100% 0% 0%;
    background-color: var(--bg-blue);
    background-repeat: no-repeat;
    background-size: 80%;
    background-position: center;
    & div {
      position: absolute;
      bottom: 0%;
      left: 10%;
      z-index: -1000;
      pointer-events: none;
      border-radius: 100% 0% 100% 0% / 100% 0% 100% 0%;
      height: 10vh;
      width: 10vh;
      background-color: white;
    }
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0;
    & .desc {
      padding: 0;
      width: 80%;
      height: 50vh;
      display: flex;
      justify-content: center;
    }
    & .banner {
      transform: translateY(-20vh);
      z-index: -1000;
    }
  }
`;
