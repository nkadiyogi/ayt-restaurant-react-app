
import React from 'react';
import { Route, Redirect,useRouteMatch } from 'react-router-dom';
import { useDispatch ,useSelector} from 'react-redux';

const PrivateRoute = ({component: Component, ...rest}) => {
    const appState = useSelector(state=> state.appReducer);
    const {url,path} = useRouteMatch();
    console.log('url,path PrivateRoute.js',url,path);
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            appState && appState.loggedIn ?
                <Component {...props} />
            : <Redirect to={`${url}/log-in`} />
        )} />
    );
};

export default PrivateRoute;