import {Component, HostListener} from '@angular/core';
import {WindowService} from './service/window.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Test';
    isMaximize = false;
    textData = `## Markdown content data`;

    windowMin() {
        WindowService.minimize();
    }

    @HostListener('window:resize')
    onResize(event) {
        // console.log('#______1____height:', window.innerHeight);
        // console.log('#_____2_____weight:', window.innerWidth);
        //
        // console.log('#_____3_____height:', window.screen.availHeight);
        // console.log('#_____4_____weight:', window.screen.availWidth);
        //
        // console.log('#_____5_____height:', window.screen.height);
        // console.log('#_____6_____weight:', window.screen.width);

        if ((window.innerHeight >= window.screen.availHeight && window.innerWidth >= window.screen.availWidth) ||
            (window.innerHeight >= window.screen.height && window.innerWidth >= window.screen.width)) {
            this.isMaximize = true;
        } else {
            this.isMaximize = false;
        }
    }

    windowMax() {
        if (this.isMaximize) {
            WindowService.unMaximize();
        } else {
            WindowService.maximize();
        }
        this.isMaximize = !this.isMaximize;
    }

    windowClose() {
        WindowService.close();
    }
}
