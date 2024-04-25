import React from 'react';

// SideTab component
const SideTab = ({ onNewPost, onSelectTopic }) => {
  const topics = ['Technology', 'Health', 'Education', 'Entertainment']; // Example topics

  return (
    <div style={styles.sideTab}>
      <button style={styles.button} onClick={onNewPost}>
        Write a Post
      </button>
      <div style={styles.tabs}>
        {topics.map(topic => (
          <button key={topic} style={styles.tabButton} onClick={() => onSelectTopic(topic)}>
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
};

// Styles
const styles = {
  sideTab: {
    position: 'fixed',
    left: 0,
    top: '50px', // Adjust based on the height of your Navbar
    width: '200px',
    height: '100%',
    backgroundColor: '#f8f9fa',
    boxSizing: 'border-box',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    padding: '10px 20px',
    margin: '10px 0',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
    backgroundColor: '#4CAF50', // Green color for the post button
    color: 'white',
    border: 'none',
  },
  tabs: {
    width: '100%',
  },
  tabButton: {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    cursor: 'pointer',
    backgroundColor: '#007BFF', // Blue color for the tabs
    color: 'white',
    border: 'none',
  }
};

export default SideTab;
