// --- src/utils/logger.ts ---
import fs from 'fs';
export const logToFile = (message: string) => {
  fs.appendFileSync('log.txt', `[${new Date().toISOString()}] ${message}\n`);
};
