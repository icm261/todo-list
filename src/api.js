export const updateTasks = async (category) => {
    const res = await fetch (`/api/tasks/${category.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category),
    });
    return;
}

export const taskLoader = async () => {
    const res = await fetch(`/api/tasks/`);
    const data = await res.json();
    return data;
};