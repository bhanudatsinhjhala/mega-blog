import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

function AuthLayout({ authentication = true, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [loader, setLoader] = useState(true);
  const authState = useSelector((state) => state);

  useEffect(() => {
    if (!authentication && authState.status !== authentication) {
      // authService.logout();
      if (location.pathname !== '/register') {
        navigate('/login');
      } else {
        navigate('/register');
      }
      setLoader(false);
    } else {
      // navigate('/');
      setLoader(false);
    }
  }, [authentication, authState, navigate]);
  return loader !== false ? <p>Loading....</p> : <>{children}</>;
}

export default AuthLayout;
