import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function MenuPizza() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/menu?section=pizze', { replace: true });
  }, [navigate]);

  return null;
}
