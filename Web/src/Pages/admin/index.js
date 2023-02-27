import React from "react";
import styled from "styled-components";

const Admin = () => {
  return (
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
            <p>Lorem, ipsum dolor.</p>
          </div>
          <div>
            <p>Contact</p>
            <p>Lorem, ipsum dolor.</p>
          </div>
        </div>
      </section>
    </ProfileContainer>
  );
};

export default Admin;

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
