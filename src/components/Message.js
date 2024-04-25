import React from 'react';

const Message = ({ message }) => {
    // Create a Date object
    const date = new Date(message.date);

    // Format date and time in a readable format
    const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    return (
        <div style={styles.message}>
            <p>{message.content}</p>
            <small>{formattedDate} {formattedTime}</small>
        </div>
    );
};

const styles = {
    message: {
        backgroundColor: '#f4f4f8',
        color: 'black',
        padding: '5px 70px 20px 30px',
        borderRadius: '5px',
        margin: '10px 25px',
        marginBottom: '25px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
};

export default Message;
