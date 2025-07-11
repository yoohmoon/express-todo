import TodoItem from './TodoItem';

const TodoBoard = ({ todoList, fetchTasks }) => {
  console.log('!', todoList);

  return (
    <div>
      <h2>Todo List</h2>
      {todoList.length > 0 ? (
        todoList.map((todo) => (
          <TodoItem key={todo._id} todo={todo} fetchTasks={fetchTasks} />
        ))
      ) : (
        <h2>There is no Item to show</h2>
      )}
    </div>
  );
};

export default TodoBoard;
