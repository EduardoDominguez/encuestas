import { ModelRespuestas } from "../modelRespuestas";
import { ModelRespondido } from "../modelRespondido";

export interface IDatasGetRespuestas{
    successRespuestas(resp:ModelRespondido[]);
    errorRespuestas();
}