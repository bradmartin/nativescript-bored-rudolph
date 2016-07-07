import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import { Color } from "color";
import { BoredRudolph } from "nativescript-bored-rudolph";
import * as app from "application";
import * as platformModule from "platform";

// Event handler for Page "loaded" event attached in main-page.xml
export function pageLoaded(args: EventData) {
    // Get the event sender
    let page = <Page>args.object;

    let boredRudolph = <BoredRudolph>page.getViewById('rudolph');

    page.bindingContext = new HelloWorldModel(boredRudolph);


    if (app.android && platformModule.device.sdkVersion >= "21") {
        var window = app.android.startActivity.getWindow();
        window.setStatusBarColor(new Color("#AC395C").android);
    }

}