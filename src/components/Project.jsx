import { FaCaretDown, FaCaretLeft } from "react-icons/fa";
import { taskColor } from "../utils";
import Task from "./Task";
import { useState } from "react";

const Project = ({ project, category, onHandleUpdate, onDeleteTask }) => {

    const [openMenus, setOpenMenus] = useState({});

    let bg = project.projectname == 'No Project' ? taskColor(category.category, 'noprojectColor') : taskColor(category.category, 'projectColor');
        
    let taskSize = 'w-90 min-h-7 mb-2';
    let textSize = 'text-[12px]';
    
    let iconColor = 'text-white hover:text-gray-600';

    const toggleProject = (projectID) => {
        setOpenMenus(prevState => ({
            ...prevState,
            [projectID]: !prevState[projectID],
        }));
    }

    return (
        <>
        <button 
            type="button"
            className={`inline-block ${taskSize} ${bg} rounded-sm shadow-md cursor-pointer`}
        >
            <div className="flex items-center justify-between py-2">
                <p 
                    type="button"
                    className={`px-4 ${textSize} text-white font-[600] text-left`}
                >
                    { project.projectname }
                </p>
                <div className="flex px-2">
                    {openMenus[project.id] 
                        ? <FaCaretDown onClick={() => toggleProject(project.id)} className={`mx-2 text-[20px] ${iconColor}`}/> 
                        : <FaCaretLeft onClick={() => toggleProject(project.id)} className={`mx-2 text-[20px] ${iconColor}`}/>
                    }
                </div>
            </div>
        </button>
        {openMenus[project.id] && (
            project.tasks?.map((task) => (
                <Task key={task.id} task={task} isCategory={true} category={category} handleUpdate={onHandleUpdate} deleteTask={onDeleteTask}/>
            ))
        )}
        </>
    );
};
export default Project;