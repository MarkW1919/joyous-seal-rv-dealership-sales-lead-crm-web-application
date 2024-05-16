/*
 * Code generated by Backengine
 *
 * https://backengine.dev
 */

import axios, { RawAxiosRequestHeaders } from "axios";
import { useState } from "react";

export type ApiApiIntegrationsIdResponse = void;

function useApiIntegrationsIdDeleteMutation() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const headers = (): RawAxiosRequestHeaders => {
    const token = localStorage.getItem("engine-token");
    const defaultHeaders = {
      "Content-Type": "application/json",
    };
    return token
      ? {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        }
      : defaultHeaders;
  };

  const execute = async (id: number): Promise<ApiApiIntegrationsIdResponse> => {
    setIsLoading(true);
    setIsError(false);

    const url = new URL(
      `https://backengine-d4x1.fly.dev/api/api/integrations/${id}`,
    );

    try {
      await axios.delete<ApiApiIntegrationsIdResponse>(url.toString(), {
        headers: headers(),
      });
    } catch (error) {
      setIsError(true);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    execute,
    isError,
    isLoading,
  };
}

export default useApiIntegrationsIdDeleteMutation;
