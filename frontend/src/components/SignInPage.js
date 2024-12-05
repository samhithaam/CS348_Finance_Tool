import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Import UserContext

const SignInPage = () => {
    const { setUser } = useContext(UserContext); // Use context to set user
    const navigate = useNavigate();
    const [email, setEmail] = useState(''); // State for email
    const [password, setPassword] = useState(''); // State for password
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [error, setError] = useState(''); // State for error messages

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3030/api/users/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            console.log('Sign-in response:', data); // Log the response data
            if (response.ok) {
                setUser(data); // Update the user context
                navigate('/dashboard'); // Navigate to the dashboard
            } else {
                setError(data.message || 'Sign-in failed. Please try again.');
            }
        } catch (error) {
            setError('An error occurred while signing in. Please try again later.');
            console.error('Error signing in:', error);
        }
    };
    
    

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', padding: '20px', height: '100vh' }}>
            <Link to="/">
                <button style={{ position: 'absolute', top: '20px', left: '20px', padding: '10px', borderRadius: '5px', backgroundColor: 'gray', color: 'white' }}>Back to Welcome Page</button>
            </Link>
            <h2>Sign In to Your Account</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', border: '1px solid white', padding: '20px', borderRadius: '10px', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update state on input change
                    style={{ margin: '10px 0', padding: '10px', borderRadius: '5px', border: '1px solid white', width: '100%', boxSizing: 'border-box' }} // Set width to 100%
                    required // Mark as required
                />
                <label htmlFor="password">Password:</label>
                <div style={{ position: 'relative', width: '100%' }}>
                    <input
                        type={showPassword ? 'text' : 'password'} // Toggle between text and password
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update state on input change
                        style={{ margin: '10px 0', padding: '10px', borderRadius: '5px', border: '1px solid white', width: '100%', boxSizing: 'border-box' }} // Set width to 100%
                        required // Mark as required
                    />
                    <button 
                        type="button" 
                        onClick={() => setShowPassword(prev => !prev)} // Toggle password visibility
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'black', // Set background color to black
                            color: 'white', // Set text color to white
                            border: 'none', // Remove border
                            borderRadius: '5px', // Rounded corners
                            padding: '5px 10px', // Padding for the button
                            cursor: 'pointer', // Pointer cursor on hover
                        }}
                    >
                        {showPassword ? 'Hide' : 'Show'} {/* Show/Hide text */}
                    </button>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
                <button type="submit" style={{ marginTop: '10px', padding: '10px', borderRadius: '5px', backgroundColor: 'white', color: 'black', fontWeight: 'bold', width: '100%' }}>Sign In</button>
            </form>
        </div>
    );
};

export default SignInPage;
