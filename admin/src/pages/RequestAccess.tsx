import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RequestAccess() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const userEmail =
      params.get("email") || "";

    const userName =
      params.get("name") || "";

    setEmail(userEmail);
    setName(userName);

    localStorage.setItem(
      "userEmail",
      userEmail
    );

    localStorage.setItem(
      "userName",
      userName
    );
  }, []);

  const submitRequest = () => {
    setLoading(true);

    setTimeout(() => {
      navigate(
        `/status?email=${encodeURIComponent(
          email
        )}`
      );
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[500px]">
        <h1 className="text-2xl font-bold mb-4">
          Request WeatherGuard Access
        </h1>

        <p className="text-slate-600 mb-6">
          Submit your request for weather alerts.
        </p>

        <div className="border rounded-lg p-4 mb-6">
          <p>
            <strong>Name:</strong> {name}
          </p>

          <p>
            <strong>Email:</strong> {email}
          </p>
        </div>

        <button
          onClick={submitRequest}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? "Submitting..."
            : "Request Access"}
        </button>
      </div>
    </div>
  );
}