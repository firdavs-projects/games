import axios from "axios";
import {baseURL} from "../constants";

export const Http = axios.create({
    baseURL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});
