import React, { useState } from "react";
import { copyToClipboard } from "../../../utils/handleclipboard";
import "./TopNav.css";

const Topbar = ({ onSearch, onButton1Click, onButton2Click, load, scenario }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  const scenario1 = () => {
    copyToClipboard(scenario.scenario[0])
  }
  const scenario2 = () => {
    copyToClipboard(scenario.scenario[1])
  }
  const scenario3 = () => {
    copyToClipboard(scenario.scenario[2])
  }

  return (
    <div className="topbar">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          🔍
        </button>
      </form>

      <div className="topbar-buttons">
        <button className="topbar-btn" onClick={onButton1Click}>
          Search
        </button>
        <button className="topbar-btn" onClick={onButton2Click}>
          {!load ? "Reload" : "Loading..."}
        </button>
        <button className="topbar-btn" onClick={scenario1}>{!load ? "Greeting" : "Loading..."}</button>
        <button className="topbar-btn" onClick={scenario2}>{!load ? "Expalain" : "Loading..."}</button>
        <button className="topbar-btn" onClick={scenario3}>{!load ? "Hiring" : "Loading..."}</button>
      </div>
    </div>
  );
};

export default Topbar;
