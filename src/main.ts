import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


// API-URL
export const PORT = 1234;
export const HOST = "localhost"
export const URL  = `http://${HOST}:${PORT}/api/auth`;

platformBrowserDynamic()
.bootstrapModule(AppModule)
.catch(err => console.error(err));

export function __logout() {
    localStorage.clear()
    
}
