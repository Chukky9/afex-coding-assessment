import React from 'react';
import { NavLink } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { OverviewIcon, MarketIcon, PortfolioIcon, CommunityIcon, ReportsIcon, SettingsIcon } from '../../assets/icons/SidebarIcons';

const useStyles = createUseStyles({
    wrapper: {
        background: 'var(--white)',
        width: '6%',
        margin: '0.5em 0.5em 0.5em 0'
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

    return (
        <div className={classes.wrapper}>
            <div className={classes.links}>
                {
                    navLinks.map(link => (
                        <NavLink key={link.name} to={link.link}
                            style={({ isActive}) => ({
                                color: isActive ? 'var(--red)' : 'var(--black)'
                            })}>
                            { link.icon }
                            <small>
                                { link.name }
                            </small>
                        </NavLink>
                    ))
                }
            </div>
        </div>
    );
}
 
export default SideBar;