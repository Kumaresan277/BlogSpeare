import { useEffect, useState } from  'react';
import axios from 'axios';



const HomePage = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/blogs")
        .then(res => setBlogs(res.data))
        .catch(err => console.error(err));
    }, []);

    const likeBlog = (id) => {
        axios.post(`http://localhost:8080/api/blogs/${id}/like`)
        .then(() => window.location.reload());
    };
    const commentBlog = (id, comment) => {
        axios.post(`http://localhost:8080/api/blogs/${id}/comments`, { content : comment })
        .then(() => window.location.reload());
    };
  return (
    <div className="p-6">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800 dark:text-white">Latest Blogs</h2>
        {blogs.map(blog => (
            <div key={blog.id} className="bg-white dark:bg-gray-800 p-4 mb-6 rounded shadow">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">{blog.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">by : {blog.author ? blog.author.username : "Unknown Author"}</p>
                <p className="mt-2 text-gray-700 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: blog.content }} />
                <div className="flex justify-between items-center mt-4">
                    <button onClick={() =>likeBlog(blog.id)} className="bg-blue-500 text-white px-3 py-1 rounded">Like ({blog.likes})</button>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        commentBlog(blog.id, e.target.comment.value);
                        e.target.reset();
                    }}>
                        <input type="text" name="comment" placeholder="Add comment..." className="px-2 py-1 border rounded mr-2 "/>
                        <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">Comment</button>
                    </form>
                </div>
                <div className="mt-2">
                    {blog.comments.map((c, idx) => (
                    <p key={idx} className="text-sm text-gray-600 dark:text-gray-300">- {c.content}</p>
                    ))}
                </div>
            </div>
        ))}
    </div>
  );
};

export default HomePage

