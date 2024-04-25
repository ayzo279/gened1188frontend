import React from 'react';
import { Link } from 'react-router-dom';

// PostTile component to display each post
const PostTile = ({ id, title, date }) => {
  const day = new Date(date);

  // Format date and time in a readable format
  const formattedDate = day.toLocaleDateString('en-US', {
  year: 'numeric', month: 'long', day: 'numeric'
  });
  const formattedTime = day.toLocaleTimeString('en-US', {
  hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
  return (
    <div style={styles.postTile}>
      <Link to={`/discussion/${id}`} style={styles.tile}>
      <h4>{title}</h4>
      <small>{formattedDate} {formattedTime}</small>
      </Link>
    </div>
  );
};

// Styles for the PostTile
const styles = {
    postTile: {
      color: "black",
      width: '100%', // Each tile takes up the full width of the posts container
      minHeight: '150px', // Each tile takes up one-fifth of the viewport height
      margin: '10px 0', // Vertical margin
      padding: '20px 50px',
      boxSizing: 'border-box', // Includes padding and border in the element's total width and height
      backgroundColor: '#fff',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      overflow: 'hidden', // Ensures the content does not overflow
      borderRadius: "10px",
      display: 'flex',
    }
  };

export default PostTile;
