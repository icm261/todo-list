const Form = ({ name, setName, category, setCategory, submitForm}) => {
    return (
        <>
            <section>
                <div className="mx-auto max-w-6xl my-8 px-2">
                    <a href="/">
                        <button 
                        className="inline-block w-20 h-8 text-white text-sm bg-red-700 hover:bg-red-600 rounded-sm cursor-pointer"
                        >
                        Back
                        </button>
                    </a>            
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="font-bold text-2xl mb-15">Create Task</h2>
                        <form onSubmit={submitForm}>
                            <div className="mb-8">
                                <label htmlFor="name" className="block mb-3">Task Name</label>
                                <input type="text" 
                                        id="name" 
                                        name="name" 
                                        className="bg-gray-50 w-120 border border-gray-300 rounded-lg focus:border-blue-500 p-3 block" 
                                        required
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-8">
                                <label htmlFor="category" className="block mb-3">Category</label>
                                <select id="category" 
                                        name="category" 
                                        className="bg-gray-50 w-120 border border-gray-300 rounded-lg focus:border-blue-500 p-3 block" 
                                        required
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="Film/Video">Film/Video</option>
                                    <option value="Writing">Writing</option>
                                    <option value="Correspondence">Correspondence</option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Photography">Photography</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <button type="submit" className="inline-block w-40 h-10 text-white bg-blue-800 hover:bg-blue-700 rounded-sm cursor-pointer">Submit</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};
export default Form;