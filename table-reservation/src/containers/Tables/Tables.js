import React, {Component} from 'react';
import Table from '../../components/Table/Table';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import TableSummary from '../../components/OrderSummary/TableSummary';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Tables.css';

class Tables extends Component {
    state = {
       tables: [],
       loading: true,
       booking: false,
       choosenTable: null,
       customerName: '',
       customerId: ''
    }
    componentWillMount () {
        const query = new URLSearchParams(this.props.location.search);
        let name = '';
        for(let param of query.entries()) {
            if(param[0] === 'name'){
                name = param[1];
            }
        }
        console.log(name);

        axios.get('/tables.json').then(res =>{
            const fetchTables = [];
            for(let key in res.data) {
                fetchTables.push({
                    ...res.data[key]
                })
            }
            this.setState({
                loading: false,
                tables: fetchTables,
                customerName: name
            })
        })  

        axios.get('/orders.json').then(res => {
            const fetchCustomers = [];
            for(let customer in res.data) {
                fetchCustomers.push(customer);
            }
            this.setState({
                customerId: fetchCustomers[fetchCustomers.length-1]
            })
            console.log(this.state.customerId)
        }).catch(err => {
            console.log(err)
        })
    }
    bookingHandler = (choosenTableId) => {
        this.setState({
            booking: true,
            choosenTable: choosenTableId
        })
    }

    bookingCancel = () => {
        this.setState({
            booking: false
        })
    }


    bookedHandler = (idTable) => {
        const url = '/orders/' + this.state.customerId + '/orderData.json';
        console.log(url);
        axios.patch(url, {tableNumber: idTable}).then(res => {
            console.log('OK');
        }
        ).catch(err => {
            console.log(err)
        })

        const updatedTables = this.state.tables;
        for(let table in updatedTables) {
            if(updatedTables[table].id === idTable){
                updatedTables[table].status = true;
            }
        }
        
        this.setState({
            tables: updatedTables,
            booking: false
        })
    }

    render() {
        const table = this.state.tables.map(tbl => (
            <Table 
                key={tbl.id} 
                id={tbl.id} 
                status={tbl.status} 
                clicked={() => this.bookingHandler(tbl.id)} 
                people={tbl.people}
            />
        ))

        const tableSummary = <TableSummary 
                                tableId={this.state.choosenTable}
                                purchaseCancelled={this.bookingCancel}
                                purchaseContinued={() => this.bookedHandler(this.state.choosenTable)}/>
        const spinner = (this.state.loading) ? <Spinner /> : null;
        const greeting = (this.state.loading) ? null : (<div style={{textAlign: 'center'}}>
                                                            <h3>Welcome {this.state.customerName}</h3>
                                                            <p>Please choose a table</p>
                                                        </div>)
        return (
            <Aux>
                <Modal show={this.state.booking} clicked={this.bookingCancel}>
                    {tableSummary}
                </Modal>
                {greeting}
                <div className={classes.Tables}>
                    {spinner}
                    {table}
                </div>
            </Aux>
        )
    }
}

export default Tables;