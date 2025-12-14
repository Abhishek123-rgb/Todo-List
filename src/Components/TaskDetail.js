import { useState, useEffect } from "react";

const TaskDetail = ({ task, error, onSave, onDelete }) => {
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description || "" : "");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [task]);

  const isNew = !task;

  const handleSaveClick = () => {
    function clearInputs() {
      setTitle("");
      setDescription("");
    }

    onSave(title, description, task ? task.id : null, isNew ? clearInputs : null);
  }

  const handleDeleteClick = () => {
    if (task) onDelete(task.id);
  }

  return (
    <div className="detail-inner">
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontWeight: 600, marginBottom: 16 }}>Task</div>
        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
        />
      </div>

      <div style={{ flex: 1 }}>
        <textarea
          placeholder="description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="desc-input"
        />
      </div>

      {error && <div className="error">{error}</div>}

      <div className="buttons-row">
        <button
          onClick={handleDeleteClick}
          disabled={!task}
          className="delete-btn"
        >
          Delete
        </button>
        <button onClick={handleSaveClick} className="save-btn">
          {isNew ? "Create Task" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

export default TaskDetail;
