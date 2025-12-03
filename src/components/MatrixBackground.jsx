import React, { useEffect, useRef } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = '01';
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const streams = [];
    const maxStreams = 8;

    const createStream = () => {
      return {
        x: Math.floor(Math.random() * columns) * fontSize,
        y: -Math.random() * canvas.height,
        speed: 2 + Math.random() * 3,
        length: 15 + Math.random() * 20,
      };
    };

    for (let i = 0; i < maxStreams; i++) {
      if (Math.random() > 0.5) {
        streams.push(createStream());
      }
    }

    let animationFrameId;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      streams.forEach((stream, index) => {
        for (let i = 0; i < stream.length; i++) {
          const char = characters[Math.floor(Math.random() * characters.length)];
          const y = stream.y - i * fontSize;

          const opacity = (stream.length - i) / stream.length * 0.15;
          ctx.fillStyle = `rgba(34, 197, 94, ${opacity})`;

          if (y > 0 && y < canvas.height) {
            ctx.fillText(char, stream.x, y);
          }
        }

        stream.y += stream.speed;

        if (stream.y - stream.length * fontSize > canvas.height) {
          streams[index] = createStream();
        }
      });

      if (streams.length < maxStreams && Math.random() > 0.98) {
        streams.push(createStream());
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.5 }}
    />
  );
};

export default MatrixBackground;
