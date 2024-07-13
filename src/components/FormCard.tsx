import React from 'react';

interface FormCardProps {
  children: React.ReactNode;
}

const FormCard: React.FC<FormCardProps> = ({ children }) => {
  const cardStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#f0f4f8',
  };

  const contentStyle: React.CSSProperties = {
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    minWidth: '400px',
  };

  return (
    <div style={cardStyle}>
      <div style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

export default FormCard;
