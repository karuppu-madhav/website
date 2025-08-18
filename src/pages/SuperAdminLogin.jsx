import { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../../db';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/madhav-logo.jpg'
import Bg from '../assets/cracker-bg.svg'
import { checkEmailExists } from '../utils/checkEmailExits';
import { App } from 'antd';
import { useAuthStore } from '../store/authStore/index'
import { useAuthState } from 'react-firebase-hooks/auth';

const provider = new GoogleAuthProvider();

const SuperAdminLogin = () => {
    const navigate = useNavigate();
    const { message } = App.useApp()
    const { isAuthenticated, user, setAuthenticateSuccess } = useAuthStore();
    const [currentUser] = useAuthState(auth)

    async function checkLogin() {
        const emailExists = await checkEmailExists(currentUser?.email);
        if (emailExists) {
            setAuthenticateSuccess(currentUser)
            navigate('/dashboard')
        }
    }

    useEffect(() => {
        if (currentUser)
            checkLogin()
    }, [currentUser])

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const emailExists = await checkEmailExists(user.email);

            // Optional: Check if email is admin (add email check here)
            if (emailExists) {
                setAuthenticateSuccess(user)
                navigate('/dashboard');
            } else {
                message.error('Access Denied: Not an admin')
                auth.signOut();
            }
        } catch (error) {
            console.error('Google login error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-red-400 flex items-center justify-center px-6 lg:px-20 py-6 bg-contain select-none" style={{ backgroundImage: `url(${Bg})` }} >
            <h1>{isAuthenticated}</h1>
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
                <img
                    src={Logo} // Place your logo in public folder or replace with URL
                    alt="Madhav Crackers Sivakasi | Best cracker shop in sivakasi"
                    className="w-24 mx-auto my-6"
                />
                <h1 className="text-2xl text-blue-800 font-bold mb-3">Admin Login</h1>

                <button
                    onClick={handleGoogleLogin}
                    className="flex items-center cursor-pointer justify-center w-full gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-medium px-4 py-3 rounded-xl transition"
                >
                    <FcGoogle className="text-2xl" />
                    Continue with Google
                </button>
                <p className='text-xs my-2 text-red-600 font-medium' >permission restricted</p>
            </div>
        </div>
    );
};

export default SuperAdminLogin;
