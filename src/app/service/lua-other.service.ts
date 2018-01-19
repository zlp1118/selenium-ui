import {Injectable} from '@angular/core';
// import {Observable} from "rxjs/Observable";
// import {DeviceError} from "./device-model-interface";

declare let electron: any;

@Injectable()
export class LuaOtherService {
    private other: any = electron.remote.getGlobal('others');

    constructor() {
      /** test return value function. */
      console.log('#1.___________uuid:', this.uUid());

      /** test param and return value function. */
      console.log('#2.______file read:', this.fileRead(`D:\\document\\life\\work.txt`)); // utf-8 format.
    }

    uUid() {
        return this.other.UUID()
    }
    //
    // download(url: string, md5: string): Observable<any> {
    //     const t: any = Observable.bindCallback(this.other.Download);
    //     return t(url, md5);
    // }
    //
    // exec(filePath: string): boolean {
    //     return this.other.Exec(filePath);
    // }
    //
    fileRead(filePath: string) {
        return this.other.FileRead(filePath);
    }
}
