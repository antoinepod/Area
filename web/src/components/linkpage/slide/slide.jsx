import React from "react";
// import { Slide } from 'react-slideshow-image'
import './slide.scss';
import imgYoutube from './../assets/youtube.png'
import imgTwitch from './../assets/twitch.png'

const proprietes = {

}

const Slideshow = () => {
    return (
        <div className="containerSlide">
            <Slide {...proprietes}>
                <div className="each-slide">
                    <div>
                        <img src={imgYoutube} alt="imgYoutube"/>
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                        <img src={imgTwitch} alt="imgTwitch"/>
                    </div>
                </div>
            </Slide>
        </div>
    )
}

export default Slideshow;
