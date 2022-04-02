import { Response, Request, NextFunction } from "express";
// import fetch from "node-fetch";
import axios from "axios";
import { data } from "jquery";
import { ParsedQs } from "qs";
/**
 * List of API examples.
 * @route GET /api
 */
export const getApi = async (req : any, res: Response) => {
    const resp = await axios.get("http://localhost:3002/items");
    const len = resp.data.length;
    console.log(req);
    
    const data = await axios.get("http://localhost:3002"+req._parsedUrl.path);
    
    res.send({data: data.data, totalRecords: len});
};

export const getAdminAuctions = async (req: Request, res: Response) => {
  //id title, date, id_employee, has_finished
  //id equals
  //date: before, after
  const { date_gte, date_lte, id, id_employee, title, has_finished, offset, limit } =  req.query;
  let newQuery = '?';
 
    if(date_lte) {
      newQuery === '?'?
        {}
      : newQuery += '&'; 
      newQuery += 'date_lte=' + date_lte
    }
    if(date_gte) {
      newQuery === '?'?
        {}
      : newQuery += '&'; 
      newQuery += 'date_gte=' + date_gte
    }
    if(id) {
      newQuery === '?'?
        {}
      : newQuery += '&'; 
      newQuery += 'id=' + id;
    }
    if(id_employee) {
      newQuery === '?'?
        {}
      : newQuery += '&'; 
      newQuery += 'id_employee=' + id_employee;
    }
    if(has_finished) {
      newQuery === '?'?
        {}
      : newQuery += '&'; 
      newQuery += 'has_finished=' + has_finished;
    }

  const resp = await axios.get("http://localhost:3002/auctions"+newQuery);
  
  if(offset > resp.data.length)
  throw new Error("Bad Request");
  let newLimit = +limit;
  
  const filtered = resp.data.map((d: any) => d.title.includes(title));
  
  const totalRecords = filtered.length
  if(limit > filtered.length)
    newLimit = filtered.length;
  // if(title)
  console.log(+offset, newLimit);
  console.log(req.query)
  
  res.json({data: filtered.slice(offset, +offset + newLimit), totalRecords: totalRecords})
  // res.json({data: [], totalRecords: totalRecords})

}
