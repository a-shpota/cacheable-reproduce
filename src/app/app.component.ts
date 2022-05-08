import { HttpClient } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cacheable-reproduce';
  constructor(httpClient: HttpClient, ngZone: NgZone) {

    ngZone.runOutsideAngular(() => {
      setInterval(() => {
        var taskTrackingZone = (<any>ngZone)._inner.getZoneWith("TaskTrackingZone");
        if (!taskTrackingZone) {
          throw new Error("'TaskTrackingZone' zone not found! Have you loaded 'node_modules/zone.js/dist/task-tracking.js'?");
        }
        var tasks: any[] = taskTrackingZone._properties.TaskTrackingZone.getTasksFor("macroTask") || [];
        console.log("ZONE pending tasks=", tasks.map(task => task.creationLocation));
      }, 1000);
    })

    httpClient.get('https://www.google.com', {
      responseType: 'text'
    }).subscribe(() => {
      console.log('Request from Google complete');
    });
  }
}
