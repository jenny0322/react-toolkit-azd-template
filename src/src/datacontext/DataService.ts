// API Data Service - data abstraction layer, uses http which provides get method for HTTP
import { IGraphData } from "../model/IGraphData";
import http from "./HttpCommon"

const getBySearchTerm = (baseurl: string, term: string) => {
    const url = `${baseurl}/search?term=${term}`;
    console.log(url);
    return http.get<IGraphData>(url);
}

const DataService = {
    getBySearchTerm
}

export default DataService;