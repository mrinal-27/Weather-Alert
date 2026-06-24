import { useEffect, useState } from "react";
import { api } from "../services/api";

interface UserStatus {
  name: string;
  email: string;
  status: string;
}

export default function Status() {
  const [user, setUser] = useState<UserStatus | null>(null);

useEffect(() => {
  const params = new URLSearchParams(
    window.location.search
  );

  const email = params.get("email");

if (!email) return;

localStorage.setItem(
  "userEmail",
  email
);

  const fetchStatus = () => {
    api
      .get(`/users/status?email=${email}`)
      .then((res) => setUser(res.data));
  };

  fetchStatus();

  const interval = setInterval(
    fetchStatus,
    5000
  );

  return () => clearInterval(interval);
}, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

return (
  <div className="min-h-screen bg-slate-950 text-white">
    <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10">
      <div className="w-full max-w-5xl rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="border-b border-slate-800 px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold">
              WG
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                WeatherGuard
              </h1>

              <p className="text-slate-400">
                Account Access Status
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 p-8 lg:grid-cols-2">

          {/* User Information */}
          <div>
            <h2 className="mb-6 text-xl font-semibold">
              User Information
            </h2>

            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-sm text-slate-400">
                  Full Name
                </p>

                <p className="mt-1 text-lg font-medium">
                  {user.name}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-sm text-slate-400">
                  Email Address
                </p>

                <p className="mt-1 text-lg font-medium break-all">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <h3 className="font-semibold mb-3">
                How WeatherGuard Works
              </h3>

              <ul className="space-y-2 text-sm text-slate-400">
                <li>✓ Sign in with Google</li>
                <li>✓ Request access</li>
                <li>✓ Admin reviews request</li>
                <li>✓ Connect Telegram bot</li>
                <li>✓ Receive automated weather alerts</li>
              </ul>
            </div>
          </div>

          {/* Status Section */}
          <div>
            <h2 className="mb-6 text-xl font-semibold">
              Request Status
            </h2>

            {user.status === "pending" && (
              <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6">
                <div className="text-4xl mb-4">⏳</div>

                <h3 className="text-xl font-semibold text-yellow-300">
                  Pending Approval
                </h3>

                <p className="mt-3 text-yellow-100">
                  Your request has been submitted successfully.
                  An administrator will review your application shortly.
                </p>
              </div>
            )}

            {user.status === "approved" && (
              <>
                <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-6">
                  <div className="text-4xl mb-4">✅</div>

                  <h3 className="text-xl font-semibold text-green-300">
                    Access Approved
                  </h3>

                  <p className="mt-3 text-green-100">
                    Your account has been approved and is ready
                    to receive weather notifications.
                  </p>
                </div>

                <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-6">
                  <h3 className="mb-4 text-lg font-semibold">
                    Connect Telegram
                  </h3>

                  <p className="mb-4 text-slate-400">
                    Connect your Telegram account to start
                    receiving automated weather alerts.
                  </p>

                  <a
                    href="/telegram"
                    className="block rounded-xl bg-blue-600 px-4 py-3 text-center font-medium transition hover:bg-blue-500"
                  >
                    Connect Telegram Bot
                  </a>
                </div>

                <div className="mt-6 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-6">
                  <h3 className="font-semibold text-blue-300">
                    Telegram Bot Username
                  </h3>

                  <div className="mt-3 rounded-xl bg-slate-950 px-4 py-3 font-mono">
                    @weatherguard_alert2026_bot
                  </div>

                  <p className="mt-3 text-sm text-slate-400">
                    Search this username directly in Telegram if
                    the bot page doesn't open automatically.
                  </p>
                </div>
              </>
            )}

            {user.status === "rejected" && (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
                <div className="text-4xl mb-4">❌</div>

                <h3 className="text-xl font-semibold text-red-300">
                  Request Rejected
                </h3>

                <p className="mt-3 text-red-100">
                  Unfortunately your access request was not
                  approved at this time. Please contact the
                  administrator for more information.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);
}