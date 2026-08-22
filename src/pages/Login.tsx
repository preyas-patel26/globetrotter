import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Compass, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email address and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const success = login(email.trim(), password.trim());
      setIsLoading(false);
      if (success) {
        if (email.trim().toLowerCase() === 'admin@globetrotter.com') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError('Invalid login credentials.');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-background">
      {/* Left 50% - Scenic Hero Image Panel */}
      <div className="relative w-full md:w-1/2 min-h-[320px] md:min-h-screen bg-on-surface overflow-hidden flex flex-col justify-between p-8 md:p-12 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-85 scale-105 transition-transform duration-10000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/40 to-transparent" />

        {/* Top Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <span className="font-headline font-extrabold text-2xl tracking-tight text-white">
            GlobeTrotter
          </span>
        </div>

        {/* Bottom Hero Tagline */}
        <div className="relative z-10 max-w-md my-auto md:my-0">
          <h2 className="font-headline font-extrabold text-3xl md:text-4xl text-white leading-tight mb-4 drop-shadow-md">
            Discover the world, effortlessly.
          </h2>
          <p className="text-white/90 font-light text-base md:text-lg leading-relaxed">
            Your journey to breathtaking destinations begins here. Access your personalized travel
            itineraries or manage platform operations.
          </p>
        </div>
      </div>

      {/* Right 50% - Secure Login Form Glass Card */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-gradient-to-br from-surface via-background to-surface-container-low">
        <div className="w-full max-w-md glass-card-elevated rounded-3xl p-8 md:p-10 shadow-2xl border border-outline-variant/30">
          <div className="mb-8">
            <h2 className="font-headline font-extrabold text-2xl text-on-surface">Welcome back</h2>
            <p className="text-outline text-sm mt-1">Please enter your credentials to sign in.</p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-error-container/40 border border-error/30 text-error text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-on-surface uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-outline absolute left-3.5 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-on-surface uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-outline absolute left-3.5 pointer-events-none" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-on-surface-variant cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary"
                />
                <span>Remember me</span>
              </label>
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Password reset instructions sent to your registered email!");
                }}
                className="text-primary font-semibold hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit CTA Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-primary-fixed text-on-primary-fixed font-bold text-sm shadow-md hover:bg-primary-fixed-dim hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center mt-4"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-on-primary-fixed border-t-transparent rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Registration Redirect */}
          <div className="mt-8 text-center text-xs text-outline">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-bold hover:underline">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
