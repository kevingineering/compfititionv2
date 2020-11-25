import React from 'react';
import CollapsibleListContainer from '../../../../sharedComponents/CollapsibleListContainer';

//TODO
interface IProps {
  compId: string;
}

const Invites: React.FC<IProps> = ({ compId }) => {
  return <CollapsibleListContainer title='Invites'></CollapsibleListContainer>;
};

export default Invites;
