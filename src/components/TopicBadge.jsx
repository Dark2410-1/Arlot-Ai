const CONFIG = {
  code: { label: 'CODE', className: 'badge-code' },
  game: { label: 'GAME', className: 'badge-game' },
  other: { label: 'UMUMIY', className: 'badge-other' },
};

export default function TopicBadge({ topic }) {
  const cfg = CONFIG[topic] || CONFIG.other;
  return <span className={`topic-badge mono ${cfg.className}`}>{cfg.label}</span>;
}
