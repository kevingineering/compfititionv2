import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootStore } from '../../../../redux/Store';

interface IProps {
  name: string;
  userId: string;
}

const AdminItem: React.FC<IProps> = ({ name, userId }) => {
  const userState = useSelector((state: RootStore) => state.userState);

  return (
    <AdminItemContainer>
      <span>
        {/* don't provide link to user's own page */}
        {userId === userState.user!.userId! ? (
          <strong>{name}</strong>
        ) : (
          <Link to={`/friend/${userId}`}>
            <strong>{name}</strong>
          </Link>
        )}
      </span>
    </AdminItemContainer>
  );
};

export default AdminItem;

const AdminItemContainer = styled.p`
  padding: 0.1rem 0.5rem;
  width: 100%;
  border-left: 0.125rem solid var(--primary-color);
  border-right: 0.125rem solid var(--primary-color);
`;
