/*
  Warnings:

  - The primary key for the `Media` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Media" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "hasTranscript" BOOLEAN NOT NULL DEFAULT false,
    "hasSubtitle" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Media" ("createdAt", "hasSubtitle", "hasTranscript", "id", "size", "title", "updatedAt", "url") SELECT "createdAt", "hasSubtitle", "hasTranscript", "id", "size", "title", "updatedAt", "url" FROM "Media";
DROP TABLE "Media";
ALTER TABLE "new_Media" RENAME TO "Media";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
