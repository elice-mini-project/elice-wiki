import "dotenv/config";

const rds = {
    host: process.env.RDS_HOST,
    port: process.env.RDS_PORT,
    database: process.env.RDS_DATABASE,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    dialect: "mysql",
};
const local = {
    // local에서 테스트 할 때 사용
    user: process.env.local_USER,
    password: process.env.local_PASSWORD,
    database: process.env.local_DATABASE,
    host: process.env.local_HOST,
    dialect: "mysql",
};
export { rds, local };
