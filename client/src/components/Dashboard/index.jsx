import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../consts';


const Dashboard = () => {
  return (
    <>
        <li>
        <Link to={`${ROUTES.ancestors}`}>
            Ancestors
        </Link>
        </li>
            <li>
        <Link to={`${ROUTES.map}`}>
            Map
        </Link>
        </li>
    </>
  );
};

export default Dashboard;
