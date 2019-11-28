import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const UserRoute = ({ component:Component, ...rest }) => {
  return(
    <Route 
    {...rest}
    render={props => {
      {console.log(props)}
        if(localStorage.getItem('userid') === props.match.params.id) {
          return <Component {...props} />
        } else {
          return <Redirect to='/profile/:id' />;
        }
      }}
    />
  );
};

export default UserRoute;