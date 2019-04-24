import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (
        <div className={classes.NavigationItems}>
            <NavigationItem link='/' active exact>Contact Data</NavigationItem>
            <NavigationItem link='/orders' exact>Orders</NavigationItem>
        </div>
    )
}

export default navigationItems;