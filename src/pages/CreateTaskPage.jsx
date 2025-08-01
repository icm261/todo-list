import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../api";
import { toast } from "react-toastify";
import Form from "../components/Form";

const CreateTaskPage = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Film/Video');

    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();
        
        const newTask = {
            name,
            category,
            today: false,
            priority: false,
            complete: false,
        };

        createTask(newTask);
        toast.success('Task Created Successfully');
        return navigate('/categories');
    }

    return (
        <>
            <Form name={name} setName={setName} category={category} setCategory={setCategory} submitForm={submitForm}/>
        </>
    );
};
export default CreateTaskPage;