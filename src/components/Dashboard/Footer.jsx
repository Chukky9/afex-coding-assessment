import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    wrapper: {
        background: 'var(--white)',
        display: 'flex',
        justifyContent: 'space-between',
        '& h6': {
            margin: 0,
            fontWeight: 600,
            whiteSpace: 'nowrap',
            color: 'inherit',
            fontSize: '1em'
        }
    },
    live: {
        padding: '1em',
        background: 'var(--black)',
        color: 'var(--white)',
        display: 'flex',
        alignItems: 'center'
    },
    footerData: {
        overflowX: 'auto',
        display: 'flex'
    },
    data: {
        padding: '1em'
    }
})

const products = ['Soybean (SBBS)', 'Sorghum (SSGM)', 'Maize (SMAZ)', 'Paddy Rice (SPRL)', 'Cocoa (SCOC)']
const footerData = Array.from(Array(15), (elem, i) => ({
    id: i + 1,
    title: products[Math.floor(Math.random() * products.length)],
    price: '₦30,834.59'
}))

const Footer = () => {
    const classes = useStyles()

    return (
        <div className={classes.wrapper}>
            <div className={classes.live}>
                <h6>Live Market</h6>
            </div>

            <div className={classes.footerData}>
                {
                    footerData.map(data => (
                        <div key={data.id} className={classes.data}>
                            <h6>{ data.title }</h6>
                            <h6>{ data.price }</h6>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
 
export default Footer;