import mysql from "mysql2/promise";

// Create the connection pool. The pool-specific settings are the defaults
export const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  database: "s3_cloudfront",
  password: "segun@1993",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});
