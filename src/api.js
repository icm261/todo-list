export const createTask = async (newTask) => {
    const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
    });
    return;
};

export const deleteTask = async(id) => {
    const res = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
    });
    return;
};

export const updateTask = async (task) => {
    const res = await fetch (`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task),
    });
    return;
};