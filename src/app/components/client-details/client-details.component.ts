import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig} from 'ng-snotify';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: Boolean = false;
  showBalanceUpdateInput: Boolean = false;

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
    private snotifyService: SnotifyService, private clientService: ClientService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.clientService.getClient(this.id).subscribe( data => {
      this.client = data;
      if (this.client != null) {
        if (this.client.balance > 0) {
          this.hasBalance = true;
        }
      }
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

  updateBalance = () => {
    this.clientService.updateClient(this.client);
    this.snotifyService.success('Balance Updated', this.getConfig());
    this.showBalanceUpdateInput = false;
  }

  onDeleteClick = () => {
    if (confirm('Are You Sure?')) {
      this.clientService.deleteClient(this.client);
      this.snotifyService.success('User Deleted', this.getConfig());
      this.router.navigate(['/']);
    }
  }
}
