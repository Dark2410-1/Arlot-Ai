import TopicBadge from './TopicBadge';

export default function MessageBubble({ role, content, topic, pending }) {
  const isUser = role === 'user';

  return (
    <div className={`msg-row ${isUser ? 'msg-row-user' : 'msg-row-ai'}`}>
      {!isUser && (
        <div className="msg-avatar" aria-hidden="true">
          A
        </div>
      )}
      <div className={`msg-bubble ${isUser ? 'msg-user' : 'msg-ai'}`}>
        {!isUser && topic && (
          <div className="msg-meta">
            <TopicBadge topic={topic} />
          </div>
        )}
        <div className="msg-content">
          {content}
          {pending && <span className="msg-cursor" aria-hidden="true" />}
        </div>
      </div>
    </div>
  );
}
