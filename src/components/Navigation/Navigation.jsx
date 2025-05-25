import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css'; 

export default function Navigation() {
  return (
    <nav className={css}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')}
      >
        Home
      </NavLink>

      <NavLink
        to="/movies"
        className={({ isActive }) => (isActive ? 'active-link' : 'nav-link')}
      >
        Movies
      </NavLink>
    </nav>
  );
}
