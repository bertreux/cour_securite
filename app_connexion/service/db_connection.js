import mysql from 'mysql2/promise';

const db_connection = async () => {
    return mysql.createPool({
        host: '127.0.0.1',
        user: 'root',
        database: 'cour_securite',
        password: '',
        namedPlaceholders: true,
    });
}

export default db_connection;