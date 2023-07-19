import React, { useState } from "react";

export default function AddPlayerForm({
  newPlayer,
  handleSubmit,
  handleChange,
}) {
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="nameInput">Player Name: </label>
        <input
          id="nameInput"
          name="name"
          type="text"
          placeholder="Enter Player Name"
          onChange={(e) => handleChange(e)}
          value={newPlayer.name}
        />
        <br />
        <label htmlFor="positionInput">Position: </label>
        <input
          id="positionInput"
          name="position"
          type="text"
          placeholder="Enter Position"
          onChange={(e) => handleChange(e)}
          value={newPlayer.position}
        />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
}
