import React from "react";
import { useQuery } from "react-query";
import { detailTodo } from "../api/todos";
import { useParams } from "react-router-dom";

function DetailTodo() {
  // post id값 가져오기
  const { id } = useParams();
  // 할 일 조회
  const { isLoading, isError, data } = useQuery("todo", () => detailTodo(id));

  if (isLoading) {
    return <h2>로딩중</h2>;
  }

  if (isError) {
    return <div>할 일 목록을 가져오지 못했습니다😥</div>;
  }

  return (
    <div>
      <h2>디테일페이지</h2>
      {data && (
        <div>
          <p>제목: {data.title}</p>
          <p>작성자: {data.name}</p>
          <p>내용: {data.content}</p>
        </div>
      )}
    </div>
  );
}

export default DetailTodo;
