import React from 'react';
import '../../../styles/Common.css';

type Button2DProps = {
  label: string;
};

export default function Button2D(
  props: JSX.IntrinsicElements['button'] & Button2DProps,
) {
  const { label } = props;

  return (
    <button className="common-btn-2d" {...props}>
      {label}
    </button>
  );
}
