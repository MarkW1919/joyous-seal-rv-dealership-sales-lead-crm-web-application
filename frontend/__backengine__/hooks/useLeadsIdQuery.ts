/*
 * Code generated by Backengine
 *
 * https://backengine.dev
 */

import axios, { RawAxiosRequestHeaders } from "axios";
import { useCallback, useEffect, useState } from "react";

export interface ApiLeadsIdResponse {
  id?: number;
  ContactName?: string;
  Email?: string;
  PhoneNumber?: string;
  InventoryID?: string;
  LeadSource?: string;
  InterestLevel?: number;
  PreviousVisits?: boolean;
  [k: string]: unknown;
}

function useLeadsIdQuery(id: number) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ApiLeadsIdResponse>();

  const headers = (): RawAxiosRequestHeaders => {
    const token = localStorage.getItem("engine-token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchData = useCallback(async () => {
    const url = new URL(`https://backengine-d4x1.fly.dev/api/leads/${id}`);

    const response = await axios.get(url.toString(), {
      headers: headers(),
    });
    setData(response.data);
  }, [id]);

  useEffect(() => {
    setIsLoading(true);
    fetchData()
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [fetchData]);

  return {
    data,
    isError,
    isLoading,
  };
}

export default useLeadsIdQuery;
