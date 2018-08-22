import React from 'react'
import {connect} from 'react-redux'
import {getItemsList} from '../actions/services'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {CSVLink} from 'react-csv';
import jsPDF from 'jspdf'
import ReactExport from "react-data-export";
import html2canvas from 'html2canvas';
import Select from '@material-ui/core/Select';

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
      marginTop: theme.spacing.unit * 2,
    },
    table: {
      minWidth: 300,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
    button: {
        margin: theme.spacing.unit * 3,
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
  });

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            type:"select",
            csvFlag:false,
            excelFlag:false,
            pdfFlag:false,
            canvasFlag:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.savePDF = this.savePDF.bind(this);
        this.saveCanvasPDF = this.saveCanvasPDF.bind(this);
        this.download = this.download.bind(this);
    }
    download(){
        var type = this.state.type;
        console.log(this.state);
        if(type === "csv"){
            this.setState({
                csvFlag : true,
                excelFlag:false,
                pdfFlag:false,
                canvasFlag:false
            });
        }
        else if(type === "excel"){
            this.setState({
                csvFlag : false,
                excelFlag:true,
                pdfFlag:false,
                canvasFlag:false
            });   
        }
        else if(type === "pdf"){
            this.setState({
                csvFlag : false,
                excelFlag:false,
                pdfFlag:true,
                canvasFlag:false
            });
        }
        else if(type === "canvas"){
            this.setState({
                csvFlag : false,
                excelFlag:false,
                pdfFlag:false,
                canvasFlag:true
            });
        }
        else{
            this.setState({
                csvFlag : false,
                excelFlag:false,
                pdfFlag:false,
                canvasFlag:false
            });
            alert("Please select File Type");
        }
    }
    handleChange = name => event =>{
        this.setState({
            [name]: event.target.value,
        });
    }
    componentWillMount(){
        this.props.dispatch(getItemsList());
        console.log(this.props.items.data);
        
    }
    saveCanvasPDF(data){
        const input = document.getElementById('table');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(imgData, 'JPEG', 0, 0,100,100);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      });
    }
    savePDF(data){
    var input = JSON.stringify(data);  
    const doc = new jsPDF("p", "mm", "a4");
    doc.text(input,10,10)
    doc.save("download.pdf");
    }
    render(){
        console.log(this.props.items.data);
        var data = Object.values(this.props.items.data?this.props.items.data:'');
        const { classes } = this.props;
        const ExcelFile = ReactExport.ExcelFile;
        const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
        const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
        return(
            <Paper className={classes.root}>
                <Typography align='center' className={classes.heading} id="table"><h2>Products List</h2>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        {/* <CustomTableCell numeric className={classes.idcell}>ID</CustomTableCell> */}
                        <CustomTableCell >Product</CustomTableCell>
                        <CustomTableCell numeric>Price</CustomTableCell>
                        <CustomTableCell></CustomTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.props.items.data?this.props.items.data.map((product,key) => 
                        (
                        <TableRow className={classes.row}>
                            {/* <CustomTableCell numeric className={classes.idcell}>{product.id}</CustomTableCell> */}
                            <CustomTableCell component="th" scope="row" >{product.name}</CustomTableCell>
                            <CustomTableCell numeric>{product.Price}</CustomTableCell>
                            <CustomTableCell className={classes.buttoncell}>
                                <Button variant="contained" color="secondary">
                                    <Link to={'/view'+ key} style={styleAnchor}>View Details</Link>         
                                </Button>
                            </CustomTableCell>
                        </TableRow>
                        )):''}
                    </TableBody>
                </Table>
                        
                <Button variant="contained" color="primary" className={classes.button}>
                <Link to='/cart' style={styleAnchor}>Go To Cart</Link>
                </Button>
                
            </Typography>
            <Typography>
            <select name='type' id='type'
                value={this.state.type}
                onChange={this.handleChange('type')}>
                <option value="select" >Select</option>
                <option value="csv" >CSV Download</option>
                <option value="pdf">PDF Download</option>
                <option value="canvas"> PDF-Canvas Download</option>
                <option value="excel">Excel Download</option>
                </select>
                <Button variant="contained" color="primary" className={classes.button} onClick={()=>this.download(data)}>
                Prepare Document
                </Button> 
                {this.state.csvFlag?
                <Button variant="contained" color="primary" className={classes.button} onClick={()=>this.csv(data)}>
                <CSVLink data={data} >CSV Download</CSVLink>
                </Button>:''}
                {this.state.pdfFlag?
                <Button variant="contained" color="primary" className={classes.button} onClick={()=>this.savePDF(data)}>
                PDF Download
                </Button>:''}
                {this.state.excelFlag?
                <ExcelFile element={<Button variant="contained" color="primary" className={classes.button}>Excel Download</Button>}>
                <ExcelSheet data={data} name="Products">
                    <ExcelColumn label="Id" value="_id"/>
                    <ExcelColumn label="Name" value="name"/>
                    <ExcelColumn label="Price" value="Price"/>
                    <ExcelColumn label="Image Path"
                                 value="src"/>
                </ExcelSheet>
            </ExcelFile>:''}
            {this.state.canvasFlag?
            <Button variant="contained" color="primary" className={classes.button} onClick={()=>this.saveCanvasPDF()}>
                HTML PDF Download
            </Button>:''}
                </Typography>
                </Paper>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps (state){
    return{
        items:state.products,
    }
}
export default connect  (
    mapStateToProps,
)(withStyles(styles)(Home));