import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onAddNew, onSelect, onToggleDone }) => {
  return (
    <div className="list">
      <div className="list-row" onClick={onAddNew}>
        <span className="plus">＋</span>
        <span>Add a new task</span>
      </div>

      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onSelect={() => onSelect(task)}
          onToggleDone={() => onToggleDone(task.id)}
        />
      ))}
    </div>
  );
}

export default TaskList;
