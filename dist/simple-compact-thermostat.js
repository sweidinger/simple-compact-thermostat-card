function t(t,e,s,i){var o,r=arguments.length,n=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,s,n):o(e,s))||n);return r>3&&n&&Object.defineProperty(e,s,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new r(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,m=globalThis,_=m.trustedTypes,f=_?_.emptyScript:"",g=m.reactiveElementPolyfillSupport,v=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},b=(t,e)=>!c(t,e),$={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&l(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const r=i?.call(this);o?.call(this,e),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),o=e.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:y).toAttribute(e,s.type);this._$Em=t,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=i;const r=o.fromAttribute(e,t.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(void 0!==t){const r=this.constructor;if(!1===i&&(o=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??b)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,g?.({ReactiveElement:w}),(m.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,A=t=>t,S=x.trustedTypes,E=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,O="?"+k,P=`<${O}>`,N=document,H=()=>N.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,R="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,j=/>/g,L=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,W=/"/g,F=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),I=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),q=new WeakMap,Y=N.createTreeWalker(N,129);function J(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const K=(t,e)=>{const s=t.length-1,i=[];let o,r=2===e?"<svg>":3===e?"<math>":"",n=z;for(let e=0;e<s;e++){const s=t[e];let a,c,l=-1,d=0;for(;d<s.length&&(n.lastIndex=d,c=n.exec(s),null!==c);)d=n.lastIndex,n===z?"!--"===c[1]?n=U:void 0!==c[1]?n=j:void 0!==c[2]?(F.test(c[2])&&(o=RegExp("</"+c[2],"g")),n=L):void 0!==c[3]&&(n=L):n===L?">"===c[0]?(n=o??z,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?L:'"'===c[3]?W:D):n===W||n===D?n=L:n===U||n===j?n=z:(n=L,o=void 0);const h=n===L&&t[e+1].startsWith("/>")?" ":"";r+=n===z?s+P:l>=0?(i.push(a),s.slice(0,l)+C+s.slice(l)+k+h):s+k+(-2===l?e:h)}return[J(t,r+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class Z{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[c,l]=K(t,e);if(this.el=Z.createElement(c,s),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=Y.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(C)){const e=l[r++],s=i.getAttribute(t).split(k),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:n[2],strings:s,ctor:"."===n[1]?et:"?"===n[1]?st:"@"===n[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:o}),i.removeAttribute(t));if(F.test(i.tagName)){const t=i.textContent.split(k),e=t.length-1;if(e>0){i.textContent=S?S.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],H()),Y.nextNode(),a.push({type:2,index:++o});i.append(t[e],H())}}}else if(8===i.nodeType)if(i.data===O)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(k,t+1));)a.push({type:7,index:o}),t+=k.length-1}o++}}static createElement(t,e){const s=N.createElement("template");return s.innerHTML=t,s}}function G(t,e,s=t,i){if(e===I)return e;let o=void 0!==i?s._$Co?.[i]:s._$Cl;const r=M(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=o:s._$Cl=o),void 0!==o&&(e=G(t,o._$AS(t,e.values),o,i)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??N).importNode(e,!0);Y.currentNode=i;let o=Y.nextNode(),r=0,n=0,a=s[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new X(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new ot(o,this,t)),this._$AV.push(e),a=s[++n]}r!==a?.index&&(o=Y.nextNode(),r++)}return Y.currentNode=N,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),M(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==I&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(N.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=Z.createElement(J(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new Z(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new X(this.O(H()),this.O(H()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=V}_$AI(t,e=this,s,i){const o=this.strings;let r=!1;if(void 0===o)t=G(this,t,e,0),r=!M(t)||t!==this._$AH&&t!==I,r&&(this._$AH=t);else{const i=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=G(this,i[s+n],e,n),a===I&&(a=this._$AH[n]),r||=!M(a)||a!==this._$AH[n],a===V?t=V:t!==V&&(t+=(a??"")+o[n+1]),this._$AH[n]=a}r&&!i&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class st extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class it extends tt{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??V)===I)return;const s=this._$AH,i=t===V&&s!==V||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==V&&(s===V||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const rt=x.litHtmlPolyfillSupport;rt?.(Z,X),(x.litHtmlVersions??=[]).push("3.3.3");const nt=globalThis;class at extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let o=i._$litPart$;if(void 0===o){const t=s?.renderBefore??null;i._$litPart$=o=new X(e.insertBefore(H(),t),t,void 0,s??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}}at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const ct=nt.litElementPolyfillSupport;ct?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");const lt=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b},ht=(t=dt,e,s)=>{const{kind:i,metadata:o}=s;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),r.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const o=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,o,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const o=this[i];e.call(this,s),this.requestUpdate(i,o,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function pt(t){return(e,s)=>"object"==typeof s?ht(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function ut(t){return pt({...t,state:!0,attribute:!1})}const mt="simple-compact-thermostat",_t={cool:"var(--sct-mode-cool, #58a6ff)",heat:"var(--sct-mode-heat, #f0883e)",auto:"var(--sct-mode-auto, #3fb950)",heat_cool:"var(--sct-mode-heat-cool, #d2a8ff)",fan_only:"var(--sct-mode-fan, #79c0ff)",dry:"var(--sct-mode-dry, #d29922)",off:"var(--sct-mode-off, #8b949e)"},ft={cool:"Cooling",heat:"Heat",auto:"Auto",heat_cool:"Auto",fan_only:"Fan",dry:"Dry",off:"Off"},gt={auto:"fan-auto",on:"fan",low:"fan-speed-1",medium:"fan-speed-2",high:"fan-speed-3",diffuse:"weather-windy",focus:"target"},vt={auto:"Auto",on:"On",low:"Low",medium:"Med",high:"High",diffuse:"Diffuse",focus:"Focus"},yt=`${mt}-editor`,bt={entity:"Thermostat entity",name:"Card title",outside_temp_entity:"Outside temperature entity",step:"Setpoint step",room_sensor_columns:"Room sensor columns",show_preset:"Show preset dropdown",show_fan:"Show fan buttons",show_sensor_data:"Show room sensors",show_co2:"Show CO₂",show_humidity:"Show humidity",co2_entity:"CO₂ sensor",humidity_entity:"Humidity sensor",co2_warning_threshold:"CO₂ warning threshold (ppm)",humidity_warning_threshold:"Humidity warning threshold (%)"},$t=[{name:"entity",required:!0,selector:{entity:{domain:"climate"}}},{name:"name",selector:{text:{}}},{name:"outside_temp_entity",selector:{entity:{domain:["sensor","weather"]}}},{type:"grid",name:"",schema:[{name:"step",selector:{number:{min:.1,max:5,step:.1,mode:"box"}}},{name:"room_sensor_columns",selector:{number:{min:1,max:6,step:1,mode:"box"}}}]},{type:"grid",name:"",schema:[{name:"show_preset",selector:{boolean:{}}},{name:"show_fan",selector:{boolean:{}}},{name:"show_sensor_data",selector:{boolean:{}}}]},{type:"expandable",name:"",title:"Air quality (CO₂ and humidity)",icon:"mdi:air-filter",schema:[{name:"co2_entity",selector:{entity:{domain:"sensor"}}},{name:"humidity_entity",selector:{entity:{domain:"sensor"}}},{type:"grid",name:"",schema:[{name:"show_co2",selector:{boolean:{}}},{name:"show_humidity",selector:{boolean:{}}}]},{type:"grid",name:"",schema:[{name:"co2_warning_threshold",selector:{number:{min:400,max:5e3,step:100,mode:"box"}}},{name:"humidity_warning_threshold",selector:{number:{min:30,max:90,step:5,mode:"box"}}}]}]}],wt={show_preset:!0,show_fan:!0,show_sensor_data:!0,show_co2:!0,show_humidity:!0,step:1,room_sensor_columns:4,co2_warning_threshold:1e3,humidity_warning_threshold:60},xt=["room_sensors","additional_room_sensors","sensor_aliases","sensor_occupancy","sensor_humidity","sensor_excludes","hvac_modes","fan_modes"];let At=class extends at{constructor(){super(...arguments),this._computeLabel=t=>bt[t.name]??t.name,this._valueChanged=t=>{const e={...this._config,...t.detail.value};for(const t of Object.keys(e))""!==e[t]&&void 0!==e[t]||delete e[t];for(const[t,s]of Object.entries(wt))e[t]===s&&delete e[t];for(const[t,s]of Object.entries(this._autoDiscovered()))e[t]===s&&delete e[t];this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))},this._advancedChanged=t=>{if(!1===t.detail.isValid)return;const e=t.detail.value??{},s={...this._config};for(const t of xt)delete s[t];Object.assign(s,e),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:s},bubbles:!0,composed:!0}))}}setConfig(t){this._config=t}_autoDiscovered(){const t={};if(!this.hass||!this._config?.entity)return t;const e=this._config.entity,s=this.hass.entities;if(s){const i=s[e]?.device_id;if(i)for(const e of Object.keys(s)){if(s[e].device_id!==i)continue;const o=this.hass.states[e];o&&(!t.outside_temp_entity&&e.startsWith("weather.")&&(t.outside_temp_entity=e),!t.co2_entity&&e.startsWith("sensor.")&&"carbon_dioxide"===o.attributes.device_class&&(t.co2_entity=e),!t.humidity_entity&&e.startsWith("sensor.")&&"humidity"===o.attributes.device_class&&(t.humidity_entity=e))}}if(!t.outside_temp_entity){const s=`weather.${e.split(".")[1]}`;this.hass.states[s]&&(t.outside_temp_entity=s)}return t}_advancedConfig(){const t={};if(!this._config)return t;for(const e of xt)void 0!==this._config[e]&&(t[e]=this._config[e]);return t}render(){if(!this.hass||!this._config)return B``;const t=this._autoDiscovered(),e={...wt,...t,...this._config};return B`
      <ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${$t}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <div class="advanced">
        <div class="advanced-title">Advanced YAML</div>
        <div class="advanced-desc">
          <code>room_sensors</code>, <code>additional_room_sensors</code>,
          <code>sensor_aliases</code>, <code>sensor_occupancy</code>,
          <code>sensor_humidity</code>, <code>sensor_excludes</code>,
          <code>hvac_modes</code>, <code>fan_modes</code>
        </div>
        <ha-yaml-editor
          .defaultValue=${this._advancedConfig()}
          @value-changed=${this._advancedChanged}
        ></ha-yaml-editor>
      </div>
    `}};var St;At.styles=n`
    :host {
      display: block;
    }
    .advanced {
      margin-top: 18px;
      padding: 12px;
      background: var(--secondary-background-color);
      border: 1px solid var(--divider-color);
      border-radius: 8px;
    }
    .advanced-title {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color);
      margin-bottom: 4px;
    }
    .advanced-desc {
      font-size: 11px;
      color: var(--secondary-text-color);
      line-height: 1.6;
      margin-bottom: 10px;
    }
    .advanced-desc code {
      font-family: var(--code-font-family, ui-monospace, "Roboto Mono", monospace);
      font-size: 11px;
      padding: 1px 5px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      border-radius: 4px;
    }
    ha-yaml-editor {
      display: block;
    }
  `,t([pt({attribute:!1})],At.prototype,"hass",void 0),t([ut()],At.prototype,"_config",void 0),At=t([lt(yt)],At),window.customCards=window.customCards||[],window.customCards.push({type:mt,name:"Simple Compact Thermostat",description:"A compact thermostat card with HVAC, preset, and fan controls.",preview:!1,documentationURL:"https://github.com/priyam13coding/simple-compact-thermostat-card"}),console.info(`%c ${mt} %c v0.5.1 `,"color: white; background: #58a6ff; font-weight: 700;","color: #58a6ff; background: white; font-weight: 700;");const Et=["_temperature","_temperature_2","_temperature_3","_temperature_4"],Ct=["_humidity","_humidity_2","_humidity_3","_humidity_4"];let kt=St=class extends at{constructor(){super(...arguments),this._presetOpen=!1,this._optimistic={},this._outsideClickHandler=t=>{if(!this._presetOpen)return;const e=this.shadowRoot?.querySelector(".preset-wrapper");if(!e)return;t.composedPath().includes(e)||(this._presetOpen=!1,document.removeEventListener("click",this._outsideClickHandler,!0))}}static getConfigElement(){return document.createElement(`${mt}-editor`)}static getStubConfig(t,e){const s=e.find(t=>t.startsWith("climate."));return{entity:s??"climate.your_thermostat"}}setConfig(t){if(!t)throw new Error("Invalid configuration");if(!t.entity||!t.entity.startsWith("climate."))throw new Error("You must specify a climate entity (climate.*)");if(t.outside_temp_entity&&!t.outside_temp_entity.includes("."))throw new Error("outside_temp_entity must be a valid entity id");this._config={show_preset:!0,show_fan:!0,step:1,show_sensor_data:!0,room_sensor_columns:4,sensor_excludes:["Thermostat"],...t}}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._outsideClickHandler,!0)}updated(t){if(super.updated(t),!this._config||!this.hass)return;const e=this.hass.states[this._config.entity];if(!e)return;const s=Date.now(),i=[["hvac_mode",e.state],["fan_mode",e.attributes.fan_mode],["preset_mode",e.attributes.preset_mode],["temperature",e.attributes.temperature],["target_temp_low",e.attributes.target_temp_low],["target_temp_high",e.attributes.target_temp_high]];let o=!1;const r={...this._optimistic};for(const[t,e]of i){const i=r[t];i&&((i.value===e||s-i.setAt>St.STALE_MS)&&(delete r[t],o=!0))}o&&(this._optimistic=r)}getCardSize(){return 4}shouldUpdate(t){if(!this._config)return!1;if(t.has("_config")||t.has("_presetOpen"))return!0;const e=t.get("hass");if(!e)return!0;if(e.states[this._config.entity]!==this.hass.states[this._config.entity])return!0;const s=this._getOutsideTempEntity();if(s&&e.states[s]!==this.hass.states[s])return!0;for(const t of[this._getCo2Entity(),this._getHumidityEntity()])if(t&&e.states[t]!==this.hass.states[t])return!0;if(!1!==this._config.show_sensor_data){const t=this.hass.states[this._config.entity];for(const s of this._discoverSensors(t)){if(e.states[s.entity]!==this.hass.states[s.entity])return!0;if(s.occupancyEntity&&e.states[s.occupancyEntity]!==this.hass.states[s.occupancyEntity])return!0;if(s.humidityEntity&&e.states[s.humidityEntity]!==this.hass.states[s.humidityEntity])return!0;for(const t of[...s.stats??[],...s.tooltipSensors??[]])if(e.states[t.entity]!==this.hass.states[t.entity])return!0}}return!1}render(){if(!this._config||!this.hass)return V;const t=this.hass.states[this._config.entity];if(!t)return B`
        <ha-card>
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;const e=this._optimistic.hvac_mode?.value??t.state;return B`
      <ha-card style="--sct-mode-color: ${_t[e]??_t.off};">
        ${this._renderHeader(t)}
        ${this._renderMainRow(t)}
        ${this._renderModeStrip(t)}
        ${this._renderControlRow(t)}
        ${this._renderRoomSensors(t)}
      </ha-card>
    `}_renderRoomSensors(t){if(!1===this._config.show_sensor_data)return V;const e=this._discoverSensors(t);if(0===e.length)return V;const s=t.attributes.active_sensors??[],i=this._unit(),o=Math.max(1,this._config.room_sensor_columns??4);return B`
      <div
        class="room-sensors"
        style="grid-template-columns: repeat(${o}, 1fr);"
      >
        ${e.map((t,e)=>{const r=this.hass.states[t.entity],n=r?parseFloat(r.state):NaN,a=this._isActiveSensor(t.name,s),c=t.occupancyEntity?this.hass.states[t.occupancyEntity]:null,l="on"===c?.state,d=t.short??t.name;return B`
            <div
              class="sensor-cell ${a?"active":""} ${l?"occupied":""}"
              style=${(e+1)%o===0?"border-right: none;":""}
              title=${this._cellTooltip(t,l)}
            >
              <div class="sensor-temp">
                ${isNaN(n)?"—":this._round(n)}<span class="sensor-unit">°${i}</span>${this._renderCellHumidity(t)}
              </div>
              ${this._renderCellStats(t)}
              <div class="sensor-name">${d}</div>
            </div>
          `})}
      </div>
    `}_renderCellHumidity(t){if(!t.humidityEntity)return V;const e=this.hass.states[t.humidityEntity],s=e?parseFloat(e.state):NaN;if(isNaN(s))return V;const i=s>(this._config.humidity_warning_threshold??60);return B`<span class="sensor-hum ${i?"warn":""}">${Math.round(s)}%</span>`}_renderCellStats(t){const e=(t.stats??[]).map(t=>this._readStat(t)).filter(t=>null!==t);return 0===e.length?V:B`
      <div class="sensor-stats">
        ${e.map(t=>B`<span class="sensor-stat ${t.warn?"warn":""}">${t.text}</span>`)}
      </div>
    `}_readStat(t){const e=this.hass.states[t.entity];if(!e||"unavailable"===e.state||"unknown"===e.state)return null;const s=parseFloat(e.state),i=!isNaN(s),o=void 0!==t.unit?t.unit:i?e.attributes?.unit_of_measurement??"":"",r=i?String(Math.round(10*s)/10):e.state,n=i&&(null!=t.warn_above&&s>t.warn_above||null!=t.warn_below&&s<t.warn_below);return{text:`${t.label?`${t.label} `:""}${r}${o?` ${o}`:""}`,warn:n}}_cellTooltip(t,e){const s=[t.name+(e?" (occupied)":"")];for(const e of t.tooltipSensors??[]){const t=this.hass.states[e.entity];if(!t||"unavailable"===t.state||"unknown"===t.state)continue;const i=parseFloat(t.state),o=!isNaN(i),r=e.label??t.attributes?.friendly_name??e.entity,n=void 0!==e.unit?e.unit:o?t.attributes?.unit_of_measurement??"":"",a=o?String(Math.round(10*i)/10):t.state;s.push(`${r}: ${a}${n?` ${n}`:""}`)}return s.join("\n")}_manualToDiscovered(t){if(!t||!t.name||!t.entity)return null;const e=t=>Array.isArray(t)?t.filter(t=>t&&"string"==typeof t.entity):void 0;return{name:t.name,entity:t.entity,occupancyEntity:t.occupancy_entity,humidityEntity:t.humidity_entity,stats:e(t.stats),tooltipSensors:e(t.tooltip_sensors),short:t.short}}_withAdditional(t){const e=this._config.additional_room_sensors;if(!Array.isArray(e)||0===e.length)return t;const s=e.map(t=>this._manualToDiscovered(t)).filter(t=>null!==t);return[...t,...s]}_discoverSensors(t){const e=this._config.room_sensors;if(Array.isArray(e)&&e.length>0){const t=e.map(t=>this._manualToDiscovered(t)).filter(t=>null!==t);return this._withAdditional(t)}if(!t)return this._withAdditional([]);const s=t.attributes?.available_sensors;if(!Array.isArray(s))return this._withAdditional([]);const i=new Set((this._config.sensor_excludes??[]).map(t=>t.toLowerCase())),o=this._config.sensor_aliases??{},r=this._config.sensor_occupancy??{},n=this._config.sensor_humidity??{},a=this._findRelatedTempSensors(this._config.entity),c=this._findRelatedOccupancySensors(this._config.entity),l=this._findRelatedHumiditySensors(this._config.entity),d=new Set,h=new Set,p=new Set,u=[];for(const t of s){const{name:e}=this._parseSensorItem(t);if(!e)continue;if(i.has(e.toLowerCase()))continue;const s=this._matchSensorByName(e,a,d);if(!s)continue;let m,_;if(d.add(s),r[e])m=r[e];else{const t=this._matchOccupancySensor(e,c,h);t&&(h.add(t),m=t)}if(n[e])_=n[e];else{const t=this._matchSensorByName(e,l,p,Ct);t&&(p.add(t),_=t)}u.push({name:e,entity:s,short:o[e],occupancyEntity:m,humidityEntity:_})}return this._withAdditional(u)}_findRelatedHumiditySensors(t){const e=this.hass.entities,s=t=>{if(!t.startsWith("sensor."))return!1;const e=this.hass.states[t];return!!e&&("humidity"===e.attributes.device_class||t.endsWith("_humidity"))};if(e){const i=e[t],o=i?.device_id;if(o)return Object.keys(e).filter(t=>e[t].device_id===o&&s(t))}return Object.keys(this.hass.states).filter(s)}_findRelatedOccupancySensors(t){const e=this.hass.entities,s=t=>{if(!t.startsWith("binary_sensor."))return!1;const e=this.hass.states[t];return!!e&&("occupancy"===e.attributes.device_class||t.endsWith("_occupancy"))};if(e){const i=e[t],o=i?.device_id;if(o)return Object.keys(e).filter(t=>e[t].device_id===o&&s(t))}return Object.keys(this.hass.states).filter(s)}_matchOccupancySensor(t,e,s){const i=t.toLowerCase();for(const t of e){if(s.has(t))continue;const e=(this.hass.states[t]?.attributes?.friendly_name??"").toLowerCase();if(e===i||e===`${i} occupancy`||e.startsWith(`${i} `))return t}const o=i.replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"");for(const t of["_occupancy","_occupancy_2","_occupancy_3"]){const e=`binary_sensor.${o}${t}`;if(this.hass.states[e]&&!s.has(e))return e}return null}_parseSensorItem(t){if("string"==typeof t){const e=t.match(/^(.+?)\s+\(([^)]+)\)\s*$/);return e?{name:e[1],id:e[2]}:{name:t,id:""}}return t&&"object"==typeof t?{name:String(t.name??t.Name??""),id:String(t.id??t.Id??"")}:{name:"",id:""}}_findRelatedTempSensors(t){const e=this.hass.entities,s=t=>{if(!t.startsWith("sensor."))return!1;const e=this.hass.states[t];return!!e&&("temperature"===e.attributes.device_class||t.endsWith("_temperature"))};if(e){const i=e[t],o=i?.device_id;if(o)return Object.keys(e).filter(t=>e[t].device_id===o&&s(t))}return Object.keys(this.hass.states).filter(s)}_matchSensorByName(t,e,s,i=Et){const o=t.toLowerCase();for(const t of e){if(s.has(t))continue;if((this.hass.states[t]?.attributes?.friendly_name??"").toLowerCase()===o)return t}for(const t of e){if(s.has(t))continue;const e=(this.hass.states[t]?.attributes?.friendly_name??"").toLowerCase();if(e.startsWith(o+" ")||e.startsWith(o+"_"))return t}const r=o.replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"");for(const t of i){const e=`sensor.${r}${t}`;if(this.hass.states[e]&&!s.has(e))return e}return null}_getOutsideTempEntity(){if(this._config.outside_temp_entity)return this._config.outside_temp_entity;const t=this.hass.entities;if(t){const e=t[this._config.entity],s=e?.device_id;if(s)for(const e of Object.keys(t))if(e.startsWith("weather.")&&t[e].device_id===s&&this.hass.states[e])return e}const e=`weather.${this._config.entity.split(".")[1]}`;return this.hass.states[e]?e:null}_getOutsideTemp(){const t=this._getOutsideTempEntity();return t?this._readTempFromEntity(t):null}_getCo2Entity(){return this._config.co2_entity?this._config.co2_entity:this._findSensorByDeviceClass("carbon_dioxide")}_getHumidityEntity(){return this._config.humidity_entity?this._config.humidity_entity:this._findSensorByDeviceClass("humidity")}_findSensorByDeviceClass(t){const e=this.hass.entities;if(!e)return null;const s=e[this._config.entity],i=s?.device_id;if(!i)return null;for(const s of Object.keys(e)){if(!s.startsWith("sensor."))continue;if(e[s].device_id!==i)continue;const o=this.hass.states[s];if(o?.attributes?.device_class===t)return s}return null}_renderSubStats(){const t=!1===this._config.show_co2?null:this._getCo2Entity(),e=!1===this._config.show_humidity?null:this._getHumidityEntity(),s=t?this.hass.states[t]:null,i=e?this.hass.states[e]:null,o=s?parseFloat(s.state):NaN,r=i?parseFloat(i.state):NaN,n=!isNaN(o),a=!isNaN(r);if(!n&&!a)return V;const c=this._config.co2_warning_threshold??1e3,l=this._config.humidity_warning_threshold??60,d=n&&o>c,h=a&&r>l,p=s?.attributes?.unit_of_measurement??"ppm",u=i?.attributes?.unit_of_measurement??"%";return B`
      <div class="sub-stats">
        ${n?B`
          <span class="stat ${d?"warn":""}">
            CO₂ ${this._round(o)}<span class="stat-unit"> ${p}</span>
          </span>
        `:V}
        ${a?B`
          <span class="stat ${h?"warn":""}">
            ${this._round(r)}<span class="stat-unit">${u}</span> RH
          </span>
        `:V}
      </div>
    `}_readTempFromEntity(t){const e=this.hass.states[t];if(!e)return null;if(t.startsWith("weather.")){const t=e.attributes?.temperature;if("number"==typeof t)return t;if("string"==typeof t){const e=parseFloat(t);return isNaN(e)?null:e}return null}const s=parseFloat(e.state);return isNaN(s)?null:s}_isActiveSensor(t,e){const s=t.toLowerCase();return e.some(t=>{const e=t.toLowerCase();return e===s||s.startsWith(e+" ")||e.startsWith(s+" ")})}_renderHeader(t){const e=this._optimistic.hvac_mode?.value??t.state;return B`
      <div class="header">
        <span class="dot"></span>
        <span class="header-text">HVAC</span>
        <span class="header-sep">✦</span>
        <span class="header-mode">${(ft[e]??e).toUpperCase()}</span>
      </div>
    `}_renderMainRow(t){const e=this._unit(),s=t.attributes.current_temperature,i="off"===(this._optimistic.hvac_mode?.value??t.state),o=this._getOutsideTemp(),r=t.attributes,n=this._optimistic.temperature?.value,a=this._optimistic.target_temp_low?.value,c=this._optimistic.target_temp_high?.value,l=n??r.temperature,d=a??r.target_temp_low,h=c??r.target_temp_high,p=null==l&&null!=d&&null!=h;return B`
      <div class="main-row">
        <div class="current-cell">
          <div class="micro-label">current</div>
          <div class="big-temp">
            ${null!=s?this._round(s):"—"}<span class="big-unit">°${e}</span>
          </div>
          ${this._renderSubStats()}
        </div>

        <div class="adjust-cell">
          <button
            class="round-btn"
            ?disabled=${i}
            @click=${()=>this._adjustSetpoint(1)}
            aria-label="Increase setpoint"
          >+</button>
          <button
            class="round-btn"
            ?disabled=${i}
            @click=${()=>this._adjustSetpoint(-1)}
            aria-label="Decrease setpoint"
          >−</button>
        </div>

        <div class="right-panel">
          <div class="right-cell">
            <div class="med-temp">
              ${null!=o?this._round(o):"—"}°<span class="med-unit">${e}</span>
            </div>
            <span class="corner-label">outside</span>
          </div>
          ${p?this._renderDualSetCell(d,h,e):this._renderSingleSetCell(l,e)}
        </div>
      </div>
    `}_renderSingleSetCell(t,e){return B`
      <div class="right-cell">
        <div class="med-temp set">
          ${null!=t?this._round(t):"—"}°<span class="med-unit">${e}</span>
        </div>
        <span class="corner-label">set</span>
      </div>
    `}_renderDualSetCell(t,e,s){return B`
      <div class="right-cell dual">
        <div class="dual-inline">
          <div class="dual-pair heat">
            <span class="dual-temp">${this._round(t)}°<span class="dual-unit">${s}</span></span>
            <span class="dual-tag">heat</span>
          </div>
          <span class="dual-sep">/</span>
          <div class="dual-pair cool">
            <span class="dual-temp">${this._round(e)}°<span class="dual-unit">${s}</span></span>
            <span class="dual-tag">cool</span>
          </div>
        </div>
        <span class="corner-label">set</span>
      </div>
    `}_renderModeStrip(t){const e=t.attributes.hvac_modes??[],s=this._config.hvac_modes,i=s?e.filter(t=>s.includes(t)):e,o=this._optimistic.hvac_mode?.value??t.state;return B`
      <div class="mode-strip">
        ${i.map((t,e)=>B`
            <button
              class="mode-cell ${t===o?"active":""}"
              style="--cell-color: ${_t[t]??_t.off}; ${e>0?"border-left: 1px solid var(--sct-border);":""}"
              @click=${()=>this._setHvacMode(t)}
            >
              ${(ft[t]??t).toUpperCase()}
            </button>
          `)}
      </div>
    `}_renderControlRow(t){const e=!1!==this._config.show_preset,s=!1!==this._config.show_fan;return e||s?B`
      <div class="control-row ${e&&s?"split":""}">
        ${e?this._renderPreset(t):B`<div></div>`}
        ${e&&s?B`<div class="v-divider"></div>`:V}
        ${s?this._renderFan(t):B`<div></div>`}
      </div>
    `:B``}_renderPreset(t){const e=t.attributes.preset_modes??[],s=this._optimistic.preset_mode?.value??t.attributes.preset_mode,i=(s??"").toLowerCase(),o=!!s&&"none"!==i&&e.some(t=>t.toLowerCase()===i),r=o?this._presetLabel(s):"Custom";return 0===e.length?B`
        <div class="control-cell">
          <div class="micro-label">preset</div>
          <div class="preset-empty">None available</div>
        </div>
      `:B`
      <div class="control-cell">
        <div class="micro-label">preset</div>
        <div class="preset-wrapper">
          <button
            class="preset-trigger ${o?"":"is-custom"}"
            @click=${()=>this._togglePreset()}
            aria-expanded=${this._presetOpen}
          >
            <span>${r}</span>
            <ha-icon
              icon="mdi:chevron-down"
              class="chevron ${this._presetOpen?"open":""}"
            ></ha-icon>
          </button>
          ${this._presetOpen?B`
            <div class="preset-popup" @click=${t=>t.stopPropagation()}>
              ${e.map((t,s)=>B`
                <button
                  class="preset-option ${t.toLowerCase()===i?"selected":""}"
                  style=${s<e.length-1?"border-bottom: 1px solid var(--sct-border);":""}
                  @click=${()=>this._selectPreset(t)}
                >
                  ${this._presetLabel(t)}
                </button>
              `)}
            </div>
          `:V}
        </div>
      </div>
    `}_renderFan(t){const e=t.attributes.fan_modes??[],s=this._optimistic.fan_mode?.value??t.attributes.fan_mode;let i=this._config.fan_modes??["auto","on"];return i=i.filter(t=>e.includes(t)),0===i.length?B`
        <div class="control-cell">
          <div class="micro-label">fan</div>
          <div class="preset-empty">No fan</div>
        </div>
      `:B`
      <div class="control-cell">
        <div class="micro-label">fan</div>
        <div class="fan-buttons">
          ${i.map(t=>{const e=s===t,i=gt[t]??"fan",o=(vt[t]??t).toUpperCase();return B`
              <button
                class="fan-btn ${e?"active":""}"
                @click=${()=>this._setFanMode(t)}
                title="Fan ${t}"
              >
                <ha-icon icon="mdi:${i}"></ha-icon>
                <span>${o}</span>
              </button>
            `})}
        </div>
      </div>
    `}_togglePreset(){this._presetOpen=!this._presetOpen,this._presetOpen?setTimeout(()=>document.addEventListener("click",this._outsideClickHandler,!0),0):document.removeEventListener("click",this._outsideClickHandler,!0)}_selectPreset(t){this._presetOpen=!1,document.removeEventListener("click",this._outsideClickHandler,!0),this._setPreset(t)}_adjustSetpoint(t){const e=this.hass.states[this._config.entity],s=this._config.step??1,i=this._getSetpoint(e);if(null==i)return;const o=+(i+t*s).toFixed(1),r=Date.now(),n=e.attributes;if(null!=n.target_temp_low&&null!=n.target_temp_high&&null==n.temperature){const e=+((this._optimistic.target_temp_low?.value??n.target_temp_low)+t*s).toFixed(1),i=+((this._optimistic.target_temp_high?.value??n.target_temp_high)+t*s).toFixed(1);this._optimistic={...this._optimistic,target_temp_low:{value:e,setAt:r},target_temp_high:{value:i,setAt:r}},this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,target_temp_low:e,target_temp_high:i})}else this._optimistic={...this._optimistic,temperature:{value:o,setAt:r}},this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,temperature:o})}_setHvacMode(t){this._optimistic={...this._optimistic,hvac_mode:{value:t,setAt:Date.now()}},this.hass.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:t})}_setPreset(t){this._optimistic={...this._optimistic,preset_mode:{value:t,setAt:Date.now()}},this.hass.callService("climate","set_preset_mode",{entity_id:this._config.entity,preset_mode:t})}_setFanMode(t){this._optimistic={...this._optimistic,fan_mode:{value:t,setAt:Date.now()}},this.hass.callService("climate","set_fan_mode",{entity_id:this._config.entity,fan_mode:t})}_getSetpoint(t){if(void 0!==this._optimistic.temperature)return this._optimistic.temperature.value;const e=t.attributes;if(null!=e.temperature)return e.temperature;const s=this._optimistic.target_temp_low?.value??e.target_temp_low,i=this._optimistic.target_temp_high?.value??e.target_temp_high;return null!=s&&null!=i?(s+i)/2:null}_unit(){return(this.hass.config.unit_system.temperature||"°F").replace("°","")}_round(t){return Math.round(t)}_presetLabel(t){return t&&"none"!==t.toLowerCase()?t.split("_").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" "):"No Preset"}};kt.STALE_MS=3e5,kt.styles=n`
    :host {
      display: block;
      --sct-border:           rgba(127, 127, 127, 0.18);
      --sct-border-strong:    rgba(127, 127, 127, 0.28);
      --sct-subtle-bg:        rgba(127, 127, 127, 0.05);
      --sct-hover-bg:         rgba(127, 127, 127, 0.10);
      --sct-active-tint:      0.15;       /* alpha multiplier for tinted bg */
      --sct-radius:           20px;
      --sct-radius-inner:     14px;
      --sct-radius-small:     8px;
      --sct-text-primary:     var(--primary-text-color);
      --sct-text-secondary:   var(--secondary-text-color);
      --sct-mono:             ui-monospace, "SF Mono", "Roboto Mono", "JetBrains Mono",
                              Menlo, Consolas, monospace;
    }

    ha-card {
      border-radius: var(--sct-radius);
      overflow: visible;
      padding: 0;
    }

    .warning {
      color: var(--error-color);
      padding: 12px 16px;
      font-size: 0.85rem;
    }

    /* ── Header ─────────────────────────────────────────────────────── */
    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 20px 10px;
      border-bottom: 1px solid var(--sct-border);
    }
    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--sct-mode-color);
      box-shadow: 0 0 8px var(--sct-mode-color);
    }
    .header-text {
      color: var(--sct-text-primary);
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.08em;
    }
    .header-sep {
      color: var(--sct-text-secondary);
      opacity: 0.5;
      font-size: 12px;
    }
    .header-mode {
      color: var(--sct-mode-color);
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.1em;
    }

    /* ── Main row ───────────────────────────────────────────────────── */
    .main-row {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: stretch;
      padding: 12px 16px;
      gap: 0;
    }
    .micro-label {
      color: var(--sct-text-secondary);
      font-size: 9px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      margin-bottom: 4px;
      font-weight: 500;
    }

    .current-cell {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .big-temp {
      color: var(--sct-text-primary);
      font-size: clamp(54px, 12vw, 72px);
      line-height: 1;
      letter-spacing: -0.02em;
      font-family: var(--sct-mono);
      font-weight: 300;
    }
    .big-unit {
      font-size: 0.38em;
      color: var(--sct-text-secondary);
      vertical-align: super;
      margin-left: 2px;
      font-family: inherit;
    }

    /* CO2 + humidity row under the current temperature */
    .sub-stats {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 6px;
      align-items: baseline;
    }
    .stat {
      font-size: 11px;
      color: var(--sct-text-secondary);
      font-family: var(--sct-mono);
      white-space: nowrap;
      line-height: 1.2;
    }
    .stat-unit {
      font-size: 0.78em;
      opacity: 0.7;
    }
    .stat.warn {
      color: var(--error-color, #f44336);
      font-weight: 600;
    }

    .adjust-cell {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 0 14px;
    }
    .round-btn {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      border: 1px solid var(--sct-border-strong);
      background: var(--sct-subtle-bg);
      color: var(--sct-text-primary);
      font-size: 22px;
      line-height: 1;
      font-weight: 300;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 120ms, border-color 120ms, transform 80ms;
      padding: 0;
    }
    .round-btn:hover:not(:disabled) {
      background: var(--sct-hover-bg);
      border-color: var(--sct-mode-color);
    }
    .round-btn:active:not(:disabled) {
      transform: scale(0.94);
    }
    .round-btn:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    .right-panel {
      display: flex;
      flex-direction: column;
      border: 1px solid var(--sct-border);
      border-radius: var(--sct-radius-inner);
      overflow: hidden;
      min-width: 100px;
      background: var(--sct-subtle-bg);
    }
    .right-cell {
      flex: 1;
      position: relative;
      display: flex;
      align-items: center;
      padding: 6px 12px 16px;
    }
    .right-cell + .right-cell {
      border-top: 1px solid var(--sct-border);
    }
    .med-temp {
      color: var(--sct-text-primary);
      font-size: 40px;
      line-height: 1;
      font-family: var(--sct-mono);
      font-weight: 400;
      letter-spacing: -0.01em;
    }
    .med-temp.set {
      color: var(--sct-mode-color);
    }
    .med-unit {
      font-size: 0.6em;
      color: var(--sct-text-secondary);
    }
    .med-temp.set .med-unit {
      color: var(--sct-mode-color);
      opacity: 0.7;
    }
    .corner-label {
      position: absolute;
      bottom: 5px;
      right: 12px;
      color: var(--sct-text-secondary);
      font-size: 8px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      font-weight: 500;
      white-space: nowrap;
    }

    /* dual setpoint — single line of numbers, labels aligned at bottom with SET */
    .right-cell.dual {
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
      padding: 6px 12px 5px;
    }
    /* HEAT and COOL tags already communicate this is the setpoint; the SET
       corner label collides with them at narrow widths. Drop it in dual mode. */
    .right-cell.dual .corner-label {
      display: none;
    }
    .dual-inline {
      display: flex;
      align-items: flex-end;
      gap: 6px;
    }
    .dual-pair {
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 1;
    }
    .dual-temp {
      font-size: 22px;
      font-family: var(--sct-mono);
      font-weight: 400;
      letter-spacing: -0.01em;
    }
    .dual-pair.heat .dual-temp { color: var(--sct-mode-heat, #f0883e); }
    .dual-pair.cool .dual-temp { color: var(--sct-mode-cool, #58a6ff); }
    .dual-unit {
      font-size: 0.55em;
      opacity: 0.75;
      margin-left: 1px;
    }
    .dual-sep {
      color: var(--sct-text-secondary);
      opacity: 0.5;
      font-size: 18px;
      padding-bottom: 14px;     /* lines up the slash with the bottom of the numbers, above the labels */
    }
    .dual-tag {
      font-size: 8px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--sct-text-secondary);
      font-weight: 500;
      margin-top: 2px;
    }

    /* ── HVAC mode strip ────────────────────────────────────────────── */
    .mode-strip {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
      border-top: 1px solid var(--sct-border);
      border-bottom: 1px solid var(--sct-border);
    }
    .mode-cell {
      padding: 11px 4px;
      border: none;
      background: transparent;
      color: var(--sct-text-secondary);
      font-size: 10px;
      letter-spacing: 0.12em;
      font-weight: 500;
      cursor: pointer;
      transition: background 180ms, color 180ms;
    }
    .mode-cell:hover {
      color: var(--sct-text-primary);
      background: var(--sct-hover-bg);
    }
    .mode-cell.active {
      color: var(--cell-color);
      background: color-mix(in srgb, var(--cell-color) 15%, transparent);
      font-weight: 600;
    }

    /* ── Control row ────────────────────────────────────────────────── */
    .control-row {
      display: grid;
      grid-template-columns: 1fr;
    }
    .control-row.split {
      grid-template-columns: 1fr 1px 1fr;
    }
    .v-divider {
      background: var(--sct-border);
    }
    .control-cell {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      position: relative;
      min-width: 0;        /* override grid's default min-width:auto so the column can shrink */
      overflow: visible;   /* don't clip the preset popup */
    }
    .control-cell .micro-label {
      margin-bottom: 0;
      flex-shrink: 0;
    }
    .preset-empty {
      color: var(--sct-text-secondary);
      font-size: 11px;
      padding: 6px 0;
    }

    /* preset */
    .preset-wrapper {
      position: relative;
      flex: 1;
      min-width: 0;
    }
    .preset-trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      background: var(--sct-subtle-bg);
      border: 1px solid var(--sct-border);
      border-radius: var(--sct-radius-small);
      padding: 7px 10px;
      color: var(--sct-text-primary);
      font-size: 11px;
      cursor: pointer;
      font-family: inherit;
      font-weight: 400;
      letter-spacing: 0.02em;
    }
    .preset-trigger:hover {
      background: var(--sct-hover-bg);
    }
    .preset-trigger.is-custom > span {
      font-style: italic;
      color: var(--sct-text-secondary);
    }
    .chevron {
      --mdc-icon-size: 14px;
      color: var(--sct-text-secondary);
      transition: transform 200ms;
    }
    .chevron.open {
      transform: rotate(180deg);
    }
    .preset-popup {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
      max-height: 200px;
      overflow-y: auto;
      background: var(--card-background-color, var(--ha-card-background, #ffffff));
      border: 1px solid var(--sct-border-strong);
      border-radius: var(--sct-radius-small);
      z-index: 1000;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
      animation: pop 140ms ease-out;
    }
    @keyframes pop {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .preset-option {
      display: block;
      width: 100%;
      padding: 9px 12px;
      background: transparent;
      border: none;
      color: var(--sct-text-secondary);
      font-size: 11px;
      text-align: left;
      cursor: pointer;
      font-family: inherit;
      font-weight: 400;
      letter-spacing: 0.02em;
    }
    .preset-option:hover {
      background: var(--sct-hover-bg);
      color: var(--sct-text-primary);
    }
    .preset-option.selected {
      color: var(--sct-text-primary);
      background: var(--sct-hover-bg);
      font-weight: 500;
    }

    /* fan */
    .fan-buttons {
      display: flex;
      gap: 6px;
      flex: 1;
      flex-wrap: wrap;
      min-width: 0;
    }
    .fan-btn {
      flex: 1 1 auto;
      min-width: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      padding: 7px 6px;
      border-radius: var(--sct-radius-small);
      border: 1px solid var(--sct-border);
      background: var(--sct-subtle-bg);
      color: var(--sct-text-secondary);
      cursor: pointer;
      font-family: inherit;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.08em;
      transition: background 180ms, color 180ms, border-color 180ms;
    }
    .fan-btn:hover {
      background: var(--sct-hover-bg);
      color: var(--sct-text-primary);
    }
    .fan-btn.active {
      color: var(--sct-mode-color);
      border-color: color-mix(in srgb, var(--sct-mode-color) 50%, transparent);
      background: color-mix(in srgb, var(--sct-mode-color) 15%, transparent);
    }
    .fan-btn ha-icon {
      --mdc-icon-size: 14px;
    }

    /* ── Room sensors row ───────────────────────────────────────────── */
    .room-sensors {
      display: grid;
      border-top: 1px solid var(--sct-border);
    }
    .sensor-cell {
      padding: 8px 10px;
      border-right: 1px solid var(--sct-border);
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
      background: transparent;
      transition: background 180ms;
    }
    .sensor-cell.active {
      background: var(--sct-hover-bg);
    }
    .sensor-temp {
      color: var(--sct-text-primary);
      font-size: 18px;
      line-height: 1;
      font-family: var(--sct-mono);
      font-weight: 400;
      letter-spacing: -0.01em;
    }
    .sensor-cell.active .sensor-temp {
      color: var(--sct-mode-color);
    }
    .sensor-unit {
      font-size: 1em;
      color: inherit;
      margin-left: 1px;
    }
    .sensor-hum {
      font-size: 1em;
      color: inherit;
      margin-left: 6px;
      font-weight: 400;
      letter-spacing: 0;
    }
    .sensor-hum.warn {
      color: var(--error-color, #f44336);
      font-weight: 600;
    }
    .sensor-stats {
      display: flex;
      flex-wrap: wrap;
      gap: 1px 7px;
      font-size: 9px;
      line-height: 1.3;
      color: var(--sct-text-secondary);
      font-family: var(--sct-mono);
      min-width: 0;
    }
    .sensor-stat {
      white-space: nowrap;
    }
    .sensor-stat.warn {
      color: var(--error-color, #f44336);
      font-weight: 600;
    }
    .sensor-name {
      color: var(--sct-text-secondary);
      font-size: 8px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sensor-cell.occupied .sensor-name {
      color: var(--sct-text-primary);
      font-weight: 700;
    }
  `,t([pt({attribute:!1})],kt.prototype,"hass",void 0),t([ut()],kt.prototype,"_config",void 0),t([ut()],kt.prototype,"_presetOpen",void 0),t([ut()],kt.prototype,"_optimistic",void 0),kt=St=t([lt(mt)],kt);export{kt as SimpleCompactThermostatCard};
