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
        height: '40vh'
    },
})

export const useRegistrationStyles = createUseStyles({
    halfInput: {
        width: '45%'
    },
    button: {
        background: 'none',
        padding: '0.5em',
        fontWeight: 600,
        border: 'none',
        color: 'var(--red)'
    },
    linkDiv: {
        textAlign: 'initial',
        margin: '1em 0'
    },
    links: {
        padding: '1em 2em',
        border: '1px solid var(--black)',
        margin: '0.5em',
        fontSize: '0.9em',
        borderRadius: '0.2em'
    },
    small: {
        color: 'var(--grey)',
        margin: '0.5em'
    },
})