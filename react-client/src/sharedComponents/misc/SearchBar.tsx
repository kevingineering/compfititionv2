import React, { useRef } from 'react';
import styled from 'styled-components';

interface IProps {
  filter: (searchText: string) => void;
  clear: () => void;
}

const SearchBar: React.FC<IProps> = ({ filter, clear }) => {
  const text = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (text.current && text.current.value) {
      filter(e.target.value);
    } else clear();
  };

  return (
    <form>
      <SearchInput
        type='text'
        ref={text}
        placeholder='Search Users'
        onChange={handleChange}
      />
    </form>
  );
};

export default SearchBar;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.4rem;
  font-size: 1.2rem;
  border: 0.125rem solid var(--primary-color);
  border-top: none !important;
  background: var(--secondary-color);
  color: var(--primary-color);
`;
