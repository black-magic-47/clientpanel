import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  totalOwed: number;
  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(data => {
      this.clients = data;
      this.getTotalOwed();
    });
  }

  getTotalOwed = () => {
    this.totalOwed = this.clients.reduce( (total, client) => {
      return total + client.balance;
    }, 0);
  }

}
