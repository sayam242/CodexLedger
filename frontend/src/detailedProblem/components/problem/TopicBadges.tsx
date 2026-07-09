import { Badge } from '@/components/ui/badge';

interface TopicBadgesProps {
  topics: string[];
}

export default function TopicBadges({ topics }: TopicBadgesProps) {
  if (!topics || topics.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {topics.map((topic) => (
        <Badge
          key={topic}
          className="bg-teal-50 text-teal-700 border-teal-200 text-xs font-medium px-2.5 py-0.5 rounded-full"
        >
          {topic}
        </Badge>
      ))}
    </div>
  );
}
