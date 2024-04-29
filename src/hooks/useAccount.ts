import { fetchData } from "../api/utilis";
import { useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";

export default function useAccount<R>(endPoint: string = "", params: object = {}): { account: R } {
  const auth = useAppSelector((state) => state.auth);

  const [account, setAccount] = useState<R>({} as R);

  useEffect(() => {
    const getAccount = async () => {
      const url = `https://api.themoviedb.org/3/account/${auth.account_id}${endPoint ? `/${endPoint}` : ""}`;
      const response = await fetchData<R>(url, params);
      if (response) {
        return response;
      } else {
        return null;
      }
    };

    getAccount().then((data) => {
      if (data) {
        setAccount(data);
      } else {
        setAccount({} as R);
      }
    });
  }, []);

  return { account };
}
