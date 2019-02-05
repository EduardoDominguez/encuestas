import { ModelQuestions } from "./modelQuestions";

export class ModelEncuesta{
    id:number;
    encuesta:string;
    descripcion:string;
    preguntas:ModelQuestions[];
}