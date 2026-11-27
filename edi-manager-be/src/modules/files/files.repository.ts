import { Injectable } from '@nestjs/common';
import { CreateFileBody } from './files.types.js';
import { db } from '@/prisma/db.js';

@Injectable()
export class FilesRepository {
  async createFile(body: CreateFileBody): Promise<string> {
    const newFile = await db.orm.public.Files.create(body);
    return newFile.id;
  }
}
