import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TodoBoard from './components/TodoBoard';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import api from './utils/api';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoVal, setTodoVal] = useState('');
  function onInputValChange(e) {
    setTodoVal(e.target.value);
  }
  async function addTodo() {
    const body = { task: todoVal, isComplete: false };
    const { data } = await api.post('/tasks', body);
    if (data.status === 'ok') {
      window.alert('할일이 추가되었습니다.');
      setTodoVal('');
      fetchTasks();
    } else {
      throw new Error('할일이 추가될 수 없습니다.');
    }
  }
  async function fetchTasks() {
    const {
      data: { data },
    } = await api.get('/tasks');

    setTodoList(data);
  }
  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <Container>
      <Row className='add-item-row'>
        <Col xs={12} sm={10}>
          <input
            type='text'
            placeholder='할일을 입력하세요'
            className='input-box'
            value={todoVal}
            onChange={onInputValChange}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button onClick={addTodo} className='button-add'>
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard todoList={todoList} fetchTasks={fetchTasks} />
    </Container>
  );
}

export default App;
