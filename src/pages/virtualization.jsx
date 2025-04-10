import React, { useEffect, useState } from 'react';
import { FixedSizeList as List } from 'react-window';

const ITEM_HEIGHT = 70;

const Virtualization = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/comments');
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error('Error fetching comments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const Row = ({ index, style }) => {
    const comment = comments[index];
    return (
      <div
        style={{
          ...style,
          boxSizing: 'border-box',
          padding: '0.5rem',
          borderBottom: '1px solid #eee',
        }}
      >
        <strong>{comment.name}</strong> ({comment.email})
        <br />
        {comment.body}
      </div>
    );
  };

  return (
    <div>
      <h1>Virtualization</h1>
      {loading ? (
        <p>Loading comments...</p>
      ) : (
        <List
          height={600}
          itemCount={comments.length}
          itemSize={ITEM_HEIGHT}
          width="100%"
        >
          {Row}
        </List>
      )}
    </div>
  );
};

export default Virtualization;
