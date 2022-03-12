import React from 'react';
import { useDispatch } from "react-redux";
import { Button, Icon } from 'semantic-ui-react';

const AccountType = {
    'Dollar': {
        unit: 'USD',
        title: 'DOLLAR',
        color: '#21BA45',
        icon: 'dollar',
    },
    'Bitcoin': {
        unit: 'BTC',
        title: 'BITCOIN',
        color: '#EE9B00',
        icon: 'bitcoin',
    }
}

const BankAccount = ({ Type, Value }) => {
    const dispatch = useDispatch();
    const { unit, title, color, icon } = AccountType[Type];

    const ButtonClick = () => {
        dispatch({ type: 'SHOW_TOAST', payload: { toastType: 'warning', text: 'Money transfer is not possible in beta' } })
    }

    return <>
        <div style={{ 'color': '#F72585', 'fontSize': '24px', 'fontWeight': 'bold', 'marginTop': '4px', 'marginBottom': '24px' }}>Wallet</div>
        <Icon name={`${icon}`} size='massive' style={{ 'color': (color), 'marginTop': '16px' }} />
        <div style={{ 'color': (color), 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '48px' }}>{title}</div>
        <div style={{ 'color': (color), 'marginTop': '36px' }}>{Value} {unit}</div>
        <div className='dimmer-bottom'>
            <Button onClick={() => ButtonClick()} inverted icon labelPosition='left' color='green' >Withdraw <Icon name='chevron circle down' /></Button>
            <Button onClick={() => ButtonClick()} inverted icon labelPosition='left' color='blue'>Deposit <Icon name='chevron circle up' /></Button>
        </div>

    </>
}

export default BankAccount;