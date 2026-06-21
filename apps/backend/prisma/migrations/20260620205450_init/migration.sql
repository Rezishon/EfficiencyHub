/*
  Warnings:

  - The primary key for the `TodoList` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TodoList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "items" JSONB NOT NULL DEFAULT [],
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_TodoList" ("createdAt", "id", "items", "name", "updatedAt") SELECT "createdAt", "id", "items", "name", "updatedAt" FROM "TodoList";
DROP TABLE "TodoList";
ALTER TABLE "new_TodoList" RENAME TO "TodoList";
CREATE UNIQUE INDEX "TodoList_name_key" ON "TodoList"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
