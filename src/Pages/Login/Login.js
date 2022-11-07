import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider } from 'firebase/auth';
import { setAuthToken } from '../../api/auth';

const Login = () => {
    const [error, setError] = useState(null)
    const { userLogin, userLoginGoogle } = useContext(AuthContext)

    const googleProvider = new GoogleAuthProvider();

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/'
    const handleLogin = event => {
        setError(null)
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        userLogin(email, password)
            .then(result => {
                const user = result.user;
                setAuthToken(user)
                navigate(from, { replace: true })

            })
            .catch(e => {
                console.error(e)
                const errorMessage = e.message;
                setError(errorMessage)
            })
    }
    const handleLoginGoogle = () => {
        userLoginGoogle(googleProvider)
            .then((result) => {
                const user = result.user;
                console.log(user)
                setAuthToken(user)
                navigate(from, { replace: true })
            })
            .catch((error) => {
                console.error(error)
            });
    }

    return (
        <div className="hero w-full my-20">
            <div className="hero-content grid gap-20 md:grid-cols-2">
                <div className="text-center ">
                    <img className='w-3/4' src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-10">
                    <h1 className="text-5xl text-center font-bold mt-4">Login</h1>
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <p className='text-red-600'>{error}</p>
                            </label>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Login" />
                        </div>
                    </form>
                    <div className=' text-center mb-2'>
                        <p className='font-bold mb-2'>Or Sign In with</p>
                        <button onClick={handleLoginGoogle} className="btn btn-circle btn-outline">
                            <FaGoogle className='text-2xl text-blue-800' />
                        </button>
                    </div>
                    <p className='text-center'>New to Genius Car <Link className='text-orange-600 font-bold' to='/signup'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;