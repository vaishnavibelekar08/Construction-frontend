import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom fixed-top" id="mainNav">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-building me-2"></i>Mahalakshmi Construction
        </Link>
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/services">Services</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/projects">Projects</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
            <li className="nav-item ms-2">
              <NavLink className="btn btn-gold" to="/get-quote">Get Quote</NavLink>
            </li>
            {isAuthenticated ? (
              <>
                <li className="nav-item ms-2">
                  <NavLink className="nav-link" to="/admin/dashboard"><i className="bi bi-speedometer2 me-1"></i>Admin</NavLink>
                </li>
                <li className="nav-item ms-1">
                  <button className="btn btn-outline-gold btn-sm" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <li className="nav-item ms-2">
                <NavLink className="nav-link" to="/admin/login"><i className="bi bi-person-lock me-1"></i>Admin</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
