import { Link, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        
        <nav clssName="bg-white shadow=md dark:bg-gray-800 dark:text-white p-4">
            <div className="container mx-auto flex justify-between">
                <Link to="/" className="font-bold text-lg">BlogSpeare</Link>
                <div className="flex space-x-4">
                    <Link to="/" className="hover:underline">Home</Link>
                    {token ? (
                        <>
                            <Link to="/my-blogs">My Blogs</Link>
                            <Link to="/add-blog">Add Blog</Link>
                            <button onClick={handleLogout} className="hover:underline">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                    
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
