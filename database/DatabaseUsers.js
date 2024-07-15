import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "TestDB.db";
const database_version = "1.0";
const database_displayname = "SQLite Test Database";
const database_size = 200000;

export const getDBConnection = async () => {
  return SQLite.openDatabase(
    database_name,
    database_version,
    database_displayname,
    database_size
  );
};

export const createTable = async (db) => {
  const query = `CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    age INTEGER
  );`;
  await db.executeSql(query);
};

export const getUsers = async (db) => {
  const users = [];
  const results = await db.executeSql('SELECT * FROM Users');
  results.forEach(result => {
    for (let i = 0; i < result.rows.length; i++) {
      users.push(result.rows.item(i));
    }
  });
  return users;
};

export const insertUser = async (db, name, age) => {
  const insertQuery = `INSERT INTO Users (name, age) VALUES ('${name}', ${age})`;
  return db.executeSql(insertQuery);
};

export const updateUser = async (db, id, name, age) => {
  const updateQuery = `UPDATE Users SET name = '${name}', age = ${age} WHERE id = ${id}`;
  return db.executeSql(updateQuery);
};

export const deleteUser = async (db, id) => {
  const deleteQuery = `DELETE FROM Users WHERE id = ${id}`;
  return db.executeSql(deleteQuery);
};
