// Http Common abstraction for Axios, that could be switched out for any implementation
// We provide base access to the api and import as http externally to abstract implementation away
import axios from "axios";

export default axios.create({
  headers: {
    "Content-type": "application/json"
  }
});