/* Any frequently used shortcuts, strings and constants */
var Lang = Y.Lang,
    Widget = Y.Widget,
    Node = Y.Node;

/* Dial class constructor */
function Dial(config) {
    Dial.superclass.constructor.apply(this, arguments);
}

/* 
* Required NAME static field, to identify the Widget class and 
* used as an event prefix, to generate class names etc. (set to the 
* class name in camel case). 
*/
Dial.NAME = "dial";

/*
* The attribute configuration for the widget. This defines the core user facing state of the widget
*/
Dial.ATTRS = {

    value: {
        value: 0,
        validator: function(value) {
            return !isNaN(parseFloat(value)) && isFinite(value);
        }
    }

    // ... attrB, attrC, attrD ... attribute configurations. 

    // Can also include attributes for the super class if you want to override or add configuration parameters
};

/* 
* The HTML_PARSER static constant is used if the Widget supports progressive enhancement, and is
* used to populate the configuration for the Dial instance from markup already on the page.
*/
Dial.HTML_PARSER = {

    value: function(srcNode) {
        return srcNode.one("input").get("value");
    }
};

/* Templates for any markup the widget uses. Usually includes {} tokens, which are replaced through Y.substitute */
Dial.MYNODE_TEMPLATE = "<div id={mynodeid}></div>";

/* Dial extends the base Widget class */
Y.extend(Dial, Y.Widget, {

    renderUI : function() {
        /*
        * renderUI is part of the lifecycle introduced by the
        * Widget class. Widget's renderer method invokes:
        *
        *     renderUI()
        *     bindUI()
        *     syncUI()
        *
        * renderUI is intended to be used by the Widget subclass
        * to create or insert new elements into the DOM. 
        */

        // this._mynode = Node.create(Y.substitute(Dial.MYNODE_TEMPLATE, {mynodeid: this.get("id") + "_mynode"})); 

        var contentBox = this.get("contentBox");
        console.log(contentBox);
        contentBox.appendChild(Node.create(Dial.MYNODE_TEMPLATE));
    },

    bindUI : function() {
        /*
        * bindUI is intended to be used by the Widget subclass 
        * to bind any event listeners which will drive the Widget UI.
        * 
        * It will generally bind event listeners for attribute change
        * events, to update the state of the rendered UI in response 
        * to attribute value changes, and also attach any DOM events,
        * to activate the UI.
        */

        // this.after("attrAChange", this._afterAttrAChange);
    },

    syncUI : function() {
        /*
        * syncUI is intended to be used by the Widget subclass to
        * update the UI to reflect the initial state of the widget,
        * after renderUI. From there, the event listeners we bound above
        * will take over.
        */

        // this._uiSetAttrA(this.get("attrA"));
    },

    // Beyond this point is the Dial specific application and rendering logic

    /* Attribute state supporting methods (see attribute config above) */

    _defAttrAVal : function() {
        // this.get("id") + "foo";
    },

    _setAttrA : function(attrVal, attrName) {
        // return attrVal.toUpperCase();
    },

    _getAttrA : function(attrVal, attrName) {
        // return attrVal.toUpperCase();
    },

    _validateAttrA : function(attrVal, attrName) {
        // return Lang.isString(attrVal);
    },

    /* Listeners, UI update methods */

    _afterAttrAChange : function(e) {
        /* Listens for changes in state, and asks for a UI update (controller). */

        // this._uiSetAttrA(e.newVal);
    },

    _uiSetAttrA : function(val) {
        /* Update the state of attrA in the UI (view) */

        // this._mynode.set("innerHTML", val);
    },

    _defMyEventFn : function(e) {
        // The default behavior for the "myEvent" event.
    }
});

Y.namespace('MyApp').Dial = Dial;
