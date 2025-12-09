const net = require('net');

const client = new net.Socket();
const host = 'database';
const port = 5432;

console.log(`⏳ Esperando a que la base de datos esté lista en ${host}:${port}...`);

const checkConnection = () => {
  client.connect({ port, host }, () => {
    console.log('✅ ¡Base de datos detectada! Iniciando backend...');
    client.end();
    process.exit(0);
  });
};

client.on('error', (err) => {
  console.log('zzz... La base de datos aún no responde. Reintentando en 2s...');
  setTimeout(checkConnection, 2000);
});

checkConnection();
