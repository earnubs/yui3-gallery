YUI.add("gallery-jsonp",function(D){var A=D.Lang,C=function(){};function B(E,F){this.url=E;this._init(F);}B._pattern=/\bcallback=.*?(?=&|$)/i;B._template="callback={callback}";B.prototype={_init:function(E){var F=A.isObject(E)?E:{};this.success=A.isFunction(F)?F:A.isFunction(F.success)?F.success:C;this.failure=A.isFunction(F.failure)?F.failure:C;if(A.isFunction(F.format)){this._format=F.format;}},_format:function(F){var E=this.url,H=B._template.replace(/\{callback\}/,F),G;if(B._pattern.test(E)){return E.replace(B._pattern,H);}else{G=E.slice(-1);if(G!=="&"&&G!=="?"){E+=(E.indexOf("?")>-1)?"&":"?";}return E+H;}},send:function(){var G=D.guid().replace(/-/g,"_"),F=this._format("YUI."+G),H=this.success,E=this.failure;YUI[G]=H;YUI({modules:{_:{fullpath:F}}}).use("_",function(K,I){delete YUI[G];var J=D.Selector.query("head > script[src*="+G+"]",null,true);if(J){J.parentNode.removeChild(J);}else{}if(!I.success){E(F);}});return this;}};D.JSONPRequest=B;D.jsonp=function(E,G){var F=new D.JSONPRequest(E,G);return F&&F.send();};},"gallery-2009.10.27",{requires:["selector-css3"]});