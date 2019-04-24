import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/Sidedrawer/Sidedrawer';

class Layout  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideDrawer: false
        }
    }

    showSideDrawerHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    openSideDrawerHandler = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        })
    }

    render() {
        return (
            <Aux>
                <SideDrawer open={this.state.showSideDrawer} closed={this.showSideDrawerHandler}/>
                <Toolbar drawerToggleClicked={this.openSideDrawerHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;