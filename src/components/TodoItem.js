import { Col, Row } from 'react-bootstrap';
import api from '../utils/api';

const TodoItem = ({ todo, fetchTasks }) => {
  async function deleteTodo(id) {
    console.log(id);

    await api.delete(`/tasks/${id}`);

    window.alert('할일이 삭제되었습니다.');
    fetchTasks();
  }
  async function updateTodo() {
    const body = { ...todo, isComplete: !todo.isComplete };

    await api.put(`/tasks/${todo._id}`, body);

    fetchTasks();
  }

  return (
    <Row>
      <Col xs={12}>
        <div className={todo.isComplete ? `todo-item completed` : `todo-item`}>
          <div className='todo-content'>{todo.task}</div>

          <div>
            <button
              onClick={() => deleteTodo(todo._id)}
              className='button-delete'
            >
              삭제
            </button>
            <button onClick={updateTodo} className='button-delete'>
              {todo.isComplete ? '안끝남' : '끝남'}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
