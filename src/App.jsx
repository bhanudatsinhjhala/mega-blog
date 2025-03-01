import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { HomePage } from './pages';
import { authService } from './services/auth.service';
import { login, logout } from './store/features/authSlice';

function App() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser().then((data) => {
      if (data) {
        setLoading(false);
        dispatch(login(data));
      } else {
        setLoading(true);
        dispatch(logout());
      }
    });
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-wrap content-between bg-gray-100">
        <div className="w-full block content-center m-auto w-1/2 mt-20">
          <main>{loading ? <h1>Loading......</h1> : <HomePage />}</main>
        </div>
      </div>
    </>
  );
}

export default App;
