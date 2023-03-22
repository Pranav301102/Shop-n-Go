import React, { useRef, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const userData = {
  name: "",
  email: "",
  address: "",
  password: "",
  Confirmpassword: "",
};

const signin = {
  emailID: "",
  passwordID: "",
};

function Overlay() {
  const [formData, setForm] = useState(userData);
  const [signinData, setSignin] = useState(signin);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [panImg, setpanImg] = useState();
  const [sign, setSign] = useState(false);

  const handlerForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };



  const handleSignin = (e) => {
    const { name, value } = e.target;
    setSignin((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const  SignIN = (e) => {
    e.preventDefault();
    console.log(signinData);
    console.log("sign in");
    const name = signinData.emailID;
    const password = signinData.passwordID;
    console.log({ name, password });
    if (name && password) {
    	// axios sign in
    	axios
    		.post(`http://127.0.0.1:8085/api/auth/login`, {
    			name,
    			password,
    		})
    		.then((res) => {
    			console.log(res.data);
    			if (res.status === 200) {
            setUser(res.data);
    				navigate("/admin",{state: res.data});
    			} else {
    				alert("Invalid Credentials");
    			}
    		});
    }
  };

  return (
    <Main>
      <Container>
        <Left>
          <BgImg>
            <img src="/bg-banner.webp" alt="stock" />
          </BgImg>
        </Left>
        <Right>
        <h2>Sign In</h2>
          <Form>
            <form>
                <>
                  <div>
                    <label htmlFor="emailID">Enter Email</label>
                    <input
                      type="text"
                      name="emailID"
                      id="emailID"
                      placeholder="Enter email..."
                      value={signinData.emailID}
                      onChange={handleSignin}
                    />
                  </div>

                  <div>
                    <label htmlFor="passwordID">Enter Password</label>
                    <input
                      type="password"
                      name="passwordID"
                      id="passwordID"
                      placeholder="Enter password..."
                      value={signinData.passwordID}
                      onChange={handleSignin}
                    />
                  </div>
                  <button type="submit" onClick={SignIN}>
                    SUBMIT
                  </button>
                </>
             
            </form>
            <p>
              
                <p>
                  Don't have an account?
                  <Btn onClick={() =>navigate('/signup')}> Sign Up </Btn>{" "}
                </p>
              
              
            </p>
          </Form>
        </Right>
      </Container>
    </Main>
  );
}

const SignIn = () => {
  return <Overlay />;
};

const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  color: black;
  @media only screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

const Container = styled.div`
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  backdrop-filter: blur(10px);
  display: flex;
  width: 100%;
  max-width: 1128px;
  height: 600px;
  margin: 0 auto;
  margin-top: 80px;
`;

const Left = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  padding: 20px;
  h1 {
    text-align: center;
    font-size: 40px;
  }
`;

const Right = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  padding: 20px;
  h2 {
    text-align: center;
  }
`;

const Form = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  margin-top: 20px;
  p {
    text-align: center;
    margin: 10px 0;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 10px;
    button {
      padding: 15px 0;
      color: black;
      border: none;
      outline: none;
      border-radius: 5px;
      background: rgb(25, 118, 210);
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease-in;
      background: rgb(25, 118, 210);
      &:hover {
        background-color: #045eb8;
      }
    }
  }
  div {
    /* padding: 5px 0; */
    margin-bottom: 2px;
    position: relative;
  }
  input {
    padding: 12px;
    outline: none;
    border: none;
    border-radius: 3px;
    width: 100%;
    background: transparent;
    border: 1px solid black;
    border-radius: 5px;
    color: black;
    &::placeholder {
      color: black;
      background-color: transparent;
    }
  }
  label {
    color: rgba(0, 0, 0, 0.5);
    color: #fffbf5;
    font-size: 13px;
    margin-bottom: 3px;
  }
`;

const BgImg = styled.div`
  width: 450px;
  height: 450px;
  margin: 0 auto;
  margin-top: 20px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: inline-block;
  }
`;

const Btn = styled.button`
  cursor: pointer;
  background-color: #fff;
  border: none;
  outline: none;
  padding: 0 3px;
  text-decoration: underline;
  background-color: transparent;
  color: blue;
  font-size: 15px;
`;

export default SignIn;
