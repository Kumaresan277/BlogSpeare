import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [user, setUser] = useState({username: '', password: ''});
    const navigate = useNavigate();

    const register = async () => {
        await axios.post('http://localhost:8080/api/auth/register', user);
        navigate('/login');
    };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 ">Register</h2>
        <input type="text" placeholder="Username" value={user.username} onChange={e => setUser({ ...user, username: e.target.value})} className="block w-full p-2 mb-4 border rounded" />
        <input type="text" placeholder="Password" value={user.password} onChange={e => setUser({ ...user, password: e.target.value})} className="block w-full p-2 mb-4 border rounded" />
        <button onClick={register} className="bg-green-500 text-white w-full p-2 rounded">Register</button>
    </div>
  );
};

export default RegisterPage