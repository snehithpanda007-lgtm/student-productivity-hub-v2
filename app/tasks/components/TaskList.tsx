import { Task } from "../types";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

export default function TaskList({
  tasks,
  onDelete,
  onToggle,
}: Props) {
  return (
    <>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </>
  );
}