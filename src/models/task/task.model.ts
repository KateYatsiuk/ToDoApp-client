export class Task {
    id: number = 0;
    title: string = '';
    description: string = '';
    creationDate?: string;
    state: number = 0;
}

export interface IToDoTask {
    id: number;
    title: string;
    description: string;
    creationDate: string;
    toDoState: number;
}