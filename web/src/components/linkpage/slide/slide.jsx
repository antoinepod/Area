import React from "react";
import './slide.scss';
import imgDiscord from './../assets/discord-logo.png'
import imgTelegram from './../assets/telegram-logo.png'

const proprietes = {

}

const Slideshow = () => {
    return (
        <div className="container">
            <input type="radio" name="images" id="img_discord"></input>
            <input type="radio" name="images" id="img_telegram"></input>
            <div class="slide_img" id="one_discord">
                <img src={imgDiscord}></img>
                <label for="img_telegram" class="prev"></label>
                <label for="img_telegram" class="next"></label>
            </div>
            <div class="slide_img" id="two_telegram">
                <img src={imgTelegram}></img>
                <label for="img_discord" class="prev"></label>
                <label for="img_discord" class="next"></label>
            </div>
            <div class="nav">
                <label class="dots" id="dot1" for="img_discord"></label>
                <label class="dots" id="dot2" for="img_telegram"></label>
            </div>
        </div>
    )
}

export default Slideshow;
