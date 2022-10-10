import React, {useState} from 'react'
import './fullSizeCards.scss'
import axios from 'axios'


export default function FullSizecards() {
    const [channelID, setChannelID] = useState("");
    const [chatID, setChatID] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/api/area/yougram`, JSON.stringify({ channelID, chatID }), { headers: { "Content-Type": "application/json" } })
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
          .catch(err => {
            console.log(err.response.data);
          }
          );
        console.log(channelID, chatID);
      };
    
    return (
        <div className="fullSizeCards">
            <form className="cardsForm" onSubmit={handleSubmit}>
                <div className="fontConnect">Connect to your ID</div>
                <input
                    className="cardsInput"
                    type="text"
                    placeholder="Enter your channel ID Youtube"
                    onChange={(e) => setChannelID(e.target.value)}
                />
                <input
                    className="cardsInput"
                    type="text"
                    placeholder="Enter your chat ID Telegram"
                    onChange={(e) => setChatID(e.target.value)}
                />
                <button className="cardsLoginButton" type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}
