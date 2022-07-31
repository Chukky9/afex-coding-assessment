import React from 'react';
import { NavLink } from 'react-router-dom';
import { Input } from 'antd';
import { createUseStyles } from 'react-jss';
import { SearchOutlined } from '@ant-design/icons';
import { ProductViewIcon, OrderBookIcon, PriceHistoryIcon, OpenOrdersIcon, ClosedTradesIcon, CancelledTradesIcon } from '../../assets/icons/DashboardMarketIcons';

const useStyles = createUseStyles({
    navList: {
        background: 'var(--white)',
        height: 'fit-content',
        margin: '0.5em',
        borderRadius: '0.2em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        '& a': {
            padding: '0.3em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            width: '100%',
            margin: '0.5em 0',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            '& svg': {
                margin: '0 0.4em',
            }
        }
    },
    searchDiv: {
        width: '100%',
        padding: '0.5em'
    }
})

const navLinks = [
    { name: 'Product View ', link: '/dashboard/market/product-view', icon: (<ProductViewIcon/>) },
    { name: 'Order Book ', link: '/dashboard/market/order-book', icon: (<OrderBookIcon/>) },
    { name: 'Price History', link: '/dashboard/market/price-history', icon: (<PriceHistoryIcon/>) },
    { name: 'Open Orders ', link: '/dashboard/market/open-orders', icon: (<OpenOrdersIcon/>) },
    { name: 'Closed Trades', link: '/dashboard/market/closed-trades', icon: (<ClosedTradesIcon/>) },
    { name: 'Cancelled Trades', link: '/dashboard/market/cancelled-trades', icon: (<CancelledTradesIcon/>) },
]

const Market_NavList = () => {
    const classes = useStyles()

    return ( 
        <div className={classes.navList}>
            <div className={classes.searchDiv}>
                <Input prefix={<SearchOutlined/>}/>
            </div>

            {
                navLinks.map(link => (
                    <NavLink key={link.name} to={link.link}
                        style={({ isActive}) => ({
                            color: isActive ? 'var(--red)' : 'var(--black)'
                        })}>
                        { link.icon }
                        { link.name }
                    </NavLink>
                ))
            }
        </div>
     );
}
 
export default Market_NavList;