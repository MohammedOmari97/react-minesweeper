import React, { useRef, useState, useEffect } from 'react';

export default function Emoji({ cells, gameOver, winning }) {
  const emojiRef = useRef();
  const [emoji, setEmoji] = useState('smile');

  const gameOverRef = useRef();
  const winningRef = useRef();

  useEffect(() => {
    if (gameOver) {
      gameOverRef.current = true;
      setEmoji('crying');
    } else if (winning) {
      gameOverRef.current = true;
      setEmoji('inLove');
    } else {
      setEmoji('laugh');
      setTimeout(() => {
        if (!gameOverRef.current && !winningRef.current) {
          setEmoji('smile');
        } else {
          gameOverRef.current = false;
          winningRef.current = false;
        }
      }, 200);
    }
  }, [cells, gameOver, winning]);

  return (
    <div className="emoji">
      <img ref={emojiRef} src={`./emojis/${emoji}.svg`} alt="laughing emoji" />
    </div>
  );
}
