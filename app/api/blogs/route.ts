import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'content.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data.blogs);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newBlog = await request.json();
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    newBlog.id = newBlog.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    data.blogs.push(newBlog);
    
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return NextResponse.json(newBlog, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedBlog = await request.json();
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    const index = data.blogs.findIndex((b: { id: string }) => b.id === updatedBlog.id);
    if (index !== -1) {
      data.blogs[index] = updatedBlog;
      fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
      return NextResponse.json(updatedBlog);
    }
    
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  } catch {
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    data.blogs = data.blogs.filter((b: { id: string }) => b.id !== id);
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ message: 'Blog deleted' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
