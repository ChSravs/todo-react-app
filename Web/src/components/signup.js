import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import {addUser} from '../actions/services'
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
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
      formControl: {
        margin: theme.spacing.unit * 3,
      },
      group: {
        margin: `${theme.spacing.unit}px 0`,
      },
      button: {
        margin: theme.spacing.unit * 3,
        align:'center',
    },
});
class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstname:'',
            lastname:'',
            username: '',
            password: '',
            Gender:'',
            DOB:'',
            confirmpassword:'',
            is_un_error:false,
            is_pwd_error:false,
            is_cnf_pwd_error:false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.usersignedup = this.usersignedup.bind(this);
    }
    usersignedup = event => {
        if(this.state.is_un_error === false && this.state.is_pwd_error === false && this.state.is_cnf_pwd_error === false){
            if(this.state.username !== '' && this.state.password !== '' && this.state.is_cnf_pwd_error !== ''){
                console.log(this.state);
                this.props.dispatch(addUser(this.state));
            }
            else
                alert("Fileds should not be empty");
        }
        else if(this.state.password !== this.state.is_cnf_pwd_error)
            alert("Password and confirm password should be same");
        else
            alert("Entered username or password is invalid");
    }
    handleChange = name => event => {
        var emailpattern = "[a-z0-9._%+-]+@+([a-z0-9.-]{3,5})+.+[a-z]{2,3}$"
        var strongRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"
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
        else if(name === 'password'){
            if(event.target.value.match(strongRegex) ){
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
        else if(name === 'confirmpassword'){
            if(event.target.value === this.state.password ){
                this.setState({
                    [name]: event.target.value,
                    is_cnf_pwd_error:false
                });
            }
            else{
                this.setState({
                    [name]: event.target.value,
                    is_cnf_pwd_error:true
                });
            }
        }
        else {
            this.setState({
                [name]: event.target.value,
            });
        }
    };
    render(){
        const { classes } = this.props;
        return(
            <Paper className={classes.root}>
                <form className={classes.container} autoComplete="on">
                    <TextField
                    required
                    id="firstname"
                    label="First Name"
                    className={classes.textField}
                    value={this.state.firstname}
                    onChange={this.handleChange('firstname')}
                    margin="normal"
                    />
                    <TextField
                    id="lastname"
                    label="Last Name"
                    className={classes.textField}
                    value={this.state.lastname}
                    onChange={this.handleChange('lastname')}
                    margin="normal"
                    />
                    <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                            aria-label="Gender"
                            name="Gender"
                            className={classes.group}
                            value={this.state.Gender}
                            onChange={this.handleChange('Gender')}
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>
                    <TextField
                    required
                    id="DOB"
                    label="Birthday"
                    type="date"
                    className={classes.textField}
                    value={this.state.DOB}
                    onChange={this.handleChange('DOB')}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    />
      
                    <TextField
                    required
                    error={this.state.is_un_error}
                    id="username"
                    label="Email" type="Email"
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
                    <TextField
                    required
                    error={this.state.is_cnf_pwd_error}
                    id="confirmpassword"
                    label="Confirm Password"
                    className={classes.textField}
                    type="password"
                    value={this.state.confirmpassword}
                    onChange={this.handleChange('confirmpassword')}
                    autoComplete="current-password"
                    margin="normal"
                    />
                    <Button variant="contained" color="primary" className={classes.button} onClick={()=>this.usersignedup()}>
                        <Link to='/' style={styleAnchor} >Submit</Link>
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button}>
                        <Link to='/' style={styleAnchor} >Cancel</Link>
                    </Button>
                    <p>Already Signed User <Link to='/login'>Login</Link> here</p>
                </form>
            </Paper>
        )
    }
}
Signup.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default connect  (
)(withStyles(styles)(Signup));