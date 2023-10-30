const { useState } = require('react');

const useCount = () => {
  const [count, setCount] = useState(0);

  return {
    count,
    setCount,
  };
};

export default useCount;
