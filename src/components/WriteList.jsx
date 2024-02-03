import React from "react";
import useInput from "../hooks/useInput";
import { addTodo } from "../api/todos";
import { useQueryClient, useMutation } from "react-query";
import shortid from "shortid";
import { useNavigate } from "react-router-dom";

function WriteList() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
    onError: () => {
      return <h2>에러입니다</h2>;
    },
  });

  const [name, changeName] = useInput();
  const [title, changeTitle] = useInput();
  const [content, changeContent] = useInput();

  const buttonAddTodo = () => {
    if (!name || !title || !content) {
      return alert("내용을 다 입력해주세요!");
    }

    const newTodo = {
      id: shortid.generate(),
      name,
      title,
      content,
    };
    mutation.mutate(newTodo);
    navigate("/list");
  };

  return (
    <div>
      작성자
      <input
        placeholder="작성자의 이름을 입력해주세요."
        value={name}
        type="text"
        onChange={changeName}
      ></input>
      제목
      <input
        placeholder="제목을 입력해주세요."
        value={title}
        type="text"
        onChange={changeTitle}
      ></input>
      내용
      <input
        placeholder="내용을 입력해주세요."
        value={content}
        type="text"
        onChange={changeContent}
      ></input>
      <button onClick={buttonAddTodo}>추가하기</button>
      <button onClick={() => navigate("/list")}>리스트 보러가기</button>
    </div>
  );
}

export default WriteList;
