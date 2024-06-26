/*
 * Code generated by Backengine
 *
 * https://backengine.dev
 */

import axios from "axios";
import { useState } from "react";

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
};

function useLoginMutation() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = async ({ email, password }: LoginRequest): Promise<void> => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await axios.post<LoginResponse>(
        `https://backengine-d4x1.fly.dev/api/login`,
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      if (response.data.accessToken) {
        localStorage.setItem("engine-token", response.data.accessToken);
      }
    } catch (error) {
      setIsError(true);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isError,
    isLoading,
  };
}

export default useLoginMutation;
