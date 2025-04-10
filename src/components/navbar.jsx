import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/client-side-rendering">Client-Side Rendering</Link></li>
        <li><Link to="/server-side-rendering">Server-Side Rendering</Link></li>
        <li><Link to="/virtualization">Virtualization</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
