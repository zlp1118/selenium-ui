import {Component, OnInit} from '@angular/core';
import {ThenableWebDriver, WebElementPromise} from 'selenium-webdriver';
import {OnDestroy} from '_@angular_core@5.2.0@@angular/core/src/metadata';
// const webdriver = require('selenium-webdriver');
import {Observable} from 'rxjs/Observable';
import {timer} from 'rxjs/observable/timer';
import 'rxjs/add/operator/delay';
import {Node} from "./define";

// export *  from 'selenium-webdriver';
declare const webdriver;
declare const electron: any;
const By = webdriver.By;
const Key = webdriver.Key;

@Component({
    selector: 'app-test-tree',
    templateUrl: 'test-tree.component.html',
    styleUrls: ['./test-tree.component.css']
})
export class TestTreeComponent implements OnInit, OnDestroy {

    driver: ThenableWebDriver;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.stopTest();
    }

    run() {
        const exec = electron.remote.require('child_process').execFile;

        const fun = () => {
            console.log('fun() start');
            exec('./exe/chrome-driver.exe', function (err, data) {
                console.log(err);
                console.log(data.toString());
            });
        };
        fun();
    }

    reloadPage() {
        this.stopTest();
        location.reload();
    }

    stopTest() {
        if (this.driver) {
            console.log('#_________stop');
            this.driver.quit();
        }
    }

    /** change window to main window */
    toMainWindow(): Promise<boolean> {
        return new Promise((resolve) => {
            this.driver.getAllWindowHandles().then((datas: string[]) => {
                if (datas.length < 2) {
                    console.error('#_____________windows:', datas);
                    resolve(false);
                    return;
                }
                this.driver.switchTo().window(datas[1]).then(() => {
                    this.driver.getCurrentUrl().then((url: string) => {
                        if (!url.includes('index.html#/main')) {
                            console.log('#_____________url:', url);
                            resolve(false);
                            return;
                        }
                        resolve(true);
                    }).catch();
                }).catch();
            }).catch();
        });
    }


    xpathClick(name: string): Observable<boolean> {
        return Observable.create(observer => {
            if (!name) {
                console.log('#_______________xpath name:', name);
                observer.next(false);
                return;
            }
            this.driver.findElements(By.xpath(name)).then((items) => {
                if (items.length !== 1) {
                    console.log('#_____________1003_items:', items);
                    observer.next(false);
                    return;
                }
                items[0].click().then(() => {
                    setTimeout(() => {
                        observer.next(true);
                    }, 2000);
                });
            });
        });
    }

    runSingle() {
        // ActionSequence

        const actions = this.driver.actions();
        actions.sendKeys(Key.ENTER).perform();

    }

    async testAddNode() {
        console.log('#________________start!');
        let name: string;
        if (!await this.toMainWindow()) {
            return;
        }
        // new
        if (!await this.newProgram()) {
            return;
        }
        if (!await this.addP2p()) {
            return;
        }

        const actions = this.driver.actions();
        actions.sendKeys(Key.ENTER).perform();


        // new
        if (!await this.newProgram()) {
            return;
        }
        if (!await this.addP2p()) {
            return;
        }
        if (!await this.addGroup()) {
            return;
        }
        if (!await this.addLoop()) {
            return;
        }
        if (!await this.addWait()) {
            return;
        }
        if (!await this.addSet()) {
            return;
        }

        if (!await this.addCSys()) {
            return;
        }

        name = '//app-program-tree/div[1]/ul/app-program-treenode[1]/li[2]/div/span[1]';
        if (!await this.addCondition(name)) {
            return;
        }
        if (!await this.addExit()) {
            return;
        }
        if (!await this.addVariable()) {
            return;
        }
        name = '//app-program-tree/div[1]/ul/app-program-treenode[1]/li[2]/div/span[1]';
        if (!await this.addSub(name)) {
            return;
        }

        if (!await this.addScript()) {
            return;
        }
        name = '//app-program-tree/div[1]/ul/app-program-treenode[1]/li[2]/ul/app-program-treenode[2]/li[2]/ul/' +
            'app-program-treenode/li[2]/div/span';
        if (!await this.addJump(name)) {
            return;
        }
        name = '//app-program-tree/div[1]/ul/app-program-treenode[1]/li[2]/ul/app-program-treenode[3]/li[2]/div/span';
        if (!await this.addOther(name)) {
            return;
        }
        if (!await this.addVConnect()) {
            return;
        }
        if (!await this.addVPosition()) {
            return;
        }
        if (!await this.addRConnnect()) {
            return;
        }
        console.log('#_________add node success!');
    }

    // this.driver.executeScript(`return localStorage.getItem('$program_program_2');`).then((data) => {
    //     console.log('#_________1____read data:', data);
    // });
    // this.driver.executeScript((name: string) => {
    //     return localStorage.getItem(name);
    // }, '$program_program_2').then((data) => {
    //     console.log('#__________222___read data:', data);
    // });


    addSelectNode(selectName: string, addName: string): Promise<boolean> {
        return new Promise((resolve) => {
            if (selectName) {
                this.xpathClick(selectName).subscribe((data1) => {
                    if (!data1) {
                        resolve(false);
                        return;
                    }
                    this.xpathClick(addName).subscribe((data2) => {
                        if (!data2) {
                            resolve(false);
                            return;
                        }
                        resolve(true);
                    });
                });
            } else {
                this.xpathClick(addName).subscribe((data2) => {
                    if (!data2) {
                        resolve(false);
                        return;
                    }
                    resolve(true);
                });
            }
        });
    }

    addSelectNode2(selectName: string, addName: string): Observable<boolean> {
        return Observable.create(observer => {
            if (selectName) {
                this.xpathClick(selectName).subscribe((data1) => {
                    if (!data1) {
                        observer.next(false);
                        return;
                    }
                    this.xpathClick(addName).subscribe((data2) => {
                        if (!data2) {
                            observer.next(false);
                            return;
                        }
                        observer.next(true);
                    });
                });
            } else {
                this.xpathClick(addName).subscribe((data2) => {
                    if (!data2) {
                        observer.next(false);
                        return;
                    }
                    observer.next(true);
                });
            }
        });
    }

    addP2p(selectName?: string): Promise<boolean> {
        const name = '//app-program-toolbar/div/div[1]/div[1]/span';
        return this.addSelectNode(selectName, name);
    }

    addGroup(selectName?: string): Promise<boolean> {
        const name = '//app-program-toolbar/div/div[1]/div[2]/span';
        return this.addSelectNode(selectName, name);
    }

    addLoop(selectName?: string): Promise<boolean> {
        const name = '//app-program-toolbar/div/div[1]/div[3]/span';
        return this.addSelectNode(selectName, name);
    }

    addWait(selectName?: string): Promise<boolean> {
        const name = '//app-program-toolbar/div/div[1]/div[4]/span';
        return this.addSelectNode(selectName, name);
    }

    addSet(selectName?: string): Promise<boolean> {
        const name = '//app-program-toolbar/div/div[1]/div[5]/span';
        return this.addSelectNode(selectName, name);
    }

    addCSys(): Promise<boolean> {
        const name = '//app-program-tree/div[1]/ul/app-program-treenode[3]/li[2]/div/span';
        const name2 = '//app-program-toolbar/div/div[1]/div[6]/span';
        return new Promise((resolve) => {
            this.xpathClick(name).subscribe((data1) => {
                if (!data1) {
                    resolve(false);
                    return;
                }
                this.xpathClick(name2).subscribe((data2) => {
                    if (!data2) {
                        resolve(false);
                        return;
                    }
                    resolve(true);
                });
            });
        });
    }

    addCondition(selectName?: string): Promise<boolean> {
        const name = '//app-program-toolbar/div/div[1]/div[7]/span';
        return this.addSelectNode(selectName, name);
    }

    /** add else node */
    addExit(selectName?: string): Promise<boolean> {
        const name = '//app-program-toolbar/div/div[1]/div[8]/span';
        return this.addSelectNode(selectName, name);
    }

    addVariable(selectName?: string): Promise<boolean> {
        const name = '//app-program-toolbar/div/div[1]/div[9]/span';
        const okName = '//mat-dialog-container/app-variable-dialog/div/div[4]/div[1]/button';
        return new Promise((resolve) => {
            this.addSelectNode2(selectName, name).subscribe((data1) => {
                if (!data1) {
                    resolve(false);
                    return;
                }
                this.xpathClick(okName).subscribe((data2) => {
                    if (!data2) {
                        resolve(false);
                        return;
                    }
                    resolve(true);
                });
            });
        });
    }

    addSub(selectName?: string): Promise<boolean> {
        const name = '//app-program-toolbar/div/div[1]/div[10]/span';
        const okName = '//app-sub-program/div/div[2]/mat-table/mat-row/mat-cell[8]/span[2]';
        return new Promise((resolve) => {
            this.addSelectNode2(selectName, name).subscribe((data1) => {
                if (!data1) {
                    resolve(false);
                    return;
                }
                this.xpathClick(okName).subscribe((data2) => {
                    if (!data2) {
                        resolve(false);
                        return;
                    }
                    resolve(true);
                });
            });
        });
    }

    /** Add script node */
    addScript(selectName?: string): Promise<boolean> {
        const name = '//app-program-toolbar/div/div[1]/div[11]/span';
        return this.addSelectNode(selectName, name);
    }

    /** Add jump node */
    addJump(selectName?: string): Promise<boolean> {
        const name = '//app-program-toolbar/div/div[1]/div[12]/span';
        return this.addSelectNode(selectName, name);
    }

    /** Add else node */
    addOther(selectName?: string): Promise<boolean> {
        const name = '//app-program-toolbar/div/div[1]/div[13]/span';
        return this.addSelectNode(selectName, name);
    }

    /** Add vision node */
    addVConnect(selectName?: string): Promise<boolean> {
        const name = '//app-program-toolbar/div/div[1]/div[14]/span';
        return this.addSelectNode(selectName, name);
    }

    /** Add script node */
    addVPosition(selectName?: string): Promise<boolean> {
        const name = '//app-program-toolbar/div/div[1]/div[15]/span';
        return this.addSelectNode(selectName, name);
    }

    /** Add script node */
    addRConnnect(selectName?: string): Promise<boolean> {
        const name = '//app-program-toolbar/div/div[1]/div[16]/span';
        return this.addSelectNode(selectName, name);
    }


    /** run application */
    runTest() {
        this.driver = new webdriver.Builder()
            .usingServer('http://localhost:9515') // "9515" ChromeDriver running port
            .withCapabilities({
                chromeOptions: {
                    binary: './exe/electron/dist/electron.exe' // electron path
                }
            })
            .forBrowser('electron')
            .build();
    }

    rerunTest() {
        this.stopTest();
        timer(1000).subscribe(() => {
            this.runTest();
        });
    }

    /** test all */
    testAll() {
        this.testAddNode().then(() => {
                // this.driver.findElements(By.className('tree-toolbar-btn mat-icon-button')).then((items) => {
                //     console.log('#_____________1_items:', items);
                //
                //     if (items.length === 5) {
                //         items[0].click().then((data) => {
                //             setTimeout(() => {
                //                 this.clickConfirmDialog();
                //             }, 2000);
                //
                //             console.log('#_____________click:', data);
                //         });
                //     }
                // });
            }
        );


        // aa.findElements(By.name('button')).then((items) => {
        //     console.log('#______________items:', items);
        // });


        // console.log('#______________str2:', aa);

        // this.driver.findElement(By.className('icon-hover min-window')).click().then((data) =>{
        //     console.log('#______________str1:', data);
        // })
        // this.driver.findElement(By.className('program-tree')).then((str) => {
        //     console.log('#______________str:', str);
        // });
    }

    newProgram(): Promise<boolean> {
        const name = '//app-program-tree/div[1]/div/button[1]/span/mat-icon';
        const name2 = '//mat-dialog-container/app-confirm-dialog/div/div[1]/mat-icon';
        return new Promise((resolve) => {
            this.xpathClick(name).subscribe((data) => {
                if (!data) {
                    resolve(false);
                    return;
                }

                this.driver.executeScript(`return localStorage.getItem('temp_program_saved');`).then((data1) => {
                    if (Boolean(data1)) {
                        resolve(true);
                        return;
                    }
                    this.xpathClick(name2).subscribe((data2) => {
                        if (!data2) {
                            resolve(false);
                            return;
                        }
                        resolve(true);
                    });
                });
            });
        });

    }

    clickConfirmDialog() {
        const aa = this.driver.findElement(By.name('dialog-yes-button')).click().then((item) => {
            console.log('#_____________1001_item:', item);
            setTimeout(() => {
                this.inputName();
            }, 2000);
        });
    }


    nameFind(name: string) {
        console.log('#_______________name:', name);
        if (!name) {
            return;
        }
        const bb = this.driver.findElements(By.name(name)).then((items) => {
            console.log('#_____________1002_items:', items);

            // if (items.length === 2) {
            //     items[0].click().then((data) => {
            //         // this.clickConfirmDialog();
            //         console.log('#_____________click yes:', data);
            //     });
            // }
        });
    }

    xpathFind(name: string) {
        console.log('#_______________xpath name:', name);
        if (!name) {
            return;
        }
        this.driver.findElements(By.xpath(name)).then((items) => {
            console.log('#_____________1003_items:', items);
            if (items.length > 0) {
                items[0].click().then((data) => {
                    console.log('#_____________click yes:', data);
                });
            }
        });
    }


    inputName() {
        this.driver.findElement(By.name('dialog-name-input')).sendKeys('program_2')
            .then((item) => {
                console.log('#_____________1004_items:', item);
                this.driver.sleep(1000);
                this.driver.findElement(By.name('dialog-yes-button')).click().then(() => {
                    this.driver.sleep(5000).then((ok) => {
                        console.log('#_____________wait ok:', ok);


                        // this.driver.executeAsyncScript(`localStorage.setItem('data1', 'teste');`, 1);

                        // this.driver.executeAsyncScript(`return localStorage.getItem('program_2');`, 1).then((data) => {
                        //         console.log('#_____________read data:', data);
                        //     });

                        // this.driver.executeAsyncScript(() => {
                        //     this.raedLocal();
                        // }, 1).then((data) => {
                        //     console.log('#_____________read data:', data);
                        // });
                    });
                });
                // if (items.length === 2) {
                //     items[0].click().then((data) => {
                //         // this.clickConfirmDialog();
                //         console.log('#_____________click yes:', data);
                //     });
                // }
            });


    }


    raedLocal(): string {
        // localStorage.setItem('data1', 'teste');
        return localStorage.getItem('$program_program_2');
        // console.log('#___________local data:', data);
    }
}
