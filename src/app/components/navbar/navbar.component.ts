import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SettingsService } from '../../services/settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  email: string;
  showRegister: Boolean = false;
  constructor(private auth: AuthService, private router: Router, private settingService: SettingsService) { }

  ngOnInit() {
    this.auth.getAuth().subscribe( afauth => {
        if (afauth) {
          this.email = afauth.email;
        }
    });
    this.settingService.getSettings().subscribe(result => {
      result.forEach( (value, index) => {
        if (value.name === 'allowRegistration') {
          this.showRegister = value.value;
        }
      });
    });
  }

  doLogout = () => {
    this.auth.logout();
    this.email = null;
    this.router.navigate(['/login']);
  }

}
