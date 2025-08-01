import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaSquareCheck } from "react-icons/fa6";
import { deleteTask, updateTask } from "../api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { taskColor } from "../utils";

const Task = ({ task, isCategory, numPriorities = 0 }) => {

    const onDeleteTask = (taskID) => {
        const confirm = window.confirm('Are you sure you want to delete this task?');

        if (!confirm) return;
        deleteTask(taskID);
        toast.success('Task Deleted Successfully');
    }

    const changeTask = {
        id: task.id,
        name: task.name,
        category: task.category,
        today: task.today,
        priority: task.priority,
        complete: task.complete,
    };

    const toggleToday = () => {
        changeTask.today = !changeTask.today;
        updateTask(changeTask);
    }

    const togglePriority = () => {
        if (numPriorities >= 3 && !task.priority) return;
        
        changeTask.priority = !changeTask.priority;
        updateTask(changeTask);
    }

    const completeTask = () => {
        changeTask.complete = !changeTask.complete;
        updateTask(changeTask);
    }

    let bg = isCategory && task.today ? 'bg-gray-400' : taskColor(task.category, 'taskColor');
    
    let taskSize = isCategory ? 'w-90 min-h-7 mb-2' : 'w-120 min-h-10';
    let textSize = isCategory ? 'text-[12px]' : '';
    
    let iconColor = isCategory && task.today ? 'text-gray-600' : 'text-white hover:text-gray-600';
    
    return (
        <button 
            type="button"
            className={`inline-block ${taskSize} ${bg} ${task.priority ? 'border-l-10 border-red-600' : ''} rounded-sm shadow-md cursor-pointer`}
            onDoubleClick={!isCategory ? () => togglePriority() : null}
        >
            <div className="flex items-center justify-between">
                <p 
                    type="button"
                    onClick = {() => completeTask()} 
                    className={`px-4 ${textSize} text-white font-[600] text-left ${task.complete ? 'line-through' : ''}`}
                >
                    { task.name }
                </p>
                <div className="flex px-4">
                    {isCategory ?  <FaSquareCheck onClick={() => toggleToday()} className={`mx-2 ${textSize} ${iconColor}`}/> : null }
                    <Link to={`/edit/${task.id}`}><FaEdit className={`mx-2 ${textSize} text-white hover:text-gray-600`}/></Link>
                    <FaTrash onClick={() => onDeleteTask(task.id)} className={`mx-2 ${textSize} text-white hover:text-gray-600`}/>
                </div>
            </div>
        </button>
    );
};
export default Task;