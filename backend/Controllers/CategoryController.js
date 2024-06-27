import { queryDB } from "../db/queryDB.js";
import { StatusCodes } from "http-status-codes";

export const allCategory = async (req, res) => {
  const query = "SELECT * FROM categories";
  const result = await queryDB(query);
  res.status(StatusCodes.OK).json(result);
};
