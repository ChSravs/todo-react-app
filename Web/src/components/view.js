import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {pushToCart} from '../actions/actions'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';

const styleAnchor = {
    textDecoration: 'none',
    color:'#fff'
}

const styles = theme => ({
    card: {
      maxWidth: 500,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    a:{
      textDecoration:'none',
    },
    avatar: {
      backgroundColor: red[500],
    },
    imgsize:{
      height:300,
      width:300,
    },
    button: {
      margin: theme.spacing.unit * 3,
  },
  });
  
class View extends React.Component{
    constructor(props){
        super(props);
        this.pushToCart = this.pushToCart.bind(this);
    }
    pushToCart(item){
        var arr = []
        arr = this.props.cart.list.filter((product) => product.id === item.id)
        if(arr.length === 0){
            this.props.dispatch(pushToCart(item))
        }
    }
    render(){
        const {items, classes} = this.props,
        id = this.props.match.params.id;
        console.log(id,items.data);
        return (
        <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {id}
              </Avatar>
            }
            title={items.data[id-1].name}
          />
          <CardContent>
            <Typography component="p">
                <ul>
                    <li><b>Product:</b>{items.data[id-1].name}</li>
                    <li><b>Price:</b>{items.data[id-1].Price} Rupees</li>
                    <img className={classes.imgsize} src={items.data[id-1].src} alt={items.data[id-1].name}/>
                </ul>
                <Button variant="contained" color="primary" className={classes.button}>
                    <Link to='/cart' style={styleAnchor} onClick={()=>this.pushToCart(items.data[id-1])}>Add To Cart</Link>
                </Button>
                <Button variant="contained" color="primary" className={classes.button}>
                    <Link to='/' style={styleAnchor}>Back to List</Link>
              </Button>
              </Typography>
            </CardContent>
                </Card>
            </div>
        );
    }
}

View.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps (state){
    return{
        items:state.products,
        cart:state.cartlist
    }
}

export default connect  (
    mapStateToProps,
)(withStyles(styles)(View));
