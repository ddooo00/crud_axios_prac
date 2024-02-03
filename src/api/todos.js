import axios from "axios";

//할일 목록 가져오기
const getTodo = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todos`);
  return response.data;
};

//할일 추가하기
const addTodo = async (newTodo) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/todos`, newTodo);
};

//할일 삭제하기
const deleteTodo = async (postId) => {
  await axios.delete(`${process.env.REACT_APP_SERVER_URL}/todos/${postId}`);
};

//할일 수정하기
const editTodo = async (post) => {
  await axios.patch(
    `${process.env.REACT_APP_SERVER_URL}/todos/${post.id}}`,
    post
  );
};

//할 일 상세보기
const detailTodo = async (postId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/todos/${postId}`
  );
  return response.data;
};

// const detailTodo = async (postId) => {
//   try {
//     const response = await axios.get(
//       `${process.env.REACT_APP_SERVER_URL}/todos/${postId}`
//     );
//     // 성공적으로 데이터를 받아왔을 때 할 작업
//   } catch (error) {
//     // 요청이 실패했을 때 에러 처리
//     console.error("Error fetching todo details:", error);
//   }
// };

export { getTodo, addTodo, deleteTodo, editTodo, detailTodo };
