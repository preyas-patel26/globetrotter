import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Camera, ArrowRight, Compass, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    city: '',
    country: 'United States',
    additionalInfo: '',
  });

  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      setError('Please complete all required name and email fields.');
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please re-enter your password.');
      return;
    }

    const success = register({
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      password: formData.password,
      phone: formData.phone.trim(),
      city: formData.city.trim(),
      country: formData.country,
    });

    if (success) {
      navigate('/dashboard');
    } else {
      setError('An account with this email address already exists. Please login instead.');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-background">
      {/* Left 45% - Scenic Hero Image Panel */}
      <div className="relative w-full md:w-5/12 min-h-[320px] md:min-h-screen bg-on-surface overflow-hidden flex flex-col justify-between p-8 md:p-12 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-85 scale-105 transition-transform duration-10000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1600&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/40 to-transparent" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <span className="font-headline font-extrabold text-2xl tracking-tight text-white">
            GlobeTrotter
          </span>
        </div>

        <div className="relative z-10 max-w-md my-auto md:my-0">
          <h2 className="font-headline font-extrabold text-3xl md:text-4xl text-white leading-tight mb-4 drop-shadow-md">
            Begin Your Adventure.
          </h2>
          <p className="text-white/90 font-light text-base md:text-lg leading-relaxed">
            Join the world's most premium travel network. Create your account, personalize multi-city journeys, and manage budgets in style.
          </p>
        </div>
      </div>

      {/* Right 55% - Register Form Glass Card */}
      <div className="w-full md:w-7/12 flex items-center justify-center p-6 md:p-10 bg-gradient-to-br from-surface via-background to-surface-container-low overflow-y-auto">
        <div className="w-full max-w-xl glass-card-elevated rounded-3xl p-8 md:p-10 shadow-2xl border border-outline-variant/30 my-6">
          <div className="text-center mb-6">
            <h2 className="font-headline font-extrabold text-2xl text-on-surface">Create Account</h2>
            <p className="text-outline text-sm mt-1">Start your travel journey today.</p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-error-container/40 border border-error/30 text-error text-xs font-medium">
              {error}
            </div>
          )}

          {/* Profile Photo Upload Placeholder */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="relative group cursor-pointer">
              <div className="w-18 h-18 rounded-full bg-surface-container-high flex items-center justify-center text-outline border-2 border-dashed border-outline-variant group-hover:border-primary transition-colors p-4">
                <Camera className="w-7 h-7 text-outline group-hover:text-primary transition-colors" />
              </div>
            </div>
            <span className="text-xs text-outline mt-1.5 font-medium">Upload Profile Photo</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface uppercase tracking-wider mb-1.5">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Jane"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface uppercase tracking-wider mb-1.5">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-on-surface uppercase tracking-wider mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jane.doe@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                required
              />
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface uppercase tracking-wider mb-1.5">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface uppercase tracking-wider mb-1.5">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40"
                  required
                />
              </div>
            </div>

            {/* Phone Number & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface uppercase tracking-wider mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Seattle"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </div>

            {/* Country Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-on-surface uppercase tracking-wider mb-1.5">
                Country
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="United States">United States</option>
                <option value="India">India</option>
                <option value="France">France</option>
                <option value="Japan">Japan</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
              </select>
            </div>

            {/* Additional Info */}
            <div>
              <label className="block text-xs font-semibold text-on-surface uppercase tracking-wider mb-1.5">
                Additional Info
              </label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                rows={2}
                placeholder="Tell us about your travel preferences..."
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-md hover:bg-primary-dim hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 mt-4"
            >
              <span>Register Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Login Redirect */}
          <div className="mt-6 text-center text-xs text-outline">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
