import React from 'react';

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

const SkillColorOptions = ({ skillColor, setColorSelection, done }) => (
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
          height: '20px',
          width: '20px',
          MozBorderRadius: '50%',
          WebkitBorderRadius: '50%',
          borderRadius: '50%',
          KhtmlBorderRadius: '50%',
          border: color === skillColor ? '2px solid black' : 'none',
        }}
        onClick={() => setColorSelection(color)}
      />
    ))}
    <button
      type="button"
      className="button"
      style={{ gridColumnStart: 4 }}
      onClick={() => done(false)}
    >
      Done
    </button>
  </div>
);

export default SkillColorOptions;
