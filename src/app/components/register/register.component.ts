import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor(private auth: AuthService, private router: Router, private notification: NotificationService) { }

  ngOnInit() {
  }

  onSubmit = () => {
    this.auth.register(this.email, this.password).then(result => {
      this.notification.success('You are now registered and logged in');
      this.router.navigate(['/']);
    }).catch( err => {
      this.notification.error(err.message);
    });
  }

}
