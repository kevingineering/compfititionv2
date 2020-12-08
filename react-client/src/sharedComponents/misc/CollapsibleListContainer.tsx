import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../styledComponents/Button';
import styled from 'styled-components';

interface IProps {
  title: string;
  //hasLink, linkTo, linkMessage, and handleAdd add button to bottom of container used for redirect
  hasLink?: boolean;
  linkTo?: string;
  linkMessage?: string;
  handleAdd?: () => void;
  //isCollapsible === false removes button
  isCollapsible?: boolean;
  isH3?: boolean;
}

//list
const CollapsibleListContainer: React.FC<IProps> = ({
  children,
  title,
  hasLink = false,
  linkTo = '',
  linkMessage,
  handleAdd,
  isCollapsible = true,
  isH3 = false,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <ListContainer>
      <ListHeader isCollapsible={isCollapsible}>
        {isH3 ? <h3>{title}</h3> : <h2>{title}</h2>}
        {isCollapsible && (
          <CollapseButton
            onClick={() => {
              setIsOpen((prevState) => !prevState);
            }}
          >
            <i className={isOpen ? 'fas fa-times' : 'fas fa-plus'} />
          </CollapseButton>
        )}
      </ListHeader>
      {isOpen && (
        <React.Fragment>
          {children}
          {hasLink && (
            <ListFooter>
              <ListLink onClick={handleAdd} to={linkTo}>
                <LinkMessage>
                  <i className='fas fa-plus' /> {linkMessage}
                </LinkMessage>
              </ListLink>
            </ListFooter>
          )}
        </React.Fragment>
      )}
    </ListContainer>
  );
};

export default CollapsibleListContainer;

const ListContainer = styled.ul`
  margin-bottom: 2rem;
`;

const ListHeader = styled.li<{ isCollapsible: boolean }>`
  text-align: center;
  background: var(--primary-color);
  padding: 0.3rem 0;
  ${(props) =>
    props.isCollapsible &&
    'padding-left: 2rem; display: inline-flex;width: 100%;'}
  h2,
  h3 {
    color: var(--secondary-color);
    margin: 0 auto;
  }
`;

const ListFooter = styled.li`
  text-align: center;
  background: var(--primary-color);
  color: var(--secondary-color);
  padding: 0;
`;

const LinkMessage = styled.p`
  color: var(--secondary-color);
  padding: 0.4rem;
`;

const ListLink = styled(Link)`
  color: var(--secondary-color);
`;

const CollapseButton = styled(Button)`
  background: var(--primary-color);
  i {
    color: var(--secondary-color);
  }
  padding: 0 1.3rem 0 0;
`;
