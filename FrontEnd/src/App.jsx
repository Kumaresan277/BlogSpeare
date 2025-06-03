import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddBlogPage from './pages/AddBlogPage';
import UserBlogsPage from './pages/UserBlogsPage';

function App() {
 
  return (
    
    <Router>
      <div className="w-screen bg-gray-100 min-h-screen dark:bg-gray-900">
        <Navbar ></Navbar> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/add-blog" element={<AddBlogPage />} />
          <Route path="/my-blogs" element={<UserBlogsPage />} />
        </Routes>
      </div>
    </Router>
  );
   
};

export default App
