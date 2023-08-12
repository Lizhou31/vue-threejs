import { Mesh } from "three"

interface model_base {
    construct_Mesh(): Mesh;
}



export class BaseModel{


    count : number = 1;
    param : Array<number> = [];
    all_objects : Array<Mesh> = [];

    constructor(count : number, param : Array<number>){

        this.count = count
        this.param = param


    }
}