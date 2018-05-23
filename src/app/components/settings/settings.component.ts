import { Component, OnInit } from '@angular/core';
import { Setting } from '../../models/setting';
import { SettingsService } from '../../services/settings.service';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig} from 'ng-snotify';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  allowRegistration: Setting;
  disableBalanceOnAdd: Setting;
  disableBalanceOnEdit: Setting;

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

  constructor(private settingService: SettingsService, private snotifyService: SnotifyService) { }

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


  onChange = (setting: Setting) => {
    setting.value = !setting.value;
    this.settingService.updateSetting(setting);
    this.snotifyService.success('Settings Updated', this.getConfig());
  }
}
