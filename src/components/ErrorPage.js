import React from "react";
import Meteor from '../assets/img/Meteor.png'

const ErrorPage = () => {
    return <div style={{ 'width': '100%', 'height': '100%', 'textAlign': 'center', 'color': '#ffffff' }}>
        <img src={Meteor} style={{ 'width': '200px', 'marginTop': '48px' }} />
        <div style={{ 'fontSize': '24px', 'marginTop': '24px' }}>Houston, we have a problem</div>
        <div style={{ 'fontSize': '16px', 'marginTop': '24px', 'color': '#c4c4c4' }}>An error occurred</div>
    </div>
}

export default ErrorPage;