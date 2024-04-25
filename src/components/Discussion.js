import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook from react-router-dom
import Message from '../components/Message';
import { useParams } from 'react-router-dom';

const Discussion = () => {
  const { promptId } = useParams();
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [loadmessages, setLoadMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();  // Initialize the useNavigate hook
  const [document, setDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto';  // Reset the height to shrink if needed
    textarea.style.height = `${textarea.scrollHeight}px`;  // Set height to scroll height to expand
  };
  
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

  useEffect(() => {
    const fetchMessages = async () => {
        if (!promptId) return;  // Ensure there is a promptId available
        try {
            const response = await fetch(`http://3.22.108.71/get-messages/${promptId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }
            const data = await response.json();
            setLoadMessages(data);  // Set fetched messages to state
        } catch (error) {
            console.error('There was an error fetching the messages:', error);
        }
        // try {
        //     const response = await fetch(`http://3.22.108.71/get-discussions/${promptId}`);
        //     if (!response.ok) {
        //         throw new Error('Failed to fetch messages');
        //     }
        //     const data = await response.json();
        //     console.log(data)
        // } catch (error) {
        //     console.error('There was an error fetching the messages:', error);
        // }
    };
    const fetchPrompt = async () => {
        if (!promptId) return;  // Ensure there is a promptId available
        try {
            const response = await fetch(`http://3.22.108.71/get-discussions/${promptId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }
            const data = await response.json();
            setPrompt(data[0].prompt)
            // setLoadMessages(data);  // Set fetched messages to state
        } catch (error) {
            console.error('There was an error fetching the messages:', error);
        }
    };
    fetchMessages();
    fetchPrompt();
    }, [loadmessages, promptId]);
  // Empty dependency array to run only on component mount
    const handleSendMessage = () => {
        if (!promptId) return;  // Ensure there is a promptId available
        
        if (newMessage.trim()) {
            const messageData = {
                prompt: prompt,
                promptId: promptId,
                content: newMessage,
            };
    
            fetch('http://3.22.108.71/post-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to post message');
                }
                return response.json();
            })
            .then(data => {
                setLoadMessages(prevMessages => [...prevMessages, data]); // Add new message to the list
                setNewMessage(""); // Clear input after successful send
            })
            .catch(err => {
                console.error('There was an error posting the message:', err);
                setNewMessage(""); // Clear input after successful send
            });
        }
    };

  const handleBack = () => {
    navigate(-1);  // Navigate back to the previous page
  };
  return (
    <div style={{ padding: '100px', backgroundColor: 'rgb(213, 223, 255)' }}>
      <button onClick={handleBack} style={styles.backButton}>BACK TO FORUM</button>
      <h2>{loadmessages ? prompt : "Loading discussion topic..."}</h2>      
      <div style={styles.messagesContainer}>
        {loadmessages.map((msg, index) => (
            <Message key={msg.id || index} message={msg} />  // Use the Message component
        ))}
      </div>
      <div style={styles.inputContainer}>
        <textarea
          type="text"
          value={newMessage}
          onChange={(e) => {setNewMessage(e.target.value); handleInput(e)}}
          placeholder="Type your message here..."
          style={styles.input}
        />
        <button onClick={handleSendMessage} style={styles.button}>SEND</button>
      </div>
    </div>
  );
};

const styles = {
    backButton: {
        padding: '10px 20px',
        fontSize: '14px',
        color: 'white',
        backgroundColor: '#BC0A34',
        borderRadius: '5px'
    },
    messagesContainer: {
      height: '55vh',  // Fixed height set to 75% of the viewport height
      overflowY: 'auto',  // Makes the container scrollable
      border: '1px solid #ccc',
      borderRadius: "10px",
      padding: '10px',
      marginBottom: '10px',
      backgroundColor: 'white',
    },
    message: {
      backgroundColor: '#f4f4f8',
      padding: '8px',
      borderRadius: '5px',
      margin: '5px 0',
      color: 'black'
    },
    inputContainer: {
        padding: '10px 0',
        display: 'flex',
        justifyContent: 'space-between',
        height: '10vh',
    },
    input: {
        width: '93%',  // Ensures textarea takes the full container width
        minHeight: '50px',  // Minimum height of the textarea
        overflowY: 'hidden',  // Prevents scrollbar from appearing inside the textarea
        padding: '10px 5px',
        boxSizing: 'border-box',  // Include padding and border in the element's width and height
        resize: 'none',  // Disables manual resizing
        transition: "height 0.2s"
    },
    button: {
        padding: '20px',
        marginLeft: '10px',
        fontSize: '20px',
        color: 'white',
        backgroundColor: '#BC0A34',
        borderRadius: '10px'
    }
  };

export default Discussion;
