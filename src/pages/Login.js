import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';

import { API_BASE_URL } from '../../src/config';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import Loading from '../components/Loading.Component';
import { useAuth0 } from '@auth0/auth0-react';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const { user, isAuthenticated } = useAuth0();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            setEmail(user.email);
            setPassword(user.nickname);
            loginUserWithEmail();
        }
    }, [isAuthenticated, user]);

    const loginUserWithEmail = async () => {
        setLoading(true);
        const requestData = await { email:user.email, password:user.nickname };
        try {
            localStorage.setItem("token", result.data.result.token);
                localStorage.setItem('user', JSON.stringify(result.data.result.user));
                dispatch({ type: 'LOGIN_SUCCESS', payload: result.data.result.user });
                navigate('/HomePage');
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: error.response?.data?.error || 'Login failed'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (event) => {
        event.preventDefault();
        loginUserWithEmail();
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <Header />
            <div className='mt-4 container login-cont border border-3 shadow-lg'>
                {loading && (
                    <div className='col-md-12 mt-3 text-center'>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 mt-4 mb-2 form-control input-bg"
                        placeholder='Phone number, username or email'
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 mb-2 form-control input-bg"
                        placeholder='Password'
                        required
                    />
                    <div className='mt-3 d-grid'>
                        <button type='submit' className="btn btn-danger">Log In</button>
                    </div>
                    <div className='my-4'>
                        <hr className='text-muted' />
                        <h5 className='text-muted text-center'>OR</h5>
                        <hr className='text-muted' />
                    </div>
                    <div className='mt-3 mb-5 d-grid'>
                        <button className="btn">
                            <span className='fw-bold text-danger fs-6'>Don't have an account?</span>
                            <Link to="/Signin" className='ms-1 text-info fw-bold'>Sign In</Link>
                        </button>
                    </div>
                </form>
            </div>
            <div className="foot">
                <Footer />
            </div>
        </>
    );
}

export default Login;
