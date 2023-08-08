import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const options = {
  method: "GET",
  url: "https://api.themoviedb.org/3/discover/movie",
  params: { page: "" },
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOWM4ZmVhNmNkZmNmYjgyYzk4YTZiYzdiMWNhNjEzZCIsInN1YiI6IjY0YmYyYjgzYmIwNzBkMDIzN2Q3Y2JkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.naYcue26Gwm12HBxTyVVLQNVkiYwKzK6LBnzxIyt4xM",
  },
};

const useFetch = (url, pageid) => {
  const options = {
    method: "GET",
    url: url,
    params: { page: pageid },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOWM4ZmVhNmNkZmNmYjgyYzk4YTZiYzdiMWNhNjEzZCIsInN1YiI6IjY0YmYyYjgzYmIwNzBkMDIzN2Q3Y2JkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.naYcue26Gwm12HBxTyVVLQNVkiYwKzK6LBnzxIyt4xM",
    },
  };
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const response = async () => {
    try {
      const { data: getData } = await axios.request(options);
      setData(getData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    response();
  }, []);

  return { data, loading };
};

export default useFetch;
