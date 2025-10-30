import { useParams, useLoaderData, useNavigate, useLocation } from "react-router-dom";
import { updateTasks } from "../api";
import { useState } from "react";
import Form from "../components/Form";
import { addProject, deleteTask } from "../utils";

const EditJobPage = () => {
    const tasks = useLoaderData();
    const { id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskID = queryParams.get('taskID');

    const currentCategory = tasks.find((category) => category.id == id);

    let currentTask;
    let currentProject;
    
    currentCategory.tasksbyproject.map((project) => {
        project.tasks.map((task) => {
            if (task.id == taskID) {
                currentTask = task;
                currentProject = project.projectname;
            }
        })
    })
    
    const [name, setName] = useState(currentTask.name);
    const [category, setCategory] = useState(currentCategory.category);
    const [project, setProject] = useState(currentProject);

    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();
        
        const updatedTask = {
            id: currentTask.id,
            name,
            today: currentTask.today,
            priority: currentTask.priority,
            complete: currentTask.complete,
        };

        if (currentProject == project && currentCategory == category) {
            const updateTaskCategory = tasks.find((prevCategory) => prevCategory.category == category);
            const projectIndex = updateTaskCategory.tasksbyproject.findIndex((prevProject) => prevProject.projectname == project);
            const taskIndex = updateTaskCategory.tasksbyproject[projectIndex].tasks.findIndex((prevTask) => prevTask.id == updatedTask.id);
            updateTaskCategory.tasksbyproject[projectIndex].tasks[taskIndex].name = name;
            updateTasks(updateTaskCategory);
        }
        else {
            const deletedCategory = deleteTask(currentTask.id, tasks.find((prevCategory) => prevCategory == currentCategory));
            if (currentCategory != category) {
                const updatedCategory = addProject(updatedTask, project, tasks.find((prevCategory) => prevCategory.category == category));
                updateTasks(updatedCategory);
            }

            if (currentProject != project && currentCategory == category) {
                const updateProjectCategory = addProject(updatedTask, project, deletedCategory);
                updateTasks(updateProjectCategory);
            }

            updateTasks(deletedCategory);
        }

        return navigate('/categories');
    }

    return (
        <>
            <Form name={name} setName={setName} category={category} setCategory={setCategory} project={project} setProject={setProject} submitForm={submitForm} page={'Edit'}/>
        </>
    );
};

export default EditJobPage;