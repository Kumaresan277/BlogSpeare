import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const UserBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditdata] = useState({ title: '', content: '' });
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:8080/api/blogs/my', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err));
  }, [token]);

  const deleteBlog = (id) => {
    axios.delete(`http://localhost:8080/api/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== id));
      });
  };

  const startEditing = (blog) => {
    setEditingId(blog.id);
    setEditdata({ title: blog.title, content: blog.content });
  };

  const updateBlog = (id) => {
    axios.post(`http://localhost:8080/api/blogs/${id}`, editData, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setBlogs(blogs.map(blog => blog.id === id ? res.data : blog));
      setEditingId(null);
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800 dark:text-white">My Blogs</h2>
      {blogs.map(blog => (
        <div key={blog.id} className="bg-white dark:bg-gray-800 p-4 mb-6 rounded shadow">
          {editingId === blog.id ? (
            <>
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditdata({ ...editData, title: e.target.value })}
                className="block w-full p-2 mb-2 border rounded"
              />
              <ReactQuill
                value={editData.content}
                onChange={(value) => setEditdata({ ...editData, content: value })}
                className="bg-white dark:bg-gray-900 dark:text-white"
                theme="snow"
              />
            </>
          ) : (
            <>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">{blog.title}</h3>
              <div className="mt-2  text-gray-700 dark:text-gray-200 overflow-y-auto max-h-64 pr-2" dangerouslySetInnerHTML={{ __html: blog.content }} />

            </>
          )}
          <div className="flex space-x-2 mt-4">
            <button onClick={() => deleteBlog(blog.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            {editingId === blog.id ? (
              <button onClick={() => updateBlog(blog.id)} className="bg-green-500 text-white px-3 py-1 rounded">Update</button>
            ) : (
              <button onClick={() => startEditing(blog)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserBlogsPage;





// import { useState, useEffect} from 'react';
// import axios from 'axios';

// const UserBlogsPage = () => {
//     const [blogs, setBlogs] = useState([]);
//     const [editingId, setEditingId] = useState(null);
//     const [editData, setEditdata] = useState({ title: '', content: ''});
//     const token =localStorage.getItem('token');

//     useEffect(() => {
//       axios.get('http://localhost:8080/api/blogs/my', {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//         .then(res => setBlogs(res.data))
//         .catch(err => console.error(err));
//     }, [token]);

//     const deleteBlog = (id) => {
//       axios.delete(`http://localhost:8080/api/blogs/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       .then(() => {
//           setBlogs(blogs.filter(blog => blog.id !== id));
//         }); 
//     };

//     const startEditing = (blog) => {
//       setEditingId(blog.id);
//       setEditdata({ title: blog.title, content: blog.content });
//     };

//     const updateBlog = (id) => {
//       axios.post(`http://localhost:8080/api/blogs/${id}`, editData, {
//         headers: { Authorization: `Bearer ${token}` }
//         }).then(res => {
//           setBlogs(blogs.map(blog => blog.id == id ? res.data : blog));
//           setEditingId(null);
//         });
//     };



//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-4 text-center text-gray-800 dark:text-white">My Blogs</h2>
//       {blogs.map(blog => (
//         <div key={blog.id} className="bg-white dark:bg-gray-800 p-4 mb-6 rounded shadow">
//           {editingId == blog.id ? (
//             <>
//             <input
//               type="text"
//               value={editData.title}
//               onChange={(e) => setEditdata({ ...editData, title: e.target.value })}
//               className="block w-full p-2 mb-2 border rounded"
//             />
//             <textarea 
//             value={editData.content}
//             onChange={(e) => setEditdata({ ...editData, content: e.target.value})}
//             className="block w-full p-2 mb-2 border rounded h-32"
//             />

//             </>
//           ) : (
//             <>
//             <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">{blog.title}</h3>
//             <p className="mt-2 text-gray-700 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: blog.content }} /> 
//             </>
//           )}
//           <div className="flex space-x-2 mt-4">
//             <button onClick={() => deleteBlog(blog.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
//             {editingId == blog.id ? (
//               <button onClick={() => updateBlog(blog.id)} className="bg-green-500 text-white px-3 py-1 rounded">Update</button>
//             ) : (
//               <button onClick={() => startEditing(blog)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
//             )}
//           </div>

//         </div>
//       ))}
//     </div>
//   );
// };

// export default UserBlogsPage