import React from 'react';

export default function ClientAreaPlaylist(props){

    const {title, genre, year, director, link} = props;

    return(
        <li>
            <div className="bg-iframe spinner">
                <div className="bg-iframe-info">
                    <h5>{title}</h5>
                    <p>
                        {genre &&
                            <span>{genre}, </span>
                        }
                        {year}
                    </p>
                    {director &&
                        <p>Directed by {director}</p>
                    }
                </div>
                <iframe id={title} src={link}></iframe>
            </div>
        </li>
    )
}