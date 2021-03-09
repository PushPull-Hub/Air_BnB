import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from './utils/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private loadingController: LoadingController
  ) {}

  logOut() {
    this.loadingController
      .create({
        message: 'Logging Out ...',
      })
      .then((loadingControllerElement) => {
        loadingControllerElement.present();
        setTimeout(() => {
          this.authenticationService.logout();
          loadingControllerElement.dismiss();
        }, 800);
      });
  }
}
