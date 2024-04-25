import React, { useEffect, useState } from 'react';
import genedlogo from '../components/genedlogo.png';

const Home = () => {
  const [document, setDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://3.22.108.71/retrieve')  // Adjust the URL as needed
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        setDocument(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!document) {
    return <div>No content available</div>;
  }
  
  return (
    <div style={styles.content}>
      <div style={styles.logo}>
        <img style={styles.logo} src={genedlogo} alt="Logo" style={{ width: '500px', height: 'auto' }} />
      </div>
      <h1 style={styles.special}>Week 1 (April 22 - 28)</h1>
      <div dangerouslySetInnerHTML={{ __html: document.document.content }} />
      <div style={styles.discussionPrompt}>
        <h2>{document.document.discussion}</h2>
        <p>Have thoughts to share about this topic?</p>
        <button style={styles.but} onClick={() => window.location.href='/forum'}>JOIN THE DISCUSSION</button>
      </div>
    </div>
  );
};

// Styles
const styles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '100px',
    // marginTop: '60px', // Adjusted for navbar height
    maxWidth: '800px', // Keeps the content nicely aligned
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  discussionPrompt: {
    marginTop: '50px'
  },
  logo: {
    margin: '25px 0'
  },
  but: {
    padding: '20px',
    fontSize: '20px',
    color: 'white',
    backgroundColor: '#BC0A34',
    borderRadius: '10px'
  },
  special: {
    padding: '0px',
    margin: '10px',
    fontSize: '20px'
  }
};

export default Home;
