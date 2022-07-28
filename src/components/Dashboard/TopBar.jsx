import React from 'react';
import { createUseStyles } from 'react-jss';
import { Dropdown, Menu, Switch } from 'antd';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import { AppLogo } from '../../assets/app-logo';

const useStyles = createUseStyles({
    wrapper: {
        background: 'var(--white)',
        '& img': {
            width: '80px',
            margin: '0 0.5em'
        }
    },
    logoDiv: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRight: '1px solid var(--grey)',
        padding: '0.5em 1.5em',
    },
    balanceDiv: {
        padding: '0.5em 1.5em',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRight: '1px solid var(--grey)',
        '& .bar-icon': {
            fontSize: '0.7em'
        }
    },
    demoDiv: {
        padding: '0.5em 1.5em',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',

    },
    demo: {
        padding: '0.5em',
        background: 'var(--black)',
        color: 'var(--white)',
        fontWeight: 600,
        fontSize: '0.7em',
        cursor: 'pointer'
    },
    balance: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& small': {
            margin: 0,
            color: 'var(--grey)',
            fontWeight: 550,
        },
        '& h6': {
            margin: 0,
            fontWeight: 600
        }
    },
    switch: {
        background: 'var(--grey)',
        fontWeight: 600
    }
})

const TopBar = () => {
    const classes = useStyles()

    return (
        <div className={`${classes.wrapper} row`}>
            <div className={`${classes.logoDiv} col-md-6`}>
                <AppLogo/>

                <Switch className={classes.switch} checkedChildren="LIGHT" unCheckedChildren="DARK" defaultChecked/>
            </div>

            <div className={`${classes.balanceDiv} col-md-5`}>
                <RightOutlined className='bar-icon'/>

                <div className={classes.balance}>
                    <small>CASH BALANCE</small>
                    <h6>₦8,374,763</h6>
                </div>

                <div className={classes.balance}>
                    <small>SECURITIES VALUE</small>
                    <h6>₦8,374,763</h6>
                </div>

                <div className={classes.balance}>
                    <small>LOAN BALANCE</small>
                    <h6>₦7,542,246</h6>
                </div>
            </div>

            <div className={`${classes.demoDiv} col-md-1`}>
                <Dropdown trigger={['click', 'hover']} overlay={(
                    <Menu items={[
                        {
                            key: 1,
                            label: (
                                <span>Take Demo Now</span>
                            )
                        },
                        {
                            key: 2,
                            label: (
                                <span>Schedule for Later</span>
                            )
                        }
                    ]}/>
                )}>
                    <span className={classes.demo}>DEMO <DownOutlined/></span>
                </Dropdown>
            </div>
        </div>
    );
}
 
export default TopBar;