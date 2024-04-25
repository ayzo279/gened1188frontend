import React, { useEffect, useState } from 'react';
import PostTile from '../components/PostTile';


const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://3.22.108.71/get-discussions')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setPosts(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch posts:', err);
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading posts: {error}</div>;
    console.log(posts)
    return (
        <div style={styles.postsContainer}>
          {posts.toReversed().map((msg, index) => (
              <PostTile key={msg._id || index} id={msg._id} title={msg.prompt} date={msg.data} />  // Use the Message component
          ))}
        </div>
    );
};

// Styles for the posts container
const styles = {
  postsContainer: {
    padding: '100px 0px', // Horizontal padding for better spacing
    width: '80%',
    display: 'flex',
    flexDirection: 'column', // Stack posts vertically
    overflowY: 'auto', // Allows scrolling vertically if posts exceed the view height
  }
};


export default Posts;
