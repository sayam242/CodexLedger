import { Badge } from '@/components/ui/badge';

interface TopicBadgesProps {
  topics: string[];
}


export default function TopicBadges({ topics }: TopicBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {topics.map((topic) => (
        <Badge key={topic} variant="outline" className="bg-blue-50">
          {topic}
        </Badge>
      ))}
    </div>
  );
}
