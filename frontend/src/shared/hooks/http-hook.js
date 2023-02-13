/* eslint-disable max-len */
import axios from "axios";
import {
  useState, useCallback, useRef, useEffect
} from "react";

export default function useHttpClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(async (
    url,
    method = "GET",
    data = { email: "test", password: "tester" },
    headers = {}
  ) => {
    setIsLoading(true);
    const httpAbortCtrl = new AbortController();
    activeHttpRequests.current.push(httpAbortCtrl);
    try {
      const responseData = await axios.request(url, {
        method,
        data,
        headers,
        signal: httpAbortCtrl.signal
      });

      activeHttpRequests.current = activeHttpRequests.current.filter((reqCtrl) => reqCtrl !== httpAbortCtrl);

      if (responseData.status !== 200) {
        throw new Error(responseData.message);
      }

      setIsLoading(false);
      return responseData;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return false;
    }
  }, []);

  const clearError = () => {
    setError(null);
  };

  useEffect(() => () => {
    activeHttpRequests.current.forEach(((abortCtrl) => abortCtrl.abort()));
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
    clearError
  };
}
