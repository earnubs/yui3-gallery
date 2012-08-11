YUI.add("gallery-widget-dial-input",function(c){var b=c.Lang;function a(d){a.superclass.constructor.apply(this,arguments);}a.NAME="dial";a.ATTRS={value:{value:0,validator:function(d){return !isNaN(parseFloat(d))&&isFinite(d);}},mass:{value:1000},width:{value:null,setter:function(d){this._width=parseInt(d,10);return d;},lazyAdd:false},height:{value:null,setter:function(d){this._height=parseInt(d,10);return d;},lazyAdd:false},rotation:{value:0,setter:function(d){this._rotation=parseInt(d,10);return d;},lazyAdd:false,writeOnce:true}};a.HTML_PARSER={value:function(d){return d.one("input").get("value");}};a.MYNODE_TEMPLATE="<div id={mynodeid}></div>";c.extend(a,c.Widget,{renderUI:function(){},bindUI:function(){this.on("dial:mousemove",this._handleDrag);this.on("dial:mouseout",this._handleExit);},syncUI:function(){this._originX=this._width/2;this._originY=this._height/2;this._mass=1000;this._last={};},_handleDrag:function(j){var i=j.domEvent,h=i.pageX,f=i.pageY;if(this.isinsidecircle(h,f)){var g=(h-this._originX),d=-(f-this._originY);if(this._last.X){this._rotation+=this._getRotation(h,f,this._last.X,this._last.Y,g,d);this.get("contentBox").setStyles({"webkitTransform":"rotate("+this._rotation+"deg)","transform":"rotate("+this._rotation+"deg)"});}this._last={X:g,Y:d};}},_handleExit:function(d){this._handleDrag(d);this._last={};},_getRotation:function(u,t,l,j,p,n){var o,i,h,s,f,q,d,g,e,m,k;o=[l,j];i=[p-l,n-j];h=this._originX-u;s=this._originY-t;f=l-u;q=j-t;d=this.magnitude(o);g=this.projection(i,o);e=[i[0]-g[0],i[1]-g[1]];m=this.direction(o,i);k=m&&m/Math.abs(m);return((k*-1)*((this.magnitude(e)*d)/this._mass));},dotproduct:function(e,d){var h=0,f,g=Math.min(e.length,d.length);for(f=0;f<g;f++){h+=e[f]*d[f];}return h;},magnitude:function(d){var g=0,e,f=d.length;for(e=0;e<f;e++){g+=d[e]*d[e];}return Math.sqrt(g);},projection:function(e,d){var g=this.dotproduct(e,d)/this.dotproduct(d,d);return[(d[0]*g),(d[1]*g)];},direction:function(e,d){return(e[0]*d[1])-(e[1]*d[0]);},anglebetweenvectors:function(e,d){return Math.acos(this.dotproduct(e,d)/(this.magnitude(e)*this.magnitude(d)))*(180/Math.PI);},isinsidecircle:function(g,j){var f=150,i=150,e=150,h=((g-f)*(g-f))+((j-i)*(j-i)),d=(e*e);return(h<d);},_defAttrAVal:function(){},_setAttrA:function(d,e){},_getAttrA:function(d,e){},_validateAttrA:function(d,e){},_afterAttrAChange:function(d){},_uiSetAttrA:function(d){},_defMyEventFn:function(d){}});c.namespace("MyApp").Dial=a;},"@VERSION@",{skinnable:false,requires:["widget"]});