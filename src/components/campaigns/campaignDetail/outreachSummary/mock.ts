
export interface OutreachData {
  today: number;
  thisWeek: number;
  thisMonth: number;
  responseRate: number;
  positiveResponses: number;
  negativeResponses: number;
  notReplied: number;
  teamPerformance: Array<{
    member: string;
    responses: number;
    positive: number;
  }>;
}

// Mock data for outreach summary
export const outreachMockData: OutreachData = {
  today: 12,
  thisWeek: 68,
  thisMonth: 253,
  responseRate: 31,
  positiveResponses: 42,
  negativeResponses: 19,
  notReplied: 192,
  teamPerformance: [
    { member: 'John Smith', responses: 24, positive: 18 },
    { member: 'Sarah Lee', responses: 20, positive: 12 },
    { member: 'Alex Chen', responses: 16, positive: 8 },
    { member: 'Mia Johnson', responses: 12, positive: 4 },
  ]
};
