import React from 'react';
import { Button } from '../../base/Button/Button';

const COLOR_OPTIONS = [
  '#FF8074',
  '#003A4F',
  '#34563E',
  '#6F6888',
  '#FFA865',
  '#657677',
  '#3D9D7A',
  '#7F91C6',
  '#FF9CC4',
  '#6AA4BC',
  '#AED79B',
  '#B180BB',
  '#FCDD7D',
  '#B2D6EA',
  '#AEDFD6',
  '#C8AAD0',
];

export default function SkillColorOptions ({ skillColor, setColorSelection, done }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridTemplateRows: '50px 50px 50px 50px 30px',
        justifyItems: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
      }}
    >
      {COLOR_OPTIONS.map((color) => (
        <button
          key={color}
          type="button"
          aria-label={`color-${color}`}
          style={{
            backgroundColor: color,
            height: '1.5rem',
            width: '1.5rem',
            MozBorderRadius: '50%',
            WebkitBorderRadius: '50%',
            borderRadius: '50%',
            KhtmlBorderRadius: '50%',
            border: color === skillColor ? '2px solid black' : 'none',
          }}
          onClick={() => setColorSelection(color)}
        />
      ))}
      <Button
        type="button"
        className="button"
        style={{ gridColumnStart: 4, lineHeight: '1rem' }}
        onClick={() => done(false)}
      >
        Done
      </Button>
    </div>
  );
};
