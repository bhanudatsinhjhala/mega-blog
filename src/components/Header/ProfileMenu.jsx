import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { logout } from '../../store/features/authSlice';

function ProfileMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogOutHandler = (e) => {
    e.preventDefault();
    authService.logout();
    dispatch(logout());
    navigate('/login');
  };
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <button
        type="button"
        onClick={onLogOutHandler}
        aria-hidden="true"
        className="block size-6 group-data-[open]:hidden relative rounded-full p-1 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ml-3 mb-0.5 w-8 h-8"
      >
        <ArrowRightStartOnRectangleIcon />
      </button>
    </div>
  );
}

export default ProfileMenu;
