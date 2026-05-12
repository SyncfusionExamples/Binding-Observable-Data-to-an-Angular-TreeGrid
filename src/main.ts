import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { HttpClientInMemoryWebApiModule, InMemoryBackendConfig } from 'angular-in-memory-web-api';
import { TaskDataService } from './app/task-data.service';

if (environment.production) {
  enableProdMode();
}

const inMemoryApiConfig: InMemoryBackendConfig = {
  dataEncapsulation: false
};

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(TaskDataService, inMemoryApiConfig))
  ]
}).catch(err => console.error(err));
