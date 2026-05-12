import { Injectable } from "@angular/core";
import { InMemoryDbService, RequestInfo } from "angular-in-memory-web-api";
import { TaskModel } from "./task-model";

@Injectable({
  providedIn: "root"
})
export class TaskDataService implements InMemoryDbService {
  private db: { tasks: TaskModel[] } | null = null;

  constructor() {}

  createDb() {
    const tasks: TaskModel[] = [
      {
        id: 1,
        TaskName: "Parent Task 1",
        StartDate: new Date("02/23/2017"),
        EndDate: new Date("02/27/2017"),
        Duration: 35,
        Progress: 50,
        isParent: true,
        ParentID: null
      },
      {
        id: 2,
        TaskName: "Child Task 1",
        StartDate: new Date("02/23/2017"),
        EndDate: new Date("02/27/2017"),
        Duration: 65,
        Progress: 70,
        ParentID: 1,
        isParent: false
      },
      {
        id: 3,
        TaskName: "Child Task 2",
        StartDate: new Date("02/23/2017"),
        EndDate: new Date("02/27/2017"),
        Duration: 15,
        Progress: 40,
        ParentID: 1,
        isParent: false
      },
      {
        id: 4,
        TaskName: "Child Task 3",
        StartDate: new Date("02/23/2017"),
        EndDate: new Date("02/27/2017"),
        Duration: 25,
        Progress: 60,
        ParentID: 1,
        isParent: false
      },
      {
        id: 5,
        TaskName: "Parent Task 2",
        StartDate: new Date("03/14/2017"),
        EndDate: new Date("03/18/2017"),
        Duration: 85,
        Progress: 10,
        isParent: true,
        ParentID: null
      },
      {
        id: 6,
        TaskName: "Child Task 4",
        StartDate: new Date("03/02/2017"),
        EndDate: new Date("03/06/2017"),
        Duration: 45,
        Progress: 90,
        ParentID: 5,
        isParent: false
      },
      {
        id: 7,
        TaskName: "Child Task 5",
        StartDate: new Date("08/02/2017"),
        EndDate: new Date("03/06/2017"),
        Duration: 75,
        Progress: 80,
        ParentID: 5,
        isParent: false
      },
      {
        id: 8,
        TaskName: "Child Task 6",
        StartDate: new Date("05/02/2017"),
        EndDate: new Date("03/06/2017"),
        Duration: 85,
        Progress: 60,
        ParentID: 5,
        isParent: false
      },
      {
        id: 9,
        TaskName: "Child Task 7",
        StartDate: new Date("04/02/2017"),
        EndDate: new Date("03/06/2017"),
        Duration: 95,
        Progress: 30,
        ParentID: 5,
        isParent: false
      },
      {
        id: 10,
        TaskName: "Child Task 8",
        StartDate: new Date("08/02/2017"),
        EndDate: new Date("10/06/2017"),
        Duration: 67,
        Progress: 50,
        ParentID: 5,
        isParent: false
      }
    ];
    
    if (!this.db) {
      this.db = { tasks };
    }
    return this.db;
  }

  // Handle POST requests (Create)
  post(reqInfo: RequestInfo) {
    if (reqInfo.collection === 'tasks') {
      const newTask = reqInfo.utils.getJsonBody(reqInfo.req);
      const db = this.createDb();
      const maxId = db.tasks.reduce((max, task) => Math.max(max, task.id as number), 0);
      newTask.id = maxId + 1;
      db.tasks.push(newTask);
      return reqInfo.utils.createResponse$(() => ({ status: 200, body: newTask }));
    }
    return undefined;
  }

  // Handle PUT requests (Update)
  put(reqInfo: RequestInfo) {
    if (reqInfo.collection === 'tasks') {
      const db = this.createDb();
      const id = reqInfo.id;
      const updatedTask = reqInfo.utils.getJsonBody(reqInfo.req);
      const index = db.tasks.findIndex(t => t.id === id);
      if (index > -1) {
        db.tasks[index] = { ...db.tasks[index], ...updatedTask };
      }
      return reqInfo.utils.createResponse$(() => ({ status: 200, body: db.tasks[index] }));
    }
    return undefined;
  }

  // Handle DELETE requests
  delete(reqInfo: RequestInfo) {
    if (reqInfo.collection === 'tasks') {
      const db = this.createDb();
      const id = reqInfo.id;
      const index = db.tasks.findIndex(t => t.id === id);
      if (index > -1) {
        const deletedTask = db.tasks[index];
        db.tasks.splice(index, 1);
        return reqInfo.utils.createResponse$(() => ({ status: 200, body: deletedTask }));
      }
    }
    return undefined;
  }
}
