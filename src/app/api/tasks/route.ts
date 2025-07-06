// src/app/api/tasks/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const formData = await req.formData();
  const text = formData.get('text') as string;
  const difficulty = formData.get('difficulty') as string;
  const file = formData.get('image') as File | null;

  if (!text || !difficulty) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  let imageUrl = '';

  if (file) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${uuidv4()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), 'public/images');
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);
    imageUrl = `/images/${fileName}`;
  }

  const task = await prisma.task.create({
    data: {
        
      text,
      difficulty,
      image: imageUrl,
    },
  });

  return NextResponse.json({ task });
}
