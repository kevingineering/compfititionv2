import React, { useRef } from 'react';

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
      <input
        type='text'
        ref={text}
        placeholder='Search Users'
        onChange={handleChange}
        className='margin-0 no-top-border'
      />
    </form>
  );
};

export default SearchBar;
