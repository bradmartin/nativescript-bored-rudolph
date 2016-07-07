/**
 * Contains the BoredRudolph class, which represents a Layout that contains the UI pattern for pull-to-refresh with a Rudolph themed game.
 */
declare module "nativescript-bored-rudolph" {
    import { Property } from "ui/core/dependency-observable";
    import { Observable, EventData } from "data/observable";
    import { ContentView } from "ui/content-view";
    
    /**
     * Represents a standard BoredRudolph Layout
     */
    export class BoredRudolph extends ContentView {
        public static isRefreshingProperty: Property;

        /**
         * String value used when hooking to the onRefresh event.
         */
        public static refreshEvent: string;
       
        /**
         * Gets the native [android widget](http://developer.android.com/reference/android/support/v4/widget/SwipeRefreshLayout.html) that represents the user interface for this component. Valid only when running on Android OS.
         */
        android: any /* android.support.v4.widget.SwipeRefreshLayout */;
        
        /*
        * Gets or sets if the view is refreshing
        */
        refreshing: boolean;

        /**
         * Raised when a refresh event occurs.
         */
        on(event: string, callback: (args: EventData) => void, thisArg?: any);
        on(event: "refresh", callback: (args: EventData) => void, thisArg?: any);
    }

}
