// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleLogin = () => {
//     if (
//       email === "admin@weatherguard.com" &&
//       password === "Admin@123"
//     ) {
//       localStorage.setItem(
//         "adminToken",
//         "adminLoggedIn"
//       );

//       navigate("/dashboard");
//     } else {
//       alert("Invalid Admin Credentials");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-100">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">
//         <h1 className="text-3xl font-bold text-center mb-2">
//           Admin Login
//         </h1>

//         <p className="text-center text-slate-500 mb-6">
//           WeatherGuard Admin Portal
//         </p>

//         <input
//           type="email"
//           placeholder="Admin Email"
//           value={email}
//           onChange={(e) =>
//             setEmail(e.target.value)
//           }
//           className="w-full border rounded-lg px-4 py-3 mb-4"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) =>
//             setPassword(e.target.value)
//           }
//           className="w-full border rounded-lg px-4 py-3 mb-6"
//         />

//         <button
//           onClick={handleLogin}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (
      email === "admin@weatherguard.com" &&
      password === "Admin@123"
    ) {
      localStorage.setItem(
        "adminToken",
        "adminLoggedIn"
      );

      navigate("/dashboard");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        
        {/* Left Section */}
        <div className="flex flex-1 flex-col justify-center px-8 py-12 md:px-16 lg:px-20">
          <div className="mb-6 inline-flex w-fit rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
            Admin Control Center
          </div>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Manage WeatherGuard
            <span className="block text-emerald-400">
              User Approvals & Alerts
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Review access requests, approve trusted users,
            manage Telegram integrations, and monitor the
            WeatherGuard alert system from a centralized
            administration dashboard.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="mb-2 text-2xl">👥</div>
              <h3 className="font-semibold">
                User Management
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Review and approve access requests from new users.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="mb-2 text-2xl">🤖</div>
              <h3 className="font-semibold">
                Telegram Alerts
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Deliver weather notifications directly through Telegram.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="mb-2 text-2xl">🌦️</div>
              <h3 className="font-semibold">
                Weather Monitoring
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Automated weather tracking and alert scheduling.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-1 items-center justify-center px-8 py-12">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-2xl font-bold">
                WG
              </div>

              <h2 className="text-3xl font-bold">
                Admin Login
              </h2>

              <p className="mt-2 text-slate-400">
                Sign in to access the WeatherGuard dashboard
              </p>
            </div>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
              />

              <button
                onClick={handleLogin}
                className="w-full rounded-xl bg-emerald-600 py-3 font-semibold transition hover:bg-emerald-500"
              >
                Login to Dashboard
              </button>
            </div>

           

            <p className="mt-6 text-center text-xs text-slate-500">
              WeatherGuard Admin Portal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}