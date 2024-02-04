import { React, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { detailTodo, editTodo } from "../api/todos";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useInput from "../hooks/useInput";

function DetailTodo() {
  const navigate = useNavigate();
  // post id값 가져오기
  const { id } = useParams();

  //투두 수정 상태관리
  const [update, setUpdate] = useState(false);
  const [updateTitle, onUpdateTitle] = useInput();
  const [updateContent, onUpdateContent] = useInput();

  //투두 수정 쿼리
  const queryClient = useQueryClient();
  const mutation = useMutation(editTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todo");
    },
    onError: () => {
      return <h2>할 일을 가져오지 못했습니다😥</h2>;
    },
  });

  //투두 수정 버튼
  const buttonUpdate = () => {
    setUpdate(!update);
    onUpdateTitle({ target: { value: data.title } });
    onUpdateContent({ target: { value: data.content } });

    const newUpdateTodo = {
      ...data,
      title: updateTitle,
      content: updateContent,
    };
    mutation.mutate(newUpdateTodo);
  };

  // 할 일 조회
  const { isLoading, isError, data } = useQuery("todo", () => detailTodo(id));

  if (isLoading) {
    return <h2>로딩중</h2>;
  }

  if (isError) {
    return <div>할 일 목록을 가져오지 못했습니다😥</div>;
  }

  const moveList = () => {
    navigate("/list");
  };

  return (
    <div>
      <h2>디테일페이지</h2>
      {/* 수정 안할 때 */}
      {update || (
        <>
          {/* 데이터가 없을 경우는 오류나기 때문에 데이터가 있을때만 나오게 */}
          {data && (
            <div>
              <p>제목: {data.title}</p>
              <p>작성자: {data.name}</p>
              <p>내용: {data.content}</p>
            </div>
          )}
        </>
      )}
      {/* 수정 할 때 */}
      {update && (
        <>
          <div>
            <input value={updateTitle} onChange={onUpdateTitle}></input>
            <p>작성자 : {data.name}</p>
            <input value={updateContent} onChange={onUpdateContent}></input>
          </div>
        </>
      )}
      <div>
        <button onClick={buttonUpdate}>
          {update ? "완료하기" : "수정하기"}
        </button>
        <button onClick={moveList}>목록</button>
      </div>
    </div>
  );
}

export default DetailTodo;
