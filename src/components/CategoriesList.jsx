import Card from "./Card";
import ClearTasks from "./ClearTasks";
import Task from "./Task";
import { useState, useEffect } from "react";
import ListHeader from "./ListHeader";

const CategoriesList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async() => {
            try {
                const res = await fetch('/api/tasks');
                const data = await res.json();
                setTasks(data);
            } catch(error) {
                console.log('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        }

        fetchTasks();
     }, []);

     const categoriesList = ['Film/Video', 'Writing', 'Correspondence', 'Computer Science', 'Photography', 'Other'];
    
    return (
        <>
            <section>
                <div className="mx-auto max-w-6xl px-2">
                    <ListHeader title="Categories"/>
                    <div className="flex items-center justify-center">
                        <div className="grid grid-cols-2 py-10 gap-15">
                            {categoriesList.map((category) => (
                                <Card title={category}>
                                    {(tasks.filter((task) => task.category == category)).map((task) => (
                                        <Task key={task.id} task={task} isCategory={true}/>
                                    ))}
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <ClearTasks tasks={tasks}/>
        </>
    );
};
export default CategoriesList;