import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'; // If you want animations (optional)

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    // provideAnimations() // Optional, if you want Angular animations
  ]
});
