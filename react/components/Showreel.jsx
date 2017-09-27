import React from 'react';

export default function Showreel(props){
    return(
        <div>
            <h2 className="sub-header">{props.title} - {props.year}</h2><hr />
            <div id="yt-showreel-wrapper">
                <iframe src={props.link} frameBorder="0" allowFullScreen></iframe>
            </div>
        </div>
    )
}