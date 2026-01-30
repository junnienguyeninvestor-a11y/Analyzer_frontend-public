import React from "react";
import "./CardList.css"; // custom CSS file
import SimpleCountryClock from "./simplecountryclock";
import { copyToClipboard } from "../utils/handleclipboard";

const CardList = ({ data, title, description, onSubmit,loading }) => {
  if (!data || Object.keys(data).length === 0) {
    return <p>No data available</p>;
  }

const handleNoReply = (name) => {
  onSubmit(name, 'No reply')
}

const handleNotInterested = (name) => {
  onSubmit(name, 'Not interesting/Know scam')
}

const handleClick = (name) =>{
  if(title==='Accept'){onSubmit(name, 'Chatting')}
  else if(title==='Chatting'){onSubmit(name, 'Waiting')}
  else if(title==='Waiting'){onSubmit(name, 'Run')}
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
            <h3 className="cardlist-title">{account}{" | "}{obj.name.length}{" People"}</h3>
            <ul className="cardlist-content">
              {obj.country.map((country, index) => {
                const name = obj.name[index];
                return (
                  <li key={index}>
                    <label onClick={()=>copyToClipboard(name)} className="label-hover">{name}</label> 
                    <SimpleCountryClock countries={country} /> 
                    <input type="button" value="done" onClick={()=>handleClick(name)} disabled={loading?true:false}/>
                    <input type="button" value="No Reply" onClick={()=>{handleNoReply(name)}} disabled={loading?true:false}/>
                    <input type="button" value="Not Interested" onClick={()=>{handleNotInterested(name)}} disabled={loading?true:false}/>
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
