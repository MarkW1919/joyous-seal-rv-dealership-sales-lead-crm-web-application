/*
 * Code generated by Backengine
 *
 * https://backengine.dev
 */

import axios, { RawAxiosRequestHeaders } from "axios";
import { useCallback, useEffect, useState } from "react";

export type ApiDashboardDatumResponse = void;

function useDashboardDataQuery() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ApiDashboardDatumResponse>();

  const headers = (): RawAxiosRequestHeaders => {
    const token = localStorage.getItem("engine-token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchData = useCallback(async () => {
    const url = new URL(`https://backengine-d4x1.fly.dev/api/dashboard/data`);

    const response = await axios.get(url.toString(), {
      headers: headers(),
    });
    setData(response.data);
  }, []);

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

export default useDashboardDataQuery;
