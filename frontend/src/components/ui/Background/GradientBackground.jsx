import React from 'react';

function GradientBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        backgroundColor: '#000', // deep black base
        backgroundImage: `
          radial-gradient(circle at 30% 70%, rgba(0, 0, 255, 0.4) 0%, transparent 60%),
          radial-gradient(circle at 70% 30%, rgba(255, 0, 150, 0.4) 0%, transparent 60%)
        `,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    />
  );
}

export default GradientBackground;
