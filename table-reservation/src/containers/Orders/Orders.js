import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from 'axios';

class Orders extends Component {
    state = {
        loading: true,
        infos: []
    }
    componentWillMount () {
        axios.get('/orders.json').then(res => {
            const fetchedOrders = [];
            console.log(res.data)
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            console.log(fetchedOrders);
            this.setState({
                infos: fetchedOrders,
                loading: false
            })
        }).catch(er => {
            this.setState({
                loading: false
            })
        })
    }
    render() {
        let spinner = null;
        if(this.state.loading){
            spinner = <Spinner />
        }
        return <div>
            {spinner}
            {this.state.infos.map(order => {
                return <Order key={order.id} info={order.orderData} loading={this.state.loading}/>
            })}
        </div>
    }
}

export default Orders;