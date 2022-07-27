import { createUseStyles } from "react-jss";

export const useFormStyles = createUseStyles({
    formGroup: {
        margin: '1em 0',
        display: 'flex',
        flexDirection: 'column',
        '& span': {
            borderRadius: '0.5em',
        },
        '& input': {
            borderRadius: '0.2em !important',
            height: '3em !important'
        },
        '& .ant-select-selector': {
            borderRadius: '0.2em !important',
            height: '3em !important',
            display: 'flex',
            alignItems: "center"
        },
        '& input::placeholder': {
            fontSize: '0.9em'
        },
        '& label': {
            fontSize: '0.9em',
            fontWeight: 500,
            textAlign: 'initial'
        }
    },
    formLine: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    formDiv: {
        height: '50vh'
    },
})