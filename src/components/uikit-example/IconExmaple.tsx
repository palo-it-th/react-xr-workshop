import React from 'react';

import * as Icons from '@react-three/uikit-lucide';
import { Card, CardContent } from '@react-three/uikit-default';

export default function IconExample() {
  return (
    <Card width={400} color={'white'}>
      <CardContent>
        {Object.values(Icons)
          .filter((Icon, i) => 'render' in Icon && i % 2 === 0)
          .map((Icon: any, i) => (
            <Icon key={i} color={'white'} />
          ))}
      </CardContent>
    </Card>
  );
}
