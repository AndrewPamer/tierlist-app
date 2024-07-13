"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import LoadingSpinner from "../LoadingSpinner";
const AuthContext = createContext();

export function getAuthContext() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  useEffect(() => {
    async function getUserData() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUserData(user);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    getUserData();
  }, []);

  return (
    <AuthContext.Provider value={userData}>
      {loading ? <LoadingSpinner>Loading User...</LoadingSpinner> : children}
    </AuthContext.Provider>
  );
}
