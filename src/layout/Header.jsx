import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const guestNav = [
  { to: '/', text: 'Home' },
  { to: '/login', text: 'Login' },
  { to: '/register', text: 'Register' },
];

const userNav = [{ to: '/', text: 'Home' }];

const adminNav = [
  { to: '/', text: 'หน้าแรก' },
  { to: '/product', text: 'Product' },
  { to: '/category', text: 'category' },
  { to: '/user', text: 'user' },
];

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const finalNav = () => {
    switch (true) {
      case !user?.id:
        return guestNav;
      case user.role === 'ADMIN':
        return adminNav;
      default:
        return userNav;
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="navbar bg-yellow-200">
      <div className="flex-none">
        <nav className="menu menu-horizontal px-1">
          {finalNav().map((el) => (
            <li key={el.to}>
              <Link to={el.to}>{el.text}</Link>
            </li>
          ))}
          {user?.id && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </nav>
        <h1 className='t'>ร้านหนังสือออนไลน์</h1>
      </div>
      <div className='flex-none ml-auto'>
        <input type="search" id="search" />
        <button>Search</button>
      </div>
    </div>
  );
}
