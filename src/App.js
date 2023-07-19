import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "styled-components";

import PlayerInfo from "./components/PlayerInfo";
import AddPlayerForm from "./components/AddPlayerForm";
import UpdatePlayerForm from "./components/UpdatePlayerForm";

function App() {
  const [playerData, setPlayerData] = useState([]);
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    position: "",
  });
  const [editedPlayer, setEditPlayer] = useState("");

  const handleChange = (e) => {
    setNewPlayer({
      ...newPlayer,
      [e.target.name]: e.target.value,
    });
    console.log(newPlayer);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const player = {
      name: newPlayer.name,
      position: newPlayer.position,
    };
    console.log(newPlayer.name, newPlayer.position);
    console.log("handle submit");
    setPlayerData((prevPlayerData) => {
      if (Array.isArray(prevPlayerData)) {
        return [...prevPlayerData, player];
      } else {
        return [player];
      }
    });

    setNewPlayer({
      name: "",
      position: "",
    });
  };

  const changePlayerData = (e) => {
    e.preventDefault();
    let newEntry = {
      ...editedPlayer,
      [e.target.name]: e.target.value,
    };
    setEditPlayer(newEntry);
  };

  const updatePlayer = (e) => {
    e.preventDefault();
    const playerDataCopy = [...playerData];
    playerDataCopy[editedPlayer.id] = editedPlayer;
    setPlayerData(playerDataCopy);
  };

  const HeadingStyled = styled.h1`
    color: green;
    text-shadow: 1px 1px 2px black;
  `;

  const fetchData = () => {
    axios
      .get(
        "http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2023/teams/20?lang=en&region=us"
      )
      .then((res) => {
        const parentData = res.data;
        const athletesRef = parentData.athletes.$ref;

        axios
          .get(athletesRef)
          .then((athletesRes) => {
            const athletesData = athletesRes.data;
            const players = athletesData.items.map((item) => {
              return axios.get(item.$ref).then((playerRes) => {
                const player = playerRes.data;
                return {
                  name: player.fullName,
                  position: player.position.displayName,
                };
              });
            });

            Promise.all(players)
              .then((completedPlayers) => {
                console.log("reached this line");
                setPlayerData(completedPlayers);
              })
              .catch((err) => {
                console.error("Error in Promise.all:", err);
              });
          })
          .catch((err) => {
            console.error("Error fetching athletes data:", err);
          });
      })
      .catch((err) => {
        console.log("Error fetching parent data:", err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <HeadingStyled>New York Jets Players</HeadingStyled>
      {editedPlayer ? (
        <UpdatePlayerForm
          changePlayerData={changePlayerData}
          editedPlayer={editedPlayer}
          setEditPlayer={setEditPlayer}
          updatePlayer={updatePlayer}
        />
      ) : (
        <AddPlayerForm
          newPlayer={newPlayer}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}

      <PlayerInfo setEditPlayer={setEditPlayer} playerData={playerData} />
    </div>
  );
}

export default App;
