const fs = require('fs');
const conexion = require('./conexion');

// RUTA A ARCHIVOS
const ruta_ = __dirname + "/json/"
const clientesARCHIVO = ruta_ + 'huesped.json'
const clientesARCHIVO2 = ruta_ + 'huesped2.json'
const clientesArchivoReducido = ruta_ + 'h.json'
const reservasARCHIVO = ruta_ + 'reserva.json'

// ELIMINA LOS ARCHIVOS ANTIGUOS
try {
  if (fs.existsSync(clientesARCHIVO)) fs.unlinkSync(clientesARCHIVO)
  if (fs.existsSync(clientesARCHIVO2)) fs.unlinkSync(clientesARCHIVO2)
  if (fs.existsSync(clientesArchivoReducido)) fs.unlinkSync(clientesArchivoReducido)
  if (fs.existsSync(reservasARCHIVO)) fs.unlinkSync(reservasARCHIVO)
} catch(err) {
  console.error(err)
}

// CAMPOS
const campoReservas = 'prenota2022'
const campoHuespedes = 'clienti'

const sql_reserva = `SELECT * FROM ${campoReservas}`
const sql_huesped = `SELECT * FROM ${campoHuespedes}`

// Crea el archivo reserva.json
conexion.query(sql_reserva, function(err, results, fields) {
  if(err) throw err;

  fs.writeFile(reservasARCHIVO, JSON.stringify(results), function (err) {
    if (err) throw err;
    console.log('¡Datos de reservas guardados con Éxito!');
  });

});

// Crea el archivo huesped.json
conexion.query(sql_huesped, function(err, results, fields) {
  if(err) throw err;

  fs.writeFile(clientesARCHIVO, JSON.stringify(results), function (err) {
    if (err) throw err;
    console.log('¡Datos de huéspedes guardados con Éxito!');
  });

});

/* 

// Crea un listado de objetos con los datos seleccionados de los huéspedes.
// Necesito un array de esos objetos [{...},{...},{...}]
let sql = `SELECT JSON_OBJECT
('idclienti', idclienti,
 'nome', nome, 
 'cognome', cognome)
  FROM ${campoHuespedes} INTO OUTFILE '${clientesARCHIVO2}'`

  conexion.query(sql, function(err, results, fields) {
    if(err) throw err;
});

// Crea el archivo h.json
//Actualiza el archivo de clientes con únicamente los campos idclienti, nome y cognome
const sqlClientes = `SELECT 
    CONCAT("[",
         GROUP_CONCAT(
              CONCAT('{"idclienti":',idclienti),
              CONCAT(',"nome":"',nome,'"'),
              CONCAT(',"cognome":"',cognome,'"}')
         )
    ,"]") 
AS json FROM ${campoHuespedes} INTO OUTFILE '${clientesArchivoReducido}';
`
conexion.query(sqlClientes, function(err, results, fields) {
    if(err) throw err;
});



 */



conexion.end();
