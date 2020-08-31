import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
 
const EmojiComponent = () => {
  const [chosenEmoji, setChosenEmoji] = useState(null);
 
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };
 
  return (
    <div>
      {chosenEmoji ? (
        <span>You chose: {chosenEmoji.emoji}</span>
      ) : (
        <span>No emoji Chosen</span>
      )}
      <Picker onEmojiClick={onEmojiClick} preload={false}/>
    </div>
  );
};

export default EmojiComponent;