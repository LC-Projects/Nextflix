import { useEffect, useState } from "react";

export interface AuthenticationI {
    userId: number
    id: number
    title: string
    completed: boolean
}

export const useAuthentication = (api_key: string) => {
  const [session, setSession] = useState<AuthenticationI | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const getSession = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/authentication?api_key=${api_key}`
        );
        setSession(await response.json());
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getSession();
  }, []);

  return { session, loading };
};
