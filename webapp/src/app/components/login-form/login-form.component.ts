import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  public user = new User();
  public sessionStatus: boolean;
  public username: string;

  constructor(
    private auth: AuthService
  ) {
  }

  ngOnInit() {
    this.sessionStatus = this.auth.isAuthenticated();
    if (this.sessionStatus) {
      this.username = localStorage.username;
    }
  }

  public doLogin() {
    this.auth.login(this.user).subscribe(
      (token: any) => {
        localStorage.setItem('token', token.key);
        localStorage.setItem('username', this.user.username);
        this.username = this.user.username;

        this.auth.changeSesionStatus(true); // Notifica a todos los observadores que la sesion fue iniciada
        this.sessionStatus = true;

        this.getMe();
      },
      () => {
        alert('Bad credentials');
      }
    );
  }

  public doLogout() {
    this.auth.logout().subscribe(
      () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        this.user = new User();
        // Notifica a todos los observadores que la sesion fue cerrada
        this.auth.changeSesionStatus(false);
        this.sessionStatus = false;
      }
    );
  }

  private getMe() {
    this.auth.getMe().subscribe(
      (me: User) => {
        localStorage.setItem('userId', me.pk.toString());
      }
    );
  }

}
