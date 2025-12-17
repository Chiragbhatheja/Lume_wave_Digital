import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'content.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data.projects);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newProject = await request.json();
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    newProject.id = String(Date.now());
    data.projects.push(newProject);
    
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return NextResponse.json(newProject, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedProject = await request.json();
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    const index = data.projects.findIndex((p: { id: string }) => p.id === updatedProject.id);
    if (index !== -1) {
      data.projects[index] = updatedProject;
      fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
      return NextResponse.json(updatedProject);
    }
    
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  } catch {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    data.projects = data.projects.filter((p: { id: string }) => p.id !== id);
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ message: 'Project deleted' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
