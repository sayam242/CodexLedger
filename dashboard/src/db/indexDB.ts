const DB_NAME = "CodexLedgerDB";
const DB_VERSION = 1;

export function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {

    const request =
      indexedDB.open(
        DB_NAME,
        DB_VERSION
      );

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = () => {

      const db =
        request.result;

      if (
        !db.objectStoreNames.contains(
          "problems"
        )
      ) {
        db.createObjectStore(
          "problems",
          {
            keyPath: "id",
          }
        );
      }
    };
  });
}