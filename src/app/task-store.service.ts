import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { DataStateChangeEventArgs } from "@syncfusion/ej2-angular-treegrid";
import { HttpClient } from "@angular/common/http";
import { TaskModel } from "./task-model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TaskStoreService extends Subject<DataStateChangeEventArgs> {
  private apiUrl = "api/tasks";
  constructor(private http: HttpClient) {
    super();
  }

  public execute(state: any): void {
    if (state.requestType === "expand") {
      state.childDataBind();
    } else {
      this.getTasks(state).subscribe(x =>
        super.next(x as DataStateChangeEventArgs)
      );
    }
  }

  getTasks(state?: any): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(this.apiUrl).pipe(
      map(
        (response: any) =>
          <any>{
            result:
              state && state.take > 0
                ? response.slice(state.skip, state.skip + state.take)
                : response,
            count: response.length
          }
      )
    );
  }
}
