import { useState, useEffect } from "react";
import TaskList from "./TaskList";
import TaskDetail from "./TaskDetail";

const STORAGE_KEY = "todo.items.v1";

const TodoList = () => {
  const [tasks, setTasks] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [selectedId, setSelectedId] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      return parsed.length ? parsed[0].id : null;
    } catch {
      return null;
    }
  });

  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const validateTitle = (value) => {
    if (!value.trim()) return "Title is required.";
    if (value.length > 120) return "Title must be 120 characters or less.";
    return "";
  }

  const validateDescription = (value) => {
    if (value.length > 1000) return "Description must be 1000 characters or less.";
    return "";
  }

  const handleSelect = (task) => {
    setSelectedId(task.id);
    setError("");
  }

  const handleAddNew = () => {
    setSelectedId(null);
    setError("");
  }

  const handleSave = (title, description, currentId, onClearInputs) => {
    const titleError = validateTitle(title);
    const descError = validateDescription(description);
    if (titleError || descError) {
      setError(titleError || descError);
      return;
    }
    setError("");

    const trimmedTitle = title.trim();
    const trimmedDesc = description.trim();

    if (currentId == null) {
      const newTask = {
        id: Date.now(),
        title: trimmedTitle,
        description: trimmedDesc,
        done: false,
      };
      const updated = [newTask, ...tasks];
      setTasks(updated);
      setSelectedId(newTask.id);
      if (onClearInputs) onClearInputs();
      setModalMode("create");
    } else {
      const updated = tasks.map((t) =>
        t.id === currentId ? { ...t, title: trimmedTitle, description: trimmedDesc } : t
      );
      setTasks(updated);
      setModalMode("edit");
    }

    setShowModal(true);
  }

  const handleToggleDone = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  const handleDelete = (id) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    if (updated.length) {
      setSelectedId(updated[0].id);
    } else {
      setSelectedId(null);
    }
  }

  const selectedTask = tasks.find((t) => t.id === selectedId) || null;

  return (
    <>
      <div className="app">
        <div className="left">
          <h1 className="today">Today</h1>
          <TaskList
            tasks={tasks}
            onAddNew={handleAddNew}
            onSelect={handleSelect}
            onToggleDone={handleToggleDone}
          />
        </div>

        <div className="right">
          <TaskDetail
            key={selectedTask ? selectedTask.id : "new"}
            task={selectedTask}
            error={error}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {modalMode === "create" ? (
              <>
                <h3>Task created</h3>
                <p>Your task has been created.</p>
              </>
            ) : (
              <>
                <h3>Changes saved</h3>
                <p>Your changes have been saved.</p>
              </>
            )}
            <button onClick={() => setShowModal(false)}>OK</button>
          </div>
        </div>
      )}
    </>
  );
}

export default TodoList;
