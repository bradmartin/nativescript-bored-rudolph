/***************************************************************************************
* Made for the {N} community by Brad Martin @BradWayneMartin
* https://twitter.com/BradWayneMartin
* https://github.com/bradmartin
* http://bradmartin.net
* Open Source Lib : https://github.com/FauDroids/Bored-Rudolf
*************************************************************************************/

import { DependencyObservable, PropertyChangeData, Property, PropertyMetadataSettings } from "ui/core/dependency-observable";
import { ContentView } from "ui/content-view";
import { View } from "ui/core/view";
import { PropertyMetadata } from "ui/core/proxy";

declare var android, org: any;

export class BoredRudolph extends ContentView {
    public static refreshEvent = "refresh";

    public static refreshingProperty = new Property(
        "refreshing",
        "PullToRefresh",
        new PropertyMetadata(false, PropertyMetadataSettings.None)
    );

    private _android: android.support.v4.widget.SwipeRefreshLayout;
    private _androidViewId: number;

    constructor() {
        super();
    }

    get android(): any {
        return this._android;
    }

    get _nativeView(): any {
        return this._android;
    }

    get refreshing(): boolean {
        return this._getValue(BoredRudolph.refreshingProperty);
    }

    set refreshing(value: boolean) {
        this._setValue(BoredRudolph.refreshingProperty, value);
    }


    public _createUI() {

        var that = new WeakRef(this);

        this._android = new org.faudroids.boredrudolf.ui.CustomSwipeRefreshLayout(this._context);

        if (!this._androidViewId) {
            this._androidViewId = android.view.View.generateViewId();
        }
        this._android.setId(this._androidViewId);

        this._android.setOnRefreshListener(new org.faudroids.boredrudolf.ui.CustomSwipeRefreshLayout.OnRefreshListener({
            get owner() {
                return that.get();
            },

            onRefresh: function (v) {
                var owner = that.get();
                if (owner) {
                    owner.refreshing = true;
                    owner._emit(BoredRudolph.refreshEvent);
                }
            }
        }));
    }

    
    public _addChildFromBuilder(name: string, value: any) {
        // Copy inheirtable style property values
        var originalColor = value.style.color || null;

        if (value instanceof View) {
            this.content = value;
        }

        // Reset inheritable style property values as we do not want those to be inherited
        value.style.color = originalColor;
    }


}

function refreshingPropertyChanged(data: PropertyChangeData) {
    var pullRefresh = <BoredRudolph>data.object;
    if (!pullRefresh.android) {
        return;
    }

    pullRefresh.android.setRefreshing(data.newValue);
}

// register the setNativeValue callback
(<PropertyMetadata>BoredRudolph.refreshingProperty.metadata).onSetNativeValue = refreshingPropertyChanged;

