import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getTodo, deleteTodo } from "../api/todos";
import { useNavigate } from "react-router-dom";

function TodoList() {
  const navigate = useNavigate();

  //할 일 삭제
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
    onError: () => {
      return <h2>에러입니다</h2>;
    },
  });

  //할 일 조회
  const { isLoading, isError, data } = useQuery("todos", getTodo);

  if (isLoading) {
    return <div>로딩중</div>;
  }
  if (isError) {
    return <div>할 일 목록을 가져오지 못했습니다😥</div>;
  }

  const buttonDelete = (postId) => {
    if (window.confirm("삭제할까요?")) {
      mutation.mutate(postId);
    } else {
      return false;
    }
  };

  const buttonDetail = (postId) => {
    navigate(`/detail/${postId}`);
  };

  return (
    <div>
      {data.map((todo) => (
        <div
          style={{ border: "1px solid black", margin: "10px" }}
          key={todo.id}
        >
          <h2>작성자 : {todo.name}</h2>
          <h3>제목 : {todo.title}</h3>
          <button onClick={() => buttonDelete(todo.id)}>삭제</button>
          <button onClick={() => buttonDetail(todo.id)}>상세보기</button>
        </div>
      ))}
      <button onClick={() => navigate("/list/add")}>할 일 추가하기</button>
    </div>
  );
}

export default TodoList;
