import { fetchDB } from "../api/utilis";
import { useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";

export default function useAccount<R>(params: object = {}): { account: R } {

  const [account, setAccount] = useState<R>({} as R);

  useEffect(() => {
    const getAccount = async () => {
      const url = `http://localhost:3333/api/account/`;
      const response = await fetchDB<R>(url, params, "POST");
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
