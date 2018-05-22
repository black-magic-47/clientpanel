import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';
import {SnotifyService, SnotifyPosition, SnotifyToastConfig} from 'ng-snotify';
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

  timeout = 3000;
  position: SnotifyPosition = SnotifyPosition.rightBottom;
  progressBar = true;
  closeClick = true;
  newTop = true;
  backdrop = -1;
  dockMax = 8;
  blockMax = 6;
  pauseHover = true;
  titleMaxLength = 15;
  bodyMaxLength = 80;
  constructor(private router: Router, private route: ActivatedRoute,
    private snotifyService: SnotifyService, private clientService: ClientService,
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

  getConfig(): SnotifyToastConfig {
    this.snotifyService.setDefaults({
      global: {
        newOnTop: this.newTop,
        maxAtPosition: this.blockMax,
        maxOnScreen: this.dockMax,
      }
    });
    return {
      bodyMaxLength: this.bodyMaxLength,
      titleMaxLength: this.titleMaxLength,
      backdrop: this.backdrop,
      position: this.position,
      timeout: this.timeout,
      showProgressBar: this.progressBar,
      closeOnClick: this.closeClick,
      pauseOnHover: this.pauseHover
    };
  }

  onSubmit = ({value, valid}: {value: Client, valid: boolean}) => {
    if (valid) {
    this.clientService.updateClient(this.client);
    this.snotifyService.success('User Updated', this.getConfig());
    this.router.navigate(['/']);
    } else {
      this.snotifyService.error('Please fill the form correctly', this.getConfig());
    }
  }

}
