import React, {lazy} from 'react';
import propTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { getToken } from '../services/storages/userStorage';
// import routes from "../routes";

// const AdminLayout = lazy(() => import('../layouts/Layout'));

const PrivateRoute = ({ component, path, exact,children }) => {
  // console.log(`children`, children)
  const condition = getToken();
  if(condition) {
    return children;
  } else {
    return <Redirect to={'/login'} />;
  }

};

PrivateRoute.propTypes = {
  component: propTypes.func,
  path: propTypes.string,
  exact: propTypes.bool,
};

export default PrivateRoute;
