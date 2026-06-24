import { useState } from "react";
import { api } from "../services/api";

export default function TelegramConnect() {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");

  const connectTelegram = async () => {
    try {
      setLoading(true);

      const email =
        localStorage.getItem("userEmail");

      const res = await api.get(
        `/users/telegram-code?email=${email}`
      );

      setCode(res.data.code);
    } catch (error) {
      console.error(error);
      alert(
        "Failed to generate Telegram code."
      );
    } finally {
      setLoading(false);
    }
  };

  const openTelegram = () => {
    window.open(
      "https://web.telegram.org/k/#@weatherguard_alert2026_bot",
      "_blank"
    );
  };

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
                Connect Telegram
              </h1>

              <p className="text-slate-400">
                Link your Telegram account to receive weather alerts
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 p-8 lg:grid-cols-2">

          {/* Left Side */}
          <div>
            <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-5">
              <h2 className="text-lg font-semibold text-green-300">
                ✅ Account Approved
              </h2>

              <p className="mt-2 text-green-100">
                Your access request has been approved.
                Complete Telegram setup to start receiving
                weather notifications.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-6">
              <h3 className="mb-4 text-lg font-semibold">
                Why Connect Telegram?
              </h3>

              <ul className="space-y-3 text-slate-400">
                <li>🌦 Receive weather alerts instantly</li>
                <li>⚡ Real-time severe weather notifications</li>
                <li>🤖 Automated alert delivery</li>
                <li>📱 Accessible from any device</li>
              </ul>
            </div>

            <div className="mt-6 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5">
              <h3 className="font-semibold text-blue-300">
                Telegram Bot
              </h3>

              <div className="mt-3 rounded-xl bg-slate-950 px-4 py-3 font-mono">
                @weatherguard_alert2026_bot
              </div>

              <p className="mt-3 text-sm text-slate-400">
                Search this username manually if Telegram
                doesn't open automatically.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div>
            {!code ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Generate Secure Link Code
                </h2>

                <p className="mb-6 text-slate-400">
                  Generate a unique verification code that
                  will securely link your Telegram account
                  with WeatherGuard.
                </p>

                <button
                  onClick={connectTelegram}
                  disabled={loading}
                  className="w-full rounded-xl bg-blue-600 py-4 font-semibold transition hover:bg-blue-500 disabled:opacity-50"
                >
                  {loading
                    ? "Generating Code..."
                    : "Generate Telegram Code"}
                </button>
              </div>
            ) : (
              <>
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Follow These Steps
                  </h2>

                  <ol className="space-y-4 text-slate-300">
                    <li>
                      <span className="font-semibold text-blue-400">
                        Step 1:
                      </span>{" "}
                      Open the Telegram Bot
                    </li>

                    <li>
                      <span className="font-semibold text-blue-400">
                        Step 2:
                      </span>{" "}
                      Press Start
                    </li>

                    <li>
                      <span className="font-semibold text-blue-400">
                        Step 3:
                      </span>{" "}
                      Send the command below
                    </li>
                  </ol>

                  <div className="mt-6 rounded-xl border border-blue-500/30 bg-blue-500/10 p-5">
                    <p className="mb-3 font-semibold text-blue-300">
                      Send this command:
                    </p>

                    <div className="rounded-lg bg-slate-950 p-4 font-mono text-lg">
                      /link {code}
                    </div>
                  </div>

                  <button
                    onClick={openTelegram}
                    className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-semibold transition hover:bg-blue-500"
                  >
                    Open Telegram Bot
                  </button>
                </div>

                <div className="mt-6 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-5">
                  <p className="font-semibold text-yellow-300">
                    ⚠️ Important
                  </p>

                  <p className="mt-2 text-yellow-100">
                    Do not close or refresh this page until
                    you have sent the command in Telegram.
                    The verification code expires after
                    15 minutes.
                  </p>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  </div>
);
}