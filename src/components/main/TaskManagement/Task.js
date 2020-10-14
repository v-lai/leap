import React from 'react';

const Task = ({ color, text }) => (
  <div
    style={{
      padding: '1rem',
      marginBottom: '0.3rem',
      backgroundColor: '#faf9f9',
      borderRadius: '0.5rem',
      boxShadow: '0 4pt 4pt rgba(0, 0 , 0, 0.25)',
      display: 'flex',
      alignContent: 'center',
    }}
  >
    <p
      style={{
        width: '1rem',
        height: '1rem',
        MozBorderRadius: '50%',
        WebkitBorderRadius: '50%',
        borderRadius: '50%',
        KhtmlBorderRadius: '50%',
        backgroundColor: color,
        border: 'none',
        margin: '0 0.8rem 0 0',
      }}
    ></p>
    <span style={{ color: '#16425B' }}>{text}</span>
  </div>
);

export { Task };
