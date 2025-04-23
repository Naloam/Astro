import fs from 'fs';
import path from 'path';

export function getFileDates(filePath: string) {
  try {
    const stats = fs.statSync(filePath);
    return {
      created: stats.birthtime,
      modified: stats.mtime
    };
  } catch (error) {
    console.error(`Error getting file dates for ${filePath}:`, error);
    return {
      created: new Date(),
      modified: new Date()
    };
  }
} 