import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';
import { NotificationService } from '../../services/notification.service';
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

  constructor(private router: Router, private route: ActivatedRoute,
    private notification: NotificationService, private clientService: ClientService) { }

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

  updateBalance = () => {
    this.clientService.updateClient(this.client);
    this.notification.success('Balance Updated');
    this.showBalanceUpdateInput = false;
  }

  onDeleteClick = () => {
    if (confirm('Are You Sure?')) {
      this.clientService.deleteClient(this.client);
      this.notification.success('User Deleted');
      this.router.navigate(['/']);
    }
  }
}
