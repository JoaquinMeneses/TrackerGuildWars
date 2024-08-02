"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Table from "@mui/joy/Table";
import CircularProgress from "@mui/joy/CircularProgress";

const Home = () => {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${window.location.origin}/api`);
        setServers(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const getArenaName = (mapId) => {
    const number = mapId.replace("guildCropWarsA", "");
    return `Arena ${number}`;
  };

  return (
    <main className="flex flex-col items-center">
      {servers.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th>Arena</th>
              <th>Jugadores</th>
            </tr>
          </thead>
          <tbody>
            {servers.map((server, index) => (
              <tr key={index}>
                <td>{getArenaName(server.room.metadata.mapId)}</td>
                <td>{server.room.clients}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <CircularProgress />
      )}
    </main>
  );
};

export default Home;
