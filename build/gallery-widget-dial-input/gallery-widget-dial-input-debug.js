YUI.add('gallery-widget-dial-input', function(Y) {

/* Any frequently used shortcuts, strings and constants */
var Lang = Y.Lang;

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
    },
    mass: {
        value: 1000
        // TODO custom setter to plain js object?
    },
    width: {
        value: null,
        setter: function(w) {
            this._width = parseInt(w, 10);
            return w;
        },
        lazyAdd: false
    },
    height: {
        value: null,
        setter: function(h) {
            this._height = parseInt(h, 10);
            return h;
        },
        lazyAdd: false
    },
    rotation: {
        value: 0,
        setter: function(r) {
            this._rotation = parseInt(r, 10);
            return r;
        },
        lazyAdd: false,
        writeOnce: true 
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

        //var contentBox = this.get("contentBox");
        //contentBox.appendChild(Node.create(Dial.MYNODE_TEMPLATE));
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
        this.on("dial:mousemove", this._handleDrag);
        this.on("dial:mouseout", this._handleExit);
    },

    syncUI : function() {
        /*
        * syncUI is intended to be used by the Widget subclass to
        * update the UI to reflect the initial state of the widget,
        * after renderUI. From there, the event listeners we bound above
        * will take over.
        */

       // TODO enforce square
       this._originX = this._width / 2;
       this._originY = this._height / 2;

       this._mass = 1000;

       this._last = {};
        // this._uiSetAttrA(this.get("attrA"));
    },

    _handleDrag: function(e) {
        var domEvent = e.domEvent,
        pageX = domEvent.pageX,
        pageY = domEvent.pageY;

        if (this.isinsidecircle(pageX, pageY)) {
            var hitX = (pageX - this._originX),
                hitY = -(pageY - this._originY);


            if (this._last.X) {

                this._rotation += this._getRotation(pageX, pageY, this._last.X, this._last.Y, hitX, hitY);

                this.get("contentBox").setStyles({
                    'webkitTransform': 'rotate(' + this._rotation + 'deg)',
                    'transform': 'rotate(' + this._rotation + 'deg)'
                });
            }

            this._last = {
                X: hitX,
                Y: hitY
            };
        }
    },
    
    _handleExit: function(e) {
        /**
        this.get("contentBox").setStyles({
            'webkitTransition': 'all 2s ease 0s',
            'webkitTransform': 'rotate(' + this._rotation + 'deg)',
            'transform': 'rotate(' + this._rotation + 'deg)'
        });
       **/
        this._handleDrag(e);
        this._last = {};
    },

    /**
     * @param {Number} px e.pageX
     * @param {Number} py e.pageY
     * @param {Number} lx previous x coord, already resolved 
     * @param {Number} ly previous y coord, already resolved 
     * @param {Number} hx hitX, the x coord resolved to the dial reference
     * @param {Number} hy hitY, the y coord resolved to the dial reference
     */
    _getRotation: function(px, py, lx, ly, hx, hy) {

        var radius, force, x1, y1, x2, y2, r,
        a1, a2, dir, sign;

        radius = [lx, ly];
        force = [hx - lx, hy - ly];

        x1 = this._originX - px;
        y1 = this._originY - py;

        x2 = lx - px;
        y2 = ly - py;

        r = this.magnitude(radius);

        a1 = this.projection(force, radius);
        a2 = [force[0] - a1[0], force[1] - a1[1]];


        dir = this.direction(radius, force);
        sign = dir && dir / Math.abs(dir);

        return ((sign * -1) * ((this.magnitude(a2) * r) / this._mass));
    },



    // Beyond this point is the Dial specific application and rendering logic
    dotproduct: function(a, b) {
        var n = 0,
        i, lim = Math.min(a.length, b.length);
        for (i = 0; i < lim; i++) {
            n += a[i] * b[i];
        }
        return n;
    },

    magnitude: function(a) {
        //return Math.sqrt(radius[0]*radius[0]+radius[1]*radius[1]);
        var n = 0,
        i, lim = a.length;
        for (i = 0; i < lim; i++) {
            n += a[i] * a[i];
        }
        return Math.sqrt(n);
    },

    projection: function(u, v) {
        // u on v
        var f = this.dotproduct(u, v) / this.dotproduct(v, v);
        return [(v[0] * f), (v[1] * f)];
    },

    direction: function(u, v) {
        return (u[0] * v[1]) - (u[1] * v[0]);
    },

    anglebetweenvectors: function(a, b) {
        return Math.acos(
            this.dotproduct(a, b) / (this.magnitude(a) * this.magnitude(b))) * (180 / Math.PI);
    },

    // TODO link to dimensions of widget
    isinsidecircle: function(x, y) {
        var cx = 150,
        cy = 150,
        radius = 150,
        a = ((x - cx) * (x - cx)) + ((y - cy) * (y - cy)),
        b = (radius * radius);
        return (a < b);
    },

    /**
    degminsec: function(deg) {
        // TODO uglee...
        var degInt = ~~deg,
        min = 60 * (deg - degInt),
        minInt = ~~min,
        sec = 60 * (min - minInt);
        return [degInt, minInt, sec];
    },
   **/

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


}, '@VERSION@' ,{skinnable:false, requires:['widget']});
