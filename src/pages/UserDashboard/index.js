import StatsDashboard from "../../StashDashboard";
import InputBox from "../../component/InputBox";
import React, { useEffect, useState } from "react";
import axios from "axios";
import EventData from "./EventData";
import { sortbyObject } from "../../utils";
import CardForObjectList from "../../component/CardForObjectList";
import YesterdayStatus from "./YesterdayStatus";
import CardList from "../../component/CardList";
import TopNav from "../HeadContainer/TopNav/TopNav";
import UpdateForm from "./UpdateForm/UpdateForm";
import TargetByStatus from "./TargetByStatus";


function UserDashboard() {
  const [inputText, setInputText] = useState("");
  const [receiveObj, setReceiveObj] = useState({});
  // State to store data
  const [resultCountryCounts, setResultCountryCounts] = useState({});
  const [resultAccountCounts, setResultAccountCounts] = useState({});
  const [balancedCountryCounts, setBalancedCountryCounts] = useState({});
  const [balancedAccountCounts, setBalancedAccountCounts] = useState({});
  const [contactedCountriesCounts, setContactedCountriesCounts] = useState({});
  const [yesterdayData, setYesterdayData] = useState({});
  const [chatting_names, setChattingNames] = useState({});
  const [waiting_names, setWaitingNames] = useState({});
  const [accept_names, setAcceptNames] = useState({});
  const [eventByAccount, setEventByAccount] = useState({});
  const [load, setLoad] = useState(false);
  const [updateState, setUpdateState] = useState(false);
  // const api = "https://statistic-dashboard-python-backend.onrender.com"
  const api = "https://analyzer-backend-x6xj.onrender.com"
  const dev_api = "http://127.0.0.1:5000"
  // Fetch data from Flask API
  const fetchData = async () => {
    try {
      if(!load)setLoad(true);
      const response = await axios.get(`${api}/api/result_data`);
      setResultCountryCounts(response.data.run_country_counts);
      setResultAccountCounts(response.data.run_account_counts);
      setBalancedCountryCounts(sortbyObject(response.data.balanced_country_counts));
      setBalancedAccountCounts(sortbyObject(response.data.balanced_account_counts));
      setContactedCountriesCounts(sortbyObject(response.data.contacted_countries_counts));
      setYesterdayData(response.data.y_data)
      setChattingNames(response.data.chatting_names)
      setWaitingNames(response.data.waiting_names)
      setAcceptNames(response.data.accept_names)
      setEventByAccount(response.data.events_by_account)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoad(false);
  };
  

  const handleSearch = async () => {
    const response = await fetch(`${api}/api/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: inputText }),
    });

    const data = await response.json();
    setReceiveObj(data)

  };

  // Example React code
  const updateStatus = async (keyword, new_value) => {
    setLoad(true);
    const response = await fetch(`${api}/api/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword: keyword,
        new_value: new_value,
      }),
    });
    fetchData();
  }

  const newValueOptions = [
    "Run",
    "Accept",
    "Chatting",
    "Waiting",
    "Report/Block",
    "Not Interesting",
    "Try with other way",
    "Busy now",
    "sent message",
    "No reply",
    "No Accepted"];

  useEffect(() => {
    fetchData();

  }, []);
  return (
    <div>
      <TopNav
        onSearch={setInputText}
        onButton1Click={handleSearch}
        onButton2Click={fetchData}
        load={load}
      />
      {/* <div>
        <StatsDashboard data={receiveObj} contactedlist={contactedCountriesCounts} />
      </div> */}
      <div style={{ display: "flex" }}>
        <CardForObjectList data={contactedCountriesCounts} title={"Total Contacted List"} />
        <CardForObjectList data={balancedCountryCounts} title={"Total Balanced by Country List"} />
        <UpdateForm onSubmit={updateStatus} options={newValueOptions} state={updateState} />
      </div>
      <YesterdayStatus stats={yesterdayData} />
      <TargetByStatus
        chatting_names={chatting_names}
        waiting_names={waiting_names}
        accept_names={accept_names}
        onSubmit={updateStatus} 
        loading={load}
      />
      {/* <EventData data={eventByAccount} /> */}
    </div>
  );
}

export default UserDashboard;
