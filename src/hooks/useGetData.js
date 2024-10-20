import { useEffect, useState } from "react";
import { API_URL } from "../utils/constants";
import axios from "axios";

export const useGetData = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      const {
        status,
        data: { data },
      } = response;

      if (status === 200) {
        setData(data);
        setFilteredData(data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, filteredData, setFilteredData, loading, error };
};
