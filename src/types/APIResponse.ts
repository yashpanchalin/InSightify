import { SummarisedText } from "@/model/User";

export interface APIResponse{
    success : boolean,
    message : string,
    summarisedtext : string;
    summarisedTexts? : Array<SummarisedText>
}