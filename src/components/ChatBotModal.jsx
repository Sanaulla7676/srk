import React, { useState } from 'react';

export default function ChatBotModal({
  isChatBotOpen,
  setIsChatBotOpen,
  chatMessages,
  setChatMessages
}) {
  const [chatInput, setChatInput] = useState('');

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      let botReply = 'Thank you for contacting Shri RK Junior Support! How else can I assist you today?';
      const lower = userMsg.toLowerCase();
      if (lower.includes('track') || lower.includes('order'))
        botReply = "You can track your order live inside your Profile Modal under 'Order History'!";
      else if (lower.includes('return') || lower.includes('exchange'))
        botReply = 'We offer a 14-day hassle-free return policy. Go to Profile > Order History > Return Order!';
      else if (lower.includes('size') || lower.includes('fit'))
        botReply = "Click 'KIDS SIZE CHART' inside any product quick view to see detailed age-to-chest measurements.";

      setChatMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-4 left-4 z-40">
      {isChatBotOpen ? (
        <div className="bg-white dark:bg-darkCard border border-gray-200 dark:border-darkBorder rounded-lg shadow-2xl w-72 h-80 flex flex-col">
          <div className="bg-gray-900 text-white p-3 rounded-t-lg flex justify-between items-center text-xs font-bold">
            <span>
              <i className="fa-solid fa-robot text-brandGold mr-1"></i> Shri RK Support AI
            </span>
            <button onClick={() => setIsChatBotOpen(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="flex-grow p-3 overflow-y-auto space-y-2 text-xs">
            {chatMessages.map((m, idx) => (
              <div
                key={idx}
                className={`p-2 rounded max-w-[85%] ${
                  m.sender === 'user'
                    ? 'bg-brandPink text-white ml-auto'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="p-2 border-t dark:border-gray-800 flex gap-1">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
              placeholder="Ask a question..."
              className="flex-grow text-xs p-1 border rounded bg-transparent outline-none dark:text-white"
            />
            <button onClick={handleChatSend} className="bg-brandPink text-white text-xs px-2.5 rounded">
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsChatBotOpen(true)}
          className="bg-gray-900 text-brandGold border border-brandGold w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-xl hover:scale-110 transition-transform"
        >
          <i className="fa-solid fa-comments"></i>
        </button>
      )}
    </div>
  );
}
