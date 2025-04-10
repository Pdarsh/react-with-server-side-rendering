import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ssrRoutes = ['/server-side-rendering']; // Add any SSR paths here

const CustomLink = ({ to, children, ...props }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    // If already on the same route, do nothing
    if (location.pathname === to) {
      return;
    }

    if (ssrRoutes.includes(to)) {
      // Full reload for SSR route
      window.location.href = to;
    } else {
      // Navigate client-side
      navigate(to);
    }
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};

export default CustomLink;
