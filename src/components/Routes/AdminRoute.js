import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const UserRoute = ({ component:Component, ...rest }) => {
  return(
    <Route 
    {...rest}
    render={props => {
        if(Number(localStorage.getItem('userid')) === Number(props.match.params.id)) {
          return <Redirect to={`/myprofile/${Number(localStorage.getItem('userid'))}`} />;
          } else {
          return <Component {...props} />
        }
      }}
    />
  );
}

export default UserRoute;