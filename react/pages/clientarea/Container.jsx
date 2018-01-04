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
                        data: 'You must log in to access the Client Page'
                    }
                });
                return;
            }
            this.setState({
                intervalCounter: this.state.intervalCounter + 1
            });
        });
    }

    render(){
        if(this.state.contentfulData){
            const {status, data} = this.state.contentfulData;
            if(status === 200){
                
                let renderedShowreels = [];
                let renderedPlaylists = [];
                let items = data.items;

                for(let i = 0; i < items.length; i++){
                    if(items[i].fields.showreelLink){
                        const {title, year, showreelLink} = items[i].fields;
                        renderedShowreels.push(
                            <Showreel key={i}
                                title={title}
                                year={year}
                                link={showreelLink}
                            />
                        );
                    } else {
                        const {title, genre, year, director, playlistLink} = items[i].fields;
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

                return(
                    <div>
                        {renderedShowreels}
                        <h2 className="sub-header">Showreel Playlist</h2><hr />

                        <div id="reel-iframe-wrapper">
                            <ul>
                                {renderedPlaylists}
                            </ul> 
                            <a href="/contact"><button className="main-btn-style">Contact Me</button></a>
                        </div>
                    </div>
                )

            } else if(status === 401) {
                return <Unauthorized data={data} />
            }
        } else {
            return(
                <Spinner />
            )
        }
    }

}