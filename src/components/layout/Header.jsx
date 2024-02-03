import React from "react";
import { StyleDiv } from "../../styles/style.header";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const Home = () => {
    navigate("/");
  };
  return (
    <StyleDiv>
      <button onClick={Home}>Home</button>
    </StyleDiv>
  );
};

export default Header;
