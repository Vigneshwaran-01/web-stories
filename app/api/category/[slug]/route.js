import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root13',
  database: process.env.DB_NAME || 'knowledge_base7',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function GET(request, context) {
  try {
    const { slug } = await context.params; // Await `context.params`

    const [articles] = await db.execute(
      `
      SELECT 
        articles.*,
        categories.title as category_title
      FROM articles 
      JOIN categories ON articles.category_id = categories.id
      WHERE categories.slug = ?
    `,
      [slug]
    );

    return NextResponse.json(articles);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
