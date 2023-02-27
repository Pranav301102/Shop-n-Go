import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

import { MdFlashlightOn } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Scan = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  return (
    <ScanContainer>
      <header>
        <Link style={{ color: "inherit" }} to="/">
          <AiOutlineCloseCircle className="pop" />
        </Link>
        <MdFlashlightOn className="pop" />
      </header>
      <article>
        <div className="scanner"></div>
        {isMobile ? (
          <button>Upload from gallery</button>
        ) : (
          <input
            type="file"
            value={selectedFile}
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        )}
      </article>
    </ScanContainer>
  );
};

export default Scan;

const ScanContainer = styled.section`
  width: auto;
  height: auto;
  display: flex;
  padding: 0 4rem;
  flex-direction: column;
  & > header {
    font-size: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & .pop {
      transition: transform 0.45s;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  & article {
    width: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
    & .scanner {
      width: 40vh;
      height: 40vh;
      border: 3px solid whitesmoke;
      border-radius: 2rem;
    }
    & button {
      padding: 0.5rem 1rem;
      font-size: large;
      font-weight: bold;
      border-radius: 2rem;
      border: none;
      outline: none;
      transition: transform 0.45s;
      &:hover {
        transform: scale(1.01);
      }
    }
    & input {
      padding: 0;
      font-size: large;
      font-weight: bold;
      padding: 0 0.1rem;
      border: 2px solid transparent;
      border-radius: 3rem;
      transition: border 0.45s;
      &:hover {
        border: 2px solid whitesmoke;
      }
    }
  }
`;