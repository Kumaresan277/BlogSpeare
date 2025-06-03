import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddBlogPage = () => {
  const [blog, setBlog] = useState({ title: '', content: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const quillRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    if (!token) navigate('/login');
  }, []);

  // Insert image into ReactQuill editor at cursor position
  const insertImage = (imageUrl) => {
    const editor = quillRef.current.getEditor();
    const range = editor.getSelection(true);
    if (range) {
      editor.insertEmbed(range.index, 'image', imageUrl);
      editor.setSelection(range.index + 1); // move cursor after image
    }
  };

  // Handle image file select and convert to base64 to insert into editor
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        insertImage(e.target.result);  // base64 string inserted as image
      };
      reader.readAsDataURL(file);
    }
  };

  const submitBlog = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:8080/api/blogs', blog, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/');
    } catch (err) {
      console.error('Failed to submit blog: ', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Add New Blog
      </h2>

      <input
        type="text"
        placeholder="Title"
        value={blog.title}
        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
        className="block w-full p-2 mb-4 border rounded"
      />

      {/* React Quill Editor */}
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={blog.content}
        onChange={(content) => setBlog({ ...blog, content })}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['image', 'link'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
          ],
        }}
        className="mb-10"
        style={{ height: '200px' }}
      />

      
      

      <button
        onClick={submitBlog}
        className="bg-purple-500 text-white w-full p-2 rounded hover:bg-purple-600"
      >
        Submit
      </button>
    </div>
  );
};

export default AddBlogPage;



// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';


// const AddBlogPage = () => {
//     const [blog, setBlog] = useState({ title: '', content: ''});
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         setIsLoggedIn(!!token);
//         if (!token) navigate('/login');
//     }, []);

//     const submitBlog = async ()=> {
//         const token = localStorage.getItem('token');
//         try {
//             await axios.post('http://localhost:8080/api/blogs', blog, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             navigate('/');
//         } catch (err) {
//             console.err("Failed to submit blog: ", err);
//         }
//     };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded shadow">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Add New Blog</h2>

//         <input 
//             type="text"
//             placeholder="Title"
//             value={blog.title}
//             onChange={e => setBlog({ ...blog, title: e.target.value })}
//             className="block w-full p-2 mb-4 border rounded"
//         />

//         <textarea 
//             placeholder="Content"
//             value={blog.content}
//             onChange={e => setBlog({ ...blog, content: e.target.value})}
//             className="block w-full p-2 mb-4 border rounded h-40"
//         />

//         <button 
//             onClick={submitBlog}
//             className="bg-purple-500 text-white w-full p-2 rounded hover:bg-purple-600"
//         >Submit</button>

//     </div>
//   );
// };

// export default AddBlogPage