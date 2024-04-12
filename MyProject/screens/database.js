import * as SQLite from 'expo-sqlite';
import { SECTION_LIST_MOCK_DATA } from './utils';

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists menuitems (id integer primary key not null, name text, email text, phone text, prefemail BOOLEAN, prefphone BOOLEAN, preftext BOOLEAN, prefmail BOOLEAN);'
        );
      },
      reject,
      resolve
    );
  });

}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menuitems', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(jsondata) {
  const { name, email, phone, prefemail, prefphone, preftext, prefmail } = jsondata.item;

  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM menuitems;', // Delete existing data
      [],
      (_, { rowsAffected }) => {
        console.log(`Deleted ${rowsAffected} rows from menuitems table.`);
        
        // Insert new data
        tx.executeSql(
          'INSERT INTO menuitems (name, email, phone, prefemail, prefphone, preftext, prefmail) VALUES (?, ?, ?, ?, ?, ?, ?);',
          [name, email, phone, prefemail, prefphone, preftext, prefmail],
          (_, { rowsAffected }) => {
            console.log(`Inserted ${rowsAffected} rows into menuitems table.`);
          },
          (_, error) => {
            console.error('Error inserting menu items:', error.message);
          }
        );
      },
      (_, error) => {
        console.error('Error deleting menu items:', error.message);
      }
    );
  });

  
  db.transaction((tx) => {
    tx.executeSql(
      'select * from menuitems;',
      [],
      (_, { rows }) => {
        console.log('Contents of menuitems table:', rows._array);
      },
      (_, error) => {
        console.error('Error retrieving menu items:', error.message);
      }
    );
  });
  
}






export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const sqlQuery = `
        SELECT * FROM menuitems
        WHERE title LIKE ? 
        AND category IN (${activeCategories.map(() => '?').join(',')})
      `;
      const sqlParams = [`%${query}%`, ...activeCategories];
      
      tx.executeSql(sqlQuery, sqlParams, (_, { rows }) => {
        const filteredData = rows._array.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          category: item.category,
        }));
        resolve(filteredData);
      }, (_, error) => {
        reject(error.message);
      });
    });
  });
}

