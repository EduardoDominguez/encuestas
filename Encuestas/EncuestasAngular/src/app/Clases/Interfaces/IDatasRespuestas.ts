import { ModelQuestions } from "../modelQuestions";

export interface IDatasRespuestas{
    successRespuestas(respuestas:ModelQuestions[]);
    failRespuestas();
}