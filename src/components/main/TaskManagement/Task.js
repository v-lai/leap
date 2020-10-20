import React from 'react';
import { darkNavy, white } from '../../../themes/theme';

export default function Task({ color, text }) {
  return (
    <div
      style={{
        padding: '1rem',
        marginBottom: '0.3rem',
        backgroundColor: white,
        borderRadius: '0.5rem',
        boxShadow: '0 4pt 4pt rgba(0, 0 , 0, 0.25)',
        display: 'flex',
      }}
    >
      <p
        style={{
          width: '1rem',
          height: '1rem',
          minWidth: '1rem',
          MozBorderRadius: '50%',
          WebkitBorderRadius: '50%',
          borderRadius: '50%',
          KhtmlBorderRadius: '50%',
          backgroundColor: color,
          border: 'none',
          margin: '0 0.8rem 0 0',
        }}
      ></p>
      <span style={{ color: darkNavy }}>{text}</span>
    </div>
  );
}
