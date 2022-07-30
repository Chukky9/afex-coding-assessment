import React, { useState, useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import CustomTable from '../CustomTable';
import { manager } from '../../utils/helpers';

const useStyles = createUseStyles({
    wrapper: {
        margin: '0.5em',
        width: '100%',
        borderRadius: '0.2em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        '& .second-div': {
            height: '40%',
            maxHeight: '40%',
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
        '& .buy-sell': {
            width: '50%',
            margin: '0.2em',
            background: 'var(--white)',
        },
    }
})

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

const Market_OrderBook = () => {
    const classes = useStyles()
    const [tradeLogTableData, setTradeLogTableData] = useState([])
    const [serverMessage, setServerMessage] = useState([])
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
                    <CustomTable options={[]} columns={[]}/>
                </div>
                <div className='buy-sell'>
                    <CustomTable options={[]} columns={[]}/>
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