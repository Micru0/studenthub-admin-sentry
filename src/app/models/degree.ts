import { DegreeGroup } from "./degree-group";

export class Degree {
    degree_uuid: string;
    degree_group_uuid: string;
    degree_name_en: string; 
    degree_name_ar: string; 
    degree_sort_order: number;
    degreeGroup: DegreeGroup;
}