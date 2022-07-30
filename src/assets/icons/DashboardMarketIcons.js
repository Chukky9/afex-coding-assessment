import React from 'react';

export const ProductViewIcon = ({ style }) => {
    return (
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
            <path d="M16 1L9.52275 7.59723L6.11363 4.125L1 9.33333" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.8333 1H16V5.16667" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export const OrderBookIcon = ({ style }) => {
    return (
        <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
            <path d="M1 14.125C1 13.0895 1.83947 12.25 2.875 12.25H13" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M2.875 1H13V16H2.875C1.83947 16 1 15.1605 1 14.125V2.875C1 1.83947 1.83947 1 2.875 1Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export const PriceHistoryIcon = ({ style }) => {
    return (
        <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
            <path fillRule="evenodd" clipRule="evenodd" d="M2.42857 7.45242C2.42857 3.42868 5.6905 0.166748 9.71429 0.166748C13.7381 0.166748 17 3.42868 17 7.45242C17 11.4762 13.7381 14.7381 9.71429 14.7381C7.69048 14.7381 5.88524 13.9286 4.56571 12.601L5.71524 11.4515C6.73524 12.4796 8.15191 13.1191 9.71429 13.1191C12.8439 13.1191 15.381 10.582 15.381 7.45242C15.381 4.32285 12.8439 1.7858 9.71429 1.7858C6.58467 1.7858 4.04762 4.32285 4.04762 7.45242H6.47619L3.20571 10.7148L0 7.45242H2.42857ZM8.90476 4.21438H10.119V7.65488L12.9524 9.33869L12.3695 10.3182L8.90476 8.26203V4.21438Z" fill="black"/>
        </svg>
    )
}

export const OpenOrdersIcon = ({ style }) => {
    return (
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
            <path fillRule="evenodd" clipRule="evenodd" d="M1 6.81818C1 6.81818 3.90909 1 9 1C14.0909 1 17 6.81818 17 6.81818C17 6.81818 14.0909 12.6364 9 12.6364C3.90909 12.6364 1 6.81818 1 6.81818Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="8.99999" cy="6.81817" r="2.18182" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export const ClosedTradesIcon = ({ style }) => {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
            <path fillRule="evenodd" clipRule="evenodd" d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 14.4C4.472 14.4 1.6 11.528 1.6 8C1.6 4.472 4.472 1.6 8 1.6C11.528 1.6 14.4 4.472 14.4 8C14.4 11.528 11.528 14.4 8 14.4ZM6.4 9.736L11.672 4.464L12.8 5.6L6.4 12L3.2 8.8L4.328 7.672L6.4 9.736Z" fill="#262626"/>
        </svg>
    )
}

export const CancelledTradesIcon = ({ style }) => {
    return (
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
            <circle cx="8.5" cy="8.5" r="7.5" stroke="black" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.7494 6.24963L6.2494 10.7496" stroke="black" strokeWidth="1.5" strokeLinecap="square"/>
            <path d="M6.2494 6.24963L10.7494 10.7496" stroke="black" strokeWidth="1.5" strokeLinecap="square"/>
        </svg>
    )
}