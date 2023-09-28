import mysql2 from 'promise-mysql2';
import keys from './keys';


const pool = mysql2.createPool(keys.database);

pool.getConnection().then(connection => {
    pool.releaseConnection(connection);
    console.log("Conectado a SBE-BD");
}, err => {
    console.log("Error al conectar a la bd: " + err);
});

export default pool;