/**
 * 文档作者: 郑利平
 * 创建时间：2017年7月17日 13:46:05
 * 修改时间：2017年9月12日 13:47:14
 * 描述信息：包含所有设备控制命令。
 */
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/observable/bindCallback'

declare const electron: any;

@Injectable()
export class ControlDeviceService {
  connection: Subject<boolean> = new Subject<boolean>(); // true设备已连接，false断开
  // ioConfig: IOConfig[];
  private service: any = electron.remote.getGlobal('action'); // 设备操作函数

  constructor() {
    /** async callback function test. */
    this.deviceRefresh({ip_1: 192, ip_2: 168, ip_3: 1, timeout: 2}).subscribe((data) => {
      console.log('#3._device refresh:', data);
    });

    /** go report data function test. */
    this.reported().subscribe((data) => {
      console.log('#4.device reported:', data);
    });

  }

  //
  // /** 获取IO配置文件 */
  // getIOConfig() {
  //     this.http.get('./assets/json/io-config.json').subscribe((res: Response) => {
  //         this.ioConfig = res.json();
  //     }, err => {
  //         return Observable.throw({error: {detail: 'test err no data!'}});
  //     });
  // }
  //
  // /**
  //  * 通过websocket连接到服务端
  //  * @param wsIp: 服务器的websocket地址。
  //  */
  // hostConnect(wsIp: string) {
  //     this.service.ServiceApiConnect(wsIp);
  // }
  //
  // /**
  //  * 通过token登入到服务端
  //  * @param data: token值。
  //  */
  // hostWsLogin(data: T.WsLoginData): Observable<any> {
  //     const t: any = Observable.bindCallback(this.service.ServiceWsLogin);
  //     return t(data);
  // }

  /** 返回控制器主动报告的信息 */
  reported(): Observable<any> {
    return Observable.fromEvent(this.service, 'reported')
  }

  /**
   * 刷新设备刷新完成后Observable返回
   * @param net.ip_1: 扫描的IP段 例192
   *            ip_2: 扫描的IP段 例168
   *            ip_3: 扫描的IP段 例1
   *         timeout: 扫描一台设备的超时时间单位秒（推荐值2秒）
   */
  deviceRefresh(net: any): Observable<any> {
    const t: any = Observable.bindCallback(this.service.DeviceRefresh);
    return t(net.ip_1, net.ip_2, net.ip_3, net.timeout);
  }

  //
  // /**
  //  * 修改设备信息
  //  * @param data: 修改的数据。
  //  */
  // deviceConfig(data: T.DeviceConfigData): Observable<any> {
  //     const t: any = Observable.bindCallback(this.service.DeviceConfig);
  //     return t(data);
  // }
  //
  // /**
  //  * 控制设备命令
  //  * @param serial: 设备的序列号。
  //  * @param data: 控制数据。
  //  */
  // deviceControl(serial: string, data: T.DeviceControlData): Observable<any> {
  //     const t: any = Observable.bindCallback(this.service.DeviceControl);
  //     return t(serial, data);
  // }
  //
  // /**
  //  * 读取设备信息
  //  * @param serial: 设备的序列号。
  //  */
  // deviceDetailRead(serial: string): Observable<any> {
  //     const t: any = Observable.bindCallback(this.service.DeviceDetailRead);
  //     return t(serial);
  // }
  //
  // /**
  //  * 启动设备拖拽
  //  * @param data: 推拽的轴和电流值。
  //  */
  // deviceDrag(data: T.DeviceDragData): Observable<any> {
  //     const t: any = Observable.bindCallback(this.service.DeviceDrag);
  //     return t(data);
  // }
  //
  // /**
  //  * 退出设备拖拽
  //  * @param data: 退出的轴。
  //  */
  // deviceDragStop(data: T.DragStopData): Observable<any> {
  //     const t: any = Observable.bindCallback(this.service.DeviceDragStop);
  //     return t(data);
  // }
  //
  // /**
  //  * 读取设备上的文件
  //  * @param type: 文件类型。
  //  * @param filename: 文件名。
  //  */
  // deviceFileReceive(type: string, filename: string): Observable<any> {
  //     const t: any = Observable.bindCallback(this.service.DeviceFileReceive);
  //     return t(type, filename);
  // }
  //
  // /**
  //  * 发送文件到设备上
  //  * @param type: 文件类型。
  //  * @param filename: 文件名。
  //  * @param content: 文件内容。
  //  */
  // deviceFileSend(type: string, filename: string, content: string): Observable<any> {
  //     const t: any = Observable.bindCallback(this.service.DeviceFileSend);
  //     return t(type, filename, content);
  // }
  //
  // /**
  //  * 读取设备信息
  //  * @param ip: 设备IP地址。
  //  */
  // deviceInfoRead(ip: string): Observable<any> {
  //     const t: any = Observable.bindCallback(this.service.DeviceInfoRead);
  //     return t(ip);
  // }
  //
  // /**
  //  * 设备初始化
  //  * @param data: 初始化模式和轴。
  //  */
  // deviceInitialize(data: T.DeviceInitData): Observable<any> {
  //     const t: any = Observable.bindCallback(this.service.DeviceInitialize);
  //     return t(data);
  // }
  //
  // /** 关闭设备伺服 */
  // deviceInitializeAbort(): Observable<any> {
  //     const t: any = Observable.bindCallback(this.service.DeviceInitializeAbort);
  //     return t();
  // }
  //
  // /** 读取设备初始化状态 */
  // deviceInitializedRead(): Observable<any> {
  //     const t: any = Observable.bindCallback(this.service.DeviceInitializedRead);
  //     return t();
  // }
  //
  // /**
  //  * 设置设备IO
  //  * @param data: 可选设置值。
  //  */
  // deviceIoConfig(data: T.IoConfigData): Observable<any> {
  //     const t: any = Observable.bindCallback(this.service.DeviceIoConfig);
  //     return t(data);
  // }
  //
  // /**
  //  * 读取设备IO
  //  * @param data: 版本号。
  //  */
  // deviceIoRead(data: T.IoReadData): Observable<any> {
  //     const t: any = Observable.bindCallback(this.service.DeviceIoRead);
  //     return t(data);
  // }
  //
  // /**
  //  * 运动到关节坐标位置
  //  * @param data: 关节弧度值和速度。
  //  */
  // deviceJointRun(data: T.JointRunData): Observable<any> {
  //     const t: any = Observable.bindCallback(this.service.DeviceJointRun);
  //     return t(data);
  // }
  //
  // /**
  //  * 设置算法库参数
  //  * @param data: 参数。
  //  */
  // deviceMotionConfig(data: T.MotionConfigData): Observable<any> {
  //     const t: any = Observable.bindCallback(this.service.DeviceMotionConfig);
  //     return t(data);
  // }
  //
  // /** 读取算法库参数 */
  // deviceMotionRead(): Observable<any> {
  //     const t: any = Observable.bindCallback(this.service.DeviceMotionRead);
  //     return t();
  // }
  //
  // /** 读取设备参数 */
  // deviceParamRead(): Observable<any> {
  //     const t: any = Observable.bindCallback(this.service.DeviceParamRead);
  //     return t();
  // }
  //
  // /** 释放设备 */
  // deviceRelease(): Observable<any> {
  //     const t: any = Observable.bindCallback(this.service.DeviceRelease);
  //     return t();
  // }
  //
  // /**
  //  * 运行程序命令
  //  * @param data: 程序名称和命令。
  //  */
  // deviceRun(data: T.DeviceRunData): Observable<any> {
  //     const t: any = Observable.bindCallback(this.service.DeviceRun);
  //     return t(data);
  // }
  //
  // /** 获取设备运行状态 */
  // deviceRunningRead(): Observable<any> {
  //     const t: any = Observable.bindCallback(this.service.DeviceRunningRead);
  //     return t();
  // }
  //
  // /** 查询控制器中的脚本文件 */
  // deviceScriptQuery(): Observable<any> {
  //     const t: any = Observable.bindCallback(this.service.DeviceScriptQuery);
  //     return t();
  // }
  //
  // /**
  //  * 删除控制器中的脚本文件
  //  * @param name: 要删除的脚本文件名（例：'a.lua'）。
  //  */
  // deviceScriptDelete(name: string): Observable<any> {
  //     const t: any = Observable.bindCallback(this.service.DeviceScriptDelete);
  //     return t({name: name});
  // }
  //
  // /**
  //  * 更新设备程序，需要先安装更新程序文件
  //  * @param data: 更新的名称。
  //  */
  // deviceUpdate(data: T.DeviceUpdateData): Observable<any> {
  //     const t: any = Observable.bindCallback(this.service.DeviceUpdate);
  //     return t(data);
  // }
  //
  // /**
  //  * 修改设备运行速度百分比
  //  * @param data: 速度值。
  //  */
  // deviceVelocityConfig(data: T.VelocityConfigData): Observable<any> {
  //     const t: any = Observable.bindCallback(this.service.DeviceVelocityConfig);
  //     return t(data);
  // }
  //
  // /** 查询示教状态 */
  // deviceTeachQuery(): Observable<any> {
  //     const t: any = Observable.bindCallback(this.service.DeviceTeachQuery);
  //     return t();
  // }
  //
  // /** 设备关机命令 */
  // devicePowerOff(): Observable<any> {
  //     const t: any = Observable.bindCallback(this.service.DevicePowerOff);
  //     return t();
  // }
}
