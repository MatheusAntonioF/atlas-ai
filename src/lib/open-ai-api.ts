import axios from "axios";
import { env } from "process";

export const openai = axios.create({
    baseURL: "https://api.openai.com/v1",
    headers: {
        Authorization: `Bearer ${env.OPENAI_KEY}`,
    },
});
