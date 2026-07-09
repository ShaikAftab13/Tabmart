import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login_banner from "../assets/Login_banner.jpg";
import { Link } from 'react-router-dom';
import { BikeIcon, Loader2, LockIcon, MailIcon, UserIcon } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';

function Login() {

    const { login, register } = useContext(AuthContext);

    const [isLoginState, setIsLoginState] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (isLoginState) {
            await login(email, password);
        } else {
            await register(name, email, password);
        }
        setLoading(false);
    }

    return (
        <div className='h-screen w-screen flex bg-background overflow-hidden'>

            {/* left side */}
            <div className='hidden lg:flex lg:w-1/2 h-full relative items-center justify-center overflow-hidden'>

                <img
                    src={Login_banner}
                    alt='Login Banner'
                    className='absolute inset-0 h-full w-full object-cover'
                />

                {/* Dark Overlay */}
                <div className='absolute inset-0 bg-gradient-to-br from-app-green/90 via-app-green-light/80 to-black/60'></div>

                {/* Content */}
                <div className='relative z-10 text-white text-center max-w-xl px-10'>

                    {/* Logo/Brand */}
                    <div className='mb-6'>
                        <h1 className='font-serif text-6xl font-bold tracking-wide'>
                            Tab<span className='text-orange-400'>Mart</span>
                        </h1>

                        <p className='text-white/70 text-lg mt-2'>
                            Your Smart Grocery Partner
                        </p>
                    </div>

                    <span className='inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm mb-6'>
                        Fresh • Fast • Affordable
                    </span>

                    <h2 className='text-4xl font-bold leading-tight mb-6'>
                        Everything You Need,
                        <br />
                        Delivered In
                        <span className='text-orange-400'> Minutes</span>
                    </h2>

                    <p className='text-lg text-white/80 leading-relaxed max-w-md mx-auto'>
                        Discover fresh groceries, daily essentials, snacks,
                        beverages, and household products at unbeatable prices.
                    </p>

                    <div className='flex justify-center gap-10 mt-10'>

                        <div>
                            <h3 className='text-3xl font-bold'>50k+</h3>
                            <p className='text-white/70'>Customers</p>
                        </div>

                        <div>
                            <h3 className='text-3xl font-bold'>10min</h3>
                            <p className='text-white/70'>Delivery</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* right side */}
            <div className='w-full lg:w-1/2 h-screen flex items-center justify-center bg-gradient-to-br from-app-cream via-white to-app-mint/30 px-4 overflow-hidden'>

                <div className='w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-app-border-green p-6 relative'>

                    <div className='absolute -top-20 -right-20 w-40 h-40 bg-app-leaf-light/10 rounded-full blur-3xl'></div>
                    <div className='absolute -bottom-20 -left-20 w-40 h-40 bg-app-green-lighter/10 rounded-full blur-3xl'></div>

                    <div className='relative z-10 flex flex-col gap-5'>

                        <Link
                            to='/'
                            className='flex items-center gap-3 w-fit'
                        >
                            <div className='w-12 h-12 rounded-2xl bg-app-green flex items-center justify-center text-white shadow-lg'>
                                <BikeIcon size={22} />
                            </div>

                            <span className='text-3xl font-serif font-bold text-app-green'>
                                Tab<span className='text-app-orange'>Mart</span>
                            </span>
                        </Link>

                        <div>
                            <h1 className='text-3xl font-bold text-app-green leading-tight'>
                                {isLoginState
                                    ? "Sign in to your account"
                                    : "Create your account"}
                            </h1>

                            <div className='flex items-center gap-2 mt-2 text-app-text-light text-sm'>
                                <p>
                                    {isLoginState
                                        ? "Don't have an account?"
                                        : "Already have an account?"}
                                </p>

                                <button
                                    type="button"
                                    onClick={() => setIsLoginState(!isLoginState)}
                                    className='font-semibold text-app-orange hover:text-app-orange-dark transition-colors'
                                >
                                    {isLoginState ? "Create One" : "Sign in"}
                                </button>
                            </div>
                        </div>

                        {/* Login/Register Form */}
                        <form onSubmit={handleSubmit} className='space-y-4'>

                            {!isLoginState && (
                                <label className='block'>
                                    <span className='text-sm font-medium text-app-text mb-1.5 block'>
                                        Full Name
                                    </span>

                                    <div className='group flex items-center gap-3 border border-app-border rounded-2xl px-4 py-3 bg-app-cream/40 hover:border-app-green-light focus-within:border-app-green focus-within:ring-4 focus-within:ring-green-100 transition-all'>
                                        <UserIcon size={18} className='text-app-text-light group-focus-within:text-app-green' />

                                        <input
                                            type='text'
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            required
                                            placeholder='Enter your name'
                                            className='flex-1 bg-transparent text-app-text placeholder:text-app-text-light outline-none'
                                        />
                                    </div>
                                </label>
                            )}

                            <label className='block'>
                                <span className='text-sm font-medium text-app-text mb-1.5 block'>
                                    Email Address
                                </span>

                                <div className='group flex items-center gap-3 border border-app-border rounded-2xl px-4 py-3 bg-app-cream/40 hover:border-app-green-light focus-within:border-app-green focus-within:ring-4 focus-within:ring-green-100 transition-all'>
                                    <MailIcon size={18} className='text-app-text-light group-focus-within:text-app-green' />

                                    <input
                                        type='email'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                        placeholder='you@example.com'
                                        className='flex-1 bg-transparent text-app-text placeholder:text-app-text-light outline-none'
                                    />
                                </div>
                            </label>

                            <label className='block'>
                                <span className='text-sm font-medium text-app-text mb-1.5 block'>
                                    Password
                                </span>

                                <div className='group flex items-center gap-3 border border-app-border rounded-2xl px-4 py-3 bg-app-cream/40 hover:border-app-green-light focus-within:border-app-green focus-within:ring-4 focus-within:ring-green-100 transition-all'>
                                    <LockIcon size={18} className='text-app-text-light group-focus-within:text-app-green' />

                                    <input
                                        type='password'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                        placeholder='Enter password'
                                        className='flex-1 bg-transparent text-app-text placeholder:text-app-text-light outline-none'
                                    />
                                </div>
                            </label>

                            {isLoginState && (
                                <div className='flex justify-end'>
                                    <button
                                        type='button'
                                        className='text-sm text-app-orange hover:text-app-orange-dark font-medium'
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className='w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-app-green to-app-green-light hover:scale-[1.02] hover:shadow-lg transition-all duration-300 disabled:opacity-60 mt-2'
                            >
                                {loading ? (
                                    <Loader2 className='w-5 h-5 animate-spin' />
                                ) : (
                                    isLoginState ? "Sign In" : "Create Account"
                                )}
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Login;