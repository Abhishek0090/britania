import React, { useEffect } from 'react';

import { useNavigate } from 'react-router';
export default function AssignmentSubmit() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/team/management/student/assignment/assign-submit');
    localStorage.removeItem('persist:root.student');
  }, []);

  return <></>;
}
