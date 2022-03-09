import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase("places.db");


export const initializeDB = () => {
    const promise = new Promise((resolve, reject) => {
        
        db.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS places ( id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageURI TEXT NOT NULL, 
                    lat REAL NOT NULL, lon REAL NOT NULL);`,
                [],
                () => {
                    resolve()
                },
                (_, error) => {
                    reject(error);
                }
            )
        });
    })

    return promise;
};


export const insertPlace = (title, imageURI, lat, lon) => {
    const promise = new Promise((resolve, reject) => {
        
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO places (title, imageURI, lat, lon) VALUES (?, ?, ?, ?);`,
                [title, imageURI, lat, lon],
                (_, result) => {
                    resolve(result)
                },
                (_, error) => {
                    reject(error);
                }
            )
        });
    })

    return promise;
};

export const getPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM places;`,
                [],
                (_, result) => {
                    resolve(result)
                },
                (_, error) => {
                    reject(error);
                }
            )
        });
    })

    return promise;
};

