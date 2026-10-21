-- CreateTable
CREATE TABLE "Record" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL DEFAULT 'BOOK',
    "status" TEXT NOT NULL DEFAULT 'WISHLIST',
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publisher" TEXT,
    "isbn" TEXT,
    "summary" TEXT NOT NULL,
    "impression" TEXT,
    "insight" TEXT,
    "application" TEXT,
    "review" TEXT,
    "rating" REAL NOT NULL DEFAULT 0,
    "grade" TEXT NOT NULL DEFAULT 'NORMAL',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "ageGroup" TEXT,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "proSummary" TEXT,
    "proLessons" TEXT,
    "proDiscussion" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Record_status_idx" ON "Record"("status");

-- CreateIndex
CREATE INDEX "Record_grade_idx" ON "Record"("grade");
