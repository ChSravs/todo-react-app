import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch'
import { withStyles } from '@material-ui/core/styles'
import { getSwitchStatus } from '../actions/services'

const styles = theme => ({
    root: {
        width: '26%',
        padding:'30px',
        margin:'5% 37% 5% 37%',
        align:'center',
        marginTop: theme.spacing.unit * 2,
      },
      container: {
          display: 'flex',
          flexWrap: 'wrap',
        },
    }
);
class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            checkedA : true
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount(){
        this.props.dispatch(getSwitchStatus());
        
    }
    
    handleChange = name => event =>{
        if(name === 'checkedA'){
            this.setState({
                [name]: event.target.checked,
            });
        }
    }
    render(){
        const { classes } = this.props;
        return(
            // <h1>Dashboard</h1>
            <Paper className={classes.root}>
                <Typography align='center' className={classes.heading} id="table"><h2>Device Status</h2>            
                    <form className={classes.container}>
                        <Switch
                            checked={this.state.checkedA}
                            onChange={this.handleChange('checkedA')}
                            value="checkedA"
                        />
                    </form>
                </Typography>
            </Paper>
        )
    }
}
export default connect  (
    // mapStateToProps,
)(withStyles(styles)(Dashboard));