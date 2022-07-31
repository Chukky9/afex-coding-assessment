import React, { useState, useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { Table } from 'antd';

const mapKeyToOptions = (options = []) => {
    return options.map((option, index) => ({
        ...option, key: index + 1
    }))
}

const useStyles = createUseStyles({
    wrapper: {
        width: '100%',
        margin: '1em 0',
        '& .ant-table-cell': {
            textAlign: 'center',
            '@media (max-width: 768px)': {
                textAlign: 'initial'
            },
        }
    }
})

const CustomTable = ({ columns, options, style, ...rest}) => {
    const classes = useStyles()
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    let mounted = useRef(true)

    useEffect(() => {
        mounted.current = true

        if (options && options.length && mounted.current) {
            setLoading(true)
            setDataSource(mapKeyToOptions(options))
            setLoading(false)
        }

        return () => mounted.current = false
    }, [options])

    return (
        <div style={style} className={classes.wrapper}>
            <Table pagination={false} dataSource={dataSource} 
                columns={columns} loading={loading} { ...rest }/>
        </div>
    );
}
 
export default CustomTable;