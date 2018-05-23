import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';
import { NotificationService } from '../../services/notification.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    balance: 0,
    email: '',
    phone: ''
  };
  disableBalanceOnAdd: Boolean = false;

  @ViewChild('clientForm') form: any;
  constructor(private notification: NotificationService, private clientService: ClientService, private router: Router,
    private settingService: SettingsService) { }

  ngOnInit() {
    this.settingService.getSettings().subscribe(result => {
      result.forEach( (value, index) => {
        if (value.name === 'disableBalanceOnAdd') {
          this.disableBalanceOnAdd = value.value;
        }
      });
    });
  }

  onSubmit = ({value, valid}: {value: Client, valid: boolean}) => {
    if (this.disableBalanceOnAdd) { value.balance = 0; }
    if (valid) {
    this.clientService.addClient(value);
    this.notification.success('New User Added');
    this.router.navigate(['/']);
    } else {
      this.notification.error('Please fill the form correctly');
    }
  }

}
