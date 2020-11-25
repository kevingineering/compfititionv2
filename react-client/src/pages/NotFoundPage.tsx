import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

//redirects in 5 seconds
const NotFoundPage = () => {
  let history = useHistory();
  const [count, setCount] = useState(5);

  useEffect(() => {
    setTimeout(() => {
      if (count === 1) {
        console.log('redirect from not found');
        history.push('/');
      } else {
        setCount((prevCount) => prevCount - 1);
      }
    }, 1000);
  }, [count, history]);

  return (
    <div>
      <span>{`Page not found. Redirecting in ${count}...`}</span>
    </div>
  );
};

export default NotFoundPage;
