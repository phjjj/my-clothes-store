// db/dbConfig.js
export const dbConfig = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "ClothesShop",
  dateStrings: true,
  connectionLimit: 10, // 최대 연결 개수 설정
};

console.log("Connected to MariaDB!");
