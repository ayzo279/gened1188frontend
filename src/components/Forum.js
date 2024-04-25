import React, { useEffect, useState } from 'react';
import SideTab from '../components/Sidetab';
import Posts from '../components/Posts';

const Forum = () => {
  return (
      <div style={styles.forum}>
          {/* <SideTab /> */}
          <Posts />
      </div>
  );
};

// Styles
const styles = {
    forum: {
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center', // Centers children vertically in the container
      backgroundColor: 'rgb(213, 223, 255)',
    },
  };


export default Forum;
