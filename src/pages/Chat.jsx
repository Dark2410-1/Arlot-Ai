import ChatWindow from '../components/ChatWindow';
import './chat.css';

export default function Chat() {
  return (
    <section className="chat-page">
      <div className="container chat-page-inner">
        <ChatWindow />
      </div>
    </section>
  );
}
