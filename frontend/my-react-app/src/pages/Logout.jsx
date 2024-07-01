import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import toast from 'react-hot-toast';

function Logout() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const response = await axios.post('http://localhost:8000/logout', {}, { withCredentials: true });
            if (response.data.message) {
                console.log(response.data.message);
                // Perform additional actions if needed
                toast.success('logout success')
                setTimeout(() => {
                    navigate('/dashboard');
                    window.location.reload();
                  }, 1000); 
            } else {
                console.error('Logout failed:', response.data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (!user) {
            navigate('/'); // Redirect to home page if user is not signed in
        }
    }, [user, navigate]);

    if (user) {
        return (
            <>
                <div>Are you sure you want to log out?</div>
                <button onClick={logout}>Yes</button>
            </>
        );
    }

    return null; // Return null or a loading state if the user is not logged in
}

export default Logout;
