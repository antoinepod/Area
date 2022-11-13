import React, { useEffect, useState } from "react";
import axios from "axios";
import './createpage.scss';

import Header from "../Header/Header";

export default function Createpage({ data }) {
  const user = localStorage.getItem("user");
  const [action, setAction] = useState("");
  const [reaction, setReaction] = useState("");
  const [dataAction, setDataAction] = useState("");
  const [dataReaction, setDataReaction] = useState("");


  useEffect(() => {
    switchAction();
    switchReaction();
  }, []);

  const handleSubmit = () => {
    // alert(data.username);
    if (action === "" || reaction === "") {
      alert("Please fill all the fields");
    } else {
      axios.post(`http://localhost:8080/api/area/create`, {
        "username": user,
        "action": action,
        "action_data": dataAction,
        "reaction": reaction,
        "reaction_data": dataReaction
      })
        .then(res => {
          console.log(res);
          console.log(res.data);
          alert("Area created");
          // window.location.href = '/'
        })
        .catch(err => {
          alert(err);
          console.log(err);
        }
        );
    }
  }

  console.log(dataAction, dataReaction, action, reaction);

  const switchAction = () => {
    switch (action) {
      default:
        return <div style={{ color: 'white' }}>No input required</div>;
      case "A youtuber posts a new video":
        return (<>
          <span style={{ color: 'white' }}>Go to your favourite <a href={"https://www.youtube.com/"} target="_blank"> Youtube </a> Channel and paste the link</span>
          <input type={"text"} placeholder={"Youtube Channel link"} onChange={(e) => setDataAction(e.target.value)} />
        </>)
      case "It starts/stops freezing":
        return (
          <>
            <span style={{ color: 'white' }}>Please type the name of your city</span>
            <input type={"text"} placeholder={"Name of your city"} onChange={(e) => setDataAction(e.target.value)} />
          </>)
      case "It starts/stops raining":
        return (<>
          <span style={{ color: 'white' }}>Please type the name of your city</span>
          <input type={"text"} placeholder={"Name of your city"} onChange={(e) => setDataAction(e.target.value)} />
        </>)
    }
  }

  const switchReaction = () => {
    switch (reaction) {
      default:
        return (<>
          <div style={{ color: 'white' }}>No input required</div>
        </>);
      case "Send you a private message":
        return (<><span style={{ color: 'white' }}>Send /getmyid in this <a href={"https://discord.gg/YadBxFVjrb"} target="_blank"> Discord Server</a> to get your discord id</span>
          <input type={"text"} placeholder={"your discord ID"} onChange={(e) => setDataReaction(e.target.value)} /></>)
      case "Area's bot sends you a message":
        return (<><span style={{ color: 'white' }}>Send /getmyid in this <a href={"https://discord.gg/YadBxFVjrb"} target="_blank"> Discord Server</a> to get your discord id</span>
           <input type={"text"} placeholder={"Telegram Chat ID"} onChange={(e) => setDataReaction(e.target.value)} /> </>
           );
      case "Send a message in the general channel with your @":
        return (<><span style={{ color: 'white' }}>Send /getmyid in this <a href={"https://discord.gg/YadBxFVjrb"} target="_blank"> Discord Server</a> to get your discord id</span>
          <input type={"text"} placeholder={"your discord ID"} onChange={(e) => setDataReaction(e.target.value)} /></>)
    }
  }

  return (
    <div className="createPage">
      <Header />
      <div className="cardsContainer">
        <form className="createpageForm" onSubmit={handleSubmit}>
          <label style={{
            color: "white",
          }}>
            Choose your Action
            <select value={action} onChange={(e) => setAction(e.target.value)}>
              <option value="">--Please choose an option--</option>
              <option value="A youtuber posts a new video">Get Last video from Youtube channel</option>
              <option value="Get last race results">Result Of the latest F1 race </option>
              <option value="Astronomy picture of the day is available">Get the picture of the day from the NASA</option>
              <option value="It starts/stops freezing">Be aware when the temperature is below 0 degree</option>
              <option value="It starts/stops raining">Be aware when it's raining in your city </option>
            </select>
          </label>
          {switchAction()}
          <br />
          <label style={{
            color: "white",
          }}>
            Choose your Reaction
            <select value={reaction} onChange={(e) => setReaction(e.target.value)}>
              <option value="">--Please choose an option--</option>
              <option value="Send you a private message">Get private message on Discord</option>
              <option value="Area's bot sends you a message">Get private message on Telegram</option>
              <option value="Send a message in the general channel with your @">Send a message in a Discord general channel</option>
            </select>
          </label>
          {switchReaction()}
          <input type="submit" className="submitbtn" value="Create Your Area" />
        </form>
      </div>
    </div>
  );
}

