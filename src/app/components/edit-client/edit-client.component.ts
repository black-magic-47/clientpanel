import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';
import { NotificationService } from '../../services/notification.service';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    balance: 0,
    email: '',
    phone: ''
  };
  disableBalanceOnEdit: Boolean = true;

  bodyMaxLength = 80;
  constructor(private router: Router, private route: ActivatedRoute,
    private notification: NotificationService, private clientService: ClientService,
    private settingService: SettingsService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.clientService.getClient(this.id).subscribe( data => {
      this.client = data;
    });
    this.settingService.getSettings().subscribe(result => {
      result.forEach( (value, index) => {
        if (value.name === 'disableBalanceOnEdit') {
          this.disableBalanceOnEdit = value.value;
        }
      });
    });
  }

  onSubmit = ({value, valid}: {value: Client, valid: boolean}) => {
    if (valid) {
    this.clientService.updateClient(this.client);
    this.notification.success('User Updated');
    this.router.navigate(['/']);
    } else {
      this.notification.error('Please fill the form correctly');
    }
  }

}
