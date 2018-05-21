import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';
import {SnotifyService, SnotifyPosition, SnotifyToastConfig} from 'ng-snotify';
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

  @ViewChild('clientForm') form: any;
  constructor(private snotifyService: SnotifyService, private clientService: ClientService) { }

  ngOnInit() {
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
    if (this.disableBalanceOnAdd) { value.balance = 0; }
    if (valid) {
    this.clientService.addClient(value);
    this.snotifyService.success('New User Added', this.getConfig());
    } else {
      this.snotifyService.error('Please fill the form correctly', this.getConfig());
    }
  }

}
