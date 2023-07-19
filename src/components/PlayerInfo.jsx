import React from "react";

export default function PlayerInfo({
  playerData,
  makeEditable,
  setEditPlayer,
}) {
  return (
    <div className="player-data-container">
      {playerData.length > 0 ? (
        playerData.map((player, index) => {
          return (
            <div key={index + 1}>
              <h2>Player {index + 1}</h2>
              <p>Name: {player.name}</p>
              <p>Position: {player.position}</p>
              <button
                onClick={(e) => {
                  setEditPlayer({
                    id: index,
                    name: player.name,
                    position: player.position,
                  });
                }}
              >
                Edit
              </button>
            </div>
          );
        })
      ) : (
        <div>No Player Data</div>
      )}
    </div>
  );
}
