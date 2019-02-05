import { ModelEncuesta } from "../modelEncuesta";

export interface IDatasEncuesta{
    successEncuesta(encuesta:ModelEncuesta[]);
    failEncuesta();
}