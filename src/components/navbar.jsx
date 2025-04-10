import React from 'react';
import CustomLink from './custom-link';
const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><CustomLink to="/">Home</CustomLink></li>
        <li><CustomLink to="/client-side-rendering">Client Side</CustomLink></li>
        <li><CustomLink to="/server-side-rendering">Server Side</CustomLink></li>
        <li><CustomLink to="/virtualization">Virtualization</CustomLink></li>
      </ul>
    </nav>
  );
};

export default NavBar;
