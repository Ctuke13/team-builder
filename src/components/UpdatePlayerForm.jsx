import React, { useState } from "react";

export default function AddPlayerForm({
  newPlayer,
  handleSubmit,
  handleChange,
  editedPlayer,
  changePlayerData,
  updatePlayer,
}) {
  return (
    <div className="form-container">
      <form onSubmit={updatePlayer}>
        <label htmlFor="nameInput">Player Name: </label>
        <input
          id="nameInput"
          name="name"
          type="text"
          placeholder="Enter Player Name"
          onChange={(e) => changePlayerData(e)}
          value={editedPlayer.name}
        />
        <br />
        <label htmlFor="positionInput">Position: </label>
        <input
          id="positionInput"
          name="position"
          type="text"
          placeholder="Enter Position"
          onChange={(e) => changePlayerData(e)}
          value={editedPlayer.position}
        />
        <br />
        <button>Update</button>
      </form>
    </div>
  );
}
