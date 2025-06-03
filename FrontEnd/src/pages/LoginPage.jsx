import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';





const LoginPage = () => {
     const [credentials, setCredentials] = useState({ username: '', password: ''});
     const navigate = useNavigate();

     const login = async ()  => {
        const res = await axios.post('http://localhost:8080/api/auth/login', credentials);
        localStorage.setItem('token', res.data.token);
        navigate('/');
     };
  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input type="text" placeholder="Username" value={credentials.username} onChange={e => setCredentials({ ...credentials, username: e.target.value})} className="block w-full p-2 mb-4 border rounded" />
        <input type="text" placeholder="Password" value={credentials.password} onChange={e => setCredentials({ ...credentials, password: e.target.value})} className="block w-full p-2 mb-4 border rounded" />
        <button onClick={login} className="bg-blue-500 text-white w-full p-2 rounded">Login</button>

    </div>
  )
}

export default LoginPage
