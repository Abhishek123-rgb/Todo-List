const TaskItem = ({ task, onSelect, onToggleDone }) => {
  return (
    <div
      className="list-row"
      style={{
        textDecoration: task.done ? "line-through" : "none",
        color: task.done ? "#999" : "#111",
      }}
      onClick={onSelect}
    >
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          e.stopPropagation();
          onToggleDone();
        }}
        style={{ marginRight: 8 }}
      />
      <span style={{ flex: 1 }}>{task.title}</span>
      <span style={{ color: "#aaa" }}>›</span>
    </div>
  );
}

export default TaskItem;
