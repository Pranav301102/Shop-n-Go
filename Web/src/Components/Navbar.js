import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineMenu } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScanPage, setIsScanPage] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/scan") {
      setIsScanPage(true);
    } else {
      setIsScanPage(false);
    }
  }, [isScanPage, location.pathname]);
  return (
    <NavContainer
      style={{ justifyContent: isScanPage ? "center" : "space-between" }}
    >
      <section className="logo">
        <Link className="home-link" to={"/"}>
          <h2>Shop & Go</h2>
        </Link>
      </section>
      {isScanPage ? null : (
        <section className="menu">
          <AiOutlineMenu />
        </section>
      )}
    </NavContainer>
  );
};

export default Navbar;

const NavContainer = styled.nav`
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 4rem;
  & .menu {
    font-size: 2rem;
  }
  .home-link {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
`;
