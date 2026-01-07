import React from "react";
import "./CardList.css"; // custom CSS file
import SimpleCountryClock from "./simplecountryclock";

const CardList = ({ data, title, description }) => {
  if (!data || Object.keys(data).length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div className="cardlist-list">
      <div className="cardlist-list-title">
        <h2>{title}</h2>
        {description && (
          <div style={{ fontSize: "14px", color: "gray" }}>{description}</div>
        )}
      </div>
      {Object.entries(data).map(([account, obj]) => (
        account && (
          <div className="cardlist" key={account}>
            <h3 className="cardlist-title">{account}</h3>
            <ul className="cardlist-content">
              {obj.country.map((country, index) => {
                const name = obj.name[index];
                return (
                  <li key={index}>
                    {name} <SimpleCountryClock countries={country} />
                  </li>
                );
              })}
            </ul>
          </div>
        )
      ))}
    </div>
  );
};

export default CardList;
