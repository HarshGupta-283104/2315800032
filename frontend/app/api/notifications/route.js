const SAMPLE_DATA = [
  { ID: "1", Type: "Placement", Message: "AMD is hiring!", Timestamp: "2026-06-10 19:00:00", score: "233.13", weight: "100", recency: "133.13" },
  { ID: "2", Type: "Placement", Message: "Goldman Sachs recruiting", Timestamp: "2026-06-10 18:45:00", score: "231.75", weight: "100", recency: "131.75" },
  { ID: "3", Type: "Placement", Message: "Microsoft internship", Timestamp: "2026-06-10 18:15:00", score: "229.03", weight: "100", recency: "129.03" },
  { ID: "4", Type: "Result", Message: "mid-sem results out", Timestamp: "2026-06-10 18:30:00", score: "180.38", weight: "50", recency: "130.38" },
  { ID: "5", Type: "Result", Message: "project scores", Timestamp: "2026-06-10 17:49:00", score: "176.72", weight: "50", recency: "126.72" },
  { ID: "6", Type: "Result", Message: "semester GPA", Timestamp: "2026-06-10 17:00:00", score: "172.48", weight: "50", recency: "122.48" },
  { ID: "7", Type: "Event", Message: "farewell party", Timestamp: "2026-06-10 16:45:00", score: "131.22", weight: "10", recency: "121.22" },
  { ID: "8", Type: "Event", Message: "tech fest", Timestamp: "2026-06-09 14:30:00", score: "50.60", weight: "10", recency: "40.60" }
];

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 10;
    const page = parseInt(searchParams.get('page')) || 1;
    const notification_type = searchParams.get('notification_type');

    let data = [...SAMPLE_DATA];

    // Filter by type
    if (notification_type) {
      data = data.filter(n => n.Type === notification_type);
    }

    // Sort by score (highest first)
    data.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));

    // Paginate
    const startIdx = (page - 1) * limit;
    const endIdx = startIdx + limit;
    const paginated = data.slice(startIdx, endIdx);

    return Response.json(paginated);
  } catch (error) {
    console.error('API error:', error);
    return Response.json(SAMPLE_DATA, { status: 200 });
  }
}

