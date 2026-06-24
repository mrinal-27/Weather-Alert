export default function Login() {
  const handleGoogleLogin = () => {
    window.location.href =
  `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        
        {/* Left Section */}
        <div className="flex flex-1 flex-col justify-center px-8 py-12 md:px-16 lg:px-20">
          <div className="mb-6 inline-flex w-fit rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            WeatherGuard Alert Platform
          </div>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Secure Weather Alerts
            <span className="block text-blue-400">
              Through Admin Approval
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            WeatherGuard is an invite-only weather alert platform.
            Users request access through Google Sign-In, administrators
            review requests, and approved users receive automated
            weather notifications directly through Telegram.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="mb-2 text-2xl">🔐</div>
              <h3 className="font-semibold">
                Secure Access
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Google OAuth authentication with admin approval workflow.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="mb-2 text-2xl">📡</div>
              <h3 className="font-semibold">
                Weather Monitoring
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Scheduled weather checks with automated alert delivery.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="mb-2 text-2xl">🤖</div>
              <h3 className="font-semibold">
                Telegram Alerts
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Receive weather notifications instantly through Telegram.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-1 items-center justify-center px-8 py-12">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold">
                WG
              </div>

              <h2 className="text-3xl font-bold">
                Welcome
              </h2>

              <p className="mt-2 text-slate-400">
                Sign in to request access to WeatherGuard
              </p>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-4 text-lg font-semibold transition hover:bg-blue-500"
            >
              Continue with Google
            </button>

            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm text-slate-400">
                After signing in:
              </p>

              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li>✓ Submit access request</li>
                <li>✓ Await administrator approval</li>
                <li>✓ Connect with Telegram Bot</li>
                <li>✓ Receive automated weather alerts</li>
              </ul>
            </div>

            <p className="mt-6 text-center text-xs text-slate-500">
              WeatherGuard Admin Assessment Project
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}