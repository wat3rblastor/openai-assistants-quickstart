import { sql } from '@vercel/postgres';

// Send a new message to a thread
export async function POST(request) {
    const { threadId } = await request.json();
    try {
        if (!threadId) throw new Error("threadId required!");
        await sql`INSERT INTO MessageThreadId (threadid) VALUES (${threadId});`;
    } catch (error) {
        return Response.json({ error });
    }
    return Response.json({ threadId: threadId })
};