import React from 'react';
import { Button } from '@react-three/uikit-default';
import { Text } from '@react-three/uikit';

interface XRButtonProps {
  onClick: () => void;
  label: string;
}

const XRButton = ({ onClick, label }: XRButtonProps) => {
  return (
    <Button onClick={onClick} platter>
      <Text>{label}</Text>
    </Button>
  );
};

export default XRButton;
