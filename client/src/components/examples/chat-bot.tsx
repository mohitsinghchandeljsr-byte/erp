import { ChatBot } from "../chat-bot";

export default function ChatBotExample() {
  return (
    <div className="h-screen bg-background p-8">
      <h2 className="text-2xl font-semibold">Conversational Bot Assistant</h2>
      <p className="text-muted-foreground mt-2">
        Click the button in the bottom right to open the chat
      </p>
      <ChatBot />
    </div>
  );
}
