import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {deleteItem,updateItemQuantity} from '../actions/actions'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const styleAnchor = {
    textDecoration: 'none',
    color:'#fff'
  
}
const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
  
const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
    button: {
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    heading:{
        padding: theme.spacing.unit * 3,
        fontSize:20
    },
    colhead:{
        fontSize:30,
        fontWidth:10
    },
    idcell:{
        width:theme.spacing.unit * 7,
    },
    buttoncell: {
        width: theme.spacing.unit * 20,
    },
    bootstrapRoot: {
        padding: 0,
        'label + &': {
          marginTop: theme.spacing.unit * 3,
        },
      },
      bootstrapFormLabel: {
        fontSize: 18,
      },
      bootstrapInput: {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 12px',
        width: 'calc(100% - 24px)',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
          borderColor: '#80bdff',
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
      },
  });
class Cart extends React.Component{
    constructor(props){
        super(props);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
    }
    removeFromCart(item){
        this.props.dispatch(deleteItem(item));
    }
    updateQuantity(event,id,item){
        this.props.dispatch(deleteItem(id));
        this.props.dispatch(updateItemQuantity(event.target.value,item));
    }
    render(){
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <Typography align='center' className={classes.heading} >
                <h2>Products List</h2>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <CustomTableCell numeric className={classes.idcell}>ID</CustomTableCell>
                        <CustomTableCell >Product</CustomTableCell>
                        <CustomTableCell numeric>Price</CustomTableCell>
                        <CustomTableCell >Quantity</CustomTableCell>
                        <CustomTableCell numeric>Total</CustomTableCell>
                        <CustomTableCell></CustomTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.props.items.list.length?this.props.items.list.map((product,key) => 
                        (
                        <TableRow className={classes.row} key={product.id}>
                        <CustomTableCell numeric  className={classes.idcell}>{product.id}</CustomTableCell>
                            <CustomTableCell component="th" scope="row">{product.name}</CustomTableCell>
                            <CustomTableCell numeric>{product.Price}</CustomTableCell>
                            <CustomTableCell>
                            <TextField
                                defaultValue={product.quantity}
                                id="bootstrap-qty"
                                InputProps={{
                                disableUnderline: true,
                                classes: {
                                    root: classes.bootstrapRoot,
                                    input: classes.bootstrapInput,
                                },
                                }}
                                InputLabelProps={{
                                shrink: true,
                                className: classes.bootstrapFormLabel,
                                }}
                                onChange={(event)=>this.updateQuantity(event,product.id,product)}
                            />
                            </CustomTableCell>
                            <CustomTableCell numeric>{product.total}</CustomTableCell>
                            <CustomTableCell>
                            <Button variant="contained" color="secondary" className={classes.button} onClick={() => this.removeFromCart(product.id)}>
                                Delete
                                <Delete className={classes.rightIcon} />
                                </Button>
                            </CustomTableCell>
                        </TableRow>
                        )):(
                        <TableRow className={classes.row}>
                        <CustomTableCell></CustomTableCell>
                        <CustomTableCell>No Items in Your Cart</CustomTableCell>
                        <CustomTableCell></CustomTableCell>
                        <CustomTableCell></CustomTableCell>
                        <CustomTableCell></CustomTableCell>
                        <CustomTableCell></CustomTableCell>
                        </TableRow>)}
                    
                    </TableBody>
                </Table>
                
                
                <Button variant="contained" color="primary" className={classes.button}>
                    <Link to='/' style={styleAnchor}>Back to List</Link>
                </Button>
                </Typography>
                </Paper>
            );            
      }
}
Cart.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps (state){
    return{
        items:state.cartlist,
    }
}
export default connect  (
    mapStateToProps,
)(withStyles(styles)(Cart));