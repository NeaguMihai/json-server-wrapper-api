import { Response, Request, NextFunction } from "express";
// import fetch from "node-fetch";
import axios from "axios";
/**
 * List of API examples.
 * @route GET /api
 */
export const getApi = async (req: Request, res: Response) => {
    const resp = await axios.get("http://localhost:3002/items");
    const len = resp.data.length;
    console.log(req);
    
    const data = await axios.get("http://localhost:3002"+req._parsedUrl.path);
    
    res.send({data: data.data, totalRecords: len});
};
