import { Component, OnInit } from '@angular/core';
import { Setting } from '../../models/setting';
import { SettingsService } from '../../services/settings.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  allowRegistration: Setting;
  disableBalanceOnAdd: Setting;
  disableBalanceOnEdit: Setting;

  constructor(private settingService: SettingsService, private notification: NotificationService) { }

  ngOnInit() {
    this.settingService.getSettings().subscribe(result => {
      result.forEach( (value, index) => {
        if (value.name === 'allowRegistration') {
          this.allowRegistration = value;
        }
        if (value.name === 'disableBalanceOnAdd') {
          this.disableBalanceOnAdd = value;
        }
        if (value.name === 'disableBalanceOnEdit') {
          this.disableBalanceOnEdit = value;
        }
      });
    });
  }

  onChange = (setting: Setting) => {
    setting.value = !setting.value;
    this.settingService.updateSetting(setting);
    this.notification.success('Settings Updated');
  }
}
