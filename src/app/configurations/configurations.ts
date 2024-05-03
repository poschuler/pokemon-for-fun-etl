export default () => ({
  PGHOST: process.env.DATABASE_URL,
  PGDATABASE: process.env.PGDATABASE,
  PGUSER: process.env.PGUSER,
  PGPASSWORD: process.env.PGPASSWORD,
  ENDPOINT_ID: process.env.ENDPOINT_ID,
  PORT: process.env.PORT,
  MONGOURL: process.env.MONGOURL,
});
