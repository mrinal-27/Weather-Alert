import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../services/api";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedUserRoute({
  children,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    if (!email) {
      setLoading(false);
      return;
    }

    api
      .get(`/users/status?email=${email}`)
      .then((res) => {
        setApproved(
          res.data.status === "approved"
        );
      })
      .catch(() => {
        setApproved(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!approved) {
    return (
      <Navigate
        to="/status"
        replace
      />
    );
  }

  return <>{children}</>;
}