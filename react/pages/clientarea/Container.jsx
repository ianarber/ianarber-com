import React from 'react';
import ajax from '../../scripts/ContentfulAjax';

export default class Container extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            contentfulData: 'dfgd',
            intervalCounter: 0
        }
    }

    //React life cycle functions - START

    componentDidMount(){
        this.ajaxInterval = setInterval(this.requestData.bind(this), 1000);
    }

    componentWillUnmount(){
        console.log('unmounted');
        clearInterval(this.ajaxInterval);
    }

    //React life cycle functions - END

    requestData(){
        ajax.getContent().then(data => {
            clearInterval(this.ajaxInterval);
            this.setState({
                contentfulData: data
            });
        });
        // if(this.state.intervalCounter < 3){
        //     ajax.getContent().then(function(reponseData){
        //         this.setState({
        //             contentfulData: reponseData,
        //             intervalCounter: 3
        //         });
        //     });
        // } else {
        //     clearInterval(this.ajaxInterval);
        //     this.setState({
        //         contentfulData: 'Oops! You\'re not allowed here!',
        //     });
        // }
    }

    render(){
        let value = JSON.stringify(this.state.contentfulData);
        console.log(value);
        if(value !== null){
            return <div>{value}</div>
        } else {
            return <div></div>
        }
    }

}