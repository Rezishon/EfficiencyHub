-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TodoList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "items" JSONB NOT NULL DEFAULT [],
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_TodoList" ("createdAt", "id", "items", "name", "updatedAt") SELECT "createdAt", "id", "items", "name", "updatedAt" FROM "TodoList";
DROP TABLE "TodoList";
ALTER TABLE "new_TodoList" RENAME TO "TodoList";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
