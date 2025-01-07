import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root13',
  database: process.env.DB_NAME || 'knowledge_base7',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
export async function GET(request, { params }) {
    try {
      const { slug } = await params; // Await `params`
  
      const [articles] = await db.execute(
        `
        SELECT 
          articles.*,
          categories.title as category_title,
          categories.slug as category_slug
        FROM articles 
        JOIN categories ON articles.category_id = categories.id
        WHERE articles.slug = ?
      `,
        [slug]
      );
  
      if (articles.length === 0) {
        return NextResponse.json(
          { error: 'Article not found' },
          { status: 404 }
        );
      }
  
      return NextResponse.json(articles[0]);
    } catch (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }
  