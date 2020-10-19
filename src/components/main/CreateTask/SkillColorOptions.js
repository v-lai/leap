import React from 'react';
import { Button } from '../../base/Button/Button';
import {
  bluegrey,
  darkNavy,
  forest,
  grapefruit,
  greyLime,
  greyPurple,
  lavender,
  orange,
  peacock,
  perrywinkle,
  powderBlue,
  softPink,
  steelGrey,
  teal,
  wheat,
  wisteria,
  black25,
  white,
} from '../../../themes/theme';

const COLOR_OPTIONS = [
  grapefruit,
  darkNavy,
  forest,
  greyPurple,
  orange,
  steelGrey,
  peacock,
  perrywinkle,
  softPink,
  bluegrey,
  greyLime,
  wisteria,
  wheat,
  powderBlue,
  teal,
  lavender,
];

export default function SkillColorOptions({
  skillColor,
  setColorSelection,
  done,
}) {
  return (
    <div
      style={{
        display: 'grid',
        width: '15.625rem',
        height: '13.75rem',
        borderRadius: '10px',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridTemplateRows: '2rem 1fr 1fr 1fr 1fr 0.25fr',
        justifyItems: 'center',
        alignItems: 'center',
        backgroundColor: white,
      }}
    >
      <p
        style={{
          gridColumnStart: 1,
          gridColumnEnd: 5,
          height: '0.938rem',
          lineHeight: '1rem',
          alignSelf: 'center',
          fontSize: '0.813rem',
          fontWeight: 'bold',
        }}
      >
        Click to select a color
      </p>
      {COLOR_OPTIONS.map((color) => (
        <Button
          key={color}
          type="button"
          aria-label={`color-${color}`}
          style={{
            backgroundColor: color,
            height: '1.563rem',
            width: '1.563rem',
            MozBorderRadius: '50%',
            WebkitBorderRadius: '50%',
            borderRadius: '50%',
            KhtmlBorderRadius: '50%',
            border: 'none',
            boxShadow: color === skillColor ? 'none' : `0 4px 4px 0 ${black25}`,
          }}
          onClick={() => {
            setColorSelection(color);
            done(false);
          }}
        />
      ))}
    </div>
  );
}
