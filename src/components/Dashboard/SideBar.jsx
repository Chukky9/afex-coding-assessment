import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { Drawer } from 'antd';
import { OverviewIcon, MarketIcon, PortfolioIcon, CommunityIcon, ReportsIcon, SettingsIcon } from '../../assets/icons/SidebarIcons';
import MarketNavList from './Market.navList';

const useStyles = createUseStyles({
    wrapper: {
        background: 'var(--white)',
        width: '6%',
        margin: '0.5em 0.5em 0.5em 0',
        '@media (max-width: 768px)': {
            width: '10%',
            fontSize: '0.8em'
        },
        '@media (max-width: 420px)': {
            width: '15%'
        },
    },
    links: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        '& a': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '1em 0',
            fontWeight: 600,
            padding: '0.3em'
        }
    },
    drawer: {
        display: 'none',
        '& .ant-drawer-body': {
            padding: '6px'
        },
        '@media (max-width: 768px)': {
            display: 'flex'
        },
    }
})

const navLinks = [
    { name: 'Overview', link: '/dashboard/overview', icon: (<OverviewIcon/>) },
    { name: 'Market', link: '/dashboard/market', icon: (<MarketIcon/>) },
    { name: 'Portfolio', link: '/dashboard/portfolio', icon: (<PortfolioIcon/>) },
    { name: 'Community', link: '/dashboard/community', icon: (<CommunityIcon/>) },
    { name: 'Reports', link: '/dashboard/reports', icon: (<ReportsIcon/>) },
    { name: 'Settings', link: '/dashboard/settings', icon: (<SettingsIcon/>) },
]

const SideBar = () => {
    const classes = useStyles()
    const [visible, setVisible] = useState(false)
    const [selectedLink, setSelectedLink] = useState({})

    const showDrawer = (link = {}) => {
        setSelectedLink(link)
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false);
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.links}>
                {
                    navLinks.map(link => (
                        <NavLink key={link.name} to={link.link}
                            style={({ isActive}) => ({
                                color: isActive ? 'var(--red)' : 'var(--black)'
                            })} onClick={() => showDrawer(link)}>
                            { link.icon }
                            <small>
                                { link.name }
                            </small>
                        </NavLink>
                    ))
                }
            </div>
            <Drawer title={selectedLink.name}
                placement='left' width={200}
                onClose={onClose} visible={visible}
                className={classes.drawer}>
                <MarketNavList/>
            </Drawer>
        </div>
    );
}
 
export default SideBar;