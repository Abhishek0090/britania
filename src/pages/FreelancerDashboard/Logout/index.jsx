import React, { useEffect } from 'react';
import { logout } from '~/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SuspenseLoader from '~/components/SuspenseLoader';

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
  }, []);

  return (
    <>
      <SuspenseLoader />
    </>
  );
}
