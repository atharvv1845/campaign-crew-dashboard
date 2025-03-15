
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
    memberId: string;
    responses: number;
    positive: number;
  }>;
}

// Reset outreach data to zero values
export const outreachMockData: OutreachData = {
  today: 0,
  thisWeek: 0,
  thisMonth: 0,
  responseRate: 0,
  positiveResponses: 0,
  negativeResponses: 0,
  notReplied: 0,
  teamPerformance: []
};
