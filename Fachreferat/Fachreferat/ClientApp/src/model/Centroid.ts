import { ITwitterUser } from "./TwitterUser";

export interface ICentroid{
    x: number;
    y: number;
    id: number;
    assignedUsers: ITwitterUser[];
}