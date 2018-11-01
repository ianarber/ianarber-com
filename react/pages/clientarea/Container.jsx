import React from 'react';

import Unauthorized from '../../components/Unauthorized';
import Showreel from '../../components/Showreel';
import ClientAreaPlaylist from '../../components/ClientAreaPlaylist';
import Spinner from '../../components/Spinner';
import ajax from '../../scripts/ContentfulAjax';

export default class Container extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            contentfulData: null,
            intervalCounter: 0
        }
    }

    //React life cycle functions - START

    componentDidMount(){
        //allow time for token to be written to disk after url redirect
        this.ajaxInterval = setInterval(this.requestData, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.ajaxInterval);
    }

    //React life cycle functions - END

    requestData = () => {
        ajax.getContent().then(data => {
            clearInterval(this.ajaxInterval); //a token was found in local storage
            this.setState({
                contentfulData: data
            });
        }).catch(error => { //allow 3 attempts to get token
            if(this.state.intervalCounter === 3){
                clearInterval(this.ajaxInterval);
                this.setState({
                    contentfulData: {
                        status: 401,
                        data: 'Please login to access the Client Page'
                    }
                });
                return;
            }
            this.setState({
                intervalCounter: this.state.intervalCounter + 1
            });
        });
    }

    removeLocalStorageItems(){
        window.localStorage.removeItem('ianarber-auth0-profile');
        window.localStorage.removeItem('ianarber-auth0-access-token');
        console.log('local storage items removed');
    }

    render(){
        if(this.state.contentfulData){
            const {status, data} = this.state.contentfulData;
            if(status === 200){
                
                let showreelVideo;
                let showreelPlaylist;
                let renderedPlaylists = null;
                let items = data.items;

                for(let i = 0; i < items.length; i++){
                    if(items[i].fields.mainShowreelContent){
                        const {title, year, genre, director, showreelLink, playlistLink} = items[i].fields;
                        showreelVideo = (
                            <Showreel key={i}
                                title={title}
                                year={year}
                                link={showreelLink}
                            />
                        );
                        showreelPlaylist = (
                            <ClientAreaPlaylist key={i}
                                title={title}
                                genre={genre}
                                year={year}
                                director={director}
                                link={playlistLink}
                            />
                        );
                    } else {
                        const {title, genre, year, director, playlistLink} = items[i].fields;
                        if(playlistLink){
                            renderedPlaylists.push(
                                <ClientAreaPlaylist key={i}
                                    title={title}
                                    genre={genre}
                                    year={year}
                                    director={director}
                                    link={playlistLink}
                                />
                            );
                        }
                    }
                }

                return(
                    <div>
                        {showreelVideo}
                        <h2 className="sub-header">Showreel Playlist</h2><hr />

                        <div id="reel-iframe-wrapper">
                            <ul>{showreelPlaylist}</ul>
                            <a href="/contact"><button className="main-btn-style">Contact Me</button></a>

                            {renderedPlaylists &&
                                <hr />
                            }
                            <ul>{renderedPlaylists}</ul>

                        </div>

                        <h2 className="sub-header">Music catalogue</h2><hr />
                        <div id="catalog-download-text">
                            <p>You can download various genre styles from my music back catalogue</p>
                            <a href="https://www.dropbox.com/sh/hfe4wxxh75nk7p8/AAAkqxHAmCtE_BmJlikoi5LLa?dl=0" target="_blank">
                                <button className="main-btn-style">Download</button>
                            </a>
                        </div>
                        <br />

                    </div>
                )

            } else if(status === 401) {
                this.removeLocalStorageItems();
                return <Unauthorized data={data} />
            }
        } else {
            return(
                <Spinner />
            )
        }
    }

}