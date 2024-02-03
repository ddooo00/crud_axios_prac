import React from "react";
import { useQuery } from "react-query";
import { getTodo } from "../api/todos";
import { useNavigate } from "react-router-dom";

function TodoList() {
  const navigate = useNavigate();

  //전체 할 일 목록 조회
  const { isLoading, isError, data } = useQuery("todos", getTodo);

  if (isLoading) {
    return <div>로딩중</div>;
  }
  if (isError) {
    return <div>할 일 목록을 가져오지 못했습니다😥</div>;
  }

  return (
    <div>
      <h1>내 투두 List</h1>
      {data.map((todo) => (
        <div key={todo.id}>
          <h2>제목 : {todo.title}</h2>
          <h2>작성자 : {todo.name}</h2>
        </div>
      ))}
      <button onClick={() => navigate("/list/add")}>할 일 추가하기</button>
    </div>
  );
}

export default TodoList;
