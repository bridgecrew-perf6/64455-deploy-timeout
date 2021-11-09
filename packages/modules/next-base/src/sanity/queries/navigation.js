import groq from 'groq';

import { buildNodesProjection } from '@app/lib/node';

export const buildNavigationProjection = (name, levels = 2) => {
  const nodesProjection = buildNodesProjection(levels);
  return groq`
  ... {
    navigation.${name}->hidden => { '${name}': null },
    navigation.${name}->hidden != true => { '${name}': navigation.${name}->{ ${nodesProjection} }} 
  }`;
};

export const navigationProjection = groq`
  ${buildNavigationProjection('primary')},
  ${buildNavigationProjection('secondary')},
  ${buildNavigationProjection('toolbar')},
`;
