function t(t,e,s,i){var r,o=arguments.length,n=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,s,n):r(e,s))||n);return o>3&&n&&Object.defineProperty(e,s,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let o=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&r.set(e,t))}return t}toString(){return this.cssText}};const n=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,m=u.trustedTypes,f=m?m.emptyScript:"",_=u.reactiveElementPolyfillSupport,g=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},b=(t,e)=>!a(t,e),y={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);r?.call(this,e),this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),r=e.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:v).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=i;const o=r.fromAttribute(e,t.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(void 0!==t){const o=this.constructor;if(!1===i&&(r=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??b)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[g("elementProperties")]=new Map,$[g("finalized")]=new Map,_?.({ReactiveElement:$}),(u.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,w=t=>t,A=x.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+C,P=`<${k}>`,O=document,M=()=>O.createComment(""),H=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,U="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,z=/>/g,j=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,D=/"/g,F=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),W=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),V=new WeakMap,q=O.createTreeWalker(O,129);function J(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Y=(t,e)=>{const s=t.length-1,i=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=N;for(let e=0;e<s;e++){const s=t[e];let a,c,l=-1,d=0;for(;d<s.length&&(n.lastIndex=d,c=n.exec(s),null!==c);)d=n.lastIndex,n===N?"!--"===c[1]?n=R:void 0!==c[1]?n=z:void 0!==c[2]?(F.test(c[2])&&(r=RegExp("</"+c[2],"g")),n=j):void 0!==c[3]&&(n=j):n===j?">"===c[0]?(n=r??N,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?j:'"'===c[3]?D:L):n===D||n===L?n=j:n===R||n===z?n=N:(n=j,r=void 0);const h=n===j&&t[e+1].startsWith("/>")?" ":"";o+=n===N?s+P:l>=0?(i.push(a),s.slice(0,l)+E+s.slice(l)+C+h):s+C+(-2===l?e:h)}return[J(t,o+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class K{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[c,l]=Y(t,e);if(this.el=K.createElement(c,s),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=q.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(E)){const e=l[o++],s=i.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:s,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?st:X}),i.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:r}),i.removeAttribute(t));if(F.test(i.tagName)){const t=i.textContent.split(C),e=t.length-1;if(e>0){i.textContent=A?A.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],M()),q.nextNode(),a.push({type:2,index:++r});i.append(t[e],M())}}}else if(8===i.nodeType)if(i.data===k)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(C,t+1));)a.push({type:7,index:r}),t+=C.length-1}r++}}static createElement(t,e){const s=O.createElement("template");return s.innerHTML=t,s}}function Z(t,e,s=t,i){if(e===W)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const o=H(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=Z(t,r._$AS(t,e.values),r,i)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??O).importNode(e,!0);q.currentNode=i;let r=q.nextNode(),o=0,n=0,a=s[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Q(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new it(r,this,t)),this._$AV.push(e),a=s[++n]}o!==a?.index&&(r=q.nextNode(),o++)}return q.currentNode=O,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),H(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=K.createElement(J(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new G(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new K(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new Q(this.O(M()),this.O(M()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=B}_$AI(t,e=this,s,i){const r=this.strings;let o=!1;if(void 0===r)t=Z(this,t,e,0),o=!H(t)||t!==this._$AH&&t!==W,o&&(this._$AH=t);else{const i=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=Z(this,i[s+n],e,n),a===W&&(a=this._$AH[n]),o||=!H(a)||a!==this._$AH[n],a===B?t=B:t!==B&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!i&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class st extends X{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??B)===W)return;const s=this._$AH,i=t===B&&s!==B||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==B&&(s===B||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const rt=x.litHtmlPolyfillSupport;rt?.(K,Q),(x.litHtmlVersions??=[]).push("3.3.3");const ot=globalThis;class nt extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new Q(e.insertBefore(M(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}nt._$litElement$=!0,nt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:nt});const at=ot.litElementPolyfillSupport;at?.({LitElement:nt}),(ot.litElementVersions??=[]).push("4.2.2");const ct={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:b},lt=(t=ct,e,s)=>{const{kind:i,metadata:r}=s;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),o.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const r=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,r,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const r=this[i];e.call(this,s),this.requestUpdate(i,r,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function dt(t){return(e,s)=>"object"==typeof s?lt(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function ht(t){return dt({...t,state:!0,attribute:!1})}const pt="simple-compact-thermostat",ut={cool:"var(--sct-mode-cool, #58a6ff)",heat:"var(--sct-mode-heat, #f0883e)",auto:"var(--sct-mode-auto, #3fb950)",heat_cool:"var(--sct-mode-heat-cool, #d2a8ff)",fan_only:"var(--sct-mode-fan, #79c0ff)",dry:"var(--sct-mode-dry, #d29922)",off:"var(--sct-mode-off, #8b949e)"},mt={cool:"Cooling",heat:"Heat",auto:"Auto",heat_cool:"Auto",fan_only:"Fan",dry:"Dry",off:"Off"},ft={auto:"fan-auto",on:"fan",low:"fan-speed-1",medium:"fan-speed-2",high:"fan-speed-3",diffuse:"weather-windy",focus:"target"},_t={auto:"Auto",on:"On",low:"Low",medium:"Med",high:"High",diffuse:"Diffuse",focus:"Focus"};var gt;window.customCards=window.customCards||[],window.customCards.push({type:pt,name:"Simple Compact Thermostat",description:"A compact thermostat card with HVAC, preset, and fan controls."}),console.info(`%c ${pt} %c v0.2.0 `,"color: white; background: #58a6ff; font-weight: 700;","color: #58a6ff; background: white; font-weight: 700;");let vt=gt=class extends nt{constructor(){super(...arguments),this._presetOpen=!1,this._optimistic={},this._outsideClickHandler=t=>{if(!this._presetOpen)return;const e=this.shadowRoot?.querySelector(".preset-wrapper");if(!e)return;t.composedPath().includes(e)||(this._presetOpen=!1,document.removeEventListener("click",this._outsideClickHandler,!0))}}setConfig(t){if(!t)throw new Error("Invalid configuration");if(!t.entity||!t.entity.startsWith("climate."))throw new Error("You must specify a climate entity (climate.*)");if(t.outside_temp_entity&&!t.outside_temp_entity.includes("."))throw new Error("outside_temp_entity must be a valid entity id");this._config={show_preset:!0,show_fan:!0,step:1,show_sensor_data:!0,room_sensor_columns:4,sensor_excludes:["Thermostat"],...t}}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._outsideClickHandler,!0)}updated(t){if(super.updated(t),!this._config||!this.hass)return;const e=this.hass.states[this._config.entity];if(!e)return;const s=Date.now(),i=[["hvac_mode",e.state],["fan_mode",e.attributes.fan_mode],["preset_mode",e.attributes.preset_mode],["temperature",e.attributes.temperature],["target_temp_low",e.attributes.target_temp_low],["target_temp_high",e.attributes.target_temp_high]];let r=!1;const o={...this._optimistic};for(const[t,e]of i){const i=o[t];i&&((i.value===e||s-i.setAt>gt.STALE_MS)&&(delete o[t],r=!0))}r&&(this._optimistic=o)}getCardSize(){return 4}shouldUpdate(t){if(!this._config)return!1;if(t.has("_config")||t.has("_presetOpen"))return!0;const e=t.get("hass");if(!e)return!0;if(e.states[this._config.entity]!==this.hass.states[this._config.entity])return!0;const s=this._getOutsideTempEntity();if(s&&e.states[s]!==this.hass.states[s])return!0;if(!1!==this._config.show_sensor_data){const t=this.hass.states[this._config.entity];for(const s of this._discoverSensors(t))if(e.states[s.entity]!==this.hass.states[s.entity])return!0}return!1}render(){if(!this._config||!this.hass)return B;const t=this.hass.states[this._config.entity];if(!t)return I`
        <ha-card>
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;const e=this._optimistic.hvac_mode?.value??t.state;return I`
      <ha-card style="--sct-mode-color: ${ut[e]??ut.off};">
        ${this._renderHeader(t)}
        ${this._renderMainRow(t)}
        ${this._renderModeStrip(t)}
        ${this._renderControlRow(t)}
        ${this._renderRoomSensors(t)}
      </ha-card>
    `}_renderRoomSensors(t){if(!1===this._config.show_sensor_data)return B;const e=this._discoverSensors(t);if(0===e.length)return B;const s=t.attributes.active_sensors??[],i=this._unit(),r=Math.max(1,this._config.room_sensor_columns??4);return I`
      <div
        class="room-sensors"
        style="grid-template-columns: repeat(${r}, 1fr);"
      >
        ${e.map((t,e)=>{const o=this.hass.states[t.entity],n=o?parseFloat(o.state):NaN,a=this._isActiveSensor(t.name,s),c=t.short??t.name;return I`
            <div
              class="sensor-cell ${a?"active":""}"
              style=${(e+1)%r===0?"border-right: none;":""}
              title=${t.name}
            >
              <div class="sensor-temp">
                ${isNaN(n)?"—":this._round(n)}<span class="sensor-unit">°${i}</span>
              </div>
              <div class="sensor-name">${c}</div>
            </div>
          `})}
      </div>
    `}_discoverSensors(t){if(!t)return[];const e=t.attributes?.available_sensors;if(!Array.isArray(e))return[];const s=new Set((this._config.sensor_excludes??[]).map(t=>t.toLowerCase())),i=this._config.sensor_aliases??{},r=this._findRelatedTempSensors(this._config.entity),o=new Set,n=[];for(const t of e){const{name:e}=this._parseSensorItem(t);if(!e)continue;if(s.has(e.toLowerCase()))continue;const a=this._matchSensorByName(e,r,o);a&&(o.add(a),n.push({name:e,entity:a,short:i[e]}))}return n}_parseSensorItem(t){if("string"==typeof t){const e=t.match(/^(.+?)\s+\(([^)]+)\)\s*$/);return e?{name:e[1],id:e[2]}:{name:t,id:""}}return t&&"object"==typeof t?{name:String(t.name??t.Name??""),id:String(t.id??t.Id??"")}:{name:"",id:""}}_findRelatedTempSensors(t){const e=this.hass.entities,s=t=>{if(!t.startsWith("sensor."))return!1;const e=this.hass.states[t];return!!e&&("temperature"===e.attributes.device_class||t.endsWith("_temperature"))};if(e){const i=e[t],r=i?.device_id;if(r)return Object.keys(e).filter(t=>e[t].device_id===r&&s(t))}return Object.keys(this.hass.states).filter(s)}_matchSensorByName(t,e,s){const i=t.toLowerCase();for(const t of e){if(s.has(t))continue;if((this.hass.states[t]?.attributes?.friendly_name??"").toLowerCase()===i)return t}for(const t of e){if(s.has(t))continue;const e=(this.hass.states[t]?.attributes?.friendly_name??"").toLowerCase();if(e.startsWith(i+" ")||e.startsWith(i+"_"))return t}const r=i.replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"");for(const t of["_temperature","_temperature_2","_temperature_3","_temperature_4"]){const e=`sensor.${r}${t}`;if(this.hass.states[e]&&!s.has(e))return e}return null}_getOutsideTempEntity(){if(this._config.outside_temp_entity)return this._config.outside_temp_entity;const t=this.hass.entities;if(t){const e=t[this._config.entity],s=e?.device_id;if(s)for(const e of Object.keys(t))if(e.startsWith("weather.")&&t[e].device_id===s&&this.hass.states[e])return e}const e=`weather.${this._config.entity.split(".")[1]}`;return this.hass.states[e]?e:null}_getOutsideTemp(){const t=this._getOutsideTempEntity();return t?this._readTempFromEntity(t):null}_readTempFromEntity(t){const e=this.hass.states[t];if(!e)return null;if(t.startsWith("weather.")){const t=e.attributes?.temperature;if("number"==typeof t)return t;if("string"==typeof t){const e=parseFloat(t);return isNaN(e)?null:e}return null}const s=parseFloat(e.state);return isNaN(s)?null:s}_isActiveSensor(t,e){const s=t.toLowerCase();return e.some(t=>{const e=t.toLowerCase();return e===s||s.startsWith(e+" ")||e.startsWith(s+" ")})}_renderHeader(t){const e=this._optimistic.hvac_mode?.value??t.state;return I`
      <div class="header">
        <span class="dot"></span>
        <span class="header-text">HVAC</span>
        <span class="header-sep">✦</span>
        <span class="header-mode">${(mt[e]??e).toUpperCase()}</span>
      </div>
    `}_renderMainRow(t){const e=this._unit(),s=t.attributes.current_temperature,i="off"===(this._optimistic.hvac_mode?.value??t.state),r=this._getOutsideTemp(),o=t.attributes,n=this._optimistic.temperature?.value,a=this._optimistic.target_temp_low?.value,c=this._optimistic.target_temp_high?.value,l=n??o.temperature,d=a??o.target_temp_low,h=c??o.target_temp_high,p=null==l&&null!=d&&null!=h;return I`
      <div class="main-row">
        <div class="current-cell">
          <div class="micro-label">current</div>
          <div class="big-temp">
            ${null!=s?this._round(s):"—"}<span class="big-unit">°${e}</span>
          </div>
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
              ${null!=r?this._round(r):"—"}°<span class="med-unit">${e}</span>
            </div>
            <span class="corner-label">outside</span>
          </div>
          ${p?this._renderDualSetCell(d,h,e):this._renderSingleSetCell(l,e)}
        </div>
      </div>
    `}_renderSingleSetCell(t,e){return I`
      <div class="right-cell">
        <div class="med-temp set">
          ${null!=t?this._round(t):"—"}°<span class="med-unit">${e}</span>
        </div>
        <span class="corner-label">set</span>
      </div>
    `}_renderDualSetCell(t,e,s){return I`
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
    `}_renderModeStrip(t){const e=t.attributes.hvac_modes??[],s=this._config.hvac_modes,i=s?e.filter(t=>s.includes(t)):e,r=this._optimistic.hvac_mode?.value??t.state;return I`
      <div class="mode-strip">
        ${i.map((t,e)=>I`
            <button
              class="mode-cell ${t===r?"active":""}"
              style="--cell-color: ${ut[t]??ut.off}; ${e>0?"border-left: 1px solid var(--sct-border);":""}"
              @click=${()=>this._setHvacMode(t)}
            >
              ${(mt[t]??t).toUpperCase()}
            </button>
          `)}
      </div>
    `}_renderControlRow(t){const e=!1!==this._config.show_preset,s=!1!==this._config.show_fan;return e||s?I`
      <div class="control-row ${e&&s?"split":""}">
        ${e?this._renderPreset(t):I`<div></div>`}
        ${e&&s?I`<div class="v-divider"></div>`:B}
        ${s?this._renderFan(t):I`<div></div>`}
      </div>
    `:I``}_renderPreset(t){const e=t.attributes.preset_modes??[],s=this._optimistic.preset_mode?.value??t.attributes.preset_mode,i=(s??"").toLowerCase(),r=!!s&&"none"!==i&&e.some(t=>t.toLowerCase()===i),o=r?this._presetLabel(s):"Custom";return 0===e.length?I`
        <div class="control-cell">
          <div class="micro-label">preset</div>
          <div class="preset-empty">None available</div>
        </div>
      `:I`
      <div class="control-cell">
        <div class="micro-label">preset</div>
        <div class="preset-wrapper">
          <button
            class="preset-trigger ${r?"":"is-custom"}"
            @click=${()=>this._togglePreset()}
            aria-expanded=${this._presetOpen}
          >
            <span>${o}</span>
            <ha-icon
              icon="mdi:chevron-down"
              class="chevron ${this._presetOpen?"open":""}"
            ></ha-icon>
          </button>
          ${this._presetOpen?I`
            <div class="preset-popup" @click=${t=>t.stopPropagation()}>
              ${e.map((t,s)=>I`
                <button
                  class="preset-option ${t.toLowerCase()===i?"selected":""}"
                  style=${s<e.length-1?"border-bottom: 1px solid var(--sct-border);":""}
                  @click=${()=>this._selectPreset(t)}
                >
                  ${this._presetLabel(t)}
                </button>
              `)}
            </div>
          `:B}
        </div>
      </div>
    `}_renderFan(t){const e=t.attributes.fan_modes??[],s=this._optimistic.fan_mode?.value??t.attributes.fan_mode;let i=this._config.fan_modes??["auto","on"];return i=i.filter(t=>e.includes(t)),0===i.length?I`
        <div class="control-cell">
          <div class="micro-label">fan</div>
          <div class="preset-empty">No fan</div>
        </div>
      `:I`
      <div class="control-cell">
        <div class="micro-label">fan</div>
        <div class="fan-buttons">
          ${i.map(t=>{const e=s===t,i=ft[t]??"fan",r=(_t[t]??t).toUpperCase();return I`
              <button
                class="fan-btn ${e?"active":""}"
                @click=${()=>this._setFanMode(t)}
                title="Fan ${t}"
              >
                <ha-icon icon="mdi:${i}"></ha-icon>
                <span>${r}</span>
              </button>
            `})}
        </div>
      </div>
    `}_togglePreset(){this._presetOpen=!this._presetOpen,this._presetOpen?setTimeout(()=>document.addEventListener("click",this._outsideClickHandler,!0),0):document.removeEventListener("click",this._outsideClickHandler,!0)}_selectPreset(t){this._presetOpen=!1,document.removeEventListener("click",this._outsideClickHandler,!0),this._setPreset(t)}_adjustSetpoint(t){const e=this.hass.states[this._config.entity],s=this._config.step??1,i=this._getSetpoint(e);if(null==i)return;const r=+(i+t*s).toFixed(1),o=Date.now(),n=e.attributes;if(null!=n.target_temp_low&&null!=n.target_temp_high&&null==n.temperature){const e=+((this._optimistic.target_temp_low?.value??n.target_temp_low)+t*s).toFixed(1),i=+((this._optimistic.target_temp_high?.value??n.target_temp_high)+t*s).toFixed(1);this._optimistic={...this._optimistic,target_temp_low:{value:e,setAt:o},target_temp_high:{value:i,setAt:o}},this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,target_temp_low:e,target_temp_high:i})}else this._optimistic={...this._optimistic,temperature:{value:r,setAt:o}},this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,temperature:r})}_setHvacMode(t){this._optimistic={...this._optimistic,hvac_mode:{value:t,setAt:Date.now()}},this.hass.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:t})}_setPreset(t){this._optimistic={...this._optimistic,preset_mode:{value:t,setAt:Date.now()}},this.hass.callService("climate","set_preset_mode",{entity_id:this._config.entity,preset_mode:t})}_setFanMode(t){this._optimistic={...this._optimistic,fan_mode:{value:t,setAt:Date.now()}},this.hass.callService("climate","set_fan_mode",{entity_id:this._config.entity,fan_mode:t})}_getSetpoint(t){if(void 0!==this._optimistic.temperature)return this._optimistic.temperature.value;const e=t.attributes;if(null!=e.temperature)return e.temperature;const s=this._optimistic.target_temp_low?.value??e.target_temp_low,i=this._optimistic.target_temp_high?.value??e.target_temp_high;return null!=s&&null!=i?(s+i)/2:null}_unit(){return(this.hass.config.unit_system.temperature||"°F").replace("°","")}_round(t){return Math.round(t)}_presetLabel(t){return t&&"none"!==t.toLowerCase()?t.split("_").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" "):"No Preset"}};vt.STALE_MS=3e5,vt.styles=((t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new o(s,t,i)})`
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
    }
    .fan-btn {
      flex: 1;
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
      font-size: 0.55em;
      color: var(--sct-text-secondary);
      margin-left: 1px;
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
  `,t([dt({attribute:!1})],vt.prototype,"hass",void 0),t([ht()],vt.prototype,"_config",void 0),t([ht()],vt.prototype,"_presetOpen",void 0),t([ht()],vt.prototype,"_optimistic",void 0),vt=gt=t([(t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})(pt)],vt);export{vt as SimpleCompactThermostatCard};
