import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {isAdmin} from '../actions/services'
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const styleAnchor = {
    textDecoration: 'none',
    color:'#fff'
}
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
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 250,
      },
      menu: {
        width: 200,
      },
      button: {
        margin: theme.spacing.unit * 3,
        align:'center',
    },
});
class adminLogin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            is_un_error:false,
            is_pwd_error:false,
            
          };
        this.handleChange = this.handleChange.bind(this);
        this.adminloggedin = this.adminloggedin.bind(this);
    }
    adminloggedin = event => {
        console.log(this.props.users)
        if(this.state.is_un_error === false && this.state.is_pwd_error === false){
            if(this.state.username !== '' && this.state.password !== ''){
                var un_index = this.props.users.indexOf(this.state.username)
                var pwd_index = this.props.passwords.indexOf(this.state.password)
                if ( un_index === -1 || un_index !== pwd_index)
                    alert("Failed");
                else
                    this.props.dispatch(isAdmin(this.state));
            }
            else{
                alert("Fileds should not be empty");
            }
        }
        else{
            alert("Entered username or password is invalid");
        }
        // this.props.dispatch(verifyloggedin(this.state.username,this.state.password))
    }
    handleChange = name => event => {
        var emailpattern = "[a-z0-9._%+-]+@+([a-z0-9.-]{3,5})+.+[a-z]{2,3}$"
        var strongPwdRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})";
        if(name === 'username'){
            if(event.target.value.match(emailpattern) )
                {
                    this.setState({
                        [name]: event.target.value,
                        is_un_error:false
                    });
                }
            else{
                this.setState({
                    [name]: event.target.value,
                    is_un_error:true
                });
            }
        }
        if(name === 'password'){
            if(event.target.value.match(strongPwdRegex) ){
                this.setState({
                    [name]: event.target.value,
                    is_pwd_error:false
                });
            }
            else{
                this.setState({
                    [name]: event.target.value,
                    is_pwd_error:true
                });
            }
        }
      };
    render(){
        const { classes } = this.props;
        return(
            <Paper className={classes.root}>
                <form className={classes.container} autoComplete="on">
                    <TextField
                    required
                    error={this.state.is_un_error}
                    id="username"
                    label="Username"
                    className={classes.textField}
                    value={this.state.username}
                    onChange={this.handleChange('username')}
                    margin="normal"
                    />
                    <TextField
                    required
                    error={this.state.is_pwd_error}
                    id="password"
                    label="Password"
                    className={classes.textField}
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    autoComplete="current-password"
                    margin="normal"
                    />
                    <br/>
                    <Button variant="contained" color="primary" className={classes.button} onClick={()=>this.adminloggedin()}>
                        <Link to='/' style={styleAnchor}>Submit</Link>
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button}>
                        <Link to='/' style={styleAnchor} >Cancel</Link>
                    </Button>
                </form>
            </Paper>
        )
    }
}
adminLogin.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps (state){
    return{
        users:state.userdetails.users,
        passwords:state.userdetails.passwords
    }
}
export default connect  (
    mapStateToProps,
)(withStyles(styles)(adminLogin));