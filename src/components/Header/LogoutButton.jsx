import { useDispatch } from 'react-redux';
import { authService } from '../../services/auth.service';
import { logout } from '../../store/features/authSlice';

function LogoutButton() {
  const dispatch = useDispatch();

  const onLogOutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      type="button"
      className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800  focus:ring-4 focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      onClick={onLogOutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
