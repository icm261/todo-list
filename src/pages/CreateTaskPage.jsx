import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "../components/Form";
import { createTask } from "../utils";
import { updateTasks } from "../api";

const CreateTaskPage = () => {
    const tasks = useLoaderData();
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Film/Video');
    const [project, setProject] = useState('');

    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();

        const randomId = function(length = 6) {
            return Math.random().toString(36).substring(2, length+2);
        };
        
        const newTask = {
            id: randomId(),
            name,
            today: false,
            priority: false,
            complete: false,
        };

        const updatedProjectName = project == "" ? "No Project" : project;
        const createdTask = createTask(newTask, updatedProjectName, category, tasks);
        updateTasks(createdTask);

        toast.success('Task Created Successfully');
        return navigate('/categories');
    }

    return (
        <>
            <Form name={name} setName={setName} category={category} setCategory={setCategory} project={project} setProject={setProject} submitForm={submitForm} page={'Create'}/>
        </>
    );
};
export default CreateTaskPage;