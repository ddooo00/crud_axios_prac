import React from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();

  const Write = () => {
    navigate("/list/add");
  };
  const List = () => {
    navigate("/list");
  };

  return (
    <div>
      무엇을 할까?
      <button onClick={Write}>할 일 기록하기</button>
      <button onClick={List}>할 일 목록보기</button>
    </div>
  );
}

export default Main;
