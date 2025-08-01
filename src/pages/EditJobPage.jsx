import { useParams, useLoaderData, useNavigate } from "react-router-dom";
import { updateTask } from "../api";
import { useState } from "react";
import Form from "../components/Form";

const EditJobPage = () => {
    const task = useLoaderData();
    const { id } = useParams();

    const [name, setName] = useState(task.name);
    const [category, setCategory] = useState(task.category);

    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();
        
        const updatedTask = {
            id,
            name,
            category,
            today: task.today,
            priority: task.priority,
            complete: task.complete,
        };

        updateTask(updatedTask);
        return navigate('/categories');
    }

    return (
        <>
            <Form name={name} setName={setName} category={category} setCategory={setCategory} submitForm={submitForm}/>
        </>
    );
};

const taskLoader = async ({ params }) => {
    const res = await fetch(`/api/tasks/${params.id}`);
    const data = await res.json();
    return data;
};

export { EditJobPage as default, taskLoader };