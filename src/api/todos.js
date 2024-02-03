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

export { getTodo, addTodo };
