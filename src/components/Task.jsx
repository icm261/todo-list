import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaSquareCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { taskColor } from "../utils";
import { useState } from "react";

const Task = ({ task, isCategory, numPriorities, category, handleUpdate, deleteTask }) => {

    const [today, setToday] = useState(task.today);
    const [complete, setComplete] = useState(task.complete);
    const [priority, setPriority] = useState(task.priority);


    const updatedTask = {
        id: task.id,
        name: task.name,
        today: task.today,
        priority: task.priority,
        complete: task.complete,
    };

    const toggleToday = () => {
        updatedTask.today = !today;
        updatedTask.priority = !updatedTask.today && priority ? !priority : null;
        handleUpdate(updatedTask, category);
        setToday(!today);
        setPriority(updatedTask.priority);
    }

    const togglePriority = () => {
        if (numPriorities >= 3 && !task.priority) return;
        
        updatedTask.priority = !priority;
        handleUpdate(updatedTask, category);
        setPriority(!priority);
    }

    const completeTask = () => {
        updatedTask.complete = !complete;
        handleUpdate(updatedTask, category);
        setComplete(!complete);
    }

    let bg = isCategory && today ? 'bg-gray-400' : taskColor(category.category, 'taskColor');
    
    let taskSize = isCategory ? 'w-80 min-h-7 mb-2' : 'w-120 min-h-10';
    let textSize = isCategory ? 'text-[12px]' : '';
    
    let iconColor = isCategory && today ? 'text-gray-600' : 'text-white hover:text-gray-600';
    
    return (
        <button 
            type="button"
            className={`inline-block ${taskSize} ${bg} ${priority ? 'border-l-10 border-red-600' : ''} rounded-sm shadow-md cursor-pointer`}
            onDoubleClick={!isCategory ? () => togglePriority() : null}
        >
            <div className="flex items-center justify-between">
                <p 
                    type="button"
                    onClick = {() => completeTask()} 
                    className={`px-4 ${textSize} text-white font-[600] text-left ${complete ? 'line-through' : ''}`}
                >
                    { task.name }
                </p>
                <div className="flex px-4">
                    {isCategory ?  <FaSquareCheck onClick={() => toggleToday()} className={`mx-2 ${textSize} ${iconColor}`}/> : null }
                    <Link to={`/edit/${category.id}?taskID=${task.id}`}><FaEdit className={`mx-2 ${textSize} text-white hover:text-gray-600`}/></Link>
                    <FaTrash onClick={() => deleteTask(task.id, category)} className={`mx-2 ${textSize} text-white hover:text-gray-600`}/>
                </div>
            </div>
        </button>
    );
};
export default Task;