import React from 'react';
import PropTypes from 'prop-types';

const Login = ({ authenticate }) => (
    <nav className="login">
        <h2>Inventory Login</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="google" onClick={ () => authenticate('Google') }>
            Log In With Google
        </button>
        <button className="facebook" onClick={ () => authenticate('Facebook') }>
            Log In With Facebook
        </button>
        <button className="github" onClick={ () => authenticate('Github') }>
            Log In With Github
        </button>
    </nav>
);

Login.propTypes = {
    authenticate: PropTypes.func.isRequired
};

export default Login;
