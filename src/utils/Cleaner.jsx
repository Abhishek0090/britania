import { useEffect } from 'react';

export default function Cleaner() {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return <></>;
}
