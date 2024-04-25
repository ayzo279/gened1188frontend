import React from 'react';

// Navbar component
export const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <a href="/" style={styles.navLink}>HOME</a>
        </li>
        <li style={styles.navItem}>
          <a href="/forum" style={styles.navLink}>FORUM</a>
        </li>
      </ul>
    </nav>
  );
};

// Styles
const styles = {
  navbar: {
    backgroundColor: '#91072F',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
    position: 'fixed',
    width: '100vw',
    zIndex: 999,
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    margin: 0,
    padding: '10px 50px',
  },
  navItem: {
    margin: '0 30px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '20px',
    fontWeight: 'bold',
  }
};
