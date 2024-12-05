// src/components/SignUpPage.js
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Import UserContext

const SignUpPage = () => {
    const { setUser } = useContext(UserContext); // Use context to set user
    const navigate = useNavigate();
    const [name, setName] = useState(''); // State for name
    const [email, setEmail] = useState(''); // State for email
    const [password, setPassword] = useState(''); // State for password
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        try {
            const response = await fetch('http://localhost:3030/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }), // Send user data
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data); // Update user context with received data
                navigate('/signin'); // Redirect to the dashboard
            } else {
                console.error(data.message); // Handle errors
            }
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', padding: '20px', height: '100vh' }}>
            <Link to="/">
                <button style={{ position: 'absolute', top: '20px', left: '20px', padding: '10px', borderRadius: '5px', backgroundColor: 'gray', color: 'white' }}>Back to Welcome Page</button>
            </Link>
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', border: '1px solid white', padding: '20px', borderRadius: '10px', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} // Update state on input change
                    style={{ margin: '10px 0', padding: '10px', borderRadius: '5px', border: '1px solid white', width: '100%', boxSizing: 'border-box' }} // Set width to 100%
                    required // Mark as required
                />
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
                <button type="submit" style={{ marginTop: '10px', padding: '10px', borderRadius: '5px', backgroundColor: 'white', color: 'black', fontWeight: 'bold', width: '100%' }}>Create Account</button>
            </form>
        </div>
    );
};

export default SignUpPage;
