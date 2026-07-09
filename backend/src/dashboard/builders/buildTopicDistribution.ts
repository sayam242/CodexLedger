import type { TopicDistributionItem } from "../dto/Dashboard.dto";

interface TopicCount {
    topicId: string;
    _count: {
        problemId: number;
    };
}

interface TopicName {
    id: string;
    name: string;
}

export function buildTopicDistribution(
    topicCounts: TopicCount[],
    topicNames: TopicName[]
): TopicDistributionItem[] {
    const nameMap = new Map(topicNames.map(t => [t.id, t.name]));

    return topicCounts
        .map(t => ({
            topic: nameMap.get(t.topicId) || 'Unknown',
            count: t._count.problemId
        }))
        .sort((a, b) => b.count - a.count);
}
