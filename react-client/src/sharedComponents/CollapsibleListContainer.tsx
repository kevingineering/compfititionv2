import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <React.Fragment>
      <ul className='collection'>
        <li
          className={`collection-header ${
            isCollapsible ? 'header-with-btn' : ''
          }`}
        >
          {isH3 ? <h3>{title}</h3> : <h2>{title}</h2>}
          {isCollapsible && (
            <button
              className='btn btn-primary right'
              onClick={() => {
                setIsOpen((prevState) => !prevState);
              }}
            >
              <i className={isOpen ? 'fas fa-minus' : 'fas fa-plus'} />
            </button>
          )}
        </li>
        {isOpen && (
          <React.Fragment>
            {children}
            {hasLink && (
              <li className='collection-footer'>
                <Link
                  onClick={handleAdd}
                  to={linkTo}
                  className='text-secondary'
                >
                  <p className='padding-04 secondary-color'>
                    <i className='fas fa-plus' /> {linkMessage}
                  </p>
                </Link>
              </li>
            )}
          </React.Fragment>
        )}
      </ul>
    </React.Fragment>
  );
};

export default CollapsibleListContainer;
