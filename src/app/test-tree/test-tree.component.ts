import {Component, OnInit} from '@angular/core';
import {ThenableWebDriver, WebElementPromise} from 'selenium-webdriver';
import {OnDestroy} from '_@angular_core@5.2.0@@angular/core/src/metadata';
// const webdriver = require('selenium-webdriver');
import {timer} from 'rxjs/observable/timer';

// export *  from 'selenium-webdriver';
declare const webdriver;

const By = webdriver.By;

@Component({
    selector: 'app-test-tree',
    templateUrl: './test-tree.component.html',
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

    runSingle() {
        this.driver.getAllWindowHandles().then((datas) => {
            console.log('#_____________windows:', datas);
            this.driver.switchTo().window(datas[1]).then((data) => {
                    console.log('#_____________window2:', data);
                    this.driver.getCurrentUrl().then((url) => {
                        console.log('#_____________url:', url);
                    });
                }
            );
        });


        // this.driver.executeScript(`return localStorage.getItem('$program_program_2');`).then((data) => {
        //     console.log('#_________1____read data:', data);
        // });
        // this.driver.executeScript((name: string) => {
        //     return localStorage.getItem(name);
        // }, '$program_program_2').then((data) => {
        //     console.log('#__________222___read data:', data);
        // });
    }

    runTest() {

        this.driver = new webdriver.Builder()
        // "9515" 是ChromeDriver使用的端口
            .usingServer('http://localhost:9515')
            .withCapabilities({
                chromeOptions: {
                    // 这里设置Electron的路径'D:/test/robot-qixing.com/terminal.exe'
                    // binary: `C:\\Users\\zlp\\AppData\\Local\\robot-qixing.com\\terminal.exe`
                    binary: 'D:/language/angular/selenium/node_modules/electron/dist/electron.exe'
                    //       binary: 'C:\\Users\\zlp\\AppData\\Local\\robot-qixing.com\\Qobot-studio.exe'
                }
            })
            .forBrowser('electron')
            .build();
        // this.driver.get('file:///D:/terminal/dist/index.html').then(() => {
        console.log('#______________load url:', this.driver.getCurrentUrl());
        //     }
        // );

        // setTimeout(function () {
        //     driver.findElement(webdriver.By.className('program-tree')).click().then((str) => {
        //         console.log('#______________str:', str);
        //     });
        // }, 16000);

        // setTimeout(() => {
        //     console.log('#______________find!');
        //     // console.log('#______________clase:', webdriver.By.className('icon-hover min-window'));
        //     // driver.findElement(webdriver.By.className('icon-hover min-window')).click().then((str) => {
        //     //     console.log('#______________str2:', str);
        //     // }).catch(err => {
        //     //     console.log('#______________str2:', err);
        //     // });
        //
        //
        //     driver.findElement(webdriver.By.id('my-test')).click().then((str) => {
        //         console.log('#______________str2:', str);
        //     }).catch(err => {
        //         console.log('#______________str2:', err);
        //     });
        //
        // }, 11000);


    }

    rerunTest() {
        this.stopTest();
        timer(1000).subscribe(() => {
            this.runTest();
        });

    }

    runFind() {


        const aa = this.driver.findElements(By.className('tree-toolbar-btn mat-icon-button')).then((items) => {
            console.log('#_____________1_items:', items);

            if (items.length === 5) {
                items[0].click().then((data) => {
                    setTimeout(() => {
                        this.clickConfirmDialog();
                    }, 2000);

                    console.log('#_____________click:', data);
                });
            }
        });
        // aa.findElements(By.name('button')).then((items) => {
        //     console.log('#______________items:', items);
        // });


        console.log('#______________str2:', aa);

        // this.driver.findElement(By.className('icon-hover min-window')).click().then((data) =>{
        //     console.log('#______________str1:', data);
        // })
        // this.driver.findElement(By.className('program-tree')).then((str) => {
        //     console.log('#______________str:', str);
        // });
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
        const bb = this.driver.findElements(By.xpath(name)).then((items) => {
            console.log('#_____________1003_items:', items);

            if (items.length > 0) {
                items[0].click().then((data) => {
                    // this.clickConfirmDialog();
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
                const aa = this.driver.findElement(By.name('dialog-yes-button')).click().then((item) => {
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
                    console.log('#_____________1001_item:', item);


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
