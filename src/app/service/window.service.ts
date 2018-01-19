import {Injectable, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

declare const electron: any;

const ipcRenderer = electron.ipcRenderer;

interface Native extends Window {
  Query: any;
}

const native = <Native>window;

@Injectable()
export class WindowService {
  public cefSupport = true;
  public onMessage: EventEmitter<{ severity: string, summary: string, detail: string }> = new EventEmitter();

  public heightChange = new Subject<any>();
  public terminalHeight: any = '340px';

  static close() {
    ipcRenderer.send('window.control', 'close');
  }

  static minimize() {
    ipcRenderer.send('window.control', 'minimize');
  }

  static maximize() {
    ipcRenderer.send('window.control', 'maximize');
  }

  static unMaximize() {
    ipcRenderer.send('window.control', 'unmaximize');
  }

  static openconsole() {
    ipcRenderer.send('window.control', 'openconsole');
  }

  constructor() {
    if (!native.Query) {
      native.Query = this.Query;
      this.cefSupport = false;
    }
    this.heightChange.subscribe(data => {
      this.terminalHeight = data;
    });
  }

  alertInfo(message: { title: string, detail: string }) {
    this.onMessage.emit({severity: 'info', summary: message.title, detail: message.detail});
  }

  alertWarning(message: { title: string, detail: string }) {
    this.onMessage.emit({severity: 'warning', summary: message.title, detail: message.detail});
  }

  alertError(message: { title: string, detail: string }) {
    this.onMessage.emit({severity: 'error', summary: message.title, detail: message.detail});
  }

  Query(obj) {
    console.log('Query: ' + obj.request);
  }



  download(url: string, filename: string,
           successCB?: (res: any) => any,
           failureCB?: (errorCode: string | number, errorMessage: string) => any) {
    native.Query({
      request: 'CMD.Download:' + JSON.stringify({url, filename}),
      onSuccess: response => {
        console.log(response);
        if (successCB) {
          successCB(response);
        }
      },
      onFailure: (error_code, error_message) => {
        console.log('Failed with error ' + error_message + ' (' + error_code + ')');
        if (failureCB) {
          failureCB(error_code, error_message);
        }
      }
    });
  }

  setup(filename: string) {
    native.Query({
      request: 'CMD.Setup:' + JSON.stringify({filename})
    });
  }

}
