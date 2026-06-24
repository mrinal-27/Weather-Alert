
import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { User } from "../types/user";

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const pendingRes = await api.get("/admin/pending");
      const approvedRes = await api.get("/admin/approved");
      const rejectedRes = await api.get("/admin/rejected");

      setUsers(pendingRes.data);
      setApprovedCount(approvedRes.data.length);
      setRejectedCount(rejectedRes.data.length);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const approveUser = async (id: string) => {
    try {
      setLoading(true);

      await api.patch(`/admin/approve/${id}`);

      setToast("✅ User approved successfully");

      await fetchUsers();

      setTimeout(() => {
        setToast("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const rejectUser = async (id: string) => {
    try {
      setLoading(true);

      await api.patch(`/admin/reject/${id}`);

      setToast("❌ User rejected");

      await fetchUsers();

      setTimeout(() => {
        setToast("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const totalUsers =
    users.length + approvedCount + rejectedCount;

return (
  <div className="min-h-screen bg-slate-950 text-white">
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-10">
        <div className="mb-3 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
          Admin Dashboard
        </div>

        <h1 className="text-4xl font-bold">
          WeatherGuard Control Center
        </h1>

        <p className="mt-2 text-slate-400">
          Review access requests, manage users and monitor platform activity.
        </p>
      </div>

      {/* Toast */}
      {toast && (
        <div className="mb-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-emerald-300">
          {toast}
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-400 text-sm">
            Total Users
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {totalUsers}
          </h2>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-400 text-sm">
            Pending Requests
          </p>

          <h2 className="mt-3 text-4xl font-bold text-yellow-400">
            {users.length}
          </h2>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-400 text-sm">
            Approved Users
          </p>

          <h2 className="mt-3 text-4xl font-bold text-emerald-400">
            {approvedCount}
          </h2>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-400 text-sm">
            Rejected Users
          </p>

          <h2 className="mt-3 text-4xl font-bold text-red-400">
            {rejectedCount}
          </h2>
        </div>

      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">

        <div className="border-b border-slate-800 px-6 py-5">
          <h2 className="text-xl font-semibold">
            Pending Requests
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Review and approve user access requests.
          </p>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400">
            Loading users...
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-5xl mb-4">
              🎉
            </div>

            <h3 className="text-xl font-semibold">
              No Pending Requests
            </h3>

            <p className="mt-2 text-slate-400">
              All user requests have been reviewed.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">

                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-sm font-semibold">
                    <th className="text-left px-6 py-4">
                      Name
                    </th>

                    <th className="text-left px-6 py-4">
                      Email
                    </th>

                    <th className="text-left px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                    >
                      <td className="px-6 py-4 font-medium text-white">
                        {user.name}
                      </td>

                      <td className="px-6 py-4 text-slate-400">
                        {user.email}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex gap-3">

                          <button
                            onClick={() =>
                              approveUser(user._id)
                            }
                            className="rounded-xl bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-500"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              rejectUser(user._id)
                            }
                            className="rounded-xl bg-red-600 px-4 py-2 text-white transition hover:bg-red-500"
                          >
                            Reject
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            {/* Mobile */}
            <div className="md:hidden p-4 space-y-4">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
                >
                  <h3 className="font-semibold text-white">
                    {user.name}
                  </h3>

                  <p className="text-sm text-slate-400 mt-1">
                    {user.email}
                  </p>

                  <div className="flex gap-2 mt-4">

                    <button
                      onClick={() =>
                        approveUser(user._id)
                      }
                      className="flex-1 rounded-xl bg-emerald-600 py-2 text-white"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        rejectUser(user._id)
                      }
                      className="flex-1 rounded-xl bg-red-600 py-2 text-white"
                    >
                      Reject
                    </button>

                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  </div>
);
}

