import { InsertCertField } from "~components/barCodeScanner/BarCodeScanner";

const insertScannedData = (data: InsertCertField, db: any) => {
  console.log("in insert data function", data);

  db.transaction((tx) => {
    // Check the number of rows
    tx.executeSql(
      "SELECT COUNT(*) as count FROM scanned_cert_data",
      [],
      (txObj, { rows: { _array } }) => {
        // Only stores up 20 results
        if (_array[0].count >= 20) {
          // Delete the oldest row
          tx.executeSql(
            "DELETE FROM scanned_cert_data WHERE index_id = (SELECT MIN(index_id) FROM scanned_cert_data)",
            [],
            () => {
              console.log("Oldest row deleted");
            }
          );
        }
      }
    );

    // Insert the new data
    tx.executeSql(
      "INSERT INTO scanned_cert_data (UUID, credential_type, end_date, extra, is_valid, issuer ,worker_signature, start_date, scanned_date, timeStamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        data.UUID,
        data.credential_type,
        data.end_date,
        data.extra,
        //1 for true and 0 for false
        Number(data.is_valid),
        data.issuer,
        data.worker_signature,
        data.start_date,
        data.scanned_date,
        data.timeStamp,
      ],
      (_, result) => console.log("Data inserted successfully"),
      (_, error) => {
        console.log("Error inserting data:", error);
        return false;
      }
    );
  });
};

export default insertScannedData;
