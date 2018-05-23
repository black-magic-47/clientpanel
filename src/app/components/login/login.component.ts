import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private auth: AuthService, private router: Router, private notification: NotificationService) { }

  ngOnInit() {
    this.auth.getAuth().subscribe( afauth => {
        if (afauth) {
          this.router.navigate(['/']);
        }
    });
  }


  onSubmit = () => {
    this.auth.login(this.email, this.password).then(result => {
      this.notification.success('Login Successful');
      this.router.navigate(['/']);
    }).catch( err => {
      this.notification.error(err.message);
    });
  }

}
