import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const LandingPage = () => {
    return (
        <div style={{ textAlign: 'center', color: 'white', padding: '20px' }}>
            <h2>Welcome to Your Personal Finance Management Tool!</h2>
            <p>Please sign into an existing account or create a new account.</p>
            <div>
                <Link to="/signin">
                    <button style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>Sign In</button>
                </Link>
                <Link to="/signup">
                    <button style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>Create Account</button>
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
