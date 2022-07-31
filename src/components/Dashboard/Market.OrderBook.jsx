import React, { useState, useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import CustomTable from '../CustomTable';
import { manager } from '../../utils/helpers';

const products = ['Soybean (SBBS)', 'Sorghum (SSGM)', 'Maize (SMAZ)', 'Paddy Rice (SPRL)', 'Cocoa (SCOC)']

const useStyles = createUseStyles({
    wrapper: {
        margin: '0.5em',
        width: '100%',
        borderRadius: '0.2em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '100%',
        '& .second-div': {
            height: '45%',
            maxHeight: '45%',
            overflowY: 'auto',
            '& > span': {
                display: 'flex',
                background: 'var(--white)',
                padding: '1em',
                color: 'var(--grey)',
                fontWeight: 600
            }
        }
    },
    tradeDiv: {
        display: 'flex',
        height: '45%',
        maxHeight: '45%',
        '@media (max-width: 768px)': {
            flexDirection: 'column',
            height: 'fit-content',
            maxHeight: 'fit-content'
        },
        '& .buy-sell': {
            width: '50%',
            margin: '0.2em',
            background: 'var(--white)',
            '@media (max-width: 768px)': {
                width: '100%',
            },
        },
    },
    button: {

    }
})
const defaultColumns = [
    {
        title: 'Products',
        dataIndex: 'products',
        key: 'products',
        render: product => {
            return (
                <span style={{ fontWeight: 600, fontSize: '0.9em' }}>
                    { product }
                </span>
            )
        }
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        render: quantity => {
            return (
                <span style={{ fontWeight: 600, fontSize: '0.9em' }}>
                    { quantity }
                </span>
            )
        }
    }
]

const buttonStyles = {
    fontSize: '0.9em',
    fontWeight: 600,
    padding: '0.1em 1em',
    background: 'none'
}

const tableOneColumns = [
    ...defaultColumns,
    {
        title: 'Bid Price',
        dataIndex: 'price',
        key: 'price',
        render: price => {
            return (
                <span style={{ color: 'var(--green)' }}>
                    {price}
                </span>
            )
        }
    },
    {
        title: '',
        key: 'action',
        render: () => {
            return (
                <button style={{ ...buttonStyles, color: 'var(--green)', border: '1px solid var(--green)' }}>Buy</button>
            )
        }
    }
]

const tableTwoColumns = [
    ...defaultColumns,
    {
        title: 'Offer Price',
        dataIndex: 'price',
        key: 'price',
        render: price => {
            return (
                <span style={{ color: 'var(--red)' }}>{price}</span>
            )
        }
    },
    {
        title: '',
        key: 'action',
        render: () => {
            return (
                <button style={{ ...buttonStyles, color: 'var(--red)', border: '1px solid var(--red)' }}>Sell</button>
            )
        }
    }
]

const tradeLogTableColumns = [
    {
        title: 'Security',
        dataIndex: 'security_code',
        key: 'security_code'
    },
    {
        title: 'Board',
        dataIndex: 'board_type',
        key: 'board_type'
    },
    {
        title: 'Order Type',
        dataIndex: 'order_type',
        key: 'order_type'
    },
    {
        title: 'Matched Price',
        dataIndex: 'order_price',
        key: 'order_price'
    },
    {
        title: 'Quantity',
        dataIndex: 'matched_qty',
        key: 'matched_qty'
    },
    {
        title: 'Date',
        dataIndex: 'created',
        key: 'date',
        render: created => {
            let date = (new Date(created)).toDateString()
            return (
                <span>{date}</span>
            )
        }
    },
    {
        title: 'Time',
        dataIndex: 'created',
        key: 'time',
        render: created => {
            let time = (new Date(created)).toTimeString().split(' ')[0]
            return (
                <span>{time}</span>
            )
        }
    }
]

const customTableData = Array.from(Array(10), (elem, i) => ({
    id: i + 1,
    products: products[Math.floor(Math.random() * products.length)],
    quantity: Math.floor(Math.random() * 10000).toString(), referral_code: "", company_phone: '+234' + Math.floor(Math.random() * 1000),
    price: ['1736.92 ', '3627.00 ', '8294.01', '8192.00', '1736.92 '][Math.floor(Math.random() * 5)],
}))

const Market_OrderBook = () => {
    const classes = useStyles()
    const [tradeLogTableData, setTradeLogTableData] = useState([])
    const [webSocketReady, setWebSocketReady] = useState(false)
    const [webSocket, setWebSocket] = useState(new WebSocket("wss://comx-sand-api.afexnigeria.com/stream/trades"))
    let mounted = useRef(true)

    useEffect(() => {
        mounted.current = true

        webSocket.onopen = (event) => {
            console.log('opened', {event})
            if (mounted.current) {
                setWebSocketReady(true)
            }
        }

        webSocket.onmessage = (event) => {
            console.log('on message event', { event, event_data: JSON.parse(event.data), type: typeof JSON.parse(event.data) } )
            if (mounted.current) {
                let parsedData = JSON.parse(event.data)
                manager.decrypt(parsedData.messages)
                let decryptedData = parsedData.messages.map(message => {
                    manager.decrypt(message)
                    if (message.client) {
                        manager.decrypt(message.client)
                        manager.decrypt(message.client.client_settings)
                    }
                    return message
                })
                setTradeLogTableData(decryptedData)
                console.log('parsed data', decryptedData)
            }
        }

        webSocket.onclose = (event) => {
            console.log('on close event', event)
            setWebSocketReady(false);
            setTimeout(() => {
              if (mounted.current) {
                setWebSocket(new WebSocket("wss://comx-sand-api.afexnigeria.com/stream/trades"))
              }
            }, 1000)
        }

        webSocket.onerror = (err) => {
            console.log('Socket encountered error: ', err.message, 'Closing socket');
            if (mounted.current) {
                setWebSocketReady(false)
                webSocket.close()
            }
        }

        return () => {
            webSocket.close()
            mounted.current = false
        }
    }, [webSocket])

    return (
        <div className={classes.wrapper}>
            <div className={classes.tradeDiv}>
                <div className='buy-sell'>
                    <CustomTable options={customTableData} columns={tableOneColumns} scroll={{ y: 240 }}/>
                </div>
                <div className='buy-sell'>
                    <CustomTable options={customTableData} columns={tableTwoColumns} scroll={{ y: 240 }}/>
                </div>
            </div>
            <div className='second-div'>
                <span>TRADE LOG</span>
                <CustomTable style={{ margin: '0.5em 0' }} options={tradeLogTableData} columns={tradeLogTableColumns} scroll={{ y: 240 }}/>
            </div>
        </div>
    );
}
 
export default Market_OrderBook;