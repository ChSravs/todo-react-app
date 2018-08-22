import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

export default class Breach extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            plan_type:"Recovery Support Plant",
            Period:"1 Year",
            left_time:"130 Days",
            end_date:"22-04-2019",
            domain:"www.abc.com"
        }
    }
    render(){
        return(
            <Paper>
                <h1>Payment Methods</h1>
                <hr/>
                <p>Selected Plan : {this.state.plan_type}</p>
                <p>Subscription Period : {this.state.Period} ({this.state.left_time })</p>
                <p>End Date of Plan : {this.state.end_date}</p>
                <p>Subdomain : {this.state.domain}</p>
            </Paper>
        )
    }
}