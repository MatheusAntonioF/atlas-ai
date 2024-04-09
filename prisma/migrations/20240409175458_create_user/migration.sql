-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "external_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Media" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "url_transcript" TEXT,
    "url_subtitle" TEXT,
    "url_media_with_subtitle" TEXT,
    "language" TEXT NOT NULL DEFAULT 'en',
    "hasTranscript" BOOLEAN NOT NULL DEFAULT false,
    "hasSubtitle" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Media_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Media" ("createdAt", "hasSubtitle", "hasTranscript", "id", "language", "size", "title", "updatedAt", "url", "url_media_with_subtitle", "url_subtitle", "url_transcript") SELECT "createdAt", "hasSubtitle", "hasTranscript", "id", "language", "size", "title", "updatedAt", "url", "url_media_with_subtitle", "url_subtitle", "url_transcript" FROM "Media";
DROP TABLE "Media";
ALTER TABLE "new_Media" RENAME TO "Media";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
