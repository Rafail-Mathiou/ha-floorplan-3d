var fa=globalThis,ma=fa.ShadowRoot&&(fa.ShadyCSS===void 0||fa.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,rh=Symbol(),Nd=new WeakMap,Br=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==rh)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(ma&&t===void 0){let n=e!==void 0&&e.length===1;n&&(t=Nd.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&Nd.set(e,t))}return t}toString(){return this.cssText}},kd=i=>new Br(typeof i=="string"?i:i+"",void 0,rh),De=(i,...t)=>{let e=i.length===1?i[0]:t.reduce((n,s,r)=>n+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+i[r+1],i[0]);return new Br(e,i,rh)},Ud=(i,t)=>{if(ma)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let n=document.createElement("style"),s=fa.litNonce;s!==void 0&&n.setAttribute("nonce",s),n.textContent=e.cssText,i.appendChild(n)}},oh=ma?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let n of t.cssRules)e+=n.cssText;return kd(e)})(i):i;var{is:vg,defineProperty:yg,getOwnPropertyDescriptor:bg,getOwnPropertyNames:Mg,getOwnPropertySymbols:Sg,getPrototypeOf:wg}=Object,Ti=globalThis,Od=Ti.trustedTypes,Tg=Od?Od.emptyScript:"",Eg=Ti.reactiveElementPolyfillSupport,zr=(i,t)=>i,ah={toAttribute(i,t){switch(t){case Boolean:i=i?Tg:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},Bd=(i,t)=>!vg(i,t),Fd={attribute:!0,type:String,converter:ah,reflect:!1,useDefault:!1,hasChanged:Bd};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Ti.litPropertyMetadata??(Ti.litPropertyMetadata=new WeakMap);var ri=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Fd){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let n=Symbol(),s=this.getPropertyDescriptor(t,n,e);s!==void 0&&yg(this.prototype,t,s)}}static getPropertyDescriptor(t,e,n){let{get:s,set:r}=bg(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:s,set(o){let a=s?.call(this);r?.call(this,o),this.requestUpdate(t,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Fd}static _$Ei(){if(this.hasOwnProperty(zr("elementProperties")))return;let t=wg(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(zr("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(zr("properties"))){let e=this.properties,n=[...Mg(e),...Sg(e)];for(let s of n)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[n,s]of e)this.elementProperties.set(n,s)}this._$Eh=new Map;for(let[e,n]of this.elementProperties){let s=this._$Eu(e,n);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let n=new Set(t.flat(1/0).reverse());for(let s of n)e.unshift(oh(s))}else t!==void 0&&e.push(oh(t));return e}static _$Eu(t,e){let n=e.attribute;return n===!1?void 0:typeof n=="string"?n:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let n of e.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ud(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,n){this._$AK(t,n)}_$ET(t,e){let n=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,n);if(s!==void 0&&n.reflect===!0){let r=(n.converter?.toAttribute!==void 0?n.converter:ah).toAttribute(e,n.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){let n=this.constructor,s=n._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let r=n.getPropertyOptions(s),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:ah;this._$Em=s;let a=o.fromAttribute(e,r.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,n,s=!1,r){if(t!==void 0){let o=this.constructor;if(s===!1&&(r=this[t]),n??(n=o.getPropertyOptions(t)),!((n.hasChanged??Bd)(r,e)||n.useDefault&&n.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,n))))return;this.C(t,e,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:n,reflect:s,wrapped:r},o){n&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||n||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let n=this.constructor.elementProperties;if(n.size>0)for(let[s,r]of n){let{wrapped:o}=r,a=this[s];o!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,r,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(e)):this._$EM()}catch(n){throw t=!1,this._$EM(),n}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};ri.elementStyles=[],ri.shadowRootOptions={mode:"open"},ri[zr("elementProperties")]=new Map,ri[zr("finalized")]=new Map,Eg?.({ReactiveElement:ri}),(Ti.reactiveElementVersions??(Ti.reactiveElementVersions=[])).push("2.1.2");var Hr=globalThis,zd=i=>i,ga=Hr.trustedTypes,$d=ga?ga.createPolicy("lit-html",{createHTML:i=>i}):void 0,Yd="$lit$",Ei=`lit$${Math.random().toFixed(9).slice(2)}$`,qd="?"+Ei,Ag=`<${qd}>`,is=document,Vr=()=>is.createComment(""),Gr=i=>i===null||typeof i!="object"&&typeof i!="function",fh=Array.isArray,Cg=i=>fh(i)||typeof i?.[Symbol.iterator]=="function",lh=`[ 	
\f\r]`,$r=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Hd=/-->/g,Vd=/>/g,es=RegExp(`>|${lh}(?:([^\\s"'>=/]+)(${lh}*=${lh}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Gd=/'/g,Wd=/"/g,Kd=/^(?:script|style|textarea|title)$/i,mh=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),q=mh(1),Y=mh(2),_S=mh(3),oi=Symbol.for("lit-noChange"),rt=Symbol.for("lit-nothing"),Xd=new WeakMap,ns=is.createTreeWalker(is,129);function Zd(i,t){if(!fh(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return $d!==void 0?$d.createHTML(t):t}var Rg=(i,t)=>{let e=i.length-1,n=[],s,r=t===2?"<svg>":t===3?"<math>":"",o=$r;for(let a=0;a<e;a++){let l=i[a],h,u,p=-1,c=0;for(;c<l.length&&(o.lastIndex=c,u=o.exec(l),u!==null);)c=o.lastIndex,o===$r?u[1]==="!--"?o=Hd:u[1]!==void 0?o=Vd:u[2]!==void 0?(Kd.test(u[2])&&(s=RegExp("</"+u[2],"g")),o=es):u[3]!==void 0&&(o=es):o===es?u[0]===">"?(o=s??$r,p=-1):u[1]===void 0?p=-2:(p=o.lastIndex-u[2].length,h=u[1],o=u[3]===void 0?es:u[3]==='"'?Wd:Gd):o===Wd||o===Gd?o=es:o===Hd||o===Vd?o=$r:(o=es,s=void 0);let d=o===es&&i[a+1].startsWith("/>")?" ":"";r+=o===$r?l+Ag:p>=0?(n.push(h),l.slice(0,p)+Yd+l.slice(p)+Ei+d):l+Ei+(p===-2?a:d)}return[Zd(i,r+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Wr=class i{constructor({strings:t,_$litType$:e},n){let s;this.parts=[];let r=0,o=0,a=t.length-1,l=this.parts,[h,u]=Rg(t,e);if(this.el=i.createElement(h,n),ns.currentNode=this.el.content,e===2||e===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=ns.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let p of s.getAttributeNames())if(p.endsWith(Yd)){let c=u[o++],d=s.getAttribute(p).split(Ei),f=/([.?@])?(.*)/.exec(c);l.push({type:1,index:r,name:f[2],strings:d,ctor:f[1]==="."?hh:f[1]==="?"?uh:f[1]==="@"?dh:Ns}),s.removeAttribute(p)}else p.startsWith(Ei)&&(l.push({type:6,index:r}),s.removeAttribute(p));if(Kd.test(s.tagName)){let p=s.textContent.split(Ei),c=p.length-1;if(c>0){s.textContent=ga?ga.emptyScript:"";for(let d=0;d<c;d++)s.append(p[d],Vr()),ns.nextNode(),l.push({type:2,index:++r});s.append(p[c],Vr())}}}else if(s.nodeType===8)if(s.data===qd)l.push({type:2,index:r});else{let p=-1;for(;(p=s.data.indexOf(Ei,p+1))!==-1;)l.push({type:7,index:r}),p+=Ei.length-1}r++}}static createElement(t,e){let n=is.createElement("template");return n.innerHTML=t,n}};function Ls(i,t,e=i,n){if(t===oi)return t;let s=n!==void 0?e._$Co?.[n]:e._$Cl,r=Gr(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(i),s._$AT(i,e,n)),n!==void 0?(e._$Co??(e._$Co=[]))[n]=s:e._$Cl=s),s!==void 0&&(t=Ls(i,s._$AS(i,t.values),s,n)),t}var ch=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:n}=this._$AD,s=(t?.creationScope??is).importNode(e,!0);ns.currentNode=s;let r=ns.nextNode(),o=0,a=0,l=n[0];for(;l!==void 0;){if(o===l.index){let h;l.type===2?h=new Xr(r,r.nextSibling,this,t):l.type===1?h=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(h=new ph(r,this,t)),this._$AV.push(h),l=n[++a]}o!==l?.index&&(r=ns.nextNode(),o++)}return ns.currentNode=is,s}p(t){let e=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,e),e+=n.strings.length-2):n._$AI(t[e])),e++}},Xr=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,n,s){this.type=2,this._$AH=rt,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Ls(this,t,e),Gr(t)?t===rt||t==null||t===""?(this._$AH!==rt&&this._$AR(),this._$AH=rt):t!==this._$AH&&t!==oi&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Cg(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==rt&&Gr(this._$AH)?this._$AA.nextSibling.data=t:this.T(is.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Wr.createElement(Zd(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(e);else{let r=new ch(s,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(t){let e=Xd.get(t.strings);return e===void 0&&Xd.set(t.strings,e=new Wr(t)),e}k(t){fh(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,n,s=0;for(let r of t)s===e.length?e.push(n=new i(this.O(Vr()),this.O(Vr()),this,this.options)):n=e[s],n._$AI(r),s++;s<e.length&&(this._$AR(n&&n._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let n=zd(t).nextSibling;zd(t).remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Ns=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,n,s,r){this.type=1,this._$AH=rt,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=rt}_$AI(t,e=this,n,s){let r=this.strings,o=!1;if(r===void 0)t=Ls(this,t,e,0),o=!Gr(t)||t!==this._$AH&&t!==oi,o&&(this._$AH=t);else{let a=t,l,h;for(t=r[0],l=0;l<r.length-1;l++)h=Ls(this,a[n+l],e,l),h===oi&&(h=this._$AH[l]),o||(o=!Gr(h)||h!==this._$AH[l]),h===rt?t=rt:t!==rt&&(t+=(h??"")+r[l+1]),this._$AH[l]=h}o&&!s&&this.j(t)}j(t){t===rt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},hh=class extends Ns{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===rt?void 0:t}},uh=class extends Ns{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==rt)}},dh=class extends Ns{constructor(t,e,n,s,r){super(t,e,n,s,r),this.type=5}_$AI(t,e=this){if((t=Ls(this,t,e,0)??rt)===oi)return;let n=this._$AH,s=t===rt&&n!==rt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,r=t!==rt&&(n===rt||s);s&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ph=class{constructor(t,e,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Ls(this,t)}};var Pg=Hr.litHtmlPolyfillSupport;Pg?.(Wr,Xr),(Hr.litHtmlVersions??(Hr.litHtmlVersions=[])).push("3.3.3");var jd=(i,t,e)=>{let n=e?.renderBefore??t,s=n._$litPart$;if(s===void 0){let r=e?.renderBefore??null;n._$litPart$=s=new Xr(t.insertBefore(Vr(),r),r,void 0,e??{})}return s._$AI(i),s};var Yr=globalThis,Pe=class extends ri{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=jd(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return oi}};Pe._$litElement$=!0,Pe.finalized=!0,Yr.litElementHydrateSupport?.({LitElement:Pe});var Ig=Yr.litElementPolyfillSupport;Ig?.({LitElement:Pe});(Yr.litElementVersions??(Yr.litElementVersions=[])).push("4.2.2");async function ss(i){let t=await i.callWS({type:"floorplan_3d/get"});return{...t,furniture:t.furniture??[],floors:t.floors??[]}}async function Jd(i,t,e){return(await i.callWS({type:"floorplan_3d/save",revision:e,plan:{settings:t.settings,floors:t.floors??[],rooms:t.rooms,openings:t.openings,items:t.items,furniture:t.furniture}})).revision}async function _a(i,t){return i.connection.subscribeMessage(e=>t(e.revision),{type:"floorplan_3d/subscribe"})}var Qd=15*1024*1024,qr=class extends Error{};async function tp(i,t){let e=new FormData;e.append("file",t);let n=await i.fetchWithAuth("/api/image/upload",{method:"POST",body:e});if(n.status===404||n.status===405)throw new qr;if(!n.ok)throw new Error(`HTTP ${n.status}`);let{id:s}=await n.json();if(typeof s!="string"||!/^[0-9a-f]{8,64}$/i.test(s))throw new Error("Unexpected answer");return`/api/image/serve/${s}/original`}function ep(i){if(i&&typeof i=="object"&&"code"in i)return String(i.code)}function rs(i){return i&&typeof i=="object"&&"message"in i?String(i.message):String(i)}var np={version:1,revision:1,settings:{wall_height:2.5,wall_thickness:.12,grid:.1,color_mode:"temperature",temp_scale:{cold:17,ok_low:19.5,ok_high:22.5,hot:25},background:null},rooms:[{id:"r_living",name:"Living room",points:[[0,0],[6.2,0],[6.2,5],[0,5]],area_id:null,temp_entity:"sensor.living_room_temperature",humidity_entity:"sensor.living_room_humidity",floor_color:null},{id:"r_kitchen",name:"Kitchen",points:[[6.2,0],[9.6,0],[9.6,3.4],[6.2,3.4]],area_id:null,temp_entity:"sensor.kitchen_temperature",humidity_entity:null,floor_color:null},{id:"r_hall",name:"Hall",points:[[6.2,3.4],[9.6,3.4],[9.6,6.6],[6.2,6.6]],area_id:null,temp_entity:null,humidity_entity:null,floor_color:null},{id:"r_bedroom",name:"Bedroom",points:[[9.6,0],[13.6,0],[13.6,4.6],[9.6,4.6]],area_id:null,temp_entity:"sensor.bedroom_temperature",humidity_entity:"sensor.bedroom_humidity",floor_color:null},{id:"r_bath",name:"Bathroom",points:[[9.6,4.6],[13.6,4.6],[13.6,6.6],[9.6,6.6]],area_id:null,temp_entity:"sensor.bathroom_temperature",humidity_entity:"sensor.bathroom_humidity",floor_color:null},{id:"r_office",name:"Office",points:[[0,5],[4.2,5],[4.2,8.2],[0,8.2]],area_id:null,temp_entity:"climate.office",humidity_entity:null,floor_color:null},{id:"r_wc",name:"WC",points:[[4.2,5],[6.2,5],[6.2,6.6],[4.2,6.6]],area_id:null,temp_entity:"sensor.wc_temperature",humidity_entity:null,floor_color:null}],openings:[{id:"o_front",type:"door",room_ids:["r_hall"],wall:{a:[7.4,6.6],b:[8.4,6.6]},entity_id:"binary_sensor.front_door",exterior:!0,hinge:"left"},{id:"o_living_hall",type:"opening",room_ids:["r_living","r_hall"],wall:{a:[6.2,3.6],b:[6.2,4.7]},entity_id:null,exterior:!1,hinge:"left"},{id:"o_kitchen",type:"door",room_ids:["r_kitchen","r_hall"],wall:{a:[7.2,3.4],b:[8.1,3.4]},entity_id:null,exterior:!1,hinge:"left"},{id:"o_bedroom",type:"door",room_ids:["r_bedroom","r_hall"],wall:{a:[9.6,3.6],b:[9.6,4.5]},entity_id:"binary_sensor.bedroom_door",exterior:!1,hinge:"left"},{id:"o_bath",type:"door",room_ids:["r_bath","r_hall"],wall:{a:[9.6,5.3],b:[9.6,6.1]},entity_id:null,exterior:!1,hinge:"right"},{id:"o_wc",type:"door",room_ids:["r_wc","r_hall"],wall:{a:[6.2,5.5],b:[6.2,6.3]},entity_id:null,exterior:!1,hinge:"left"},{id:"o_office",type:"door",room_ids:["r_office","r_living"],wall:{a:[1.2,5],b:[2.1,5]},entity_id:null,exterior:!1,hinge:"left"},{id:"o_w_living_side",type:"window",room_ids:["r_living"],wall:{a:[0,1],b:[0,2.6]},entity_id:"binary_sensor.living_room_window",exterior:!0,hinge:"left"},{id:"o_w_living_top",type:"window",room_ids:["r_living"],wall:{a:[1.8,0],b:[4.2,0]},entity_id:null,exterior:!0,hinge:"left"},{id:"o_w_kitchen",type:"window",room_ids:["r_kitchen"],wall:{a:[7,0],b:[8.4,0]},entity_id:"binary_sensor.kitchen_window",exterior:!0,hinge:"left"},{id:"o_w_bedroom",type:"window",room_ids:["r_bedroom"],wall:{a:[13.6,1.4],b:[13.6,2.8]},entity_id:"binary_sensor.bedroom_window",exterior:!0,hinge:"left"},{id:"o_w_bath",type:"window",room_ids:["r_bath"],wall:{a:[11,6.6],b:[11.9,6.6]},entity_id:null,exterior:!0,hinge:"left"},{id:"o_w_office",type:"window",room_ids:["r_office"],wall:{a:[0,6],b:[0,7.2]},entity_id:"binary_sensor.office_window",exterior:!0,hinge:"left"},{id:"o_w_office_bottom",type:"window",room_ids:["r_office"],wall:{a:[1.4,8.2],b:[2.8,8.2]},entity_id:null,exterior:!0,hinge:"left"}],items:[{id:"i_rad_living",entity_id:"climate.living_room",kind:"auto",pos:[.15,1.8],rotation:0,height:.2,room_id:"r_living",label:null},{id:"i_rad_office",entity_id:"climate.office",kind:"auto",pos:[.15,6.6],rotation:0,height:.2,room_id:"r_office",label:null},{id:"i_rad_bedroom",entity_id:"climate.bedroom",kind:"auto",pos:[12.4,4.45],rotation:0,height:.2,room_id:"r_bedroom",label:null},{id:"i_rad_bath",entity_id:"climate.bathroom",kind:"auto",pos:[13.45,5.6],rotation:0,height:.6,room_id:"r_bath",label:"Towel radiator"},{id:"i_floor_lamp",entity_id:"light.floor_lamp",kind:"auto",pos:[.5,4.5],rotation:0,height:1.6,room_id:"r_living",label:null},{id:"i_kitchen_light",entity_id:"light.kitchen_pendant",kind:"auto",pos:[7.9,2.2],rotation:0,height:2,room_id:"r_kitchen",label:null},{id:"i_bedside",entity_id:"light.bedside_lamp",kind:"auto",pos:[12.85,.35],rotation:0,height:.6,room_id:"r_bedroom",label:null},{id:"i_tv",entity_id:"media_player.living_room_tv",kind:"tv",pos:[6.05,2.5],rotation:0,height:1,room_id:"r_living",label:null},{id:"i_speaker",entity_id:"media_player.kitchen_speaker",kind:"auto",pos:[9.35,1.2],rotation:0,height:.9,room_id:"r_kitchen",label:null},{id:"i_vacuum",entity_id:"vacuum.robot_vacuum",kind:"auto",pos:[4.6,4.3],rotation:0,height:0,room_id:"r_living",label:null},{id:"i_motion",entity_id:"binary_sensor.hall_motion",kind:"auto",pos:[8.9,4.2],rotation:0,height:2.4,room_id:"r_hall",label:null},{id:"i_co2",entity_id:"sensor.bedroom_co2",kind:"auto",pos:[13.35,3.6],rotation:0,height:1,room_id:"r_bedroom",label:"Air quality"}],furniture:[{id:"f_sofa",type:"sofa",pos:[2.9,2.5],size:[2.4,.95],rotation:-90,label:null},{id:"f_rug",type:"rug",pos:[4.1,2.5],size:[1.8,2.4],rotation:0,label:null},{id:"f_coffee",type:"coffee_table",pos:[4.1,2.5],size:[1.1,.6],rotation:90,label:null},{id:"f_tv_board",type:"tv_board",pos:[5.92,2.5],size:[1.8,.45],rotation:90,label:null},{id:"f_armchair",type:"armchair",pos:[4.3,.85],size:[.85,.85],rotation:180,label:null},{id:"f_plant",type:"plant",pos:[.45,.45],size:[.45,.45],rotation:0,label:null},{id:"f_shelf_living",type:"shelf",pos:[2.6,4.75],size:[1.6,.35],rotation:180,label:null},{id:"f_kitchen",type:"kitchen",pos:[7.4,.33],size:[2.4,.6],rotation:0,label:null},{id:"f_fridge",type:"fridge",pos:[9.2,.36],size:[.6,.65],rotation:0,label:null},{id:"f_table",type:"table",pos:[7.9,2.2],size:[1.2,.8],rotation:0,label:null},{id:"f_chair_1",type:"chair",pos:[7.55,1.6],size:[.45,.5],rotation:0,label:null},{id:"f_chair_2",type:"chair",pos:[8.25,1.6],size:[.45,.5],rotation:0,label:null},{id:"f_chair_3",type:"chair",pos:[7.55,2.8],size:[.45,.5],rotation:180,label:null},{id:"f_chair_4",type:"chair",pos:[8.25,2.8],size:[.45,.5],rotation:180,label:null},{id:"f_bed",type:"bed",pos:[11.6,1.1],size:[1.8,2],rotation:0,label:null},{id:"f_wardrobe",type:"wardrobe",pos:[9.95,1.4],size:[2,.6],rotation:-90,label:null},{id:"f_bathtub",type:"bathtub",pos:[12.65,6.15],size:[1.7,.75],rotation:180,label:null},{id:"f_sink_bath",type:"sink",pos:[10.5,4.85],size:[.6,.45],rotation:0,label:null},{id:"f_toilet_bath",type:"toilet",pos:[11.4,4.95],size:[.38,.65],rotation:0,label:null},{id:"f_desk",type:"desk",pos:[2.1,7.8],size:[1.6,.7],rotation:180,label:null},{id:"f_office_chair",type:"chair",pos:[2.1,7.15],size:[.5,.5],rotation:180,label:null},{id:"f_shelf_office",type:"shelf",pos:[4,6.6],size:[1.2,.35],rotation:90,label:null},{id:"f_toilet",type:"toilet",pos:[4.55,5.8],size:[.38,.65],rotation:-90,label:null},{id:"f_sink_wc",type:"sink",pos:[5.3,5.25],size:[.5,.4],rotation:0,label:null},{id:"f_plant_hall",type:"plant",pos:[9.2,6.2],size:[.45,.45],rotation:0,label:null}]};var Lg={humidity:60,humidity_alert:70,co2:1e3,co2_alert:1400},ai=i=>({...Lg,...i.settings.thresholds}),xa=(i,t)=>i.keep_wall??t==="tv",gh=i=>/towel|handtuch/i.test(`${i.entity_id} ${i.label??""}`)||i.height>=.5,ks=i=>i.width??(gh(i)?.5:.9);function ip(i,t){if(t){if(i.rooms.some(e=>e.id===t))return"room";if(i.items.some(e=>e.id===t))return"item";if(i.openings.some(e=>e.id===t))return"opening";if(i.furniture.some(e=>e.id===t))return"furniture"}}function Kn(i){return Math.abs(Kr(i))}function Kr(i){let t=0;for(let e=0;e<i.length;e++){let[n,s]=i[e],[r,o]=i[(e+1)%i.length];t+=n*o-r*s}return t/2}function Us(i){return i.rooms.reduce((t,e)=>t+Kn(e.points),0)}function _n(i){return`${i}_${Math.random().toString(36).slice(2,10)}`}function va(i,t){return{id:_n("r"),name:i,points:t,area_id:null,temp_entity:null,humidity_entity:null,floor_color:null}}function nn(i,t){if(i.kind!=="auto")return i.kind;switch(i.entity_id.split(".")[0]){case"climate":return"radiator";case"light":case"switch":return"light";case"media_player":return/(^|_)tv(_|$)/.test(i.entity_id)?"tv":"speaker";case"vacuum":return"vacuum";case"binary_sensor":return t&&["motion","occupancy","presence"].includes(t)?"motion":"generic";case"sensor":return"sensor";default:return"generic"}}var Ft=i=>Math.round(i*1e3)/1e3,_h=(i,t)=>Ft(Math.round(i/t)*t);function li(i){let t=1/0,e=1/0,n=-1/0,s=-1/0;for(let[r,o]of i)t=Math.min(t,r),e=Math.min(e,o),n=Math.max(n,r),s=Math.max(s,o);return{minX:t,minY:e,maxX:n,maxY:s}}function ci(i){if(i.length)return li(i.flatMap(t=>t.points))}function Os(i,t){let e=Math.min(i[0],t[0]),n=Math.max(i[0],t[0]),s=Math.min(i[1],t[1]),r=Math.max(i[1],t[1]);return[[e,s],[n,s],[n,r],[e,r]]}function Zr(i){if(i.length!==4)return!1;for(let t=0;t<4;t++){let[e,n]=i[t],[s,r]=i[(t+1)%4];if(Math.abs(e-s)>1e-6&&Math.abs(n-r)>1e-6)return!1}return!0}function Ke([i,t],e){let n=!1;for(let s=0,r=e.length-1;s<e.length;r=s++){let[o,a]=e[s],[l,h]=e[r];a>t!=h>t&&i<(l-o)*(t-a)/(h-a)+o&&(n=!n)}return n}function os(i){let t=Kr(i),e=0,n=0;for(let l=0;l<i.length;l++){let[h,u]=i[l],[p,c]=i[(l+1)%i.length],d=h*c-p*u;e+=(h+p)*d,n+=(u+c)*d}let s=t?[e/(6*t),n/(6*t)]:i[0];if(Ke(s,i))return s;let r=[];for(let l=0;l<i.length;l++){let[h,u]=i[l],[p,c]=i[(l+1)%i.length];u>s[1]!=c>s[1]&&r.push(h+(s[1]-u)*(p-h)/(c-u))}r.sort((l,h)=>l-h);let o=s,a=0;for(let l=0;l+1<r.length;l+=2)r[l+1]-r[l]>a&&(a=r[l+1]-r[l],o=[(r[l]+r[l+1])/2,s[1]]);return o}function Ln(i,t,e){let n=e[0]-t[0],s=e[1]-t[1],r=n*n+s*s||1,o=Math.max(0,Math.min(1,((i[0]-t[0])*n+(i[1]-t[1])*s)/r)),a=[t[0]+o*n,t[1]+o*s];return{point:a,t:o,dist:Math.hypot(i[0]-a[0],i[1]-a[1])}}function Nn(i,t){return Math.hypot(t[0]-i[0],t[1]-i[1])}function sp(i,t,e,n,s){let r=[],o=[];for(let a of i)if(a.id!==t)for(let[l,h]of a.points)r.push(l),o.push(h);return{grid:e,radius:n,xs:r,ys:o,enabled:s}}function rp(i,t,e){let n,s=e;for(let r of i){let o=Math.abs(r-t);o<=s&&(s=o,n=r)}return n}function ya(i,t,e){if(!e.enabled)return{value:Ft(i)};let n=rp(t==="x"?e.xs:e.ys,i,e.radius);return n!==void 0?{value:n,guide:n}:{value:_h(i,e.grid)}}function Fs(i,t){let e=ya(i[0],"x",t),n=ya(i[1],"y",t);return{point:[e.value,n.value],guideX:e.guide,guideY:n.guide}}function op(i,t,e,n){if(!n.enabled)return{dx:Ft(t),dy:Ft(e)};let s=(a,l,h)=>{let u,p=n.radius;for(let d of i){let f=d[l]+a,_=rp(h,f,p);_!==void 0&&(p=Math.abs(_-f),u={delta:_-d[l],guide:_})}if(u)return u;let c=i[0][l];return{delta:_h(c+a,n.grid)-c,guide:void 0}},r=s(t,0,n.xs),o=s(e,1,n.ys);return{dx:Ft(r.delta),dy:Ft(o.delta),guideX:r.guide,guideY:o.guide}}function Bs(i,t,e){return i.map(([n,s])=>[Ft(n+t),Ft(s+e)])}function ap(i,t,e,n,s){let r=(t+1)%i.length,o=i[t],a=i[r],l=i.map(d=>[...d]);if(Math.abs(o[1]-a[1])<1e-6){let d=ya(o[1]+(e[1]-n[1]),"y",s);return l[t][1]=d.value,l[r][1]=d.value,{points:l,guideY:d.guide}}if(Math.abs(o[0]-a[0])<1e-6){let d=ya(o[0]+(e[0]-n[0]),"x",s);return l[t][0]=d.value,l[r][0]=d.value,{points:l,guideX:d.guide}}let h=Nn(o,a)||1,u=-(a[1]-o[1])/h,p=(a[0]-o[0])/h,c=(e[0]-n[0])*u+(e[1]-n[1])*p;return s.enabled&&(c=_h(c,s.grid)),l[t]=[Ft(o[0]+u*c),Ft(o[1]+p*c)],l[r]=[Ft(a[0]+u*c),Ft(a[1]+p*c)],{points:l}}function xh(i,t,e){let n=li(i),s=n.maxX-n.minX||1,r=n.maxY-n.minY||1;return i.map(([o,a])=>[Ft(n.minX+(o-n.minX)*t/s),Ft(n.minY+(a-n.minY)*e/r)])}function vh(i,t,e){let n=li(i);return Bs(i,t-n.minX,e-n.minY)}function lp(i){return i.filter((t,e)=>{let n=i[(e+1)%i.length];return Math.abs(t[0]-n[0])>1e-6||Math.abs(t[1]-n[1])>1e-6})}function Ng(i,t,e){let n=e*Math.PI/180,s=Math.cos(n),r=Math.sin(n),[o,a]=[t[0]/2,t[1]/2];return[[-o,-a],[o,-a],[o,a],[-o,a]].map(([l,h])=>[i[0]+l*s-h*r,i[1]+l*r+h*s])}function cp(i,t,e,n,s,r){let o=s/2,a=[i[0],i[1]],l=[];for(let h=0;h<2;h++){let u=Ng(a,t,e),p;for(let c of n){let d=c.points;for(let f=0;f<d.length;f++){let _=d[f],g=d[(f+1)%d.length],m=Math.hypot(g[0]-_[0],g[1]-_[1]);if(m<.05)continue;let T=(g[0]-_[0])/m,b=(g[1]-_[1])/m,v=-b,M=T;if(l.some(([C,P])=>Math.abs(C*v+P*M)>.9))continue;(a[0]-_[0])*v+(a[1]-_[1])*M<0&&([v,M]=[-v,-M]);let A=u.map(C=>(C[0]-_[0])*T+(C[1]-_[1])*b);if(Math.max(...A)<.05||Math.min(...A)>m-.05)continue;let x=Math.min(...u.map(C=>(C[0]-_[0])*v+(C[1]-_[1])*M)),E=o-x;Math.abs(E)<=r&&(!p||Math.abs(E)<Math.abs(p.shift))&&(p={shift:E,nx:v,ny:M})}}if(!p)break;a=[Ft(a[0]+p.nx*p.shift),Ft(a[1]+p.ny*p.shift)],l.push([p.nx,p.ny])}return a}var as=.7,jr=.09;function ls(i,t){let e;for(let n of i){let s=n.points;for(let r=0;r<s.length;r++){let o=s[r],a=s[(r+1)%s.length],l=Ln(t,o,a);if(!e||l.dist<e.dist){let h=Math.hypot(a[0]-o[0],a[1]-o[1])||1,u=(a[0]-o[0])/h,p=(a[1]-o[1])/h,c=-p,d=u;(t[0]-l.point[0])*c+(t[1]-l.point[1])*d<0&&(c=-c,d=-d),e={angle:Math.atan2(-p,u),foot:l.point,nx:c,ny:d,dist:l.dist}}}}return e}var sn=i=>i.floors??[];function Zn(i){return[...sn(i)].sort((t,e)=>t.level-e.level)}function jn(i,t){let e=sn(i);return e.length?t.floor&&e.some(n=>n.id===t.floor)?t.floor:e[0].id:null}function Jr(i,t){let e=Zn(i);return e.length?t&&e.some(n=>n.id===t)?t:(e.find(n=>n.level===0)??e[0]).id:null}function ba(i,t){let e=sn(i).find(s=>s.id===t);if(!e)return i;let n=s=>jn(i,s)===e.id;return{...i,settings:{...i.settings,background:e.background},rooms:i.rooms.filter(n),openings:i.openings.filter(n),items:i.items.filter(n),furniture:i.furniture.filter(n)}}function hp(i,t,e){let n=sn(i).find(o=>o.id===t);if(!n||e===i)return e;let s=o=>jn(i,o)!==n.id,r=o=>o.floor===n.id?o:{...o,floor:n.id};return{settings:{...e.settings,background:i.settings.background},floors:sn(i).map(o=>o.id===n.id?{...o,background:e.settings.background}:o),rooms:[...i.rooms.filter(s),...e.rooms.map(r)],openings:[...i.openings.filter(s),...e.openings.map(r)],items:[...i.items.filter(s),...e.items.map(r)],furniture:[...i.furniture.filter(s),...e.furniture.map(r)]}}function up(i,t){let e=new Map(i.rooms.map(s=>[s.id,s.floor??t])),n=s=>(s?e.get(s):void 0)??t;return{...i,items:i.items.map(s=>({...s,floor:n(s.room_id)})),openings:i.openings.map(s=>({...s,floor:n(s.room_ids[0])})),furniture:i.furniture.map(s=>({...s,floor:n(i.rooms.find(r=>Ke(s.pos,r.points))?.id)}))}}function dp(i,t,e){let n=i;if(!sn(i).length){let o={id:_n("fl"),name:e,level:0,floor_id:null,background:i.settings.background};n=up({...i,floors:[o],settings:{...i.settings,background:null},rooms:i.rooms.map(a=>({...a,floor:o.id}))},o.id)}let s=sn(n),r={id:_n("fl"),name:t,level:Math.max(...s.map(o=>o.level))+1,floor_id:null,background:null};return{plan:{...n,floors:[...s,r]},id:r.id}}function pp(i,t,e){return{...i,floors:sn(i).map(n=>n.id===t?{...n,...e}:n)}}function fp(i,t){let e=o=>jn(i,o)!==t,n=sn(i).filter(o=>o.id!==t),s={...i,floors:n,rooms:i.rooms.filter(e),openings:i.openings.filter(e),items:i.items.filter(e),furniture:i.furniture.filter(e)};if(n.length!==1)return s;let r=o=>({...o,floor:null});return{settings:{...i.settings,background:n[0].background},floors:[],rooms:s.rooms.map(r),openings:s.openings.map(r),items:s.items.map(r),furniture:s.furniture.map(r)}}function mp(i,t,e){let n=new Set(sn(i).map(u=>u.floor_id).filter(Boolean)),s=t.filter(u=>!n.has(u.floor_id));if(!s.length)return i;let r=[...s].sort((u,p)=>(u.level??0)-(p.level??0)).map((u,p)=>({id:_n("fl"),name:u.name,level:u.level??p,floor_id:u.floor_id,background:null}));if(sn(i).length)return{...i,floors:[...sn(i),...r]};let o=new Map(r.map(u=>[u.floor_id,u.id])),a=r.find(u=>u.level===0)??r[0],l=r.map(u=>u===a?{...u,background:i.settings.background}:u),h=i.rooms.map(u=>({...u,floor:u.area_id&&o.get(e(u.area_id)??"")||a.id}));return up({...i,floors:l,settings:{...i.settings,background:null},rooms:h},a.id)}function gp(i,t){return t?sn(i).find(e=>e.floor_id===t)?.id:void 0}var yh={title:"Floorplan 3D",modeView:"3D",modePlan:"Plan",modes:"View",conflict:"The plan was saved on another device in the meantime. Your changes here will be lost when you reload.",reload:"Reload",remoteChanged:"The plan was changed on another device. Reload to see it (your unsaved changes here are discarded) or keep editing.",keepEditing:"Keep editing",overwrite:"Save my version",retry:"Try again",loadFailed:i=>`Could not load the plan: ${i}`,saveFailed:i=>`Saving failed: ${i}`,undo:"Undo",undoKey:"Undo (Ctrl+Z)",redo:"Redo",redoKey:"Redo (Ctrl+Y)",saving:"Saving …",unsaved:"Not saved",saved:"Saved",save:"Save",saveKey:"Save (Ctrl+S)",loading:"Loading plan …",unnamed:"Unnamed",device:"Device",doorWindow:"Door / window",furniture:"Furniture",home:"Home",homeArea:i=>`Home, ${i} m²`,emptyPlan:"No floorplan yet. Draw your rooms under “Plan”.",noWebgl:"This device doesn’t support WebGL 2, so the live map is shown in 2D.",dismiss:"Dismiss",viewControls:"Camera",angled:"Angled",top:"Top",lowWalls:"Low walls",lowWallsTitle:"Lower the walls to look into the rooms",autoWalls:"Auto walls",autoWallsTitle:"Lower the walls between the camera and the rooms automatically (saved on this device)",thisDevice:"On this device",tapToggle:"A tap on a lamp switches it on or off. Hold it to open its dialog.",animations:"Animations",animationsTitle:"Heat shimmer, air flow, motion and sound (saved on this device)",legendOpen:"What does it mean?",close:"Close",legend:"Legend",legendColors:"Room colour shows",colorModes:{temperature:"Temperature",humidity:"Humidity",co2:"CO₂",heating:"Heating",none:"Nothing"},dry:"Dry",humid:"Humid",veryHumid:"Very humid",belowPercent:i=>`below ${i} %`,rangePercent:(i,t)=>`${i}–${t} %`,fromPercent:i=>`from ${i} %`,airGood:"Good air",airVentilate:"Open a window",airUrgent:"Ventilate now",belowPpm:i=>`below ${i} ppm`,fromPpm:i=>`from ${i} ppm`,heatOn:"Heating",heatOnDesc:"a radiator in the room is heating",heatIdle:"Target reached",heatIdleDesc:"thermostat on, not heating right now",heatOff:"Off",heatOffDesc:"all thermostats in the room are off",noSensorFor:{temperature:"no temperature sensor assigned to the room",humidity:"no humidity sensor assigned to the room",co2:"no CO₂ sensor (ppm) placed in the room",heating:"no thermostat placed in the room"},legendSymbols:"Room symbols",legendDevices:"Devices",legendDevicesText:"Radiators glow orange and shimmer while heating. Lamps light up when on. Doors and windows follow their contact sensor, fresh air drifts through open windows, open exterior doors turn red. Motion sensors pulse, speakers send sound waves. Tap a device or door for its dialog. Tap a room to zoom in and see everything in it (or to show only that room, see planner settings), tap beside the plan to see everything again.",tooCold:"Too cold",tooColdDesc:(i,t)=>`below ${i} °C, deep blue below ${t} °C`,comfortable:"Comfortable",rangeDesc:(i,t)=>`${i} to ${t} °C`,warm:"Warm",aboveDesc:i=>`above ${i} °C`,tooWarm:"Too warm",fromDesc:i=>`from ${i} °C`,noSensor:"No sensor",noSensorDesc:"no temperature sensor assigned to the room",unavailable:"Unavailable",unavailableDesc:"the sensor reports no value (–)",symCold:i=>`Too cold (below ${i} °C)`,symHot:i=>`Too warm (above ${i} °C)`,symHumid:(i,t)=>`Humidity above ${i} %, red from ${t} %`,symCo2:(i,t)=>`CO₂ above ${i} ppm: open a window (red above ${t} ppm)`,symHeating:"Radiator is heating",symWindow:"Window open",symDoor:"Exterior door open",flagCold:i=>`Too cold: ${i} °C`,flagHot:i=>`Too warm: ${i} °C`,flagHumid:i=>`High humidity: ${i} %`,flagCo2:i=>`CO₂ ${i} ppm, open a window`,tools:"Tools",toolSelect:"Select",toolRoom:"Draw room",toolPoints:"Edit corners",toolPan:"Pan",library:"Library",libraryTitle:"Library: devices, doors, windows, furniture (B)",libraryHint:"Tap an entry to see it, tap it again or use Place to put it into the plan. Or drag it straight into the plan.",librarySearch:"Search",libraryNothing:"Nothing found.",placeInPlan:"Place in plan",libraryTile:"Drag into the plan or tap",devices:"Devices",doorsWindows:"Doors and windows",addButton:"Add door, window, device, furniture",noEntity:i=>`No matching entity found for “${i}”.`,dropOnWall:"Drop doors and windows onto a wall.",tapToPlace:i=>`Tap the plan to place “${i}” (Esc cancels).`,roomN:i=>`Room ${i}`,rotate:"Rotate (Alt = free)",emptyTitle:"Draw your first room",emptyText:"Hold the mouse button and drag a rectangle. You see size and area while drawing.",drawRoom:"Draw room",importAreas:"Areas from Home Assistant",roomCount:i=>i===1?"room":"rooms",areaTotal:"m² total",snap:"Snap",snapTitle:"Snap to grid and rooms (hold Alt to disable)",zoomOut:"Zoom out",zoomIn:"Zoom in",fitAll:"Show all",back:"Back to overview",backRooms:"Back to room list",duplicate:"Duplicate",delete:"Delete",stateOn:"on / open",stateOff:"off / closed",none:"none",chooseEntity:"Choose entity",label:"Label",entity:"Entity",appearance:"Shown as",automatic:i=>`Automatic (${i})`,placement:"Placement",posX:"Position x",posY:"Position y",height:"Height",rotation:"Rotation",rotationHint:"Rotation 0° = align with the nearest wall automatically.",radiatorLength:"Length",keepWall:"Never lower the wall behind (3D)",view3d:"3D view",roomTap:"Tapping a room",roomTapOptions:{focus:"Zoom in",isolate:"Show only this room",none:"Nothing"},showAll:"Show whole home",roomNoDevices:"No devices placed in this room yet.",noRoom:"not assigned to a room",type:"Type",width:"Width",depth:"Depth",length:"Length",contact:"Contact sensor",exterior:"Exterior (open = warning)",flipHinge:"Flip hinge",opensInto:i=>`Opens into: ${i}`,openingHint:"Move: drag the opening in the plan. Width: drag its ends.",furnitureOf:i=>`Furniture, ${i}`,furnitureHint:"Drag in the plan to move, drag the round handle to rotate.",roomName:"Room name",rectangle:"Rectangle",corners:i=>`${i} corners`,perimeter:i=>`perimeter ${i} m`,size:"Size",outerSize:"Outer size",area:"Area",noArea:"No area",temperature:"Temperature",humidity:"Humidity",notAvailable:"not available",noSensorOption:"No sensor",inThisArea:"In this area",more:"More",allSensors:"All sensors",copySuffix:"(copy)",roomsHeading:"Rooms",noRooms:"No rooms yet. Draw with the room tool (R) or import your areas.",importN:i=>`Import ${i} ${i===1?"area":"areas"} from Home Assistant`,construction:"Construction",backup:"Backup",backupHint:"Download the plan as a JSON file or load one. An imported plan replaces the current one once you save.",exportPlan:"Export",importPlan:"Import",importFailed:"The file is not a valid Floorplan 3D plan (or larger than 2 MB).",imported:i=>`Plan imported (${i} rooms). Check it and save to apply it.`,ok:"OK",limits:"Limits",limitsHint:"Room colours and symbols: temperature scale, humidity and CO₂ (warning, red).",limCold:"Too cold below",limOkLow:"Comfortable from",limOkHigh:"Comfortable up to",limHot:"Too warm from",limHumid:"Humidity warning",limHumidAlert:"Humidity red",limCo2:"CO₂ warning",limCo2Alert:"CO₂ red",wallHeight:"Wall height",wallThickness:"Wall thickness",grid:"Grid",contents:"Contents",contentsText:(i,t,e)=>`${i} devices, ${t} doors and windows, ${e} pieces of furniture. Add more with the “Add” button or the library (B).`,shortcuts:"Keyboard shortcuts",keys:[["V R P H","Select, room, corners, pan"],["Space","hold to pan"],["Alt","drag without snapping"],["Arrows","move by one grid step"],["B","open the library"],["Del","delete selection or corner"],["Ctrl Z / Y","undo, redo"],["Ctrl S","save"]],background:"Background image",showInEditor:"Show in editor",opacity:"Opacity",removeImage:"Remove image",replaceImage:"Other image",backgroundHint:"Upload a picture of your floor plan, set its scale and draw the rooms on top. Only you see it in the planner.",uploadImage:"Upload image",imageUrl:"Image address",useUrl:"Use",imageUrlHint:"Or enter an address: a file in /config/www is available as /local/name.png.",imageUrlInvalid:"Enter a path such as /local/plan.png or an https address.",uploading:"Uploading image …",imageTooLarge:"Choose a PNG, JPEG, WebP or GIF image up to 15 MB.",uploadUnavailable:"Home Assistant cannot store uploaded images here (the Image upload integration is not loaded). Put the file into /config/www and enter /local/name.png instead.",uploadFailed:i=>`Upload failed: ${i}`,imageFailed:"The image could not be loaded.",calibrate:"Set scale",calibrateHint:"Click two points on the image whose real distance you know, for example both ends of a wall, and enter the distance.",calibPick:i=>`Click point ${i} of 2 on the image.`,calibDistance:i=>`${i} m on the image. Real distance:`,calibReal:"Real distance in metres",calibDone:"Scale set. Draw the rooms on top of the image.",apply:"Apply",cancel:"Cancel",traceImage:"Trace an image",loadDemo:"Demo home",demoLoaded:"Demo home loaded. Its devices are made up, so they show as unavailable. Undo to start over, or save to keep it.",welcomeTitle:"Welcome to Floorplan 3D",welcomeText:"Draw your home once, then see it live in 3D on every device. Pick a way to start:",startAreas:"Start with your areas",startAreasText:i=>`One room for each of your ${i} Home Assistant areas, with sensors suggested. Then adjust sizes and positions.`,startTrace:"Trace a floor plan",startTraceText:"Upload a picture of your floor plan, set the scale with two clicks and draw the rooms on top.",startDraw:"Draw by hand",startDrawText:"Start with an empty plan and draw rectangles with the mouse or a finger.",startDemo:"Look at the demo home",startDemoText:"A furnished sample flat to try the 3D view. You can undo it at any time.",floor:"Floor",missingTitle:i=>`${i} missing ${i===1?"entity":"entities"}`,missingHint:"Renamed or removed in Home Assistant. Open an entry and choose the new entity.",entityMissing:"This entity no longer exists in Home Assistant. Choose the new one.",showMore:i=>`Show ${i} more`,cardAllFloors:"All floors (switcher in the card)",cardFloorHelp:"Show one floor only, or let viewers switch.",cardView:"View",cardViewAuto:"3D (2D map on devices without WebGL 2)",cardView2d:"Always the 2D map",cardHeight:"Height",cardHeightHelp:"In pixels, or a CSS length such as 60vh.",cardControls:"Show the view buttons",floors:"Floors",floorName:i=>i===0?"Ground floor":i===1?"First floor":i===2?"Second floor":i<0?i===-1?"Basement":`Basement ${-i}`:`Floor ${i}`,floorsHint:"Each floor has its own rooms, devices and background image. Switch floors at the top.",floorsSingle:"Add a floor for a house or a flat on several levels. Everything drawn so far becomes the ground floor.",addFloor:"Add floor",importFloors:i=>`Import ${i} ${i===1?"floor":"floors"} from Home Assistant`,floorLevel:"Level",deleteFloor:i=>`Delete ${i} with everything on it`,kinds:{radiator:"Radiator",light:"Lamp",tv:"TV",speaker:"Speaker",sensor:"Sensor",motion:"Motion sensor",vacuum:"Robot vacuum",generic:"Other device"},openings:{door:"Door",window:"Window",opening:"Passage"},tvStates:{on:"On",playing:"Playing",paused:"Paused",idle:"Ready",buffering:"Loading"},furnitureTypes:{sofa:"Sofa, 3 seats",sofa_2:"Sofa, 2 seats",sofa_corner:"Corner sofa",armchair:"Armchair",pouf:"Pouf",coffee_table:"Coffee table",side_table:"Side table",tv_board:"TV stand",sideboard:"Sideboard",shelf:"Shelf",bookcase:"Bookcase",fireplace:"Fireplace",piano:"Piano",table:"Dining table",table_large:"Large dining table",table_round:"Round table",chair:"Chair",bench:"Bench",bar_stool:"Bar stool",vitrine:"Display cabinet",bed:"Double bed",bed_king:"King-size bed",bed_single:"Single bed",nightstand:"Nightstand",dresser:"Dresser",wardrobe:"Wardrobe",wardrobe_small:"Small wardrobe",vanity:"Dressing table",kitchen:"Kitchen unit",kitchen_corner:"Corner kitchen",kitchen_island:"Kitchen island",stove:"Stove",dishwasher:"Dishwasher",fridge:"Fridge",tall_cabinet:"Tall cabinet",bathtub:"Bathtub",shower:"Shower",toilet:"Toilet",bidet:"Bidet",sink:"Sink",sink_double:"Double sink",washer:"Washing machine",dryer:"Tumble dryer",coat_rack:"Coat stand",shoe_cabinet:"Shoe cabinet",console:"Console table",desk:"Desk",desk_corner:"Corner desk",office_chair:"Office chair",filing_cabinet:"Drawer unit",bed_bunk:"Bunk bed",crib:"Cot",toy_box:"Toy box",rug:"Rug",rug_round:"Round rug",plant:"Plant",aquarium:"Aquarium",lounger:"Lounger",stairs:"Stairs up",stairs_down:"Stairs down",stairs_spiral:"Spiral staircase"},furnitureCategories:{living:"Living room",dining:"Dining",bedroom:"Bedroom",kitchen:"Kitchen",bathroom:"Bathroom",hall:"Hall",office:"Office",kids:"Kids",stairs:"Stairs",other:"More"}},kg={title:"Grundriss 3D",modeView:"3D",modePlan:"Planen",modes:"Ansicht",conflict:"Der Plan wurde inzwischen auf einem anderen Gerät gespeichert. Deine Änderungen hier gehen beim Neuladen verloren.",reload:"Neu laden",remoteChanged:"Der Plan wurde auf einem anderen Gerät geändert. Neu laden zeigt ihn (deine ungespeicherten Änderungen hier gehen verloren), oder du arbeitest weiter.",keepEditing:"Weiterarbeiten",overwrite:"Meine Version speichern",retry:"Erneut versuchen",loadFailed:i=>`Plan konnte nicht geladen werden: ${i}`,saveFailed:i=>`Speichern fehlgeschlagen: ${i}`,undo:"Rückgängig",undoKey:"Rückgängig (Strg+Z)",redo:"Wiederholen",redoKey:"Wiederholen (Strg+Y)",saving:"Speichert …",unsaved:"Nicht gespeichert",saved:"Gespeichert",save:"Speichern",saveKey:"Speichern (Strg+S)",loading:"Lade Plan …",unnamed:"Ohne Namen",device:"Gerät",doorWindow:"Tür / Fenster",furniture:"Möbel",home:"Wohnung",homeArea:i=>`Wohnung, ${i} m²`,emptyPlan:"Noch kein Grundriss. Zeichne die Räume unter „Planen“.",noWebgl:"Dieses Gerät unterstützt kein WebGL 2, deshalb wird die Live-Karte in 2D gezeigt.",dismiss:"Ausblenden",viewControls:"Kamera",angled:"Schräg",top:"Von oben",lowWalls:"Wände niedrig",lowWallsTitle:"Wände niedrig zeigen, um in die Räume zu sehen",autoWalls:"Auto-Wände",autoWallsTitle:"Wände zwischen Kamera und Räumen automatisch absenken (wird auf diesem Gerät gespeichert)",thisDevice:"Auf diesem Gerät",tapToggle:"Ein Tipp auf eine Lampe schaltet sie ein oder aus. Gedrückt halten öffnet ihren Dialog.",animations:"Animationen",animationsTitle:"Wärmeflimmern, Luftzug, Bewegung und Klang (wird auf diesem Gerät gespeichert)",legendOpen:"Was bedeutet was?",close:"Schließen",legend:"Legende",legendColors:"Raumfarbe zeigt",colorModes:{temperature:"Temperatur",humidity:"Luftfeuchte",co2:"CO₂",heating:"Heizung",none:"Nichts"},dry:"Trocken",humid:"Feucht",veryHumid:"Sehr feucht",belowPercent:i=>`unter ${i} %`,rangePercent:(i,t)=>`${i}–${t} %`,fromPercent:i=>`ab ${i} %`,airGood:"Gute Luft",airVentilate:"Lüften",airUrgent:"Dringend lüften",belowPpm:i=>`unter ${i} ppm`,fromPpm:i=>`ab ${i} ppm`,heatOn:"Heizt",heatOnDesc:"ein Heizkörper im Raum heizt gerade",heatIdle:"Ziel erreicht",heatIdleDesc:"Thermostat an, heizt gerade nicht",heatOff:"Aus",heatOffDesc:"alle Thermostate im Raum sind aus",noSensorFor:{temperature:"dem Raum ist kein Temperatursensor zugeordnet",humidity:"dem Raum ist kein Feuchtesensor zugeordnet",co2:"kein CO₂-Sensor (ppm) im Raum platziert",heating:"kein Thermostat im Raum platziert"},legendSymbols:"Symbole am Raum",legendDevices:"Geräte",legendDevicesText:"Heizkörper leuchten orange und flimmern, solange sie heizen. Lampen leuchten, wenn sie an sind. Türen und Fenster öffnen sich mit ihrem Kontakt, durch offene Fenster strömt Luft, offene Außentüren werden rot. Bewegungsmelder pulsieren, Lautsprecher senden Schallwellen. Ein Tipp auf ein Gerät oder eine Tür öffnet seinen Dialog. Ein Tipp auf einen Raum zoomt hinein und zeigt alles darin (oder nur diesen Raum, siehe Planer-Einstellungen), ein Tipp neben den Grundriss zeigt wieder alles.",tooCold:"Zu kalt",tooColdDesc:(i,t)=>`unter ${i} °C, kräftig blau unter ${t} °C`,comfortable:"Angenehm",rangeDesc:(i,t)=>`${i} bis ${t} °C`,warm:"Warm",aboveDesc:i=>`über ${i} °C`,tooWarm:"Zu warm",fromDesc:i=>`ab ${i} °C`,noSensor:"Ohne Sensor",noSensorDesc:"dem Raum ist kein Temperatursensor zugeordnet",unavailable:"Nicht erreichbar",unavailableDesc:"Sensor meldet keinen Wert (–)",symCold:i=>`Zu kalt (unter ${i} °C)`,symHot:i=>`Zu warm (über ${i} °C)`,symHumid:(i,t)=>`Luftfeuchte über ${i} %, rot ab ${t} %`,symCo2:(i,t)=>`CO₂ über ${i} ppm: lüften (rot ab ${t} ppm)`,symHeating:"Heizkörper heizt gerade",symWindow:"Fenster offen",symDoor:"Außentür offen",flagCold:i=>`Zu kalt: ${i} °C`,flagHot:i=>`Zu warm: ${i} °C`,flagHumid:i=>`Luftfeuchte hoch: ${i} %`,flagCo2:i=>`CO₂ ${i} ppm, bitte lüften`,tools:"Werkzeuge",toolSelect:"Auswählen",toolRoom:"Raum zeichnen",toolPoints:"Eckpunkte bearbeiten",toolPan:"Ansicht verschieben",library:"Bibliothek",libraryTitle:"Bibliothek: Geräte, Türen, Fenster, Möbel (B)",libraryHint:"Tippe einen Eintrag an, um ihn anzusehen. Nochmal tippen oder „Platzieren“ setzt ihn in den Plan. Oder zieh ihn direkt in den Plan.",librarySearch:"Suchen",libraryNothing:"Nichts gefunden.",placeInPlan:"Platzieren",libraryTile:"In den Plan ziehen oder antippen",devices:"Geräte",doorsWindows:"Türen und Fenster",addButton:"Tür, Fenster, Gerät, Möbel hinzufügen",noEntity:i=>`Keine passende Entität für „${i}“ gefunden.`,dropOnWall:"Türen und Fenster bitte auf eine Wand ziehen.",tapToPlace:i=>`Tippe in den Plan, um „${i}“ zu setzen (Esc bricht ab).`,roomN:i=>`Raum ${i}`,rotate:"Drehen (Alt = stufenlos)",emptyTitle:"Zeichne deinen ersten Raum",emptyText:"Halte die Maustaste gedrückt und zieh ein Rechteck auf. Maße und Fläche siehst du dabei live.",drawRoom:"Raum zeichnen",importAreas:"Bereiche aus Home Assistant",roomCount:i=>i===1?"Raum":"Räume",areaTotal:"m² gesamt",snap:"Einrasten",snapTitle:"Einrasten an Raster und Räumen (Alt gedrückt halten = aus)",zoomOut:"Verkleinern",zoomIn:"Vergrößern",fitAll:"Alles zeigen",back:"Zur Übersicht",backRooms:"Zur Raumliste",duplicate:"Duplizieren",delete:"Löschen",stateOn:"an / offen",stateOff:"aus / zu",none:"keine",chooseEntity:"Entität wählen",label:"Bezeichnung",entity:"Entität",appearance:"Darstellung",automatic:i=>`Automatisch (${i})`,placement:"Lage",posX:"Position x",posY:"Position y",height:"Höhe",rotation:"Drehung",rotationHint:"Drehung 0° = automatisch an der nächsten Wand ausrichten.",radiatorLength:"Länge",keepWall:"Wand dahinter nie absenken (3D)",view3d:"3D-Ansicht",roomTap:"Raum antippen",roomTapOptions:{focus:"Hineinzoomen",isolate:"Nur diesen Raum zeigen",none:"Nichts"},showAll:"Ganze Wohnung zeigen",roomNoDevices:"In diesem Raum sind noch keine Geräte platziert.",noRoom:"keinem Raum zugeordnet",type:"Art",width:"Breite",depth:"Tiefe",length:"Länge",contact:"Kontakt",exterior:"Außen (offen = Warnung)",flipHinge:"Anschlag wechseln",opensInto:i=>`Öffnet nach: ${i}`,openingHint:"Verschieben: im Plan an der Öffnung ziehen. Breite: an den Enden ziehen.",furnitureOf:i=>`Möbel, ${i}`,furnitureHint:"Im Plan ziehen zum Verschieben, am runden Griff ziehen zum Drehen.",roomName:"Raumname",rectangle:"Rechteck",corners:i=>`${i} Ecken`,perimeter:i=>`Umfang ${i} m`,size:"Maße",outerSize:"Außenmaße",area:"Bereich",noArea:"Kein Bereich",temperature:"Temperatur",humidity:"Luftfeuchte",notAvailable:"nicht verfügbar",noSensorOption:"Kein Sensor",inThisArea:"In diesem Bereich",more:"Weitere",allSensors:"Alle Sensoren",copySuffix:"(Kopie)",roomsHeading:"Räume",noRooms:"Noch keine Räume. Zeichne mit dem Raum-Werkzeug (R) oder übernimm deine Bereiche.",importN:i=>`${i} ${i===1?"Bereich":"Bereiche"} aus Home Assistant übernehmen`,construction:"Bauweise",backup:"Sichern",backupHint:"Plan als JSON-Datei herunterladen oder eine laden. Ein importierter Plan ersetzt den aktuellen, sobald du speicherst.",exportPlan:"Exportieren",importPlan:"Importieren",importFailed:"Die Datei ist kein gültiger Plan für Grundriss 3D (oder größer als 2 MB).",imported:i=>`Plan importiert (${i} Räume). Prüfe ihn und speichere, um ihn zu übernehmen.`,ok:"OK",limits:"Grenzwerte",limitsHint:"Für Raumfarben und Symbole: Temperaturskala, Luftfeuchte und CO₂ (Warnung, rot).",limCold:"Zu kalt unter",limOkLow:"Angenehm ab",limOkHigh:"Angenehm bis",limHot:"Zu warm ab",limHumid:"Feuchte Warnung ab",limHumidAlert:"Feuchte rot ab",limCo2:"CO₂ Warnung ab",limCo2Alert:"CO₂ rot ab",wallHeight:"Wandhöhe",wallThickness:"Wanddicke",grid:"Raster",contents:"Ausstattung",contentsText:(i,t,e)=>`${i} Geräte, ${t} Türen und Fenster, ${e} Möbel. Neues fügst du über den Knopf „Hinzufügen“ oder die Bibliothek (B) hinzu.`,shortcuts:"Tastenkürzel",keys:[["V R P H","Auswählen, Raum, Punkte, Hand"],["Leertaste","gedrückt halten zum Verschieben"],["Alt","beim Ziehen ohne Einrasten"],["Pfeile","um ein Raster bewegen"],["B","Bibliothek öffnen"],["Entf","Auswahl oder Eckpunkt löschen"],["Strg Z / Y","Rückgängig, Wiederholen"],["Strg S","Speichern"]],background:"Hintergrundbild",showInEditor:"Im Editor anzeigen",opacity:"Deckkraft",removeImage:"Bild entfernen",replaceImage:"Anderes Bild",backgroundHint:"Lade ein Bild deines Grundrisses hoch, stelle den Maßstab ein und zeichne die Räume darauf. Das Bild siehst nur du im Planer.",uploadImage:"Bild hochladen",imageUrl:"Bildadresse",useUrl:"Übernehmen",imageUrlHint:"Oder gib eine Adresse ein: Eine Datei in /config/www erreichst du über /local/name.png.",imageUrlInvalid:"Gib einen Pfad wie /local/grundriss.png oder eine https-Adresse ein.",uploading:"Bild wird hochgeladen …",imageTooLarge:"Wähle ein PNG-, JPEG-, WebP- oder GIF-Bild bis 15 MB.",uploadUnavailable:"Home Assistant kann hochgeladene Bilder hier nicht speichern (die Integration Bild-Upload ist nicht geladen). Lege die Datei stattdessen in /config/www ab und gib /local/name.png ein.",uploadFailed:i=>`Hochladen fehlgeschlagen: ${i}`,imageFailed:"Das Bild konnte nicht geladen werden.",calibrate:"Maßstab einstellen",calibrateHint:"Klicke zwei Punkte im Bild an, deren echten Abstand du kennst, zum Beispiel beide Enden einer Wand, und gib den Abstand ein.",calibPick:i=>`Klicke Punkt ${i} von 2 im Bild an.`,calibDistance:i=>`Im Bild ${i} m. Echter Abstand:`,calibReal:"Echter Abstand in Metern",calibDone:"Maßstab eingestellt. Zeichne jetzt die Räume auf das Bild.",apply:"Übernehmen",cancel:"Abbrechen",traceImage:"Bild abzeichnen",loadDemo:"Demo-Wohnung",demoLoaded:"Demo-Wohnung geladen. Ihre Geräte sind erfunden und erscheinen deshalb als nicht erreichbar. Rückgängig macht es ungeschehen, Speichern behält sie.",welcomeTitle:"Willkommen bei Grundriss 3D",welcomeText:"Zeichne dein Zuhause einmal und sieh es dann live in 3D auf jedem Gerät. Wähle, wie du anfangen willst:",startAreas:"Mit deinen Bereichen starten",startAreasText:i=>`Ein Raum für jeden deiner ${i} Bereiche aus Home Assistant, Sensoren werden vorgeschlagen. Danach passt du Größe und Lage an.`,startTrace:"Grundriss abzeichnen",startTraceText:"Lade ein Bild deines Grundrisses hoch, stelle mit zwei Klicks den Maßstab ein und zeichne die Räume darauf.",startDraw:"Selbst zeichnen",startDrawText:"Starte mit einem leeren Plan und zieh Rechtecke mit der Maus oder dem Finger auf.",startDemo:"Demo-Wohnung ansehen",startDemoText:"Eine eingerichtete Beispielwohnung zum Ausprobieren der 3D-Ansicht. Du kannst sie jederzeit rückgängig machen.",floor:"Etage",missingTitle:i=>`${i} ${i===1?"Entität fehlt":"Entitäten fehlen"}`,missingHint:"In Home Assistant umbenannt oder entfernt. Öffne einen Eintrag und wähle die neue Entität.",entityMissing:"Diese Entität gibt es in Home Assistant nicht mehr. Wähle die neue aus.",showMore:i=>`${i} weitere zeigen`,cardAllFloors:"Alle Etagen (Umschalter in der Karte)",cardFloorHelp:"Nur eine Etage zeigen oder umschalten lassen.",cardView:"Ansicht",cardViewAuto:"3D (2D-Karte auf Geräten ohne WebGL 2)",cardView2d:"Immer die 2D-Karte",cardHeight:"Höhe",cardHeightHelp:"In Pixeln oder als CSS-Länge wie 60vh.",cardControls:"Ansichtsknöpfe zeigen",floors:"Etagen",floorName:i=>i===0?"Erdgeschoss":i>0?`${i}. Obergeschoss`:i===-1?"Keller":`${-i}. Untergeschoss`,floorsHint:"Jede Etage hat eigene Räume, Geräte und ein eigenes Hintergrundbild. Umschalten kannst du oben in der Leiste.",floorsSingle:"Füge eine Etage hinzu, wenn dein Zuhause mehrere Stockwerke hat. Alles bisher Gezeichnete wird zum Erdgeschoss.",addFloor:"Etage hinzufügen",importFloors:i=>`${i} ${i===1?"Etage":"Etagen"} aus Home Assistant übernehmen`,floorLevel:"Ebene",deleteFloor:i=>`${i} mit allem darauf löschen`,kinds:{radiator:"Heizkörper",light:"Lampe",tv:"Fernseher",speaker:"Lautsprecher",sensor:"Sensor",motion:"Bewegungsmelder",vacuum:"Saugroboter",generic:"Sonstiges Gerät"},openings:{door:"Tür",window:"Fenster",opening:"Durchgang"},tvStates:{on:"An",playing:"Läuft",paused:"Pausiert",idle:"Bereit",buffering:"Lädt"},furnitureTypes:{sofa:"Sofa, 3-Sitzer",sofa_2:"Sofa, 2-Sitzer",sofa_corner:"Ecksofa",armchair:"Sessel",pouf:"Pouf",coffee_table:"Couchtisch",side_table:"Beistelltisch",tv_board:"TV-Board",sideboard:"Sideboard",shelf:"Regal",bookcase:"Bücherregal",fireplace:"Kamin",piano:"Klavier",table:"Esstisch",table_large:"Großer Esstisch",table_round:"Runder Tisch",chair:"Stuhl",bench:"Bank",bar_stool:"Barhocker",vitrine:"Vitrine",bed:"Doppelbett",bed_king:"Großes Doppelbett",bed_single:"Einzelbett",nightstand:"Nachttisch",dresser:"Kommode",wardrobe:"Kleiderschrank",wardrobe_small:"Kleiner Schrank",vanity:"Schminktisch",kitchen:"Küchenzeile",kitchen_corner:"Eckküche",kitchen_island:"Kücheninsel",stove:"Herd",dishwasher:"Geschirrspüler",fridge:"Kühlschrank",tall_cabinet:"Hochschrank",bathtub:"Badewanne",shower:"Dusche",toilet:"WC",bidet:"Bidet",sink:"Waschbecken",sink_double:"Doppelwaschbecken",washer:"Waschmaschine",dryer:"Trockner",coat_rack:"Garderobenständer",shoe_cabinet:"Schuhschrank",console:"Konsolentisch",desk:"Schreibtisch",desk_corner:"Eckschreibtisch",office_chair:"Bürostuhl",filing_cabinet:"Rollcontainer",bed_bunk:"Etagenbett",crib:"Babybett",toy_box:"Spielzeugkiste",rug:"Teppich",rug_round:"Runder Teppich",plant:"Pflanze",aquarium:"Aquarium",lounger:"Liege",stairs:"Treppe nach oben",stairs_down:"Treppe nach unten",stairs_spiral:"Wendeltreppe"},furnitureCategories:{living:"Wohnzimmer",dining:"Essen",bedroom:"Schlafzimmer",kitchen:"Küche",bathroom:"Bad",hall:"Flur",office:"Büro",kids:"Kinderzimmer",stairs:"Treppen",other:"Sonstiges"}},Ug={title:"Κάτοψη 3D",modeView:"3D",modePlan:"Σχέδιο",modes:"Προβολή",conflict:"Το σχέδιο αποθηκεύτηκε στο μεταξύ σε άλλη συσκευή. Οι αλλαγές σου εδώ χάνονται με την επαναφόρτωση.",reload:"Επαναφόρτωση",remoteChanged:"Το σχέδιο άλλαξε σε άλλη συσκευή. Η επαναφόρτωση το εμφανίζει (οι μη αποθηκευμένες αλλαγές σου εδώ χάνονται), αλλιώς συνέχισε να δουλεύεις.",keepEditing:"Συνέχεια επεξεργασίας",overwrite:"Αποθήκευση της δικής μου έκδοσης",retry:"Δοκίμασε ξανά",loadFailed:i=>`Το σχέδιο δεν φορτώθηκε: ${i}`,saveFailed:i=>`Η αποθήκευση απέτυχε: ${i}`,undo:"Αναίρεση",undoKey:"Αναίρεση (Ctrl+Z)",redo:"Επανάληψη",redoKey:"Επανάληψη (Ctrl+Y)",saving:"Αποθήκευση …",unsaved:"Δεν αποθηκεύτηκε",saved:"Αποθηκεύτηκε",save:"Αποθήκευση",saveKey:"Αποθήκευση (Ctrl+S)",loading:"Φόρτωση σχεδίου …",unnamed:"Χωρίς όνομα",device:"Συσκευή",doorWindow:"Πόρτα / παράθυρο",furniture:"Έπιπλα",home:"Σπίτι",homeArea:i=>`Σπίτι, ${i} m²`,emptyPlan:"Δεν υπάρχει ακόμα κάτοψη. Σχεδίασε τα δωμάτια στο «Σχέδιο».",noWebgl:"Αυτή η συσκευή δεν υποστηρίζει WebGL 2, γι' αυτό ο ζωντανός χάρτης εμφανίζεται σε 2D.",dismiss:"Απόκρυψη",viewControls:"Κάμερα",angled:"Λοξά",top:"Από πάνω",lowWalls:"Χαμηλοί τοίχοι",lowWallsTitle:"Χαμήλωσε τους τοίχους για να βλέπεις μέσα στα δωμάτια",autoWalls:"Αυτόματοι τοίχοι",autoWallsTitle:"Αυτόματο χαμήλωμα των τοίχων ανάμεσα στην κάμερα και τα δωμάτια (αποθηκεύεται σε αυτή τη συσκευή)",thisDevice:"Σε αυτή τη συσκευή",tapToggle:"Ένα πάτημα σε λάμπα την ανάβει ή τη σβήνει. Κράτα πατημένο για το παράθυρο διαλόγου της.",animations:"Κίνηση",animationsTitle:"Θερμός αέρας, ρεύμα αέρα, κίνηση και ήχος (αποθηκεύεται σε αυτή τη συσκευή)",legendOpen:"Τι σημαίνει;",close:"Κλείσιμο",legend:"Υπόμνημα",legendColors:"Το χρώμα του δωματίου δείχνει",colorModes:{temperature:"Θερμοκρασία",humidity:"Υγρασία",co2:"CO₂",heating:"Θέρμανση",none:"Τίποτα"},dry:"Ξηρό",humid:"Υγρό",veryHumid:"Πολύ υγρό",belowPercent:i=>`κάτω από ${i} %`,rangePercent:(i,t)=>`${i}–${t} %`,fromPercent:i=>`από ${i} %`,airGood:"Καλός αέρας",airVentilate:"Άνοιξε ένα παράθυρο",airUrgent:"Αερισμός τώρα",belowPpm:i=>`κάτω από ${i} ppm`,fromPpm:i=>`από ${i} ppm`,heatOn:"Θερμαίνει",heatOnDesc:"ένα καλοριφέρ στο δωμάτιο θερμαίνει τώρα",heatIdle:"Στόχος επιτεύχθηκε",heatIdleDesc:"ο θερμοστάτης είναι αναμμένος, δεν θερμαίνει τώρα",heatOff:"Κλειστό",heatOffDesc:"όλοι οι θερμοστάτες του δωματίου είναι κλειστοί",noSensorFor:{temperature:"το δωμάτιο δεν έχει αισθητήρα θερμοκρασίας",humidity:"το δωμάτιο δεν έχει αισθητήρα υγρασίας",co2:"δεν υπάρχει αισθητήρας CO₂ (ppm) στο δωμάτιο",heating:"δεν υπάρχει θερμοστάτης στο δωμάτιο"},legendSymbols:"Σύμβολα δωματίου",legendDevices:"Συσκευές",legendDevicesText:"Τα καλοριφέρ λάμπουν πορτοκαλί και τρεμοπαίζουν όσο θερμαίνουν. Οι λάμπες φωτίζουν όταν είναι αναμμένες. Πόρτες και παράθυρα ανοίγουν με τον αισθητήρα επαφής τους, από τα ανοιχτά παράθυρα μπαίνει αέρας, οι ανοιχτές εξωτερικές πόρτες γίνονται κόκκινες. Οι αισθητήρες κίνησης πάλλονται, τα ηχεία στέλνουν ηχητικά κύματα. Ένα πάτημα σε συσκευή ή πόρτα ανοίγει το παράθυρο διαλόγου της. Ένα πάτημα σε δωμάτιο κάνει ζουμ και δείχνει όλα όσα έχει (ή μόνο αυτό το δωμάτιο, δες τις ρυθμίσεις σχεδίου), ένα πάτημα δίπλα στην κάτοψη δείχνει ξανά τα πάντα.",tooCold:"Πολύ κρύο",tooColdDesc:(i,t)=>`κάτω από ${i} °C, έντονο μπλε κάτω από ${t} °C`,comfortable:"Άνετο",rangeDesc:(i,t)=>`${i} έως ${t} °C`,warm:"Ζεστό",aboveDesc:i=>`πάνω από ${i} °C`,tooWarm:"Πολύ ζεστό",fromDesc:i=>`από ${i} °C`,noSensor:"Χωρίς αισθητήρα",noSensorDesc:"το δωμάτιο δεν έχει αισθητήρα θερμοκρασίας",unavailable:"Μη διαθέσιμο",unavailableDesc:"ο αισθητήρας δεν δίνει τιμή (–)",symCold:i=>`Πολύ κρύο (κάτω από ${i} °C)`,symHot:i=>`Πολύ ζεστό (πάνω από ${i} °C)`,symHumid:(i,t)=>`Υγρασία πάνω από ${i} %, κόκκινο από ${t} %`,symCo2:(i,t)=>`CO₂ πάνω από ${i} ppm: άνοιξε ένα παράθυρο (κόκκινο πάνω από ${t} ppm)`,symHeating:"Το καλοριφέρ θερμαίνει",symWindow:"Ανοιχτό παράθυρο",symDoor:"Ανοιχτή εξωτερική πόρτα",flagCold:i=>`Πολύ κρύο: ${i} °C`,flagHot:i=>`Πολύ ζεστό: ${i} °C`,flagHumid:i=>`Υψηλή υγρασία: ${i} %`,flagCo2:i=>`CO₂ ${i} ppm, άνοιξε ένα παράθυρο`,tools:"Εργαλεία",toolSelect:"Επιλογή",toolRoom:"Σχεδίαση δωματίου",toolPoints:"Επεξεργασία γωνιών",toolPan:"Μετακίνηση προβολής",library:"Βιβλιοθήκη",libraryTitle:"Βιβλιοθήκη: συσκευές, πόρτες, παράθυρα, έπιπλα (B)",libraryHint:"Πάτησε ένα στοιχείο για να το δεις. Πάτησέ το ξανά ή «Τοποθέτηση» για να μπει στο σχέδιο. Ή σύρε το κατευθείαν στο σχέδιο.",librarySearch:"Αναζήτηση",libraryNothing:"Δεν βρέθηκε τίποτα.",placeInPlan:"Τοποθέτηση",libraryTile:"Σύρε στο σχέδιο ή πάτησε",devices:"Συσκευές",doorsWindows:"Πόρτες και παράθυρα",addButton:"Προσθήκη πόρτας, παραθύρου, συσκευής, επίπλου",noEntity:i=>`Δεν βρέθηκε κατάλληλη οντότητα για «${i}».`,dropOnWall:"Άφησε τις πόρτες και τα παράθυρα πάνω σε τοίχο.",tapToPlace:i=>`Πάτησε στο σχέδιο για να τοποθετήσεις «${i}» (Esc για ακύρωση).`,roomN:i=>`Δωμάτιο ${i}`,rotate:"Περιστροφή (Alt = ελεύθερα)",emptyTitle:"Σχεδίασε το πρώτο σου δωμάτιο",emptyText:"Κράτα πατημένο το κουμπί του ποντικιού και σύρε ένα ορθογώνιο. Διαστάσεις και εμβαδόν φαίνονται όσο σχεδιάζεις.",drawRoom:"Σχεδίαση δωματίου",importAreas:"Περιοχές από το Home Assistant",roomCount:i=>i===1?"δωμάτιο":"δωμάτια",areaTotal:"m² συνολικά",snap:"Μαγνήτης",snapTitle:"Ευθυγράμμιση σε πλέγμα και δωμάτια (κράτα πατημένο το Alt για απενεργοποίηση)",zoomOut:"Σμίκρυνση",zoomIn:"Μεγέθυνση",fitAll:"Εμφάνιση όλων",back:"Πίσω στην επισκόπηση",backRooms:"Πίσω στη λίστα δωματίων",duplicate:"Διπλότυπο",delete:"Διαγραφή",stateOn:"αναμμένο / ανοιχτό",stateOff:"σβηστό / κλειστό",none:"καμία",chooseEntity:"Επιλογή οντότητας",label:"Ετικέτα",entity:"Οντότητα",appearance:"Εμφάνιση ως",automatic:i=>`Αυτόματα (${i})`,placement:"Θέση",posX:"Θέση x",posY:"Θέση y",height:"Ύψος",rotation:"Περιστροφή",rotationHint:"Περιστροφή 0° = αυτόματη ευθυγράμμιση με τον πλησιέστερο τοίχο.",radiatorLength:"Μήκος",keepWall:"Ο τοίχος πίσω του δεν χαμηλώνει ποτέ (3D)",view3d:"Προβολή 3D",roomTap:"Πάτημα σε δωμάτιο",roomTapOptions:{focus:"Ζουμ",isolate:"Μόνο αυτό το δωμάτιο",none:"Τίποτα"},showAll:"Όλο το σπίτι",roomNoDevices:"Δεν έχουν τοποθετηθεί ακόμα συσκευές σε αυτό το δωμάτιο.",noRoom:"χωρίς δωμάτιο",type:"Τύπος",width:"Πλάτος",depth:"Βάθος",length:"Μήκος",contact:"Αισθητήρας επαφής",exterior:"Εξωτερική (ανοιχτή = προειδοποίηση)",flipHinge:"Αλλαγή μεντεσέ",opensInto:i=>`Ανοίγει προς: ${i}`,openingHint:"Μετακίνηση: σύρε το άνοιγμα στο σχέδιο. Πλάτος: σύρε τα άκρα του.",furnitureOf:i=>`Έπιπλο, ${i}`,furnitureHint:"Σύρε στο σχέδιο για μετακίνηση, σύρε τη στρογγυλή λαβή για περιστροφή.",roomName:"Όνομα δωματίου",rectangle:"Ορθογώνιο",corners:i=>`${i} γωνίες`,perimeter:i=>`περίμετρος ${i} m`,size:"Διαστάσεις",outerSize:"Εξωτερικές διαστάσεις",area:"Περιοχή",noArea:"Καμία περιοχή",temperature:"Θερμοκρασία",humidity:"Υγρασία",notAvailable:"μη διαθέσιμο",noSensorOption:"Χωρίς αισθητήρα",inThisArea:"Σε αυτή την περιοχή",more:"Περισσότερα",allSensors:"Όλοι οι αισθητήρες",copySuffix:"(αντίγραφο)",roomsHeading:"Δωμάτια",noRooms:"Δεν υπάρχουν ακόμα δωμάτια. Σχεδίασε με το εργαλείο δωματίου (R) ή φέρε τις περιοχές σου.",importN:i=>`Εισαγωγή ${i} ${i===1?"περιοχής":"περιοχών"} από το Home Assistant`,construction:"Κατασκευή",backup:"Αντίγραφο",backupHint:"Κατέβασε το σχέδιο ως αρχείο JSON ή φόρτωσε ένα. Ένα εισαγόμενο σχέδιο αντικαθιστά το τρέχον μόλις αποθηκεύσεις.",exportPlan:"Εξαγωγή",importPlan:"Εισαγωγή",importFailed:"Το αρχείο δεν είναι έγκυρο σχέδιο Κάτοψης 3D (ή είναι μεγαλύτερο από 2 MB).",imported:i=>`Το σχέδιο εισήχθη (${i} δωμάτια). Έλεγξέ το και αποθήκευσε για να το κρατήσεις.`,ok:"OK",limits:"Όρια",limitsHint:"Για τα χρώματα και τα σύμβολα των δωματίων: κλίμακα θερμοκρασίας, υγρασία και CO₂ (προειδοποίηση, κόκκινο).",limCold:"Πολύ κρύο κάτω από",limOkLow:"Άνετο από",limOkHigh:"Άνετο έως",limHot:"Πολύ ζεστό από",limHumid:"Υγρασία προειδοποίηση",limHumidAlert:"Υγρασία κόκκινο",limCo2:"CO₂ προειδοποίηση",limCo2Alert:"CO₂ κόκκινο",wallHeight:"Ύψος τοίχων",wallThickness:"Πάχος τοίχων",grid:"Πλέγμα",contents:"Περιεχόμενα",contentsText:(i,t,e)=>`${i} συσκευές, ${t} πόρτες και παράθυρα, ${e} έπιπλα. Πρόσθεσε κι άλλα με το κουμπί «Προσθήκη» ή τη βιβλιοθήκη (B).`,shortcuts:"Συντομεύσεις πληκτρολογίου",keys:[["V R P H","Επιλογή, δωμάτιο, γωνίες, μετακίνηση"],["Διάστημα","κράτα πατημένο για μετακίνηση"],["Alt","σύρσιμο χωρίς ευθυγράμμιση"],["Βελάκια","μετακίνηση κατά ένα βήμα πλέγματος"],["B","άνοιγμα βιβλιοθήκης"],["Del","διαγραφή επιλογής ή γωνίας"],["Ctrl Z / Y","αναίρεση, επανάληψη"],["Ctrl S","αποθήκευση"]],background:"Εικόνα φόντου",showInEditor:"Εμφάνιση στον επεξεργαστή",opacity:"Αδιαφάνεια",removeImage:"Αφαίρεση εικόνας",replaceImage:"Άλλη εικόνα",backgroundHint:"Ανέβασε μια εικόνα της κάτοψής σου, ρύθμισε την κλίμακα και σχεδίασε τα δωμάτια από πάνω. Την εικόνα τη βλέπεις μόνο εσύ στο σχέδιο.",uploadImage:"Ανέβασμα εικόνας",imageUrl:"Διεύθυνση εικόνας",useUrl:"Χρήση",imageUrlHint:"Ή γράψε μια διεύθυνση: ένα αρχείο στο /config/www είναι διαθέσιμο ως /local/όνομα.png.",imageUrlInvalid:"Γράψε μια διαδρομή όπως /local/katopsi.png ή μια διεύθυνση https.",uploading:"Ανέβασμα εικόνας …",imageTooLarge:"Διάλεξε εικόνα PNG, JPEG, WebP ή GIF έως 15 MB.",uploadUnavailable:"Το Home Assistant δεν μπορεί να αποθηκεύσει εδώ εικόνες (η ενσωμάτωση ανεβάσματος εικόνων δεν έχει φορτωθεί). Βάλε το αρχείο στο /config/www και γράψε /local/όνομα.png.",uploadFailed:i=>`Το ανέβασμα απέτυχε: ${i}`,imageFailed:"Η εικόνα δεν φορτώθηκε.",calibrate:"Ρύθμιση κλίμακας",calibrateHint:"Πάτησε δύο σημεία της εικόνας με γνωστή πραγματική απόσταση, για παράδειγμα τα δύο άκρα ενός τοίχου, και γράψε την απόσταση.",calibPick:i=>`Πάτησε το σημείο ${i} από 2 στην εικόνα.`,calibDistance:i=>`${i} m στην εικόνα. Πραγματική απόσταση:`,calibReal:"Πραγματική απόσταση σε μέτρα",calibDone:"Η κλίμακα ρυθμίστηκε. Σχεδίασε τώρα τα δωμάτια πάνω στην εικόνα.",apply:"Εφαρμογή",cancel:"Ακύρωση",traceImage:"Σχεδίαση από εικόνα",loadDemo:"Δοκιμαστικό σπίτι",demoLoaded:"Το δοκιμαστικό σπίτι φορτώθηκε. Οι συσκευές του είναι φανταστικές, γι' αυτό εμφανίζονται μη διαθέσιμες. Με αναίρεση ξεκινάς από την αρχή, με αποθήκευση το κρατάς.",welcomeTitle:"Καλώς ήρθες στην Κάτοψη 3D",welcomeText:"Σχεδίασε το σπίτι σου μία φορά και δες το ζωντανά σε 3D σε κάθε συσκευή. Διάλεξε πώς θέλεις να ξεκινήσεις:",startAreas:"Ξεκίνα με τις περιοχές σου",startAreasText:i=>`Ένα δωμάτιο για καθεμία από τις ${i} περιοχές σου στο Home Assistant, με προτεινόμενους αισθητήρες. Μετά προσαρμόζεις μέγεθος και θέση.`,startTrace:"Σχεδίαση από κάτοψη",startTraceText:"Ανέβασε μια εικόνα της κάτοψής σου, ρύθμισε την κλίμακα με δύο κλικ και σχεδίασε τα δωμάτια από πάνω.",startDraw:"Σχεδίαση με το χέρι",startDrawText:"Ξεκίνα με κενό σχέδιο και σύρε ορθογώνια με το ποντίκι ή το δάχτυλο.",startDemo:"Δες το δοκιμαστικό σπίτι",startDemoText:"Ένα επιπλωμένο παράδειγμα για να δοκιμάσεις την προβολή 3D. Μπορείς να το αναιρέσεις όποτε θέλεις.",floor:"Όροφος",missingTitle:i=>`${i} ${i===1?"οντότητα λείπει":"οντότητες λείπουν"}`,missingHint:"Μετονομάστηκαν ή αφαιρέθηκαν στο Home Assistant. Άνοιξε μια εγγραφή και διάλεξε τη νέα οντότητα.",entityMissing:"Αυτή η οντότητα δεν υπάρχει πια στο Home Assistant. Διάλεξε τη νέα.",showMore:i=>`Εμφάνιση ${i} ακόμα`,cardAllFloors:"Όλοι οι όροφοι (επιλογή στην κάρτα)",cardFloorHelp:"Εμφάνιση ενός μόνο ορόφου ή επιλογή από τον χρήστη.",cardView:"Προβολή",cardViewAuto:"3D (χάρτης 2D σε συσκευές χωρίς WebGL 2)",cardView2d:"Πάντα ο χάρτης 2D",cardHeight:"Ύψος",cardHeightHelp:"Σε pixel ή μήκος CSS όπως 60vh.",cardControls:"Εμφάνιση κουμπιών προβολής",floors:"Όροφοι",floorName:i=>i===0?"Ισόγειο":i>0?`${i}ος όροφος`:i===-1?"Υπόγειο":`${-i}ο υπόγειο`,floorsHint:"Κάθε όροφος έχει δικά του δωμάτια, συσκευές και εικόνα φόντου. Αλλάζεις όροφο στην πάνω μπάρα.",floorsSingle:"Πρόσθεσε όροφο αν το σπίτι σου έχει πολλά επίπεδα. Ό,τι έχεις σχεδιάσει μέχρι τώρα γίνεται το ισόγειο.",addFloor:"Προσθήκη ορόφου",importFloors:i=>`Εισαγωγή ${i} ${i===1?"ορόφου":"ορόφων"} από το Home Assistant`,floorLevel:"Επίπεδο",deleteFloor:i=>`Διαγραφή: ${i} με όλο το περιεχόμενο`,kinds:{radiator:"Καλοριφέρ",light:"Λάμπα",tv:"Τηλεόραση",speaker:"Ηχείο",sensor:"Αισθητήρας",motion:"Αισθητήρας κίνησης",vacuum:"Ρομποτική σκούπα",generic:"Άλλη συσκευή"},openings:{door:"Πόρτα",window:"Παράθυρο",opening:"Πέρασμα"},tvStates:{on:"Αναμμένη",playing:"Παίζει",paused:"Σε παύση",idle:"Έτοιμη",buffering:"Φορτώνει"},furnitureTypes:{sofa:"Καναπές τριθέσιος",sofa_2:"Καναπές διθέσιος",sofa_corner:"Γωνιακός καναπές",armchair:"Πολυθρόνα",pouf:"Πουφ",coffee_table:"Τραπεζάκι σαλονιού",side_table:"Βοηθητικό τραπεζάκι",tv_board:"Έπιπλο τηλεόρασης",sideboard:"Μπουφές",shelf:"Ράφι",bookcase:"Βιβλιοθήκη",fireplace:"Τζάκι",piano:"Πιάνο",table:"Τραπεζαρία",table_large:"Μεγάλη τραπεζαρία",table_round:"Στρογγυλό τραπέζι",chair:"Καρέκλα",bench:"Παγκάκι",bar_stool:"Σκαμπό μπαρ",vitrine:"Βιτρίνα",bed:"Διπλό κρεβάτι",bed_king:"Υπέρδιπλο κρεβάτι",bed_single:"Μονό κρεβάτι",nightstand:"Κομοδίνο",dresser:"Συρταριέρα",wardrobe:"Ντουλάπα",wardrobe_small:"Μικρή ντουλάπα",vanity:"Τουαλέτα με καθρέφτη",kitchen:"Πάγκος κουζίνας",kitchen_corner:"Γωνιακή κουζίνα",kitchen_island:"Νησίδα κουζίνας",stove:"Κουζίνα (εστίες)",dishwasher:"Πλυντήριο πιάτων",fridge:"Ψυγείο",tall_cabinet:"Ψηλό ντουλάπι",bathtub:"Μπανιέρα",shower:"Ντουζιέρα",toilet:"Τουαλέτα",bidet:"Μπιντέ",sink:"Νιπτήρας",sink_double:"Διπλός νιπτήρας",washer:"Πλυντήριο ρούχων",dryer:"Στεγνωτήριο",coat_rack:"Καλόγερος",shoe_cabinet:"Παπουτσοθήκη",console:"Κονσόλα",desk:"Γραφείο",desk_corner:"Γωνιακό γραφείο",office_chair:"Καρέκλα γραφείου",filing_cabinet:"Συρταριέρα γραφείου",bed_bunk:"Κουκέτα",crib:"Βρεφικό κρεβάτι",toy_box:"Κουτί παιχνιδιών",rug:"Χαλί",rug_round:"Στρογγυλό χαλί",plant:"Φυτό",aquarium:"Ενυδρείο",lounger:"Ξαπλώστρα",stairs:"Σκάλα προς τα πάνω",stairs_down:"Σκάλα προς τα κάτω",stairs_spiral:"Σπειροειδής σκάλα"},furnitureCategories:{living:"Σαλόνι",dining:"Τραπεζαρία",bedroom:"Υπνοδωμάτιο",kitchen:"Κουζίνα",bathroom:"Μπάνιο",hall:"Χολ",office:"Γραφείο",kids:"Παιδικό",stairs:"Σκάλες",other:"Άλλα"}},Og={en:yh,de:kg,el:Ug},_p=yh,bh="en";function zs(i){let t=(i?.locale?.language??i?.language??"en").toLowerCase(),e=t.split("-")[0];_p=Og[e]??yh,bh=t}var ct=()=>_p,Se=(i,t=1)=>i.toLocaleString(bh,{minimumFractionDigits:t,maximumFractionDigits:t}),Qr=i=>Number(i.replace(/\s/g,"").replace(",",".")),to=()=>bh;function Mh(i,t){let e=i.entities?.[t];return e?e.area_id?e.area_id:e.device_id?i.devices?.[e.device_id]?.area_id??null:null:null}function Ma(i,t){return i.states[t]?.attributes.friendly_name??t}function Sh(i,t,e){return Object.values(i.states).filter(n=>n.entity_id.startsWith("sensor.")&&n.attributes.device_class===t).filter(n=>!i.entities?.[n.entity_id]?.hidden).map(n=>({entityId:n.entity_id,name:n.attributes.friendly_name??n.entity_id,inArea:e!==null&&Mh(i,n.entity_id)===e})).sort((n,s)=>Number(s.inArea)-Number(n.inArea)||n.name.localeCompare(s.name,to()))}function xp(i,t,e){return Sh(i,t,e).find(n=>n.inArea)?.entityId??null}function wh(i){return Object.values(i.areas??{}).sort((t,e)=>t.name.localeCompare(e.name,to()))}function Sa(i,t,e=null){let n=new Set(t.rooms.map(h=>h.area_id).filter(Boolean)),s=wh(i).filter(h=>!n.has(h.area_id)),r=3,o=.5,a=4,l=new Map;return s.map(h=>{let u=gp(t,h.floor_id)??e,p=ci(t.rooms.filter(T=>jn(t,T)===u)),c=p?Math.ceil(p.maxY+1):0,d=p?Math.floor(p.minX):0,f=l.get(u)??0;l.set(u,f+1);let _=d+f%a*(r+o),g=c+Math.floor(f/a)*(r+o);return{...va(h.name,Os([_,g],[_+r,g+r])),...u?{floor:u}:{},area_id:h.area_id,temp_entity:xp(i,"temperature",h.area_id),humidity_entity:xp(i,"humidity",h.area_id)}})}function wa(i){return Object.values(i.floors??{}).sort((t,e)=>(t.level??0)-(e.level??0))}function hn(i,t){if(!t)return;let e=i.states[t];if(!e)return{value:null,unit:"",available:!1};if(t.startsWith("climate.")){let r=Number(e.attributes.current_temperature);return{value:Number.isFinite(r)?r:null,unit:"°C",available:e.state!=="unavailable"&&Number.isFinite(r)}}let n=Number(e.state),s=!["unavailable","unknown"].includes(e.state)&&Number.isFinite(n);return{value:s?n:null,unit:e.attributes.unit_of_measurement??"",available:s}}var Ta=["living","dining","bedroom","kitchen","bathroom","hall","office","kids","stairs","other"],Th=[{group:"device",kind:"radiator",height:.2},{group:"device",kind:"light",height:1.6},{group:"device",kind:"tv",height:1},{group:"device",kind:"speaker",height:.8},{group:"device",kind:"sensor",height:1},{group:"device",kind:"motion",height:2.4},{group:"device",kind:"vacuum",height:0},{group:"device",kind:"generic",height:1.2}],Eh=[{group:"opening",type:"door",width:.9},{group:"opening",type:"window",width:1.2},{group:"opening",type:"opening",width:.9}],hi=[{group:"furniture",type:"sofa",category:"living",size:[2.2,.95],height:.85},{group:"furniture",type:"sofa_2",category:"living",size:[1.6,.9],height:.85},{group:"furniture",type:"sofa_corner",category:"living",size:[2.6,1.9],height:.85,shape:"L",arm:.95},{group:"furniture",type:"armchair",category:"living",size:[.85,.85],height:.85},{group:"furniture",type:"pouf",category:"living",size:[.5,.5],height:.42,round:!0},{group:"furniture",type:"coffee_table",category:"living",size:[1.1,.6],height:.45},{group:"furniture",type:"side_table",category:"living",size:[.5,.5],height:.55,round:!0},{group:"furniture",type:"tv_board",category:"living",size:[1.8,.45],height:.5},{group:"furniture",type:"sideboard",category:"living",size:[1.6,.45],height:.8},{group:"furniture",type:"shelf",category:"living",size:[1,.35],height:1.8},{group:"furniture",type:"bookcase",category:"living",size:[.8,.32],height:2},{group:"furniture",type:"fireplace",category:"living",size:[1.2,.4],height:1},{group:"furniture",type:"piano",category:"living",size:[1.5,.6],height:1.25},{group:"furniture",type:"table",category:"dining",size:[1.6,.9],height:.75},{group:"furniture",type:"table_large",category:"dining",size:[2.2,1],height:.75},{group:"furniture",type:"table_round",category:"dining",size:[1.1,1.1],height:.75,round:!0},{group:"furniture",type:"chair",category:"dining",size:[.45,.5],height:.9},{group:"furniture",type:"bench",category:"dining",size:[1.2,.4],height:.45},{group:"furniture",type:"bar_stool",category:"dining",size:[.4,.4],height:.75,round:!0},{group:"furniture",type:"vitrine",category:"dining",size:[1,.42],height:1.9},{group:"furniture",type:"bed",category:"bedroom",size:[1.8,2],height:.5},{group:"furniture",type:"bed_king",category:"bedroom",size:[2,2.1],height:.5},{group:"furniture",type:"bed_single",category:"bedroom",size:[.9,2],height:.5},{group:"furniture",type:"nightstand",category:"bedroom",size:[.45,.4],height:.5},{group:"furniture",type:"dresser",category:"bedroom",size:[1.2,.5],height:.85},{group:"furniture",type:"wardrobe",category:"bedroom",size:[2,.6],height:2.1},{group:"furniture",type:"wardrobe_small",category:"bedroom",size:[1,.6],height:2},{group:"furniture",type:"vanity",category:"bedroom",size:[1,.45],height:.75},{group:"furniture",type:"kitchen",category:"kitchen",size:[2.4,.6],height:.9},{group:"furniture",type:"kitchen_corner",category:"kitchen",size:[2.4,1.8],height:.9,shape:"L",arm:.6},{group:"furniture",type:"kitchen_island",category:"kitchen",size:[1.8,.9],height:.9},{group:"furniture",type:"stove",category:"kitchen",size:[.6,.6],height:.9},{group:"furniture",type:"dishwasher",category:"kitchen",size:[.6,.6],height:.85},{group:"furniture",type:"fridge",category:"kitchen",size:[.6,.65],height:1.8},{group:"furniture",type:"tall_cabinet",category:"kitchen",size:[.6,.6],height:2.1},{group:"furniture",type:"bathtub",category:"bathroom",size:[1.7,.75],height:.55},{group:"furniture",type:"shower",category:"bathroom",size:[.9,.9],height:2},{group:"furniture",type:"toilet",category:"bathroom",size:[.38,.65],height:.4},{group:"furniture",type:"bidet",category:"bathroom",size:[.38,.55],height:.4},{group:"furniture",type:"sink",category:"bathroom",size:[.6,.45],height:.85},{group:"furniture",type:"sink_double",category:"bathroom",size:[1.2,.5],height:.85},{group:"furniture",type:"washer",category:"bathroom",size:[.6,.6],height:.85},{group:"furniture",type:"dryer",category:"bathroom",size:[.6,.6],height:.85},{group:"furniture",type:"coat_rack",category:"hall",size:[.45,.45],height:1.8,round:!0},{group:"furniture",type:"shoe_cabinet",category:"hall",size:[.9,.3],height:1},{group:"furniture",type:"console",category:"hall",size:[1,.3],height:.8},{group:"furniture",type:"desk",category:"office",size:[1.4,.7],height:.75},{group:"furniture",type:"desk_corner",category:"office",size:[1.6,1.6],height:.75,shape:"L",arm:.7},{group:"furniture",type:"office_chair",category:"office",size:[.6,.6],height:1.05,round:!0},{group:"furniture",type:"filing_cabinet",category:"office",size:[.45,.6],height:.7},{group:"furniture",type:"bed_bunk",category:"kids",size:[.9,2],height:1.6},{group:"furniture",type:"crib",category:"kids",size:[.7,1.3],height:.9},{group:"furniture",type:"toy_box",category:"kids",size:[.8,.4],height:.45},{group:"furniture",type:"rug",category:"other",size:[2,1.4],height:.01,free:!0},{group:"furniture",type:"rug_round",category:"other",size:[1.6,1.6],height:.01,round:!0,free:!0},{group:"furniture",type:"plant",category:"other",size:[.45,.45],height:1.1},{group:"furniture",type:"aquarium",category:"other",size:[1,.4],height:1.3},{group:"furniture",type:"lounger",category:"other",size:[.7,1.9],height:.4},{group:"furniture",type:"stairs",category:"stairs",size:[1,3.2],height:2.5},{group:"furniture",type:"stairs_down",category:"stairs",size:[1,3.2],height:.01},{group:"furniture",type:"stairs_spiral",category:"stairs",size:[1.6,1.6],height:2.5,round:!0}],kn=i=>hi.find(t=>t.type===i)??hi[0];function cs(i){return i.group==="device"?ct().kinds[i.kind]:i.group==="opening"?ct().openings[i.type]:ct().furnitureTypes[i.type]}function Ah(i,t){let e=Object.keys(i.states),n=s=>i.states[s]?.attributes.device_class;switch(t){case"radiator":return e.filter(s=>s.startsWith("climate."));case"light":return e.filter(s=>s.startsWith("light.")||s.startsWith("switch."));case"tv":return e.filter(s=>s.startsWith("media_player.")&&/(^|_)(tv|fernseher|webos)/.test(s));case"speaker":return e.filter(s=>s.startsWith("media_player."));case"sensor":return e.filter(s=>s.startsWith("sensor.")&&!!n(s));case"motion":return e.filter(s=>s.startsWith("binary_sensor.")&&["motion","occupancy","presence"].includes(String(n(s))));case"vacuum":return e.filter(s=>s.startsWith("vacuum."));default:return e}}function vp(i){return Object.keys(i.states).filter(t=>t.startsWith("binary_sensor.")&&["door","window","opening","garage_door"].includes(String(i.states[t].attributes.device_class)))}function yp(i,t,e,n){if(!i)return;let s=new Set(t.items.map(a=>a.entity_id)),r=Ah(i,e).filter(a=>!i.entities?.[a]?.hidden),o=a=>(n&&Mh(i,a)===n?2:0)+(s.has(a)?0:1);return[...r].sort((a,l)=>o(l)-o(a)||a.localeCompare(l))[0]}var bp=2*1024*1024,Fg=new Set(hi.map(i=>i.type)),Bg=new Set(["auto","radiator","light","tv","speaker","sensor","motion","vacuum","generic"]),zg=/^[a-z0-9_]+\.[a-z0-9_]+$/,Jn=i=>typeof i=="object"&&i!==null&&!Array.isArray(i),Ch=i=>typeof i=="number"&&Number.isFinite(i),Ai=i=>Ch(i)&&Math.abs(i)<=1e3,$s=(i,t=100)=>typeof i=="string"?i.slice(0,t):null,eo=i=>typeof i=="string"&&zg.test(i)?i:null,Hs=i=>Array.isArray(i)&&i.length===2&&Ai(i[0])&&Ai(i[1])?[i[0],i[1]]:void 0,An=i=>typeof i=="string"&&i.length>0&&i.length<=100?i:void 0;function Mp(i){return`${JSON.stringify({format:"floorplan-3d",version:1,...i},null,2)}
`}function Rh(i,t){let e;try{e=JSON.parse(i)}catch{return}if(!Jn(e)||!Array.isArray(e.rooms))return;let n=(Array.isArray(e.floors)?e.floors:[]).slice(0,10).flatMap(c=>{if(!Jn(c)||!An(c.id))return[];let d=Ch(c.level)?Math.round(c.level):0;return[{id:An(c.id),name:$s(c.name)??"",level:Math.max(-10,Math.min(100,d)),floor_id:$s(c.floor_id),background:null}]}),s=new Set(n.map(c=>c.id)),r=c=>typeof c=="string"&&s.has(c)?{floor:c}:{},o=e.rooms.flatMap(c=>{if(!Jn(c)||!An(c.id)||!Array.isArray(c.points))return[];let d=c.points.map(Hs);if(d.length<3||d.length>32||d.some(_=>!_))return[];let f=typeof c.floor_color=="string"&&/^#[0-9a-fA-F]{6}$/.test(c.floor_color)?c.floor_color:null;return[{id:An(c.id),...r(c.floor),name:$s(c.name)??"",points:d,area_id:$s(c.area_id),temp_entity:eo(c.temp_entity),humidity_entity:eo(c.humidity_entity),floor_color:f}]}),a=(Array.isArray(e.openings)?e.openings:[]).flatMap(c=>{if(!Jn(c)||!An(c.id)||!Jn(c.wall))return[];let d=Hs(c.wall.a),f=Hs(c.wall.b),_=c.type==="door"||c.type==="window"||c.type==="opening"?c.type:void 0;if(!d||!f||!_)return[];let g=Array.isArray(c.room_ids)?c.room_ids.map(An).filter(m=>!!m).slice(0,2):[];return[{id:An(c.id),...r(c.floor),type:_,room_ids:g,wall:{a:d,b:f},entity_id:eo(c.entity_id),exterior:c.exterior===!0,hinge:c.hinge==="right"?"right":"left"}]}),l=(Array.isArray(e.items)?e.items:[]).flatMap(c=>{if(!Jn(c)||!An(c.id)||!eo(c.entity_id))return[];let d=Hs(c.pos);if(!d)return[];let f={id:An(c.id),...r(c.floor),entity_id:eo(c.entity_id),kind:typeof c.kind=="string"&&Bg.has(c.kind)?c.kind:"auto",pos:d,rotation:Ai(c.rotation)?c.rotation:0,height:Ai(c.height)&&c.height>=0&&c.height<=5?c.height:0,room_id:An(c.room_id)??null,label:$s(c.label)};return Ai(c.width)&&c.width>=.2&&c.width<=4&&(f.width=c.width),typeof c.keep_wall=="boolean"&&(f.keep_wall=c.keep_wall),[f]}),h=(Array.isArray(e.furniture)?e.furniture:[]).flatMap(c=>{if(!Jn(c)||!An(c.id)||typeof c.type!="string"||!Fg.has(c.type))return[];let d=Hs(c.pos),f=Hs(c.size);return!d||!f||f[0]<.05||f[1]<.05||f[0]>20||f[1]>20?[]:[{id:An(c.id),...r(c.floor),type:c.type,pos:d,size:[f[0],f[1]],rotation:Ai(c.rotation)?c.rotation:0,label:$s(c.label)}]}),u=Jn(e.settings)?e.settings:{},p={...t};for(let c of["wall_height","wall_thickness","grid"])Ai(u[c])&&u[c]>0&&(p[c]=u[c]);if(Jn(u.temp_scale)&&["cold","ok_low","ok_high","hot"].every(c=>Ai(u.temp_scale[c]))&&(p.temp_scale=u.temp_scale),Jn(u.thresholds)&&["humidity","humidity_alert","co2","co2_alert"].every(c=>Ch(u.thresholds[c]))){let c=u.thresholds;p.thresholds={humidity:c.humidity,humidity_alert:c.humidity_alert,co2:c.co2,co2_alert:c.co2_alert}}return(u.room_tap==="focus"||u.room_tap==="isolate"||u.room_tap==="none")&&(p.room_tap=u.room_tap),typeof u.color_mode=="string"&&["temperature","humidity","co2","heating","none"].includes(u.color_mode)&&(p.color_mode=u.color_mode),p.background=n.length?null:t.background,{settings:p,floors:n,rooms:o,openings:a,items:l,furniture:h}}var we=i=>q`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
    stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${i}</svg>`,$t={select:we(Y`<path d="M5 3.5l13 7.2-5.6 1.6 3.6 6.2-2.4 1.4-3.6-6.2L6 17.6z"/>`),room:we(Y`<path d="M4 4h16v16H4z" stroke-dasharray="0"/><path d="M4 9h3M17 9h3M9 4v3M9 17v3"/>`),points:we(Y`<path d="M5 5h9v6h5v8H5z"/><circle cx="14" cy="11" r="1.9" fill="currentColor"/><circle cx="5" cy="5" r="1.9" fill="currentColor"/>`),pan:we(Y`<path d="M8 13V6.5a1.5 1.5 0 013 0V12m0-6.5V5a1.5 1.5 0 013 0v7m0-5.5a1.5 1.5 0 013 0V14a6 6 0 01-6 6h-1.2a5 5 0 01-3.9-1.9L4.6 15a1.5 1.5 0 012.3-1.9L8 14.5"/>`),undo:we(Y`<path d="M9 14L4 9l5-5"/><path d="M4 9h10a6 6 0 010 12h-3"/>`),redo:we(Y`<path d="M15 14l5-5-5-5"/><path d="M20 9H10a6 6 0 000 12h3"/>`),plus:we(Y`<path d="M12 5v14M5 12h14"/>`),minus:we(Y`<path d="M5 12h14"/>`),fit:we(Y`<path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/>`),magnet:we(Y`<path d="M6 4v8a6 6 0 0012 0V4h-4v8a2 2 0 01-4 0V4z"/><path d="M6 8h4M14 8h4"/>`),trash:we(Y`<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>`),copy:we(Y`<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 00-1-1H5a1 1 0 00-1 1v10a1 1 0 001 1h3"/>`),download:we(Y`<path d="M12 15V3M7 10l5 5 5-5"/><path d="M4 17v3h16v-3"/>`),import:we(Y`<path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 17v3h16v-3"/>`),image:we(Y`<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="M20.5 16l-5-5L6 19.5"/>`),home:we(Y`<path d="M4 11l8-7 8 7"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/>`),ruler:we(Y`<path d="M3 16.5L16.5 3 21 7.5 7.5 21z"/><path d="M7 12.5l2 2M10 9.5l1.5 1.5M13 6.5l2 2"/>`),sparkle:we(Y`<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>`),close:we(Y`<path d="M6 6l12 12M18 6L6 18"/>`),library:we(Y`<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M17.5 14v7M14 17.5h7"/>`),rotate:we(Y`<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/>`),cutaway:we(Y`<path d="M3 20h18M5 20V8h6v12"/><path d="M14 20v-4h6v4"/><path d="M17 4v8M14.5 9.5L17 12l2.5-2.5"/>`),walls:we(Y`<path d="M3 20h18M5 20v-6h5v6M14 20v-9h5v9"/><path d="M5 14V9h5v5" stroke-dasharray="2 2"/>`),cube:we(Y`<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>`),plan:we(Y`<path d="M3 5h18v14H3z"/><path d="M11 5v6h10M8 19v-5h3"/>`)};var Ci={radiator:Y`<path d="M-4 -4v8M0 -4v8M4 -4v8" />`,light:Y`<circle r="3.2" class="fill" />`,tv:Y`<rect x="-5" y="-3.5" width="10" height="7" rx="1" />`,sensor:Y`<path d="M-1.5 -4.5v6.2a2.2 2.2 0 103 0v-6.2a1.5 1.5 0 00-3 0z" />`,motion:Y`<path d="M-4 0a4 4 0 018 0M-2 0a2 2 0 014 0" />`,speaker:Y`<path d="M-4 -2h2l3 -3v10l-3 -3h-2z" />`,vacuum:Y`<circle r="4.5" /><path d="M-2.5 -1.5h5" />`,generic:Y`<circle r="2" class="fill" />`};function $g(i,t,e){let n=-i/2,s=-t/2;return`M${n} ${s}H${-n}V${-s}H${-n-e}V${s+e}H${n}Z`}function no(i,t,e){let n=kn(i);return n.shape==="L"?Y`<path d=${$g(t,e,Math.min(n.arm??.6,t*.9,e*.9))} class="body" />`:n.round?Y`<ellipse rx=${t/2} ry=${e/2} class="body" />`:Y`<rect x=${-t/2} y=${-e/2} width=${t} height=${e} rx=${Math.min(t,e)*.04} class="body" />`}function io(i,t,e){let n=-t/2,s=-e/2;switch(i){case"bed":case"bed_king":case"bed_single":case"bed_bunk":{let r=i==="bed_single"||i==="bed_bunk"?1:2,o=(t-.1*(r+1))/r;return Y`${Array.from({length:r},(a,l)=>Y`<rect x=${n+.1+l*(o+.1)} y=${s+.08} width=${o} height="0.32" rx="0.06" class="g" />`)}
        <path d="M${n} ${s+.55}H${-n}" class="g" />`}case"stairs":case"stairs_down":{let r=Math.max(3,Math.round(e/.26)),o=i==="stairs"?"g":"g dashed";return Y`${Array.from({length:r-1},(a,l)=>Y`<path d="M${n} ${s+(l+1)*e/r}H${-n}" class=${o} />`)}
        <path d="M0 ${-s-.12}V${s+.2}M${-Math.min(.18,t*.2)} ${s+.42}L0 ${s+.2}L${Math.min(.18,t*.2)} ${s+.42}" class="g arrow" />`}case"stairs_spiral":{let r=Math.min(t,e)/2;return Y`<circle r="0.06" class="g" />${Array.from({length:8},(o,a)=>{let l=a*Math.PI/4;return Y`<path d="M${Math.cos(l)*.06} ${Math.sin(l)*.06}L${Math.cos(l)*r} ${Math.sin(l)*r}" class="g" />`})}`}case"sofa_corner":{let r=Math.min(kn(i).arm??.95,t*.9,e*.9);return Y`<path d="M${n} ${s+.22}H${-n-.22}V${-s}" class="g" /><path d="M${n} ${s+r}H${-n-r}" class="g dashed" />`}case"kitchen_corner":case"desk_corner":{let r=Math.min(kn(i).arm??.6,t*.9,e*.9);return Y`<path d="M${n} ${s+r-.05}H${-n-r+.05}V${-s}" class="g" />`}case"crib":return Y`<rect x=${n+.05} y=${s+.05} width=${t-.1} height=${e-.1} class="g" />`;case"pouf":case"bar_stool":case"office_chair":case"coat_rack":return Y`<circle r=${Math.min(t,e)*.22} class="g" />`;case"table_round":return Y`<circle r=${Math.min(t,e)*.12} class="g" />`;case"stove":return Y`${[-1,1].flatMap(r=>[-1,1].map(o=>Y`<circle cx=${r*t*.22} cy=${o*e*.22} r=${Math.min(t,e)*.12} class="g" />`))}`;case"dishwasher":case"dryer":return Y`<path d="M${n} ${-s-.08}H${-n}" class="g" /><circle r=${Math.min(t,e)*.22} class="g" />`;case"sink_double":return Y`<ellipse cx=${-t/4} cy="0.04" rx=${t*.17} ry=${e*.3} class="g" /><ellipse cx=${t/4} cy="0.04" rx=${t*.17} ry=${e*.3} class="g" />`;case"bidet":return Y`<ellipse cx="0" cy=${.04} rx=${t*.36} ry=${e*.36} class="g" />`;case"bookcase":case"vitrine":case"shoe_cabinet":return Y`<path d="M${n} ${-s-.05}H${-n}" class="g" />`;case"fireplace":return Y`<rect x=${-t*.27} y=${-s-.18} width=${t*.54} height="0.18" class="g" />`;case"piano":return Y`<rect x=${n+.06} y=${-s-.22} width=${t-.12} height="0.14" class="g" />`;case"kitchen_island":case"tall_cabinet":case"filing_cabinet":case"toy_box":return Y`<path d="M${n} ${-s-.06}H${-n}" class="g" />`;case"aquarium":return Y`<path d="M${n+.08} 0q${t*.1} -0.08 ${t*.2} 0t${t*.2} 0t${t*.2} 0t${t*.2} 0" class="g" />`;case"lounger":return Y`<path d="M${n} ${s+.6}H${-n}" class="g" />`;case"vanity":return Y`<path d="M${-t*.35} ${s+.04}H${t*.35}" class="g" />`;case"sofa":case"sofa_2":case"armchair":return Y`<path d="M${n} ${s+.22}H${-n}M${n+.18} ${s+.22}V${-s}M${-n-.18} ${s+.22}V${-s}" class="g" />`;case"chair":return Y`<path d="M${n} ${s+.08}H${-n}" class="g" />`;case"wardrobe":return Y`<path d="M${n} ${s}L${-n} ${-s}M${-n} ${s}L${n} ${-s}" class="g" />`;case"nightstand":return Y`<path d="M${n} ${-s-.1}H${-n}" class="g" /><circle cx="0" cy=${-s-.05} r="0.02" class="g" />`;case"dresser":return Y`<path d="M${n} ${-s-.1}H${-n}M0 ${s}V${-s-.1}" class="g" />`;case"bench":return Y`<path d="M${n+.05} 0H${-n-.05}" class="g" />`;case"side_table":return Y`<circle r=${Math.min(t,e)*.12} class="g" />`;case"rug_round":return Y`<ellipse rx=${t/2-.08} ry=${e/2-.08} class="g dashed" />`;case"shelf":case"sideboard":case"tv_board":return Y`<path d="M${n} 0H${-n}" class="g" />`;case"desk":return Y`<path d="M${n+.05} ${-s-.12}H${-n-.05}" class="g" />`;case"kitchen":{let r=Math.min(.09,e*.15);return Y`<rect x=${n+.15} y=${-.2} width="0.5" height="0.4" rx="0.06" class="g" />
        ${[0,1].flatMap(o=>[0,1].map(a=>Y`<circle cx=${-n-.5+o*.28} cy=${-.12+a*.24} r=${r} class="g" />`))}`}case"fridge":return Y`<path d="M${n} ${-s-.08}H${-n}" class="g" />`;case"bathtub":return Y`<rect x=${n+.08} y=${s+.08} width=${t-.16} height=${e-.16} rx="0.2" class="g" /><circle cx=${n+.25} cy="0" r="0.03" class="g" />`;case"shower":return Y`<path d="M${n} ${s}L${-n} ${-s}M${-n} ${s}L${n} ${-s}" class="g" /><circle r="0.05" class="g" />`;case"toilet":return Y`<rect x=${n} y=${s} width=${t} height="0.18" class="g" /><ellipse cx="0" cy=${s+.42} rx=${t*.38} ry="0.22" class="g" />`;case"sink":return Y`<ellipse cx="0" cy="0.04" rx=${t*.32} ry=${e*.3} class="g" />`;case"washer":return Y`<circle r=${Math.min(t,e)*.32} class="g" />`;case"rug":return Y`<rect x=${n+.08} y=${s+.08} width=${t-.16} height=${e-.16} class="g dashed" />`;case"plant":return Y`<circle r=${Math.min(t,e)*.3} class="g" /><circle r=${Math.min(t,e)*.12} class="g" />`;default:return Y`<rect x=${n+.06} y=${s+.06} width=${Math.max(.01,t-.12)} height=${Math.max(.01,e-.12)} class="g" />`}}var $i={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Hi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ef=0,pu=1,nf=2;var Bo=1,sf=2,xr=3,Vi=0,an=1,We=2,ni=0,vr=1,Gi=2,fu=3,mu=4,rf=5;var Ms=100,of=101,af=102,lf=103,cf=104,hf=200,uf=201,df=202,pf=203,gu=204,_u=205,ff=206,mf=207,gf=208,_f=209,xf=210,vf=211,yf=212,bf=213,Mf=214,ja=0,Ja=1,Qa=2,sr=3,tl=4,el=5,nl=6,il=7,Ul=0,Sf=1,wf=2,$n=0,xu=1,vu=2,yu=3,bu=4,Mu=5,Su=6,wu=7;var Tu=300,Wi=301,Ss=302,Ol=303,Fl=304,zo=306,sl=1e3,ti=1001,rl=1002,Ve=1003,Tf=1004;var $o=1005;var Ye=1006,Bl=1007;var Xi=1008;var fn=1009,Eu=1010,Au=1011,yr=1012,zl=1013,Hn=1014,Vn=1015,Gn=1016,$l=1017,Hl=1018,br=1020,Cu=35902,Ru=35899,Pu=1021,Iu=1022,Pn=1023,ei=1026,Yi=1027,Du=1028,Vl=1029,qi=1030,Gl=1031;var Wl=1033,Ho=33776,Vo=33777,Go=33778,Wo=33779,Xl=35840,Yl=35841,ql=35842,Kl=35843,Zl=36196,jl=37492,Jl=37496,Ql=37488,tc=37489,Xo=37490,ec=37491,nc=37808,ic=37809,sc=37810,rc=37811,oc=37812,ac=37813,lc=37814,cc=37815,hc=37816,uc=37817,dc=37818,pc=37819,fc=37820,mc=37821,gc=36492,_c=36494,xc=36495,vc=36283,yc=36284,Yo=36285,bc=36286;var fo=2300,ol=2301,Ka=2302,tu=2303,eu=2400,nu=2401,iu=2402;var Ef=3200;var Mc=0,Af=1,vi="",Ae="srgb",mo="srgb-linear",go="linear",ue="srgb";var Za=7680;var Cf=519,Rf=512,Pf=513,If=514,Sc=515,Df=516,Lf=517,wc=518,Nf=519,kf=35044;var Lu="300 es",Bn=2e3,rr=2001;function Hg(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Vg(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function _o(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Uf(){let i=_o("canvas");return i.style.display="block",i}var Sp={},or=null;function Nu(...i){let t="THREE."+i.shift();or?or("log",t,...i):console.log(t,...i)}function Of(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ht(...i){i=Of(i);let t="THREE."+i.shift();if(or)or("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Gt(...i){i=Of(i);let t="THREE."+i.shift();if(or)or("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function ms(...i){let t=i.join(" ");t in Sp||(Sp[t]=!0,Ht(...i))}function Ff(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Bf={[ja]:Ja,[Qa]:nl,[tl]:il,[sr]:el,[Ja]:ja,[nl]:Qa,[il]:tl,[el]:sr},zn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Ze=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],wp=1234567,co=Math.PI/180,ar=180/Math.PI;function ws(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ze[i&255]+Ze[i>>8&255]+Ze[i>>16&255]+Ze[i>>24&255]+"-"+Ze[t&255]+Ze[t>>8&255]+"-"+Ze[t>>16&15|64]+Ze[t>>24&255]+"-"+Ze[e&63|128]+Ze[e>>8&255]+"-"+Ze[e>>16&255]+Ze[e>>24&255]+Ze[n&255]+Ze[n>>8&255]+Ze[n>>16&255]+Ze[n>>24&255]).toLowerCase()}function Qt(i,t,e){return Math.max(t,Math.min(e,i))}function ku(i,t){return(i%t+t)%t}function Gg(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Wg(i,t,e){return i!==t?(e-i)/(t-i):0}function ho(i,t,e){return(1-e)*i+e*t}function Xg(i,t,e,n){return ho(i,t,1-Math.exp(-e*n))}function Yg(i,t=1){return t-Math.abs(ku(i,t*2)-t)}function qg(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Kg(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Zg(i,t){return i+Math.floor(Math.random()*(t-i+1))}function jg(i,t){return i+Math.random()*(t-i)}function Jg(i){return i*(.5-Math.random())}function Qg(i){i!==void 0&&(wp=i);let t=wp+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function t0(i){return i*co}function e0(i){return i*ar}function n0(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function i0(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function s0(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function r0(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),h=r((t+n)/2),u=o((t+n)/2),p=r((t-n)/2),c=o((t-n)/2),d=r((n-t)/2),f=o((n-t)/2);switch(s){case"XYX":i.set(a*u,l*p,l*c,a*h);break;case"YZY":i.set(l*c,a*u,l*p,a*h);break;case"ZXZ":i.set(l*p,l*c,a*u,a*h);break;case"XZX":i.set(a*u,l*f,l*d,a*h);break;case"YXY":i.set(l*d,a*u,l*f,a*h);break;case"ZYZ":i.set(l*f,l*d,a*u,a*h);break;default:Ht("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function nr(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function rn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Uu={DEG2RAD:co,RAD2DEG:ar,generateUUID:ws,clamp:Qt,euclideanModulo:ku,mapLinear:Gg,inverseLerp:Wg,lerp:ho,damp:Xg,pingpong:Yg,smoothstep:qg,smootherstep:Kg,randInt:Zg,randFloat:jg,randFloatSpread:Jg,seededRandom:Qg,degToRad:t0,radToDeg:e0,isPowerOfTwo:n0,ceilPowerOfTwo:i0,floorPowerOfTwo:s0,setQuaternionFromProperEuler:r0,normalize:rn,denormalize:nr},Hu=class Hu{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Hu.prototype.isVector2=!0;var at=Hu,bn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],h=n[s+1],u=n[s+2],p=n[s+3],c=r[o+0],d=r[o+1],f=r[o+2],_=r[o+3];if(p!==_||l!==c||h!==d||u!==f){let g=l*c+h*d+u*f+p*_;g<0&&(c=-c,d=-d,f=-f,_=-_,g=-g);let m=1-a;if(g<.9995){let T=Math.acos(g),b=Math.sin(T);m=Math.sin(m*T)/b,a=Math.sin(a*T)/b,l=l*m+c*a,h=h*m+d*a,u=u*m+f*a,p=p*m+_*a}else{l=l*m+c*a,h=h*m+d*a,u=u*m+f*a,p=p*m+_*a;let T=1/Math.sqrt(l*l+h*h+u*u+p*p);l*=T,h*=T,u*=T,p*=T}}t[e]=l,t[e+1]=h,t[e+2]=u,t[e+3]=p}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],l=n[s+1],h=n[s+2],u=n[s+3],p=r[o],c=r[o+1],d=r[o+2],f=r[o+3];return t[e]=a*f+u*p+l*d-h*c,t[e+1]=l*f+u*c+h*p-a*d,t[e+2]=h*f+u*d+a*c-l*p,t[e+3]=u*f-a*p-l*c-h*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,h=a(n/2),u=a(s/2),p=a(r/2),c=l(n/2),d=l(s/2),f=l(r/2);switch(o){case"XYZ":this._x=c*u*p+h*d*f,this._y=h*d*p-c*u*f,this._z=h*u*f+c*d*p,this._w=h*u*p-c*d*f;break;case"YXZ":this._x=c*u*p+h*d*f,this._y=h*d*p-c*u*f,this._z=h*u*f-c*d*p,this._w=h*u*p+c*d*f;break;case"ZXY":this._x=c*u*p-h*d*f,this._y=h*d*p+c*u*f,this._z=h*u*f+c*d*p,this._w=h*u*p-c*d*f;break;case"ZYX":this._x=c*u*p-h*d*f,this._y=h*d*p+c*u*f,this._z=h*u*f-c*d*p,this._w=h*u*p+c*d*f;break;case"YZX":this._x=c*u*p+h*d*f,this._y=h*d*p+c*u*f,this._z=h*u*f-c*d*p,this._w=h*u*p-c*d*f;break;case"XZY":this._x=c*u*p-h*d*f,this._y=h*d*p-c*u*f,this._z=h*u*f+c*d*p,this._w=h*u*p+c*d*f;break;default:Ht("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],h=e[2],u=e[6],p=e[10],c=n+a+p;if(c>0){let d=.5/Math.sqrt(c+1);this._w=.25/d,this._x=(u-l)*d,this._y=(r-h)*d,this._z=(o-s)*d}else if(n>a&&n>p){let d=2*Math.sqrt(1+n-a-p);this._w=(u-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+h)/d}else if(a>p){let d=2*Math.sqrt(1+a-n-p);this._w=(r-h)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+u)/d}else{let d=2*Math.sqrt(1+p-n-a);this._w=(o-s)/d,this._x=(r+h)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Qt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,h=e._z,u=e._w;return this._x=n*u+o*a+s*h-r*l,this._y=s*u+o*l+r*a-n*h,this._z=r*u+o*h+n*l-s*a,this._w=o*u-n*a-s*l-r*h,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let l=1-e;if(a<.9995){let h=Math.acos(a),u=Math.sin(h);l=Math.sin(l*h)/u,e=Math.sin(e*h)/u,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Vu=class Vu{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Tp.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Tp.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,h=2*(o*s-a*n),u=2*(a*e-r*s),p=2*(r*n-o*e);return this.x=e+l*h+o*p-a*u,this.y=n+l*u+a*h-r*p,this.z=s+l*p+r*u-o*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ph.copy(this).projectOnVector(t),this.sub(Ph)}reflect(t){return this.sub(Ph.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Vu.prototype.isVector3=!0;var L=Vu,Ph=new L,Tp=new bn,Gu=class Gu{constructor(t,e,n,s,r,o,a,l,h){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,h)}set(t,e,n,s,r,o,a,l,h){let u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=l,u[6]=n,u[7]=o,u[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],h=n[1],u=n[4],p=n[7],c=n[2],d=n[5],f=n[8],_=s[0],g=s[3],m=s[6],T=s[1],b=s[4],v=s[7],M=s[2],S=s[5],A=s[8];return r[0]=o*_+a*T+l*M,r[3]=o*g+a*b+l*S,r[6]=o*m+a*v+l*A,r[1]=h*_+u*T+p*M,r[4]=h*g+u*b+p*S,r[7]=h*m+u*v+p*A,r[2]=c*_+d*T+f*M,r[5]=c*g+d*b+f*S,r[8]=c*m+d*v+f*A,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],h=t[7],u=t[8];return e*o*u-e*a*h-n*r*u+n*a*l+s*r*h-s*o*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],h=t[7],u=t[8],p=u*o-a*h,c=a*l-u*r,d=h*r-o*l,f=e*p+n*c+s*d;if(f===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/f;return t[0]=p*_,t[1]=(s*h-u*n)*_,t[2]=(a*n-s*o)*_,t[3]=c*_,t[4]=(u*e-s*l)*_,t[5]=(s*r-a*e)*_,t[6]=d*_,t[7]=(n*l-h*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let l=Math.cos(r),h=Math.sin(r);return this.set(n*l,n*h,-n*(l*o+h*a)+o+t,-s*h,s*l,-s*(-h*o+l*a)+a+e,0,0,1),this}scale(t,e){return ms("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ih.makeScale(t,e)),this}rotate(t){return ms("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ih.makeRotation(-t)),this}translate(t,e){return ms("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ih.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Gu.prototype.isMatrix3=!0;var qt=Gu,Ih=new qt,Ep=new qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ap=new qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function o0(){let i={enabled:!0,workingColorSpace:mo,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ue&&(s.r=gi(s.r),s.g=gi(s.g),s.b=gi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ue&&(s.r=ir(s.r),s.g=ir(s.g),s.b=ir(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===vi?go:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ms("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ms("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[mo]:{primaries:t,whitePoint:n,transfer:go,toXYZ:Ep,fromXYZ:Ap,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ae},outputColorSpaceConfig:{drawingBufferColorSpace:Ae}},[Ae]:{primaries:t,whitePoint:n,transfer:ue,toXYZ:Ep,fromXYZ:Ap,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ae}}}),i}var se=o0();function gi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ir(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Vs,al=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Vs===void 0&&(Vs=_o("canvas")),Vs.width=t.width,Vs.height=t.height;let s=Vs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Vs}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=_o("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=gi(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(gi(e[n]/255)*255):e[n]=gi(e[n]);return{data:e,width:t.width,height:t.height}}else return Ht("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},a0=0,lr=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:a0++}),this.uuid=ws(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Dh(s[o].image)):r.push(Dh(s[o]))}else r=Dh(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Dh(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?al.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ht("Texture: Unable to serialize Texture."),{})}var l0=0,Lh=new L,on=class i extends zn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=ti,s=ti,r=Ye,o=Xi,a=Pn,l=fn,h=i.DEFAULT_ANISOTROPY,u=vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:l0++}),this.uuid=ws(),this.name="",this.source=new lr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=h,this.format=a,this.internalFormat=null,this.type=l,this.offset=new at(0,0),this.repeat=new at(1,1),this.center=new at(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Lh).x}get height(){return this.source.getSize(Lh).y}get depth(){return this.source.getSize(Lh).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Ht(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Ht(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Tu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case sl:t.x=t.x-Math.floor(t.x);break;case ti:t.x=t.x<0?0:1;break;case rl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case sl:t.y=t.y-Math.floor(t.y);break;case ti:t.y=t.y<0?0:1;break;case rl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};on.DEFAULT_IMAGE=null;on.DEFAULT_MAPPING=Tu;on.DEFAULT_ANISOTROPY=1;var Wu=class Wu{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,h=l[0],u=l[4],p=l[8],c=l[1],d=l[5],f=l[9],_=l[2],g=l[6],m=l[10];if(Math.abs(u-c)<.01&&Math.abs(p-_)<.01&&Math.abs(f-g)<.01){if(Math.abs(u+c)<.1&&Math.abs(p+_)<.1&&Math.abs(f+g)<.1&&Math.abs(h+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let b=(h+1)/2,v=(d+1)/2,M=(m+1)/2,S=(u+c)/4,A=(p+_)/4,x=(f+g)/4;return b>v&&b>M?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=S/n,r=A/n):v>M?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=S/s,r=x/s):M<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(M),n=A/r,s=x/r),this.set(n,s,r,e),this}let T=Math.sqrt((g-f)*(g-f)+(p-_)*(p-_)+(c-u)*(c-u));return Math.abs(T)<.001&&(T=1),this.x=(g-f)/T,this.y=(p-_)/T,this.z=(c-u)/T,this.w=Math.acos((h+d+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this.w=Qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this.w=Qt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Wu.prototype.isVector4=!0;var Ee=Wu,ll=class extends zn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ye,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Ee(0,0,t,e),this.scissorTest=!1,this.viewport=new Ee(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new on(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Ye,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new lr(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},un=class extends ll{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},xo=class extends on{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var cl=class extends on{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var kl=class kl{constructor(t,e,n,s,r,o,a,l,h,u,p,c,d,f,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,h,u,p,c,d,f,_,g)}set(t,e,n,s,r,o,a,l,h,u,p,c,d,f,_,g){let m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=h,m[6]=u,m[10]=p,m[14]=c,m[3]=d,m[7]=f,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new kl().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/Gs.setFromMatrixColumn(t,0).length(),r=1/Gs.setFromMatrixColumn(t,1).length(),o=1/Gs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),h=Math.sin(s),u=Math.cos(r),p=Math.sin(r);if(t.order==="XYZ"){let c=o*u,d=o*p,f=a*u,_=a*p;e[0]=l*u,e[4]=-l*p,e[8]=h,e[1]=d+f*h,e[5]=c-_*h,e[9]=-a*l,e[2]=_-c*h,e[6]=f+d*h,e[10]=o*l}else if(t.order==="YXZ"){let c=l*u,d=l*p,f=h*u,_=h*p;e[0]=c+_*a,e[4]=f*a-d,e[8]=o*h,e[1]=o*p,e[5]=o*u,e[9]=-a,e[2]=d*a-f,e[6]=_+c*a,e[10]=o*l}else if(t.order==="ZXY"){let c=l*u,d=l*p,f=h*u,_=h*p;e[0]=c-_*a,e[4]=-o*p,e[8]=f+d*a,e[1]=d+f*a,e[5]=o*u,e[9]=_-c*a,e[2]=-o*h,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let c=o*u,d=o*p,f=a*u,_=a*p;e[0]=l*u,e[4]=f*h-d,e[8]=c*h+_,e[1]=l*p,e[5]=_*h+c,e[9]=d*h-f,e[2]=-h,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let c=o*l,d=o*h,f=a*l,_=a*h;e[0]=l*u,e[4]=_-c*p,e[8]=f*p+d,e[1]=p,e[5]=o*u,e[9]=-a*u,e[2]=-h*u,e[6]=d*p+f,e[10]=c-_*p}else if(t.order==="XZY"){let c=o*l,d=o*h,f=a*l,_=a*h;e[0]=l*u,e[4]=-p,e[8]=h*u,e[1]=c*p+_,e[5]=o*u,e[9]=d*p-f,e[2]=f*p-d,e[6]=a*u,e[10]=_*p+c}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(c0,t,h0)}lookAt(t,e,n){let s=this.elements;return xn.subVectors(t,e),xn.lengthSq()===0&&(xn.z=1),xn.normalize(),Ri.crossVectors(n,xn),Ri.lengthSq()===0&&(Math.abs(n.z)===1?xn.x+=1e-4:xn.z+=1e-4,xn.normalize(),Ri.crossVectors(n,xn)),Ri.normalize(),Ea.crossVectors(xn,Ri),s[0]=Ri.x,s[4]=Ea.x,s[8]=xn.x,s[1]=Ri.y,s[5]=Ea.y,s[9]=xn.y,s[2]=Ri.z,s[6]=Ea.z,s[10]=xn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],h=n[12],u=n[1],p=n[5],c=n[9],d=n[13],f=n[2],_=n[6],g=n[10],m=n[14],T=n[3],b=n[7],v=n[11],M=n[15],S=s[0],A=s[4],x=s[8],E=s[12],C=s[1],P=s[5],D=s[9],O=s[13],I=s[2],F=s[6],V=s[10],W=s[14],st=s[3],X=s[7],tt=s[11],it=s[15];return r[0]=o*S+a*C+l*I+h*st,r[4]=o*A+a*P+l*F+h*X,r[8]=o*x+a*D+l*V+h*tt,r[12]=o*E+a*O+l*W+h*it,r[1]=u*S+p*C+c*I+d*st,r[5]=u*A+p*P+c*F+d*X,r[9]=u*x+p*D+c*V+d*tt,r[13]=u*E+p*O+c*W+d*it,r[2]=f*S+_*C+g*I+m*st,r[6]=f*A+_*P+g*F+m*X,r[10]=f*x+_*D+g*V+m*tt,r[14]=f*E+_*O+g*W+m*it,r[3]=T*S+b*C+v*I+M*st,r[7]=T*A+b*P+v*F+M*X,r[11]=T*x+b*D+v*V+M*tt,r[15]=T*E+b*O+v*W+M*it,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],h=t[13],u=t[2],p=t[6],c=t[10],d=t[14],f=t[3],_=t[7],g=t[11],m=t[15],T=l*d-h*c,b=a*d-h*p,v=a*c-l*p,M=o*d-h*u,S=o*c-l*u,A=o*p-a*u;return e*(_*T-g*b+m*v)-n*(f*T-g*M+m*S)+s*(f*b-_*M+m*A)-r*(f*v-_*S+g*A)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],l=t[2],h=t[6],u=t[10];return e*(o*u-a*h)-n*(r*u-a*l)+s*(r*h-o*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],h=t[7],u=t[8],p=t[9],c=t[10],d=t[11],f=t[12],_=t[13],g=t[14],m=t[15],T=e*a-n*o,b=e*l-s*o,v=e*h-r*o,M=n*l-s*a,S=n*h-r*a,A=s*h-r*l,x=u*_-p*f,E=u*g-c*f,C=u*m-d*f,P=p*g-c*_,D=p*m-d*_,O=c*m-d*g,I=T*O-b*D+v*P+M*C-S*E+A*x;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let F=1/I;return t[0]=(a*O-l*D+h*P)*F,t[1]=(s*D-n*O-r*P)*F,t[2]=(_*A-g*S+m*M)*F,t[3]=(c*S-p*A-d*M)*F,t[4]=(l*C-o*O-h*E)*F,t[5]=(e*O-s*C+r*E)*F,t[6]=(g*v-f*A-m*b)*F,t[7]=(u*A-c*v+d*b)*F,t[8]=(o*D-a*C+h*x)*F,t[9]=(n*C-e*D-r*x)*F,t[10]=(f*S-_*v+m*T)*F,t[11]=(p*v-u*S-d*T)*F,t[12]=(a*E-o*P-l*x)*F,t[13]=(e*P-n*E+s*x)*F,t[14]=(_*b-f*M-g*T)*F,t[15]=(u*M-p*b+c*T)*F,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,h=r*o,u=r*a;return this.set(h*o+n,h*a-s*l,h*l+s*a,0,h*a+s*l,u*a+n,u*l-s*o,0,h*l-s*a,u*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,h=r+r,u=o+o,p=a+a,c=r*h,d=r*u,f=r*p,_=o*u,g=o*p,m=a*p,T=l*h,b=l*u,v=l*p,M=n.x,S=n.y,A=n.z;return s[0]=(1-(_+m))*M,s[1]=(d+v)*M,s[2]=(f-b)*M,s[3]=0,s[4]=(d-v)*S,s[5]=(1-(c+m))*S,s[6]=(g+T)*S,s[7]=0,s[8]=(f+b)*A,s[9]=(g-T)*A,s[10]=(1-(c+_))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=Gs.set(s[0],s[1],s[2]).length(),a=Gs.set(s[4],s[5],s[6]).length(),l=Gs.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Un.copy(this);let h=1/o,u=1/a,p=1/l;return Un.elements[0]*=h,Un.elements[1]*=h,Un.elements[2]*=h,Un.elements[4]*=u,Un.elements[5]*=u,Un.elements[6]*=u,Un.elements[8]*=p,Un.elements[9]*=p,Un.elements[10]*=p,e.setFromRotationMatrix(Un),n.x=o,n.y=a,n.z=l,this}makePerspective(t,e,n,s,r,o,a=Bn,l=!1){let h=this.elements,u=2*r/(e-t),p=2*r/(n-s),c=(e+t)/(e-t),d=(n+s)/(n-s),f,_;if(l)f=r/(o-r),_=o*r/(o-r);else if(a===Bn)f=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===rr)f=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return h[0]=u,h[4]=0,h[8]=c,h[12]=0,h[1]=0,h[5]=p,h[9]=d,h[13]=0,h[2]=0,h[6]=0,h[10]=f,h[14]=_,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Bn,l=!1){let h=this.elements,u=2/(e-t),p=2/(n-s),c=-(e+t)/(e-t),d=-(n+s)/(n-s),f,_;if(l)f=1/(o-r),_=o/(o-r);else if(a===Bn)f=-2/(o-r),_=-(o+r)/(o-r);else if(a===rr)f=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return h[0]=u,h[4]=0,h[8]=0,h[12]=c,h[1]=0,h[5]=p,h[9]=0,h[13]=d,h[2]=0,h[6]=0,h[10]=f,h[14]=_,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};kl.prototype.isMatrix4=!0;var fe=kl,Gs=new L,Un=new fe,c0=new L(0,0,0),h0=new L(1,1,1),Ri=new L,Ea=new L,xn=new L,Cp=new fe,Rp=new bn,_i=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],h=s[5],u=s[9],p=s[2],c=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(c,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,h)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(Qt(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(-p,d),this._z=Math.atan2(-o,h)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Qt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(c,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,h));break;case"YZX":this._z=Math.asin(Qt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,h),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(c,h),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:Ht("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Cp.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Cp,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Rp.setFromEuler(this),this.setFromQuaternion(Rp,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};_i.DEFAULT_ORDER="XYZ";var cr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},u0=0,Pp=new L,Ws=new bn,ui=new fe,Aa=new L,so=new L,d0=new L,p0=new bn,Ip=new L(1,0,0),Dp=new L(0,1,0),Lp=new L(0,0,1),Np={type:"added"},f0={type:"removed"},Xs={type:"childadded",child:null},Nh={type:"childremoved",child:null},Oe=class i extends zn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:u0++}),this.uuid=ws(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new L,e=new _i,n=new bn,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new fe},normalMatrix:{value:new qt}}),this.matrix=new fe,this.matrixWorld=new fe,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new cr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ws.setFromAxisAngle(t,e),this.quaternion.multiply(Ws),this}rotateOnWorldAxis(t,e){return Ws.setFromAxisAngle(t,e),this.quaternion.premultiply(Ws),this}rotateX(t){return this.rotateOnAxis(Ip,t)}rotateY(t){return this.rotateOnAxis(Dp,t)}rotateZ(t){return this.rotateOnAxis(Lp,t)}translateOnAxis(t,e){return Pp.copy(t).applyQuaternion(this.quaternion),this.position.add(Pp.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ip,t)}translateY(t){return this.translateOnAxis(Dp,t)}translateZ(t){return this.translateOnAxis(Lp,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ui.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Aa.copy(t):Aa.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),so.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ui.lookAt(so,Aa,this.up):ui.lookAt(Aa,so,this.up),this.quaternion.setFromRotationMatrix(ui),s&&(ui.extractRotation(s.matrixWorld),Ws.setFromRotationMatrix(ui),this.quaternion.premultiply(Ws.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Gt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Np),Xs.child=t,this.dispatchEvent(Xs),Xs.child=null):Gt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(f0),Nh.child=t,this.dispatchEvent(Nh),Nh.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ui.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ui.multiply(t.parent.matrixWorld)),t.applyMatrix4(ui),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Np),Xs.child=t,this.dispatchEvent(Xs),Xs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(so,t,d0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(so,p0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let h=0,u=l.length;h<u;h++){let p=l[h];r(t.shapes,p)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,h=this.material.length;l<h;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),h=o(t.textures),u=o(t.images),p=o(t.shapes),c=o(t.skeletons),d=o(t.animations),f=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),h.length>0&&(n.textures=h),u.length>0&&(n.images=u),p.length>0&&(n.shapes=p),c.length>0&&(n.skeletons=c),d.length>0&&(n.animations=d),f.length>0&&(n.nodes=f)}return n.object=s,n;function o(a){let l=[];for(let h in a){let u=a[h];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Oe.DEFAULT_UP=new L(0,1,0);Oe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Oe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Re=class extends Oe{constructor(){super(),this.isGroup=!0,this.type="Group"}},m0={type:"move"},hr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Re,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Re,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Re,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,h=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(h&&t.hand){o=!0;for(let _ of t.hand.values()){let g=e.getJointPose(_,n),m=this._getHandJoint(h,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let u=h.joints["index-finger-tip"],p=h.joints["thumb-tip"],c=u.position.distanceTo(p.position),d=.02,f=.005;h.inputState.pinching&&c>d+f?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&c<=d-f&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(m0)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),h!==null&&(h.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Re;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},zf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pi={h:0,s:0,l:0},Ca={h:0,s:0,l:0};function kh(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Zt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ae){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,se.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=se.workingColorSpace){return this.r=t,this.g=e,this.b=n,se.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=se.workingColorSpace){if(t=ku(t,1),e=Qt(e,0,1),n=Qt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=kh(o,r,t+1/3),this.g=kh(o,r,t),this.b=kh(o,r,t-1/3)}return se.colorSpaceToWorking(this,s),this}setStyle(t,e=Ae){function n(r){r!==void 0&&parseFloat(r)<1&&Ht("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Ht("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Ht("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ae){let n=zf[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Ht("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=gi(t.r),this.g=gi(t.g),this.b=gi(t.b),this}copyLinearToSRGB(t){return this.r=ir(t.r),this.g=ir(t.g),this.b=ir(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ae){return se.workingToColorSpace(je.copy(this),t),Math.round(Qt(je.r*255,0,255))*65536+Math.round(Qt(je.g*255,0,255))*256+Math.round(Qt(je.b*255,0,255))}getHexString(t=Ae){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=se.workingColorSpace){se.workingToColorSpace(je.copy(this),e);let n=je.r,s=je.g,r=je.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,h,u=(a+o)/2;if(a===o)l=0,h=0;else{let p=o-a;switch(h=u<=.5?p/(o+a):p/(2-o-a),o){case n:l=(s-r)/p+(s<r?6:0);break;case s:l=(r-n)/p+2;break;case r:l=(n-s)/p+4;break}l/=6}return t.h=l,t.s=h,t.l=u,t}getRGB(t,e=se.workingColorSpace){return se.workingToColorSpace(je.copy(this),e),t.r=je.r,t.g=je.g,t.b=je.b,t}getStyle(t=Ae){se.workingToColorSpace(je.copy(this),t);let e=je.r,n=je.g,s=je.b;return t!==Ae?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Pi),this.setHSL(Pi.h+t,Pi.s+e,Pi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Pi),t.getHSL(Ca);let n=ho(Pi.h,Ca.h,e),s=ho(Pi.s,Ca.s,e),r=ho(Pi.l,Ca.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},je=new Zt;Zt.NAMES=zf;var gs=class extends Oe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _i,this.environmentIntensity=1,this.environmentRotation=new _i,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},On=new L,di=new L,Uh=new L,pi=new L,Ys=new L,qs=new L,kp=new L,Oh=new L,Fh=new L,Bh=new L,zh=new Ee,$h=new Ee,Hh=new Ee,Ni=class i{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),On.subVectors(t,e),s.cross(On);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){On.subVectors(s,e),di.subVectors(n,e),Uh.subVectors(t,e);let o=On.dot(On),a=On.dot(di),l=On.dot(Uh),h=di.dot(di),u=di.dot(Uh),p=o*h-a*a;if(p===0)return r.set(0,0,0),null;let c=1/p,d=(h*l-a*u)*c,f=(o*u-a*l)*c;return r.set(1-d-f,f,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,pi)===null?!1:pi.x>=0&&pi.y>=0&&pi.x+pi.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,pi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,pi.x),l.addScaledVector(o,pi.y),l.addScaledVector(a,pi.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return zh.setScalar(0),$h.setScalar(0),Hh.setScalar(0),zh.fromBufferAttribute(t,e),$h.fromBufferAttribute(t,n),Hh.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(zh,r.x),o.addScaledVector($h,r.y),o.addScaledVector(Hh,r.z),o}static isFrontFacing(t,e,n,s){return On.subVectors(n,e),di.subVectors(t,e),On.cross(di).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return On.subVectors(this.c,this.b),di.subVectors(this.a,this.b),On.cross(di).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;Ys.subVectors(s,n),qs.subVectors(r,n),Oh.subVectors(t,n);let l=Ys.dot(Oh),h=qs.dot(Oh);if(l<=0&&h<=0)return e.copy(n);Fh.subVectors(t,s);let u=Ys.dot(Fh),p=qs.dot(Fh);if(u>=0&&p<=u)return e.copy(s);let c=l*p-u*h;if(c<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(n).addScaledVector(Ys,o);Bh.subVectors(t,r);let d=Ys.dot(Bh),f=qs.dot(Bh);if(f>=0&&d<=f)return e.copy(r);let _=d*h-l*f;if(_<=0&&h>=0&&f<=0)return a=h/(h-f),e.copy(n).addScaledVector(qs,a);let g=u*f-d*p;if(g<=0&&p-u>=0&&d-f>=0)return kp.subVectors(r,s),a=(p-u)/(p-u+(d-f)),e.copy(s).addScaledVector(kp,a);let m=1/(g+_+c);return o=_*m,a=c*m,e.copy(n).addScaledVector(Ys,o).addScaledVector(qs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},dn=class{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Fn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Fn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Fn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Fn):Fn.fromBufferAttribute(r,o),Fn.applyMatrix4(t.matrixWorld),this.expandByPoint(Fn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ra.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ra.copy(n.boundingBox)),Ra.applyMatrix4(t.matrixWorld),this.union(Ra)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Fn),Fn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ro),Pa.subVectors(this.max,ro),Ks.subVectors(t.a,ro),Zs.subVectors(t.b,ro),js.subVectors(t.c,ro),Ii.subVectors(Zs,Ks),Di.subVectors(js,Zs),hs.subVectors(Ks,js);let e=[0,-Ii.z,Ii.y,0,-Di.z,Di.y,0,-hs.z,hs.y,Ii.z,0,-Ii.x,Di.z,0,-Di.x,hs.z,0,-hs.x,-Ii.y,Ii.x,0,-Di.y,Di.x,0,-hs.y,hs.x,0];return!Vh(e,Ks,Zs,js,Pa)||(e=[1,0,0,0,1,0,0,0,1],!Vh(e,Ks,Zs,js,Pa))?!1:(Ia.crossVectors(Ii,Di),e=[Ia.x,Ia.y,Ia.z],Vh(e,Ks,Zs,js,Pa))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Fn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Fn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(fi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},fi=[new L,new L,new L,new L,new L,new L,new L,new L],Fn=new L,Ra=new dn,Ks=new L,Zs=new L,js=new L,Ii=new L,Di=new L,hs=new L,ro=new L,Pa=new L,Ia=new L,us=new L;function Vh(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){us.fromArray(i,r);let a=s.x*Math.abs(us.x)+s.y*Math.abs(us.y)+s.z*Math.abs(us.z),l=t.dot(us),h=e.dot(us),u=n.dot(us);if(Math.max(-Math.max(l,h,u),Math.min(l,h,u))>a)return!1}return!0}var Ne=new L,Da=new at,g0=0,Xe=class extends zn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:g0++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=kf,this.updateRanges=[],this.gpuType=Vn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Da.fromBufferAttribute(this,e),Da.applyMatrix3(t),this.setXY(e,Da.x,Da.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix3(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix4(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyNormalMatrix(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.transformDirection(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=nr(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=rn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=nr(e,this.array)),e}setX(t,e){return this.normalized&&(e=rn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=nr(e,this.array)),e}setY(t,e){return this.normalized&&(e=rn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=nr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=rn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=nr(e,this.array)),e}setW(t,e){return this.normalized&&(e=rn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=rn(e,this.array),n=rn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=rn(e,this.array),n=rn(n,this.array),s=rn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=rn(e,this.array),n=rn(n,this.array),s=rn(s,this.array),r=rn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var vo=class extends Xe{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var yo=class extends Xe{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var de=class extends Xe{constructor(t,e,n){super(new Float32Array(t),e,n)}},_0=new dn,oo=new L,Gh=new L,_s=class{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):_0.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;oo.subVectors(t,this.center);let e=oo.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(oo,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Gh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(oo.copy(t.center).add(Gh)),this.expandByPoint(oo.copy(t.center).sub(Gh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},x0=0,Cn=new fe,Wh=new Oe,Js=new L,vn=new dn,ao=new dn,$e=new L,ke=class i extends zn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:x0++}),this.uuid=ws(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Hg(t)?yo:vo)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new qt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Cn.makeRotationFromQuaternion(t),this.applyMatrix4(Cn),this}rotateX(t){return Cn.makeRotationX(t),this.applyMatrix4(Cn),this}rotateY(t){return Cn.makeRotationY(t),this.applyMatrix4(Cn),this}rotateZ(t){return Cn.makeRotationZ(t),this.applyMatrix4(Cn),this}translate(t,e,n){return Cn.makeTranslation(t,e,n),this.applyMatrix4(Cn),this}scale(t,e,n){return Cn.makeScale(t,e,n),this.applyMatrix4(Cn),this}lookAt(t){return Wh.lookAt(t),Wh.updateMatrix(),this.applyMatrix4(Wh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Js).negate(),this.translate(Js.x,Js.y,Js.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new de(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Ht("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new dn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Gt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];vn.setFromBufferAttribute(r),this.morphTargetsRelative?($e.addVectors(this.boundingBox.min,vn.min),this.boundingBox.expandByPoint($e),$e.addVectors(this.boundingBox.max,vn.max),this.boundingBox.expandByPoint($e)):(this.boundingBox.expandByPoint(vn.min),this.boundingBox.expandByPoint(vn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Gt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _s);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Gt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){let n=this.boundingSphere.center;if(vn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];ao.setFromBufferAttribute(a),this.morphTargetsRelative?($e.addVectors(vn.min,ao.min),vn.expandByPoint($e),$e.addVectors(vn.max,ao.max),vn.expandByPoint($e)):(vn.expandByPoint(ao.min),vn.expandByPoint(ao.max))}vn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)$e.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared($e));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let h=0,u=a.count;h<u;h++)$e.fromBufferAttribute(a,h),l&&(Js.fromBufferAttribute(t,h),$e.add(Js)),s=Math.max(s,n.distanceToSquared($e))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Gt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Gt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Xe(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[];for(let x=0;x<n.count;x++)a[x]=new L,l[x]=new L;let h=new L,u=new L,p=new L,c=new at,d=new at,f=new at,_=new L,g=new L;function m(x,E,C){h.fromBufferAttribute(n,x),u.fromBufferAttribute(n,E),p.fromBufferAttribute(n,C),c.fromBufferAttribute(r,x),d.fromBufferAttribute(r,E),f.fromBufferAttribute(r,C),u.sub(h),p.sub(h),d.sub(c),f.sub(c);let P=1/(d.x*f.y-f.x*d.y);isFinite(P)&&(_.copy(u).multiplyScalar(f.y).addScaledVector(p,-d.y).multiplyScalar(P),g.copy(p).multiplyScalar(d.x).addScaledVector(u,-f.x).multiplyScalar(P),a[x].add(_),a[E].add(_),a[C].add(_),l[x].add(g),l[E].add(g),l[C].add(g))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let x=0,E=T.length;x<E;++x){let C=T[x],P=C.start,D=C.count;for(let O=P,I=P+D;O<I;O+=3)m(t.getX(O+0),t.getX(O+1),t.getX(O+2))}let b=new L,v=new L,M=new L,S=new L;function A(x){M.fromBufferAttribute(s,x),S.copy(M);let E=a[x];b.copy(E),b.sub(M.multiplyScalar(M.dot(E))).normalize(),v.crossVectors(S,E);let P=v.dot(l[x])<0?-1:1;o.setXYZW(x,b.x,b.y,b.z,P)}for(let x=0,E=T.length;x<E;++x){let C=T[x],P=C.start,D=C.count;for(let O=P,I=P+D;O<I;O+=3)A(t.getX(O+0)),A(t.getX(O+1)),A(t.getX(O+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Xe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let c=0,d=n.count;c<d;c++)n.setXYZ(c,0,0,0);let s=new L,r=new L,o=new L,a=new L,l=new L,h=new L,u=new L,p=new L;if(t)for(let c=0,d=t.count;c<d;c+=3){let f=t.getX(c+0),_=t.getX(c+1),g=t.getX(c+2);s.fromBufferAttribute(e,f),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,g),u.subVectors(o,r),p.subVectors(s,r),u.cross(p),a.fromBufferAttribute(n,f),l.fromBufferAttribute(n,_),h.fromBufferAttribute(n,g),a.add(u),l.add(u),h.add(u),n.setXYZ(f,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,h.x,h.y,h.z)}else for(let c=0,d=e.count;c<d;c+=3)s.fromBufferAttribute(e,c+0),r.fromBufferAttribute(e,c+1),o.fromBufferAttribute(e,c+2),u.subVectors(o,r),p.subVectors(s,r),u.cross(p),n.setXYZ(c+0,u.x,u.y,u.z),n.setXYZ(c+1,u.x,u.y,u.z),n.setXYZ(c+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)$e.fromBufferAttribute(t,e),$e.normalize(),t.setXYZ(e,$e.x,$e.y,$e.z)}toNonIndexed(){function t(a,l){let h=a.array,u=a.itemSize,p=a.normalized,c=new h.constructor(l.length*u),d=0,f=0;for(let _=0,g=l.length;_<g;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*u;for(let m=0;m<u;m++)c[f++]=h[d++]}return new Xe(c,u,p)}if(this.index===null)return Ht("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],h=t(l,n);e.setAttribute(a,h)}let r=this.morphAttributes;for(let a in r){let l=[],h=r[a];for(let u=0,p=h.length;u<p;u++){let c=h[u],d=t(c,n);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let h=o[a];e.addGroup(h.start,h.count,h.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let h in l)l[h]!==void 0&&(t[h]=l[h]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let h=n[l];t.data.attributes[l]=h.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let h=this.morphAttributes[l],u=[];for(let p=0,c=h.length;p<c;p++){let d=h[p];u.push(d.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let h in s){let u=s[h];this.setAttribute(h,u.clone(e))}let r=t.morphAttributes;for(let h in r){let u=[],p=r[h];for(let c=0,d=p.length;c<d;c++)u.push(p[c].clone(e));this.morphAttributes[h]=u}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let h=0,u=o.length;h<u;h++){let p=o[h];this.addGroup(p.start,p.count,p.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Xh=new L,v0=new L,y0=new qt,yn=class{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Xh.subVectors(n,e).cross(v0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(Xh),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||y0.getNormalMatrix(t),s=this.coplanarPoint(Xh).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},b0=0,xi=class extends zn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:b0++}),this.uuid=ws(),this.name="",this.type="Material",this.blending=vr,this.side=Vi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=gu,this.blendDst=_u,this.blendEquation=Ms,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Zt(0,0,0),this.blendAlpha=0,this.depthFunc=sr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Cf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Za,this.stencilZFail=Za,this.stencilZPass=Za,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Ht(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Ht(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Zt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new yn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new at().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new at().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var mi=new L,Yh=new L,La=new L,Na=new L,ki=class{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,mi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=mi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(mi.copy(this.origin).addScaledVector(this.direction,e),mi.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Yh.copy(t).add(e).multiplyScalar(.5),La.copy(e).sub(t).normalize(),Na.copy(this.origin).sub(Yh);let r=t.distanceTo(e)*.5,o=-this.direction.dot(La),a=Na.dot(this.direction),l=-Na.dot(La),h=Na.lengthSq(),u=Math.abs(1-o*o),p,c,d,f;if(u>0)if(p=o*l-a,c=o*a-l,f=r*u,p>=0)if(c>=-f)if(c<=f){let _=1/u;p*=_,c*=_,d=p*(p+o*c+2*a)+c*(o*p+c+2*l)+h}else c=r,p=Math.max(0,-(o*c+a)),d=-p*p+c*(c+2*l)+h;else c=-r,p=Math.max(0,-(o*c+a)),d=-p*p+c*(c+2*l)+h;else c<=-f?(p=Math.max(0,-(-o*r+a)),c=p>0?-r:Math.min(Math.max(-r,-l),r),d=-p*p+c*(c+2*l)+h):c<=f?(p=0,c=Math.min(Math.max(-r,-l),r),d=c*(c+2*l)+h):(p=Math.max(0,-(o*r+a)),c=p>0?r:Math.min(Math.max(-r,-l),r),d=-p*p+c*(c+2*l)+h);else c=o>0?-r:r,p=Math.max(0,-(o*c+a)),d=-p*p+c*(c+2*l)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(Yh).addScaledVector(La,c),d}intersectSphere(t,e){if(t.radius<0)return null;mi.subVectors(t.center,this.origin);let n=mi.dot(this.direction),s=mi.dot(mi)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l,h=1/this.direction.x,u=1/this.direction.y,p=1/this.direction.z,c=this.origin;return h>=0?(n=(t.min.x-c.x)*h,s=(t.max.x-c.x)*h):(n=(t.max.x-c.x)*h,s=(t.min.x-c.x)*h),u>=0?(r=(t.min.y-c.y)*u,o=(t.max.y-c.y)*u):(r=(t.max.y-c.y)*u,o=(t.min.y-c.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),p>=0?(a=(t.min.z-c.z)*p,l=(t.max.z-c.z)*p):(a=(t.max.z-c.z)*p,l=(t.min.z-c.z)*p),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,mi)!==null}intersectTriangle(t,e,n,s,r){let o=this.origin,a=this.direction,l=a.x,h=a.y,u=a.z,p=t.x-o.x,c=t.y-o.y,d=t.z-o.z,f=e.x-o.x,_=e.y-o.y,g=e.z-o.z,m=n.x-o.x,T=n.y-o.y,b=n.z-o.z,v=Math.abs(l),M=Math.abs(h),S=Math.abs(u),A,x,E,C,P,D,O,I,F,V,W,st;if(v>=M&&v>=S?(E=l,D=p,F=f,st=m,l>=0?(A=h,x=u,C=c,P=d,O=_,I=g,V=T,W=b):(A=u,x=h,C=d,P=c,O=g,I=_,V=b,W=T)):M>=S?(E=h,D=c,F=_,st=T,h>=0?(A=u,x=l,C=d,P=p,O=g,I=f,V=b,W=m):(A=l,x=u,C=p,P=d,O=f,I=g,V=m,W=b)):(E=u,D=d,F=g,st=b,u>=0?(A=l,x=h,C=p,P=c,O=f,I=_,V=m,W=T):(A=h,x=l,C=c,P=p,O=_,I=f,V=T,W=m)),E===0)return null;let X=A/E,tt=x/E,it=1/E,Lt=C-X*D,Ct=P-tt*D,ae=O-X*F,ee=I-tt*F,re=V-X*st,j=W-tt*st,et=re*ee-j*ae,bt=Lt*j-Ct*re,Wt=ae*Ct-ee*Lt;if(s){if(et<0||bt<0||Wt<0)return null}else if((et<0||bt<0||Wt<0)&&(et>0||bt>0||Wt>0))return null;let Tt=et+bt+Wt;if(Tt===0)return null;let Xt=it*(et*D+bt*F+Wt*st);return(Tt>0?Xt<0:Xt>0)?null:this.at(Xt/Tt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ge=class extends xi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _i,this.combine=Ul,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Up=new fe,ds=new ki,ka=new _s,Op=new L,Ua=new L,Oa=new L,Fa=new L,qh=new L,Ba=new L,Fp=new L,za=new L,Vt=class extends Oe{constructor(t=new ke,e=new Ge){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Ba.set(0,0,0);for(let l=0,h=r.length;l<h;l++){let u=a[l],p=r[l];u!==0&&(qh.fromBufferAttribute(p,t),o?Ba.addScaledVector(qh,u):Ba.addScaledVector(qh.sub(e),u))}e.add(Ba)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ka.copy(n.boundingSphere),ka.applyMatrix4(r),ds.copy(t.ray).recast(t.near),!(ka.containsPoint(ds.origin)===!1&&(ds.intersectSphere(ka,Op)===null||ds.origin.distanceToSquared(Op)>(t.far-t.near)**2))&&(Up.copy(r).invert(),ds.copy(t.ray).applyMatrix4(Up),!(n.boundingBox!==null&&ds.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ds)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,h=r.attributes.uv,u=r.attributes.uv1,p=r.attributes.normal,c=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let f=0,_=c.length;f<_;f++){let g=c[f],m=o[g.materialIndex],T=Math.max(g.start,d.start),b=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let v=T,M=b;v<M;v+=3){let S=a.getX(v),A=a.getX(v+1),x=a.getX(v+2);s=$a(this,m,t,n,h,u,p,S,A,x),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let f=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let g=f,m=_;g<m;g+=3){let T=a.getX(g),b=a.getX(g+1),v=a.getX(g+2);s=$a(this,o,t,n,h,u,p,T,b,v),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let f=0,_=c.length;f<_;f++){let g=c[f],m=o[g.materialIndex],T=Math.max(g.start,d.start),b=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let v=T,M=b;v<M;v+=3){let S=v,A=v+1,x=v+2;s=$a(this,m,t,n,h,u,p,S,A,x),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let f=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let g=f,m=_;g<m;g+=3){let T=g,b=g+1,v=g+2;s=$a(this,o,t,n,h,u,p,T,b,v),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};function M0(i,t,e,n,s,r,o,a){let l;if(t.side===an?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===Vi,a),l===null)return null;za.copy(a),za.applyMatrix4(i.matrixWorld);let h=e.ray.origin.distanceTo(za);return h<e.near||h>e.far?null:{distance:h,point:za.clone(),object:i}}function $a(i,t,e,n,s,r,o,a,l,h){i.getVertexPosition(a,Ua),i.getVertexPosition(l,Oa),i.getVertexPosition(h,Fa);let u=M0(i,t,e,n,Ua,Oa,Fa,Fp);if(u){let p=new L;Ni.getBarycoord(Fp,Ua,Oa,Fa,p),s&&(u.uv=Ni.getInterpolatedAttribute(s,a,l,h,p,new at)),r&&(u.uv1=Ni.getInterpolatedAttribute(r,a,l,h,p,new at)),o&&(u.normal=Ni.getInterpolatedAttribute(o,a,l,h,p,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let c={a,b:l,c:h,normal:new L,materialIndex:0};Ni.getNormal(Ua,Oa,Fa,c.normal),u.face=c,u.barycoord=p}return u}var hl=class extends on{constructor(t=null,e=1,n=1,s,r,o,a,l,h=Ve,u=Ve,p,c){super(null,o,a,l,h,u,s,r,p,c),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ps=new _s,S0=new at(.5,.5),Ha=new L,ur=class{constructor(t=new yn,e=new yn,n=new yn,s=new yn,r=new yn,o=new yn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Bn,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],h=r[3],u=r[4],p=r[5],c=r[6],d=r[7],f=r[8],_=r[9],g=r[10],m=r[11],T=r[12],b=r[13],v=r[14],M=r[15];if(s[0].setComponents(h-o,d-u,m-f,M-T).normalize(),s[1].setComponents(h+o,d+u,m+f,M+T).normalize(),s[2].setComponents(h+a,d+p,m+_,M+b).normalize(),s[3].setComponents(h-a,d-p,m-_,M-b).normalize(),n)s[4].setComponents(l,c,g,v).normalize(),s[5].setComponents(h-l,d-c,m-g,M-v).normalize();else if(s[4].setComponents(h-l,d-c,m-g,M-v).normalize(),e===Bn)s[5].setComponents(h+l,d+c,m+g,M+v).normalize();else if(e===rr)s[5].setComponents(l,c,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ps.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ps.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ps)}intersectsSprite(t){ps.center.set(0,0,0);let e=S0.distanceTo(t.center);return ps.radius=.7071067811865476+e,ps.applyMatrix4(t.matrixWorld),this.intersectsSphere(ps)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Ha.x=s.normal.x>0?t.max.x:t.min.x,Ha.y=s.normal.y>0?t.max.y:t.min.y,Ha.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ha)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ul=class extends xi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Zt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Bp=new fe,su=new ki,Va=new _s,Ga=new L,bo=class extends Oe{constructor(t=new ke,e=new ul){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Va.copy(n.boundingSphere),Va.applyMatrix4(s),Va.radius+=r,t.ray.intersectsSphere(Va)===!1)return;Bp.copy(s).invert(),su.copy(t.ray).applyMatrix4(Bp);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,h=n.index,p=n.attributes.position;if(h!==null){let c=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let f=c,_=d;f<_;f++){let g=h.getX(f);Ga.fromBufferAttribute(p,g),zp(Ga,g,l,s,t,e,this)}}else{let c=Math.max(0,o.start),d=Math.min(p.count,o.start+o.count);for(let f=c,_=d;f<_;f++)Ga.fromBufferAttribute(p,f),zp(Ga,f,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function zp(i,t,e,n,s,r,o){let a=su.distanceSqToPoint(i);if(a<e){let l=new L;su.closestPointToPoint(i,l),l.applyMatrix4(n);let h=s.ray.origin.distanceTo(l);if(h<s.near||h>s.far)return;r.push({distance:h,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Mo=class extends on{constructor(t=[],e=Wi,n,s,r,o,a,l,h,u){super(t,e,n,s,r,o,a,l,h,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},xs=class extends on{constructor(t,e,n,s,r,o,a,l,h){super(t,e,n,s,r,o,a,l,h),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Ui=class extends on{constructor(t,e,n=Hn,s,r,o,a=Ve,l=Ve,h,u=ei,p=1){if(u!==ei&&u!==Yi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let c={width:t,height:e,depth:p};super(c,s,r,o,a,l,u,n,h),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new lr(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},dl=class extends Ui{constructor(t,e=Hn,n=Wi,s,r,o=Ve,a=Ve,l,h=ei){let u={width:t,height:t,depth:1},p=[u,u,u,u,u,u];super(t,t,e,n,s,r,o,a,l,h),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},So=class extends on{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},be=class i extends ke{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],h=[],u=[],p=[],c=0,d=0;f("z","y","x",-1,-1,n,e,t,o,r,0),f("z","y","x",1,-1,n,e,-t,o,r,1),f("x","z","y",1,1,t,n,e,s,o,2),f("x","z","y",1,-1,t,n,-e,s,o,3),f("x","y","z",1,-1,t,e,n,s,r,4),f("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new de(h,3)),this.setAttribute("normal",new de(u,3)),this.setAttribute("uv",new de(p,2));function f(_,g,m,T,b,v,M,S,A,x,E){let C=v/A,P=M/x,D=v/2,O=M/2,I=S/2,F=A+1,V=x+1,W=0,st=0,X=new L;for(let tt=0;tt<V;tt++){let it=tt*P-O;for(let Lt=0;Lt<F;Lt++){let Ct=Lt*C-D;X[_]=Ct*T,X[g]=it*b,X[m]=I,h.push(X.x,X.y,X.z),X[_]=0,X[g]=0,X[m]=S>0?1:-1,u.push(X.x,X.y,X.z),p.push(Lt/A),p.push(1-tt/x),W+=1}}for(let tt=0;tt<x;tt++)for(let it=0;it<A;it++){let Lt=c+it+F*tt,Ct=c+it+F*(tt+1),ae=c+(it+1)+F*(tt+1),ee=c+(it+1)+F*tt;l.push(Lt,Ct,ee),l.push(Ct,ae,ee),st+=6}a.addGroup(d,st,E),d+=st,c+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var wo=class i extends ke{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],l=[],h=new L,u=new at;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let p=0,c=3;p<=e;p++,c+=3){let d=n+p/e*s;h.x=t*Math.cos(d),h.y=t*Math.sin(d),o.push(h.x,h.y,h.z),a.push(0,0,1),u.x=(o[c]/t+1)/2,u.y=(o[c+1]/t+1)/2,l.push(u.x,u.y)}for(let p=1;p<=e;p++)r.push(p,p+1,0);this.setIndex(r),this.setAttribute("position",new de(o,3)),this.setAttribute("normal",new de(a,3)),this.setAttribute("uv",new de(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Mn=class i extends ke{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let h=this;s=Math.floor(s),r=Math.floor(r);let u=[],p=[],c=[],d=[],f=0,_=[],g=n/2,m=0;T(),o===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(u),this.setAttribute("position",new de(p,3)),this.setAttribute("normal",new de(c,3)),this.setAttribute("uv",new de(d,2));function T(){let v=new L,M=new L,S=0,A=(e-t)/n;for(let x=0;x<=r;x++){let E=[],C=x/r,P=C*(e-t)+t;for(let D=0;D<=s;D++){let O=D/s,I=O*l+a,F=Math.sin(I),V=Math.cos(I);M.x=P*F,M.y=-C*n+g,M.z=P*V,p.push(M.x,M.y,M.z),v.set(F,A,V).normalize(),c.push(v.x,v.y,v.z),d.push(O,1-C),E.push(f++)}_.push(E)}for(let x=0;x<s;x++)for(let E=0;E<r;E++){let C=_[E][x],P=_[E+1][x],D=_[E+1][x+1],O=_[E][x+1];(t>0||E!==0)&&(u.push(C,P,O),S+=3),(e>0||E!==r-1)&&(u.push(P,D,O),S+=3)}h.addGroup(m,S,0),m+=S}function b(v){let M=f,S=new at,A=new L,x=0,E=v===!0?t:e,C=v===!0?1:-1;for(let D=1;D<=s;D++)p.push(0,g*C,0),c.push(0,C,0),d.push(.5,.5),f++;let P=f;for(let D=0;D<=s;D++){let I=D/s*l+a,F=Math.cos(I),V=Math.sin(I);A.x=E*V,A.y=g*C,A.z=E*F,p.push(A.x,A.y,A.z),c.push(0,C,0),S.x=F*.5+.5,S.y=V*.5*C+.5,d.push(S.x,S.y),f++}for(let D=0;D<s;D++){let O=M+D,I=P+D;v===!0?u.push(I,I+1,O):u.push(I+1,I,O),x+=3}h.addGroup(m,x,v===!0?1:2),m+=x}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Sn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ht("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,l=r-1,h;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),h=n[s]-o,h<0)a=s+1;else if(h>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);let u=n[s],c=n[s+1]-u,d=(o-u)/c;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new at:new L);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new L,s=[],r=[],o=[],a=new L,l=new fe;for(let d=0;d<=t;d++){let f=d/t;s[d]=this.getTangentAt(f,new L)}r[0]=new L,o[0]=new L;let h=Number.MAX_VALUE,u=Math.abs(s[0].x),p=Math.abs(s[0].y),c=Math.abs(s[0].z);u<=h&&(h=u,n.set(1,0,0)),p<=h&&(h=p,n.set(0,1,0)),c<=h&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();let f=Math.acos(Qt(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(a,f))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(Qt(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let f=1;f<=t;f++)r[f].applyMatrix4(l.makeRotationAxis(s[f],d*f)),o[f].crossVectors(s[f],r[f])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},dr=class extends Sn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new at){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(a),h=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),p=Math.sin(this.aRotation),c=l-this.aX,d=h-this.aY;l=c*u-d*p+this.aX,h=c*p+d*u+this.aY}return n.set(l,h)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},pl=class extends dr{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Ou(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,h){s(o,a,h*(a-r),h*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,h,u,p){let c=(o-r)/h-(a-r)/(h+u)+(a-o)/u,d=(a-o)/u-(l-o)/(u+p)+(l-a)/p;c*=u,d*=u,s(o,a,c,d)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var $p=new L,Hp=new L,Kh=new Ou,Zh=new Ou,jh=new Ou,fl=class extends Sn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new L){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let h,u;this.closed||a>0?h=s[(a-1)%r]:(Hp.subVectors(s[0],s[1]).add(s[0]),h=Hp);let p=s[a%r],c=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:($p.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=$p),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,f=Math.pow(h.distanceToSquared(p),d),_=Math.pow(p.distanceToSquared(c),d),g=Math.pow(c.distanceToSquared(u),d);_<1e-4&&(_=1),f<1e-4&&(f=_),g<1e-4&&(g=_),Kh.initNonuniformCatmullRom(h.x,p.x,c.x,u.x,f,_,g),Zh.initNonuniformCatmullRom(h.y,p.y,c.y,u.y,f,_,g),jh.initNonuniformCatmullRom(h.z,p.z,c.z,u.z,f,_,g)}else this.curveType==="catmullrom"&&(Kh.initCatmullRom(h.x,p.x,c.x,u.x,this.tension),Zh.initCatmullRom(h.y,p.y,c.y,u.y,this.tension),jh.initCatmullRom(h.z,p.z,c.z,u.z,this.tension));return n.set(Kh.calc(l),Zh.calc(l),jh.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Vp(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function w0(i,t){let e=1-i;return e*e*t}function T0(i,t){return 2*(1-i)*i*t}function E0(i,t){return i*i*t}function uo(i,t,e,n){return w0(i,t)+T0(i,e)+E0(i,n)}function A0(i,t){let e=1-i;return e*e*e*t}function C0(i,t){let e=1-i;return 3*e*e*i*t}function R0(i,t){return 3*(1-i)*i*i*t}function P0(i,t){return i*i*i*t}function po(i,t,e,n,s){return A0(i,t)+C0(i,e)+R0(i,n)+P0(i,s)}var To=class extends Sn{constructor(t=new at,e=new at,n=new at,s=new at){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new at){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(po(t,s.x,r.x,o.x,a.x),po(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ml=class extends Sn{constructor(t=new L,e=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new L){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(po(t,s.x,r.x,o.x,a.x),po(t,s.y,r.y,o.y,a.y),po(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Eo=class extends Sn{constructor(t=new at,e=new at){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new at){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new at){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},gl=class extends Sn{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ao=class extends Sn{constructor(t=new at,e=new at,n=new at){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new at){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(uo(t,s.x,r.x,o.x),uo(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},_l=class extends Sn{constructor(t=new L,e=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new L){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(uo(t,s.x,r.x,o.x),uo(t,s.y,r.y,o.y),uo(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Co=class extends Sn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new at){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],h=s[o],u=s[o>s.length-2?s.length-1:o+1],p=s[o>s.length-3?s.length-1:o+2];return n.set(Vp(a,l.x,h.x,u.x,p.x),Vp(a,l.y,h.y,u.y,p.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new at().fromArray(s))}return this}},ru=Object.freeze({__proto__:null,ArcCurve:pl,CatmullRomCurve3:fl,CubicBezierCurve:To,CubicBezierCurve3:ml,EllipseCurve:dr,LineCurve:Eo,LineCurve3:gl,QuadraticBezierCurve:Ao,QuadraticBezierCurve3:_l,SplineCurve:Co}),xl=class extends Sn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ru[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],l=a.getLength(),h=l===0?0:1-o/l;return a.getPointAt(h,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let h=0;h<l.length;h++){let u=l[h];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new ru[s.type]().fromJSON(s))}return this}},Ro=class extends xl{constructor(t){super(),this.type="Path",this.currentPoint=new at,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Eo(this.currentPoint.clone(),new at(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new Ao(this.currentPoint.clone(),new at(t,e),new at(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new To(this.currentPoint.clone(),new at(t,e),new at(n,s),new at(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Co(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,l){let h=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+h,e+u,n,s,r,o,a,l),this}absellipse(t,e,n,s,r,o,a,l){let h=new dr(t,e,n,s,r,o,a,l);if(this.curves.length>0){let p=h.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(h);let u=h.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},pr=class extends Ro{constructor(t){super(t),this.uuid=ws(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new Ro().fromJSON(s))}return this}};function I0(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=$f(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,h;if(n&&(r=U0(i,t,r,e)),i.length>80*e){a=i[0],l=i[1];let u=a,p=l;for(let c=e;c<s;c+=e){let d=i[c],f=i[c+1];d<a&&(a=d),f<l&&(l=f),d>u&&(u=d),f>p&&(p=f)}h=Math.max(u-a,p-l),h=h!==0?32767/h:0}return Po(r,o,e,a,l,h,0),o}function $f(i,t,e,n,s){let r;if(s===Y0(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=Gp(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=Gp(o/n|0,i[o],i[o+1],r);return r&&fr(r,r.next)&&(Do(r),r=r.next),r}function vs(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(fr(e,e.next)||Ce(e.prev,e,e.next)===0)){if(Do(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Po(i,t,e,n,s,r,o){if(!i)return;!o&&r&&$0(i,n,s,r);let a=i;for(;i.prev!==i.next;){let l=i.prev,h=i.next;if(r?L0(i,n,s,r):D0(i)){t.push(l.i,i.i,h.i),Do(i),i=h.next,a=h.next;continue}if(i=h,i===a){o?o===1?(i=N0(vs(i),t),Po(i,t,e,n,s,r,2)):o===2&&k0(i,t,e,n,s,r):Po(vs(i),t,e,n,s,r,1);break}}}function D0(i){let t=i.prev,e=i,n=i.next;if(Ce(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,l=e.y,h=n.y,u=Math.min(s,r,o),p=Math.min(a,l,h),c=Math.max(s,r,o),d=Math.max(a,l,h),f=n.next;for(;f!==t;){if(f.x>=u&&f.x<=c&&f.y>=p&&f.y<=d&&lo(s,a,r,l,o,h,f.x,f.y)&&Ce(f.prev,f,f.next)>=0)return!1;f=f.next}return!0}function L0(i,t,e,n){let s=i.prev,r=i,o=i.next;if(Ce(s,r,o)>=0)return!1;let a=s.x,l=r.x,h=o.x,u=s.y,p=r.y,c=o.y,d=Math.min(a,l,h),f=Math.min(u,p,c),_=Math.max(a,l,h),g=Math.max(u,p,c),m=ou(d,f,t,e,n),T=ou(_,g,t,e,n),b=i.prevZ,v=i.nextZ;for(;b&&b.z>=m&&v&&v.z<=T;){if(b.x>=d&&b.x<=_&&b.y>=f&&b.y<=g&&b!==s&&b!==o&&lo(a,u,l,p,h,c,b.x,b.y)&&Ce(b.prev,b,b.next)>=0||(b=b.prevZ,v.x>=d&&v.x<=_&&v.y>=f&&v.y<=g&&v!==s&&v!==o&&lo(a,u,l,p,h,c,v.x,v.y)&&Ce(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;b&&b.z>=m;){if(b.x>=d&&b.x<=_&&b.y>=f&&b.y<=g&&b!==s&&b!==o&&lo(a,u,l,p,h,c,b.x,b.y)&&Ce(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;v&&v.z<=T;){if(v.x>=d&&v.x<=_&&v.y>=f&&v.y<=g&&v!==s&&v!==o&&lo(a,u,l,p,h,c,v.x,v.y)&&Ce(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function N0(i,t){let e=i;do{let n=e.prev,s=e.next.next;!fr(n,s)&&Vf(n,e,e.next,s)&&Io(n,s)&&Io(s,n)&&(t.push(n.i,e.i,s.i),Do(e),Do(e.next),e=i=s),e=e.next}while(e!==i);return vs(e)}function k0(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&G0(o,a)){let l=Gf(o,a);o=vs(o,o.next),l=vs(l,l.next),Po(o,t,e,n,s,r,0),Po(l,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function U0(i,t,e,n){let s=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*n,l=r<o-1?t[r+1]*n:i.length,h=$f(i,a,l,n,!1);h===h.next&&(h.steiner=!0),s.push(V0(h))}s.sort(O0);for(let r=0;r<s.length;r++)e=F0(s[r],e);return e}function O0(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function F0(i,t){let e=B0(i,t);if(!e)return t;let n=Gf(e,i);return vs(n,n.next),vs(e,e.next)}function B0(i,t){let e=t,n=i.x,s=i.y,r=-1/0,o;if(fr(i,e))return e;do{if(fr(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let p=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(p<=n&&p>r&&(r=p,o=e.x<e.next.x?e:e.next,p===n))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,l=o.x,h=o.y,u=1/0;e=o;do{if(n>=e.x&&e.x>=l&&n!==e.x&&Hf(s<h?n:r,s,l,h,s<h?r:n,s,e.x,e.y)){let p=Math.abs(s-e.y)/(n-e.x);Io(e,i)&&(p<u||p===u&&(e.x>o.x||e.x===o.x&&z0(o,e)))&&(o=e,u=p)}e=e.next}while(e!==a);return o}function z0(i,t){return Ce(i.prev,i,t.prev)<0&&Ce(t.next,i,i.next)<0}function $0(i,t,e,n){let s=i;do s.z===0&&(s.z=ou(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,H0(s)}function H0(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let h=0;h<e&&(a++,o=o.nextZ,!!o);h++);let l=e;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function ou(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function V0(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Hf(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function lo(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&Hf(i,t,e,n,s,r,o,a)}function G0(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!W0(i,t)&&(Io(i,t)&&Io(t,i)&&X0(i,t)&&(Ce(i.prev,i,t.prev)||Ce(i,t.prev,t))||fr(i,t)&&Ce(i.prev,i,i.next)>0&&Ce(t.prev,t,t.next)>0)}function Ce(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function fr(i,t){return i.x===t.x&&i.y===t.y}function Vf(i,t,e,n){let s=Xa(Ce(i,t,e)),r=Xa(Ce(i,t,n)),o=Xa(Ce(e,n,i)),a=Xa(Ce(e,n,t));return!!(s!==r&&o!==a||s===0&&Wa(i,e,t)||r===0&&Wa(i,n,t)||o===0&&Wa(e,i,n)||a===0&&Wa(e,t,n))}function Wa(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Xa(i){return i>0?1:i<0?-1:0}function W0(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Vf(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Io(i,t){return Ce(i.prev,i,i.next)<0?Ce(i,t,i.next)>=0&&Ce(i,i.prev,t)>=0:Ce(i,t,i.prev)<0||Ce(i,i.next,t)<0}function X0(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Gf(i,t){let e=au(i.i,i.x,i.y),n=au(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Gp(i,t,e,n){let s=au(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Do(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function au(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Y0(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var lu=class{static triangulate(t,e,n=2){return I0(t,e,n)}},fs=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];Wp(t),Xp(n,t);let o=t.length;e.forEach(Wp);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,Xp(n,e[l]);let a=lu.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function Wp(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Xp(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var Lo=class i extends ke{constructor(t=new pr([new at(.5,.5),new at(-.5,.5),new at(-.5,-.5),new at(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let a=0,l=t.length;a<l;a++){let h=t[a];o(h)}this.setAttribute("position",new de(s,3)),this.setAttribute("uv",new de(r,2)),this.computeVertexNormals();function o(a){let l=[],h=e.curveSegments!==void 0?e.curveSegments:12,u=e.steps!==void 0?e.steps:1,p=e.depth!==void 0?e.depth:1,c=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,f=e.bevelSize!==void 0?e.bevelSize:d-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3,m=e.extrudePath,T=e.UVGenerator!==void 0?e.UVGenerator:q0,b,v=!1,M,S,A,x;if(m){b=m.getSpacedPoints(u),v=!0,c=!1;let nt=m.isCatmullRomCurve3?m.closed:!1;M=m.computeFrenetFrames(u,nt),S=new L,A=new L,x=new L}c||(g=0,d=0,f=0,_=0);let E=a.extractPoints(h),C=E.shape,P=E.holes;if(!fs.isClockWise(C)){C=C.reverse();for(let nt=0,lt=P.length;nt<lt;nt++){let ht=P[nt];fs.isClockWise(ht)&&(P[nt]=ht.reverse())}}function O(nt){let ht=10000000000000001e-36,ut=nt[0];for(let ft=1;ft<=nt.length;ft++){let Bt=ft%nt.length,Ot=nt[Bt],Yt=Ot.x-ut.x,Kt=Ot.y-ut.y,N=Yt*Yt+Kt*Kt,le=Math.max(Math.abs(Ot.x),Math.abs(Ot.y),Math.abs(ut.x),Math.abs(ut.y)),ne=ht*le*le;if(N<=ne){nt.splice(Bt,1),ft--;continue}ut=Ot}}O(C),P.forEach(O);let I=P.length,F=C;for(let nt=0;nt<I;nt++){let lt=P[nt];C=C.concat(lt)}function V(nt,lt,ht){return lt||Gt("ExtrudeGeometry: vec does not exist"),nt.clone().addScaledVector(lt,ht)}let W=C.length;function st(nt,lt,ht){let ut,ft,Bt,Ot=nt.x-lt.x,Yt=nt.y-lt.y,Kt=ht.x-nt.x,N=ht.y-nt.y,le=Ot*Ot+Yt*Yt,ne=Ot*N-Yt*Kt;if(Math.abs(ne)>Number.EPSILON){let R=Math.sqrt(le),y=Math.sqrt(Kt*Kt+N*N),B=lt.x-Yt/R,H=lt.y+Ot/R,K=ht.x-N/y,dt=ht.y+Kt/y,pt=((K-B)*N-(dt-H)*Kt)/(Ot*N-Yt*Kt);ut=B+Ot*pt-nt.x,ft=H+Yt*pt-nt.y;let Z=ut*ut+ft*ft;if(Z<=2)return new at(ut,ft);Bt=Math.sqrt(Z/2)}else{let R=!1;Ot>Number.EPSILON?Kt>Number.EPSILON&&(R=!0):Ot<-Number.EPSILON?Kt<-Number.EPSILON&&(R=!0):Math.sign(Yt)===Math.sign(N)&&(R=!0),R?(ut=-Yt,ft=Ot,Bt=Math.sqrt(le)):(ut=Ot,ft=Yt,Bt=Math.sqrt(le/2))}return new at(ut/Bt,ft/Bt)}let X=[];for(let nt=0,lt=F.length,ht=lt-1,ut=nt+1;nt<lt;nt++,ht++,ut++)ht===lt&&(ht=0),ut===lt&&(ut=0),X[nt]=st(F[nt],F[ht],F[ut]);let tt=[],it,Lt=X.concat();for(let nt=0,lt=I;nt<lt;nt++){let ht=P[nt];it=[];for(let ut=0,ft=ht.length,Bt=ft-1,Ot=ut+1;ut<ft;ut++,Bt++,Ot++)Bt===ft&&(Bt=0),Ot===ft&&(Ot=0),it[ut]=st(ht[ut],ht[Bt],ht[Ot]);tt.push(it),Lt=Lt.concat(it)}let Ct;if(g===0)Ct=fs.triangulateShape(F,P);else{let nt=[],lt=[];for(let ht=0;ht<g;ht++){let ut=ht/g,ft=d*Math.cos(ut*Math.PI/2),Bt=f*Math.sin(ut*Math.PI/2)+_;for(let Ot=0,Yt=F.length;Ot<Yt;Ot++){let Kt=V(F[Ot],X[Ot],Bt);bt(Kt.x,Kt.y,-ft),ut===0&&nt.push(Kt)}for(let Ot=0,Yt=I;Ot<Yt;Ot++){let Kt=P[Ot];it=tt[Ot];let N=[];for(let le=0,ne=Kt.length;le<ne;le++){let R=V(Kt[le],it[le],Bt);bt(R.x,R.y,-ft),ut===0&&N.push(R)}ut===0&&lt.push(N)}}Ct=fs.triangulateShape(nt,lt)}let ae=Ct.length,ee=f+_;for(let nt=0;nt<W;nt++){let lt=c?V(C[nt],Lt[nt],ee):C[nt];v?(A.copy(M.normals[0]).multiplyScalar(lt.x),S.copy(M.binormals[0]).multiplyScalar(lt.y),x.copy(b[0]).add(A).add(S),bt(x.x,x.y,x.z)):bt(lt.x,lt.y,0)}for(let nt=1;nt<=u;nt++)for(let lt=0;lt<W;lt++){let ht=c?V(C[lt],Lt[lt],ee):C[lt];v?(A.copy(M.normals[nt]).multiplyScalar(ht.x),S.copy(M.binormals[nt]).multiplyScalar(ht.y),x.copy(b[nt]).add(A).add(S),bt(x.x,x.y,x.z)):bt(ht.x,ht.y,p/u*nt)}for(let nt=g-1;nt>=0;nt--){let lt=nt/g,ht=d*Math.cos(lt*Math.PI/2),ut=f*Math.sin(lt*Math.PI/2)+_;for(let ft=0,Bt=F.length;ft<Bt;ft++){let Ot=V(F[ft],X[ft],ut);bt(Ot.x,Ot.y,p+ht)}for(let ft=0,Bt=P.length;ft<Bt;ft++){let Ot=P[ft];it=tt[ft];for(let Yt=0,Kt=Ot.length;Yt<Kt;Yt++){let N=V(Ot[Yt],it[Yt],ut);v?bt(N.x,N.y+b[u-1].y,b[u-1].x+ht):bt(N.x,N.y,p+ht)}}}re(),j();function re(){let nt=s.length/3;if(c){let lt=0,ht=W*lt;for(let ut=0;ut<ae;ut++){let ft=Ct[ut];Wt(ft[2]+ht,ft[1]+ht,ft[0]+ht)}lt=u+g*2,ht=W*lt;for(let ut=0;ut<ae;ut++){let ft=Ct[ut];Wt(ft[0]+ht,ft[1]+ht,ft[2]+ht)}}else{for(let lt=0;lt<ae;lt++){let ht=Ct[lt];Wt(ht[2],ht[1],ht[0])}for(let lt=0;lt<ae;lt++){let ht=Ct[lt];Wt(ht[0]+W*u,ht[1]+W*u,ht[2]+W*u)}}n.addGroup(nt,s.length/3-nt,0)}function j(){let nt=s.length/3,lt=0;et(F,lt),lt+=F.length;for(let ht=0,ut=P.length;ht<ut;ht++){let ft=P[ht];et(ft,lt),lt+=ft.length}n.addGroup(nt,s.length/3-nt,1)}function et(nt,lt){let ht=nt.length;for(;--ht>=0;){let ut=ht,ft=ht-1;ft<0&&(ft=nt.length-1);for(let Bt=0,Ot=u+g*2;Bt<Ot;Bt++){let Yt=W*Bt,Kt=W*(Bt+1),N=lt+ut+Yt,le=lt+ft+Yt,ne=lt+ft+Kt,R=lt+ut+Kt;Tt(N,le,ne,R)}}}function bt(nt,lt,ht){l.push(nt),l.push(lt),l.push(ht)}function Wt(nt,lt,ht){Xt(nt),Xt(lt),Xt(ht);let ut=s.length/3,ft=T.generateTopUV(n,s,ut-3,ut-2,ut-1);pe(ft[0]),pe(ft[1]),pe(ft[2])}function Tt(nt,lt,ht,ut){Xt(nt),Xt(lt),Xt(ut),Xt(lt),Xt(ht),Xt(ut);let ft=s.length/3,Bt=T.generateSideWallUV(n,s,ft-6,ft-3,ft-2,ft-1);pe(Bt[0]),pe(Bt[1]),pe(Bt[3]),pe(Bt[1]),pe(Bt[2]),pe(Bt[3])}function Xt(nt){s.push(l[nt*3+0]),s.push(l[nt*3+1]),s.push(l[nt*3+2])}function pe(nt){r.push(nt.x),r.push(nt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return K0(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new ru[s.type]().fromJSON(s)),new i(n,t.options)}},q0={generateTopUV:function(i,t,e,n,s){let r=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],h=t[s*3],u=t[s*3+1];return[new at(r,o),new at(a,l),new at(h,u)]},generateSideWallUV:function(i,t,e,n,s,r){let o=t[e*3],a=t[e*3+1],l=t[e*3+2],h=t[n*3],u=t[n*3+1],p=t[n*3+2],c=t[s*3],d=t[s*3+1],f=t[s*3+2],_=t[r*3],g=t[r*3+1],m=t[r*3+2];return Math.abs(a-u)<Math.abs(o-h)?[new at(o,1-l),new at(h,1-p),new at(c,1-f),new at(_,1-m)]:[new at(a,1-l),new at(u,1-p),new at(d,1-f),new at(g,1-m)]}};function K0(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Rn=class i extends ke{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),h=a+1,u=l+1,p=t/a,c=e/l,d=[],f=[],_=[],g=[];for(let m=0;m<u;m++){let T=m*c-o;for(let b=0;b<h;b++){let v=b*p-r;f.push(v,-T,0),_.push(0,0,1),g.push(b/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let T=0;T<a;T++){let b=T+h*m,v=T+h*(m+1),M=T+1+h*(m+1),S=T+1+h*m;d.push(b,v,S),d.push(v,M,S)}this.setIndex(d),this.setAttribute("position",new de(f,3)),this.setAttribute("normal",new de(_,3)),this.setAttribute("uv",new de(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},No=class i extends ke{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],l=[],h=[],u=[],p=t,c=(e-t)/s,d=new L,f=new at;for(let _=0;_<=s;_++){for(let g=0;g<=n;g++){let m=r+g/n*o;d.x=p*Math.cos(m),d.y=p*Math.sin(m),l.push(d.x,d.y,d.z),h.push(0,0,1),f.x=(d.x/e+1)/2,f.y=(d.y/e+1)/2,u.push(f.x,f.y)}p+=c}for(let _=0;_<s;_++){let g=_*(n+1);for(let m=0;m<n;m++){let T=m+g,b=T,v=T+n+1,M=T+n+2,S=T+1;a.push(b,v,S),a.push(v,M,S)}}this.setIndex(a),this.setAttribute("position",new de(l,3)),this.setAttribute("normal",new de(h,3)),this.setAttribute("uv",new de(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var Oi=class i extends ke{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),h=0,u=[],p=new L,c=new L,d=[],f=[],_=[],g=[];for(let m=0;m<=n;m++){let T=[],b=m/n,v=o+b*a,M=t*Math.cos(v),S=Math.sqrt(t*t-M*M),A=0;m===0&&o===0?A=.5/e:m===n&&l===Math.PI&&(A=-.5/e);for(let x=0;x<=e;x++){let E=x/e,C=s+E*r;p.x=-S*Math.cos(C),p.y=M,p.z=S*Math.sin(C),f.push(p.x,p.y,p.z),c.copy(p).normalize(),_.push(c.x,c.y,c.z),g.push(E+A,1-b),T.push(h++)}u.push(T)}for(let m=0;m<n;m++)for(let T=0;T<e;T++){let b=u[m][T+1],v=u[m][T],M=u[m+1][T],S=u[m+1][T+1];(m!==0||o>0)&&d.push(b,v,S),(m!==n-1||l<Math.PI)&&d.push(v,M,S)}this.setIndex(d),this.setAttribute("position",new de(f,3)),this.setAttribute("normal",new de(_,3)),this.setAttribute("uv",new de(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function Ts(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(Yp(s))s.isRenderTargetTexture?(Ht("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Yp(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Qe(i){let t={};for(let e=0;e<i.length;e++){let n=Ts(i[e]);for(let s in n)t[s]=n[s]}return t}function Yp(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Z0(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Fu(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:se.workingColorSpace}var Wf={clone:Ts,merge:Qe},j0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,J0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Je=class extends xi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=j0,this.fragmentShader=J0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ts(t.uniforms),this.uniformsGroups=Z0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Zt().setHex(s.value);break;case"v2":this.uniforms[n].value=new at().fromArray(s.value);break;case"v3":this.uniforms[n].value=new L().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Ee().fromArray(s.value);break;case"m3":this.uniforms[n].value=new qt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new fe().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},vl=class extends Je{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var pn=class extends xi{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Mc,this.normalScale=new at(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _i,this.combine=Ul,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},yl=class extends xi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ef,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},bl=class extends xi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Qs(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Jh(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Fi=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ml=class extends Fi{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:eu,endingEnd:eu}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case nu:r=t,a=2*e-n;break;case iu:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case nu:o=t,l=2*n-e;break;case iu:o=1,l=n+s[1]-s[0];break;default:o=t-1,l=e}let h=(n-e)*.5,u=this.valueSize;this._weightPrev=h/(e-a),this._weightNext=h/(l-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,h=l-a,u=this._offsetPrev,p=this._offsetNext,c=this._weightPrev,d=this._weightNext,f=(n-e)/(s-e),_=f*f,g=_*f,m=-c*g+2*c*_-c*f,T=(1+c)*g+(-1.5-2*c)*_+(-.5+c)*f+1,b=(-1-d)*g+(1.5+d)*_+.5*f,v=d*g-d*_;for(let M=0;M!==a;++M)r[M]=m*o[u+M]+T*o[h+M]+b*o[l+M]+v*o[p+M];return r}},Sl=class extends Fi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,h=l-a,u=(n-e)/(s-e),p=1-u;for(let c=0;c!==a;++c)r[c]=o[h+c]*p+o[l+c]*u;return r}},wl=class extends Fi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Tl=class extends Fi{interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,h=l-a,u=this.inTangents,p=this.outTangents;if(!u||!p){let f=(n-e)/(s-e),_=1-f;for(let g=0;g!==a;++g)r[g]=o[h+g]*_+o[l+g]*f;return r}let c=a*2,d=t-1;for(let f=0;f!==a;++f){let _=o[h+f],g=o[l+f],m=d*c+f*2,T=p[m],b=p[m+1],v=t*c+f*2,M=u[v],S=u[v+1],A=t_(n,e,T,M,s);r[f]=Xf(A,_,b,S,g)}return r}};function Xf(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function Q0(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function t_(i,t,e,n,s){let r=(i-t)/(s-t);for(let o=0;o<8;o++){let a=Xf(r,t,e,n,s)-i;if(Math.abs(a)<1e-10)break;let l=Q0(r,t,e,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var wn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Qs(e,this.TimeBufferType),this.values=Qs(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Qs(t.times,Array),values:Qs(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),Jh(t.settings)&&(n.settings={inTangents:Qs(t.settings.inTangents,Array),outTangents:Qs(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new wl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Sl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ml(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Tl(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case fo:e=this.InterpolantFactoryMethodDiscrete;break;case ol:e=this.InterpolantFactoryMethodLinear;break;case Ka:e=this.InterpolantFactoryMethodSmooth;break;case tu:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ht("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return fo;case this.InterpolantFactoryMethodLinear:return ol;case this.InterpolantFactoryMethodSmooth:return Ka;case this.InterpolantFactoryMethodBezier:return tu}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;Jh(this.settings)&&(qp(this.settings.inTangents,t),qp(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Gt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Gt("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){Gt("KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){Gt("KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&Vg(s))for(let a=0,l=s.length;a!==l;++a){let h=s[a];if(isNaN(h)){Gt("KeyframeTrack: Value is not a valid number.",this,a,h),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ka,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,h=t[a],u=t[a+1];if(h!==u&&(a!==1||h!==t[0]))if(s)l=!0;else{let p=a*n,c=p-n,d=p+n;for(let f=0;f!==n;++f){let _=e[p+f];if(_!==e[c+f]||_!==e[d+f]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let p=a*n,c=o*n;for(let d=0;d!==n;++d)e[c+d]=e[p+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,h=0;h!==n;++h)e[l+h]=e[a+h];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,Jh(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function qp(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}wn.prototype.ValueTypeName="";wn.prototype.TimeBufferType=Float32Array;wn.prototype.ValueBufferType=Float32Array;wn.prototype.DefaultInterpolation=ol;var Bi=class extends wn{constructor(t,e,n){super(t,e,n)}};Bi.prototype.ValueTypeName="bool";Bi.prototype.ValueBufferType=Array;Bi.prototype.DefaultInterpolation=fo;Bi.prototype.InterpolantFactoryMethodLinear=void 0;Bi.prototype.InterpolantFactoryMethodSmooth=void 0;var El=class extends wn{constructor(t,e,n,s){super(t,e,n,s)}};El.prototype.ValueTypeName="color";var Al=class extends wn{constructor(t,e,n,s){super(t,e,n,s)}};Al.prototype.ValueTypeName="number";var Cl=class extends Fi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(s-e),h=t*a;for(let u=h+a;h!==u;h+=4)bn.slerpFlat(r,0,o,h-a,o,h,l);return r}},ko=class extends wn{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Cl(this.times,this.values,this.getValueSize(),t)}};ko.prototype.ValueTypeName="quaternion";ko.prototype.InterpolantFactoryMethodSmooth=void 0;var zi=class extends wn{constructor(t,e,n){super(t,e,n)}};zi.prototype.ValueTypeName="string";zi.prototype.ValueBufferType=Array;zi.prototype.DefaultInterpolation=fo;zi.prototype.InterpolantFactoryMethodLinear=void 0;zi.prototype.InterpolantFactoryMethodSmooth=void 0;var Rl=class extends wn{constructor(t,e,n,s){super(t,e,n,s)}};Rl.prototype.ValueTypeName="vector";var Pl=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,l,h=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,p){return h.push(u,p),this},this.removeHandler=function(u){let p=h.indexOf(u);return p!==-1&&h.splice(p,2),this},this.getHandler=function(u){for(let p=0,c=h.length;p<c;p+=2){let d=h[p],f=h[p+1];if(d.global&&(d.lastIndex=0),d.test(u))return f}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Yf=new Pl,Il=class{constructor(t){this.manager=t!==void 0?t:Yf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Il.DEFAULT_MATERIAL_NAME="__DEFAULT";var Uo=class extends Oe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Zt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},ys=class extends Uo{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Oe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Zt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Qh=new fe,Kp=new L,Zp=new L,Dl=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new at(512,512),this.mapType=fn,this.map=null,this.mapPass=null,this.matrix=new fe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ur,this._frameExtents=new at(1,1),this._viewportCount=1,this._viewports=[new Ee(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Kp.setFromMatrixPosition(t.matrixWorld),e.position.copy(Kp),Zp.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Zp),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){Qh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Qh,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,l=s?s.x/r.x:0,h=s?s.y/r.y:0;t.coordinateSystem===rr||t.reversedDepth?e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+h,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+h,0,0,.5,.5,0,0,0,1),e.multiply(Qh)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Ya=new L,qa=new bn,Qn=new L,Oo=class extends Oe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new fe,this.projectionMatrix=new fe,this.projectionMatrixInverse=new fe,this.coordinateSystem=Bn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Ya,qa,Qn),Qn.x===1&&Qn.y===1&&Qn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ya,qa,Qn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Ya,qa,Qn),Qn.x===1&&Qn.y===1&&Qn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ya,qa,Qn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Li=new L,jp=new at,Jp=new at,He=class extends Oo{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=ar*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(co*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ar*2*Math.atan(Math.tan(co*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Li.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Li.x,Li.y).multiplyScalar(-t/Li.z),Li.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Li.x,Li.y).multiplyScalar(-t/Li.z)}getViewSize(t,e){return this.getViewBounds(t,jp,Jp),e.subVectors(Jp,jp)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(co*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,h=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/h,s*=o.width/l,n*=o.height/h}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var mr=class extends Oo{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let h=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=h*this.view.offsetX,o=r+h*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},cu=class extends Dl{constructor(){super(new mr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},bs=class extends Uo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Oe.DEFAULT_UP),this.updateMatrix(),this.target=new Oe,this.shadow=new cu}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var tr=-90,er=1,Ll=class extends Oe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new He(tr,er,t,e);s.layers=this.layers,this.add(s);let r=new He(tr,er,t,e);r.layers=this.layers,this.add(r);let o=new He(tr,er,t,e);o.layers=this.layers,this.add(o);let a=new He(tr,er,t,e);a.layers=this.layers,this.add(a);let l=new He(tr,er,t,e);l.layers=this.layers,this.add(l);let h=new He(tr,er,t,e);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(let h of e)this.remove(h);if(t===Bn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===rr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let h of e)this.add(h),h.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,h,u]=this.children,p=t.getRenderTarget(),c=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),f=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(p,c,d),t.xr.enabled=f,n.texture.needsPMREMUpdate=!0}},Nl=class extends He{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Bu="\\[\\]\\.:\\/",e_=new RegExp("["+Bu+"]","g"),zu="[^"+Bu+"]",n_="[^"+Bu.replace("\\.","")+"]",i_=/((?:WC+[\/:])*)/.source.replace("WC",zu),s_=/(WCOD+)?/.source.replace("WCOD",n_),r_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",zu),o_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",zu),a_=new RegExp("^"+i_+s_+r_+o_+"$"),l_=["material","materials","bones","map"],hu=class{constructor(t,e,n){let s=n||Te.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Te=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(e_,"")}static parseTrackName(t){let e=a_.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);l_.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Ht("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let h=e.objectIndex;switch(n){case"materials":if(!t.material){Gt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Gt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Gt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===h){h=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Gt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Gt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Gt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(h!==void 0){if(t[h]===void 0){Gt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[h]}}let o=t[s];if(o===void 0){let h=e.nodeName;Gt("PropertyBinding: Trying to update property for track: "+h+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Gt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Gt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Te.Composite=hu;Te.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Te.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Te.prototype.GetterByBindingType=[Te.prototype._getValue_direct,Te.prototype._getValue_array,Te.prototype._getValue_arrayElement,Te.prototype._getValue_toArray];Te.prototype.SetterByBindingTypeAndVersioning=[[Te.prototype._setValue_direct,Te.prototype._setValue_direct_setNeedsUpdate,Te.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_array,Te.prototype._setValue_array_setNeedsUpdate,Te.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_arrayElement,Te.prototype._setValue_arrayElement_setNeedsUpdate,Te.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_fromArray,Te.prototype._setValue_fromArray_setNeedsUpdate,Te.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var tw=new Float32Array(1);var Qp=new fe,gr=class{constructor(t,e,n=0,s=1/0){this.ray=new ki(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new cr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Gt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Qp.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Qp),this}intersectObject(t,e=!0,n=[]){return uu(t,this,n,e),n.sort(tf),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)uu(t[s],this,n,e);return n.sort(tf),n}};function tf(i,t){return i.distance-t.distance}function uu(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)uu(r[o],t,e,!0)}}var _r=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Qt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Qt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Xu=class Xu{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};Xu.prototype.isMatrix2=!0;var du=Xu;var Fo=class extends zn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function $u(i,t,e,n){let s=c_(n);switch(e){case Pu:return i*t;case Du:return i*t/s.components*s.byteLength;case Vl:return i*t/s.components*s.byteLength;case qi:return i*t*2/s.components*s.byteLength;case Gl:return i*t*2/s.components*s.byteLength;case Iu:return i*t*3/s.components*s.byteLength;case Pn:return i*t*4/s.components*s.byteLength;case Wl:return i*t*4/s.components*s.byteLength;case Ho:case Vo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Go:case Wo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Yl:case Kl:return Math.max(i,16)*Math.max(t,8)/4;case Xl:case ql:return Math.max(i,8)*Math.max(t,8)/2;case Zl:case jl:case Ql:case tc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Jl:case Xo:case ec:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case nc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ic:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case sc:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case rc:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case oc:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ac:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case lc:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case cc:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case hc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case uc:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case dc:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case pc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case fc:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case mc:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case gc:case _c:case xc:return Math.ceil(i/4)*Math.ceil(t/4)*16;case vc:case yc:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Yo:case bc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function c_(i){switch(i){case fn:case Eu:return{byteLength:1,components:1};case yr:case Au:case Gn:return{byteLength:2,components:1};case $l:case Hl:return{byteLength:2,components:4};case Hn:case zl:case Vn:return{byteLength:4,components:1};case Cu:case Ru:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Ht("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function mm(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function __(i){let t=new WeakMap;function e(a,l){let h=a.array,u=a.usage,p=h.byteLength,c=i.createBuffer();i.bindBuffer(l,c),i.bufferData(l,h,u),a.onUploadCallback();let d;if(h instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&h instanceof Float16Array)d=i.HALF_FLOAT;else if(h instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)d=i.SHORT;else if(h instanceof Uint32Array)d=i.UNSIGNED_INT;else if(h instanceof Int32Array)d=i.INT;else if(h instanceof Int8Array)d=i.BYTE;else if(h instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:c,type:d,bytesPerElement:h.BYTES_PER_ELEMENT,version:a.version,size:p}}function n(a,l,h){let u=l.array,p=l.updateRanges;if(i.bindBuffer(h,a),p.length===0)i.bufferSubData(h,0,u);else{p.sort((d,f)=>d.start-f.start);let c=0;for(let d=1;d<p.length;d++){let f=p[c],_=p[d];_.start<=f.start+f.count+1?f.count=Math.max(f.count,_.start+_.count-f.start):(++c,p[c]=_)}p.length=c+1;for(let d=0,f=p.length;d<f;d++){let _=p[d];i.bufferSubData(h,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let h=t.get(a);if(h===void 0)t.set(a,e(a,l));else if(h.version<a.version){if(h.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(h.buffer,a,l),h.version=a.version}}return{get:s,remove:r,update:o}}var x_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,v_=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,y_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,b_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,M_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,S_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,w_=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,T_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,E_=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,A_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,C_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,R_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,P_=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,I_=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,D_=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,L_=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,N_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,k_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,U_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,O_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,F_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,B_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,z_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,$_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,H_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,V_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,G_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,W_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,X_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Y_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,q_="gl_FragColor = linearToOutputTexel( gl_FragColor );",K_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Z_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,j_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,J_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Q_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,tx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ex=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,nx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ix=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,sx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rx=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ox=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ax=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lx=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,cx=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,hx=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,ux=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,dx=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,px=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,fx=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,mx=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,gx=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,_x=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,xx=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,vx=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,yx=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,bx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Mx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Tx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ex=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ax=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Cx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Rx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Px=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ix=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Dx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Lx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Nx=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,kx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ux=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ox=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Fx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,$x=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Hx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Gx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Wx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Xx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Yx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,qx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Kx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Zx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,jx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Qx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,tv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,ev=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,nv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,iv=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,sv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,rv=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ov=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,av=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,lv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,cv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,hv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,uv=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,dv=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,pv=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,fv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,mv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,gv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,_v=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,xv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,vv=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Tv=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ev=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Av=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Cv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Rv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Iv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Dv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Lv=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Nv=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kv=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Uv=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ov=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Bv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,zv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$v=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Vv=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Yv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,qv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Zv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,jv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,te={alphahash_fragment:x_,alphahash_pars_fragment:v_,alphamap_fragment:y_,alphamap_pars_fragment:b_,alphatest_fragment:M_,alphatest_pars_fragment:S_,aomap_fragment:w_,aomap_pars_fragment:T_,batching_pars_vertex:E_,batching_vertex:A_,begin_vertex:C_,beginnormal_vertex:R_,bsdfs:P_,iridescence_fragment:I_,bumpmap_pars_fragment:D_,clipping_planes_fragment:L_,clipping_planes_pars_fragment:N_,clipping_planes_pars_vertex:k_,clipping_planes_vertex:U_,color_fragment:O_,color_pars_fragment:F_,color_pars_vertex:B_,color_vertex:z_,common:$_,cube_uv_reflection_fragment:H_,defaultnormal_vertex:V_,displacementmap_pars_vertex:G_,displacementmap_vertex:W_,emissivemap_fragment:X_,emissivemap_pars_fragment:Y_,colorspace_fragment:q_,colorspace_pars_fragment:K_,envmap_fragment:Z_,envmap_common_pars_fragment:j_,envmap_pars_fragment:J_,envmap_pars_vertex:Q_,envmap_physical_pars_fragment:hx,envmap_vertex:tx,fog_vertex:ex,fog_pars_vertex:nx,fog_fragment:ix,fog_pars_fragment:sx,gradientmap_pars_fragment:rx,lightmap_pars_fragment:ox,lights_lambert_fragment:ax,lights_lambert_pars_fragment:lx,lights_pars_begin:cx,lights_toon_fragment:ux,lights_toon_pars_fragment:dx,lights_phong_fragment:px,lights_phong_pars_fragment:fx,lights_physical_fragment:mx,lights_physical_pars_fragment:gx,lights_fragment_begin:_x,lights_fragment_maps:xx,lights_fragment_end:vx,lightprobes_pars_fragment:yx,logdepthbuf_fragment:bx,logdepthbuf_pars_fragment:Mx,logdepthbuf_pars_vertex:Sx,logdepthbuf_vertex:wx,map_fragment:Tx,map_pars_fragment:Ex,map_particle_fragment:Ax,map_particle_pars_fragment:Cx,metalnessmap_fragment:Rx,metalnessmap_pars_fragment:Px,morphinstance_vertex:Ix,morphcolor_vertex:Dx,morphnormal_vertex:Lx,morphtarget_pars_vertex:Nx,morphtarget_vertex:kx,normal_fragment_begin:Ux,normal_fragment_maps:Ox,normal_pars_fragment:Fx,normal_pars_vertex:Bx,normal_vertex:zx,normalmap_pars_fragment:$x,clearcoat_normal_fragment_begin:Hx,clearcoat_normal_fragment_maps:Vx,clearcoat_pars_fragment:Gx,iridescence_pars_fragment:Wx,opaque_fragment:Xx,packing:Yx,premultiplied_alpha_fragment:qx,project_vertex:Kx,dithering_fragment:Zx,dithering_pars_fragment:jx,roughnessmap_fragment:Jx,roughnessmap_pars_fragment:Qx,shadowmap_pars_fragment:tv,shadowmap_pars_vertex:ev,shadowmap_vertex:nv,shadowmask_pars_fragment:iv,skinbase_vertex:sv,skinning_pars_vertex:rv,skinning_vertex:ov,skinnormal_vertex:av,specularmap_fragment:lv,specularmap_pars_fragment:cv,tonemapping_fragment:hv,tonemapping_pars_fragment:uv,transmission_fragment:dv,transmission_pars_fragment:pv,uv_pars_fragment:fv,uv_pars_vertex:mv,uv_vertex:gv,worldpos_vertex:_v,background_vert:xv,background_frag:vv,backgroundCube_vert:yv,backgroundCube_frag:bv,cube_vert:Mv,cube_frag:Sv,depth_vert:wv,depth_frag:Tv,distance_vert:Ev,distance_frag:Av,equirect_vert:Cv,equirect_frag:Rv,linedashed_vert:Pv,linedashed_frag:Iv,meshbasic_vert:Dv,meshbasic_frag:Lv,meshlambert_vert:Nv,meshlambert_frag:kv,meshmatcap_vert:Uv,meshmatcap_frag:Ov,meshnormal_vert:Fv,meshnormal_frag:Bv,meshphong_vert:zv,meshphong_frag:$v,meshphysical_vert:Hv,meshphysical_frag:Vv,meshtoon_vert:Gv,meshtoon_frag:Wv,points_vert:Xv,points_frag:Yv,shadow_vert:qv,shadow_frag:Kv,sprite_vert:Zv,sprite_frag:jv},yt={common:{diffuse:{value:new Zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qt}},envmap:{envMap:{value:null},envMapRotation:{value:new qt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qt},normalScale:{value:new at(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new Zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0},uvTransform:{value:new qt}},sprite:{diffuse:{value:new Zt(16777215)},opacity:{value:1},center:{value:new at(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}}},si={basic:{uniforms:Qe([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.fog]),vertexShader:te.meshbasic_vert,fragmentShader:te.meshbasic_frag},lambert:{uniforms:Qe([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new Zt(0)},envMapIntensity:{value:1}}]),vertexShader:te.meshlambert_vert,fragmentShader:te.meshlambert_frag},phong:{uniforms:Qe([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new Zt(0)},specular:{value:new Zt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:te.meshphong_vert,fragmentShader:te.meshphong_frag},standard:{uniforms:Qe([yt.common,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.roughnessmap,yt.metalnessmap,yt.fog,yt.lights,{emissive:{value:new Zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag},toon:{uniforms:Qe([yt.common,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.gradientmap,yt.fog,yt.lights,{emissive:{value:new Zt(0)}}]),vertexShader:te.meshtoon_vert,fragmentShader:te.meshtoon_frag},matcap:{uniforms:Qe([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,{matcap:{value:null}}]),vertexShader:te.meshmatcap_vert,fragmentShader:te.meshmatcap_frag},points:{uniforms:Qe([yt.points,yt.fog]),vertexShader:te.points_vert,fragmentShader:te.points_frag},dashed:{uniforms:Qe([yt.common,yt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:te.linedashed_vert,fragmentShader:te.linedashed_frag},depth:{uniforms:Qe([yt.common,yt.displacementmap]),vertexShader:te.depth_vert,fragmentShader:te.depth_frag},normal:{uniforms:Qe([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,{opacity:{value:1}}]),vertexShader:te.meshnormal_vert,fragmentShader:te.meshnormal_frag},sprite:{uniforms:Qe([yt.sprite,yt.fog]),vertexShader:te.sprite_vert,fragmentShader:te.sprite_frag},background:{uniforms:{uvTransform:{value:new qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:te.background_vert,fragmentShader:te.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qt}},vertexShader:te.backgroundCube_vert,fragmentShader:te.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:te.cube_vert,fragmentShader:te.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:te.equirect_vert,fragmentShader:te.equirect_frag},distance:{uniforms:Qe([yt.common,yt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:te.distance_vert,fragmentShader:te.distance_frag},shadow:{uniforms:Qe([yt.lights,yt.fog,{color:{value:new Zt(0)},opacity:{value:1}}]),vertexShader:te.shadow_vert,fragmentShader:te.shadow_frag}};si.physical={uniforms:Qe([si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qt},clearcoatNormalScale:{value:new at(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qt},sheen:{value:0},sheenColor:{value:new Zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qt},transmissionSamplerSize:{value:new at},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qt},attenuationDistance:{value:0},attenuationColor:{value:new Zt(0)},specularColor:{value:new Zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qt},anisotropyVector:{value:new at},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qt}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag};var Tc={r:0,b:0,g:0},Jv=new fe,gm=new qt;gm.set(-1,0,0,0,1,0,0,0,1);function Qv(i,t,e,n,s,r){let o=new Zt(0),a=s===!0?0:1,l,h,u=null,p=0,c=null;function d(T){let b=T.isScene===!0?T.background:null;if(b&&b.isTexture){let v=T.backgroundBlurriness>0;b=t.get(b,v)}return b}function f(T){let b=!1,v=d(T);v===null?g(o,a):v&&v.isColor&&(g(v,1),b=!0);let M=i.xr.getEnvironmentBlendMode();M==="additive"?e.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||b)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(T,b){let v=d(b);v&&(v.isCubeTexture||v.mapping===zo)?(h===void 0&&(h=new Vt(new be(1,1,1),new Je({name:"BackgroundCubeMaterial",uniforms:Ts(si.backgroundCube.uniforms),vertexShader:si.backgroundCube.vertexShader,fragmentShader:si.backgroundCube.fragmentShader,side:an,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(M,S,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(h)),h.material.uniforms.envMap.value=v,h.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Jv.makeRotationFromEuler(b.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&h.material.uniforms.backgroundRotation.value.premultiply(gm),h.material.toneMapped=se.getTransfer(v.colorSpace)!==ue,(u!==v||p!==v.version||c!==i.toneMapping)&&(h.material.needsUpdate=!0,u=v,p=v.version,c=i.toneMapping),h.layers.enableAll(),T.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new Vt(new Rn(2,2),new Je({name:"BackgroundMaterial",uniforms:Ts(si.background.uniforms),vertexShader:si.background.vertexShader,fragmentShader:si.background.fragmentShader,side:Vi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=se.getTransfer(v.colorSpace)!==ue,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||p!==v.version||c!==i.toneMapping)&&(l.material.needsUpdate=!0,u=v,p=v.version,c=i.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null))}function g(T,b){T.getRGB(Tc,Fu(i)),e.buffers.color.setClear(Tc.r,Tc.g,Tc.b,b,r)}function m(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(T,b=1){o.set(T),a=b,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(T){a=T,g(o,a)},render:f,addToRenderList:_,dispose:m}}function ty(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=c(null),r=s,o=!1;function a(P,D,O,I,F){let V=!1,W=p(P,I,O,D);r!==W&&(r=W,h(r.object)),V=d(P,I,O,F),V&&f(P,I,O,F),F!==null&&t.update(F,i.ELEMENT_ARRAY_BUFFER),(V||o)&&(o=!1,v(P,D,O,I),F!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(F).buffer))}function l(){return i.createVertexArray()}function h(P){return i.bindVertexArray(P)}function u(P){return i.deleteVertexArray(P)}function p(P,D,O,I){let F=I.wireframe===!0,V=n[D.id];V===void 0&&(V={},n[D.id]=V);let W=P.isInstancedMesh===!0?P.id:0,st=V[W];st===void 0&&(st={},V[W]=st);let X=st[O.id];X===void 0&&(X={},st[O.id]=X);let tt=X[F];return tt===void 0&&(tt=c(l()),X[F]=tt),tt}function c(P){let D=[],O=[],I=[];for(let F=0;F<e;F++)D[F]=0,O[F]=0,I[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:O,attributeDivisors:I,object:P,attributes:{},index:null}}function d(P,D,O,I){let F=r.attributes,V=D.attributes,W=0,st=O.getAttributes();for(let X in st)if(st[X].location>=0){let it=F[X],Lt=V[X];if(Lt===void 0&&(X==="instanceMatrix"&&P.instanceMatrix&&(Lt=P.instanceMatrix),X==="instanceColor"&&P.instanceColor&&(Lt=P.instanceColor)),it===void 0||it.attribute!==Lt||Lt&&it.data!==Lt.data)return!0;W++}return r.attributesNum!==W||r.index!==I}function f(P,D,O,I){let F={},V=D.attributes,W=0,st=O.getAttributes();for(let X in st)if(st[X].location>=0){let it=V[X];it===void 0&&(X==="instanceMatrix"&&P.instanceMatrix&&(it=P.instanceMatrix),X==="instanceColor"&&P.instanceColor&&(it=P.instanceColor));let Lt={};Lt.attribute=it,it&&it.data&&(Lt.data=it.data),F[X]=Lt,W++}r.attributes=F,r.attributesNum=W,r.index=I}function _(){let P=r.newAttributes;for(let D=0,O=P.length;D<O;D++)P[D]=0}function g(P){m(P,0)}function m(P,D){let O=r.newAttributes,I=r.enabledAttributes,F=r.attributeDivisors;O[P]=1,I[P]===0&&(i.enableVertexAttribArray(P),I[P]=1),F[P]!==D&&(i.vertexAttribDivisor(P,D),F[P]=D)}function T(){let P=r.newAttributes,D=r.enabledAttributes;for(let O=0,I=D.length;O<I;O++)D[O]!==P[O]&&(i.disableVertexAttribArray(O),D[O]=0)}function b(P,D,O,I,F,V,W){W===!0?i.vertexAttribIPointer(P,D,O,F,V):i.vertexAttribPointer(P,D,O,I,F,V)}function v(P,D,O,I){_();let F=I.attributes,V=O.getAttributes(),W=D.defaultAttributeValues;for(let st in V){let X=V[st];if(X.location>=0){let tt=F[st];if(tt===void 0&&(st==="instanceMatrix"&&P.instanceMatrix&&(tt=P.instanceMatrix),st==="instanceColor"&&P.instanceColor&&(tt=P.instanceColor)),tt!==void 0){let it=tt.normalized,Lt=tt.itemSize,Ct=t.get(tt);if(Ct===void 0)continue;let ae=Ct.buffer,ee=Ct.type,re=Ct.bytesPerElement,j=ee===i.INT||ee===i.UNSIGNED_INT||tt.gpuType===zl;if(tt.isInterleavedBufferAttribute){let et=tt.data,bt=et.stride,Wt=tt.offset;if(et.isInstancedInterleavedBuffer){for(let Tt=0;Tt<X.locationSize;Tt++)m(X.location+Tt,et.meshPerAttribute);P.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let Tt=0;Tt<X.locationSize;Tt++)g(X.location+Tt);i.bindBuffer(i.ARRAY_BUFFER,ae);for(let Tt=0;Tt<X.locationSize;Tt++)b(X.location+Tt,Lt/X.locationSize,ee,it,bt*re,(Wt+Lt/X.locationSize*Tt)*re,j)}else{if(tt.isInstancedBufferAttribute){for(let et=0;et<X.locationSize;et++)m(X.location+et,tt.meshPerAttribute);P.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let et=0;et<X.locationSize;et++)g(X.location+et);i.bindBuffer(i.ARRAY_BUFFER,ae);for(let et=0;et<X.locationSize;et++)b(X.location+et,Lt/X.locationSize,ee,it,Lt*re,Lt/X.locationSize*et*re,j)}}else if(W!==void 0){let it=W[st];if(it!==void 0)switch(it.length){case 2:i.vertexAttrib2fv(X.location,it);break;case 3:i.vertexAttrib3fv(X.location,it);break;case 4:i.vertexAttrib4fv(X.location,it);break;default:i.vertexAttrib1fv(X.location,it)}}}}T()}function M(){E();for(let P in n){let D=n[P];for(let O in D){let I=D[O];for(let F in I){let V=I[F];for(let W in V)u(V[W].object),delete V[W];delete I[F]}}delete n[P]}}function S(P){if(n[P.id]===void 0)return;let D=n[P.id];for(let O in D){let I=D[O];for(let F in I){let V=I[F];for(let W in V)u(V[W].object),delete V[W];delete I[F]}}delete n[P.id]}function A(P){for(let D in n){let O=n[D];for(let I in O){let F=O[I];if(F[P.id]===void 0)continue;let V=F[P.id];for(let W in V)u(V[W].object),delete V[W];delete F[P.id]}}}function x(P){for(let D in n){let O=n[D],I=P.isInstancedMesh===!0?P.id:0,F=O[I];if(F!==void 0){for(let V in F){let W=F[V];for(let st in W)u(W[st].object),delete W[st];delete F[V]}delete O[I],Object.keys(O).length===0&&delete n[D]}}}function E(){C(),o=!0,r!==s&&(r=s,h(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:E,resetDefaultState:C,dispose:M,releaseStatesOfGeometry:S,releaseStatesOfObject:x,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:g,disableUnusedAttributes:T}}function ey(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let c=0;for(let d=0;d<u;d++)c+=h[d];e.update(c,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function ny(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==Pn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){let x=A===Gn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==fn&&A!==Vn&&!x&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=e.precision!==void 0?e.precision:"highp",u=l(h);u!==h&&(Ht("WebGLRenderer:",h,"not supported, using",u,"instead."),h=u);let p=e.logarithmicDepthBuffer===!0,c=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&c===!1&&Ht("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),M=i.getParameter(i.MAX_SAMPLES),S=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:h,logarithmicDepthBuffer:p,reversedDepthBuffer:c,maxTextures:d,maxVertexTextures:f,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:T,maxVaryings:b,maxFragmentUniforms:v,maxSamples:M,samples:S}}function iy(i){let t=this,e=null,n=0,s=!1,r=!1,o=new yn,a=new qt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,c){let d=p.length!==0||c||n!==0||s;return s=c,n=p.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,c){e=u(p,c,0)},this.setState=function(p,c,d){let f=p.clippingPlanes,_=p.clipIntersection,g=p.clipShadows,m=i.get(p);if(!s||f===null||f.length===0||r&&!g)r?u(null):h();else{let T=r?0:n,b=T*4,v=m.clippingState||null;l.value=v,v=u(f,c,b,d);for(let M=0;M!==b;++M)v[M]=e[M];m.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=T}};function h(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(p,c,d,f){let _=p!==null?p.length:0,g=null;if(_!==0){if(g=l.value,f!==!0||g===null){let m=d+_*4,T=c.matrixWorldInverse;a.getNormalMatrix(T),(g===null||g.length<m)&&(g=new Float32Array(m));for(let b=0,v=d;b!==_;++b,v+=4)o.copy(p[b]).applyMatrix4(T,a),o.normal.toArray(g,v),g[v+3]=o.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}var Sr=4,sy=6,ry=20,oy=256,qo=new mr,qf=new Zt,Yu=null,qu=0,Ku=0,Zu=!1,ay=new L,Es=new L,Ac=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=ay}=r;Yu=this._renderer.getRenderTarget(),qu=this._renderer.getActiveCubeFace(),Ku=this._renderer.getActiveMipmapLevel(),Zu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=jf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Zf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Yu,qu,Ku),this._renderer.xr.enabled=Zu,t.scissorTest=!1,Mr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Wi||t.mapping===Ss?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Yu=this._renderer.getRenderTarget(),qu=this._renderer.getActiveCubeFace(),Ku=this._renderer.getActiveMipmapLevel(),Zu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ye,minFilter:Ye,generateMipmaps:!1,type:Gn,format:Pn,colorSpace:mo,depthBuffer:!1},s=Kf(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Kf(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=ly(r)),this._blurMaterial=hy(r,t,e),this._ggxMaterial=cy(r,t,e)}return s}_compileMaterial(t){let e=new Vt(new ke,t);this._renderer.compile(e,qo)}_sceneToCubeUV(t,e,n,s,r){let l=new He(90,1,e,n),h=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],p=this._renderer,c=p.autoClear,d=p.toneMapping;p.getClearColor(qf),p.toneMapping=$n,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(s),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Vt(new be,new Ge({name:"PMREM.Background",side:an,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,g=_.material,m=!1,T=t.background;T?T.isColor&&(g.color.copy(T),t.background=null,m=!0):(g.color.copy(qf),m=!0);for(let b=0;b<6;b++){let v=b%3;v===0?(l.up.set(0,h[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[b],r.y,r.z)):v===1?(l.up.set(0,0,h[b]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[b],r.z)):(l.up.set(0,h[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[b]));let M=this._cubeSize;Mr(s,v*M,b>2?M:0,M,M),p.setRenderTarget(s),m&&p.render(_,l),p.render(t,l)}p.toneMapping=d,p.autoClear=c,t.background=T}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Wi||t.mapping===Ss;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=jf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Zf());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;Mr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,qo)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let l=o.uniforms,h=n/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),p=Math.sqrt(h*h-u*u),c=h*1.25,d=p*c,{_lodMax:f}=this,_=this._sizeLods[n],g=3*_*(n>f-Sr?n-f+Sr:0),m=4*(this._cubeSize-_);l.envMap.value=t.texture,l.roughness.value=d,l.mipInt.value=f-e,Mr(r,g,m,3*_,2*_),s.setRenderTarget(r),s.render(a,qo),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=f-n,Mr(t,g,m,3*_,2*_),s.setRenderTarget(t),s.render(a,qo)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,o),this._blurPass(r,t,n,n,o)}_blurPass(t,e,n,s,r){let o=this._renderer,a=this._blurMaterial,l=this._lodMeshes[s];l.material=a;let h=a.uniforms;h.envMap.value=t.texture,h.sigma.value=r,h.mipInt.value=this._lodMax-n;let u=this._sizeLods[s],p=3*u*(s>this._lodMax-Sr?s-this._lodMax+Sr:0),c=4*(this._cubeSize-u);Mr(e,p,c,3*u,2*u),o.setRenderTarget(e),o.render(l,qo)}};function ly(i){let t=[],e=[],n=i,s=i-Sr+1+sy;for(let r=0;r<s;r++){let o=Math.pow(2,n);t.push(o);let a=1/(o-2),l=-a,h=1+a,u=[l,l,h,l,h,h,l,l,h,h,l,h],p=6,c=6,d=3,f=new Float32Array(d*c*p),_=new Float32Array(d*c*p);for(let m=0;m<p;m++){let T=m%3*2/3-1,b=m>2?0:-1,v=[T,b,0,T+2/3,b,0,T+2/3,b+1,0,T,b,0,T+2/3,b+1,0,T,b+1,0];f.set(v,d*c*m);for(let M=0;M<c;M++){let S=u[M*2]*2-1,A=u[M*2+1]*2-1;m===0?Es.set(1,A,S):m===1?Es.set(-S,1,-A):m===2?Es.set(-S,A,1):m===3?Es.set(-1,A,-S):m===4?Es.set(-S,-1,A):Es.set(S,A,-1),Es.toArray(_,(m*c+M)*d)}}let g=new ke;g.setAttribute("position",new Xe(f,d)),g.setAttribute("outputDirection",new Xe(_,d)),e.push(new Vt(g,null)),n>Sr&&n--}return{lodMeshes:e,sizeLods:t}}function Kf(i,t,e){let n=new un(i,t,e);return n.texture.mapping=zo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Mr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function cy(i,t,e){return new Je({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:oy,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Rc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:ni,depthTest:!1,depthWrite:!1})}function hy(i,t,e){return new Je({name:"SphericalGaussianBlur",defines:{SAMPLES:ry,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Rc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:ni,depthTest:!1,depthWrite:!1})}function Zf(){return new Je({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Rc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ni,depthTest:!1,depthWrite:!1})}function jf(){return new Je({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Rc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ni,depthTest:!1,depthWrite:!1})}function Rc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Cc=class extends un{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Mo(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new be(5,5,5),r=new Je({name:"CubemapFromEquirect",uniforms:Ts(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:an,blending:ni});r.uniforms.tEquirect.value=e;let o=new Vt(s,r),a=e.minFilter;return e.minFilter===Xi&&(e.minFilter=Ye),new Ll(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}};function uy(i){let t=new WeakMap,e=new WeakMap,n=null;function s(c,d=!1){return c==null?null:d?o(c):r(c)}function r(c){if(c&&c.isTexture){let d=c.mapping;if(d===Ol||d===Fl)if(t.has(c)){let f=t.get(c).texture;return a(f,c.mapping)}else{let f=c.image;if(f&&f.height>0){let _=new Cc(f.height);return _.fromEquirectangularTexture(i,c),t.set(c,_),c.addEventListener("dispose",h),a(_.texture,c.mapping)}else return null}}return c}function o(c){if(c&&c.isTexture){let d=c.mapping,f=d===Ol||d===Fl,_=d===Wi||d===Ss;if(f||_){let g=e.get(c),m=g!==void 0?g.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==m)return n===null&&(n=new Ac(i)),g=f?n.fromEquirectangular(c,g):n.fromCubemap(c,g),g.texture.pmremVersion=c.pmremVersion,e.set(c,g),g.texture;if(g!==void 0)return g.texture;{let T=c.image;return f&&T&&T.height>0||_&&T&&l(T)?(n===null&&(n=new Ac(i)),g=f?n.fromEquirectangular(c):n.fromCubemap(c),g.texture.pmremVersion=c.pmremVersion,e.set(c,g),c.addEventListener("dispose",u),g.texture):null}}}return c}function a(c,d){return d===Ol?c.mapping=Wi:d===Fl&&(c.mapping=Ss),c}function l(c){let d=0,f=6;for(let _=0;_<f;_++)c[_]!==void 0&&d++;return d===f}function h(c){let d=c.target;d.removeEventListener("dispose",h);let f=t.get(d);f!==void 0&&(t.delete(d),f.dispose())}function u(c){let d=c.target;d.removeEventListener("dispose",u);let f=e.get(d);f!==void 0&&(e.delete(d),f.dispose())}function p(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:p}}function dy(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&ms("WebGLRenderer: "+n+" extension not supported."),s}}}function py(i,t,e,n){let s={},r=new WeakMap;function o(p){let c=p.target;c.index!==null&&t.remove(c.index);for(let f in c.attributes)t.remove(c.attributes[f]);c.removeEventListener("dispose",o),delete s[c.id];let d=r.get(c);d&&(t.remove(d),r.delete(c)),n.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,e.memory.geometries--}function a(p,c){return s[c.id]===!0||(c.addEventListener("dispose",o),s[c.id]=!0,e.memory.geometries++),c}function l(p){let c=p.attributes;for(let d in c)t.update(c[d],i.ARRAY_BUFFER)}function h(p){let c=[],d=p.index,f=p.attributes.position,_=0;if(f===void 0)return;if(d!==null){let T=d.array;_=d.version;for(let b=0,v=T.length;b<v;b+=3){let M=T[b+0],S=T[b+1],A=T[b+2];c.push(M,S,S,A,A,M)}}else{let T=f.array;_=f.version;for(let b=0,v=T.length/3-1;b<v;b+=3){let M=b+0,S=b+1,A=b+2;c.push(M,S,S,A,A,M)}}let g=new(f.count>=65535?yo:vo)(c,1);g.version=_;let m=r.get(p);m&&t.remove(m),r.set(p,g)}function u(p){let c=r.get(p);if(c){let d=p.index;d!==null&&c.version<d.version&&h(p)}else h(p);return r.get(p)}return{get:a,update:l,getWireframeAttribute:u}}function fy(i,t,e){let n;function s(p){n=p}let r,o;function a(p){r=p.type,o=p.bytesPerElement}function l(p,c){i.drawElements(n,c,r,p*o),e.update(c,n,1)}function h(p,c,d){d!==0&&(i.drawElementsInstanced(n,c,r,p*o,d),e.update(c,n,d))}function u(p,c,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,c,0,r,p,0,d);let _=0;for(let g=0;g<d;g++)_+=c[g];e.update(_,n,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=h,this.renderMultiDraw=u}function my(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:Gt("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function gy(i,t,e){let n=new WeakMap,s=new Ee;function r(o,a,l){let h=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,p=u!==void 0?u.length:0,c=n.get(a);if(c===void 0||c.count!==p){let E=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",E)};c!==void 0&&c.texture.dispose();let d=a.morphAttributes.position!==void 0,f=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],T=a.morphAttributes.color||[],b=0;d===!0&&(b=1),f===!0&&(b=2),_===!0&&(b=3);let v=a.attributes.position.count*b,M=1;v>t.maxTextureSize&&(M=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let S=new Float32Array(v*M*4*p),A=new xo(S,v,M,p);A.type=Vn,A.needsUpdate=!0;let x=b*4;for(let C=0;C<p;C++){let P=g[C],D=m[C],O=T[C],I=v*M*4*C;for(let F=0;F<P.count;F++){let V=F*x;d===!0&&(s.fromBufferAttribute(P,F),S[I+V+0]=s.x,S[I+V+1]=s.y,S[I+V+2]=s.z,S[I+V+3]=0),f===!0&&(s.fromBufferAttribute(D,F),S[I+V+4]=s.x,S[I+V+5]=s.y,S[I+V+6]=s.z,S[I+V+7]=0),_===!0&&(s.fromBufferAttribute(O,F),S[I+V+8]=s.x,S[I+V+9]=s.y,S[I+V+10]=s.z,S[I+V+11]=O.itemSize===4?s.w:1)}}c={count:p,texture:A,size:new at(v,M)},n.set(a,c),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let d=0;for(let _=0;_<h.length;_++)d+=h[_];let f=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",f),l.getUniforms().setValue(i,"morphTargetInfluences",h)}l.getUniforms().setValue(i,"morphTargetsTexture",c.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",c.size)}return{update:r}}function _y(i,t,e,n,s){let r=new WeakMap;function o(h){let u=s.render.frame,p=h.geometry,c=t.get(h,p);if(r.get(c)!==u&&(t.update(c),r.set(c,u)),h.isInstancedMesh&&(h.hasEventListener("dispose",l)===!1&&h.addEventListener("dispose",l),r.get(h)!==u&&(e.update(h.instanceMatrix,i.ARRAY_BUFFER),h.instanceColor!==null&&e.update(h.instanceColor,i.ARRAY_BUFFER),r.set(h,u))),h.isSkinnedMesh){let d=h.skeleton;r.get(d)!==u&&(d.update(),r.set(d,u))}return c}function a(){r=new WeakMap}function l(h){let u=h.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:o,dispose:a}}var xy={[xu]:"LINEAR_TONE_MAPPING",[vu]:"REINHARD_TONE_MAPPING",[yu]:"CINEON_TONE_MAPPING",[bu]:"ACES_FILMIC_TONE_MAPPING",[Su]:"AGX_TONE_MAPPING",[wu]:"NEUTRAL_TONE_MAPPING",[Mu]:"CUSTOM_TONE_MAPPING"};function vy(i,t,e,n,s,r){let o=new un(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,h=new ke;h.setAttribute("position",new de([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new de([0,2,0,0,2,0],2));let u=new vl({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),p=new Vt(h,u),c=new mr(-1,1,1,-1,0,1),d=null,f=null,_=!1,g,m=null,T=[],b=!1;this.setSize=function(v,M){o.setSize(v,M),a!==null&&a.setSize(v,M),l!==null&&l.setSize(v,M);for(let S=0;S<T.length;S++){let A=T[S];A.setSize&&A.setSize(v,M)}},this.setEffects=function(v){T=v,b=T.length>0&&T[0].isRenderPass===!0;let M=o.width,S=o.height;T.length>0&&a===null&&(a=new un(M,S,{type:Gn,depthBuffer:!1,stencilBuffer:!1}),l=new un(M,S,{type:Gn,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<T.length;A++){let x=T[A];x.setSize&&x.setSize(M,S)}},this.begin=function(v,M){if(_||v.toneMapping===$n&&T.length===0)return!1;if(m=M,M!==null){let S=M.width,A=M.height;(o.width!==S||o.height!==A)&&this.setSize(S,A)}return b===!1&&v.setRenderTarget(o),g=v.toneMapping,v.toneMapping=$n,!0},this.hasRenderPass=function(){return b},this.end=function(v,M){v.toneMapping=g,_=!0;let S=o,A=a;for(let x=0;x<T.length;x++){let E=T[x];E.enabled!==!1&&(E.render(v,A,S,M),E.needsSwap!==!1&&(S=A,A=A===a?l:a))}if(d!==v.outputColorSpace||f!==v.toneMapping){d=v.outputColorSpace,f=v.toneMapping,u.defines={},se.getTransfer(d)===ue&&(u.defines.SRGB_TRANSFER="");let x=xy[f];x&&(u.defines[x]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=S.texture,v.setRenderTarget(m),v.render(p,c),m=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),h.dispose(),u.dispose()}}var _m=new on,Qu=new Ui(1,1),xm=new xo,vm=new cl,ym=new Mo,Jf=[],Qf=[],tm=new Float32Array(16),em=new Float32Array(9),nm=new Float32Array(4);function Er(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Jf[s];if(r===void 0&&(r=new Float32Array(s),Jf[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Fe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Be(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Pc(i,t){let e=Qf[t];e===void 0&&(e=new Int32Array(t),Qf[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function yy(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function by(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;i.uniform2fv(this.addr,t),Be(e,t)}}function My(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Fe(e,t))return;i.uniform3fv(this.addr,t),Be(e,t)}}function Sy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;i.uniform4fv(this.addr,t),Be(e,t)}}function wy(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Be(e,t)}else{if(Fe(e,n))return;nm.set(n),i.uniformMatrix2fv(this.addr,!1,nm),Be(e,n)}}function Ty(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Be(e,t)}else{if(Fe(e,n))return;em.set(n),i.uniformMatrix3fv(this.addr,!1,em),Be(e,n)}}function Ey(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Be(e,t)}else{if(Fe(e,n))return;tm.set(n),i.uniformMatrix4fv(this.addr,!1,tm),Be(e,n)}}function Ay(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Cy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;i.uniform2iv(this.addr,t),Be(e,t)}}function Ry(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Fe(e,t))return;i.uniform3iv(this.addr,t),Be(e,t)}}function Py(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;i.uniform4iv(this.addr,t),Be(e,t)}}function Iy(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Dy(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;i.uniform2uiv(this.addr,t),Be(e,t)}}function Ly(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Fe(e,t))return;i.uniform3uiv(this.addr,t),Be(e,t)}}function Ny(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;i.uniform4uiv(this.addr,t),Be(e,t)}}function ky(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Qu.compareFunction=e.isReversedDepthBuffer()?wc:Sc,r=Qu):r=_m,e.setTexture2D(t||r,s)}function Uy(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||vm,s)}function Oy(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||ym,s)}function Fy(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||xm,s)}function By(i){switch(i){case 5126:return yy;case 35664:return by;case 35665:return My;case 35666:return Sy;case 35674:return wy;case 35675:return Ty;case 35676:return Ey;case 5124:case 35670:return Ay;case 35667:case 35671:return Cy;case 35668:case 35672:return Ry;case 35669:case 35673:return Py;case 5125:return Iy;case 36294:return Dy;case 36295:return Ly;case 36296:return Ny;case 35678:case 36198:case 36298:case 36306:case 35682:return ky;case 35679:case 36299:case 36307:return Uy;case 35680:case 36300:case 36308:case 36293:return Oy;case 36289:case 36303:case 36311:case 36292:return Fy}}function zy(i,t){i.uniform1fv(this.addr,t)}function $y(i,t){let e=Er(t,this.size,2);i.uniform2fv(this.addr,e)}function Hy(i,t){let e=Er(t,this.size,3);i.uniform3fv(this.addr,e)}function Vy(i,t){let e=Er(t,this.size,4);i.uniform4fv(this.addr,e)}function Gy(i,t){let e=Er(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Wy(i,t){let e=Er(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Xy(i,t){let e=Er(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Yy(i,t){i.uniform1iv(this.addr,t)}function qy(i,t){i.uniform2iv(this.addr,t)}function Ky(i,t){i.uniform3iv(this.addr,t)}function Zy(i,t){i.uniform4iv(this.addr,t)}function jy(i,t){i.uniform1uiv(this.addr,t)}function Jy(i,t){i.uniform2uiv(this.addr,t)}function Qy(i,t){i.uniform3uiv(this.addr,t)}function tb(i,t){i.uniform4uiv(this.addr,t)}function eb(i,t,e){let n=this.cache,s=t.length,r=Pc(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Be(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=Qu:o=_m;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function nb(i,t,e){let n=this.cache,s=t.length,r=Pc(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Be(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||vm,r[o])}function ib(i,t,e){let n=this.cache,s=t.length,r=Pc(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Be(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||ym,r[o])}function sb(i,t,e){let n=this.cache,s=t.length,r=Pc(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Be(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||xm,r[o])}function rb(i){switch(i){case 5126:return zy;case 35664:return $y;case 35665:return Hy;case 35666:return Vy;case 35674:return Gy;case 35675:return Wy;case 35676:return Xy;case 5124:case 35670:return Yy;case 35667:case 35671:return qy;case 35668:case 35672:return Ky;case 35669:case 35673:return Zy;case 5125:return jy;case 36294:return Jy;case 36295:return Qy;case 36296:return tb;case 35678:case 36198:case 36298:case 36306:case 35682:return eb;case 35679:case 36299:case 36307:return nb;case 35680:case 36300:case 36308:case 36293:return ib;case 36289:case 36303:case 36311:case 36292:return sb}}var td=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=By(e.type)}},ed=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=rb(e.type)}},nd=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},ju=/(\w+)(\])?(\[|\.)?/g;function im(i,t){i.seq.push(t),i.map[t.id]=t}function ob(i,t,e){let n=i.name,s=n.length;for(ju.lastIndex=0;;){let r=ju.exec(n),o=ju.lastIndex,a=r[1],l=r[2]==="]",h=r[3];if(l&&(a=a|0),h===void 0||h==="["&&o+2===s){im(e,h===void 0?new td(a,i,t):new ed(a,i,t));break}else{let p=e.map[a];p===void 0&&(p=new nd(a),im(e,p)),e=p}}}var wr=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);ob(a,l,this)}let s=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function sm(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var ab=37297,lb=0;function cb(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var rm=new qt;function hb(i){se._getMatrix(rm,se.workingColorSpace,i);let t=`mat3( ${rm.elements.map(e=>e.toFixed(4))} )`;switch(se.getTransfer(i)){case go:return[t,"LinearTransferOETF"];case ue:return[t,"sRGBTransferOETF"];default:return Ht("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function om(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+cb(i.getShaderSource(t),a)}else return r}function ub(i,t){let e=hb(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var db={[xu]:"Linear",[vu]:"Reinhard",[yu]:"Cineon",[bu]:"ACESFilmic",[Su]:"AgX",[wu]:"Neutral",[Mu]:"Custom"};function pb(i,t){let e=db[t];return e===void 0?(Ht("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Ec=new L;function fb(){se.getLuminanceCoefficients(Ec);let i=Ec.x.toFixed(4),t=Ec.y.toFixed(4),e=Ec.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function mb(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Zo).join(`
`)}function gb(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function _b(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Zo(i){return i!==""}function am(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function lm(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var xb=/^[ \t]*#include +<([\w\d./]+)>/gm;function id(i){return i.replace(xb,yb)}var vb=new Map;function yb(i,t){let e=te[t];if(e===void 0){let n=vb.get(t);if(n!==void 0)e=te[n],Ht('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return id(e)}var bb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function cm(i){return i.replace(bb,Mb)}function Mb(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function hm(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var Sb={[Bo]:"SHADOWMAP_TYPE_PCF",[xr]:"SHADOWMAP_TYPE_VSM"};function wb(i){return Sb[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Tb={[Wi]:"ENVMAP_TYPE_CUBE",[Ss]:"ENVMAP_TYPE_CUBE",[zo]:"ENVMAP_TYPE_CUBE_UV"};function Eb(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Tb[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Ab={[Ss]:"ENVMAP_MODE_REFRACTION"};function Cb(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Ab[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Rb={[Ul]:"ENVMAP_BLENDING_MULTIPLY",[Sf]:"ENVMAP_BLENDING_MIX",[wf]:"ENVMAP_BLENDING_ADD"};function Pb(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Rb[i.combine]||"ENVMAP_BLENDING_NONE"}function Ib(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Db(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=wb(e),h=Eb(e),u=Cb(e),p=Pb(e),c=Ib(e),d=mb(e),f=gb(r),_=s.createProgram(),g,m,T=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(Zo).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(Zo).join(`
`),m.length>0&&(m+=`
`)):(g=[hm(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zo).join(`
`),m=[hm(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",e.envMap?"#define "+p:"",c?"#define CUBEUV_TEXEL_WIDTH "+c.texelWidth:"",c?"#define CUBEUV_TEXEL_HEIGHT "+c.texelHeight:"",c?"#define CUBEUV_MAX_MIP "+c.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==$n?"#define TONE_MAPPING":"",e.toneMapping!==$n?te.tonemapping_pars_fragment:"",e.toneMapping!==$n?pb("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",te.colorspace_pars_fragment,ub("linearToOutputTexel",e.outputColorSpace),fb(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Zo).join(`
`)),o=id(o),o=am(o,e),o=lm(o,e),a=id(a),a=am(a,e),a=lm(a,e),o=cm(o),a=cm(a),e.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===Lu?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Lu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let b=T+g+o,v=T+m+a,M=sm(s,s.VERTEX_SHADER,b),S=sm(s,s.FRAGMENT_SHADER,v);s.attachShader(_,M),s.attachShader(_,S),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function A(P){if(i.debug.checkShaderErrors){let D=s.getProgramInfoLog(_)||"",O=s.getShaderInfoLog(M)||"",I=s.getShaderInfoLog(S)||"",F=D.trim(),V=O.trim(),W=I.trim(),st=!0,X=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(st=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,M,S);else{let tt=om(s,M,"vertex"),it=om(s,S,"fragment");Gt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+F+`
`+tt+`
`+it)}else F!==""?Ht("WebGLProgram: Program Info Log:",F):(V===""||W==="")&&(X=!1);X&&(P.diagnostics={runnable:st,programLog:F,vertexShader:{log:V,prefix:g},fragmentShader:{log:W,prefix:m}})}s.deleteShader(M),s.deleteShader(S),x=new wr(s,_),E=_b(s,_)}let x;this.getUniforms=function(){return x===void 0&&A(this),x};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let C=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=s.getProgramParameter(_,ab)),C},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=lb++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=M,this.fragmentShader=S,this}var Lb=0,sd=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new rd(t),e.set(t,n)),n}},rd=class{constructor(t){this.id=Lb++,this.code=t,this.usedTimes=0}};function Nb(i){return i===qi||i===Xo||i===Yo}function kb(i,t,e,n,s,r){let o=new cr,a=new sd,l=new Set,h=[],u=new Map,p=n.logarithmicDepthBuffer,c=n.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(x){return l.add(x),x===0?"uv":`uv${x}`}function _(x,E,C,P,D,O){let I=P.fog,F=D.geometry,V=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?P.environment:null,W=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,st=t.get(x.envMap||V,W),X=st&&st.mapping===zo?st.image.height:null,tt=d[x.type];x.precision!==null&&(c=n.getMaxPrecision(x.precision),c!==x.precision&&Ht("WebGLProgram.getParameters:",x.precision,"not supported, using",c,"instead."));let it=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,Lt=it!==void 0?it.length:0,Ct=0;F.morphAttributes.position!==void 0&&(Ct=1),F.morphAttributes.normal!==void 0&&(Ct=2),F.morphAttributes.color!==void 0&&(Ct=3);let ae,ee,re,j;if(tt){let ve=si[tt];ae=ve.vertexShader,ee=ve.fragmentShader}else{ae=x.vertexShader,ee=x.fragmentShader;let ve=a.getVertexShaderStage(x),ce=a.getFragmentShaderStage(x);a.update(x,ve,ce),re=ve.id,j=ce.id}let et=i.getRenderTarget(),bt=i.state.buffers.depth.getReversed(),Wt=D.isInstancedMesh===!0,Tt=D.isBatchedMesh===!0,Xt=!!x.map,pe=!!x.matcap,nt=!!st,lt=!!x.aoMap,ht=!!x.lightMap,ut=!!x.bumpMap&&x.wireframe===!1,ft=!!x.normalMap,Bt=!!x.displacementMap,Ot=!!x.emissiveMap,Yt=!!x.metalnessMap,Kt=!!x.roughnessMap,N=x.anisotropy>0,le=x.clearcoat>0,ne=x.dispersion>0,R=x.retroreflectivity>0,y=x.iridescence>0,B=x.sheen>0,H=x.transmission>0,K=N&&!!x.anisotropyMap,dt=le&&!!x.clearcoatMap,pt=le&&!!x.clearcoatNormalMap,Z=le&&!!x.clearcoatRoughnessMap,Q=y&&!!x.iridescenceMap,mt=y&&!!x.iridescenceThicknessMap,Nt=B&&!!x.sheenColorMap,vt=B&&!!x.sheenRoughnessMap,gt=!!x.specularMap,kt=!!x.specularColorMap,zt=!!x.specularIntensityMap,jt=H&&!!x.transmissionMap,U=H&&!!x.thicknessMap,_t=!!x.gradientMap,J=!!x.alphaMap,xt=x.alphaTest>0,wt=!!x.alphaHash,ot=!!x.extensions,Ut=$n;x.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(Ut=i.toneMapping);let It={shaderID:tt,shaderType:x.type,shaderName:x.name,vertexShader:ae,fragmentShader:ee,defines:x.defines,customVertexShaderID:re,customFragmentShaderID:j,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:c,batching:Tt,batchingColor:Tt&&D._colorsTexture!==null,instancing:Wt,instancingColor:Wt&&D.instanceColor!==null,instancingMorph:Wt&&D.morphTexture!==null,outputColorSpace:et===null?i.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:se.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Xt,matcap:pe,envMap:nt,envMapMode:nt&&st.mapping,envMapCubeUVHeight:X,aoMap:lt,lightMap:ht,bumpMap:ut,normalMap:ft,displacementMap:Bt,emissiveMap:Ot,normalMapObjectSpace:ft&&x.normalMapType===Af,normalMapTangentSpace:ft&&x.normalMapType===Mc,packedNormalMap:ft&&x.normalMapType===Mc&&Nb(x.normalMap.format),metalnessMap:Yt,roughnessMap:Kt,anisotropy:N,anisotropyMap:K,clearcoat:le,clearcoatMap:dt,clearcoatNormalMap:pt,clearcoatRoughnessMap:Z,dispersion:ne,retroreflection:R,iridescence:y,iridescenceMap:Q,iridescenceThicknessMap:mt,sheen:B,sheenColorMap:Nt,sheenRoughnessMap:vt,specularMap:gt,specularColorMap:kt,specularIntensityMap:zt,transmission:H,transmissionMap:jt,thicknessMap:U,gradientMap:_t,opaque:x.transparent===!1&&x.blending===vr&&x.alphaToCoverage===!1,alphaMap:J,alphaTest:xt,alphaHash:wt,combine:x.combine,mapUv:Xt&&f(x.map.channel),aoMapUv:lt&&f(x.aoMap.channel),lightMapUv:ht&&f(x.lightMap.channel),bumpMapUv:ut&&f(x.bumpMap.channel),normalMapUv:ft&&f(x.normalMap.channel),displacementMapUv:Bt&&f(x.displacementMap.channel),emissiveMapUv:Ot&&f(x.emissiveMap.channel),metalnessMapUv:Yt&&f(x.metalnessMap.channel),roughnessMapUv:Kt&&f(x.roughnessMap.channel),anisotropyMapUv:K&&f(x.anisotropyMap.channel),clearcoatMapUv:dt&&f(x.clearcoatMap.channel),clearcoatNormalMapUv:pt&&f(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Z&&f(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&f(x.iridescenceMap.channel),iridescenceThicknessMapUv:mt&&f(x.iridescenceThicknessMap.channel),sheenColorMapUv:Nt&&f(x.sheenColorMap.channel),sheenRoughnessMapUv:vt&&f(x.sheenRoughnessMap.channel),specularMapUv:gt&&f(x.specularMap.channel),specularColorMapUv:kt&&f(x.specularColorMap.channel),specularIntensityMapUv:zt&&f(x.specularIntensityMap.channel),transmissionMapUv:jt&&f(x.transmissionMap.channel),thicknessMapUv:U&&f(x.thicknessMap.channel),alphaMapUv:J&&f(x.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(ft||N),vertexNormals:!!F.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!F.attributes.uv&&(Xt||J),fog:!!I,useFog:x.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||F.attributes.normal===void 0&&ft===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:bt,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:F.attributes.position!==void 0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:Lt,morphTextureStride:Ct,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:O.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ut,decodeVideoTexture:Xt&&x.map.isVideoTexture===!0&&se.getTransfer(x.map.colorSpace)===ue,decodeVideoTextureEmissive:Ot&&x.emissiveMap.isVideoTexture===!0&&se.getTransfer(x.emissiveMap.colorSpace)===ue,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===We,flipSided:x.side===an,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ot&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ot&&x.extensions.multiDraw===!0||Tt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return It.vertexUv1s=l.has(1),It.vertexUv2s=l.has(2),It.vertexUv3s=l.has(3),l.clear(),It}function g(x){let E=[];if(x.shaderID?E.push(x.shaderID):(E.push(x.customVertexShaderID),E.push(x.customFragmentShaderID)),x.defines!==void 0)for(let C in x.defines)E.push(C),E.push(x.defines[C]);return x.isRawShaderMaterial===!1&&(m(E,x),T(E,x),E.push(i.outputColorSpace)),E.push(x.customProgramCacheKey),E.join()}function m(x,E){x.push(E.precision),x.push(E.outputColorSpace),x.push(E.envMapMode),x.push(E.envMapCubeUVHeight),x.push(E.mapUv),x.push(E.alphaMapUv),x.push(E.lightMapUv),x.push(E.aoMapUv),x.push(E.bumpMapUv),x.push(E.normalMapUv),x.push(E.displacementMapUv),x.push(E.emissiveMapUv),x.push(E.metalnessMapUv),x.push(E.roughnessMapUv),x.push(E.anisotropyMapUv),x.push(E.clearcoatMapUv),x.push(E.clearcoatNormalMapUv),x.push(E.clearcoatRoughnessMapUv),x.push(E.iridescenceMapUv),x.push(E.iridescenceThicknessMapUv),x.push(E.sheenColorMapUv),x.push(E.sheenRoughnessMapUv),x.push(E.specularMapUv),x.push(E.specularColorMapUv),x.push(E.specularIntensityMapUv),x.push(E.transmissionMapUv),x.push(E.thicknessMapUv),x.push(E.combine),x.push(E.fogExp2),x.push(E.sizeAttenuation),x.push(E.morphTargetsCount),x.push(E.morphAttributeCount),x.push(E.numSunLights),x.push(E.numDirLights),x.push(E.numPointLights),x.push(E.numSpotLights),x.push(E.numSpotLightMaps),x.push(E.numHemiLights),x.push(E.numRectAreaLights),x.push(E.numSunLightShadows),x.push(E.numDirLightShadows),x.push(E.numPointLightShadows),x.push(E.numSpotLightShadows),x.push(E.numSpotLightShadowsWithMaps),x.push(E.numLightProbes),x.push(E.shadowMapType),x.push(E.toneMapping),x.push(E.numClippingPlanes),x.push(E.numClipIntersection),x.push(E.depthPacking)}function T(x,E){o.disableAll(),E.instancing&&o.enable(0),E.instancingColor&&o.enable(1),E.instancingMorph&&o.enable(2),E.matcap&&o.enable(3),E.envMap&&o.enable(4),E.normalMapObjectSpace&&o.enable(5),E.normalMapTangentSpace&&o.enable(6),E.clearcoat&&o.enable(7),E.iridescence&&o.enable(8),E.alphaTest&&o.enable(9),E.vertexColors&&o.enable(10),E.vertexAlphas&&o.enable(11),E.vertexUv1s&&o.enable(12),E.vertexUv2s&&o.enable(13),E.vertexUv3s&&o.enable(14),E.vertexTangents&&o.enable(15),E.anisotropy&&o.enable(16),E.alphaHash&&o.enable(17),E.batching&&o.enable(18),E.dispersion&&o.enable(19),E.retroreflection&&o.enable(24),E.batchingColor&&o.enable(20),E.gradientMap&&o.enable(21),E.packedNormalMap&&o.enable(22),E.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reversedDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),E.numLightProbeGrids>0&&o.enable(22),E.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function b(x){let E=d[x.type],C;if(E){let P=si[E];C=Wf.clone(P.uniforms)}else C=x.uniforms;return C}function v(x,E){let C=u.get(E);return C!==void 0?++C.usedTimes:(C=new Db(i,E,x,s),h.push(C),u.set(E,C)),C}function M(x){if(--x.usedTimes===0){let E=h.indexOf(x);h[E]=h[h.length-1],h.pop(),u.delete(x.cacheKey),x.destroy()}}function S(x){a.remove(x)}function A(){a.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:b,acquireProgram:v,releaseProgram:M,releaseShaderCache:S,programs:h,dispose:A}}function Ub(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Ob(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function um(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function dm(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(c){let d=0;return c.isInstancedMesh&&(d+=2),c.isSkinnedMesh&&(d+=1),d}function a(c,d,f,_,g,m){let T=i[t];return T===void 0?(T={id:c.id,object:c,geometry:d,material:f,materialVariant:o(c),groupOrder:_,renderOrder:c.renderOrder,z:g,group:m},i[t]=T):(T.id=c.id,T.object=c,T.geometry=d,T.material=f,T.materialVariant=o(c),T.groupOrder=_,T.renderOrder=c.renderOrder,T.z=g,T.group=m),t++,T}function l(c,d,f,_,g,m,T){T.reversedDepth===!0&&(g=-g);let b=a(c,d,f,_,g,m);f.transmission>0?n.push(b):f.transparent===!0?s.push(b):e.push(b)}function h(c,d,f,_,g,m){let T=a(c,d,f,_,g,m);f.transmission>0?n.unshift(T):f.transparent===!0?s.unshift(T):e.unshift(T)}function u(c,d){e.length>1&&e.sort(c||Ob),n.length>1&&n.sort(d||um),s.length>1&&s.sort(d||um)}function p(){for(let c=t,d=i.length;c<d;c++){let f=i[c];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:h,finish:p,sort:u}}function Fb(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new dm,i.set(n,[o])):s>=r.length?(o=new dm,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Bb(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new L,color:new Zt};break;case"SpotLight":e={position:new L,direction:new L,color:new Zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Zt,groundColor:new Zt};break;case"RectAreaLight":e={color:new Zt,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function zb(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var $b=0;function Hb(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Vb(i){let t=new Bb,e=zb(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new L);let s=new L,r=new fe,o=new fe;function a(h){let u=0,p=0,c=0;for(let D=0;D<9;D++)n.probe[D].set(0,0,0);let d=0,f=0,_=0,g=0,m=0,T=0,b=0,v=0,M=0,S=0,A=0,x=0,E=0,C=0;h.sort(Hb);for(let D=0,O=h.length;D<O;D++){let I=h[D],F=I.color,V=I.intensity,W=I.distance,st=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===qi?st=I.shadow.map.texture:st=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)u+=F.r*V,p+=F.g*V,c+=F.b*V;else if(I.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(I.sh.coefficients[X],V);C++}else if(I.isSunLight){let X=t.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let tt=I.shadow,it=e.get(I);it.shadowIntensity=tt.intensity,it.shadowBias=tt.bias,it.shadowNormalBias=tt.normalBias,it.shadowRadius=tt.radius,it.shadowMapSize.copy(tt.mapSize).multiply(tt.getFrameExtents()),n.sunShadow[f]=it,n.sunShadowMap[f]=st;let Lt=tt.getViewportCount();for(let Ct=0;Ct<Lt;Ct++)n.sunShadowMatrix[_+Ct]=tt.getMatrix(Ct),n.sunShadowCascade[_+Ct]=tt._cascadeData[Ct];_+=Lt,f++}n.sun[d]=X,d++}else if(I.isDirectionalLight){let X=t.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let tt=I.shadow,it=e.get(I);it.shadowIntensity=tt.intensity,it.shadowBias=tt.bias,it.shadowNormalBias=tt.normalBias,it.shadowRadius=tt.radius,it.shadowMapSize=tt.mapSize,n.directionalShadow[g]=it,n.directionalShadowMap[g]=st,n.directionalShadowMatrix[g]=I.shadow.matrix,M++}n.directional[g]=X,g++}else if(I.isSpotLight){let X=t.get(I);X.position.setFromMatrixPosition(I.matrixWorld),X.color.copy(F).multiplyScalar(V),X.distance=W,X.coneCos=Math.cos(I.angle),X.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),X.decay=I.decay,n.spot[T]=X;let tt=I.shadow;if(I.map&&(n.spotLightMap[x]=I.map,x++,tt.updateMatrices(I),I.castShadow&&E++),n.spotLightMatrix[T]=tt.matrix,I.castShadow){let it=e.get(I);it.shadowIntensity=tt.intensity,it.shadowBias=tt.bias,it.shadowNormalBias=tt.normalBias,it.shadowRadius=tt.radius,it.shadowMapSize=tt.mapSize,n.spotShadow[T]=it,n.spotShadowMap[T]=st,A++}T++}else if(I.isRectAreaLight){let X=t.get(I);X.color.copy(F).multiplyScalar(V),X.halfWidth.set(I.width*.5,0,0),X.halfHeight.set(0,I.height*.5,0),n.rectArea[b]=X,b++}else if(I.isPointLight){let X=t.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity),X.distance=I.distance,X.decay=I.decay,I.castShadow){let tt=I.shadow,it=e.get(I);it.shadowIntensity=tt.intensity,it.shadowBias=tt.bias,it.shadowNormalBias=tt.normalBias,it.shadowRadius=tt.radius,it.shadowMapSize=tt.mapSize,it.shadowCameraNear=tt.camera.near,it.shadowCameraFar=tt.camera.far,n.pointShadow[m]=it,n.pointShadowMap[m]=st,n.pointShadowMatrix[m]=I.shadow.matrix,S++}n.point[m]=X,m++}else if(I.isHemisphereLight){let X=t.get(I);X.skyColor.copy(I.color).multiplyScalar(V),X.groundColor.copy(I.groundColor).multiplyScalar(V),n.hemi[v]=X,v++}}b>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=yt.LTC_FLOAT_1,n.rectAreaLTC2=yt.LTC_FLOAT_2):(n.rectAreaLTC1=yt.LTC_HALF_1,n.rectAreaLTC2=yt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=p,n.ambient[2]=c;let P=n.hash;(P.sunLength!==d||P.directionalLength!==g||P.pointLength!==m||P.spotLength!==T||P.rectAreaLength!==b||P.hemiLength!==v||P.numSunShadows!==f||P.numDirectionalShadows!==M||P.numPointShadows!==S||P.numSpotShadows!==A||P.numSpotMaps!==x||P.numLightProbes!==C)&&(n.sun.length=d,n.directional.length=g,n.spot.length=T,n.rectArea.length=b,n.point.length=m,n.hemi.length=v,n.sunShadow.length=f,n.sunShadowMap.length=f,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.directionalShadowMatrix.length=M,n.pointShadow.length=S,n.pointShadowMap.length=S,n.pointShadowMatrix.length=S,n.spotShadow.length=A,n.spotShadowMap.length=A,n.spotLightMatrix.length=A+x-E,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=C,P.sunLength=d,P.directionalLength=g,P.pointLength=m,P.spotLength=T,P.rectAreaLength=b,P.hemiLength=v,P.numSunShadows=f,P.numDirectionalShadows=M,P.numPointShadows=S,P.numSpotShadows=A,P.numSpotMaps=x,P.numLightProbes=C,n.version=$b++)}function l(h,u){let p=0,c=0,d=0,f=0,_=0,g=0,m=u.matrixWorldInverse;for(let T=0,b=h.length;T<b;T++){let v=h[T];if(v.isSunLight){let M=n.sun[p];M.direction.setFromMatrixPosition(v.matrixWorld),M.direction.transformDirection(m),p++}else if(v.isDirectionalLight){let M=n.directional[c];M.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),c++}else if(v.isSpotLight){let M=n.spot[f];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),f++}else if(v.isRectAreaLight){let M=n.rectArea[_];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(m),o.identity(),r.copy(v.matrixWorld),r.premultiply(m),o.extractRotation(r),M.halfWidth.set(v.width*.5,0,0),M.halfHeight.set(0,v.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),_++}else if(v.isPointLight){let M=n.point[d];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(m),d++}else if(v.isHemisphereLight){let M=n.hemi[g];M.direction.setFromMatrixPosition(v.matrixWorld),M.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:n}}function pm(i){let t=new Vb(i),e=[],n=[],s=[];function r(c){p.camera=c,e.length=0,n.length=0,s.length=0}function o(c){e.push(c)}function a(c){n.push(c)}function l(c){s.push(c)}function h(){t.setup(e)}function u(c){t.setupView(e,c)}let p={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:p,setupLights:h,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function Gb(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new pm(i),t.set(s,[a])):r>=o.length?(a=new pm(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var Wb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Xb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Yb=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],qb=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],fm=new fe,Ko=new L,Ju=new L;function Kb(i,t,e){let n=new ur,s=new at,r=new at,o=new Ee,a=new yl,l=new bl,h={},u=e.maxTextureSize,p={[Vi]:an,[an]:Vi,[We]:We},c=new Je({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new at},radius:{value:4}},vertexShader:Wb,fragmentShader:Xb}),d=c.clone();d.defines.HORIZONTAL_PASS=1;let f=new ke;f.setAttribute("position",new Xe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Vt(f,c),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bo;let m=this.type;this.render=function(S,A,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;this.type===sf&&(Ht("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Bo);let E=i.getRenderTarget(),C=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),D=i.state;D.setBlending(ni),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);let O=m!==this.type;O&&A.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(F=>F.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,F=S.length;I<F;I++){let V=S[I],W=V.shadow;if(W===void 0){Ht("WebGLShadowMap:",V,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);let st=W.getFrameExtents();s.multiply(st),r.copy(W.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/st.x),s.x=r.x*st.x,W.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/st.y),s.y=r.y*st.y,W.mapSize.y=r.y));let X=i.state.buffers.depth.getReversed();if(W.camera._reversedDepth=X,W.map===null||O===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===xr){if(V.isPointLight){Ht("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new un(s.x,s.y,{format:qi,type:Gn,minFilter:Ye,magFilter:Ye,generateMipmaps:!1}),W.map.texture.name=V.name+".shadowMap",W.map.depthTexture=new Ui(s.x,s.y,Vn),W.map.depthTexture.name=V.name+".shadowMapDepth",W.map.depthTexture.format=ei,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Ve,W.map.depthTexture.magFilter=Ve}else V.isPointLight?(W.map=new Cc(s.x),W.map.depthTexture=new dl(s.x,Hn)):(W.map=new un(s.x,s.y),W.map.depthTexture=new Ui(s.x,s.y,Hn)),W.map.depthTexture.name=V.name+".shadowMap",W.map.depthTexture.format=ei,this.type===Bo?(W.map.depthTexture.compareFunction=X?wc:Sc,W.map.depthTexture.minFilter=Ye,W.map.depthTexture.magFilter=Ye):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Ve,W.map.depthTexture.magFilter=Ve);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==s.x||W.map.height!==s.y)&&W.map.setSize(s.x,s.y);let tt=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();V.isPointLight!==!0&&W.updateMatrices(V,x);for(let it=0;it<tt;it++){let Lt=W.getCamera(it);if(V.isPointLight){let Ct=W.camera,ae=W.matrix,ee=V.distance||Ct.far;ee!==Ct.far&&(Ct.far=ee,Ct.updateProjectionMatrix()),Ko.setFromMatrixPosition(V.matrixWorld),Ct.position.copy(Ko),Ju.copy(Ct.position),Ju.add(Yb[it]),Ct.up.copy(qb[it]),Ct.lookAt(Ju),Ct.updateMatrixWorld(),ae.makeTranslation(-Ko.x,-Ko.y,-Ko.z),fm.multiplyMatrices(Ct.projectionMatrix,Ct.matrixWorldInverse),W._frustum.setFromProjectionMatrix(fm,Ct.coordinateSystem,Ct.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)i.setRenderTarget(W.map,it),i.clear();else{it===0&&(i.setRenderTarget(W.map),i.clear());let Ct=W.getViewport(it);o.set(r.x*Ct.x,r.y*Ct.y,r.x*Ct.z,r.y*Ct.w),D.viewport(o)}n=W.getFrustum(it),v(A,x,Lt,V,this.type)}W.isPointLightShadow!==!0&&this.type===xr&&T(W,x),W.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(E,C,P)};function T(S,A){let x=t.update(_);c.defines.VSM_SAMPLES!==S.blurSamples&&(c.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,c.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null?S.mapPass=new un(s.x,s.y,{format:qi,type:Gn}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),c.uniforms.shadow_pass.value=S.map.depthTexture,c.uniforms.resolution.value.set(S.map.width,S.map.height),c.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(A,null,x,c,_,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value.set(S.map.width,S.map.height),d.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(A,null,x,d,_,null)}function b(S,A,x,E){let C=null,P=x.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(P!==void 0)C=P;else if(C=x.isPointLight===!0?l:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let D=C.uuid,O=A.uuid,I=h[D];I===void 0&&(I={},h[D]=I);let F=I[O];F===void 0&&(F=C.clone(),I[O]=F,A.addEventListener("dispose",M)),C=F}if(C.visible=A.visible,C.wireframe=A.wireframe,E===xr?C.side=A.shadowSide!==null?A.shadowSide:A.side:C.side=A.shadowSide!==null?A.shadowSide:p[A.side],C.alphaMap=A.alphaMap,C.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,C.map=A.map,C.clipShadows=A.clipShadows,C.clippingPlanes=A.clippingPlanes,C.clipIntersection=A.clipIntersection,C.displacementMap=A.displacementMap,C.displacementScale=A.displacementScale,C.displacementBias=A.displacementBias,C.wireframeLinewidth=A.wireframeLinewidth,C.linewidth=A.linewidth,x.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let D=i.properties.get(C);D.light=x}return C}function v(S,A,x,E,C){if(S.visible===!1)return;if(S.layers.test(A.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&C===xr)&&(!S.frustumCulled||S.intersectsFrustum(n))){S.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,S.matrixWorld);let O=t.update(S),I=S.material;if(Array.isArray(I)){let F=O.groups;for(let V=0,W=F.length;V<W;V++){let st=F[V],X=I[st.materialIndex];if(X&&X.visible){let tt=b(S,X,E,C);S.onBeforeShadow(i,S,A,x,O,tt,st),i.renderBufferDirect(x,null,O,tt,S,st),S.onAfterShadow(i,S,A,x,O,tt,st)}}}else if(I.visible){let F=b(S,I,E,C);S.onBeforeShadow(i,S,A,x,O,F,null),i.renderBufferDirect(x,null,O,F,S,null),S.onAfterShadow(i,S,A,x,O,F,null)}}let D=S.children;for(let O=0,I=D.length;O<I;O++)v(D[O],A,x,E,C)}function M(S){S.target.removeEventListener("dispose",M);for(let x in h){let E=h[x],C=S.target.uuid;C in E&&(E[C].dispose(),delete E[C])}}}function Zb(i,t){function e(){let U=!1,_t=new Ee,J=null,xt=new Ee(0,0,0,0);return{setMask:function(wt){J!==wt&&!U&&(i.colorMask(wt,wt,wt,wt),J=wt)},setLocked:function(wt){U=wt},setClear:function(wt,ot,Ut,It,ve){ve===!0&&(wt*=It,ot*=It,Ut*=It),_t.set(wt,ot,Ut,It),xt.equals(_t)===!1&&(i.clearColor(wt,ot,Ut,It),xt.copy(_t))},reset:function(){U=!1,J=null,xt.set(-1,0,0,0)}}}function n(){let U=!1,_t=!1,J=null,xt=null,wt=null;return{setReversed:function(ot){if(_t!==ot){let Ut=t.get("EXT_clip_control");ot?Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.ZERO_TO_ONE_EXT):Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.NEGATIVE_ONE_TO_ONE_EXT),_t=ot;let It=wt;wt=null,this.setClear(It)}},getReversed:function(){return _t},setTest:function(ot){ot?et(i.DEPTH_TEST):bt(i.DEPTH_TEST)},setMask:function(ot){J!==ot&&!U&&(i.depthMask(ot),J=ot)},setFunc:function(ot){if(_t&&(ot=Bf[ot]),xt!==ot){switch(ot){case ja:i.depthFunc(i.NEVER);break;case Ja:i.depthFunc(i.ALWAYS);break;case Qa:i.depthFunc(i.LESS);break;case sr:i.depthFunc(i.LEQUAL);break;case tl:i.depthFunc(i.EQUAL);break;case el:i.depthFunc(i.GEQUAL);break;case nl:i.depthFunc(i.GREATER);break;case il:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}xt=ot}},setLocked:function(ot){U=ot},setClear:function(ot){wt!==ot&&(wt=ot,_t&&(ot=1-ot),i.clearDepth(ot))},reset:function(){U=!1,J=null,xt=null,wt=null,_t=!1}}}function s(){let U=!1,_t=null,J=null,xt=null,wt=null,ot=null,Ut=null,It=null,ve=null;return{setTest:function(ce){U||(ce?et(i.STENCIL_TEST):bt(i.STENCIL_TEST))},setMask:function(ce){_t!==ce&&!U&&(i.stencilMask(ce),_t=ce)},setFunc:function(ce,Dn,Yn){(J!==ce||xt!==Dn||wt!==Yn)&&(i.stencilFunc(ce,Dn,Yn),J=ce,xt=Dn,wt=Yn)},setOp:function(ce,Dn,Yn){(ot!==ce||Ut!==Dn||It!==Yn)&&(i.stencilOp(ce,Dn,Yn),ot=ce,Ut=Dn,It=Yn)},setLocked:function(ce){U=ce},setClear:function(ce){ve!==ce&&(i.clearStencil(ce),ve=ce)},reset:function(){U=!1,_t=null,J=null,xt=null,wt=null,ot=null,Ut=null,It=null,ve=null}}}let r=new e,o=new n,a=new s,l=new WeakMap,h=new WeakMap,u={},p={},c={},d=new WeakMap,f=[],_=null,g=!1,m=null,T=null,b=null,v=null,M=null,S=null,A=null,x=new Zt(0,0,0),E=0,C=!1,P=null,D=null,O=null,I=null,F=null,V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,st=0,X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(st=parseFloat(/^WebGL (\d)/.exec(X)[1]),W=st>=1):X.indexOf("OpenGL ES")!==-1&&(st=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),W=st>=2);let tt=null,it={},Lt=i.getParameter(i.SCISSOR_BOX),Ct=i.getParameter(i.VIEWPORT),ae=new Ee().fromArray(Lt),ee=new Ee().fromArray(Ct);function re(U,_t,J,xt){let wt=new Uint8Array(4),ot=i.createTexture();i.bindTexture(U,ot),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ut=0;Ut<J;Ut++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(_t,0,i.RGBA,1,1,xt,0,i.RGBA,i.UNSIGNED_BYTE,wt):i.texImage2D(_t+Ut,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,wt);return ot}let j={};j[i.TEXTURE_2D]=re(i.TEXTURE_2D,i.TEXTURE_2D,1),j[i.TEXTURE_CUBE_MAP]=re(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[i.TEXTURE_2D_ARRAY]=re(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),j[i.TEXTURE_3D]=re(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),et(i.DEPTH_TEST),o.setFunc(sr),ut(!1),ft(pu),et(i.CULL_FACE),lt(ni);function et(U){u[U]!==!0&&(i.enable(U),u[U]=!0)}function bt(U){u[U]!==!1&&(i.disable(U),u[U]=!1)}function Wt(U,_t){return c[U]!==_t?(i.bindFramebuffer(U,_t),c[U]=_t,U===i.DRAW_FRAMEBUFFER&&(c[i.FRAMEBUFFER]=_t),U===i.FRAMEBUFFER&&(c[i.DRAW_FRAMEBUFFER]=_t),!0):!1}function Tt(U,_t){let J=f,xt=!1;if(U){J=d.get(_t),J===void 0&&(J=[],d.set(_t,J));let wt=U.textures;if(J.length!==wt.length||J[0]!==i.COLOR_ATTACHMENT0){for(let ot=0,Ut=wt.length;ot<Ut;ot++)J[ot]=i.COLOR_ATTACHMENT0+ot;J.length=wt.length,xt=!0}}else J[0]!==i.BACK&&(J[0]=i.BACK,xt=!0);xt&&i.drawBuffers(J)}function Xt(U){return _!==U?(i.useProgram(U),_=U,!0):!1}let pe={[Ms]:i.FUNC_ADD,[of]:i.FUNC_SUBTRACT,[af]:i.FUNC_REVERSE_SUBTRACT};pe[lf]=i.MIN,pe[cf]=i.MAX;let nt={[hf]:i.ZERO,[uf]:i.ONE,[df]:i.SRC_COLOR,[gu]:i.SRC_ALPHA,[xf]:i.SRC_ALPHA_SATURATE,[gf]:i.DST_COLOR,[ff]:i.DST_ALPHA,[pf]:i.ONE_MINUS_SRC_COLOR,[_u]:i.ONE_MINUS_SRC_ALPHA,[_f]:i.ONE_MINUS_DST_COLOR,[mf]:i.ONE_MINUS_DST_ALPHA,[vf]:i.CONSTANT_COLOR,[yf]:i.ONE_MINUS_CONSTANT_COLOR,[bf]:i.CONSTANT_ALPHA,[Mf]:i.ONE_MINUS_CONSTANT_ALPHA};function lt(U,_t,J,xt,wt,ot,Ut,It,ve,ce){if(U===ni){g===!0&&(bt(i.BLEND),g=!1);return}if(g===!1&&(et(i.BLEND),g=!0),U!==rf){if(U!==m||ce!==C){if((T!==Ms||M!==Ms)&&(i.blendEquation(i.FUNC_ADD),T=Ms,M=Ms),ce)switch(U){case vr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Gi:i.blendFunc(i.ONE,i.ONE);break;case fu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case mu:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Gt("WebGLState: Invalid blending: ",U);break}else switch(U){case vr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Gi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case fu:Gt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case mu:Gt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Gt("WebGLState: Invalid blending: ",U);break}b=null,v=null,S=null,A=null,x.set(0,0,0),E=0,m=U,C=ce}return}wt=wt||_t,ot=ot||J,Ut=Ut||xt,(_t!==T||wt!==M)&&(i.blendEquationSeparate(pe[_t],pe[wt]),T=_t,M=wt),(J!==b||xt!==v||ot!==S||Ut!==A)&&(i.blendFuncSeparate(nt[J],nt[xt],nt[ot],nt[Ut]),b=J,v=xt,S=ot,A=Ut),(It.equals(x)===!1||ve!==E)&&(i.blendColor(It.r,It.g,It.b,ve),x.copy(It),E=ve),m=U,C=!1}function ht(U,_t){U.side===We?bt(i.CULL_FACE):et(i.CULL_FACE);let J=U.side===an;_t&&(J=!J),ut(J),U.blending===vr&&U.transparent===!1?lt(ni):lt(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);let xt=U.stencilWrite;a.setTest(xt),xt&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Ot(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?et(i.SAMPLE_ALPHA_TO_COVERAGE):bt(i.SAMPLE_ALPHA_TO_COVERAGE)}function ut(U){P!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),P=U)}function ft(U){U!==ef?(et(i.CULL_FACE),U!==D&&(U===pu?i.cullFace(i.BACK):U===nf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):bt(i.CULL_FACE),D=U}function Bt(U){U!==O&&(W&&i.lineWidth(U),O=U)}function Ot(U,_t,J){U?(et(i.POLYGON_OFFSET_FILL),(I!==_t||F!==J)&&(I=_t,F=J,o.getReversed()&&(_t=-_t),i.polygonOffset(_t,J))):bt(i.POLYGON_OFFSET_FILL)}function Yt(U){U?et(i.SCISSOR_TEST):bt(i.SCISSOR_TEST)}function Kt(U){U===void 0&&(U=i.TEXTURE0+V-1),tt!==U&&(i.activeTexture(U),tt=U)}function N(U,_t,J){J===void 0&&(tt===null?J=i.TEXTURE0+V-1:J=tt);let xt=it[J];xt===void 0&&(xt={type:void 0,texture:void 0},it[J]=xt),(xt.type!==U||xt.texture!==_t)&&(tt!==J&&(i.activeTexture(J),tt=J),i.bindTexture(U,_t||j[U]),xt.type=U,xt.texture=_t)}function le(){let U=it[tt];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function ne(){try{i.compressedTexImage2D(...arguments)}catch(U){Gt("WebGLState:",U)}}function R(){try{i.compressedTexImage3D(...arguments)}catch(U){Gt("WebGLState:",U)}}function y(){try{i.texSubImage2D(...arguments)}catch(U){Gt("WebGLState:",U)}}function B(){try{i.texSubImage3D(...arguments)}catch(U){Gt("WebGLState:",U)}}function H(){try{i.compressedTexSubImage2D(...arguments)}catch(U){Gt("WebGLState:",U)}}function K(){try{i.compressedTexSubImage3D(...arguments)}catch(U){Gt("WebGLState:",U)}}function dt(){try{i.texStorage2D(...arguments)}catch(U){Gt("WebGLState:",U)}}function pt(){try{i.texStorage3D(...arguments)}catch(U){Gt("WebGLState:",U)}}function Z(){try{i.texImage2D(...arguments)}catch(U){Gt("WebGLState:",U)}}function Q(){try{i.texImage3D(...arguments)}catch(U){Gt("WebGLState:",U)}}function mt(U){return p[U]!==void 0?p[U]:i.getParameter(U)}function Nt(U,_t){p[U]!==_t&&(i.pixelStorei(U,_t),p[U]=_t)}function vt(U){ae.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),ae.copy(U))}function gt(U){ee.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),ee.copy(U))}function kt(U,_t){let J=h.get(_t);J===void 0&&(J=new WeakMap,h.set(_t,J));let xt=J.get(U);xt===void 0&&(xt=i.getUniformBlockIndex(_t,U.name),J.set(U,xt))}function zt(U,_t){let xt=h.get(_t).get(U);l.get(_t)!==xt&&(i.uniformBlockBinding(_t,xt,U.__bindingPointIndex),l.set(_t,xt))}function jt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},p={},tt=null,it={},c={},d=new WeakMap,f=[],_=null,g=!1,m=null,T=null,b=null,v=null,M=null,S=null,A=null,x=new Zt(0,0,0),E=0,C=!1,P=null,D=null,O=null,I=null,F=null,ae.set(0,0,i.canvas.width,i.canvas.height),ee.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:et,disable:bt,bindFramebuffer:Wt,drawBuffers:Tt,useProgram:Xt,setBlending:lt,setMaterial:ht,setFlipSided:ut,setCullFace:ft,setLineWidth:Bt,setPolygonOffset:Ot,setScissorTest:Yt,activeTexture:Kt,bindTexture:N,unbindTexture:le,compressedTexImage2D:ne,compressedTexImage3D:R,texImage2D:Z,texImage3D:Q,pixelStorei:Nt,getParameter:mt,updateUBOMapping:kt,uniformBlockBinding:zt,texStorage2D:dt,texStorage3D:pt,texSubImage2D:y,texSubImage3D:B,compressedTexSubImage2D:H,compressedTexSubImage3D:K,scissor:vt,viewport:gt,reset:jt}}function jb(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new at,u=new WeakMap,p=new Set,c,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(R,y){return f?new OffscreenCanvas(R,y):_o("canvas")}function g(R,y,B){let H=1,K=ne(R);if((K.width>B||K.height>B)&&(H=B/Math.max(K.width,K.height)),H<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let dt=Math.floor(H*K.width),pt=Math.floor(H*K.height);c===void 0&&(c=_(dt,pt));let Z=y?_(dt,pt):c;return Z.width=dt,Z.height=pt,Z.getContext("2d").drawImage(R,0,0,dt,pt),Ht("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+dt+"x"+pt+")."),Z}else return"data"in R&&Ht("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),R;return R}function m(R){return R.generateMipmaps}function T(R){i.generateMipmap(R)}function b(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(R,y,B,H,K,dt=!1){if(R!==null){if(i[R]!==void 0)return i[R];Ht("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let pt;H&&(pt=t.get("EXT_texture_norm16"),pt||Ht("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=y;if(y===i.RED&&(B===i.FLOAT&&(Z=i.R32F),B===i.HALF_FLOAT&&(Z=i.R16F),B===i.UNSIGNED_BYTE&&(Z=i.R8),B===i.UNSIGNED_SHORT&&pt&&(Z=pt.R16_EXT),B===i.SHORT&&pt&&(Z=pt.R16_SNORM_EXT)),y===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(Z=i.R8UI),B===i.UNSIGNED_SHORT&&(Z=i.R16UI),B===i.UNSIGNED_INT&&(Z=i.R32UI),B===i.BYTE&&(Z=i.R8I),B===i.SHORT&&(Z=i.R16I),B===i.INT&&(Z=i.R32I)),y===i.RG&&(B===i.FLOAT&&(Z=i.RG32F),B===i.HALF_FLOAT&&(Z=i.RG16F),B===i.UNSIGNED_BYTE&&(Z=i.RG8),B===i.UNSIGNED_SHORT&&pt&&(Z=pt.RG16_EXT),B===i.SHORT&&pt&&(Z=pt.RG16_SNORM_EXT)),y===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(Z=i.RG8UI),B===i.UNSIGNED_SHORT&&(Z=i.RG16UI),B===i.UNSIGNED_INT&&(Z=i.RG32UI),B===i.BYTE&&(Z=i.RG8I),B===i.SHORT&&(Z=i.RG16I),B===i.INT&&(Z=i.RG32I)),y===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),B===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),B===i.UNSIGNED_INT&&(Z=i.RGB32UI),B===i.BYTE&&(Z=i.RGB8I),B===i.SHORT&&(Z=i.RGB16I),B===i.INT&&(Z=i.RGB32I)),y===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),B===i.UNSIGNED_INT&&(Z=i.RGBA32UI),B===i.BYTE&&(Z=i.RGBA8I),B===i.SHORT&&(Z=i.RGBA16I),B===i.INT&&(Z=i.RGBA32I)),y===i.RGB&&(B===i.UNSIGNED_SHORT&&pt&&(Z=pt.RGB16_EXT),B===i.SHORT&&pt&&(Z=pt.RGB16_SNORM_EXT),B===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(Z=i.R11F_G11F_B10F)),y===i.RGBA){let Q=dt?go:se.getTransfer(K);B===i.FLOAT&&(Z=i.RGBA32F),B===i.HALF_FLOAT&&(Z=i.RGBA16F),B===i.UNSIGNED_BYTE&&(Z=Q===ue?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT&&pt&&(Z=pt.RGBA16_EXT),B===i.SHORT&&pt&&(Z=pt.RGBA16_SNORM_EXT),B===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function M(R,y){let B;return R?y===null||y===Hn||y===br?B=i.DEPTH24_STENCIL8:y===Vn?B=i.DEPTH32F_STENCIL8:y===yr&&(B=i.DEPTH24_STENCIL8,Ht("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Hn||y===br?B=i.DEPTH_COMPONENT24:y===Vn?B=i.DEPTH_COMPONENT32F:y===yr&&(B=i.DEPTH_COMPONENT16),B}function S(R,y){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==Ve&&R.minFilter!==Ye?Math.log2(Math.max(y.width,y.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?y.mipmaps.length:1}function A(R){let y=R.target;y.removeEventListener("dispose",A),E(y),y.isVideoTexture&&u.delete(y),y.isHTMLTexture&&p.delete(y)}function x(R){let y=R.target;y.removeEventListener("dispose",x),P(y)}function E(R){let y=n.get(R);if(y.__webglInit===void 0)return;let B=R.source,H=d.get(B);if(H){let K=H[y.__cacheKey];K.usedTimes--,K.usedTimes===0&&C(R),Object.keys(H).length===0&&d.delete(B)}n.remove(R)}function C(R){let y=n.get(R);i.deleteTexture(y.__webglTexture);let B=R.source,H=d.get(B);delete H[y.__cacheKey],o.memory.textures--}function P(R){let y=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(y.__webglFramebuffer[H]))for(let K=0;K<y.__webglFramebuffer[H].length;K++)i.deleteFramebuffer(y.__webglFramebuffer[H][K]);else i.deleteFramebuffer(y.__webglFramebuffer[H]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[H])}else{if(Array.isArray(y.__webglFramebuffer))for(let H=0;H<y.__webglFramebuffer.length;H++)i.deleteFramebuffer(y.__webglFramebuffer[H]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let H=0;H<y.__webglColorRenderbuffer.length;H++)y.__webglColorRenderbuffer[H]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[H]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let B=R.textures;for(let H=0,K=B.length;H<K;H++){let dt=n.get(B[H]);dt.__webglTexture&&(i.deleteTexture(dt.__webglTexture),o.memory.textures--),n.remove(B[H])}n.remove(R)}let D=0;function O(){D=0}function I(){return D}function F(R){D=R}function V(){let R=D;return R>=s.maxTextures&&Ht("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+s.maxTextures),D+=1,R}function W(R){let y=[];return y.push(R.wrapS),y.push(R.wrapT),y.push(R.wrapR||0),y.push(R.magFilter),y.push(R.minFilter),y.push(R.anisotropy),y.push(R.internalFormat),y.push(R.format),y.push(R.type),y.push(R.generateMipmaps),y.push(R.premultiplyAlpha),y.push(R.flipY),y.push(R.unpackAlignment),y.push(R.colorSpace),y.join()}function st(R,y){let B=n.get(R);if(R.isVideoTexture&&N(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&B.__version!==R.version){let H=R.image;if(H===null)Ht("WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)Ht("WebGLRenderer: Texture marked for update but image is incomplete");else{bt(B,R,y);return}}else R.isExternalTexture&&(B.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+y)}function X(R,y){let B=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&B.__version!==R.version){bt(B,R,y);return}else R.isExternalTexture&&(B.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+y)}function tt(R,y){let B=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&B.__version!==R.version){bt(B,R,y);return}e.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+y)}function it(R,y){let B=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&B.__version!==R.version){Wt(B,R,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+y)}let Lt={[sl]:i.REPEAT,[ti]:i.CLAMP_TO_EDGE,[rl]:i.MIRRORED_REPEAT},Ct={[Ve]:i.NEAREST,[Tf]:i.NEAREST_MIPMAP_NEAREST,[$o]:i.NEAREST_MIPMAP_LINEAR,[Ye]:i.LINEAR,[Bl]:i.LINEAR_MIPMAP_NEAREST,[Xi]:i.LINEAR_MIPMAP_LINEAR},ae={[Rf]:i.NEVER,[Nf]:i.ALWAYS,[Pf]:i.LESS,[Sc]:i.LEQUAL,[If]:i.EQUAL,[wc]:i.GEQUAL,[Df]:i.GREATER,[Lf]:i.NOTEQUAL};function ee(R,y){if(y.type===Vn&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===Ye||y.magFilter===Bl||y.magFilter===$o||y.magFilter===Xi||y.minFilter===Ye||y.minFilter===Bl||y.minFilter===$o||y.minFilter===Xi)&&Ht("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,Lt[y.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,Lt[y.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,Lt[y.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,Ct[y.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,Ct[y.minFilter]),y.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,ae[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Ve||y.minFilter!==$o&&y.minFilter!==Xi||y.type===Vn&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){let B=t.get("EXT_texture_filter_anisotropic");i.texParameterf(R,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function re(R,y){let B=!1;R.__webglInit===void 0&&(R.__webglInit=!0,y.addEventListener("dispose",A));let H=y.source,K=d.get(H);K===void 0&&(K={},d.set(H,K));let dt=W(y);if(dt!==R.__cacheKey){K[dt]===void 0&&(K[dt]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,B=!0),K[dt].usedTimes++;let pt=K[R.__cacheKey];pt!==void 0&&(K[R.__cacheKey].usedTimes--,pt.usedTimes===0&&C(y)),R.__cacheKey=dt,R.__webglTexture=K[dt].texture}return B}function j(R,y,B){return Math.floor(Math.floor(R/B)/y)}function et(R,y,B,H){let dt=R.updateRanges;if(dt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,B,H,y.data);else{dt.sort((Nt,vt)=>Nt.start-vt.start);let pt=0;for(let Nt=1;Nt<dt.length;Nt++){let vt=dt[pt],gt=dt[Nt],kt=vt.start+vt.count,zt=j(gt.start,y.width,4),jt=j(vt.start,y.width,4);gt.start<=kt+1&&zt===jt&&j(gt.start+gt.count-1,y.width,4)===zt?vt.count=Math.max(vt.count,gt.start+gt.count-vt.start):(++pt,dt[pt]=gt)}dt.length=pt+1;let Z=e.getParameter(i.UNPACK_ROW_LENGTH),Q=e.getParameter(i.UNPACK_SKIP_PIXELS),mt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let Nt=0,vt=dt.length;Nt<vt;Nt++){let gt=dt[Nt],kt=Math.floor(gt.start/4),zt=Math.ceil(gt.count/4),jt=kt%y.width,U=Math.floor(kt/y.width),_t=zt,J=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,jt),e.pixelStorei(i.UNPACK_SKIP_ROWS,U),e.texSubImage2D(i.TEXTURE_2D,0,jt,U,_t,J,B,H,y.data)}R.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,Z),e.pixelStorei(i.UNPACK_SKIP_PIXELS,Q),e.pixelStorei(i.UNPACK_SKIP_ROWS,mt)}}function bt(R,y,B){let H=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(H=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(H=i.TEXTURE_3D);let K=re(R,y),dt=y.source;e.bindTexture(H,R.__webglTexture,i.TEXTURE0+B);let pt=n.get(dt);if(dt.version!==pt.__version||K===!0){if(e.activeTexture(i.TEXTURE0+B),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){let J=se.getPrimaries(se.workingColorSpace),xt=y.colorSpace===vi?null:se.getPrimaries(y.colorSpace),wt=y.colorSpace===vi||J===xt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt)}e.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment);let Q=g(y.image,!1,s.maxTextureSize);Q=le(y,Q);let mt=r.convert(y.format,y.colorSpace),Nt=r.convert(y.type),vt=v(y.internalFormat,mt,Nt,y.normalized,y.colorSpace,y.isVideoTexture);ee(H,y);let gt,kt=y.mipmaps,zt=y.isVideoTexture!==!0,jt=pt.__version===void 0||K===!0,U=dt.dataReady,_t=S(y,Q);if(y.isDepthTexture)vt=M(y.format===Yi,y.type),jt&&(zt?e.texStorage2D(i.TEXTURE_2D,1,vt,Q.width,Q.height):e.texImage2D(i.TEXTURE_2D,0,vt,Q.width,Q.height,0,mt,Nt,null));else if(y.isDataTexture)if(kt.length>0){zt&&jt&&e.texStorage2D(i.TEXTURE_2D,_t,vt,kt[0].width,kt[0].height);for(let J=0,xt=kt.length;J<xt;J++)gt=kt[J],zt?U&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,gt.width,gt.height,mt,Nt,gt.data):e.texImage2D(i.TEXTURE_2D,J,vt,gt.width,gt.height,0,mt,Nt,gt.data);y.generateMipmaps=!1}else zt?(jt&&e.texStorage2D(i.TEXTURE_2D,_t,vt,Q.width,Q.height),U&&et(y,Q,mt,Nt)):e.texImage2D(i.TEXTURE_2D,0,vt,Q.width,Q.height,0,mt,Nt,Q.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){zt&&jt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,_t,vt,kt[0].width,kt[0].height,Q.depth);for(let J=0,xt=kt.length;J<xt;J++)if(gt=kt[J],y.format!==Pn)if(mt!==null)if(zt){if(U)if(y.layerUpdates.size>0){let wt=$u(gt.width,gt.height,y.format,y.type);for(let ot of y.layerUpdates){let Ut=gt.data.subarray(ot*wt/gt.data.BYTES_PER_ELEMENT,(ot+1)*wt/gt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,ot,gt.width,gt.height,1,mt,Ut)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,gt.width,gt.height,Q.depth,mt,gt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,vt,gt.width,gt.height,Q.depth,0,gt.data,0,0);else Ht("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else zt?U&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,gt.width,gt.height,Q.depth,mt,Nt,gt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,J,vt,gt.width,gt.height,Q.depth,0,mt,Nt,gt.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{zt&&jt&&e.texStorage2D(i.TEXTURE_2D,_t,vt,kt[0].width,kt[0].height);for(let J=0,xt=kt.length;J<xt;J++)gt=kt[J],y.format!==Pn?mt!==null?zt?U&&e.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,gt.width,gt.height,mt,gt.data):e.compressedTexImage2D(i.TEXTURE_2D,J,vt,gt.width,gt.height,0,gt.data):Ht("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):zt?U&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,gt.width,gt.height,mt,Nt,gt.data):e.texImage2D(i.TEXTURE_2D,J,vt,gt.width,gt.height,0,mt,Nt,gt.data)}else if(y.isDataArrayTexture)if(zt){if(jt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,_t,vt,Q.width,Q.height,Q.depth),U)if(y.layerUpdates.size>0){let J=$u(Q.width,Q.height,y.format,y.type);for(let xt of y.layerUpdates){let wt=Q.data.subarray(xt*J/Q.data.BYTES_PER_ELEMENT,(xt+1)*J/Q.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,xt,Q.width,Q.height,1,mt,Nt,wt)}y.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,mt,Nt,Q.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,vt,Q.width,Q.height,Q.depth,0,mt,Nt,Q.data);else if(y.isData3DTexture)zt?(jt&&e.texStorage3D(i.TEXTURE_3D,_t,vt,Q.width,Q.height,Q.depth),U&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,mt,Nt,Q.data)):e.texImage3D(i.TEXTURE_3D,0,vt,Q.width,Q.height,Q.depth,0,mt,Nt,Q.data);else if(y.isFramebufferTexture){if(jt)if(zt)e.texStorage2D(i.TEXTURE_2D,_t,vt,Q.width,Q.height);else{let J=Q.width,xt=Q.height;for(let wt=0;wt<_t;wt++)e.texImage2D(i.TEXTURE_2D,wt,vt,J,xt,0,mt,Nt,null),J>>=1,xt>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in i){let J=i.canvas;if(J.hasAttribute("layoutsubtree")||J.setAttribute("layoutsubtree","true"),Q.parentNode!==J){J.appendChild(Q),p.add(y),J.onpaint=xt=>{let wt=xt.changedElements;for(let ot of p)wt.includes(ot.image)&&(ot.needsUpdate=!0)},J.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,Q);else{let wt=i.RGBA,ot=i.RGBA,Ut=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,wt,ot,Ut,Q)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(kt.length>0){if(zt&&jt){let J=ne(kt[0]);e.texStorage2D(i.TEXTURE_2D,_t,vt,J.width,J.height)}for(let J=0,xt=kt.length;J<xt;J++)gt=kt[J],zt?U&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,mt,Nt,gt):e.texImage2D(i.TEXTURE_2D,J,vt,mt,Nt,gt);y.generateMipmaps=!1}else if(zt){if(jt){let J=ne(Q);e.texStorage2D(i.TEXTURE_2D,_t,vt,J.width,J.height)}U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,mt,Nt,Q)}else e.texImage2D(i.TEXTURE_2D,0,vt,mt,Nt,Q);m(y)&&T(H),pt.__version=dt.version,y.onUpdate&&y.onUpdate(y)}R.__version=y.version}function Wt(R,y,B){if(y.image.length!==6)return;let H=re(R,y),K=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+B);let dt=n.get(K);if(K.version!==dt.__version||H===!0){e.activeTexture(i.TEXTURE0+B);let pt=se.getPrimaries(se.workingColorSpace),Z=y.colorSpace===vi?null:se.getPrimaries(y.colorSpace),Q=y.colorSpace===vi||pt===Z?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);let mt=y.isCompressedTexture||y.image[0].isCompressedTexture,Nt=y.image[0]&&y.image[0].isDataTexture,vt=[];for(let ot=0;ot<6;ot++)!mt&&!Nt?vt[ot]=g(y.image[ot],!0,s.maxCubemapSize):vt[ot]=Nt?y.image[ot].image:y.image[ot],vt[ot]=le(y,vt[ot]);let gt=vt[0],kt=r.convert(y.format,y.colorSpace),zt=r.convert(y.type),jt=v(y.internalFormat,kt,zt,y.normalized,y.colorSpace),U=y.isVideoTexture!==!0,_t=dt.__version===void 0||H===!0,J=K.dataReady,xt=S(y,gt);ee(i.TEXTURE_CUBE_MAP,y);let wt;if(mt){U&&_t&&e.texStorage2D(i.TEXTURE_CUBE_MAP,xt,jt,gt.width,gt.height);for(let ot=0;ot<6;ot++){wt=vt[ot].mipmaps;for(let Ut=0;Ut<wt.length;Ut++){let It=wt[Ut];y.format!==Pn?kt!==null?U?J&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Ut,0,0,It.width,It.height,kt,It.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Ut,jt,It.width,It.height,0,It.data):Ht("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Ut,0,0,It.width,It.height,kt,zt,It.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Ut,jt,It.width,It.height,0,kt,zt,It.data)}}}else{if(wt=y.mipmaps,U&&_t){wt.length>0&&xt++;let ot=ne(vt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,xt,jt,ot.width,ot.height)}for(let ot=0;ot<6;ot++)if(Nt){U?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,vt[ot].width,vt[ot].height,kt,zt,vt[ot].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,jt,vt[ot].width,vt[ot].height,0,kt,zt,vt[ot].data);for(let Ut=0;Ut<wt.length;Ut++){let ve=wt[Ut].image[ot].image;U?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Ut+1,0,0,ve.width,ve.height,kt,zt,ve.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Ut+1,jt,ve.width,ve.height,0,kt,zt,ve.data)}}else{U?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,kt,zt,vt[ot]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,jt,kt,zt,vt[ot]);for(let Ut=0;Ut<wt.length;Ut++){let It=wt[Ut];U?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Ut+1,0,0,kt,zt,It.image[ot]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Ut+1,jt,kt,zt,It.image[ot])}}}m(y)&&T(i.TEXTURE_CUBE_MAP),dt.__version=K.version,y.onUpdate&&y.onUpdate(y)}R.__version=y.version}function Tt(R,y,B,H,K,dt){let pt=r.convert(B.format,B.colorSpace),Z=r.convert(B.type),Q=v(B.internalFormat,pt,Z,B.normalized,B.colorSpace),mt=n.get(y),Nt=n.get(B);if(Nt.__renderTarget=y,!mt.__hasExternalTextures){let vt=Math.max(1,y.width>>dt),gt=Math.max(1,y.height>>dt);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?e.texImage3D(K,dt,Q,vt,gt,y.depth,0,pt,Z,null):e.texImage2D(K,dt,Q,vt,gt,0,pt,Z,null)}e.bindFramebuffer(i.FRAMEBUFFER,R),Kt(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,H,K,Nt.__webglTexture,0,Yt(y)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,H,K,Nt.__webglTexture,dt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Xt(R,y,B){if(i.bindRenderbuffer(i.RENDERBUFFER,R),y.depthBuffer){let H=y.depthTexture,K=H&&H.isDepthTexture?H.type:null,dt=M(y.stencilBuffer,K),pt=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Kt(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Yt(y),dt,y.width,y.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,Yt(y),dt,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,dt,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,pt,i.RENDERBUFFER,R)}else{let H=y.textures;for(let K=0;K<H.length;K++){let dt=H[K],pt=r.convert(dt.format,dt.colorSpace),Z=r.convert(dt.type),Q=v(dt.internalFormat,pt,Z,dt.normalized,dt.colorSpace);Kt(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Yt(y),Q,y.width,y.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,Yt(y),Q,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,Q,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function pe(R,y,B){let H=y.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,R),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let K=n.get(y.depthTexture);if(K.__renderTarget=y,(!K.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),H){if(K.__webglInit===void 0&&(K.__webglInit=!0,y.depthTexture.addEventListener("dispose",A)),K.__webglTexture===void 0){K.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),ee(i.TEXTURE_CUBE_MAP,y.depthTexture);let mt=r.convert(y.depthTexture.format),Nt=r.convert(y.depthTexture.type),vt;y.depthTexture.format===ei?vt=i.DEPTH_COMPONENT24:y.depthTexture.format===Yi&&(vt=i.DEPTH24_STENCIL8);for(let gt=0;gt<6;gt++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,vt,y.width,y.height,0,mt,Nt,null)}}else st(y.depthTexture,0);let dt=K.__webglTexture,pt=Yt(y),Z=H?i.TEXTURE_CUBE_MAP_POSITIVE_X+B:i.TEXTURE_2D,Q=y.depthTexture.format===Yi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(y.depthTexture.format===ei)Kt(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,Z,dt,0,pt):i.framebufferTexture2D(i.FRAMEBUFFER,Q,Z,dt,0);else if(y.depthTexture.format===Yi)Kt(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,Z,dt,0,pt):i.framebufferTexture2D(i.FRAMEBUFFER,Q,Z,dt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function nt(R){let y=n.get(R),B=R.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==R.depthTexture){let H=R.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),H){let K=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,H.removeEventListener("dispose",K)};H.addEventListener("dispose",K),y.__depthDisposeCallback=K}y.__boundDepthTexture=H}if(R.depthTexture&&!y.__autoAllocateDepthBuffer)if(B)for(let H=0;H<6;H++)pe(y.__webglFramebuffer[H],R,H);else{let H=R.texture.mipmaps;H&&H.length>0?pe(y.__webglFramebuffer[0],R,0):pe(y.__webglFramebuffer,R,0)}else if(B){y.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[H]),y.__webglDepthbuffer[H]===void 0)y.__webglDepthbuffer[H]=i.createRenderbuffer(),Xt(y.__webglDepthbuffer[H],R,!1);else{let K=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,dt=y.__webglDepthbuffer[H];i.bindRenderbuffer(i.RENDERBUFFER,dt),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,dt)}}else{let H=R.texture.mipmaps;if(H&&H.length>0?e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),Xt(y.__webglDepthbuffer,R,!1);else{let K=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,dt=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,dt),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,dt)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function lt(R,y,B){let H=n.get(R);y!==void 0&&Tt(H.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&nt(R)}function ht(R){let y=R.texture,B=n.get(R),H=n.get(y);R.addEventListener("dispose",x);let K=R.textures,dt=R.isWebGLCubeRenderTarget===!0,pt=K.length>1;if(pt||(H.__webglTexture===void 0&&(H.__webglTexture=i.createTexture()),H.__version=y.version,o.memory.textures++),dt){B.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(y.mipmaps&&y.mipmaps.length>0){B.__webglFramebuffer[Z]=[];for(let Q=0;Q<y.mipmaps.length;Q++)B.__webglFramebuffer[Z][Q]=i.createFramebuffer()}else B.__webglFramebuffer[Z]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){B.__webglFramebuffer=[];for(let Z=0;Z<y.mipmaps.length;Z++)B.__webglFramebuffer[Z]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(pt)for(let Z=0,Q=K.length;Z<Q;Z++){let mt=n.get(K[Z]);mt.__webglTexture===void 0&&(mt.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&Kt(R)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let Z=0;Z<K.length;Z++){let Q=K[Z];B.__webglColorRenderbuffer[Z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[Z]);let mt=r.convert(Q.format,Q.colorSpace),Nt=r.convert(Q.type),vt=v(Q.internalFormat,mt,Nt,Q.normalized,Q.colorSpace,R.isXRRenderTarget===!0),gt=Yt(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,gt,vt,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,B.__webglColorRenderbuffer[Z])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),Xt(B.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(dt){e.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture),ee(i.TEXTURE_CUBE_MAP,y);for(let Z=0;Z<6;Z++)if(y.mipmaps&&y.mipmaps.length>0)for(let Q=0;Q<y.mipmaps.length;Q++)Tt(B.__webglFramebuffer[Z][Q],R,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Q);else Tt(B.__webglFramebuffer[Z],R,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);m(y)&&T(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(pt){for(let Z=0,Q=K.length;Z<Q;Z++){let mt=K[Z],Nt=n.get(mt),vt=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(vt=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(vt,Nt.__webglTexture),ee(vt,mt),Tt(B.__webglFramebuffer,R,mt,i.COLOR_ATTACHMENT0+Z,vt,0),m(mt)&&T(vt)}e.unbindTexture()}else{let Z=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Z=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Z,H.__webglTexture),ee(Z,y),y.mipmaps&&y.mipmaps.length>0)for(let Q=0;Q<y.mipmaps.length;Q++)Tt(B.__webglFramebuffer[Q],R,y,i.COLOR_ATTACHMENT0,Z,Q);else Tt(B.__webglFramebuffer,R,y,i.COLOR_ATTACHMENT0,Z,0);m(y)&&T(Z),e.unbindTexture()}R.depthBuffer&&nt(R)}function ut(R){let y=R.textures;for(let B=0,H=y.length;B<H;B++){let K=y[B];if(m(K)){let dt=b(R),pt=n.get(K).__webglTexture;e.bindTexture(dt,pt),T(dt),e.unbindTexture()}}}let ft=[],Bt=[];function Ot(R){if(R.samples>0){if(Kt(R)===!1){let y=R.textures,B=R.width,H=R.height,K=i.COLOR_BUFFER_BIT,dt=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pt=n.get(R),Z=y.length>1;if(Z)for(let mt=0;mt<y.length;mt++)e.bindFramebuffer(i.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,pt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,pt.__webglMultisampledFramebuffer);let Q=R.texture.mipmaps;Q&&Q.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,pt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,pt.__webglFramebuffer);for(let mt=0;mt<y.length;mt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),Z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,pt.__webglColorRenderbuffer[mt]);let Nt=n.get(y[mt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Nt,0)}i.blitFramebuffer(0,0,B,H,0,0,B,H,K,i.NEAREST),l===!0&&(ft.length=0,Bt.length=0,ft.push(i.COLOR_ATTACHMENT0+mt),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&(ft.push(dt),Bt.push(dt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Bt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ft))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Z)for(let mt=0;mt<y.length;mt++){e.bindFramebuffer(i.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.RENDERBUFFER,pt.__webglColorRenderbuffer[mt]);let Nt=n.get(y[mt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,pt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.TEXTURE_2D,Nt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,pt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&l){let y=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function Yt(R){return Math.min(s.maxSamples,R.samples)}function Kt(R){let y=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function N(R){let y=o.render.frame;u.get(R)!==y&&(u.set(R,y),R.update())}function le(R,y){let B=R.colorSpace,H=R.format,K=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||B!==mo&&B!==vi&&(se.getTransfer(B)===ue?(H!==Pn||K!==fn)&&Ht("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Gt("WebGLTextures: Unsupported texture color space:",B)),y}function ne(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(h.width=R.naturalWidth||R.width,h.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(h.width=R.displayWidth,h.height=R.displayHeight):(h.width=R.width,h.height=R.height),h}this.allocateTextureUnit=V,this.resetTextureUnits=O,this.getTextureUnits=I,this.setTextureUnits=F,this.setTexture2D=st,this.setTexture2DArray=X,this.setTexture3D=tt,this.setTextureCube=it,this.rebindTextures=lt,this.setupRenderTarget=ht,this.updateRenderTargetMipmap=ut,this.updateMultisampleRenderTarget=Ot,this.setupDepthRenderbuffer=nt,this.setupFrameBufferTexture=Tt,this.useMultisampledRTT=Kt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function Jb(i,t){function e(n,s=vi){let r,o=se.getTransfer(s);if(n===fn)return i.UNSIGNED_BYTE;if(n===$l)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Hl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Cu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ru)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Eu)return i.BYTE;if(n===Au)return i.SHORT;if(n===yr)return i.UNSIGNED_SHORT;if(n===zl)return i.INT;if(n===Hn)return i.UNSIGNED_INT;if(n===Vn)return i.FLOAT;if(n===Gn)return i.HALF_FLOAT;if(n===Pu)return i.ALPHA;if(n===Iu)return i.RGB;if(n===Pn)return i.RGBA;if(n===ei)return i.DEPTH_COMPONENT;if(n===Yi)return i.DEPTH_STENCIL;if(n===Du)return i.RED;if(n===Vl)return i.RED_INTEGER;if(n===qi)return i.RG;if(n===Gl)return i.RG_INTEGER;if(n===Wl)return i.RGBA_INTEGER;if(n===Ho||n===Vo||n===Go||n===Wo)if(o===ue)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ho)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Vo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Go)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Wo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ho)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Vo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Go)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Wo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Xl||n===Yl||n===ql||n===Kl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Xl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Yl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ql)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Kl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Zl||n===jl||n===Jl||n===Ql||n===tc||n===Xo||n===ec)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Zl||n===jl)return o===ue?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Jl)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ql)return r.COMPRESSED_R11_EAC;if(n===tc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Xo)return r.COMPRESSED_RG11_EAC;if(n===ec)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===nc||n===ic||n===sc||n===rc||n===oc||n===ac||n===lc||n===cc||n===hc||n===uc||n===dc||n===pc||n===fc||n===mc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===nc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ic)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===sc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===rc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===oc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ac)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===lc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===cc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===hc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===uc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===dc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===pc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===fc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===mc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===gc||n===_c||n===xc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===gc)return o===ue?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===_c)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===xc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===vc||n===yc||n===Yo||n===bc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===vc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===yc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Yo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===bc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===br?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var Qb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,tM=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,od=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new So(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Je({vertexShader:Qb,fragmentShader:tM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Vt(new Rn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ad=class extends zn{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,h=null,u=null,p=null,c=null,d=null,f=null,_=typeof XRWebGLBinding<"u",g=new od,m={},T=e.getContextAttributes(),b=null,v=null,M=[],S=[],A=new at,x=null,E=null,C=new He;C.viewport=new Ee;let P=new He;P.viewport=new Ee;let D=[C,P],O=new Nl,I=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let et=M[j];return et===void 0&&(et=new hr,M[j]=et),et.getTargetRaySpace()},this.getControllerGrip=function(j){let et=M[j];return et===void 0&&(et=new hr,M[j]=et),et.getGripSpace()},this.getHand=function(j){let et=M[j];return et===void 0&&(et=new hr,M[j]=et),et.getHandSpace()};function V(j){let et=S.indexOf(j.inputSource);if(et===-1)return;let bt=M[et];bt!==void 0&&(bt.update(j.inputSource,j.frame,h||o),bt.dispatchEvent({type:j.type,data:j.inputSource}))}function W(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",st);for(let j=0;j<M.length;j++){let et=S[j];et!==null&&(S[j]=null,M[j].disconnect(et))}I=null,F=null,g.reset();for(let j in m)delete m[j];if(t.setRenderTarget(b),d=null,c=null,p=null,s=null,v=null,re.stop(),n.isPresenting=!1,t.setPixelRatio(x),t.setSize(A.width,A.height,!1),E!==null){let j=E.camera;j.fov=E.fov,j.zoom=E.zoom,j.updateProjectionMatrix(),E=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&Ht("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&Ht("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||o},this.setReferenceSpace=function(j){h=j},this.getBaseLayer=function(){return c!==null?c:d},this.getBinding=function(){return p===null&&_&&(p=new XRWebGLBinding(s,e)),p},this.getFrame=function(){return f},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(b=t.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",W),s.addEventListener("inputsourceschange",st),T.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(A),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let bt=null,Wt=null,Tt=null;T.depth&&(Tt=T.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,bt=T.stencil?Yi:ei,Wt=T.stencil?br:Hn);let Xt={colorFormat:e.RGBA8,depthFormat:Tt,scaleFactor:r};p=this.getBinding(),c=p.createProjectionLayer(Xt),s.updateRenderState({layers:[c]}),t.setPixelRatio(1),t.setSize(c.textureWidth,c.textureHeight,!1),v=new un(c.textureWidth,c.textureHeight,{format:Pn,type:fn,depthTexture:new Ui(c.textureWidth,c.textureHeight,Wt,void 0,void 0,void 0,void 0,void 0,void 0,bt),stencilBuffer:T.stencil,colorSpace:t.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:c.ignoreDepthValues===!1,resolveStencilBuffer:c.ignoreDepthValues===!1,storeMultisampledDepthBuffer:c.ignoreDepthValues===!1,storeMultisampledStencilBuffer:c.ignoreDepthValues===!1})}else{let bt={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,bt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new un(d.framebufferWidth,d.framebufferHeight,{format:Pn,type:fn,colorSpace:t.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),h=null,o=await s.requestReferenceSpace(a),re.setContext(s),re.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function st(j){for(let et=0;et<j.removed.length;et++){let bt=j.removed[et],Wt=S.indexOf(bt);Wt>=0&&(S[Wt]=null,M[Wt].disconnect(bt))}for(let et=0;et<j.added.length;et++){let bt=j.added[et],Wt=S.indexOf(bt);if(Wt===-1){for(let Xt=0;Xt<M.length;Xt++)if(Xt>=S.length){S.push(bt),Wt=Xt;break}else if(S[Xt]===null){S[Xt]=bt,Wt=Xt;break}if(Wt===-1)break}let Tt=M[Wt];Tt&&Tt.connect(bt)}}let X=new L,tt=new L;function it(j,et,bt){X.setFromMatrixPosition(et.matrixWorld),tt.setFromMatrixPosition(bt.matrixWorld);let Wt=X.distanceTo(tt),Tt=et.projectionMatrix.elements,Xt=bt.projectionMatrix.elements,pe=Tt[14]/(Tt[10]-1),nt=Tt[14]/(Tt[10]+1),lt=(Tt[9]+1)/Tt[5],ht=(Tt[9]-1)/Tt[5],ut=(Tt[8]-1)/Tt[0],ft=(Xt[8]+1)/Xt[0],Bt=pe*ut,Ot=pe*ft,Yt=Wt/(-ut+ft),Kt=Yt*-ut;if(et.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Kt),j.translateZ(Yt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Tt[10]===-1)j.projectionMatrix.copy(et.projectionMatrix),j.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{let N=pe+Yt,le=nt+Yt,ne=Bt-Kt,R=Ot+(Wt-Kt),y=lt*nt/le*N,B=ht*nt/le*N;j.projectionMatrix.makePerspective(ne,R,y,B,N,le),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function Lt(j,et){et===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(et.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let et=j.near,bt=j.far;g.texture!==null&&(g.depthNear>0&&(et=g.depthNear),g.depthFar>0&&(bt=g.depthFar)),O.near=P.near=C.near=et,O.far=P.far=C.far=bt,(I!==O.near||F!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),I=O.near,F=O.far),O.layers.mask=j.layers.mask|6,C.layers.mask=O.layers.mask&-5,P.layers.mask=O.layers.mask&-3;let Wt=j.parent,Tt=O.cameras;Lt(O,Wt);for(let Xt=0;Xt<Tt.length;Xt++)Lt(Tt[Xt],Wt);Tt.length===2?it(O,C,P):O.projectionMatrix.copy(C.projectionMatrix),E===null&&j.isPerspectiveCamera&&(E={camera:j,fov:j.fov,zoom:j.zoom}),Ct(j,O,Wt)};function Ct(j,et,bt){bt===null?j.matrix.copy(et.matrixWorld):(j.matrix.copy(bt.matrixWorld),j.matrix.invert(),j.matrix.multiply(et.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(et.projectionMatrix),j.projectionMatrixInverse.copy(et.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=ar*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(c===null&&d===null))return l},this.setFoveation=function(j){l=j,c!==null&&(c.fixedFoveation=j),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=j)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(O)},this.getCameraTexture=function(j){return m[j]};let ae=null;function ee(j,et){if(u=et.getViewerPose(h||o),f=et,u!==null){let bt=u.views;d!==null&&(t.setRenderTargetFramebuffer(v,d.framebuffer),t.setRenderTarget(v));let Wt=!1;bt.length!==O.cameras.length&&(O.cameras.length=0,Wt=!0);for(let nt=0;nt<bt.length;nt++){let lt=bt[nt],ht=null;if(d!==null)ht=d.getViewport(lt);else{let ft=p.getViewSubImage(c,lt);ht=ft.viewport,nt===0&&(t.setRenderTargetTextures(v,ft.colorTexture,ft.depthStencilTexture),t.setRenderTarget(v))}let ut=D[nt];ut===void 0&&(ut=new He,ut.layers.enable(nt),ut.viewport=new Ee,D[nt]=ut),ut.matrix.fromArray(lt.transform.matrix),ut.matrix.decompose(ut.position,ut.quaternion,ut.scale),ut.projectionMatrix.fromArray(lt.projectionMatrix),ut.projectionMatrixInverse.copy(ut.projectionMatrix).invert(),ut.viewport.set(ht.x,ht.y,ht.width,ht.height),nt===0&&(O.matrix.copy(ut.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Wt===!0&&O.cameras.push(ut)}let Tt=s.enabledFeatures;if(Tt&&Tt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){p=n.getBinding();let nt=p.getDepthInformation(bt[0]);nt&&nt.isValid&&nt.texture&&g.init(nt,s.renderState)}if(Tt&&Tt.includes("camera-access")&&_){t.state.unbindTexture(),p=n.getBinding();for(let nt=0;nt<bt.length;nt++){let lt=bt[nt].camera;if(lt){let ht=m[lt];ht||(ht=new So,m[lt]=ht);let ut=p.getCameraImage(lt);ht.sourceTexture=ut}}}}for(let bt=0;bt<M.length;bt++){let Wt=S[bt],Tt=M[bt];Wt!==null&&Tt!==void 0&&Tt.update(Wt,et,h||o)}ae&&ae(j,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),f=null}let re=new mm;re.setAnimationLoop(ee),this.setAnimationLoop=function(j){ae=j},this.dispose=function(){}}},eM=new fe,bm=new qt;bm.set(-1,0,0,0,1,0,0,0,1);function nM(i,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Fu(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,T,b,v){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),p(g,m)):m.isMeshPhongMaterial?(r(g,m),u(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),c(g,m),m.isMeshPhysicalMaterial&&d(g,m,v)):m.isMeshMatcapMaterial?(r(g,m),f(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),_(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,T,b):m.isSpriteMaterial?h(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===an&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===an&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let T=t.get(m),b=T.envMap,v=T.envMapRotation;b&&(g.envMap.value=b,g.envMapRotation.value.setFromMatrix4(eM.makeRotationFromEuler(v)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(bm),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,T,b){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*T,g.scale.value=b*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function p(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function c(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function d(g,m,T){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===an&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=T.texture,g.transmissionSamplerSize.value.set(T.width,T.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function f(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){let T=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(T.matrixWorld),g.nearDistance.value=T.shadow.camera.near,g.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function iM(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,M){let S=M.program;n.uniformBlockBinding(v,S)}function h(v,M){let S=s[v.id];S===void 0&&(g(v),S=u(v),s[v.id]=S,v.addEventListener("dispose",T));let A=M.program;n.updateUBOMapping(v,A);let x=t.render.frame;r[v.id]!==x&&(c(v),r[v.id]=x)}function u(v){let M=p();v.__bindingPointIndex=M;let S=i.createBuffer(),A=v.__size,x=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,A,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,S),S}function p(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return Gt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function c(v){let M=s[v.id],S=v.uniforms,A=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let x=0,E=S.length;x<E;x++){let C=S[x];if(Array.isArray(C))for(let P=0,D=C.length;P<D;P++)d(C[P],x,P,A);else d(C,x,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(v,M,S,A){if(_(v,M,S,A)===!0){let x=v.__offset,E=v.value;if(Array.isArray(E)){let C=0;for(let P=0;P<E.length;P++){let D=E[P],O=m(D);f(D,v.__data,C),typeof D!="number"&&typeof D!="boolean"&&!D.isMatrix3&&!ArrayBuffer.isView(D)&&(C+=O.storage/Float32Array.BYTES_PER_ELEMENT)}}else f(E,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,v.__data)}}function f(v,M,S){typeof v=="number"||typeof v=="boolean"?M[0]=v:v.isMatrix3?(M[0]=v.elements[0],M[1]=v.elements[1],M[2]=v.elements[2],M[3]=0,M[4]=v.elements[3],M[5]=v.elements[4],M[6]=v.elements[5],M[7]=0,M[8]=v.elements[6],M[9]=v.elements[7],M[10]=v.elements[8],M[11]=0):ArrayBuffer.isView(v)?M.set(new v.constructor(v.buffer,v.byteOffset,M.length)):v.toArray(M,S)}function _(v,M,S,A){let x=v.value,E=M+"_"+S;if(A[E]===void 0)return typeof x=="number"||typeof x=="boolean"?A[E]=x:ArrayBuffer.isView(x)?A[E]=x.slice():A[E]=x.clone(),!0;{let C=A[E];if(typeof x=="number"||typeof x=="boolean"){if(C!==x)return A[E]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(C.equals(x)===!1)return C.copy(x),!0}}return!1}function g(v){let M=v.uniforms,S=0,A=16;for(let E=0,C=M.length;E<C;E++){let P=Array.isArray(M[E])?M[E]:[M[E]];for(let D=0,O=P.length;D<O;D++){let I=P[D],F=Array.isArray(I.value)?I.value:[I.value];for(let V=0,W=F.length;V<W;V++){let st=F[V],X=m(st),tt=S%A,it=tt%X.boundary,Lt=tt+it;S+=it,Lt!==0&&A-Lt<X.storage&&(S+=A-Lt),I.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=S,S+=X.storage}}}let x=S%A;return x>0&&(S+=A-x),v.__size=S,v.__cache={},this}function m(v){let M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?Ht("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(M.boundary=16,M.storage=v.byteLength):Ht("WebGLRenderer: Unsupported uniform value type.",v),M}function T(v){let M=v.target;M.removeEventListener("dispose",T);let S=o.indexOf(M.__bindingPointIndex);o.splice(S,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function b(){for(let v in s)i.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:l,update:h,dispose:b}}var sM=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ii=null;function rM(){return ii===null&&(ii=new hl(sM,16,16,qi,Gn),ii.name="DFG_LUT",ii.minFilter=Ye,ii.magFilter=Ye,ii.wrapS=ti,ii.wrapT=ti,ii.generateMipmaps=!1,ii.needsUpdate=!0),ii}var Tr=class{constructor(t={}){let{canvas:e=Uf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:h=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:c=!1,outputBufferType:d=fn}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let _=d,g=new Set([Wl,Gl,Vl]),m=new Set([fn,Hn,yr,br,$l,Hl]),T=new Uint32Array(4),b=new Int32Array(4),v=new L,M=null,S=null,A=[],x=[],E=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=$n,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,P=!1,D=null,O=null,I=null,F=null;this._outputColorSpace=Ae;let V=0,W=0,st=null,X=-1,tt=null,it=new Ee,Lt=new Ee,Ct=null,ae=new Zt(0),ee=0,re=e.width,j=e.height,et=1,bt=null,Wt=null,Tt=new Ee(0,0,re,j),Xt=new Ee(0,0,re,j),pe=!1,nt=new ur,lt=!1,ht=!1,ut=new fe,ft=new L,Bt=new Ee,Ot={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Yt=!1;function Kt(){return st===null?et:1}let N=n;function le(w,k){return e.getContext(w,k)}let ne,R,y,B,H,K,dt,pt,Z,Q,mt,Nt,vt,gt,kt,zt,jt,U,_t,J,xt,wt,ot;try{let w={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:h,powerPreference:u,failIfMajorPerformanceCaveat:p};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",ve,!1),e.addEventListener("webglcontextrestored",ce,!1),e.addEventListener("webglcontextcreationerror",Dn,!1),N===null){let k="webgl2";if(N=le(k,w),N===null)throw le(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ut()}catch(w){throw e.removeEventListener("webglcontextlost",ve,!1),e.removeEventListener("webglcontextrestored",ce,!1),e.removeEventListener("webglcontextcreationerror",Dn,!1),Gt("WebGLRenderer: "+w.message),w}function Ut(){ne=new dy(N),ne.init(),xt=new Jb(N,ne),R=new ny(N,ne,t,xt),y=new Zb(N,ne),R.reversedDepthBuffer&&c&&y.buffers.depth.setReversed(!0),O=N.createFramebuffer(),I=N.createFramebuffer(),F=N.createFramebuffer(),B=new my(N),H=new Ub,K=new jb(N,ne,y,H,R,xt,B),dt=new uy(C),pt=new __(N),wt=new ty(N,pt),Z=new py(N,pt,B,wt),Q=new _y(N,Z,pt,wt,B),U=new gy(N,R,K),kt=new iy(H),mt=new kb(C,dt,ne,R,wt,kt),Nt=new nM(C,H),vt=new Fb,gt=new Gb(ne),jt=new Qv(C,dt,y,Q,f,l),zt=new Kb(C,Q,R),ot=new iM(N,B,R,y),_t=new ey(N,ne,B),J=new fy(N,ne,B),B.programs=mt.programs,C.capabilities=R,C.extensions=ne,C.properties=H,C.renderLists=vt,C.shadowMap=zt,C.state=y,C.info=B}_!==fn&&(E=new vy(_,e.width,e.height,a,s,r));let It=new ad(C,N);this.xr=It,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let w=ne.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=ne.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return et},this.setPixelRatio=function(w){w!==void 0&&(et=w,this.setSize(re,j,!1))},this.getSize=function(w){return w.set(re,j)},this.setSize=function(w,k,G=!0){if(It.isPresenting){Ht("WebGLRenderer: Can't change size while VR device is presenting.");return}re=w,j=k,e.width=Math.floor(w*et),e.height=Math.floor(k*et),G===!0&&(e.style.width=w+"px",e.style.height=k+"px"),E!==null&&E.setSize(e.width,e.height),this.setViewport(0,0,w,k)},this.getDrawingBufferSize=function(w){return w.set(re*et,j*et).floor()},this.setDrawingBufferSize=function(w,k,G){re=w,j=k,et=G,e.width=Math.floor(w*G),e.height=Math.floor(k*G),this.setViewport(0,0,w,k)},this.setEffects=function(w){if(_===fn){Gt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let k=0;k<w.length;k++)if(w[k].isOutputPass===!0){Ht("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(it)},this.getViewport=function(w){return w.copy(Tt)},this.setViewport=function(w,k,G,z){w.isVector4?Tt.set(w.x,w.y,w.z,w.w):Tt.set(w,k,G,z),y.viewport(it.copy(Tt).multiplyScalar(et).round())},this.getScissor=function(w){return w.copy(Xt)},this.setScissor=function(w,k,G,z){w.isVector4?Xt.set(w.x,w.y,w.z,w.w):Xt.set(w,k,G,z),y.scissor(Lt.copy(Xt).multiplyScalar(et).round())},this.getScissorTest=function(){return pe},this.setScissorTest=function(w){y.setScissorTest(pe=w)},this.setOpaqueSort=function(w){bt=w},this.setTransparentSort=function(w){Wt=w},this.getClearColor=function(w){return w.copy(jt.getClearColor())},this.setClearColor=function(){jt.setClearColor(...arguments)},this.getClearAlpha=function(){return jt.getClearAlpha()},this.setClearAlpha=function(){jt.setClearAlpha(...arguments)},this.clear=function(w=!0,k=!0,G=!0){let z=0;if(w){let $=!1;if(st!==null){let St=st.texture.format;$=g.has(St)}if($){let St=st.texture.type,At=m.has(St),Mt=jt.getClearColor(),Rt=jt.getClearAlpha(),Dt=Mt.r,Jt=Mt.g,ie=Mt.b;At?(T[0]=Dt,T[1]=Jt,T[2]=ie,T[3]=Rt,N.clearBufferuiv(N.COLOR,0,T)):(b[0]=Dt,b[1]=Jt,b[2]=ie,b[3]=Rt,N.clearBufferiv(N.COLOR,0,b))}else z|=N.COLOR_BUFFER_BIT}k&&(z|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(z|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&N.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),D=w},this.dispose=function(){e.removeEventListener("webglcontextlost",ve,!1),e.removeEventListener("webglcontextrestored",ce,!1),e.removeEventListener("webglcontextcreationerror",Dn,!1),jt.dispose(),vt.dispose(),gt.dispose(),H.dispose(),dt.dispose(),Q.dispose(),wt.dispose(),ot.dispose(),mt.dispose(),It.dispose(),It.removeEventListener("sessionstart",Td),It.removeEventListener("sessionend",Ed),ts.stop()};function ve(w){w.preventDefault(),Nu("WebGLRenderer: Context Lost."),P=!0}function ce(){Nu("WebGLRenderer: Context Restored."),P=!1;let w=B.autoReset,k=zt.enabled,G=zt.autoUpdate,z=zt.needsUpdate,$=zt.type;Ut(),B.autoReset=w,zt.enabled=k,zt.autoUpdate=G,zt.needsUpdate=z,zt.type=$}function Dn(w){Gt("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Yn(w){let k=w.target;k.removeEventListener("dispose",Yn),dg(k)}function dg(w){pg(w),H.remove(w)}function pg(w){let k=H.get(w).programs;k!==void 0&&(k.forEach(function(G){mt.releaseProgram(G)}),w.isShaderMaterial&&mt.releaseShaderCache(w))}this.renderBufferDirect=function(w,k,G,z,$,St){k===null&&(k=Ot);let At=$.isMesh&&$.matrixWorld.determinantAffine()<0,Mt=gg(w,k,G,z,$);y.setMaterial(z,At);let Rt=G.index,Dt=1;if(z.wireframe===!0){if(Rt=Z.getWireframeAttribute(G),Rt===void 0)return;Dt=2}let Jt=G.drawRange,ie=G.attributes.position,Pt=Jt.start*Dt,he=(Jt.start+Jt.count)*Dt;St!==null&&(Pt=Math.max(Pt,St.start*Dt),he=Math.min(he,(St.start+St.count)*Dt)),Rt!==null?(Pt=Math.max(Pt,0),he=Math.min(he,Rt.count)):ie!=null&&(Pt=Math.max(Pt,0),he=Math.min(he,ie.count));let Le=he-Pt;if(Le<0||Le===1/0)return;wt.setup($,z,Mt,G,Rt);let Me,_e=_t;if(Rt!==null&&(Me=pt.get(Rt),_e=J,_e.setIndex(Me)),$.isMesh)z.wireframe===!0?(y.setLineWidth(z.wireframeLinewidth*Kt()),_e.setMode(N.LINES)):_e.setMode(N.TRIANGLES);else if($.isLine){let qe=z.linewidth;qe===void 0&&(qe=1),y.setLineWidth(qe*Kt()),$.isLineSegments?_e.setMode(N.LINES):$.isLineLoop?_e.setMode(N.LINE_LOOP):_e.setMode(N.LINE_STRIP)}else $.isPoints?_e.setMode(N.POINTS):$.isSprite&&_e.setMode(N.TRIANGLES);if($.isBatchedMesh)if(ne.get("WEBGL_multi_draw"))_e.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{let qe=$._multiDrawStarts,Et=$._multiDrawCounts,en=$._multiDrawCount,oe=Rt?pt.get(Rt).bytesPerElement:1,En=H.get(z).currentProgram.getUniforms();for(let qn=0;qn<en;qn++)En.setValue(N,"_gl_DrawID",qn),_e.render(qe[qn]/oe,Et[qn])}else if($.isInstancedMesh)_e.renderInstances(Pt,Le,$.count);else if(G.isInstancedBufferGeometry){let qe=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Et=Math.min(G.instanceCount,qe);_e.renderInstances(Pt,Le,Et)}else _e.render(Pt,Le)};function wd(w,k,G,z){D!==null&&w.isNodeMaterial&&D.setObject(z,w),lt===!0&&kt.setState(w,G,!1),w.transparent===!0&&w.side===We&&w.forceSinglePass===!1?(w.side=an,w.needsUpdate=!0,pa(w,k,z),w.side=Vi,w.needsUpdate=!0,pa(w,k,z),w.side=We):pa(w,k,z)}this.compile=function(w,k,G=null){G===null&&(G=w),D!==null&&D.renderStart(w,k,G),S=gt.get(G),S.init(k),x.push(S),G.traverseVisible(function($){$.isLight&&$.layers.test(k.layers)&&(S.pushLight($),$.castShadow&&S.pushShadow($))}),w!==G&&w.traverseVisible(function($){$.isLight&&$.layers.test(k.layers)&&(S.pushLight($),$.castShadow&&S.pushShadow($))}),S.setupLights(),D!==null&&D.updateLights(S.state.lightsArray),ht=this.localClippingEnabled,lt=kt.init(this.clippingPlanes,ht),lt===!0&&kt.setGlobalState(this.clippingPlanes,k),D!==null&&zt.render(S.state.shadowsArray,G,k);let z=new Set;return w.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;let St=$.material;if(St)if(Array.isArray(St))for(let At=0;At<St.length;At++){let Mt=St[At];wd(Mt,G,k,$),z.add(Mt)}else wd(St,G,k,$),z.add(St)}),S=x.pop(),D!==null&&D.renderEnd(),z},this.compileAsync=function(w,k,G=null){let z=this.compile(w,k,G);return new Promise($=>{function St(){if(z.forEach(function(At){let Rt=H.get(At).currentProgram;(Rt===void 0||Rt.isReady())&&z.delete(At)}),z.size===0){$(w);return}setTimeout(St,10)}ne.get("KHR_parallel_shader_compile")!==null?St():setTimeout(St,10)})};let ih=null;function fg(w){ih&&ih(w)}function Td(){ts.stop()}function Ed(){ts.start()}let ts=new mm;ts.setAnimationLoop(fg),typeof self<"u"&&ts.setContext(self),this.setAnimationLoop=function(w){ih=w,It.setAnimationLoop(w),w===null?ts.stop():ts.start()},It.addEventListener("sessionstart",Td),It.addEventListener("sessionend",Ed),this.render=function(w,k){if(k!==void 0&&k.isCamera!==!0){Gt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;D!==null&&D.renderStart(w,k);let G=It.enabled===!0&&It.isPresenting===!0,z=E!==null&&(st===null||G)&&E.begin(C,st);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),It.enabled===!0&&It.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(It.cameraAutoUpdate===!0&&It.updateCamera(k),k=It.getCamera()),w.isScene===!0&&w.onBeforeRender(C,w,k,st),S=gt.get(w,x.length),S.init(k),S.state.textureUnits=K.getTextureUnits(),x.push(S),ut.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),nt.setFromProjectionMatrix(ut,Bn,k.reversedDepth),ht=this.localClippingEnabled,lt=kt.init(this.clippingPlanes,ht),M=vt.get(w,A.length),M.init(),A.push(M),It.enabled===!0&&It.isPresenting===!0){let At=C.xr.getDepthSensingMesh();At!==null&&sh(At,k,-1/0,C.sortObjects)}sh(w,k,0,C.sortObjects),M.finish(),D!==null&&D.updateLights(S.state.lightsArray),C.sortObjects===!0&&M.sort(bt,Wt),Yt=It.enabled===!1||It.isPresenting===!1||It.hasDepthSensing()===!1,Yt&&jt.addToRenderList(M,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),lt===!0&&kt.beginShadows();let $=S.state.shadowsArray;if(zt.render($,w,k),lt===!0&&kt.endShadows(),(z&&E.hasRenderPass())===!1){let At=M.opaque,Mt=M.transmissive;if(S.setupLights(),k.isArrayCamera){let Rt=k.cameras;if(Mt.length>0)for(let Dt=0,Jt=Rt.length;Dt<Jt;Dt++){let ie=Rt[Dt];Cd(At,Mt,w,ie)}Yt&&jt.render(w);for(let Dt=0,Jt=Rt.length;Dt<Jt;Dt++){let ie=Rt[Dt];Ad(M,w,ie,ie.viewport)}}else Mt.length>0&&Cd(At,Mt,w,k),Yt&&jt.render(w),Ad(M,w,k)}st!==null&&W===0&&(K.updateMultisampleRenderTarget(st),K.updateRenderTargetMipmap(st)),z&&E.end(C),w.isScene===!0&&w.onAfterRender(C,w,k),wt.resetDefaultState(),X=-1,tt=null,x.pop(),x.length>0?(S=x[x.length-1],K.setTextureUnits(S.state.textureUnits),lt===!0&&kt.setGlobalState(C.clippingPlanes,S.state.camera)):S=null,A.pop(),A.length>0?M=A[A.length-1]:M=null,D!==null&&D.renderEnd()};function sh(w,k,G,z){if(w.visible===!1)return;if(w.layers.test(k.layers)){if(w.isGroup)G=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(k);else if(w.isLightProbeGrid)S.pushLightProbeGrid(w);else if(w.isLight)S.pushLight(w),w.castShadow&&S.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||w.intersectsFrustum(nt)){z&&Bt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(ut);let At=Q.update(w),Mt=w.material;Mt.visible&&M.push(w,At,Mt,G,Bt.z,null,k)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||w.intersectsFrustum(nt))){let At=Q.update(w),Mt=w.material;if(z&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Bt.copy(w.boundingSphere.center)):(At.boundingSphere===null&&At.computeBoundingSphere(),Bt.copy(At.boundingSphere.center)),Bt.applyMatrix4(w.matrixWorld).applyMatrix4(ut)),Array.isArray(Mt)){let Rt=At.groups;for(let Dt=0,Jt=Rt.length;Dt<Jt;Dt++){let ie=Rt[Dt],Pt=Mt[ie.materialIndex];Pt&&Pt.visible&&M.push(w,At,Pt,G,Bt.z,ie,k)}}else Mt.visible&&M.push(w,At,Mt,G,Bt.z,null,k)}}let St=w.children;for(let At=0,Mt=St.length;At<Mt;At++)sh(St[At],k,G,z)}function Ad(w,k,G,z){let{opaque:$,transmissive:St,transparent:At}=w;S.setupLightsView(G),lt===!0&&kt.setGlobalState(C.clippingPlanes,G),z&&y.viewport(it.copy(z)),$.length>0&&da($,k,G),St.length>0&&da(St,k,G),At.length>0&&da(At,k,G),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function Cd(w,k,G,z){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[z.id]===void 0){let Pt=ne.has("EXT_color_buffer_half_float")||ne.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[z.id]=new un(1,1,{generateMipmaps:!0,type:Pt?Gn:fn,minFilter:Xi,samples:Math.max(4,R.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:se.workingColorSpace})}let St=S.state.transmissionRenderTarget[z.id],At=z.viewport||it;St.setSize(At.z*C.transmissionResolutionScale,At.w*C.transmissionResolutionScale);let Mt=C.getRenderTarget(),Rt=C.getActiveCubeFace(),Dt=C.getActiveMipmapLevel();C.setRenderTarget(St),C.getClearColor(ae),ee=C.getClearAlpha(),ee<1&&C.setClearColor(16777215,.5),C.clear(),Yt&&jt.render(G);let Jt=C.toneMapping;C.toneMapping=$n;let ie=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),S.setupLightsView(z),lt===!0&&kt.setGlobalState(C.clippingPlanes,z),da(w,G,z),K.updateMultisampleRenderTarget(St),K.updateRenderTargetMipmap(St),ne.has("WEBGL_multisampled_render_to_texture")===!1){let Pt=!1;for(let he=0,Le=k.length;he<Le;he++){let Me=k[he],{object:_e,geometry:qe,material:Et,group:en}=Me;if(Et.side===We&&_e.layers.test(z.layers)){let oe=Et.side;Et.side=an,Et.needsUpdate=!0,Rd(_e,G,z,qe,Et,en),Et.side=oe,Et.needsUpdate=!0,Pt=!0}}Pt===!0&&(K.updateMultisampleRenderTarget(St),K.updateRenderTargetMipmap(St))}C.setRenderTarget(Mt,Rt,Dt),C.setClearColor(ae,ee),ie!==void 0&&(z.viewport=ie),C.toneMapping=Jt}function da(w,k,G){let z=k.isScene===!0?k.overrideMaterial:null;for(let $=0,St=w.length;$<St;$++){let At=w[$],{object:Mt,geometry:Rt,group:Dt}=At,Jt=At.material;Jt.allowOverride===!0&&z!==null&&(Jt=z),Mt.layers.test(G.layers)&&Rd(Mt,k,G,Rt,Jt,Dt)}}function Rd(w,k,G,z,$,St){D!==null&&$.isNodeMaterial&&D.setObject(w,$),w.onBeforeRender(C,k,G,z,$,St),w.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),$.onBeforeRender(C,k,G,z,w,St),$.transparent===!0&&$.side===We&&$.forceSinglePass===!1?($.side=an,$.needsUpdate=!0,C.renderBufferDirect(G,k,z,$,w,St),$.side=Vi,$.needsUpdate=!0,C.renderBufferDirect(G,k,z,$,w,St),$.side=We):C.renderBufferDirect(G,k,z,$,w,St),w.onAfterRender(C,k,G,z,$,St)}function pa(w,k,G){k.isScene!==!0&&(k=Ot);let z=H.get(w),$=S.state.lights,St=S.state.shadowsArray,At=$.state.version,Mt=mt.getParameters(w,$.state,St,k,G,S.state.lightProbeGridArray),Rt=mt.getProgramCacheKey(Mt),Dt=z.programs;z.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?k.environment:null,z.fog=k.fog;let Jt=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;z.envMap=dt.get(w.envMap||z.environment,Jt),z.envMapRotation=z.environment!==null&&w.envMap===null?k.environmentRotation:w.envMapRotation,Dt===void 0&&(w.addEventListener("dispose",Yn),Dt=new Map,z.programs=Dt);let ie=Dt.get(Rt);if(ie!==void 0){if(z.currentProgram===ie&&z.lightsStateVersion===At)return Id(w,Mt),ie}else Mt.uniforms=mt.getUniforms(w),D!==null&&w.isNodeMaterial&&D.build(w,G,Mt),w.onBeforeCompile(Mt,C),ie=mt.acquireProgram(Mt,Rt),Dt.set(Rt,ie),z.uniforms=Mt.uniforms;let Pt=z.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Pt.clippingPlanes=kt.uniform),Id(w,Mt),z.needsLights=xg(w),z.lightsStateVersion=At,z.needsLights&&(Pt.ambientLightColor.value=$.state.ambient,Pt.lightProbe.value=$.state.probe,Pt.sunLights.value=$.state.sun,Pt.sunLightShadows.value=$.state.sunShadow,Pt.directionalLights.value=$.state.directional,Pt.directionalLightShadows.value=$.state.directionalShadow,Pt.spotLights.value=$.state.spot,Pt.spotLightShadows.value=$.state.spotShadow,Pt.rectAreaLights.value=$.state.rectArea,Pt.ltc_1.value=$.state.rectAreaLTC1,Pt.ltc_2.value=$.state.rectAreaLTC2,Pt.pointLights.value=$.state.point,Pt.pointLightShadows.value=$.state.pointShadow,Pt.hemisphereLights.value=$.state.hemi,Pt.sunShadowMatrix.value=$.state.sunShadowMatrix,Pt.sunShadowCascade.value=$.state.sunShadowCascade,Pt.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Pt.spotLightMatrix.value=$.state.spotLightMatrix,Pt.spotLightMap.value=$.state.spotLightMap,Pt.pointShadowMatrix.value=$.state.pointShadowMatrix),z.lightProbeGrid=S.state.lightProbeGridArray.length>0,z.currentProgram=ie,z.uniformsList=null,ie}function Pd(w){if(w.uniformsList===null){let k=w.currentProgram.getUniforms();w.uniformsList=wr.seqWithValue(k.seq,w.uniforms)}return w.uniformsList}function Id(w,k){let G=H.get(w);G.outputColorSpace=k.outputColorSpace,G.batching=k.batching,G.batchingColor=k.batchingColor,G.instancing=k.instancing,G.instancingColor=k.instancingColor,G.instancingMorph=k.instancingMorph,G.skinning=k.skinning,G.morphTargets=k.morphTargets,G.morphNormals=k.morphNormals,G.morphColors=k.morphColors,G.morphTargetsCount=k.morphTargetsCount,G.numClippingPlanes=k.numClippingPlanes,G.numIntersection=k.numClipIntersection,G.vertexAlphas=k.vertexAlphas,G.vertexTangents=k.vertexTangents,G.toneMapping=k.toneMapping}function mg(w,k){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;v.setFromMatrixPosition(k.matrixWorld);for(let G=0,z=w.length;G<z;G++){let $=w[G];if($.texture!==null&&$.boundingBox.containsPoint(v))return $}return null}function gg(w,k,G,z,$){k.isScene!==!0&&(k=Ot),K.resetTextureUnits();let St=k.fog,At=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?k.environment:null,Mt=st===null?C.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:se.workingColorSpace,Rt=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Dt=dt.get(z.envMap||At,Rt),Jt=z.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,ie=!!G.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Pt=!!G.morphAttributes.position,he=!!G.morphAttributes.normal,Le=!!G.morphAttributes.color,Me=$n;z.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(Me=C.toneMapping);let _e=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,qe=_e!==void 0?_e.length:0,Et=H.get(z),en=S.state.lights;if(lt===!0&&(ht===!0||w!==tt)){let ye=w===tt&&z.id===X;kt.setState(z,w,ye)}let oe=!1;z.version===Et.__version?(Et.needsLights&&Et.lightsStateVersion!==en.state.version||Et.outputColorSpace!==Mt||$.isBatchedMesh&&Et.batching===!1||!$.isBatchedMesh&&Et.batching===!0||$.isBatchedMesh&&Et.batchingColor===!0&&$._colorsTexture===null||$.isBatchedMesh&&Et.batchingColor===!1&&$._colorsTexture!==null||$.isInstancedMesh&&Et.instancing===!1||!$.isInstancedMesh&&Et.instancing===!0||$.isSkinnedMesh&&Et.skinning===!1||!$.isSkinnedMesh&&Et.skinning===!0||$.isInstancedMesh&&Et.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&Et.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&Et.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&Et.instancingMorph===!1&&$.morphTexture!==null||Et.envMap!==Dt||z.fog===!0&&Et.fog!==St||Et.numClippingPlanes!==void 0&&(Et.numClippingPlanes!==kt.numPlanes||Et.numIntersection!==kt.numIntersection)||Et.vertexAlphas!==Jt||Et.vertexTangents!==ie||Et.morphTargets!==Pt||Et.morphNormals!==he||Et.morphColors!==Le||Et.toneMapping!==Me||Et.morphTargetsCount!==qe||!!Et.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(oe=!0):(oe=!0,Et.__version=z.version);let En=Et.currentProgram;oe===!0&&(En=pa(z,k,$),D&&z.isNodeMaterial&&D.onUpdateProgram(z,En,Et));let qn=!1,Mi=!1,Is=!1,ge=En.getUniforms(),Ie=Et.uniforms;if(y.useProgram(En.program)&&(qn=!0,Mi=!0,Is=!0),z.id!==X&&(X=z.id,Mi=!0),Et.needsLights){let ye=mg(S.state.lightProbeGridArray,$);Et.lightProbeGrid!==ye&&(Et.lightProbeGrid=ye,Mi=!0)}if(qn||tt!==w){y.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),ge.setValue(N,"projectionMatrix",w.projectionMatrix),ge.setValue(N,"viewMatrix",w.matrixWorldInverse);let wi=ge.map.cameraPosition;wi!==void 0&&wi.setValue(N,ft.setFromMatrixPosition(w.matrixWorld)),R.logarithmicDepthBuffer&&ge.setValue(N,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ge.setValue(N,"isOrthographic",w.isOrthographicCamera===!0),tt!==w&&(tt=w,Mi=!0,Is=!0)}if(Et.needsLights&&(en.state.sunShadowMap.length>0&&ge.setValue(N,"sunShadowMap",en.state.sunShadowMap,K),en.state.directionalShadowMap.length>0&&ge.setValue(N,"directionalShadowMap",en.state.directionalShadowMap,K),en.state.spotShadowMap.length>0&&ge.setValue(N,"spotShadowMap",en.state.spotShadowMap,K),en.state.pointShadowMap.length>0&&ge.setValue(N,"pointShadowMap",en.state.pointShadowMap,K)),$.isSkinnedMesh){ge.setOptional(N,$,"bindMatrix"),ge.setOptional(N,$,"bindMatrixInverse");let ye=$.skeleton;ye&&(ye.boneTexture===null&&ye.computeBoneTexture(),ge.setValue(N,"boneTexture",ye.boneTexture,K))}$.isBatchedMesh&&(ge.setOptional(N,$,"batchingTexture"),ge.setValue(N,"batchingTexture",$._matricesTexture,K),ge.setOptional(N,$,"batchingIdTexture"),ge.setValue(N,"batchingIdTexture",$._indirectTexture,K),ge.setOptional(N,$,"batchingColorTexture"),$._colorsTexture!==null&&ge.setValue(N,"batchingColorTexture",$._colorsTexture,K));let Si=G.morphAttributes;if((Si.position!==void 0||Si.normal!==void 0||Si.color!==void 0)&&U.update($,G,En),(Mi||Et.receiveShadow!==$.receiveShadow)&&(Et.receiveShadow=$.receiveShadow,ge.setValue(N,"receiveShadow",$.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&k.environment!==null&&(Ie.envMapIntensity.value=k.environmentIntensity),Ie.dfgLUT!==void 0&&(Ie.dfgLUT.value=rM()),Mi){if(ge.setValue(N,"toneMappingExposure",C.toneMappingExposure),Et.needsLights&&_g(Ie,Is),St&&z.fog===!0&&Nt.refreshFogUniforms(Ie,St),Nt.refreshMaterialUniforms(Ie,z,et,j,S.state.transmissionRenderTarget[w.id]),Et.needsLights&&Et.lightProbeGrid){let ye=Et.lightProbeGrid;Ie.probesSH.value=ye.texture,Ie.probesMin.value.copy(ye.boundingBox.min),Ie.probesMax.value.copy(ye.boundingBox.max),Ie.probesResolution.value.copy(ye.resolution)}wr.upload(N,Pd(Et),Ie,K)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(wr.upload(N,Pd(Et),Ie,K),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ge.setValue(N,"center",$.center),ge.setValue(N,"modelViewMatrix",$.modelViewMatrix),ge.setValue(N,"normalMatrix",$.normalMatrix),ge.setValue(N,"modelMatrix",$.matrixWorld),z.uniformsGroups!==void 0){let ye=z.uniformsGroups;for(let wi=0,Ds=ye.length;wi<Ds;wi++){let Ld=ye[wi];ot.update(Ld,En),ot.bind(Ld,En)}}return En}function _g(w,k){w.ambientLightColor.needsUpdate=k,w.lightProbe.needsUpdate=k,w.sunLights.needsUpdate=k,w.sunLightShadows.needsUpdate=k,w.directionalLights.needsUpdate=k,w.directionalLightShadows.needsUpdate=k,w.pointLights.needsUpdate=k,w.pointLightShadows.needsUpdate=k,w.spotLights.needsUpdate=k,w.spotLightShadows.needsUpdate=k,w.rectAreaLights.needsUpdate=k,w.hemisphereLights.needsUpdate=k}function xg(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return st},this.setRenderTargetTextures=function(w,k,G){let z=H.get(w);z.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),H.get(w.texture).__webglTexture=k,H.get(w.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:G,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,k){let G=H.get(w);G.__webglFramebuffer=k,G.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(w,k=0,G=0){st=w,V=k,W=G;let z=null,$=!1,St=!1;if(w){let Mt=H.get(w);if(Mt.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(N.FRAMEBUFFER,Mt.__webglFramebuffer),it.copy(w.viewport),Lt.copy(w.scissor),Ct=w.scissorTest,y.viewport(it),y.scissor(Lt),y.setScissorTest(Ct),X=-1;return}else if(Mt.__webglFramebuffer===void 0)K.setupRenderTarget(w);else if(Mt.__hasExternalTextures)K.rebindTextures(w,H.get(w.texture).__webglTexture,H.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let Jt=w.depthTexture;if(Mt.__boundDepthTexture!==Jt){if(Jt!==null&&H.has(Jt)&&(w.width!==Jt.image.width||w.height!==Jt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");K.setupDepthRenderbuffer(w)}}let Rt=w.texture;(Rt.isData3DTexture||Rt.isDataArrayTexture||Rt.isCompressedArrayTexture)&&(St=!0);let Dt=H.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Dt[k])?z=Dt[k][G]:z=Dt[k],$=!0):w.samples>0&&K.useMultisampledRTT(w)===!1?z=H.get(w).__webglMultisampledFramebuffer:Array.isArray(Dt)?z=Dt[G]:z=Dt,it.copy(w.viewport),Lt.copy(w.scissor),Ct=w.scissorTest}else it.copy(Tt).multiplyScalar(et).floor(),Lt.copy(Xt).multiplyScalar(et).floor(),Ct=pe;if(G!==0&&(z=O),y.bindFramebuffer(N.FRAMEBUFFER,z)&&y.drawBuffers(w,z),y.viewport(it),y.scissor(Lt),y.setScissorTest(Ct),$){let Mt=H.get(w.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+k,Mt.__webglTexture,G)}else if(St){let Mt=k;for(let Rt=0;Rt<w.textures.length;Rt++){let Dt=H.get(w.textures[Rt]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Rt,Dt.__webglTexture,G,Mt)}}else if(w!==null&&G!==0){let Mt=H.get(w.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Mt.__webglTexture,G)}X=-1};function Dd(w){let k=H.get(w);return(k.__readFormat!==w.format||k.__readType!==w.type)&&(k.__readFormat=w.format,k.__readType=w.type,k.__formatReadable=R.textureFormatReadable(w.format),k.__typeReadable=R.textureTypeReadable(w.type)),k}this.readRenderTargetPixels=function(w,k,G,z,$,St,At,Mt=0){if(!(w&&w.isWebGLRenderTarget)){Gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=H.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&At!==void 0&&(Rt=Rt[At]),Rt){y.bindFramebuffer(N.FRAMEBUFFER,Rt);try{let Dt=w.textures[Mt],Jt=Dt.format,ie=Dt.type;w.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Mt);let Pt=Dd(Dt);if(Pt.__formatReadable===!1){Gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Pt.__typeReadable===!1){Gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=w.width-z&&G>=0&&G<=w.height-$&&N.readPixels(k,G,z,$,xt.convert(Jt),xt.convert(ie),St)}finally{let Dt=st!==null?H.get(st).__webglFramebuffer:null;y.bindFramebuffer(N.FRAMEBUFFER,Dt)}}},this.readRenderTargetPixelsAsync=async function(w,k,G,z,$,St,At,Mt=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Rt=H.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&At!==void 0&&(Rt=Rt[At]),Rt)if(k>=0&&k<=w.width-z&&G>=0&&G<=w.height-$){y.bindFramebuffer(N.FRAMEBUFFER,Rt);let Dt=w.textures[Mt],Jt=Dt.format,ie=Dt.type;w.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Mt);let Pt=Dd(Dt);if(Pt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Pt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let he=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,he),N.bufferData(N.PIXEL_PACK_BUFFER,St.byteLength,N.STREAM_READ),N.readPixels(k,G,z,$,xt.convert(Jt),xt.convert(ie),0),N.bindBuffer(N.PIXEL_PACK_BUFFER,null);let Le=st!==null?H.get(st).__webglFramebuffer:null;y.bindFramebuffer(N.FRAMEBUFFER,Le);let Me=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Ff(N,Me,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,he),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,St),N.bindBuffer(N.PIXEL_PACK_BUFFER,null),N.deleteBuffer(he),N.deleteSync(Me),St}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,k=null,G=0){let z=Math.pow(2,-G),$=Math.floor(w.image.width*z),St=Math.floor(w.image.height*z),At=k!==null?k.x:0,Mt=k!==null?k.y:0;K.setTexture2D(w,0),N.copyTexSubImage2D(N.TEXTURE_2D,G,0,0,At,Mt,$,St),y.unbindTexture()},this.copyTextureToTexture=function(w,k,G=null,z=null,$=0,St=0){let At,Mt,Rt,Dt,Jt,ie,Pt,he,Le,Me=w.isCompressedTexture?w.mipmaps[St]:w.image;if(G!==null)At=G.max.x-G.min.x,Mt=G.max.y-G.min.y,Rt=G.isBox3?G.max.z-G.min.z:1,Dt=G.min.x,Jt=G.min.y,ie=G.isBox3?G.min.z:0;else{let Ie=Math.pow(2,-$);At=Math.floor(Me.width*Ie),Mt=Math.floor(Me.height*Ie),w.isDataArrayTexture?Rt=Me.depth:w.isData3DTexture?Rt=Math.floor(Me.depth*Ie):Rt=1,Dt=0,Jt=0,ie=0}z!==null?(Pt=z.x,he=z.y,Le=z.z):(Pt=0,he=0,Le=0);let _e=xt.convert(k.format),qe=xt.convert(k.type),Et;k.isData3DTexture?(K.setTexture3D(k,0),Et=N.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(K.setTexture2DArray(k,0),Et=N.TEXTURE_2D_ARRAY):(K.setTexture2D(k,0),Et=N.TEXTURE_2D),y.activeTexture(N.TEXTURE0),y.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,k.flipY),y.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),y.pixelStorei(N.UNPACK_ALIGNMENT,k.unpackAlignment);let en=y.getParameter(N.UNPACK_ROW_LENGTH),oe=y.getParameter(N.UNPACK_IMAGE_HEIGHT),En=y.getParameter(N.UNPACK_SKIP_PIXELS),qn=y.getParameter(N.UNPACK_SKIP_ROWS),Mi=y.getParameter(N.UNPACK_SKIP_IMAGES);y.pixelStorei(N.UNPACK_ROW_LENGTH,Me.width),y.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Me.height),y.pixelStorei(N.UNPACK_SKIP_PIXELS,Dt),y.pixelStorei(N.UNPACK_SKIP_ROWS,Jt),y.pixelStorei(N.UNPACK_SKIP_IMAGES,ie);let Is=w.isDataArrayTexture||w.isData3DTexture,ge=k.isDataArrayTexture||k.isData3DTexture;if(w.isDepthTexture){let Ie=H.get(w),Si=H.get(k),ye=H.get(Ie.__renderTarget),wi=H.get(Si.__renderTarget);y.bindFramebuffer(N.READ_FRAMEBUFFER,ye.__webglFramebuffer),y.bindFramebuffer(N.DRAW_FRAMEBUFFER,wi.__webglFramebuffer);for(let Ds=0;Ds<Rt;Ds++)Is&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,H.get(w).__webglTexture,$,ie+Ds),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,H.get(k).__webglTexture,St,Le+Ds)),N.blitFramebuffer(Dt,Jt,At,Mt,Pt,he,At,Mt,N.DEPTH_BUFFER_BIT,N.NEAREST);y.bindFramebuffer(N.READ_FRAMEBUFFER,null),y.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if($!==0||w.isRenderTargetTexture||H.has(w)){let Ie=H.get(w),Si=H.get(k);y.bindFramebuffer(N.READ_FRAMEBUFFER,I),y.bindFramebuffer(N.DRAW_FRAMEBUFFER,F);for(let ye=0;ye<Rt;ye++)Is?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ie.__webglTexture,$,ie+ye):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Ie.__webglTexture,$),ge?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Si.__webglTexture,St,Le+ye):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Si.__webglTexture,St),$!==0?N.blitFramebuffer(Dt,Jt,At,Mt,Pt,he,At,Mt,N.COLOR_BUFFER_BIT,N.NEAREST):ge?N.copyTexSubImage3D(Et,St,Pt,he,Le+ye,Dt,Jt,At,Mt):N.copyTexSubImage2D(Et,St,Pt,he,Dt,Jt,At,Mt);y.bindFramebuffer(N.READ_FRAMEBUFFER,null),y.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else ge?w.isDataTexture||w.isData3DTexture?N.texSubImage3D(Et,St,Pt,he,Le,At,Mt,Rt,_e,qe,Me.data):k.isCompressedArrayTexture?N.compressedTexSubImage3D(Et,St,Pt,he,Le,At,Mt,Rt,_e,Me.data):N.texSubImage3D(Et,St,Pt,he,Le,At,Mt,Rt,_e,qe,Me):w.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,St,Pt,he,At,Mt,_e,qe,Me.data):w.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,St,Pt,he,Me.width,Me.height,_e,Me.data):N.texSubImage2D(N.TEXTURE_2D,St,Pt,he,At,Mt,_e,qe,Me);y.pixelStorei(N.UNPACK_ROW_LENGTH,en),y.pixelStorei(N.UNPACK_IMAGE_HEIGHT,oe),y.pixelStorei(N.UNPACK_SKIP_PIXELS,En),y.pixelStorei(N.UNPACK_SKIP_ROWS,qn),y.pixelStorei(N.UNPACK_SKIP_IMAGES,Mi),St===0&&k.generateMipmaps&&N.generateMipmap(Et),y.unbindTexture()},this.initRenderTarget=function(w){H.get(w).__webglFramebuffer===void 0&&K.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?K.setTextureCube(w,0):w.isData3DTexture?K.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?K.setTexture2DArray(w,0):K.setTexture2D(w,0),y.unbindTexture()},this.resetState=function(){V=0,W=0,st=null,y.reset(),wt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=se._getDrawingBufferColorSpace(t),e.unpackColorSpace=se._getUnpackColorSpace()}};var xe=11045738,Ic=13217160,Ar=7305350,As=6647162,mn=15526630,Dc=14209736,Lc=14605527,ld=4869975,Ue=3817286,Cs=11844289,oM=10474730;function Nc(i,t,e=2.5){let n=new Re;n.position.set(i.pos[0],0,i.pos[1]),n.rotation.y=-i.rotation*Math.PI/180;let[s,r]=i.size,o=kn(i.type),a=o.height,l=new Map,h=b=>{let v=l.get(b);return v||l.set(b,v=t.add(new pn({color:b}))),v},u,p=()=>u??(u=t.add(new Ge({color:oM,transparent:!0,opacity:.25,side:We,depthWrite:!1}))),c=(b,v,M,S,A,x,E)=>{let C=new Vt(t.add(new be(Math.max(.01,S),Math.max(.005,A),Math.max(.01,x))),typeof E=="number"?h(E):E);return C.position.set(b,v+A/2,M),n.add(C),C},d=(b,v,M,S,A,x,E=20)=>{let C=new Vt(t.add(new Mn(S,S,Math.max(.005,A),E)),h(x));return C.position.set(b,v+A/2,M),n.add(C),C},f=(b,v,M=.05,S=s,A=r,x=0,E=0)=>{for(let C of[-1,1])for(let P of[-1,1])c(x+C*(S/2-M),0,E+P*(A/2-M),.05,b,.05,v)},_=(b,v,M,S,A)=>{let x=(s-.04)/S,E=v/M;for(let C=0;C<M;C++)for(let P=0;P<S;P++)c(-s/2+.02+x*(P+.5),b+C*E+.015,r/2+.005,x-.025,E-.03,.01,A)},g=(b,v,M,S)=>{c(M,0,S+.05,b,.42,v-.1,Ar),c(M,0,S-v/2+.1,b,.8,.2,Ar)},m=b=>{c(0,0,0,s,.28,r,xe),c(0,.28,.04,s-.06,.2,r-.12,mn);let v=(s-.1*(b+1))/b;for(let M=0;M<b;M++)c(-s/2+.1+v/2+M*(v+.1),.48,-r/2+.26,v,.1,.3,16184560);c(0,.48,r*.14,s-.04,.05,r*.66,9085629),c(0,0,-r/2+.03,s,.9,.06,xe)},T=o.arm??.6;switch(i.type){case"bed":case"bed_king":m(2);break;case"bed_single":m(1);break;case"bed_bunk":{for(let b of[.25,1.25])c(0,b,0,s,.06,r,xe),c(0,b+.06,0,s-.06,.15,r-.06,mn),c(0,b+.21,r*.12,s-.08,.04,r*.66,b<1?9085629:10205327);for(let b of[-1,1])for(let v of[-1,1])c(b*(s/2-.03),0,v*(r/2-.03),.06,a,.06,xe);c(s/2-.03,1.31,0,.04,.25,r-.06,xe),c(-s/2+.03,1.31,0,.04,.25,r-.06,xe);for(let b=0;b<4;b++)c(s/2+.02,.3+b*.3,r/2-.25,.03,.03,.35,Ic);break}case"crib":{c(0,.25,0,s-.04,.1,r-.04,mn);for(let b of[-1,1])for(let v of[-1,1])c(b*(s/2-.025),0,v*(r/2-.025),.05,a,.05,mn);for(let b of[-1,1])c(0,.35,b*(r/2-.02),s-.05,a-.4,.02,16052974);for(let b of[-1,1])c(b*(s/2-.02),.35,0,.02,a-.4,r-.05,16052974);break}case"sofa":case"sofa_2":case"armchair":{g(s,r,0,0),c(-s/2+.09,0,.05,.18,.6,r-.1,As),c(s/2-.09,0,.05,.18,.6,r-.1,As);break}case"sofa_corner":{c(-T/2,0,-r/2+T/2+.05,s-T,.42,T-.1,Ar),c(s/2-T/2,0,.05,T,.42,r-.1,Ar),c(0,0,-r/2+.1,s,.8,.2,Ar),c(-s/2+.09,0,-r/2+T/2+.05,.18,.6,T-.1,As),c(s/2-.09,0,.05,.18,.6,r-.1,As);break}case"pouf":d(0,0,0,Math.min(s,r)/2,a,Ar,24).scale.set(s/Math.min(s,r),1,r/Math.min(s,r));break;case"lounger":{c(0,0,0,s,.12,r,Ic),c(0,.12,.25,s-.06,.08,r-.6,15327695);let b=c(0,.12,-r/2+.35,s-.06,.08,.7,15327695);b.rotation.x=.7,b.position.y+=.25;break}case"table":case"table_large":case"coffee_table":case"desk":case"console":{let b=i.type==="desk"?14276304:xe;c(0,a-.04,0,s,.04,r,b),f(a-.04,Ue,i.type==="console"?.04:.05);break}case"desk_corner":{c(-T/2,a-.04,-r/2+T/2,s-T,.04,T,14276304),c(s/2-T/2,a-.04,0,T,.04,r,14276304);for(let[b,v]of[[-s/2+.05,-r/2+.05],[-s/2+.05,-r/2+T-.05],[s/2-.05,-r/2+.05],[s/2-.05,r/2-.05],[s/2-T+.05,r/2-.05]])c(b,0,v,.05,a-.04,.05,Ue);break}case"vanity":{c(0,a-.04,0,s,.04,r,mn),f(a-.04,mn,.04),c(0,a,-r/2+.02,s*.7,.6,.02,13624298),c(0,a-.18,.02,s-.1,.12,r-.08,Dc);break}case"table_round":case"side_table":{d(0,a-.03,0,.5,.03,xe,32).scale.set(s,1,r),d(0,.02,0,.03,a-.05,Ue,10),d(0,0,0,Math.min(s,r)*.28,.02,Ue);break}case"bar_stool":{d(0,a-.05,0,Math.min(s,r)/2,.05,As),d(0,.02,0,.025,a-.07,Cs,10),d(0,0,0,Math.min(s,r)*.4,.02,Cs),d(0,.28,0,Math.min(s,r)*.36,.015,Cs,16);break}case"chair":{c(0,.42,.03,s,.05,r-.06,xe),c(0,.42,-r/2+.03,s,.48,.04,xe),f(.42,Ue);break}case"office_chair":{let b=Math.min(s,r)/2;for(let v=0;v<5;v++){let M=c(0,.03,0,.04,.03,b*.95,Ue);M.rotation.y=v*2*Math.PI/5,M.position.set(Math.sin(M.rotation.y)*b*.45,.045,Math.cos(M.rotation.y)*b*.45)}d(0,.06,0,.03,.36,Cs,10),c(0,.42,.02,s*.85,.08,r*.8,As),c(0,.5,-r/2+.08,s*.8,.55,.06,As);break}case"bench":{c(0,.4,0,s,.05,r,xe);for(let b of[-1,1])c(b*(s/2-.06),0,0,.05,.4,r-.04,Ue);break}case"nightstand":case"dresser":{c(0,.06,0,s,a-.06,r,i.type==="dresser"?Dc:xe),f(.06,Ue),_(.08,a-.1,i.type==="dresser"?3:2,1,15723492);break}case"filing_cabinet":c(0,0,0,s,a,r,10133672),_(.02,a-.04,3,1,11646653);break;case"shoe_cabinet":c(0,0,0,s,a,r,Dc),_(.02,a-.04,2,2,15723492);break;case"toy_box":c(0,0,0,s,a-.04,r,14257247),c(0,a-.04,0,s+.02,.04,r+.02,15249487);break;case"wardrobe":case"wardrobe_small":c(0,0,0,s,a,r,Dc),_(.03,a-.06,1,Math.max(1,Math.round(s/.5)),14867924);break;case"tall_cabinet":c(0,0,0,s,a,r,Lc),_(.1,a-.12,2,1,15329250);break;case"bookcase":case"shelf":{c(0,0,-r/2+.01,s,a,.02,xe);for(let S of[-1,1])c(S*(s/2-.025/2),0,0,.025,a,r,xe);let v=Math.max(2,Math.round(a/.38)),M=[9329231,5205902,12952410,6261346,8022670];for(let S=0;S<=v;S++){let A=S*(a-.025)/v;if(c(0,A,0,s-2*.025,.025,r,xe),S<v&&i.type==="bookcase"){let x=-s/2+.025+.03;for(let E=0;x<s/2-.025-.1;E++){let C=.03+E*7%4*.008,P=Math.min((a-.025)/v-.06,.22+E*5%3*.03);c(x+C/2,A+.025,.02,C,P,r*.7,M[(S+E)%M.length]),x+=C+.006+(E%5===4?.08:0)}}}break}case"vitrine":{c(0,0,0,s,.5,r,xe),c(0,.5,-r/2+.01,s,a-.55,.02,xe);for(let b of[-1,1])c(b*(s/2-.015),.5,0,.03,a-.55,r,xe);c(0,a-.05,0,s,.05,r,xe),c(0,.5,r/2-.01,s-.06,a-.55,.01,p());for(let b of[.9,1.3])c(0,b,0,s-.06,.015,r-.04,13624298);break}case"sideboard":case"tv_board":c(0,.08,0,s,a-.08,r,i.type==="tv_board"?Ue:xe),f(.08,Ue),_(.1,a-.12,1,Math.max(2,Math.round(s/.6)),i.type==="tv_board"?4870232:12558975);break;case"fireplace":{c(0,0,0,s,a,r,13617600),c(0,.12,r/2-.08,s*.55,a*.5,.17,2500651),c(0,a,0,s+.08,.06,r+.06,xe);break}case"piano":{c(0,0,-r/2+r*.3,s,a,r*.6,1908514),c(0,.7,r*.25,s,.06,r*.5,1908514),c(0,.76,r*.28,s-.12,.015,r*.3,15921906);for(let b of[-1,1])c(b*(s/2-.04),0,r/2-.06,.06,.7,.06,1908514);break}case"kitchen":case"kitchen_island":{c(0,0,0,s,a-.04,r,Lc),c(0,a-.04,0,s+(i.type==="kitchen_island"?.06:0),.04,r+(i.type==="kitchen_island"?.1:0),ld),i.type==="kitchen"&&c(-s/2+.4,a,0,.5,.005,.4,10134445),_(.1,a-.16,1,Math.max(2,Math.round(s/.6)),15329250);break}case"kitchen_corner":{c(-T/2,0,-r/2+T/2,s-T,a-.04,T,Lc),c(s/2-T/2,0,0,T,a-.04,r,Lc),c(-T/2,a-.04,-r/2+T/2,s-T,.04,T,ld),c(s/2-T/2,a-.04,0,T,.04,r,ld),c(-s/2+.45,a,-r/2+T/2,.5,.005,.4,10134445);for(let[b,v]of[[-.12,-.12],[.12,-.12],[-.12,.12],[.12,.12]])d(s/2-T/2+b,a,r/2-.45+v,.08,.008,1842721);break}case"stove":{c(0,0,0,s,a-.03,r,mn),c(0,a-.03,0,s,.03,r,1842721);for(let b of[-1,1])for(let v of[-1,1])d(b*s*.22,a,v*r*.22,Math.min(s,r)*.12,.006,5264732);c(0,.12,r/2+.005,s-.08,a*.5,.01,2764081);break}case"dishwasher":c(0,0,0,s,a,r,14277856),c(0,a-.12,r/2+.01,s*.6,.03,.02,Cs);break;case"fridge":c(0,0,0,s,a,r,15001321),c(s/2-.06,a*.45,r/2+.015,.03,.4,.03,Cs);break;case"washer":case"dryer":{c(0,0,0,s,a,r,mn);let b=d(0,0,0,Math.min(s,r)*.3,.03,i.type==="dryer"?10134445:8358550,24);b.rotation.x=Math.PI/2,b.position.set(0,a*.45,r/2+.01);break}case"bathtub":{c(0,0,0,s,a,r,mn),c(0,a,0,s-.16,.005,r-.16,12178403);break}case"shower":{c(0,0,0,s,.05,r,mn);for(let[b,v,M,S]of[[0,r/2,s,.01],[s/2,0,.01,r]])c(b,.05,v,M,1.95,S,p());break}case"toilet":case"bidet":{c(0,0,.06,s*.9,.4,r-.18,mn),i.type==="toilet"?c(0,0,-r/2+.09,s,.8,.18,mn):c(0,0,-r/2+.05,s*.8,.42,.1,mn);break}case"sink":case"sink_double":{c(0,0,0,s,a-.12,r,xe),c(0,a-.12,0,s,.12,r,mn);let b=i.type==="sink_double"?2:1;for(let v=0;v<b;v++)c(-s/2+s/b*(v+.5),a,.03,Math.min(.42,s/b-.12),.005,r-.16,13228515);break}case"coat_rack":{d(0,0,0,Math.min(s,r)*.4,.03,Ue),d(0,.03,0,.02,a-.03,xe,10);for(let b=0;b<4;b++){let v=c(0,a-.18,0,.02,.02,Math.min(s,r)*.5,xe);v.rotation.y=b*Math.PI/2,v.rotation.x=.5}break}case"aquarium":{c(0,0,0,s,.7,r,xe),c(0,.7,0,s-.02,a-.75,r-.02,p()),c(0,.7,0,s-.06,(a-.75)*.75,r-.06,t.add(new Ge({color:4165557,transparent:!0,opacity:.35,depthWrite:!1}))),c(0,a-.05,0,s,.05,r,Ue);break}case"stairs":{let b=Math.max(3,Math.round(e/.18)),v=e/b,M=r/b;for(let E=0;E<b;E++)c(0,v*(E+1)-.04,r/2-M*(E+.5),s-.08,.04,M+.03,Ic);let S=Math.hypot(r,e),A=Math.atan2(e,r),x=(E,C,P,D,O)=>{let I=c(E,0,0,P,D,S,O);return I.rotation.x=A,I.position.y=C,I};for(let E of[-1,1])x(E*(s/2-.025),e/2-.05,.05,.24,xe);x(s/2-.02,e/2+.9,.04,.04,Ue),c(s/2-.02,0,r/2-.05,.04,.95,.04,Ue),c(s/2-.02,e,-r/2+.05,.04,.9,.04,Ue);break}case"stairs_down":{let b=Math.max(3,Math.round(e/.18)),v=r/b;c(0,.001,0,s,.004,r,1777186);for(let M=0;M<b;M++){let S=1-M/b,A=Math.round(34+96*S);c(0,.005,r/2-v*(M+.5),s-.1,.003,v*.62,A<<16|A<<8|A+8)}for(let M of[-1,1]){c(M*(s/2-.02),.9,0,.04,.04,r,Ue);for(let S of[-r/2+.04,0,r/2-.04])c(M*(s/2-.02),0,S,.03,.9,.03,Ue)}c(0,.9,-r/2+.02,s,.04,.04,Ue);break}case"stairs_spiral":{let b=Math.min(s,r)/2,v=Math.max(6,Math.round(e/.2)),M=e/v;d(0,0,0,.05,e+.9,Cs,12);let S=A=>{let x=A*.42+.1;return[Math.cos(x)*(b-.04),M*(A+1)+.9,Math.sin(x)*(b-.04)]};for(let A=0;A<v;A++){let x=A*.42,E=c(0,M*(A+1)-.04,0,b-.05,.04,b*.5,Ic);E.rotation.y=-x,E.position.x=Math.cos(x)*(b/2),E.position.z=Math.sin(x)*(b/2);let[C,P,D]=S(A);if(c(C,P-.9,D,.02,.9,.02,Ue),A<v-1){let[O,I,F]=S(A+1),[V,W,st]=[O-C,I-P,F-D],X=new Vt(t.add(new be(.035,.035,Math.hypot(V,W,st))),h(Ue));X.position.set((C+O)/2,(P+I)/2,(D+F)/2),X.rotation.order="YXZ",X.rotation.y=Math.atan2(V,st),X.rotation.x=-Math.atan2(W,Math.hypot(V,st)),n.add(X)}}break}case"rug":c(0,0,0,s,.012,r,8226714);break;case"rug_round":{d(0,0,0,.5,.012,9076122,32).scale.set(s,1,r);break}case"plant":{d(0,0,0,s*.3,.35,10185546,16);let b=new Vt(t.add(new Oi(Math.min(s,r)*.5,14,10)),h(6265442));b.position.y=.35+Math.min(s,r)*.45,b.scale.y=(a-.35)/Math.min(s,r),n.add(b);break}default:c(0,0,0,s,a,r,xe)}return n}var ln;function Mm(i,t,e){if(ln===null)return!1;if(!ln)try{ln=new Tr({antialias:!0,alpha:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"}),ln.outputColorSpace=Ae,ln.setClearColor(0,0)}catch{return ln=null,!1}let n=i.width,s=i.height;ln.setPixelRatio(1),ln.setSize(n,s,!1);let r=[],o={add(m){return r.push(m),m}},a=new gs;a.add(new ys(15922687,3159615,2.2));let l=new bs(16777215,1.6);l.position.set(-3,6,4),a.add(l);let h=Nc({id:"preview",type:t,pos:[0,0],size:e,rotation:0,label:null},o);a.add(h);let u=new dn().setFromObject(h),p=u.getCenter(new L),c=Math.max(.2,u.getSize(new L).length()/2),d=new He(30,n/s,.01,100),f=d.fov*Math.PI/180,_=c/Math.sin(f/2)*(n/s<1?1.25:1);d.position.copy(p).add(new L(.75,.7,1.25).normalize().multiplyScalar(_)),d.lookAt(p),ln.render(a,d);let g=i.getContext("2d");return g?.clearRect(0,0,n,s),g?.drawImage(ln.domElement,0,0,n,s),r.forEach(m=>m.dispose()),!0}function cd(){ln&&(ln.dispose(),ln.forceContextLoss()),ln!==null&&(ln=void 0)}var kc=8,Uc=500,aM=10,tn=(i,t=2)=>Se(i,t),lM=[{tool:"select",label:()=>ct().toolSelect,key:"V"},{tool:"room",label:()=>ct().toolRoom,key:"R"},{tool:"points",label:()=>ct().toolPoints,key:"P"},{tool:"pan",label:()=>ct().toolPan,key:"H"}],jo=class extends Pe{constructor(){super();this._fitted=!1;this._space=!1;this._pointers=new Map;this._resize=new ResizeObserver(([e])=>{let{width:n,height:s}=e.contentRect;this._size={w:n,h:s}});this._onPlaceMove=e=>{let n=this._placeDrag;n&&(!n.moved&&Math.hypot(e.clientX-n.sx,e.clientY-n.sy)>6&&(n.moved=!0,window.matchMedia("(max-width: 760px)").matches&&(this._library=!1)),n.moved&&(this._ghost=this._stageWorld(e.clientX,e.clientY)))};this._onPlaceUp=e=>{window.removeEventListener("pointermove",this._onPlaceMove);let n=this._placeDrag;this._placeDrag=void 0;let s=this._placing;if(!n||!s)return;if(!n.moved){this._libSelected===s?this._armPlacing(s):(this._placing=void 0,this._libSelected=s);return}let r=this._stageWorld(e.clientX,e.clientY);this._placing=void 0,this._ghost=void 0,r&&this._place(s,r)};this._onKeyUp=e=>{e.key===" "&&(this._space=!1)};this._onBlur=()=>{this._space=!1};this._closeLibrary=()=>{this._library=!1,this._libSelected=void 0,cd()};this.selected=null,this.tool="select",this._view={x:-1,y:-1,scale:60},this._size={w:0,h:0},this._guides={},this._snap=!0,this._library=!1,this._libQuery="",this._libCategory="living"}connectedCallback(){super.connectedCallback(),window.addEventListener("keyup",this._onKeyUp),window.addEventListener("blur",this._onBlur)}disconnectedCallback(){window.removeEventListener("keyup",this._onKeyUp),window.removeEventListener("blur",this._onBlur),this._resize.disconnect(),cd(),super.disconnectedCallback()}firstUpdated(){this._resize.observe(this.renderRoot.querySelector(".stage"))}updated(e){let n=this._libSelected;if((e.has("_libSelected")||e.has("_library"))&&n?.group==="furniture"&&this._preview3d!==!1){let s=this.renderRoot.querySelector("canvas.preview3d");s&&!Mm(s,n.type,n.size)&&(this._preview3d=!1),this._preview3d===!1&&this.requestUpdate()}}willUpdate(e){!this._fitted&&this._size.w>0&&this.plan&&(this._fitted=!0,this.fit()),(e.has("selected")||e.has("tool"))&&(this._vertex=void 0)}fit(){let{w:e,h:n}=this._size;if(!e||!n)return;if(!this.plan?.rooms.length&&this.plan?.settings.background)return this.fitBackground();let s=ci(this.plan?.rooms??[])??{minX:0,minY:0,maxX:10,maxY:8},r=72,o=Math.max(s.maxX-s.minX,1),a=Math.max(s.maxY-s.minY,1),l=Ki(Math.min((e-2*r)/o,(n-2*r)/a),kc,Uc);this._view={scale:l,x:(s.minX+s.maxX)/2-e/2/l,y:(s.minY+s.maxY)/2-n/2/l}}calibrate(){this.plan?.settings.background&&(this._calib=[],this._placing=void 0,this._library=!1,this._select(null),this.renderRoot.querySelector(".stage")?.focus({preventScroll:!0}))}_applyCalib(e){let n=this.plan.settings.background,[s,r]=this._calib??[];if(this._calib=void 0,!n||!s||!r)return;let o=Nn(s,r);if(o<1e-6)return;let a=Ki(e/o,.1/Math.min(n.width,n.height),200/Math.max(n.width,n.height)),l={...n,x:Ft(s[0]+(n.x-s[0])*a),y:Ft(s[1]+(n.y-s[1])*a),width:Ft(n.width*a),height:Ft(n.height*a)};this._commitPlan({...this.plan,settings:{...this.plan.settings,background:l}}),this._say(ct().calibDone),this.updateComplete.then(()=>this.fitBackground())}fitBackground(){let e=this.plan?.settings.background,{w:n,h:s}=this._size;if(!e||!n||!s)return;let r=ci(this.plan.rooms),o={minX:Math.min(e.x,r?.minX??1/0),minY:Math.min(e.y,r?.minY??1/0),maxX:Math.max(e.x+e.width,r?.maxX??-1/0),maxY:Math.max(e.y+e.height,r?.maxY??-1/0)},a=48,l=Ki(Math.min((n-2*a)/(o.maxX-o.minX),(s-2*a)/(o.maxY-o.minY)),kc,Uc);this._view={scale:l,x:(o.minX+o.maxX)/2-n/2/l,y:(o.minY+o.maxY)/2-s/2/l}}get _rooms(){return this._draft??this.plan?.rooms??[]}_toScreen([e,n]){let s=this._view;return[(e-s.x)*s.scale,(n-s.y)*s.scale]}_toWorld(e,n){let s=this._view;return[e/s.scale+s.x,n/s.scale+s.y]}_local(e){let n=this.renderRoot.querySelector(".stage").getBoundingClientRect();return[e.clientX-n.left,e.clientY-n.top]}_ctx(e,n=[],s=!1){let r=sp(this.plan.rooms,e,this.plan.settings.grid,aM/this._view.scale,this._snap&&!s);for(let[o,a]of n)r.xs.push(o),r.ys.push(a);return r}_zoomAt(e,n,s){let r=this._view,o=Ki(r.scale*s,kc,Uc),[a,l]=this._toWorld(e,n);this._view={scale:o,x:a-e/o,y:l-n/o}}_emit(e,n){this.dispatchEvent(new CustomEvent(e,{detail:n,bubbles:!0,composed:!0}))}_commit(e){this._emit("plan-change",{plan:{...this.plan,rooms:e}})}_commitPlan(e){this._emit("plan-change",{plan:e})}get _shown(){return this._draftPlan?this._draftPlan:this._draft?{...this.plan,rooms:this._draft}:this.plan}_say(e){this._notice=e,window.clearTimeout(this._noticeTimer),this._noticeTimer=window.setTimeout(()=>this._notice=void 0,3500)}_roomAt(e){return this.plan.rooms.find(n=>Ke(e,n.points))}_wallAt(e,n){let s;for(let r of this.plan.rooms){let o=r.points;for(let a=0;a<o.length;a++){let l=o[a],h=o[(a+1)%o.length],u=Ln(e,l,h);u.dist<=n&&(!s||u.dist<s.dist)&&(s={a:l,b:h,t:u.t,point:u.point,dist:u.dist})}}return s}_openingOnWall(e,n,s){let r=Nn(e.a,e.b),o=Math.min(n,Math.max(.3,r-.1)),a=(e.b[0]-e.a[0])/r,l=(e.b[1]-e.a[1])/r,h=(s[0]-e.a[0])*a+(s[1]-e.a[1])*l;this._snap&&(h=Math.round(h/this.plan.settings.grid)*this.plan.settings.grid),h=Ki(h,o/2+.05,r-o/2-.05);let u=[Ft(e.a[0]+a*(h-o/2)),Ft(e.a[1]+l*(h-o/2))],p=[Ft(e.a[0]+a*(h+o/2)),Ft(e.a[1]+l*(h+o/2))];return{a:u,b:p}}_openingRooms(e,n,s){let r=[(e[0]+n[0])/2,(e[1]+n[1])/2],o=this.plan.rooms.filter(l=>l.points.some((h,u)=>Ln(r,h,l.points[(u+1)%l.points.length]).dist<.03)).map(l=>l.id),a=this._roomAt(s)?.id;return a&&o.includes(a)&&o.sort(l=>l===a?-1:1),o.slice(0,2)}_place(e,n){let s=this.plan.settings.grid,r=this._snap?[Math.round(n[0]/s)*s,Math.round(n[1]/s)*s].map(Ft):[Ft(n[0]),Ft(n[1])];if(e.group==="device"){let o=this._roomAt(n),a=yp(this.hass,this.plan,e.kind,o?.area_id??null);if(!a){this._say(ct().noEntity(cs(e)));return}let l={id:_n("i"),entity_id:a,kind:e.kind,pos:r,rotation:0,height:e.height,room_id:o?.id??null,label:null};this._commitPlan({...this.plan,items:[...this.plan.items,l]}),this._select(l.id)}else if(e.group==="opening"){let o=this._wallAt(n,.8);if(!o){this._say(ct().dropOnWall);return}let{a,b:l}=this._openingOnWall(o,e.width,o.point),h=this._openingRooms(a,l,n),u={id:_n("o"),type:e.type,room_ids:h,wall:{a,b:l},entity_id:null,exterior:h.length<2,hinge:"left"};this._commitPlan({...this.plan,openings:[...this.plan.openings,u]}),this._select(u.id)}else{let o={id:_n("f"),type:e.type,pos:r,size:[...e.size],rotation:0,label:null};this._commitPlan({...this.plan,furniture:[...this.plan.furniture,o]}),this._select(o.id)}this._setTool("select")}_startPlacing(e,n){n.preventDefault(),this._placing=e,this._placeDrag={sx:n.clientX,sy:n.clientY,moved:!1},window.addEventListener("pointermove",this._onPlaceMove),window.addEventListener("pointerup",this._onPlaceUp,{once:!0}),window.addEventListener("pointercancel",this._onPlaceUp,{once:!0})}_stageWorld(e,n){let s=this.renderRoot.querySelector(".stage").getBoundingClientRect(),r=e-s.left,o=n-s.top;if(!(r<0||o<0||r>s.width||o>s.height))return this._toWorld(r,o)}_select(e){e!==this.selected&&this._emit("select-room",{id:e})}_setTool(e){this._emit("tool-change",{tool:e})}_replaceRoom(e,n){return this.plan.rooms.map(s=>s.id===e?{...s,points:n}:s)}_onPointerDown(e){this.renderRoot.querySelector(".stage").focus({preventScroll:!0});let n=this._local(e);if(this._pointers.set(e.pointerId,n),e.currentTarget.setPointerCapture(e.pointerId),this._pointers.size===2){this._drag=void 0,this._draft=void 0,this._guides={};let[d,f]=[...this._pointers.values()];this._pinch={dist:Math.hypot(d[0]-f[0],d[1]-f[1]),mid:[(d[0]+f[0])/2,(d[1]+f[1])/2],view:this._view};return}if(this._pointers.size>2)return;let[s,r]=n,o=this._toWorld(s,r);if(e.button===1||this.tool==="pan"||this._space){this._drag={kind:"pan",sx:s,sy:r,view:this._view};return}if(e.button!==0)return;if(this._calib){this._calib.length<2&&(this._calib=[...this._calib,o]),this._calib.length===2&&window.setTimeout(()=>this.renderRoot.querySelector(".calib input")?.focus(),0);return}let l=e.target.closest("[data-hit]"),h=l?.dataset.hit,u=l?.dataset.room,p=Number(l?.dataset.index??-1),c=u?this.plan.rooms.find(d=>d.id===u):void 0;if(this._placing&&!this._placeDrag){let d=this._placing;this._placing=void 0,this._ghost=void 0,this._notice=void 0,this._place(d,o);return}if(this.tool!=="room"){let d=l?.dataset.id;if(h==="item"&&d){let f=this.plan.items.find(_=>_.id===d);this._select(d),this._drag={kind:"move-item",id:d,start:o,orig:f.pos,moved:!1};return}if(h==="furniture"&&d){let f=this.plan.furniture.find(_=>_.id===d);this._select(d),this._drag={kind:"move-furniture",id:d,start:o,orig:f.pos,moved:!1};return}if(h==="furniture-rotate"&&d){let f=this.plan.furniture.find(_=>_.id===d);this._drag={kind:"rotate-furniture",id:d,center:f.pos};return}if((h==="opening"||h==="opening-end")&&d){let f=this.plan.openings.find(T=>T.id===d),_=[(f.wall.a[0]+f.wall.b[0])/2,(f.wall.a[1]+f.wall.b[1])/2],g=this._wallAt(_,.05),m=g?[g.a,g.b]:[f.wall.a,f.wall.b];this._select(d),this._drag=h==="opening"?{kind:"move-opening",id:d,start:o,orig:f.wall,seg:m,moved:!1}:{kind:"opening-end",id:d,end:l.dataset.end==="b"?"b":"a",orig:f.wall,seg:m};return}}if(this.tool==="room"){let d=Fs(o,this._ctx(void 0,[],e.altKey));this._drag={kind:"draw",start:d.point,current:d.point},this._guides={x:d.guideX,y:d.guideY};return}if(c&&h==="vertex"){this._vertex=p;let d=this.tool==="select"&&Zr(c.points);this._drag=d?{kind:"corner",roomId:c.id,index:p,orig:c.points}:{kind:"vertex",roomId:c.id,index:p,orig:c.points,changed:!1};return}if(c&&h==="edge"){this._drag={kind:"edge",roomId:c.id,index:p,start:o,orig:c.points};return}if(c&&h==="edge-insert"){let d=c.points[p],f=c.points[(p+1)%c.points.length],_=Fs(o,this._ctx(c.id,c.points,e.altKey)).point,g=Ln(_,d,f).point,m=[...c.points];m.splice(p+1,0,[Ft(g[0]),Ft(g[1])]),this._draft=this._replaceRoom(c.id,m),this._vertex=p+1,this._drag={kind:"vertex",roomId:c.id,index:p+1,orig:m,changed:!0};return}if(c&&h==="room"){this._select(c.id),this.tool==="select"&&(this._drag={kind:"move",roomId:c.id,start:o,orig:c.points,moved:!1});return}this._select(null),this._drag={kind:"pan",sx:s,sy:r,view:this._view}}_onPointerMove(e){let n=this._local(e);this._pointers.has(e.pointerId)&&this._pointers.set(e.pointerId,n);let[s,r]=n,o=this._toWorld(s,r);if(this._cursor=o,this._pinch&&this._pointers.size===2){let[p,c]=[...this._pointers.values()],d=Math.hypot(p[0]-c[0],p[1]-c[1]),f=[(p[0]+c[0])/2,(p[1]+c[1])/2],_=this._pinch,g=Ki(_.view.scale*d/(_.dist||1),kc,Uc),m=_.mid[0]/_.view.scale+_.view.x,T=_.mid[1]/_.view.scale+_.view.y;this._view={scale:g,x:m-f[0]/g,y:T-f[1]/g};return}this._placing&&!this._placeDrag&&(this._ghost=o);let a=this._drag;if(!a)return;let l=e.altKey,h=this.plan.settings.grid,u=p=>this._snap&&!l?Ft(Math.round(p/h)*h):Ft(p);switch(a.kind){case"move-item":case"move-furniture":{let p=o[0]-a.start[0],c=o[1]-a.start[1];if(!a.moved&&Math.hypot(p,c)*this._view.scale<4)return;let d=[u(a.orig[0]+p),u(a.orig[1]+c)];if(this._drag={...a,moved:!0},a.kind==="move-item"&&this._snap&&!l){let f=this.plan.items.find(g=>g.id===a.id),_=this._isRadiator(f)&&!f.rotation?ls(this.plan.rooms,d):void 0;if(_&&_.dist<=as){let g=this.plan.settings.wall_thickness/2+jr/2+.01;d=[Ft(_.foot[0]+_.nx*g),Ft(_.foot[1]+_.ny*g)]}}if(a.kind==="move-furniture"){let f=this.plan.furniture.find(_=>_.id===a.id);if(this._snap&&!l&&!kn(f.type).free){let _=Math.max(.12,14/this._view.scale);d=cp(d,f.size,f.rotation,this.plan.rooms,this.plan.settings.wall_thickness,_)}}this._draftPlan=a.kind==="move-item"?{...this.plan,items:this.plan.items.map(f=>f.id===a.id?{...f,pos:d}:f)}:{...this.plan,furniture:this.plan.furniture.map(f=>f.id===a.id?{...f,pos:d}:f)};return}case"rotate-furniture":{let p=Math.atan2(o[1]-a.center[1],o[0]-a.center[0])*180/Math.PI+90;l||(p=Math.round(p/15)*15),p=(p%360+360)%360,p>180&&(p-=360),this._draftPlan={...this.plan,furniture:this.plan.furniture.map(c=>c.id===a.id?{...c,rotation:p}:c)};return}case"move-opening":case"opening-end":{let[p,c]=a.seg,d=Nn(p,c)||1,f=(c[0]-p[0])/d,_=(c[1]-p[1])/d,g=M=>(M[0]-p[0])*f+(M[1]-p[1])*_,m=M=>[Ft(p[0]+f*M),Ft(p[1]+_*M)],T=g(a.orig.a),b=g(a.orig.b);if(a.kind==="move-opening"){let M=g(o)-g(a.start);if(!a.moved&&Math.abs(M)*this._view.scale<4)return;this._drag={...a,moved:!0};let S=b-T,A=Math.min(T,b),x=u(A+M);x=Ki(x,.05,d-Math.abs(S)-.05),[T,b]=S>=0?[x,x+S]:[x-S,x]}else{let M=Ki(u(g(o)),.05,d-.05);a.end==="a"?T=Math.abs(b-M)<.3?b+Math.sign(M-b||-1)*.3:M:b=Math.abs(M-T)<.3?T+Math.sign(M-T||1)*.3:M}let v={a:m(T),b:m(b)};this._draftPlan={...this.plan,openings:this.plan.openings.map(M=>M.id===a.id?{...M,wall:v}:M)};return}case"pan":{let p=a.view;this._view={...p,x:p.x-(s-a.sx)/p.scale,y:p.y-(r-a.sy)/p.scale};break}case"draw":{let p=Fs(o,this._ctx(void 0,[],l));this._drag={...a,current:p.point},this._guides={x:p.guideX,y:p.guideY};break}case"move":{let p=o[0]-a.start[0],c=o[1]-a.start[1];if(!a.moved&&Math.hypot(p,c)*this._view.scale<4)return;let d=op(a.orig,p,c,this._ctx(a.roomId,[],l));this._drag={...a,moved:!0},this._draft=this._replaceRoom(a.roomId,Bs(a.orig,d.dx,d.dy)),this._guides={x:d.guideX,y:d.guideY};break}case"corner":{let p=a.orig[(a.index+2)%4],c=Fs(o,this._ctx(a.roomId,[],l)),d=this.plan.settings.grid,f=[Math.abs(c.point[0]-p[0])<d?p[0]+Math.sign(c.point[0]-p[0]||1)*d:c.point[0],Math.abs(c.point[1]-p[1])<d?p[1]+Math.sign(c.point[1]-p[1]||1)*d:c.point[1]];this._draft=this._replaceRoom(a.roomId,Os(p,[Ft(f[0]),Ft(f[1])])),this._guides={x:c.guideX,y:c.guideY};break}case"vertex":{let p=a.orig.filter((f,_)=>_!==a.index),c=Fs(o,this._ctx(a.roomId,p,l)),d=a.orig.map((f,_)=>_===a.index?c.point:f);this._drag={...a,changed:!0},this._draft=this._replaceRoom(a.roomId,d),this._guides={x:c.guideX,y:c.guideY};break}case"edge":{let p=(a.index+1)%a.orig.length,c=a.orig.filter((f,_)=>_!==a.index&&_!==p),d=ap(a.orig,a.index,o,a.start,this._ctx(a.roomId,c,l));this._draft=this._replaceRoom(a.roomId,d.points),this._guides={x:d.guideX,y:d.guideY};break}}}_onPointerUp(e){if(this._pointers.delete(e.pointerId),this._pinch){this._pointers.size<2&&(this._pinch=void 0);return}let n=this._drag;if(this._drag=void 0,this._guides={},!n)return;if(n.kind==="draw"){let o=Os(n.start,n.current),a=li(o);if(a.maxX-a.minX>=.3&&a.maxY-a.minY>=.3){let l=va(ct().roomN(this.plan.rooms.length+1),o);this._commit([...this.plan.rooms,l]),this._select(l.id),this._setTool("select")}return}if(n.kind==="move-item"||n.kind==="move-furniture"||n.kind==="rotate-furniture"||n.kind==="move-opening"||n.kind==="opening-end"){let o=this._draftPlan;if(this._draftPlan=void 0,!o)return;n.kind==="move-item"&&(o={...o,items:o.items.map(a=>a.id===n.id?{...a,room_id:this._roomAt(a.pos)?.id??null}:a)}),this._commitPlan(o);return}let s=this._draft;if(this._draft=void 0,!s||n.kind==="pan"||n.kind==="move"&&!n.moved)return;let r=s.map(o=>{if(o.id!==n.roomId)return o;let a=lp(o.points);return a.length>=3?{...o,points:a}:this.plan.rooms.find(l=>l.id===o.id)});JSON.stringify(r)!==JSON.stringify(this.plan.rooms)&&this._commit(r)}_onWheel(e){e.preventDefault();let[n,s]=this._local(e),r=e.deltaMode===1?e.deltaY*16:e.deltaY;this._zoomAt(n,s,Math.exp(-r*.0018))}_onKeyDown(e){if(e.ctrlKey||e.metaKey)return;let n=e.key.toLowerCase(),s={v:"select",r:"room",p:"points",h:"pan"},r=!0;if(s[n]&&!e.altKey)this._setTool(s[n]);else if(n===" ")this._space=!0;else if(n==="escape"&&this._calib)this._calib=void 0;else if(n==="escape"&&this._placing)this._placing=void 0,this._ghost=void 0,this._notice=void 0;else if(n==="b")this._library?this._closeLibrary():this._library=!0;else if(n==="escape")this._drag?(this._drag=void 0,this._draft=void 0,this._guides={}):this._select(null);else if(n==="delete"||n==="backspace")this._deleteSelection();else if(n.startsWith("arrow")&&this.selected){let o=this.plan.settings.grid*(e.shiftKey?10:1),a={arrowleft:[-o,0],arrowright:[o,0],arrowup:[0,-o],arrowdown:[0,o]},l=this.plan.rooms.find(p=>p.id===this.selected),h=a[n];l&&h&&this._commit(this._replaceRoom(l.id,Bs(l.points,h[0],h[1])));let u=p=>[Ft(p[0]+h[0]),Ft(p[1]+h[1])];h&&this.plan.items.some(p=>p.id===this.selected)&&this._commitPlan({...this.plan,items:this.plan.items.map(p=>p.id===this.selected?{...p,pos:u(p.pos)}:p)}),h&&this.plan.furniture.some(p=>p.id===this.selected)&&this._commitPlan({...this.plan,furniture:this.plan.furniture.map(p=>p.id===this.selected?{...p,pos:u(p.pos)}:p)})}else r=!1;r&&(e.preventDefault(),e.stopPropagation())}_deleteSelection(){let e=this.selected;if(e&&this.plan.items.some(s=>s.id===e)){this._commitPlan({...this.plan,items:this.plan.items.filter(s=>s.id!==e)}),this._select(null);return}if(e&&this.plan.openings.some(s=>s.id===e)){this._commitPlan({...this.plan,openings:this.plan.openings.filter(s=>s.id!==e)}),this._select(null);return}if(e&&this.plan.furniture.some(s=>s.id===e)){this._commitPlan({...this.plan,furniture:this.plan.furniture.filter(s=>s.id!==e)}),this._select(null);return}let n=this.plan.rooms.find(s=>s.id===this.selected);if(n){if(this.tool==="points"&&this._vertex!==void 0){if(n.points.length<=3)return;let s=n.points.filter((r,o)=>o!==this._vertex);this._vertex=void 0,this._commit(this._replaceRoom(n.id,s));return}this._commit(this.plan.rooms.filter(s=>s.id!==n.id)),this._select(null)}}render(){let{w:e,h:n}=this._size,s=this._view,r=this._shown,o=r?.rooms??[],a=o.find(c=>c.id===this.selected),l=this.plan?.settings.wall_thickness??.12,h=this.plan?.settings.background,u=this._drag?.kind==="pan"||this.tool==="pan",p=this.tool==="room"||this._placing||this._calib?"crosshair":u?this._drag?"grabbing":"grab":"default";return q`
      <div class="stage" tabindex="0" @keydown=${this._onKeyDown}>
        <svg
          class="canvas ${h?.visible?"has-bg":""}"
          width=${e}
          height=${n}
          style="cursor:${p}"
          @pointerdown=${this._onPointerDown}
          @pointermove=${this._onPointerMove}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerUp}
          @pointerleave=${()=>this._cursor=void 0}
          @wheel=${this._onWheel}
        >
          ${this._renderGrid()}
          <g transform="matrix(${s.scale} 0 0 ${s.scale} ${-s.x*s.scale} ${-s.y*s.scale})">
            ${h?.visible?Y`<image class="backdrop" href=${h.url} x=${h.x} y=${h.y} width=${h.width} height=${h.height}
                  opacity=${h.opacity} preserveAspectRatio="none" />`:rt}
            ${o.map(c=>Y`<polygon
                class="floor ${c.id===this.selected?"sel":""} ${c.id===this._hover?"hover":""}"
                points=${c.points.map(d=>d.join(",")).join(" ")}
                data-hit="room" data-room=${c.id}
                @pointerenter=${()=>this._hover=c.id}
                @pointerleave=${()=>this._hover=void 0}
              />`)}
            ${(r?.furniture??[]).map(c=>this._renderFurniture(c))}
            ${(r?.items??[]).map(c=>this._renderRadiatorBar(c,o,l))}
            ${o.map(c=>Y`<polygon class="wall ${c.id===this.selected?"sel":""}"
                points=${c.points.map(d=>d.join(",")).join(" ")}
                stroke-width=${l} data-hit="room" data-room=${c.id} />`)}
            ${(r?.openings??[]).map(c=>this._renderOpening(c,o,l))}
          </g>
          ${o.map(c=>this._renderLabel(c))} ${(r?.items??[]).map(c=>this._renderItem(c))}
          ${a?this._renderSelection(a):rt} ${r?this._renderObjectSelection(r):rt}
          ${this._renderDrawing()} ${this._renderGhost()} ${this._renderGuides()} ${this._renderCalibMarks()}
        </svg>
        ${this._renderToolbar()} ${this._library?this._renderLibrary():rt}
        ${this.plan?.rooms.length&&!this._library?q`<button class="add" @click=${()=>this._library=!0}>
              ${$t.plus} ${ct().addButton}
            </button>`:rt}
        ${this.plan&&!this.plan.rooms.length&&!this._drag&&!this._library&&!this._calib?this._renderEmpty():rt}
        ${this._calib?this._renderCalib():this._notice?q`<div class="notice" role="status">${this._notice}</div>`:rt}
      </div>
      ${this._renderStatus()}
    `}_renderOpening(e,n,s){let[r,o]=e.wall.a,[a,l]=e.wall.b,h=Math.hypot(a-r,l-o);if(h<.05)return rt;let u=(a-r)/h,c=-((l-o)/h),d=u,f=n.find(C=>C.id===e.room_ids[0]),_=[(r+a)/2,(o+l)/2];f&&!Ke([_[0]+c*.2,_[1]+d*.2],f.points)&&(c=-c,d=-d);let g=e.id===this.selected?"sel":"",m=Y`<line class="gap" x1=${r} y1=${o} x2=${a} y2=${l} stroke-width=${s*1.15} />
      <line class="opening-hit" x1=${r} y1=${o} x2=${a} y2=${l} data-hit="opening" data-id=${e.id} />`;if(e.type==="window")return Y`<g class="opening window ${e.exterior?"ext":""} ${g}">${m}
        <line class="pane" x1=${r} y1=${o} x2=${a} y2=${l} stroke-width=${s*.5} />
      </g>`;if(e.type==="opening")return Y`<g class="opening ${g}">${m}</g>`;let[T,b]=e.hinge==="left"?[r,o]:[a,l],[v,M]=e.hinge==="left"?[a,l]:[r,o],S=Math.atan2(d,c),A=Math.atan2(M-b,v-T),x=A-S;for(;x>Math.PI;)x-=2*Math.PI;for(;x<-Math.PI;)x+=2*Math.PI;A=S+x;let E="";for(let C=0;C<=12;C++){let P=S+(A-S)*C/12;E+=`${C?"L":"M"}${T+Math.cos(P)*h} ${b+Math.sin(P)*h}`}return Y`<g class="opening door ${e.exterior?"ext":""} ${g}">${m}
      <path class="swing" d=${E} />
      <line class="leaf" x1=${T} y1=${b} x2=${T+c*h} y2=${b+d*h} />
    </g>`}_renderItem(e){let[n,s]=this._toScreen(e.pos),r=nn(e,this.hass?.states[e.entity_id]?.attributes.device_class),o=e.label||this.hass?.states[e.entity_id]?.attributes.friendly_name||e.entity_id,a=!!this.hass&&!this.hass.states[e.entity_id]&&Object.keys(this.hass.states).length>0;return Y`<g class="item ${r} ${e.id===this.selected?"sel":""} ${a?"missing":""}" transform="translate(${n} ${s})"
      data-hit="item" data-id=${e.id}>
      <title>${o}</title>
      <circle r="15" class="hitpad" />
      <circle r="9" class="disc" />${Ci[r]}
    </g>`}_isRadiator(e){return nn(e,this.hass?.states[e.entity_id]?.attributes.device_class)==="radiator"}_renderRadiatorBar(e,n,s){if(!this._isRadiator(e)||e.rotation)return rt;let r=ls(n,e.pos);if(!r||r.dist>as)return rt;let o=ks(e),a=jr,l=s/2+a/2+.01,h=r.foot[0]+r.nx*l,u=r.foot[1]+r.ny*l,p=Math.atan2(r.nx,-r.ny)*180/Math.PI;return Y`<rect class="radiator-bar ${e.id===this.selected?"sel":""}" x=${-o/2} y=${-a/2} width=${o} height=${a}
      transform="translate(${h} ${u}) rotate(${p})" data-hit="item" data-id=${e.id} />`}_renderFurniture(e){let[n,s]=e.size;return Y`<g class="furniture ${e.type} ${e.id===this.selected?"sel":""}"
      transform="translate(${e.pos[0]} ${e.pos[1]}) rotate(${e.rotation})" data-hit="furniture" data-id=${e.id}>
      ${no(e.type,n,s)}
      ${io(e.type,n,s)}
    </g>`}_renderObjectSelection(e){let n=this.selected;if(!n)return rt;let s=e.items.find(a=>a.id===n);if(s){let[a,l]=this._toScreen(s.pos);return Y`<circle class="sel-ring" cx=${a} cy=${l} r="15" />`}let r=e.furniture.find(a=>a.id===n);if(r){let[a,l]=r.size,h=r.rotation*Math.PI/180,u=[[-a/2,-l/2],[a/2,-l/2],[a/2,l/2],[-a/2,l/2]].map(([v,M])=>this._toScreen([r.pos[0]+v*Math.cos(h)-M*Math.sin(h),r.pos[1]+v*Math.sin(h)+M*Math.cos(h)])),[p,c]=this._toScreen(r.pos),d=this._toScreen([r.pos[0]+l/2*Math.sin(h),r.pos[1]-l/2*Math.cos(h)]),f=d[0]-p,_=d[1]-c,g=Math.hypot(f,_)||1,m=d[0]+f/g*26,T=d[1]+_/g*26,b=`${tn(a)} × ${tn(l)} m`;return Y`
        <polygon class="sel-outline" points=${u.map(v=>v.join(",")).join(" ")} />
        <line class="sel-stem" x1=${d[0]} y1=${d[1]} x2=${m} y2=${T} />
        <g class="rotate-handle" transform="translate(${m} ${T})" data-hit="furniture-rotate" data-id=${r.id}>
          <title>${ct().rotate}</title>
          <circle r="14" class="hitpad" /><circle r="7" />
        </g>
        <g class="draw-label" transform="translate(${p-b.length*3.5-10} ${Math.max(...u.map(v=>v[1]))+10})">
          <rect width=${b.length*7+20} height="24" rx="12" /><text x="10" y="16">${b}</text>
        </g>`}let o=e.openings.find(a=>a.id===n);if(o){let a=this._toScreen(o.wall.a),l=this._toScreen(o.wall.b),h=`${tn(Nn(o.wall.a,o.wall.b))} m`;return Y`
        <line class="sel-opening" x1=${a[0]} y1=${a[1]} x2=${l[0]} y2=${l[1]} />
        ${["a","b"].map(u=>{let[p,c]=u==="a"?a:l;return Y`<g class="vertex" transform="translate(${p} ${c})" data-hit="opening-end" data-id=${o.id} data-end=${u}>
            <circle r="14" class="hitpad" /><circle r="5.5" />
          </g>`})}
        <g class="draw-label" transform="translate(${(a[0]+l[0])/2-h.length*3.5-10} ${(a[1]+l[1])/2+14})">
          <rect width=${h.length*7+20} height="24" rx="12" /><text x="10" y="16">${h}</text>
        </g>`}return rt}_renderGhost(){let e=this._placing,n=this._ghost;if(!e||!n)return rt;if(e.group==="furniture"){let o=this._view.scale,[a,l]=this._toScreen(n),[h,u]=e.size;return Y`<rect class="ghost" x=${a-h*o/2} y=${l-u*o/2} width=${h*o} height=${u*o} rx="3" />`}if(e.group==="opening"){let o=this._wallAt(n,.8);if(!o){let[p,c]=this._toScreen(n);return Y`<circle class="ghost bad" cx=${p} cy=${c} r="8" />`}let{a,b:l}=this._openingOnWall(o,e.width,o.point),h=this._toScreen(a),u=this._toScreen(l);return Y`<line class="ghost-line" x1=${h[0]} y1=${h[1]} x2=${u[0]} y2=${u[1]} />`}let[s,r]=this._toScreen(n);return Y`<g class="item ghost-item ${e.kind}" transform="translate(${s} ${r})"><circle r="9" class="disc" />${Ci[e.kind]}</g>`}_libMatches(){let e=this._libQuery.trim().toLowerCase();if(e)return[...Th,...Eh,...hi].filter(n=>cs(n).toLowerCase().includes(e))}_libIcon(e,n=30){let s=o=>Y`<svg viewBox="-12 -12 24 24" width=${n} height=${n}>${o}</svg>`;if(e.group==="device")return q`<svg viewBox="-12 -12 24 24" width=${n} height=${n} class="lib-item ${e.kind}"><circle r="9" class="disc" />${Ci[e.kind]}</svg>`;if(e.group==="opening"){let o=e.type;return s(o==="window"?Y`<path d="M-10 0H10" class="lib-wall" /><path d="M-6 0H6" class="lib-pane" />`:o==="door"?Y`<path d="M-10 4H-6M6 4H10" class="lib-wall" /><path d="M-6 4V-8" class="lib-leaf" /><path d="M-6 -8A12 12 0 0 1 6 4" class="lib-swing" />`:Y`<path d="M-10 0H-6M6 0H10" class="lib-wall" />`)}let r=18/Math.max(e.size[0],e.size[1]);return s(Y`<g transform="scale(${r})" class="furniture lib">
      ${no(e.type,e.size[0],e.size[1])}
      ${io(e.type,e.size[0],e.size[1])}</g>`)}_renderLibrary(){let e=ct(),n=this._libSelected,s=a=>q`<button
      class="tile ${a===n?"selected":""}"
      title=${ct().libraryTile}
      aria-pressed=${a===n}
      @pointerdown=${l=>this._startPlacing(a,l)}
    >
      <span class="tile-icon">${this._libIcon(a)}</span><span>${cs(a)}</span>
    </button>`,r=this._libMatches(),o=this._libCategory;return q`<aside class="library" aria-label=${e.library}>
      <header>
        <h2>${e.library}</h2>
        <button class="close" aria-label=${e.close} @click=${this._closeLibrary}>${$t.close}</button>
      </header>
      <input
        class="lib-search"
        type="search"
        .value=${this._libQuery}
        placeholder=${e.librarySearch}
        aria-label=${e.librarySearch}
        @input=${a=>this._libQuery=a.target.value}
        @keydown=${a=>a.stopPropagation()}
      />
      <p class="lib-hint">${e.libraryHint}</p>
      ${r?r.length?q`<div class="tiles">${r.map(s)}</div>`:q`<p class="lib-hint">${e.libraryNothing}</p>`:q`
            <h3>${e.devices}</h3>
            <div class="tiles">${Th.map(s)}</div>
            <h3>${e.doorsWindows}</h3>
            <div class="tiles">${Eh.map(s)}</div>
            <h3>${e.furniture}</h3>
            <div class="cats" role="tablist" aria-label=${e.furniture}>
              ${Ta.map(a=>q`<button role="tab" aria-selected=${a===o} class=${a===o?"on":""} @click=${()=>this._libCategory=a}>
                  ${e.furnitureCategories[a]}
                </button>`)}
            </div>
            <div class="tiles">${hi.filter(a=>a.category===o).map(s)}</div>
          `}
      ${n?this._renderPreview(n):rt}
    </aside>`}_renderPreview(e){let n=ct(),s=e.group==="furniture",r=s?`${tn(e.size[0])} × ${tn(e.size[1])} × ${tn(e.height)} m`:e.group==="opening"?`${tn(e.width)} m`:"";return q`<section class="preview" aria-label=${cs(e)}>
      <div class="preview-views">
        ${s&&this._preview3d!==!1?q`<canvas class="preview3d" width="480" height="300"></canvas>`:rt}
        <span class="preview2d">${this._libIcon(e,s&&this._preview3d!==!1?56:72)}</span>
      </div>
      <div class="preview-text">
        <b>${cs(e)}</b>
        ${r?q`<span>${r}</span>`:rt}
      </div>
      <button class="primary" @click=${()=>this._armPlacing(e)}>${$t.plus} ${n.placeInPlan}</button>
    </section>`}_armPlacing(e){this._placing=e,this._closeLibrary(),this._say(ct().tapToPlace(cs(e)))}_renderGrid(){let{w:e,h:n}=this._size,s=this._view,r=this.plan?.settings.grid??.1,o=l=>{if(l*s.scale<9)return"";let h="",u=Math.ceil(s.x/l)*l;for(let c=u;(c-s.x)*s.scale<=e;c+=l){let d=Math.round((c-s.x)*s.scale)+.5;h+=`M${d} 0V${n}`}let p=Math.ceil(s.y/l)*l;for(let c=p;(c-s.y)*s.scale<=n;c+=l){let d=Math.round((c-s.y)*s.scale)+.5;h+=`M0 ${d}H${e}`}return h},a=r*s.scale>=9?r:.5;return Y`
      <rect class="bg" width=${e} height=${n} />
      <path class="grid-minor" d=${o(a)} />
      <path class="grid-major" d=${o(1)} />
    `}_renderLabel(e){let n=li(e.points),s=(n.maxX-n.minX)*this._view.scale,r=(n.maxY-n.minY)*this._view.scale;if(s<56||r<34)return rt;let[o,a]=this._toScreen(os(e.points)),l=s>120&&r>70,h=Math.max(3,Math.floor((s-14)/7)),u=e.name||ct().unnamed,p=u.length>h?`${u.slice(0,h-1)}…`:u;return Y`<g class="label ${e.id===this.selected?"sel":""}" transform="translate(${o} ${a})">
      <title>${u}</title>
      <text class="name" y=${l?-6:-2}>${p}</text>
      <text class="area ${l?"big":""}" y=${l?18:13}>${tn(Kn(e.points),1)} m²</text>
    </g>`}_renderSelection(e){let n=e.points,s=n.map(d=>this._toScreen(d)),r=Kr(n)>=0?1:-1,o=this.plan.settings.wall_thickness*this._view.scale/2,a=o+22,l=[],h=[],u=[],p=Zr(n);for(let d=0;d<n.length;d++){let f=(d+1)%n.length,[_,g]=s[d],[m,T]=s[f],b=Math.hypot(m-_,T-g);if(b<1)continue;let v=(m-_)/b,M=(T-g)/b,S=M*r,A=-v*r;if(b>=34){let x=[_+S*a,g+A*a],E=[m+S*a,T+A*a],C=5,P=(v+S)*C*Math.SQRT1_2,D=(M+A)*C*Math.SQRT1_2,O=Math.atan2(M,v)*180/Math.PI;(O>90||O<=-90)&&(O+=180);let I=(x[0]+E[0])/2,F=(x[1]+E[1])/2,V=tn(Nn(n[d],n[f]));l.push(Y`<g class="dim">
          <path d="M${_+S*(o+4)} ${g+A*(o+4)}L${x[0]+S*5} ${x[1]+A*5}
                   M${m+S*(o+4)} ${T+A*(o+4)}L${E[0]+S*5} ${E[1]+A*5}" class="ext"/>
          <path d="M${x[0]} ${x[1]}L${E[0]} ${E[1]}" />
          <path d="M${x[0]-P} ${x[1]-D}L${x[0]+P} ${x[1]+D}M${E[0]-P} ${E[1]-D}L${E[0]+P} ${E[1]+D}" class="tick"/>
          ${b>=60?Y`<g transform="translate(${I} ${F}) rotate(${O})">
                <rect x=${-V.length*3.6-6} y="-9" width=${V.length*7.2+12} height="18" rx="9" />
                <text y="4">${V}</text>
              </g>`:rt}
        </g>`)}if(this.tool==="select"&&b>=40){let x=(_+m)/2,E=(g+T)/2,C=Math.atan2(M,v)*180/Math.PI;h.push(Y`<g transform="translate(${x} ${E}) rotate(${C})" class="edge-handle" data-hit="edge" data-room=${e.id} data-index=${d}>
          <rect x="-14" y="-12" width="28" height="24" class="hitpad" />
          <rect x="-9" y="-3.5" width="18" height="7" rx="3.5" />
        </g>`)}this.tool==="points"&&u.push(Y`<line class="edge-insert" x1=${_} y1=${g} x2=${m} y2=${T}
          data-hit="edge-insert" data-room=${e.id} data-index=${d} />`)}let c=s.map(([d,f],_)=>Y`<g class="vertex ${this._vertex===_?"active":""} ${p&&this.tool==="select"?"corner":""}"
        transform="translate(${d} ${f})" data-hit="vertex" data-room=${e.id} data-index=${_}>
        <circle r="14" class="hitpad" /><circle r="5.5" />
      </g>`);return Y`${l}${u}${h}${c}`}_renderCalibMarks(){let e=this._calib;if(!e?.length)return rt;let n=e[1]??this._cursor,[s,r]=this._toScreen(e[0]),o=n?this._toScreen(n):void 0;return Y`<g class="calib-marks">
      ${o?Y`<line x1=${s} y1=${r} x2=${o[0]} y2=${o[1]} />`:rt}
      ${e.map(a=>{let[l,h]=this._toScreen(a);return Y`<circle cx=${l} cy=${h} r="6" />`})}
    </g>`}_renderCalib(){let e=this._calib??[],n=ct();return q`<form class="calib" @submit=${r=>{r.preventDefault();let o=Qr(this.renderRoot.querySelector(".calib input").value);Number.isFinite(o)&&o>0&&o<=200&&this._applyCalib(o)}}>
      <span>${e.length<2?n.calibPick(e.length+1):n.calibDistance(tn(Nn(e[0],e[1])))}</span>
      ${e.length===2?q`<label class="calib-value"><input inputmode="decimal" aria-label=${n.calibReal} required /><span>m</span></label>
            <button class="primary" type="submit">${n.apply}</button>`:rt}
      <button type="button" @click=${()=>this._calib=void 0}>${n.cancel}</button>
    </form>`}_renderDrawing(){let e=this._drag;if(e?.kind!=="draw")return rt;let n=Os(e.start,e.current),s=li(n),r=n.map(p=>this._toScreen(p)),o=s.maxX-s.minX,a=s.maxY-s.minY,[l,h]=this._toScreen([s.maxX,s.maxY]),u=`${tn(o)} × ${tn(a)} m   ${tn(o*a,1)} m²`;return Y`
      <polygon class="drawing" points=${r.map(p=>p.join(",")).join(" ")} />
      <g class="draw-label" transform="translate(${l+12} ${h+12})">
        <rect width=${u.length*7+20} height="26" rx="13" />
        <text x="10" y="17">${u}</text>
      </g>
    `}_renderGuides(){let{x:e,y:n}=this._guides,{w:s,h:r}=this._size;return Y`
      ${e!==void 0?Y`<line class="guide" x1=${this._toScreen([e,0])[0]} x2=${this._toScreen([e,0])[0]} y1="0" y2=${r} />`:rt}
      ${n!==void 0?Y`<line class="guide" y1=${this._toScreen([0,n])[1]} y2=${this._toScreen([0,n])[1]} x1="0" x2=${s} />`:rt}
    `}_renderToolbar(){return q`<nav class="tools" aria-label=${ct().tools}>
      ${lM.map(e=>q`<button
          class=${this.tool===e.tool?"active":""}
          title="${e.label()} (${e.key})"
          aria-label=${e.label()}
          aria-pressed=${this.tool===e.tool}
          @click=${()=>this._setTool(e.tool)}
        >
          ${$t[e.tool]}
        </button>`)}
      <span class="tool-sep"></span>
      <button
        class=${this._library?"active":""}
        title=${ct().libraryTitle}
        aria-label=${ct().library}
        aria-pressed=${this._library}
        @click=${()=>this._library?this._closeLibrary():this._library=!0}
      >
        ${$t.library}
      </button>
    </nav>`}_renderEmpty(){let e=ct();return q`<div class="empty ${this.plan.settings.background?.visible?"low":""}">
      <div class="empty-card">
        <h2>${e.emptyTitle}</h2>
        <p>${e.emptyText}</p>
        <div class="empty-actions">
          <button class="primary" @click=${()=>this._setTool("room")}>${$t.room} ${e.drawRoom}</button>
          <button @click=${()=>this._emit("import-areas",{})}>${$t.import} ${e.importAreas}</button>
          <button @click=${()=>this._emit("pick-background",{})}>${$t.image} ${e.traceImage}</button>
          <button @click=${()=>this._emit("load-demo",{})}>${$t.home} ${e.loadDemo}</button>
        </div>
      </div>
    </div>`}_renderStatus(){let e=this._rooms,n=this.plan?{...this.plan,rooms:e}:void 0,s=this._cursor,r=ct();return q`<footer class="status">
      <span><strong>${e.length}</strong> ${r.roomCount(e.length)}</span>
      <span><strong>${n?tn(Us(n),1):"0"}</strong> ${r.areaTotal}</span>
      <span class="coords">${s?q`x ${tn(s[0])}&ensp;y ${tn(s[1])} m`:rt}</span>
      <span class="spacer"></span>
      <button
        class="snap ${this._snap?"on":""}"
        title=${r.snapTitle}
        aria-pressed=${this._snap}
        @click=${()=>this._snap=!this._snap}
      >
        ${$t.magnet}<span>${r.snap}</span>
      </button>
      <div class="zoom">
        <button title=${r.zoomOut} aria-label=${r.zoomOut} @click=${()=>this._zoomAt(this._size.w/2,this._size.h/2,1/1.25)}>${$t.minus}</button>
        <span>${Math.round(this._view.scale)} px/m</span>
        <button title=${r.zoomIn} aria-label=${r.zoomIn} @click=${()=>this._zoomAt(this._size.w/2,this._size.h/2,1.25)}>${$t.plus}</button>
        <button title=${r.fitAll} aria-label=${r.fitAll} @click=${()=>this.fit()}>${$t.fit}</button>
      </div>
    </footer>`}};jo.properties={hass:{attribute:!1},plan:{attribute:!1},selected:{attribute:!1},tool:{attribute:!1},_library:{state:!0},_placing:{state:!0},_ghost:{state:!0},_draftPlan:{state:!0},_notice:{state:!0},_view:{state:!0},_size:{state:!0},_drag:{state:!0},_draft:{state:!0},_guides:{state:!0},_cursor:{state:!0},_snap:{state:!0},_vertex:{state:!0},_hover:{state:!0},_libQuery:{state:!0},_libCategory:{state:!0},_libSelected:{state:!0},_calib:{state:!0}},jo.styles=De`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 0;
      min-width: 0;
      position: relative;
      --canvas: var(--fp-canvas);
    }
    .stage {
      flex: 1;
      position: relative;
      min-height: 0;
      overflow: hidden;
      outline: none;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
    }
    svg.canvas {
      position: absolute;
      inset: 0;
      display: block;
      touch-action: none;
    }
    .bg {
      fill: var(--fp-canvas);
    }
    .grid-minor {
      stroke: var(--fp-grid-minor);
      stroke-width: 1;
    }
    .grid-major {
      stroke: var(--fp-grid-major);
      stroke-width: 1;
    }

    .floor {
      fill: var(--fp-floor);
      transition: fill 120ms;
    }
    .has-bg .floor {
      fill-opacity: 0.35;
    }
    .backdrop {
      pointer-events: none;
    }
    .opening {
      fill: none;
    }
    .opening .gap,
    .opening .pane,
    .opening .leaf,
    .opening .swing {
      pointer-events: none;
    }
    .opening .gap {
      stroke: var(--fp-canvas);
    }
    .window .pane {
      stroke: var(--fp-frost);
    }
    .door .leaf {
      stroke: var(--fp-fg);
      stroke-width: 2px;
      vector-effect: non-scaling-stroke;
    }
    .door .swing {
      stroke: var(--fp-dim);
      stroke-width: 1px;
      stroke-dasharray: 3 3;
      vector-effect: non-scaling-stroke;
    }
    .door.ext .leaf {
      stroke: var(--fp-accent);
    }
    .item {
      cursor: move;
    }
    .item .disc {
      fill: var(--fp-surface);
      stroke: var(--fp-dim);
      stroke-width: 1.2;
    }
    .item path,
    .item rect,
    .item circle:not(.disc):not(.hitpad) {
      fill: none;
      stroke: var(--fp-fg);
      stroke-width: 1.3;
      stroke-linecap: round;
    }
    .item .fill:not(.disc):not(.hitpad) {
      fill: currentColor;
      stroke: none;
    }
    .item.missing .disc {
      stroke: var(--fp-alert);
      stroke-dasharray: 3 2;
    }
    .item.radiator .disc {
      stroke: var(--fp-accent);
    }
    .item.light {
      color: var(--fp-lamp);
    }
    .item.light .disc {
      stroke: var(--fp-lamp);
    }
    .item.sensor .disc,
    .item.motion .disc {
      stroke: var(--fp-frost);
    }
    .item.sel .disc {
      fill: var(--fp-surface-2);
    }
    .sel-ring {
      fill: none;
      stroke: var(--fp-accent);
      stroke-width: 2;
      pointer-events: none;
    }

    .radiator-bar {
      fill: color-mix(in srgb, var(--fp-accent) 30%, transparent);
      stroke: var(--fp-accent);
      stroke-width: 1px;
      vector-effect: non-scaling-stroke;
      cursor: grab;
    }
    .radiator-bar.sel {
      fill: color-mix(in srgb, var(--fp-accent) 60%, transparent);
    }

    .furniture .body {
      fill: color-mix(in srgb, var(--fp-surface-2) 85%, var(--fp-fg));
      stroke: color-mix(in srgb, var(--fp-dim) 80%, transparent);
      stroke-width: 1px;
      vector-effect: non-scaling-stroke;
    }
    .has-bg .furniture .body {
      fill-opacity: 0.6;
    }
    .furniture .g {
      fill: none;
      stroke: color-mix(in srgb, var(--fp-dim) 85%, transparent);
      stroke-width: 1px;
      vector-effect: non-scaling-stroke;
    }
    .furniture .g.dashed {
      stroke-dasharray: 4 3;
    }
    .furniture.rug .body {
      fill: color-mix(in srgb, var(--fp-surface-2) 60%, transparent);
    }
    .furniture {
      cursor: move;
    }
    .furniture.sel .body {
      stroke: var(--fp-accent);
    }
    .sel-outline {
      fill: none;
      stroke: var(--fp-accent);
      stroke-width: 1.5;
      stroke-dasharray: 5 4;
      pointer-events: none;
    }
    .sel-stem {
      stroke: var(--fp-accent);
      stroke-width: 1.2;
      pointer-events: none;
    }
    .rotate-handle {
      cursor: grab;
    }
    .rotate-handle circle:not(.hitpad) {
      fill: var(--fp-canvas);
      stroke: var(--fp-accent);
      stroke-width: 2;
    }
    .rotate-handle:hover circle:not(.hitpad) {
      fill: var(--fp-accent);
    }
    .opening-hit {
      stroke: transparent;
      stroke-width: 16px;
      vector-effect: non-scaling-stroke;
      pointer-events: stroke;
      cursor: move;
    }
    .opening.sel .gap {
      stroke: color-mix(in srgb, var(--fp-accent) 35%, var(--fp-canvas));
    }
    .sel-opening {
      stroke: var(--fp-accent);
      stroke-width: 3;
      pointer-events: none;
    }
    .ghost {
      fill: color-mix(in srgb, var(--fp-accent) 18%, transparent);
      stroke: var(--fp-accent);
      stroke-width: 1.5;
      stroke-dasharray: 5 4;
      pointer-events: none;
    }
    .ghost.bad {
      stroke: var(--fp-alert);
      fill: color-mix(in srgb, var(--fp-alert) 20%, transparent);
    }
    .ghost-line {
      stroke: var(--fp-accent);
      stroke-width: 6;
      stroke-linecap: round;
      pointer-events: none;
    }
    .ghost-item {
      pointer-events: none;
      opacity: 0.85;
    }
    .floor.hover {
      fill: var(--fp-floor-hover);
    }
    .floor.sel {
      fill: var(--fp-floor-sel);
    }
    .wall {
      fill: none;
      stroke: var(--fp-wall);
      stroke-linejoin: miter;
    }
    .wall.sel {
      stroke: var(--fp-wall-sel);
    }

    .label {
      pointer-events: none;
      text-anchor: middle;
    }
    .label .name {
      fill: var(--fp-fg);
      font-size: 13px;
      font-weight: 500;
    }
    .label .area {
      fill: var(--fp-dim);
      font-size: 11.5px;
      font-variant-numeric: tabular-nums;
    }
    .label .area.big {
      font-size: 19px;
      font-weight: 300;
      fill: var(--fp-fg);
      opacity: 0.82;
    }
    .label.sel .name {
      fill: var(--fp-accent);
    }

    .dim {
      pointer-events: none;
      stroke: var(--fp-dim-line);
      stroke-width: 1;
      fill: none;
    }
    .dim .ext {
      stroke-dasharray: 2 3;
      opacity: 0.7;
    }
    .dim .tick {
      stroke-width: 1.6;
      stroke: var(--fp-accent);
    }
    .dim rect {
      fill: var(--fp-canvas);
      stroke: var(--fp-dim-line);
    }
    .dim text {
      fill: var(--fp-fg);
      stroke: none;
      font-size: 11.5px;
      text-anchor: middle;
      font-variant-numeric: tabular-nums;
    }

    .hitpad {
      fill: transparent;
      stroke: none;
    }
    .vertex circle:not(.hitpad) {
      fill: var(--fp-canvas);
      stroke: var(--fp-accent);
      stroke-width: 2;
    }
    .vertex {
      cursor: move;
    }
    .vertex.corner {
      cursor: nwse-resize;
    }
    .vertex.active circle:not(.hitpad),
    .vertex:hover circle:not(.hitpad) {
      fill: var(--fp-accent);
    }
    .edge-handle {
      cursor: move;
    }
    .edge-handle rect:not(.hitpad) {
      fill: var(--fp-accent);
      stroke: var(--fp-canvas);
      stroke-width: 1.5;
    }
    .edge-insert {
      stroke: transparent;
      stroke-width: 16;
      cursor: copy;
    }
    .edge-insert:hover {
      stroke: color-mix(in srgb, var(--fp-accent) 30%, transparent);
    }

    .drawing {
      fill: color-mix(in srgb, var(--fp-accent) 12%, transparent);
      stroke: var(--fp-accent);
      stroke-width: 1.5;
      stroke-dasharray: 6 4;
    }
    .draw-label rect {
      fill: var(--fp-accent);
    }
    .draw-label text {
      fill: var(--fp-on-accent);
      font-size: 12.5px;
      font-weight: 500;
      font-variant-numeric: tabular-nums;
      white-space: pre;
    }
    .guide {
      stroke: var(--fp-accent);
      stroke-width: 1;
      stroke-dasharray: 3 4;
      opacity: 0.8;
      pointer-events: none;
    }

    button {
      font: inherit;
      color: var(--fp-fg);
      background: none;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    button:focus-visible {
      outline: 2px solid var(--fp-accent);
      outline-offset: 2px;
    }

    .tools {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 5px;
      background: var(--fp-surface);
      border: 1px solid var(--fp-line);
      border-radius: 14px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
    }
    .tools button {
      width: 42px;
      height: 42px;
      border-radius: 10px;
      color: var(--fp-dim);
    }
    .tools button:hover {
      color: var(--fp-fg);
      background: var(--fp-surface-2);
    }
    .tools button.active {
      color: var(--fp-on-accent);
      background: var(--fp-accent);
    }

    .tool-sep {
      height: 1px;
      margin: 3px 6px;
      background: var(--fp-line);
    }

    .library {
      position: absolute;
      left: 72px;
      top: 14px;
      bottom: 14px;
      width: 268px;
      overflow-y: auto;
      padding: 12px 12px 16px;
      background: var(--fp-surface);
      border: 1px solid var(--fp-line);
      border-radius: 14px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
      box-sizing: border-box;
      touch-action: pan-y;
    }
    .library header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .library h2 {
      margin: 0;
      font-size: 15px;
      font-weight: 500;
    }
    .library .close {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      color: var(--fp-dim);
    }
    .lib-hint {
      margin: 4px 0 10px;
      font-size: 12px;
      color: var(--fp-dim);
      line-height: 1.4;
    }
    .library h3 {
      margin: 12px 0 6px;
      font-size: 12.5px;
      font-weight: 500;
      color: var(--fp-dim);
    }
    .tiles {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
    }
    .tile {
      flex-direction: column;
      gap: 4px;
      padding: 8px 4px 7px;
      border-radius: 10px;
      background: var(--fp-surface-2);
      border: 1px solid transparent;
      font-size: 11.5px;
      line-height: 1.2;
      text-align: center;
      overflow-wrap: anywhere;
      hyphens: auto;
      touch-action: none;
      cursor: grab;
      user-select: none;
    }
    .tile:hover {
      border-color: var(--fp-accent);
    }
    .tile.selected {
      border-color: var(--fp-accent);
      background: color-mix(in srgb, var(--fp-accent) 16%, var(--fp-surface-2));
    }
    .lib-search {
      width: 100%;
      box-sizing: border-box;
      margin: 8px 0 2px;
      padding: 8px 10px;
      font: inherit;
      font-size: 13.5px;
      color: var(--fp-fg);
      background: var(--fp-surface-2);
      border: 1px solid var(--fp-line);
      border-radius: 9px;
    }
    .lib-search:focus {
      outline: none;
      border-color: var(--fp-accent);
    }
    .cats {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin: 0 0 8px;
    }
    .cats button {
      padding: 4px 9px;
      font-size: 12px;
      color: var(--fp-dim);
      border: 1px solid var(--fp-line);
      border-radius: 999px;
    }
    .cats button.on {
      color: var(--fp-fg);
      border-color: var(--fp-accent);
      background: color-mix(in srgb, var(--fp-accent) 18%, transparent);
    }
    .preview {
      position: sticky;
      bottom: -16px;
      margin: 12px -12px -16px;
      padding: 12px;
      display: grid;
      gap: 8px;
      background: var(--fp-surface);
      border-top: 1px solid var(--fp-line);
      box-shadow: 0 -10px 24px rgb(0 0 0 / 30%);
    }
    .preview-views {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-height: 72px;
      border-radius: 10px;
      background: var(--fp-canvas, var(--fp-bg));
    }
    .preview3d {
      flex: 1;
      min-width: 0;
      width: 100%;
      aspect-ratio: 8 / 5;
    }
    .preview2d {
      flex: none;
      display: grid;
      place-items: center;
      padding: 6px;
    }
    .preview-text {
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: 13px;
    }
    .preview-text b {
      font-weight: 500;
    }
    .preview-text span {
      color: var(--fp-dim);
      font-variant-numeric: tabular-nums;
    }
    .preview .primary {
      justify-content: center;
      padding: 8px 12px;
      border-radius: 10px;
      background: var(--fp-accent);
      color: var(--fp-on-accent);
      font-weight: 500;
    }
    .tile-icon {
      display: grid;
      place-items: center;
      height: 30px;
    }
    .tile-icon svg {
      overflow: visible;
    }
    .lib-wall {
      stroke: var(--fp-wall);
      stroke-width: 3;
    }
    .lib-pane {
      stroke: var(--fp-frost);
      stroke-width: 2;
    }
    .lib-leaf {
      stroke: var(--fp-fg);
      stroke-width: 1.6;
    }
    .lib-swing {
      fill: none;
      stroke: var(--fp-dim);
      stroke-dasharray: 2 2;
    }
    .lib-item .disc {
      fill: var(--fp-surface);
      stroke: var(--fp-dim);
      stroke-width: 1.2;
    }
    .lib-item path,
    .lib-item rect,
    .lib-item circle:not(.disc) {
      fill: none;
      stroke: var(--fp-fg);
      stroke-width: 1.3;
      stroke-linecap: round;
    }
    .lib-item.light {
      color: var(--fp-lamp);
    }
    .lib-item .fill {
      fill: currentColor;
      stroke: none;
    }

    .add {
      position: absolute;
      left: 14px;
      top: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
      height: 40px;
      padding: 0 16px 0 12px;
      border-radius: 12px;
      font: inherit;
      font-size: 13.5px;
      font-weight: 500;
      color: var(--fp-on-accent);
      background: var(--fp-accent);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
      cursor: pointer;
    }
    .add svg {
      width: 18px;
      height: 18px;
    }

    .notice {
      position: absolute;
      left: 50%;
      top: 14px;
      transform: translateX(-50%);
      max-width: calc(100% - 32px);
      padding: 9px 14px;
      border-radius: 10px;
      background: var(--fp-surface);
      border: 1px solid var(--fp-accent);
      font-size: 13.5px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    }

    .empty {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      pointer-events: none;
      padding: 16px;
    }
    .empty.low {
      place-items: end center;
      padding-bottom: 56px;
    }
    .empty.low .empty-card p {
      display: none;
    }
    .empty-card {
      pointer-events: auto;
      max-width: 400px;
      padding: 22px 24px;
      background: var(--fp-surface);
      border: 1px solid var(--fp-line);
      border-radius: 16px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
    }
    .empty-card h2 {
      margin: 0 0 6px;
      font-size: 18px;
      font-weight: 500;
    }
    .empty-card p {
      margin: 0 0 18px;
      color: var(--fp-dim);
      line-height: 1.45;
    }
    .empty-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .empty-actions button {
      padding: 9px 14px;
      border-radius: 10px;
      background: var(--fp-surface-2);
      border: 1px solid var(--fp-line);
    }
    .empty-actions button.primary {
      background: var(--fp-accent);
      border-color: var(--fp-accent);
      color: var(--fp-on-accent);
      font-weight: 500;
    }

    .calib {
      position: absolute;
      left: 16px;
      right: 16px;
      top: 14px;
      width: fit-content;
      margin: 0 auto;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px 10px;
      padding: 8px 8px 8px 14px;
      border-radius: 12px;
      background: var(--fp-surface);
      border: 1px solid var(--fp-accent);
      font-size: 13.5px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    }
    .calib button {
      padding: 7px 12px;
      border-radius: 9px;
      background: var(--fp-surface-2);
      border: 1px solid var(--fp-line);
    }
    .calib button.primary {
      background: var(--fp-accent);
      border-color: var(--fp-accent);
      color: var(--fp-on-accent);
      font-weight: 500;
    }
    .calib-value {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--fp-dim);
    }
    .calib-value input {
      width: 72px;
      font: inherit;
      color: var(--fp-fg);
      background: var(--fp-surface-2);
      border: 1px solid var(--fp-line);
      border-radius: 9px;
      padding: 7px 9px;
    }
    .calib-value input:focus {
      outline: none;
      border-color: var(--fp-accent);
    }
    .calib-marks line {
      stroke: var(--fp-accent);
      stroke-width: 2;
      stroke-dasharray: 6 4;
    }
    .calib-marks circle {
      fill: var(--fp-accent);
      stroke: var(--fp-surface);
      stroke-width: 2;
    }

    .status {
      display: flex;
      align-items: center;
      gap: 18px;
      height: 40px;
      padding: 0 8px 0 16px;
      font-size: 13px;
      color: var(--fp-dim);
      background: var(--fp-surface);
      border-top: 1px solid var(--fp-line);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .status strong {
      color: var(--fp-fg);
      font-weight: 500;
    }
    .status .spacer {
      flex: 1;
    }
    .status .snap {
      color: var(--fp-dim);
      padding: 5px 10px;
      border-radius: 8px;
    }
    .status .snap.on {
      color: var(--fp-accent);
      background: color-mix(in srgb, var(--fp-accent) 12%, transparent);
    }
    .zoom {
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .zoom span {
      min-width: 64px;
      text-align: center;
    }
    .zoom button {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      color: var(--fp-dim);
    }
    .zoom button:hover {
      color: var(--fp-fg);
      background: var(--fp-surface-2);
    }

    @media (max-width: 760px) {
      .tools {
        left: 50%;
        top: auto;
        bottom: 12px;
        transform: translateX(-50%);
        flex-direction: row;
      }
      .tool-sep {
        width: 1px;
        height: auto;
        margin: 6px 3px;
      }
      .library {
        left: 8px;
        right: 8px;
        top: 8px;
        bottom: 72px;
        width: auto;
      }
      .tiles {
        grid-template-columns: repeat(4, 1fr);
      }
      .add {
        left: 8px;
        top: 8px;
      }
      .coords,
      .zoom span,
      .snap span {
        display: none;
      }
      .status {
        gap: 12px;
      }
    }
  `;function Ki(i,t,e){return Math.min(e,Math.max(t,i))}customElements.get("fp-plan-editor")||customElements.define("fp-plan-editor",jo);var Oc=De`
  :host {
      /* Colours follow the Home Assistant theme; --fp-* can be overridden by themes */
      --fp-bg: var(--primary-background-color, #0d1014);
      --fp-surface: var(--card-background-color, #151a21);
      --fp-surface-2: var(--secondary-background-color, #1c232c);
      --fp-line: var(--divider-color, #262e39);
      --fp-line-strong: color-mix(in srgb, var(--fp-line) 60%, var(--fp-dim));
      --fp-fg: var(--primary-text-color, #e8ecf1);
      --fp-dim: var(--secondary-text-color, #8b96a5);
      --fp-accent: var(--floorplan-3d-accent, #ff9a4d);
      --fp-on-accent: #1a1006;
      --fp-alert: var(--error-color, #ef6363);
      --fp-lamp: var(--warning-color, #f6cf68);
      --fp-frost: #63c6e8;
      --fp-font: var(--paper-font-body1_-_font-family, Roboto, "Segoe UI", system-ui, sans-serif);
      /* Drawing canvas */
      --fp-canvas: color-mix(in srgb, var(--fp-bg) 82%, #1d2733);
      --fp-grid-minor: color-mix(in srgb, var(--fp-canvas) 90%, var(--fp-fg));
      --fp-grid-major: color-mix(in srgb, var(--fp-canvas) 80%, var(--fp-fg));
      --fp-floor: color-mix(in srgb, var(--fp-canvas) 78%, #7f93ab);
      --fp-floor-hover: color-mix(in srgb, var(--fp-canvas) 70%, #8fa3bb);
      --fp-floor-sel: color-mix(in srgb, var(--fp-floor) 82%, var(--fp-accent));
      --fp-wall: color-mix(in srgb, var(--fp-fg) 88%, var(--fp-canvas));
      --fp-wall-sel: var(--fp-fg);
      --fp-dim-line: color-mix(in srgb, var(--fp-dim) 75%, var(--fp-canvas));
  }
`;function Sm(i,t){if(!Object.keys(i.states).length)return[];let e=[],n=(s,r,o,a)=>{o&&!i.states[o]&&e.push({id:s,kind:r,entity:o,floor:a})};for(let s of t.rooms)n(s.id,"room",s.temp_entity,jn(t,s)),n(s.id,"room",s.humidity_entity,jn(t,s));for(let s of t.openings)n(s.id,"opening",s.entity_id,jn(t,s));for(let s of t.items)n(s.id,"item",s.entity_id,jn(t,s));return e}var cM=["focus","isolate","none"],Zi=(i,t=2)=>Se(i,t),wm=[.05,.1,.25,.5],hd=6,hM=/^(\/(?!\/)|https:\/\/)[^\s"'<>]+$/,Jo=class extends Pe{constructor(){super();this._onImportFile=async e=>{let n=e.target,s=n.files?.[0];if(n.value="",!!s){if(s.size>bp){this._emit("import-plan",{text:null});return}this._emit("import-plan",{text:await s.text()})}};this._allMissing=!1}_emit(e,n){this.dispatchEvent(new CustomEvent(e,{detail:n,bubbles:!0,composed:!0}))}_commit(e){this._emit("plan-change",{plan:e})}_updateRoom(e,n){this._commit({...this.plan,rooms:this.plan.rooms.map(s=>s.id===e?{...s,...n}:s)})}_updateSettings(e){this._commit({...this.plan,settings:{...this.plan.settings,...e}})}render(){if(!this.plan)return rt;let e=this.selected,n=this.plan.rooms.find(a=>a.id===e);if(n)return this._renderRoom(n);let s=this.plan.items.find(a=>a.id===e);if(s)return this._renderItem(s);let r=this.plan.openings.find(a=>a.id===e);if(r)return this._renderOpening(r);let o=this.plan.furniture.find(a=>a.id===e);return o?this._renderFurniture(o):this._renderPlan()}_back(){return q`<button class="back" title=${ct().back} aria-label=${ct().back} @click=${()=>this._emit("select-room",{id:null})}>
      ${$t.close}
    </button>`}_actions(e,n){return q`<div class="actions">
      ${e?q`<button @click=${e}>${$t.copy} ${ct().duplicate}</button>`:rt}
      <button class="danger" @click=${n}>${$t.trash} ${ct().delete}</button>
    </div>`}_entityField(e,n,s,r,o){let a=this.hass,l=`dl-${e.replace(/\W/g,"")}`,h=n&&a?a.states[n]:void 0;return q`<label class="field">
      <span>${e}${h?q`<em>${h.state==="on"?ct().stateOn:h.state==="off"?ct().stateOff:h.state}</em>`:rt}</span>
      <input
        class="entity"
        list=${l}
        .value=${n??""}
        placeholder=${o?ct().none:ct().chooseEntity}
        spellcheck="false"
        @focus=${u=>u.target.select()}
        @keydown=${Rs}
        @change=${u=>{let p=u.target,c=p.value.trim();if(!c&&o)return r(null);if(a?.states[c])return r(c);p.value=n??""}}
      />
      <datalist id=${l}>
        ${s.slice(0,400).map(u=>q`<option value=${u}>${a?Ma(a,u):u}</option>`)}
      </datalist>
      ${n&&a&&!a.states[n]&&Object.keys(a.states).length?q`<small class="warn">${ct().entityMissing}</small>`:n&&a?q`<small>${Ma(a,n)}</small>`:rt}
    </label>`}_updateItem(e,n){this._commit({...this.plan,items:this.plan.items.map(s=>s.id===e?{...s,...n}:s)})}_renderItem(e){let n=this.hass,s=nn(e,n?.states[e.entity_id]?.attributes.device_class),r=this.plan.rooms.find(l=>l.id===e.room_id),o=["auto","radiator","light","tv","speaker","sensor","motion","vacuum","generic"],a=ct();return q`
      <div class="head">
        <input
          class="title"
          .value=${e.label??""}
          placeholder=${n?Ma(n,e.entity_id):a.kinds[s]}
          aria-label=${a.label}
          maxlength="100"
          @change=${l=>this._updateItem(e.id,{label:l.target.value.trim()||null})}
          @keydown=${Rs}
        />
        ${this._back()}
      </div>
      <p class="sub">${a.kinds[s]??a.device}${r?`, ${r.name}`:""}</p>
      <section>
        ${this._entityField(a.entity,e.entity_id,n?Ah(n,e.kind==="auto"?s:e.kind):[],l=>l&&this._updateItem(e.id,{entity_id:l}),!1)}
        <label class="field">
          <span>${a.appearance}</span>
          <select @change=${l=>this._updateItem(e.id,{kind:l.target.value})}>
            ${o.map(l=>q`<option value=${l} ?selected=${l===e.kind}>${l==="auto"?a.automatic(a.kinds[s]):a.kinds[l]}</option>`)}
          </select>
        </label>
      </section>
      <section>
        <h3>${a.placement}</h3>
        <div class="grid2">
          ${this._number(a.posX,e.pos[0],"m",-100,100,l=>this._moveItem(e,[l,e.pos[1]]))}
          ${this._number(a.posY,e.pos[1],"m",-100,100,l=>this._moveItem(e,[e.pos[0],l]))}
          ${this._number(a.height,e.height,"m",0,5,l=>this._updateItem(e.id,{height:l}))}
          ${this._number(a.rotation,e.rotation,"°",-360,360,l=>this._updateItem(e.id,{rotation:l}),0)}
          ${s==="radiator"?this._number(a.radiatorLength,ks(e),"m",.2,4,l=>this._updateItem(e.id,{width:l})):rt}
        </div>
        <p class="hint">${a.rotationHint}</p>
        <label class="check">
          <input
            type="checkbox"
            .checked=${xa(e,s)}
            @change=${l=>this._updateItem(e.id,{keep_wall:l.target.checked})}
          />
          <span>${a.keepWall}</span>
        </label>
      </section>
      ${this._actions(()=>{let l={...e,id:_n("i"),pos:[Ft(e.pos[0]+.4),Ft(e.pos[1]+.4)]};this._commit({...this.plan,items:[...this.plan.items,l]}),this._emit("select-room",{id:l.id})},()=>{this._commit({...this.plan,items:this.plan.items.filter(l=>l.id!==e.id)}),this._emit("select-room",{id:null})})}
    `}_moveItem(e,n){let s=this.plan.rooms.find(r=>Ke(n,r.points));this._updateItem(e.id,{pos:n,room_id:s?.id??null})}_updateOpening(e,n){this._commit({...this.plan,openings:this.plan.openings.map(s=>s.id===e?{...s,...n}:s)})}_renderOpening(e){let n=this.hass,s=Nn(e.wall.a,e.wall.b),r=e.room_ids.map(h=>this.plan.rooms.find(u=>u.id===h)?.name??"?"),o=ct(),a=o.openings[e.type],l=h=>{let u=(e.wall.a[0]+e.wall.b[0])/2,p=(e.wall.a[1]+e.wall.b[1])/2,c=(e.wall.b[0]-e.wall.a[0])/(s||1),d=(e.wall.b[1]-e.wall.a[1])/(s||1);this._updateOpening(e.id,{wall:{a:[Ft(u-c*h/2),Ft(p-d*h/2)],b:[Ft(u+c*h/2),Ft(p+d*h/2)]}})};return q`
      <div class="head"><h2>${a}</h2>${this._back()}</div>
      <p class="sub">${r.length?r.join(" ↔ "):o.noRoom}</p>
      <section>
        <div class="segmented" role="radiogroup" aria-label=${o.type}>
          ${["door","window","opening"].map(h=>q`<button
              role="radio"
              aria-checked=${e.type===h}
              class=${e.type===h?"on":""}
              @click=${()=>this._updateOpening(e.id,{type:h})}
            >
              ${o.openings[h]}
            </button>`)}
        </div>
        <div class="grid2">${this._number(o.width,s,"m",.3,6,l)}</div>
        ${e.type!=="opening"?this._entityField(o.contact,e.entity_id,n?vp(n):[],h=>this._updateOpening(e.id,{entity_id:h}),!0):rt}
        <label class="check">
          <input type="checkbox" .checked=${e.exterior} @change=${h=>this._updateOpening(e.id,{exterior:h.target.checked})} />
          <span>${o.exterior}</span>
        </label>
        ${e.type==="door"?q`<div class="row-buttons">
              <button @click=${()=>this._updateOpening(e.id,{hinge:e.hinge==="left"?"right":"left"})}>
                ${$t.rotate} ${o.flipHinge}
              </button>
              ${e.room_ids.length===2?q`<button @click=${()=>this._updateOpening(e.id,{room_ids:[e.room_ids[1],e.room_ids[0]]})}>
                    ${o.opensInto(r[0])}
                  </button>`:rt}
            </div>`:rt}
        <p class="hint">${o.openingHint}</p>
      </section>
      ${this._actions(void 0,()=>{this._commit({...this.plan,openings:this.plan.openings.filter(h=>h.id!==e.id)}),this._emit("select-room",{id:null})})}
    `}_updateFurniture(e,n){this._commit({...this.plan,furniture:this.plan.furniture.map(s=>s.id===e?{...s,...n}:s)})}_renderFurniture(e){let n=ct(),s=n.furnitureTypes[kn(e.type).type];return q`
      <div class="head">
        <input
          class="title"
          .value=${e.label??""}
          placeholder=${s}
          aria-label=${n.label}
          maxlength="100"
          @change=${r=>this._updateFurniture(e.id,{label:r.target.value.trim()||null})}
          @keydown=${Rs}
        />
        ${this._back()}
      </div>
      <p class="sub">${n.furnitureOf(s)}</p>
      <section>
        <label class="field">
          <span>${n.type}</span>
          <select
            @change=${r=>{let o=r.target.value;this._updateFurniture(e.id,{type:o,size:[...kn(o).size]})}}
          >
            ${Ta.map(r=>q`<optgroup label=${n.furnitureCategories[r]}>
                ${hi.filter(o=>o.category===r).map(o=>q`<option value=${o.type} ?selected=${o.type===e.type}>${n.furnitureTypes[o.type]}</option>`)}
              </optgroup>`)}
          </select>
        </label>
        <div class="grid2">
          ${this._number(n.width,e.size[0],"m",.05,20,r=>this._updateFurniture(e.id,{size:[r,e.size[1]]}))}
          ${this._number(n.depth,e.size[1],"m",.05,20,r=>this._updateFurniture(e.id,{size:[e.size[0],r]}))}
          ${this._number(n.posX,e.pos[0],"m",-100,100,r=>this._updateFurniture(e.id,{pos:[r,e.pos[1]]}))}
          ${this._number(n.posY,e.pos[1],"m",-100,100,r=>this._updateFurniture(e.id,{pos:[e.pos[0],r]}))}
          ${this._number(n.rotation,e.rotation,"°",-360,360,r=>this._updateFurniture(e.id,{rotation:r}),0)}
        </div>
        <div class="row-buttons">
          <button @click=${()=>this._updateFurniture(e.id,{rotation:Tm(e.rotation-90)})}>↺ 90°</button>
          <button @click=${()=>this._updateFurniture(e.id,{rotation:Tm(e.rotation+90)})}>↻ 90°</button>
        </div>
        <p class="hint">${n.furnitureHint}</p>
      </section>
      ${this._actions(()=>{let r={...e,id:_n("f"),pos:[Ft(e.pos[0]+.4),Ft(e.pos[1]+.4)]};this._commit({...this.plan,furniture:[...this.plan.furniture,r]}),this._emit("select-room",{id:r.id})},()=>{this._commit({...this.plan,furniture:this.plan.furniture.filter(r=>r.id!==e.id)}),this._emit("select-room",{id:null})})}
    `}_renderRoom(e){let n=li(e.points),s=n.maxX-n.minX,r=n.maxY-n.minY,o=Zr(e.points),a=e.points.reduce((h,u,p)=>h+Nn(u,e.points[(p+1)%e.points.length]),0),l=ct();return q`
      <div class="head">
        <button class="back" title=${l.backRooms} aria-label=${l.backRooms} @click=${()=>this._emit("select-room",{id:null})}>
          ${$t.close}
        </button>
        <input
          class="title"
          .value=${e.name}
          maxlength="100"
          aria-label=${l.roomName}
          placeholder=${l.roomName}
          @change=${h=>this._updateRoom(e.id,{name:h.target.value.trim()})}
          @keydown=${Rs}
        />
      </div>

      <div class="hero">
        <span class="value">${Zi(Kn(e.points),1)}</span><span class="unit">m²</span>
      </div>
      <p class="sub">
        ${o?l.rectangle:l.corners(e.points.length)}, ${l.perimeter(Zi(a))}
      </p>

      <section>
        <h3>${o?l.size:l.outerSize}</h3>
        <div class="grid2">
          ${this._number(l.width,s,"m",.3,100,h=>this._updateRoom(e.id,{points:xh(e.points,h,r)}))}
          ${this._number(l.length,r,"m",.3,100,h=>this._updateRoom(e.id,{points:xh(e.points,s,h)}))}
          ${this._number(l.posX,n.minX,"m",-100,100,h=>this._updateRoom(e.id,{points:vh(e.points,h,n.minY)}))}
          ${this._number(l.posY,n.minY,"m",-100,100,h=>this._updateRoom(e.id,{points:vh(e.points,n.minX,h)}))}
        </div>
      </section>

      ${this.hass?this._renderHa(e):rt}

      <div class="actions">
        <button @click=${()=>this._duplicate(e)}>${$t.copy} ${l.duplicate}</button>
        <button class="danger" @click=${()=>this._delete(e)}>${$t.trash} ${l.delete}</button>
      </div>
    `}_renderHa(e){let n=this.hass,s=wh(n),r=ct();return q`
      <section>
        <h3>Home Assistant</h3>
        <label class="field">
          <span>${r.area}</span>
          <select
            @change=${o=>this._updateRoom(e.id,{area_id:o.target.value||null})}
          >
            <option value="" ?selected=${!e.area_id}>${r.noArea}</option>
            ${s.map(o=>q`<option value=${o.area_id} ?selected=${o.area_id===e.area_id}>${o.name}</option>`)}
          </select>
        </label>
        ${this._sensorSelect(r.temperature,"temperature",e,"temp_entity")}
        ${this._sensorSelect(r.humidity,"humidity",e,"humidity_entity")}
      </section>
    `}_sensorSelect(e,n,s,r){let o=this.hass,a=Sh(o,n,s.area_id),l=s[r],h=a.filter(d=>d.inArea),u=a.filter(d=>!d.inArea),p=l?o.states[l]:void 0,c=p&&!["unknown","unavailable"].includes(p.state)?`${Zi(Number(p.state),1)} ${p.attributes.unit_of_measurement??""}`:p?ct().notAvailable:"";return q`<label class="field">
      <span>${e}${c?q`<em>${c}</em>`:rt}</span>
      <select @change=${d=>this._updateRoom(s.id,{[r]:d.target.value||null})}>
        <option value="" ?selected=${!l}>${ct().noSensorOption}</option>
        ${l&&!a.some(d=>d.entityId===l)?q`<option value=${l} selected>${l}</option>`:rt}
        ${h.length?q`<optgroup label=${ct().inThisArea}>
              ${h.map(d=>q`<option value=${d.entityId} ?selected=${d.entityId===l}>${d.name}</option>`)}
            </optgroup>`:rt}
        <optgroup label=${h.length?ct().more:ct().allSensors}>
          ${u.map(d=>q`<option value=${d.entityId} ?selected=${d.entityId===l}>${d.name}</option>`)}
        </optgroup>
      </select>
      ${l&&!p&&Object.keys(o.states).length?q`<small class="warn">${ct().entityMissing}</small>`:rt}
    </label>`}_duplicate(e){let n={...e,id:_n("r"),name:`${e.name} ${ct().copySuffix}`,area_id:null,points:Bs(e.points,.5,.5)};this._commit({...this.plan,rooms:[...this.plan.rooms,n]}),this._emit("select-room",{id:n.id})}_delete(e){this._commit({...this.plan,rooms:this.plan.rooms.filter(n=>n.id!==e.id)}),this._emit("select-room",{id:null})}_renderPlan(){let e=this.plan,n=e.settings,s=this.hass?Sa(this.hass,this.full??e,this.floor??null).length:0,r=ct();return q`
      <div class="head"><h2>${r.home}</h2></div>
      <div class="hero">
        <span class="value">${Zi(Us(e),1)}</span><span class="unit">m²</span>
      </div>
      <p class="sub">${e.rooms.length} ${r.roomCount(e.rooms.length)}</p>

      ${this._renderMissing()}

      <section>
        <h3>${r.roomsHeading}</h3>
        ${e.rooms.length?q`<ul class="rooms">
              ${[...e.rooms].sort((o,a)=>o.name.localeCompare(a.name,to())).map(o=>q`<li>
                    <button @click=${()=>this._emit("select-room",{id:o.id})}>
                      <span>${o.name||r.unnamed}</span><span class="m2">${Zi(Kn(o.points),1)} m²</span>
                    </button>
                  </li>`)}
            </ul>`:q`<p class="hint">${r.noRooms}</p>`}
        ${s?q`<button class="wide" @click=${()=>this._emit("import-areas",{})}>
              ${$t.import} ${r.importN(s)}
            </button>`:rt}
      </section>

      ${this._renderFloors()}

      <section>
        <h3>${r.construction}</h3>
        <div class="grid2">
          ${this._number(r.wallHeight,n.wall_height,"m",1.5,5,o=>this._updateSettings({wall_height:o}))}
          ${this._number(r.wallThickness,n.wall_thickness*100,"cm",2,60,o=>this._updateSettings({wall_thickness:Ft(o/100)}),0)}
        </div>
        <label class="field">
          <span>${r.grid}</span>
          <select @change=${o=>this._updateSettings({grid:Number(o.target.value)})}>
            ${wm.map(o=>q`<option value=${o} ?selected=${Math.abs(o-n.grid)<1e-6}>${o*100} cm</option>`)}
            ${wm.some(o=>Math.abs(o-n.grid)<1e-6)?rt:q`<option value=${n.grid} selected>${n.grid*100} cm</option>`}
          </select>
        </label>
      </section>

      ${this._renderLimits()}

      <section>
        <h3>${r.backup}</h3>
        <p class="hint">${r.backupHint}</p>
        <div class="grid2">
          <button class="wide" @click=${()=>this._emit("export-plan",{})}>${$t.download} ${r.exportPlan}</button>
          <button class="wide" @click=${()=>this.renderRoot.querySelector("input.import")?.click()}>
            ${$t.import} ${r.importPlan}
          </button>
        </div>
        <input class="import" type="file" accept=".json,application/json" hidden @change=${this._onImportFile} />
      </section>

      <section>
        <h3>${r.view3d}</h3>
        <label class="field">
          <span>${r.roomTap}</span>
          <select @change=${o=>this._updateSettings({room_tap:o.target.value})}>
            ${cM.map(o=>q`<option value=${o} ?selected=${o===(n.room_tap??"focus")}>${r.roomTapOptions[o]}</option>`)}
          </select>
        </label>
      </section>

      ${this._renderBackground(n.background)}

      <section>
        <h3>${r.contents}</h3>
        <p class="hint">${r.contentsText(e.items.length,e.openings.length,e.furniture.length)}</p>
      </section>

      <section class="keys">
        <h3>${r.shortcuts}</h3>
        <dl>${r.keys.map(([o,a])=>q`<dt>${o}</dt><dd>${a}</dd>`)}</dl>
      </section>
    `}_renderMissing(){if(!this.hass)return rt;let e=this.full??this.plan,n=Sm(this.hass,e);if(!n.length)return rt;let s=ct(),r=sn(e),o=l=>{let h=r.find(u=>u.id===l);return h?h.name||s.floorName(h.level):""},a=l=>{if(l.kind==="room")return e.rooms.find(u=>u.id===l.id)?.name||s.unnamed;if(l.kind==="opening"){let u=e.openings.find(c=>c.id===l.id),p=e.rooms.find(c=>c.id===u.room_ids[0])?.name;return p?`${s.openings[u.type]}, ${p}`:s.openings[u.type]}return e.items.find(u=>u.id===l.id).label||s.device};return q`<section class="missing">
      <h3>${s.missingTitle(n.length)}</h3>
      <p class="hint">${s.missingHint}</p>
      <ul>
        ${(this._allMissing?n:n.slice(0,hd)).map(l=>q`<li>
            <button @click=${()=>this._emit("select-object",{id:l.id,floor:l.floor})}>
              <span>${a(l)}${r.length>1?q` <em>${o(l.floor)}</em>`:rt}</span>
              <code>${l.entity}</code>
            </button>
          </li>`)}
      </ul>
      ${!this._allMissing&&n.length>hd?q`<button class="link more" @click=${()=>this._allMissing=!0}>${s.showMore(n.length-hd)}</button>`:rt}
    </section>`}_renderFloors(){let e=this.full??this.plan,n=Zn(e).reverse(),s=ct(),r=new Set(n.map(a=>a.floor_id)),o=this.hass?wa(this.hass).filter(a=>!r.has(a.floor_id)).length:0;return q`<section>
      <h3>${s.floors}</h3>
      <p class="hint">${n.length?s.floorsHint:s.floorsSingle}</p>
      ${n.length?q`<ul class="floor-list">
            ${n.map(a=>q`<li class=${a.id===this.floor?"current":""}>
                <input
                  .value=${a.name}
                  maxlength="100"
                  aria-label=${s.floorName(a.level)}
                  placeholder=${s.floorName(a.level)}
                  @keydown=${Rs}
                  @change=${l=>this._emit("floor-update",{id:a.id,patch:{name:l.target.value.trim()}})}
                />
                <input
                  class="level"
                  inputmode="numeric"
                  title=${s.floorLevel}
                  aria-label=${s.floorLevel}
                  .value=${String(a.level)}
                  @keydown=${Rs}
                  @change=${l=>{let h=l.target,u=Math.round(Qr(h.value));Number.isFinite(u)&&u>=-10&&u<=100?this._emit("floor-update",{id:a.id,patch:{level:u}}):h.value=String(a.level)}}
                />
                <button
                  class="icon"
                  title=${s.deleteFloor(a.name||s.floorName(a.level))}
                  aria-label=${s.deleteFloor(a.name||s.floorName(a.level))}
                  @click=${()=>this._emit("floor-remove",{id:a.id})}
                >
                  ${$t.trash}
                </button>
              </li>`)}
          </ul>`:rt}
      <button class="wide" @click=${()=>this._emit("floor-add",{})}>${$t.plus} ${s.addFloor}</button>
      ${o?q`<button class="wide" @click=${()=>this._emit("floors-import",{})}>${$t.import} ${s.importFloors(o)}</button>`:rt}
    </section>`}_renderBackground(e){let n=ct();if(!e){let o=a=>{a.preventDefault();let l=a.target.querySelector("input"),h=l.value.trim();hM.test(h)?this._emit("background-url",{url:h}):l.setCustomValidity(n.imageUrlInvalid),l.reportValidity()};return q`<section>
        <h3>${n.background}</h3>
        <p class="hint">${n.backgroundHint}</p>
        <button class="wide" @click=${()=>this._emit("pick-background",{})}>${$t.image} ${n.uploadImage}</button>
        <form class="url" @submit=${o}>
          <input
            class="entity"
            placeholder="/local/plan.png"
            aria-label=${n.imageUrl}
            spellcheck="false"
            maxlength="300"
            @input=${a=>a.target.setCustomValidity("")}
          />
          <button type="submit">${n.useUrl}</button>
        </form>
        <p class="hint small">${n.imageUrlHint}</p>
      </section>`}let s=o=>this._updateSettings({background:{...e,...o}}),r=e.height/e.width;return q`<section>
      <h3>${n.background}</h3>
      <button class="wide" @click=${()=>this._emit("calibrate",{})}>${$t.ruler} ${n.calibrate}</button>
      <p class="hint small">${n.calibrateHint}</p>
      <div class="grid2">
        ${this._number(n.posX,e.x,"m",-100,100,o=>s({x:o}))}
        ${this._number(n.posY,e.y,"m",-100,100,o=>s({y:o}))}
        ${this._number(n.width,e.width,"m",.1,200,o=>s({width:o,height:Ft(Math.max(.1,Math.min(200,o*r)))}))}
      </div>
      <label class="check">
        <input type="checkbox" .checked=${e.visible} @change=${o=>s({visible:o.target.checked})} />
        <span>${n.showInEditor}</span>
      </label>
      <label class="field">
        <span>${n.opacity}<em>${Math.round(e.opacity*100)} %</em></span>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.05"
          .value=${String(e.opacity)}
          ?disabled=${!e.visible}
          @change=${o=>s({opacity:Number(o.target.value)})}
        />
      </label>
      <div class="row-buttons">
        <button @click=${()=>this._emit("pick-background",{})}>${$t.image} ${n.replaceImage}</button>
        <button class="link" @click=${()=>this._updateSettings({background:null})}>${$t.trash} ${n.removeImage}</button>
      </div>
    </section>`}_renderLimits(){let e=ct(),n=this.plan.settings.temp_scale,s=ai(this.plan),r=a=>l=>this._updateSettings({temp_scale:{...n,[a]:l}}),o=a=>l=>this._updateSettings({thresholds:{...s,[a]:l}});return q`<section>
      <h3>${e.limits}</h3>
      <p class="hint">${e.limitsHint}</p>
      <div class="grid2">
        ${this._number(e.limCold,n.cold,"°C",-10,n.ok_low-.1,r("cold"),1)}
        ${this._number(e.limOkLow,n.ok_low,"°C",n.cold+.1,n.ok_high-.1,r("ok_low"),1)}
        ${this._number(e.limOkHigh,n.ok_high,"°C",n.ok_low+.1,n.hot-.1,r("ok_high"),1)}
        ${this._number(e.limHot,n.hot,"°C",n.ok_high+.1,45,r("hot"),1)}
        ${this._number(e.limHumid,s.humidity,"%",20,s.humidity_alert-1,o("humidity"),0)}
        ${this._number(e.limHumidAlert,s.humidity_alert,"%",s.humidity+1,100,o("humidity_alert"),0)}
        ${this._number(e.limCo2,s.co2,"ppm",400,s.co2_alert-50,o("co2"),0)}
        ${this._number(e.limCo2Alert,s.co2_alert,"ppm",s.co2+50,5e3,o("co2_alert"),0)}
      </div>
    </section>`}_number(e,n,s,r,o,a,l=2){return q`<label class="field num">
      <span>${e}</span>
      <div class="input">
        <input
          inputmode="decimal"
          .value=${Zi(n,l)}
          @focus=${h=>h.target.select()}
          @keydown=${Rs}
          @change=${h=>{let u=h.target,p=Qr(u.value);Number.isFinite(p)&&p>=r&&p<=o&&Math.abs(p-n)>1e-9?a(Ft(p)):u.value=Zi(n,l)}}
        />
        <span class="unit">${s}</span>
      </div>
    </label>`}};Jo.properties={hass:{attribute:!1},plan:{attribute:!1},full:{attribute:!1},floor:{attribute:!1},selected:{attribute:!1},_allMissing:{state:!0}},Jo.styles=De`
    :host {
      display: block;
      padding: 18px 18px 28px;
      color: var(--fp-fg);
      font-size: 14px;
    }
    .head {
      display: flex;
      align-items: center;
      gap: 6px;
      margin: 0 0 14px;
    }
    .head h2 {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
    }
    .title {
      flex: 1;
      min-width: 0;
      font: inherit;
      font-size: 17px;
      font-weight: 500;
      color: var(--fp-fg);
      background: transparent;
      border: 1px solid transparent;
      border-radius: 8px;
      padding: 6px 8px;
      margin-left: -8px;
    }
    .title:hover {
      border-color: var(--fp-line);
    }
    .title:focus {
      outline: none;
      border-color: var(--fp-accent);
      background: var(--fp-surface-2);
    }
    .back {
      order: 2;
      width: 34px;
      height: 34px;
      border-radius: 8px;
      color: var(--fp-dim);
    }
    .back:hover {
      color: var(--fp-fg);
      background: var(--fp-surface-2);
    }

    .hero {
      display: flex;
      align-items: baseline;
      gap: 6px;
    }
    .hero .value {
      font-size: 44px;
      font-weight: 200;
      line-height: 1;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
    }
    .hero .unit {
      font-size: 17px;
      color: var(--fp-dim);
    }
    .sub {
      margin: 6px 0 4px;
      color: var(--fp-dim);
      font-size: 13px;
    }

    section {
      margin-top: 22px;
    }
    h3 {
      margin: 0 0 10px;
      font-size: 13px;
      font-weight: 500;
      color: var(--fp-dim);
    }
    .grid2 {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      margin-bottom: 10px;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-bottom: 10px;
      font-size: 12.5px;
      color: var(--fp-dim);
    }
    .grid2 .field {
      margin-bottom: 0;
    }
    .field > span {
      display: flex;
      justify-content: space-between;
    }
    .field em {
      font-style: normal;
      color: var(--fp-fg);
      font-variant-numeric: tabular-nums;
    }
    .input {
      min-width: 0;
      display: flex;
      align-items: center;
      background: var(--fp-surface-2);
      border: 1px solid var(--fp-line);
      border-radius: 9px;
      padding-right: 10px;
    }
    .input:focus-within,
    select:focus {
      border-color: var(--fp-accent);
      outline: none;
    }
    .input input {
      flex: 1;
      min-width: 0;
      font: inherit;
      font-size: 15px;
      color: var(--fp-fg);
      background: none;
      border: none;
      outline: none;
      padding: 8px 10px;
      font-variant-numeric: tabular-nums;
    }
    .input .unit {
      color: var(--fp-dim);
      font-size: 13px;
    }
    select {
      font: inherit;
      font-size: 14px;
      color: var(--fp-fg);
      background: var(--fp-surface-2);
      border: 1px solid var(--fp-line);
      border-radius: 9px;
      padding: 8px 10px;
      width: 100%;
    }

    button {
      font: inherit;
      color: var(--fp-fg);
      background: none;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    button:focus-visible {
      outline: 2px solid var(--fp-accent);
      outline-offset: 2px;
    }
    .rooms {
      list-style: none;
      margin: 0 0 10px;
      padding: 0;
    }
    .rooms button {
      width: 100%;
      justify-content: space-between;
      padding: 9px 10px;
      border-radius: 9px;
      text-align: left;
    }
    .rooms button:hover {
      background: var(--fp-surface-2);
    }
    .rooms .m2 {
      color: var(--fp-dim);
      font-variant-numeric: tabular-nums;
    }
    .wide {
      width: 100%;
      justify-content: center;
      padding: 10px 12px;
      border-radius: 10px;
      border: 1px dashed var(--fp-line-strong);
      color: var(--fp-fg);
    }
    .wide:hover {
      border-color: var(--fp-accent);
      color: var(--fp-accent);
    }
    .hint {
      color: var(--fp-dim);
      line-height: 1.45;
      margin: 0 0 10px;
    }
    .actions {
      display: flex;
      gap: 8px;
      margin-top: 24px;
    }
    .actions button {
      flex: 1;
      justify-content: center;
      padding: 9px 10px;
      border-radius: 10px;
      background: var(--fp-surface-2);
      border: 1px solid var(--fp-line);
    }
    .actions .danger:hover {
      color: var(--fp-alert);
      border-color: var(--fp-alert);
    }
    .check {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
      cursor: pointer;
    }
    .check input,
    input[type="range"] {
      accent-color: var(--fp-accent);
    }
    .check input {
      width: 18px;
      height: 18px;
      margin: 0;
    }
    input[type="range"] {
      width: 100%;
      margin: 4px 0 0;
    }
    .link {
      color: var(--fp-dim);
      font-size: 13px;
      padding: 4px 0;
    }
    .link:hover {
      color: var(--fp-alert);
    }
    .field small {
      color: var(--fp-dim);
      font-size: 12px;
    }
    input.entity {
      font: inherit;
      font-size: 13.5px;
      color: var(--fp-fg);
      background: var(--fp-surface-2);
      border: 1px solid var(--fp-line);
      border-radius: 9px;
      padding: 8px 10px;
      width: 100%;
      box-sizing: border-box;
    }
    input.entity:focus {
      outline: none;
      border-color: var(--fp-accent);
    }
    .segmented {
      display: flex;
      gap: 2px;
      padding: 3px;
      margin-bottom: 12px;
      background: var(--fp-bg);
      border: 1px solid var(--fp-line);
      border-radius: 10px;
    }
    .segmented button {
      flex: 1;
      justify-content: center;
      padding: 6px 4px;
      border-radius: 7px;
      color: var(--fp-dim);
      font-size: 13px;
    }
    .segmented button.on {
      background: var(--fp-surface-2);
      color: var(--fp-fg);
    }
    .row-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 4px 0 8px;
    }
    .row-buttons button {
      padding: 7px 10px;
      border-radius: 9px;
      background: var(--fp-surface-2);
      border: 1px solid var(--fp-line);
      font-size: 13px;
    }
    .row-buttons button:hover {
      border-color: var(--fp-accent);
    }
    .head .back {
      margin-left: auto;
    }
    .warn,
    .field small.warn,
    .missing h3 {
      color: var(--fp-alert);
    }
    .link.more {
      margin-top: 6px;
    }
    .link.more:hover {
      color: var(--fp-fg);
    }
    .missing ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 4px;
    }
    .missing button {
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
      padding: 8px 10px;
      border-radius: 9px;
      text-align: left;
      border: 1px solid color-mix(in srgb, var(--fp-alert) 45%, var(--fp-line));
    }
    .missing button:hover {
      background: var(--fp-surface-2);
    }
    .missing em {
      font-style: normal;
      color: var(--fp-dim);
    }
    .missing code {
      font-size: 12px;
      color: var(--fp-alert);
      word-break: break-all;
    }
    form.url {
      display: flex;
      gap: 8px;
      margin-top: 10px;
    }
    form.url button {
      flex: none;
      padding: 0 14px;
      border-radius: 9px;
      background: var(--fp-surface-2);
      border: 1px solid var(--fp-line);
    }
    .hint.small {
      font-size: 12.5px;
      margin-top: 6px;
    }
    .floor-list {
      list-style: none;
      margin: 0 0 10px;
      padding: 0;
      display: grid;
      gap: 6px;
    }
    .floor-list li {
      display: flex;
      gap: 6px;
      align-items: center;
      border-radius: 10px;
    }
    .floor-list input {
      flex: 1;
      min-width: 0;
      font: inherit;
      font-size: 14px;
      color: var(--fp-fg);
      background: var(--fp-surface-2);
      border: 1px solid var(--fp-line);
      border-radius: 9px;
      padding: 7px 10px;
    }
    .floor-list input.level {
      flex: none;
      width: 46px;
      text-align: center;
      font-variant-numeric: tabular-nums;
    }
    .floor-list li.current input:first-child {
      border-color: var(--fp-accent);
    }
    .floor-list input:focus {
      outline: none;
      border-color: var(--fp-accent);
    }
    .floor-list .icon {
      flex: none;
      width: 34px;
      height: 34px;
      justify-content: center;
      border-radius: 8px;
      color: var(--fp-dim);
    }
    .floor-list .icon:hover {
      color: var(--fp-alert);
      background: var(--fp-surface-2);
    }
    .wide + .wide {
      margin-top: 8px;
    }
    .keys dl {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 6px 12px;
      margin: 0;
      font-size: 12.5px;
    }
    .keys dt {
      color: var(--fp-fg);
      white-space: nowrap;
    }
    .keys dd {
      margin: 0;
      color: var(--fp-dim);
    }
    @media (pointer: coarse) {
      .keys {
        display: none;
      }
    }
  `;function Tm(i){let t=(i%360+360)%360;return t>180&&(t-=360),t}function Rs(i){i.key==="Enter"&&i.target.blur()}customElements.get("fp-inspector")||customElements.define("fp-inspector",Jo);function Em(i,t){if(!t)return;let e=i.floors??[],n=t.trim().toLowerCase();return(e.find(s=>s.id===t)??e.find(s=>s.name.trim().toLowerCase()===n))?.id}function Fc(i){return typeof i=="number"&&Number.isFinite(i)&&i>=100&&i<=4e3?`${i}px`:typeof i=="string"&&/^\d{2,4}(\.\d+)?(px|vh|dvh|svh|em|rem)$/.test(i.trim())?i.trim():"420px"}function Am(i){return{floor:i.floor??"",view:i.view==="2d"?"2d":"auto",height:i.height===void 0?"420":String(i.height),controls:i.controls!==!1}}function Cm(i,t){let e={...i},n=(s,r)=>{r===void 0?delete e[s]:e[s]=r};if("floor"in t&&n("floor",t.floor||void 0),"view"in t&&n("view",t.view==="2d"?"2d":void 0),"controls"in t&&n("controls",t.controls===!1?!1:void 0),"height"in t){let s=(t.height??"").trim();s?/^\d+$/.test(s)?Fc(Number(s))===`${s}px`&&n("height",Number(s)):Fc(s)===s&&n("height",s):n("height",void 0)}return e}async function uM(){if(customElements.get("ha-form"))return;let i=window;try{await(await i.loadCardHelpers?.())?.createCardElement({type:"entities",entities:[]})?.constructor?.getConfigElement?.()}catch{}}var Qo=class extends Pe{constructor(){super();this._loaded=!1;this._floors=[],this._ready=!!customElements.get("ha-form"),this._ready||uM().then(()=>this._ready=!0)}setConfig(e){this._config=e}willUpdate(e){e.has("hass")&&zs(this.hass),this.hass&&!this._loaded&&(this._loaded=!0,ss(this.hass).then(n=>this._floors=Zn(n).reverse(),()=>{}))}get _schema(){let e=ct();return[...this._floors.length>1?[{name:"floor",selector:{select:{mode:"dropdown",options:[{value:"",label:e.cardAllFloors},...this._floors.map(n=>({value:n.id,label:n.name||e.floorName(n.level)}))]}}}]:[],{name:"view",selector:{select:{mode:"list",options:[{value:"auto",label:e.cardViewAuto},{value:"2d",label:e.cardView2d}]}}},{name:"height",selector:{text:{}}},{name:"controls",selector:{boolean:{}}}]}render(){if(!this.hass||!this._config)return rt;if(!this._ready)return q`<p class="muted">${ct().loading}</p>`;let e=ct(),n={floor:e.floor,view:e.cardView,height:e.cardHeight,controls:e.cardControls},s={height:e.cardHeightHelp,floor:e.cardFloorHelp};return q`<ha-form
      .hass=${this.hass}
      .data=${Am(this._config)}
      .schema=${this._schema}
      .computeLabel=${r=>n[r.name]??r.name}
      .computeHelper=${r=>s[r.name]}
      @value-changed=${this._changed}
    ></ha-form>`}_changed(e){if(e.stopPropagation(),!this._config)return;let n=Cm(this._config,e.detail.value);this._config=n,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:n},bubbles:!0,composed:!0}))}};Qo.properties={hass:{attribute:!1},_config:{state:!0},_floors:{state:!0},_ready:{state:!0}},Qo.styles=De`
    .muted {
      color: var(--secondary-text-color);
    }
  `;customElements.get("floorplan-3d-card-editor")||customElements.define("floorplan-3d-card-editor",Qo);var Rm={type:"change"},dd={type:"start"},Im={type:"end"},Bc=new ki,Pm=new yn,dM=Math.cos(70*Uu.DEG2RAD),ze=new L,gn=2*Math.PI,me={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ud=1e-6,zc=class extends Fo{constructor(t,e=null){super(t,e),this.state=me.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:$i.ROTATE,MIDDLE:$i.DOLLY,RIGHT:$i.PAN},this.touches={ONE:Hi.ROTATE,TWO:Hi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new bn,this._lastTargetPosition=new L,this._quat=new bn().setFromUnitVectors(t.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new _r,this._sphericalDelta=new _r,this._scale=1,this._panOffset=new L,this._rotateStart=new at,this._rotateEnd=new at,this._rotateDelta=new at,this._panStart=new at,this._panEnd=new at,this._panDelta=new at,this._dollyStart=new at,this._dollyEnd=new at,this._dollyDelta=new at,this._dollyDirection=new L,this._mouse=new at,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=fM.bind(this),this._onPointerDown=pM.bind(this),this._onPointerUp=mM.bind(this),this._onContextMenu=MM.bind(this),this._onMouseWheel=xM.bind(this),this._onKeyDown=vM.bind(this),this._onTouchStart=yM.bind(this),this._onTouchMove=bM.bind(this),this._onMouseDown=gM.bind(this),this._onMouseMove=_M.bind(this),this._interceptControlDown=SM.bind(this),this._interceptControlUp=wM.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=me.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Rm),this.update(),this.state=me.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;ze.copy(e).sub(this.target),ze.applyQuaternion(this._quat),this._spherical.setFromVector3(ze),this.autoRotate&&this.state===me.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=gn:n>Math.PI&&(n-=gn),s<-Math.PI?s+=gn:s>Math.PI&&(s-=gn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(ze.setFromSpherical(this._spherical),ze.applyQuaternion(this._quatInverse),e.copy(this.target).add(ze),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=ze.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let a=new L(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let h=new L(this._mouse.x,this._mouse.y,0);h.unproject(this.object),this.object.position.sub(h).add(a),this.object.updateMatrixWorld(),o=ze.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Bc.origin.copy(this.object.position),Bc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Bc.direction))<dM?this.object.lookAt(this.target):(Pm.setFromNormalAndCoplanarPoint(this.object.up,this.target),Bc.intersectPlane(Pm,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>ud||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ud||this._lastTargetPosition.distanceToSquared(this.target)>ud?(this.dispatchEvent(Rm),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?gn/60*this.autoRotateSpeed*t:gn/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){ze.setFromMatrixColumn(e,0),ze.multiplyScalar(-t),this._panOffset.add(ze)}_panUp(t,e){this.screenSpacePanning===!0?ze.setFromMatrixColumn(e,1):(ze.setFromMatrixColumn(e,0),ze.crossVectors(this.object.up,ze)),ze.multiplyScalar(t),this._panOffset.add(ze)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;ze.copy(s).sub(this.target);let r=ze.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(gn*this._rotateDelta.x/e.clientHeight),this._rotateUp(gn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(gn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-gn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(gn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-gn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(gn*this._rotateDelta.x/e.clientHeight),this._rotateUp(gn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new at,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function pM(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function fM(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function mM(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Im),this.state=me.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function gM(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case $i.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=me.DOLLY;break;case $i.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=me.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=me.ROTATE}break;case $i.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=me.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=me.PAN}break;default:this.state=me.NONE}this.state!==me.NONE&&this.dispatchEvent(dd)}function _M(i){switch(this.state){case me.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case me.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case me.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function xM(i){this.enabled===!1||this.enableZoom===!1||this.state!==me.NONE||(i.preventDefault(),this.dispatchEvent(dd),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Im))}function vM(i){this.enabled!==!1&&this._handleKeyDown(i)}function yM(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Hi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=me.TOUCH_ROTATE;break;case Hi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=me.TOUCH_PAN;break;default:this.state=me.NONE}break;case 2:switch(this.touches.TWO){case Hi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=me.TOUCH_DOLLY_PAN;break;case Hi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=me.TOUCH_DOLLY_ROTATE;break;default:this.state=me.NONE}break;default:this.state=me.NONE}this.state!==me.NONE&&this.dispatchEvent(dd)}function bM(i){switch(this._trackPointer(i),this.state){case me.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case me.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case me.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case me.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=me.NONE}}function MM(i){this.enabled!==!1&&i.preventDefault()}function SM(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function wM(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var $c=class extends Oe{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new at(.5,.5),this.rotation2D=0,this.addEventListener("removed",function(){this.traverse(function(e){e.element&&e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this.rotation2D=t.rotation2D,this}},Cr=new L,Dm=new fe,Lm=new fe,Nm=new L,km=new L,Hc=class{constructor(t={}){let e=this,n,s,r,o,a={objects:new WeakMap},l=t.element!==void 0?t.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.sortObjects=!0,this.getSize=function(){return{width:n,height:s}},this.render=function(f,_){f.matrixWorldAutoUpdate===!0&&f.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),Dm.copy(_.matrixWorldInverse),Lm.multiplyMatrices(_.projectionMatrix,Dm),u(f,f,_),this.sortObjects&&d(f)},this.setSize=function(f,_){n=f,s=_,r=n/2,o=s/2,l.style.width=f+"px",l.style.height=_+"px"};function h(f){f.isCSS2DObject&&(f.element.style.display="none");for(let _=0,g=f.children.length;_<g;_++)h(f.children[_])}function u(f,_,g){if(f.visible===!1){h(f);return}if(f.isCSS2DObject){Cr.setFromMatrixPosition(f.matrixWorld),Cr.applyMatrix4(Lm);let m=Cr.z>=-1&&Cr.z<=1&&f.layers.test(g.layers)===!0,T=f.element;if(T.style.display=m===!0?"":"none",m===!0){f.onBeforeRender(e,_,g);let v=100*f.center.x,M=100*f.center.y;T.style.transformOrigin=`${v}% ${M}%`;let S=-f.rotation2D,A=Cr.x*r+r,x=-Cr.y*o+o;T.style.transform=`translate(${-v}%, ${-M}%) translate(${A}px, ${x}px) rotate(${S}rad)`,T.parentNode!==l&&l.appendChild(T),f.onAfterRender(e,_,g)}let b={distanceToCameraSquared:p(g,f)};a.objects.set(f,b)}for(let m=0,T=f.children.length;m<T;m++)u(f.children[m],_,g)}function p(f,_){return Nm.setFromMatrixPosition(f.matrixWorld),km.setFromMatrixPosition(_.matrixWorld),Nm.distanceToSquared(km)}function c(f){let _=[];return f.traverseVisible(function(g){g.isCSS2DObject&&_.push(g)}),_}function d(f){let _=c(f).sort(function(m,T){if(m.renderOrder!==T.renderOrder)return T.renderOrder-m.renderOrder;let b=a.objects.get(m).distanceToCameraSquared,v=a.objects.get(T).distanceToCameraSquared;return b-v}),g=_.length;for(let m=0,T=_.length;m<T;m++)_[m].element.style.zIndex=g-m}}};function Om(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new ke,h=0;for(let u=0;u<i.length;++u){let p=i[u],c=0;if(e!==(p.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in p.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(p.attributes[d]),c++}if(c!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==p.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let d in p.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(p.morphAttributes[d])}if(t){let d;if(e)d=p.index.count;else if(p.attributes.position!==void 0)d=p.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(h,d,u),h+=d}}if(e){let u=0,p=[];for(let c=0;c<i.length;++c){let d=i[c].index;for(let f=0;f<d.count;++f)p.push(d.getX(f)+u);u+=i[c].attributes.position.count}l.setIndex(p)}for(let u in r){let p=Um(r[u]);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,p)}for(let u in o){let p=o[u][0].length;if(p!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let c=0;c<p;++c){let d=[];for(let _=0;_<o[u].length;++_)d.push(o[u][_][c]);let f=Um(d);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(f)}}}return l}function Um(i){let t,e,n,s=-1,r=0;for(let h=0;h<i.length;++h){let u=i[h];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}let o=new t(r),a=new Xe(o,e,n),l=0;for(let h=0;h<i.length;++h){let u=i[h];if(u.isInterleavedBufferAttribute){let p=l/e;for(let c=0,d=u.count;c<d;c++)for(let f=0;f<e;f++){let _=u.getComponent(c,f);a.setComponent(c+p,f,_)}}else o.set(u.array,l);l+=u.count*e}return s!==void 0&&(a.gpuType=s),a}var Fm=.36,Vc=32;function Bm(){return{uTarget:{value:new at},uDir:{value:new at(0,1)},uStrength:{value:0},uIso:{value:Array.from({length:Vc},()=>new at)},uIsoN:{value:0},uIsoTol:{value:.1}}}function fd(i,t,e){let n=t&&t.length<=Vc?t:void 0;i.uIsoN.value=n?.length??0,n?.forEach(([s,r],o)=>i.uIso.value[o].set(s,r)),i.uIsoTol.value=e}var pd=(i,t,e)=>{let n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)};function zm(i,t,e,n){let s=t.position.x-e.x,r=t.position.z-e.z,o=Math.hypot(s,r),a=Math.atan2(o,Math.max(.001,t.position.y-e.y)),l=n?pd(.25,.55,a):0,h=Math.abs(i.uStrength.value-l)>1e-4||i.uTarget.value.x!==e.x||i.uTarget.value.y!==e.z||o>1e-6&&(Math.abs(i.uDir.value.x-s/o)>1e-5||Math.abs(i.uDir.value.y-r/o)>1e-5);return i.uStrength.value=l,i.uTarget.value.set(e.x,e.z),o>1e-6&&i.uDir.value.set(s/o,r/o),h}function Gc(i,t,e){let n=i.uTarget.value,s=i.uDir.value,r=(t[0]-n.x)*s.x+(t[1]-n.y)*s.y,o=Math.abs(e[0]*s.x+e[1]*s.y),a=pd(.4,1.2,r)*pd(.2,.5,o)*i.uStrength.value;return 1+(Fm-1)*a}function $m(i,t){i.onBeforeCompile=e=>{Object.assign(e.uniforms,t),e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
        attribute vec4 aWall;
        attribute float aKeep;
        uniform vec2 uTarget;
        uniform vec2 uDir;
        uniform float uStrength;
        varying vec2 vFpWorld;`).replace("#include <begin_vertex>",`#include <begin_vertex>
        float cutS = dot(aWall.xy - uTarget, uDir);
        float cutFacing = abs(dot(aWall.zw, uDir));
        float cut = smoothstep(0.4, 1.2, cutS) * smoothstep(0.2, 0.5, cutFacing) * uStrength * (1.0 - aKeep);
        transformed.y *= mix(1.0, ${Fm.toFixed(2)}, cut);
        vFpWorld = (modelMatrix * vec4(transformed, 1.0)).xz;`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
        uniform vec2 uIso[${Vc}];
        uniform int uIsoN;
        uniform float uIsoTol;
        varying vec2 vFpWorld;
        bool fpKeep(vec2 p) {
          bool inside = false;
          float d = 1e9;
          for (int i = 0; i < ${Vc}; i++) {
            if (i >= uIsoN) break;
            vec2 a = uIso[i];
            vec2 b = uIso[i == 0 ? uIsoN - 1 : i - 1];
            if ((a.y > p.y) != (b.y > p.y) && p.x < (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x) inside = !inside;
            vec2 ab = b - a;
            float t = clamp(dot(p - a, ab) / max(dot(ab, ab), 1e-6), 0.0, 1.0);
            d = min(d, length(p - a - ab * t));
          }
          return inside || d < uIsoTol;
        }`).replace("#include <clipping_planes_fragment>",`if (uIsoN > 0 && !fpKeep(vFpWorld)) discard;
        #include <clipping_planes_fragment>`)},i.customProgramCacheKey=()=>"floorplan-3d-cutaway"}function Hm(i,t){let e=t[0]-i[0],n=t[1]-i[1],s=Math.hypot(e,n);if(s<.001)return;e/=s,n/=s,(n<-.001||Math.abs(n)<=.001&&e<0)&&(e=-e,n=-n);let r=-n*i[0]+e*i[1],o=i[0]*e+i[1]*n,a=t[0]*e+t[1]*n;return{line:{ux:e,uy:n,d:r},t0:Math.min(o,a),t1:Math.max(o,a)}}var Vm=i=>`${i.ux.toFixed(3)}|${i.uy.toFixed(3)}|${i.d.toFixed(3)}`,Rr=(i,t)=>[-i.uy*i.d+i.ux*t,i.ux*i.d+i.uy*t];function TM(i){let t=[...i].sort((n,s)=>n[0]-s[0]),e=[];for(let[n,s]of t){let r=e.at(-1);r&&n<=r[1]+.001?r[1]=Math.max(r[1],s):e.push([n,s])}return e}function EM(i,t){let e=[i];for(let[n,s]of t)e=e.flatMap(([r,o])=>{if(s<=r+.001||n>=o-.001)return[[r,o]];let a=[];return n>r+.001&&a.push([r,n]),s<o-.001&&a.push([s,o]),a});return e}function Gm(i,t,e){let n=e.height,s=e.thickness/2,r=Math.min(e.doorHeight??2.05,n-.05),o=Math.min(e.sillHeight??.9,n-.2),a=Math.min(e.windowTop??2.1,n-.05),l=new Map;for(let c of i){let d=c.points;for(let f=0;f<d.length;f++){let _=Hm(d[f],d[(f+1)%d.length]);if(!_)continue;let g=Vm(_.line),m=l.get(g)??{line:_.line,spans:[]};m.spans.push([_.t0,_.t1]),l.set(g,m)}}let h=new Map;for(let c of t){let d=Hm(c.wall.a,c.wall.b);if(!d)continue;let f=Vm(d.line),_=h.get(f)??[];_.push({span:[d.t0,d.t1],type:c.type}),h.set(f,_)}let u=[],p=[];for(let[c,{line:d,spans:f}]of l){let _=h.get(c)??[];for(let[g,m]of TM(f)){let T=[g-s,m+s],b=[...new Set(f.flat())].sort((v,M)=>v-M);for(let[v,M]of EM(T,_.map(S=>S.span))){let S=v;for(let A of b)A<=S+.001||A<=v+s+.001||A>=M-s-.001||(u.push({a:Rr(d,S),b:Rr(d,A),y0:0,y1:n}),S=A);u.push({a:Rr(d,S),b:Rr(d,M),y0:0,y1:n})}for(let v of _){let M=Math.max(v.span[0],T[0]),S=Math.min(v.span[1],T[1]);if(S-M<.001)continue;let A=Rr(d,M),x=Rr(d,S);v.type==="window"?(u.push({a:A,b:x,y0:0,y1:o}),u.push({a:A,b:x,y0:a,y1:n}),p.push({a:A,b:x,y0:o,y1:a})):u.push({a:A,b:x,y0:r,y1:n})}}}return{pieces:u.filter(c=>c.y1-c.y0>.001),glass:p}}var md=.08;function Wm(i,t,e=[]){let n=new Re,s=new Map,r=[],o=i.settings;for(let c of i.rooms){let d=new pr(c.points.map(([m,T])=>new at(m,-T))),f=new Lo(d,{depth:md,bevelEnabled:!1});f.rotateX(-Math.PI/2),f.translate(0,-md,0);let _=new pn({color:4937058}),g=new Vt(f,_);g.userData.roomId=c.id,s.set(c.id,g),n.add(g),r.push(f,_)}let{pieces:a}=Gm(i.rooms,i.openings,{height:o.wall_height,thickness:o.wall_thickness}),l=[],h=a.map(c=>{let d=c.b[0]-c.a[0],f=c.b[1]-c.a[1],_=Math.hypot(d,f),g=new be(_,c.y1-c.y0,o.wall_thickness);g.rotateY(Math.atan2(-f,d)),g.translate((c.a[0]+c.b[0])/2,(c.y0+c.y1)/2,(c.a[1]+c.b[1])/2);let m=[(c.a[0]+c.b[0])/2,(c.a[1]+c.b[1])/2,-f/_,d/_],T=g.getAttribute("position").count;g.setAttribute("aWall",new de(Array.from({length:T},()=>m).flat(),4));let b=e.some(v=>Ln(v,c.a,c.b).dist<o.wall_thickness/2+.1);return b&&l.push([c.a,c.b]),g.setAttribute("aKeep",new de(new Array(T).fill(b?1:0),1)),g}),u;if(h.length){let c=Om(h);h.forEach(f=>f.dispose());let d=new pn({color:14673130});t&&$m(d,t),u=new Vt(c,d),n.add(u),r.push(c,d)}let p=new dn;for(let c of i.rooms)for(let[d,f]of c.points)p.expandByPoint(new L(d,0,f));if(!p.isEmpty()){p.expandByPoint(new L(p.min.x,o.wall_height,p.min.z));let c=p.getSize(new L),d=.6,f=new be(c.x+d*2,.06,c.z+d*2);f.translate((p.min.x+p.max.x)/2,-md-.03,(p.min.z+p.max.z)/2);let _=new pn({color:2304563});n.add(new Vt(f,_)),r.push(f,_)}return{group:n,floors:s,walls:u,kept:l,box:p,dispose:()=>r.forEach(c=>c.dispose())}}var cn=i=>{let t=parseInt(i.replace("#",""),16);return[(t>>16&255)/255,(t>>8&255)/255,(t&255)/255]},Tn=(i,t,e)=>{let n=Math.min(1,Math.max(0,e));return[i[0]+(t[0]-i[0])*n,i[1]+(t[1]-i[1])*n,i[2]+(t[2]-i[2])*n]},In={base:cn("#4b5562"),none:cn("#454c55"),unavailable:cn("#33373d")},AM=cn("#3f9fd8"),CM=cn("#63c6e8"),gd=cn("#52c98d"),Xm=cn("#e9c45c"),Ym=cn("#ff9a4d"),RM=cn("#ef6363");function Pr(i,t){let e;if(i<=t.cold)e=AM;else if(i<t.ok_low)e=Tn(CM,gd,(i-t.cold)/(t.ok_low-t.cold||1));else if(i<=t.ok_high)e=gd;else if(i<t.hot){let n=(i-t.ok_high)/(t.hot-t.ok_high||1);e=n<.5?Tn(gd,Xm,n*2):Tn(Xm,Ym,(n-.5)*2)}else e=Tn(Ym,RM,(i-t.hot)/2);return Tn(In.base,e,.62)}var Ps=i=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${i}</svg>`,ji={snow:Ps('<path d="M12 2v20M4.9 6l14.2 12M19.1 6L4.9 18M9 3.5l3 2 3-2M9 20.5l3-2 3 2"/>'),hot:Ps('<path d="M12 3a2 2 0 0 0-2 2v9.3a4 4 0 1 0 4 0V5a2 2 0 0 0-2-2z"/><path d="M12 10v7"/><path d="M18 4v4M20 6h-4"/>'),drop:Ps('<path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z"/>'),wind:Ps('<path d="M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7"/>'),flame:Ps('<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.4 1.2-3.6 2-4.6.3 1.6 1.2 2.6 2.2 2.6C11 8.6 11 5.6 12 3z"/>'),window:Ps('<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M12 3v18M4 12h8"/><path d="M14 9l4-3"/>'),door:Ps('<path d="M5 21V4a1 1 0 0 1 1-1h8l4 2v16"/><path d="M3 21h18M14 3v18"/><circle cx="11" cy="12" r="1" fill="currentColor"/>')};function ta(i,t,e){for(let n of t.items)if(n.room_id===e.id&&i.states[n.entity_id]?.attributes.unit_of_measurement==="ppm")return hn(i,n.entity_id)}function Ir(i,t,e,n,s){let r=t.settings.temp_scale,o=ai(t),a=[],l=ct();n?.available&&n.value!==null&&(n.value<r.ok_low?a.push({icon:"snow",level:n.value<r.cold?"alert":"",text:l.flagCold(Se(n.value))}):n.value>r.ok_high&&a.push({icon:"hot",level:n.value>=r.hot?"alert":"warn",text:l.flagHot(Se(n.value))})),s?.available&&s.value!==null&&s.value>=o.humidity&&a.push({icon:"drop",level:s.value>=o.humidity_alert?"alert":"",text:l.flagHumid(Se(s.value,0))});let h=t.items.filter(c=>c.room_id===e.id),u=ta(i,t,e);u?.available&&u.value!==null&&u.value>o.co2&&a.push({icon:"wind",level:u.value>o.co2_alert?"alert":"warn",text:l.flagCo2(Se(u.value,0))}),h.some(c=>c.entity_id.startsWith("climate.")&&i.states[c.entity_id]?.attributes.hvac_action==="heating")&&a.push({icon:"flame",level:"warn",text:l.symHeating});let p=t.openings.filter(c=>c.room_ids.includes(e.id)&&c.entity_id);return p.some(c=>c.type==="window"&&i.states[c.entity_id]?.state==="on")&&a.push({icon:"window",level:"",text:l.symWindow}),p.some(c=>c.type==="door"&&c.exterior&&i.states[c.entity_id]?.state==="on")&&a.push({icon:"door",level:"alert",text:l.symDoor}),a}var Yc=["temperature","humidity","co2","heating"],qm=cn("#63c6e8"),na=cn("#52c98d"),xd=cn("#e9c45c"),vd=cn("#ff9a4d"),Km=cn("#ef6363"),Wn=i=>Tn(In.base,i,.62),Dr=35;function ea(i,t,e){return i<Dr?Wn(Tn(qm,na,(i-(Dr-10))/10)):i<t?Wn(na):i<e?Wn(Tn(xd,vd,(i-t)/(e-t||1))):Wn(Km)}function Wc(i,t,e){let n=t*.8;return i<=n?Wn(na):i<t?Wn(Tn(na,xd,(i-n)/(t-n||1))):i<e?Wn(Tn(xd,vd,(i-t)/(e-t||1))):Wn(Km)}var Xc={heating:Wn(vd),idle:Wn(na),off:Wn(qm)};function PM(i,t,e){let n=t.items.filter(r=>r.room_id===e.id&&r.entity_id.startsWith("climate."));if(!n.length)return"none";let s=n.map(r=>i.states[r.entity_id]).filter(r=>r&&r.state!=="unavailable");return s.length?s.some(r=>r.attributes.hvac_action==="heating")?"heating":s.some(r=>r.state!=="off")?"idle":"off":"unavailable"}var _d=(i,t)=>i?i.available&&i.value!==null?t(i.value):In.unavailable:In.none;function qc(i,t,e,n){let s=ai(e);switch(i){case"temperature":return _d(hn(t,n.temp_entity),r=>Pr(r,e.settings.temp_scale));case"humidity":return _d(hn(t,n.humidity_entity),r=>ea(r,s.humidity,s.humidity_alert));case"co2":return _d(ta(t,e,n),r=>Wc(r,s.co2,s.co2_alert));case"heating":{let r=PM(t,e,n);return r==="none"?In.none:r==="unavailable"?In.unavailable:Xc[r]}default:return In.base}}function Zm(i,t){let e=ct(),n=t.settings.temp_scale,s=ai(t),r=l=>Se(l,0),o=l=>Se(l,1),a;switch(i){case"humidity":a=[{color:ea(Dr-5,s.humidity,s.humidity_alert),name:e.dry,text:e.belowPercent(r(Dr))},{color:ea(Dr+5,s.humidity,s.humidity_alert),name:e.comfortable,text:e.rangePercent(r(Dr),r(s.humidity))},{color:ea((s.humidity+s.humidity_alert)/2,s.humidity,s.humidity_alert),name:e.humid,text:e.fromPercent(r(s.humidity))},{color:ea(s.humidity_alert,s.humidity,s.humidity_alert),name:e.veryHumid,text:e.fromPercent(r(s.humidity_alert))}];break;case"co2":a=[{color:Wc(s.co2*.7,s.co2,s.co2_alert),name:e.airGood,text:e.belowPpm(r(s.co2))},{color:Wc((s.co2+s.co2_alert)/2,s.co2,s.co2_alert),name:e.airVentilate,text:e.fromPpm(r(s.co2))},{color:Wc(s.co2_alert,s.co2,s.co2_alert),name:e.airUrgent,text:e.fromPpm(r(s.co2_alert))}];break;case"heating":a=[{color:Xc.heating,name:e.heatOn,text:e.heatOnDesc},{color:Xc.idle,name:e.heatIdle,text:e.heatIdleDesc},{color:Xc.off,name:e.heatOff,text:e.heatOffDesc}];break;default:a=[{color:Pr(n.cold-1,n),name:e.tooCold,text:e.tooColdDesc(o(n.ok_low),o(n.cold))},{color:Pr((n.ok_low+n.ok_high)/2,n),name:e.comfortable,text:e.rangeDesc(o(n.ok_low),o(n.ok_high))},{color:Pr((n.ok_high+n.hot)/2,n),name:e.warm,text:e.aboveDesc(o(n.ok_high))},{color:Pr(n.hot+1,n),name:e.tooWarm,text:e.fromDesc(o(n.hot))}]}return[...a,{color:In.none,name:e.noSensor,text:e.noSensorFor[i]??e.noSensorDesc},{color:In.unavailable,name:e.unavailable,text:e.unavailableDesc}]}var yd={temperature:"linear-gradient(90deg, #3f9fd8, #63c6e8 20%, #52c98d 40%, #52c98d 60%, #e9c45c 72%, #ff9a4d 86%, #ef6363)",humidity:"linear-gradient(90deg, #63c6e8, #52c98d 25%, #52c98d 55%, #e9c45c 70%, #ff9a4d 85%, #ef6363)",co2:"linear-gradient(90deg, #52c98d, #52c98d 45%, #e9c45c 62%, #ff9a4d 80%, #ef6363)",heating:"linear-gradient(90deg, #63c6e8 0 33%, #52c98d 33% 66%, #ff9a4d 66%)"};var Kc=De`
  .room-label.occluded {
    opacity: 0;
    pointer-events: none;
  }
  .room-label {
    transition: opacity 0.15s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1px;
    padding: 4px 9px 5px;
    border-radius: 10px;
    background: color-mix(in srgb, var(--fp-surface) 78%, transparent);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    color: var(--fp-fg);
    font-family: var(--fp-font);
    line-height: 1.15;
    text-align: center;
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
  }
  .room-label.clickable {
    pointer-events: auto;
    cursor: pointer;
  }
  .room-label .name {
    font-size: 12px;
    font-weight: 500;
    color: var(--fp-dim);
  }
  .room-label .temp {
    font-size: 17px;
    font-weight: 400;
    font-variant-numeric: tabular-nums;
  }
  .room-label .temp:empty,
  .room-label .hum:empty {
    display: none;
  }
  .room-label .hum {
    font-size: 11.5px;
    color: var(--fp-dim);
    font-variant-numeric: tabular-nums;
  }
  .room-label.unavailable .temp {
    color: var(--fp-dim);
  }
  .room-label.alert {
    box-shadow: 0 0 0 1.5px var(--fp-alert);
  }
  .room-label .icons {
    display: flex;
    gap: 3px;
    margin-top: 3px;
  }
  .room-label .icons:empty {
    display: none;
  }
  .icon {
    display: inline-grid;
    place-items: center;
    width: 19px;
    height: 19px;
    border-radius: 6px;
    color: var(--fp-frost);
    background: color-mix(in srgb, currentColor 20%, transparent);
  }
  .icon.warn {
    color: var(--fp-accent);
  }
  .icon.alert {
    color: var(--fp-alert);
  }
  .icon svg {
    width: 13px;
    height: 13px;
  }

  @media (max-width: 760px) {
    .room-label {
      padding: 2px 6px 3px;
      border-radius: 7px;
    }
    .room-label .name {
      font-size: 10.5px;
    }
    .room-label .temp {
      font-size: 13.5px;
    }
    .room-label .hum {
      display: none;
    }
  }
`;var jm={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Jm=i=>(...t)=>({_$litDirective$:i,values:t}),Zc=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,n){this._$Ct=t,this._$AM=e,this._$Ci=n}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var ia=class extends Zc{constructor(t){if(super(t),this.it=rt,t.type!==jm.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===rt||t==null)return this._t=void 0,this.it=t;if(t===oi)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};ia.directiveName="unsafeHTML",ia.resultType=1;var sa=Jm(ia);var Qm={animations:"floorplan-3d.animations",autoCut:"floorplan-3d.autoCut",tapToggle:"floorplan-3d.tapToggle"};function jc(i,t){try{let e=localStorage.getItem(Qm[i]);if(e!==null)return e==="1"}catch{}return t}function Jc(i,t){try{localStorage.setItem(Qm[i],t?"1":"0")}catch{}}var Qc=500;function tg(i){let t=i.split(".")[0];return t==="light"||t==="switch"?t:void 0}function IM(i,t,e,n=.6){let s=e/n;return t>i?Math.min(t,i+s):Math.max(t,i-s)}var ra=class{constructor(){this.strength=0;this.active=!1}step(t,e){let n=this.active&&e?1:0;return this.strength=e?IM(this.strength,n,t):0,this.strength}},DM=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,LM=`
  uniform float uTime;
  uniform float uStrength;
  varying vec2 vUv;
  void main() {
    float x = vUv.x;
    float y = vUv.y;
    float wave = sin(y * 11.0 - uTime * 2.4 + sin(x * 9.0 + uTime * 1.3) * 1.6);
    float band = smoothstep(0.35, 1.0, wave);
    float fadeY = smoothstep(0.0, 0.18, y) * (1.0 - smoothstep(0.35, 1.0, y));
    float fadeX = smoothstep(0.0, 0.18, x) * (1.0 - smoothstep(0.82, 1.0, x));
    float a = band * fadeY * fadeX * 0.42 * uStrength;
    // Normal blending: tints light walls too (additive would vanish on white)
    gl_FragColor = vec4(1.0, 0.5, 0.16, a);
  }
`;function eg(i,t,e=.8,n=.08){let s=new Je({vertexShader:DM,fragmentShader:LM,uniforms:{uTime:{value:0},uStrength:{value:0}},transparent:!0,depthWrite:!1,side:We}),r=new Rn(i+.2,e),o=new Vt(r,s);o.position.set(0,t+e/2,n),o.visible=!1,o.renderOrder=3;let a=new ra;return{object:o,setActive:l=>a.active=l,animate(l,h,u){let p=a.step(h,u);return o.visible=p>0,s.uniforms.uTime.value=l,s.uniforms.uStrength.value=p,p>0},dispose(){r.dispose(),s.dispose()}}}var NM=`
  attribute vec3 aSeed;
  uniform float uTime;
  uniform float uStrength;
  uniform vec3 uBox;
  uniform float uScale;
  varying float vAlpha;
  void main() {
    float p = fract(uTime * 0.22 + aSeed.x);
    vec3 pos = vec3(
      aSeed.y * uBox.x,
      aSeed.z * uBox.y + sin(p * 6.2832 + aSeed.x * 12.0) * 0.06,
      p * uBox.z
    );
    vAlpha = sin(p * 3.14159) * uStrength;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uScale / max(0.5, -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`,kM=`
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.05, d) * vAlpha * 0.75;
    gl_FragColor = vec4(vec3(0.78, 0.93, 1.0) * a, a);
  }
`;function ng(i,t,e,n,s=26){let r=new Float32Array(s*3);for(let u=0;u<s;u++)r[u*3]=u/s,r[u*3+1]=.1+.8*(u*.618%1),r[u*3+2]=.1+.8*((u*.377+.3)%1);let o=new ke;o.setAttribute("position",new Xe(new Float32Array(s*3),3)),o.setAttribute("aSeed",new Xe(r,3));let a=new Je({vertexShader:NM,fragmentShader:kM,uniforms:{uTime:{value:0},uStrength:{value:0},uBox:{value:[i,e,1.3*n]},uScale:{value:70*Math.min(window.devicePixelRatio||1,1.5)}},transparent:!0,depthWrite:!1,blending:Gi}),l=new bo(o,a);l.position.y=t,l.frustumCulled=!1,l.visible=!1,l.renderOrder=3;let h=new ra;return{object:l,setActive:u=>h.active=u,animate(u,p,c){let d=h.step(p,c);return l.visible=d>0,a.uniforms.uTime.value=u,a.uniforms.uStrength.value=d,d>0},dispose(){o.dispose(),a.dispose()}}}function bd(i){let{y:t,from:e,to:n,color:s,rings:r=2,speed:o=.7,opacity:a=.55}=i,l=new Re;l.visible=!1;let h=new No(.88,1,48),u=[],p=[];for(let d=0;d<r;d++){let f=new Ge({color:s,transparent:!0,opacity:0,depthWrite:!1,blending:Gi,side:We}),_=new Vt(h,f);_.rotation.x=-Math.PI/2,_.position.y=t,_.renderOrder=3,u.push(f),p.push(_),l.add(_)}let c=new ra;return{object:l,setActive:d=>c.active=d,animate(d,f,_){let g=c.step(f,_);return l.visible=g>0,g>0&&p.forEach((m,T)=>{let b=(d*o+T/r)%1,v=e+(n-e)*b;m.scale.set(v,v,v),m.material.opacity=(1-b)*(1-b)*a*g}),g>0},dispose(){h.dispose(),u.forEach(d=>d.dispose())}}}var UM=new Set(["on","playing","paused","idle","buffering"]),Ji=i=>typeof i=="string"?i.trim():"";function kr(i){let t=i?.state??"unavailable",e=i?.attributes??{},n=Ji(e.app_name)||Ji(e.source),s=Ji(e.media_title),r=[Ji(e.media_series_title),Ji(e.media_artist)||Ji(e.media_album_name)].filter(Boolean).join(", "),o=ct().tvStates;return{on:UM.has(t),playing:t==="playing",paused:t==="paused",app:n,title:s===n?"":s,subtitle:r,status:o[t]??"",picture:Ji(e.entity_picture),appId:Ji(e.app_id)}}function eh(i){return i.on?[i.app,i.title].filter(Boolean).join(" · ")||i.status:""}var OM=[[/netflix/i,"#e50914","#ffffff"],[/prime|amazon/i,"#00a8e1","#ffffff"],[/disney/i,"#0e3ec1","#ffffff"],[/youtube/i,"#ff0033","#ffffff"],[/spotify/i,"#1db954","#0b0b0b"],[/apple/i,"#1c1c1e","#ffffff"],[/dazn/i,"#f6ff00","#0c161c"],[/magenta|telekom/i,"#e20074","#ffffff"],[/wow|sky/i,"#1f2a6b","#ffffff"],[/joyn/i,"#1c1c1c","#ffffff"],[/rtl/i,"#ef3340","#ffffff"],[/zdf/i,"#fa7d19","#ffffff"],[/ard/i,"#003480","#ffffff"],[/twitch/i,"#9146ff","#ffffff"],[/plex/i,"#e5a00d","#1f1f1f"],[/paramount/i,"#0064ff","#ffffff"],[/hdmi|tv|antenna|live/i,"#2b3440","#ffffff"]];function FM(i,t){let e=OM.find(([s])=>s.test(i)||s.test(t)),n=(i.replace(/[^\p{L}\p{N}]/gu,"")[0]??"▶").toUpperCase();return{bg:e?.[1]??"#33475e",fg:e?.[2]??"#ffffff",letter:n}}var Lr=new Map;function BM(i,t){if(Lr.has(i))return Lr.get(i);Lr.set(i,void 0);let e=new Image;/^https?:/i.test(i)&&!i.startsWith(location.origin)&&(e.crossOrigin="anonymous"),e.decoding="async",e.onload=()=>{Lr.set(i,e),t()},e.onerror=()=>{Lr.set(i,null),t()},e.src=i}var ig=i=>Math.max(i.naturalWidth,i.naturalHeight)<=400&&Math.abs(i.naturalWidth/i.naturalHeight-1)<.25,Xn=512,yi=296,Qi='"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';function Nr(i,t,e){if(i.measureText(t).width<=e)return t;let n=0,s=t.length;for(;n<s;){let r=n+s+1>>1;i.measureText(`${t.slice(0,r)}…`).width<=e?n=r:s=r-1}return`${t.slice(0,n).trimEnd()}…`}function sg(i,t,e,n){let s=[],r=t;for(;r&&s.length<n-1&&!(i.measureText(r).width<=e);){let o=r.split(" "),a="";for(;o.length&&i.measureText(a?`${a} ${o[0]}`:o[0]).width<=e;)a=a?`${a} ${o.shift()}`:o.shift();if(!a)break;s.push(a),r=o.join(" ")}return r&&s.push(Nr(i,r,e)),s}function zM(i,t,e,n,s,r){i.beginPath(),i.moveTo(t+r,e),i.arcTo(t+n,e,t+n,e+s,r),i.arcTo(t+n,e+s,t,e+s,r),i.arcTo(t,e+s,t,e,r),i.arcTo(t,e,t+n,e,r),i.closePath()}function rg(i,t,e,n,s,r){let o=Math.max(s/t.naturalWidth,r/t.naturalHeight),a=s/o,l=r/o;i.drawImage(t,(t.naturalWidth-a)/2,(t.naturalHeight-l)/2,a,l,e,n,s,r)}var th=class{constructor(t=()=>{}){this._onChange=t;this._canvas=document.createElement("canvas");this._key="";this._canvas.width=Xn,this._canvas.height=yi,this.texture=new xs(this._canvas),this.texture.colorSpace=Ae,this.texture.anisotropy=4}draw(t){this._info=t;let e=t.picture?BM(t.picture,()=>{this._info===t&&(this._paint(t),this._onChange())}):null,n=JSON.stringify(t)+(e===void 0?":loading":e?":img":"");n!==this._key&&(this._key=n,this._paint(t))}_paint(t){let e=this._canvas.getContext("2d");if(!e)return;let n=t.picture?Lr.get(t.picture):null,s=n&&!ig(n)?n:null,r=n&&ig(n)?n:null;if(this._key=JSON.stringify(t)+(n===void 0?":loading":n?":img":""),s){try{rg(e,s,0,0,Xn,yi)}catch{e.fillStyle="#123a63",e.fillRect(0,0,Xn,yi)}let d=e.createLinearGradient(0,0,0,yi);d.addColorStop(0,"rgba(0,0,0,0.15)"),d.addColorStop(.45,"rgba(0,0,0,0.35)"),d.addColorStop(1,"rgba(0,0,0,0.85)"),e.fillStyle=d,e.fillRect(0,0,Xn,yi)}else{let d=e.createLinearGradient(0,0,Xn,yi);d.addColorStop(0,t.playing?"#123a63":"#0f2740"),d.addColorStop(1,t.playing?"#2d6fb3":"#1d4670"),e.fillStyle=d,e.fillRect(0,0,Xn,yi)}let o=30,a=o,l=66,h=()=>Xn-a-o;if(!s&&t.app){if(e.save(),zM(e,o,30,96,96,18),e.clip(),r){e.fillStyle="#ffffff",e.fillRect(o,30,96,96);try{rg(e,r,o,30,96,96)}catch{}}else{let _=FM(t.app,t.appId);e.fillStyle=_.bg,e.fillRect(o,30,96,96),e.fillStyle=_.fg,e.font=`700 58px ${Qi}`,e.textAlign="center",e.textBaseline="middle",e.fillText(_.letter,o+96/2,30+96/2+3),e.textAlign="left"}e.restore(),a=o+96+20,l=30+96/2+13}if(e.textBaseline="alphabetic",s){let d=yi-56;if(t.subtitle&&(e.font=`400 22px ${Qi}`,e.fillStyle="rgba(255,255,255,0.75)",e.fillText(Nr(e,t.subtitle,Xn-o*2),o,d),d-=34),t.title){e.font=`600 32px ${Qi}`,e.fillStyle="#ffffff";let f=sg(e,t.title,Xn-o*2,2);f.forEach((_,g)=>e.fillText(_,o,d-(f.length-1-g)*36)),d-=f.length*36+2}t.app&&(e.font=`600 22px ${Qi}`,e.fillStyle="rgba(255,255,255,0.8)",e.fillText(Nr(e,t.app,Xn-o*2),o,d))}else{if(t.app&&(e.font=`600 36px ${Qi}`,e.fillStyle="#ffffff",e.fillText(Nr(e,t.app,h()),a,l)),a=o,l=t.app?166:66,t.title){e.font=`400 30px ${Qi}`,e.fillStyle="rgba(255,255,255,0.95)";for(let d of sg(e,t.title,h(),2))e.fillText(d,a,l),l+=34}t.subtitle&&(e.font=`400 22px ${Qi}`,e.fillStyle="rgba(255,255,255,0.72)",e.fillText(Nr(e,t.subtitle,h()),a,l))}let u=yi-22,p=o,c=t.playing||t.paused?26:0;e.fillStyle="rgba(255,255,255,0.75)",t.playing?(e.beginPath(),e.moveTo(p,u-16),e.lineTo(p+14,u-8),e.lineTo(p,u),e.closePath(),e.fill()):t.paused&&(e.fillRect(p,u-16,5,16),e.fillRect(p+9,u-16,5,16)),e.font=`400 20px ${Qi}`,e.fillText(Nr(e,t.status,Xn-o*2-c),p+c,u),this.texture.needsUpdate=!0}dispose(){this.texture.dispose()}};var $M=2.05,HM=.9,VM=2.1,GM=85*Math.PI/180,WM=70*Math.PI/180,XM=14*Math.PI/180,YM=new Set(["on","playing","paused","idle","buffering","home","open"]),qM=new Ge,Md=class{constructor(){this.items=[]}add(t){return this.items.push(t),t}effect(t){return this.items.push(t),t}dispose(){this.items.forEach(t=>t.dispose())}},nh;function KM(){if(nh)return nh;let i=document.createElement("canvas");i.width=i.height=128;let t=i.getContext("2d"),e=t.createRadialGradient(64,64,0,64,64,64);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.35,"rgba(255,255,255,0.45)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),nh=new xs(i),nh}var og=i=>i?.state==="on";function Ur(i){let t=i?.attributes.rgb_color;if(!(!Array.isArray(t)||t.length<3||!t.every(e=>typeof e=="number"&&e>=0&&e<=255)))return[t[0],t[1],t[2]]}var oa=i=>!i||i.state==="unavailable"||i.state==="unknown";function ag(i,t,e,n=3.2){let s=t-i;return Math.abs(s)<.002?t:i+s*(1-Math.exp(-e*n*2))}var Sd=(i,t)=>{i.traverse(e=>e.userData.entityId=t)};function ZM(i,t,e,n){let s=e.settings.wall_thickness,r=Math.min($M,e.settings.wall_height-.05),[o,a]=i.wall.a,[l,h]=i.wall.b,u=Math.hypot(l-o,h-a),[p,c]=i.hinge==="left"?[o,a]:[l,h],[d,f]=i.hinge==="left"?[l,h]:[o,a],_=Math.atan2(-(f-c),d-p),g=new Re,m=n.add(new pn({color:15856630})),T=new Re;for(let D of[0,u]){let O=new Vt(n.add(new be(.05,r,s+.03)),m);O.position.set(D,r/2,0),T.add(O)}let b=new Vt(n.add(new be(u+.05,.05,s+.03)),m);b.position.set(u/2,r,0),T.add(b),T.position.set(p,0,c),T.rotation.y=_,g.add(T);let v=new Re;v.position.set(p,0,c),v.rotation.y=_;let M=n.add(new pn({color:i.exterior?9272168:12757902})),S=n.add(new be(u-.04,r-.03,.04));S.translate((u-.04)/2+.02,(r-.03)/2,0);let A=new Vt(S,M);v.add(A),g.add(v);let x=t.find(D=>D.id===i.room_ids[0]),E=1;if(x){let D=_+Math.PI/2,O=p+Math.cos(D)*(u/2),I=c-Math.sin(D)*(u/2);E=Ke([O,I],x.points)?1:-1}let C=i.entity_id?0:WM,P=C;return v.rotation.y=_+E*C,Sd(g,i.entity_id),{root:g,pickables:i.entity_id?[A,T]:[],update(D){if(!i.entity_id)return;let O=D.states[i.entity_id],I=og(O);P=I?GM:0;let F=I&&i.exterior;M.color.set(oa(O)?7040885:i.exterior?9272168:12757902),M.emissive.set(F?9051935:0)},step(D){return C===P?!1:(C=ag(C,P,D),v.rotation.y=_+E*C,C!==P)}}}function jM(i,t,e,n){let s=e.settings.wall_thickness,r=e.settings.wall_height,o=Math.min(HM,r-.2),a=Math.min(VM,r-.05),l=a-o,[h,u]=i.wall.a,[p,c]=i.wall.b,d=Math.hypot(p-h,c-u),f=Math.atan2(-(c-u),p-h),_=new Re;_.position.set(h,0,u),_.rotation.y=f;let g=n.add(new pn({color:15856630})),m=.05,T=s*.6,b=(I,F,V,W)=>{let st=new Vt(n.add(new be(V,W,T)),g);return st.position.set(I,F,0),_.add(st),st};b(d/2,o+m/2,d,m),b(d/2,a-m/2,d,m),b(m/2,o+l/2,m,l),b(d-m/2,o+l/2,m,l);let v=t.find(I=>I.id===i.room_ids[0]),M=1;if(v){let I=h+(p-h)/2,F=u+(c-u)/2,V=-(c-u)/(d||1),W=(p-h)/(d||1);M=Ke([I+V*.2,F+W*.2],v.points)?1:-1}let S=new Vt(n.add(new be(d+.1,.03,.2)),g);S.position.set(d/2,o-.015,M*(s/2+.06)),_.add(S);let A=new Re;A.position.set(0,o+m,0);let x=n.add(new Ge({color:9427184,transparent:!0,opacity:.32,side:We,depthWrite:!1})),E=new Vt(n.add(new Rn(d-m*2,l-m*2)),x);E.position.set(d/2,(l-m*2)/2,0),E.renderOrder=2,A.add(E);let C=new Vt(n.add(new be(d-m*2,.03,.03)),g);if(C.position.set(d/2,l-m*2,0),A.add(C),d>1.3){let I=new Vt(n.add(new be(.04,l-m*2,.04)),g);I.position.set(d/2,(l-m*2)/2,0),A.add(I)}_.add(A);let P=i.entity_id?n.effect(ng(d,o+m,l-m*2,M)):void 0;P&&_.add(P.object);let D=0,O=0;return Sd(_,i.entity_id),{root:_,pickables:i.entity_id?[E]:[],update(I){if(!i.entity_id)return;let F=I.states[i.entity_id],V=og(F);O=V?XM:0,P?.setActive(V),x.color.set(V?4175600:oa(F)?8095636:9427184),x.opacity=V?.55:.32},step(I){return D===O?!1:(D=ag(D,O,I),A.rotation.x=M*D,D!==O)},animate:P?(I,F,V)=>P.animate(I,F,V):void 0}}function JM(i,t,e,n,s,r){let o=nn(i,n?.states[i.entity_id]?.attributes.device_class),a=e.settings.wall_thickness,l=new Re,h=ls(t,i.pos),u,p=(b,v=as,M=!1)=>{if(i.rotation||!h||h.dist>v){l.position.set(i.pos[0],0,i.pos[1]),l.rotation.y=-i.rotation*Math.PI/180;return}M&&(u={center:h.foot,normal:[h.nx,h.ny]});let S=a/2+b/2+.01;l.position.set(h.foot[0]+h.nx*S,0,h.foot[1]+h.ny*S),l.rotation.y=h.angle;let A=Math.sin(h.angle),x=Math.cos(h.angle);A*h.nx+x*h.ny<0&&(l.rotation.y+=Math.PI)},c=b=>s.add(new pn({color:b})),d=[],f=()=>{},_;switch(o){case"radiator":{let b=gh(i),v=ks(i),M=b?1.1:.55,S=jr;p(S);let A=c(13222584),x=new Re,E=b?9:10;for(let P=0;P<E;P++)if(b){let D=new Vt(s.add(new be(v,.035,S*.6)),A);D.position.set(0,(P+.5)*(M/E),0),x.add(D)}else{let D=new Vt(s.add(new be(v/E-.012,M,S)),A);D.position.set(-v/2+(P+.5)*(v/E),M/2,0),x.add(D)}if(b)for(let P of[-v/2,v/2]){let D=new Vt(s.add(new be(.035,M,.035)),A);D.position.set(P,M/2,0),x.add(D)}x.position.y=b?i.height:Math.max(.1,i.height-.05),l.add(x),d.push(x);let C=s.effect(eg(v,x.position.y+M,b?.6:.8,S/2+.06));l.add(C.object),_=(P,D,O)=>C.animate(P,D,O),f=P=>{let D=P.states[i.entity_id],O=D?.attributes.hvac_action;C.setActive(O==="heating"),oa(D)?A.color.set(6119784):O==="heating"?A.color.set(16747069):D?.state==="off"?A.color.set(10135220):A.color.set(14208963),A.emissive.set(O==="heating"?10107392:0)};break}case"tv":{p(.06,.7,!0);let M=new Vt(s.add(new be(1.72,.99,.05)),c(1382170)),S=Math.max(.55,i.height)+.99/2-.4;M.position.set(0,S,0);let A=new th(r);s.items.push(A);let x=s.add(new Ge({color:329223})),E=new Vt(s.add(new Rn(1.72-.04,.99-.04)),x);E.position.set(0,S,.027),l.add(M,E),d.push(M,E);let C=!1,P=new Zt(.86,.86,.86),D=new Zt(1,1,1);f=O=>{let I=kr(O.states[i.entity_id]);C=I.playing,I.on?(A.draw(I),x.map=A.texture,x.color.copy(D)):(x.map=null,x.color.set(329223)),x.needsUpdate=!0},_=(O,I,F)=>{if(!C||!F)return C&&x.color.copy(D),!1;let V=.5+.5*Math.sin(O*1.9)*Math.sin(O*.71+1.3);return x.color.copy(P).lerp(D,V),!0};break}case"light":{let b=i.entity_id.includes("backlight"),v=c(15328474),M=s.add(new Ge({map:KM(),color:16765562,transparent:!0,opacity:0,blending:Gi,depthWrite:!1}));if(b){p(.02,.7,!0);let S=new Vt(s.add(new Rn(2.6,1.7)),M);S.position.set(0,Math.max(.55,i.height)+.1,.005),l.add(S),d.push(S)}else{l.position.set(i.pos[0],0,i.pos[1]);let S=Math.max(.3,i.height);if(S>1){let C=new Vt(s.add(new Mn(.015,.015,S,8)),c(3159098));C.position.y=S/2;let P=new Vt(s.add(new Mn(.14,.14,.03,16)),c(3159098));P.position.y=.015,l.add(C,P),d.push(C)}let A=new Vt(s.add(new Mn(.11,.18,.24,20,1,!0)),v);v.side=We,A.position.y=S;let x=new Vt(s.add(new Oi(.06,12,8)),v);x.position.y=S-.05;let E=new Vt(s.add(new wo(1.6,32)),M);E.rotation.x=-Math.PI/2,E.position.y=.012,l.add(A,x,E),d.push(A,x)}f=S=>{let A=S.states[i.entity_id],x=A?.state==="on",E=Ur(A),C=E?new Zt().setRGB(E[0]/255,E[1]/255,E[2]/255,Ae):new Zt(16765562),P=typeof A?.attributes.brightness=="number"?A.attributes.brightness/255:1;M.color.copy(C),M.opacity=x?.35+.45*P:0,v.emissive.copy(x?C.clone().multiplyScalar(.6):new Zt(0))};break}case"vacuum":{l.position.set(i.pos[0],0,i.pos[1]);let b=new Vt(s.add(new Mn(.175,.175,.09,24)),c(15264494));b.position.y=.045;let v=s.add(new Ge({color:5425549})),M=new Vt(s.add(new Mn(.05,.05,.095,16)),v);M.position.set(0,.05,.06),l.add(b,M),d.push(b,M);let S=!1,[A,x]=i.pos;_=(E,C,P)=>{if(!S||!P)return l.position.set(A,0,x),!1;let D=E*.55;return l.position.set(A+Math.cos(D)*.35,0,x+Math.sin(D)*.35),l.rotation.y=-D,!0},f=E=>{let C=E.states[i.entity_id],P=C?.state??"unavailable";S=P==="cleaning",v.color.set(P==="cleaning"||P==="returning"?6538984:P==="error"?15688547:oa(C)?6119784:5425549)};break}case"speaker":{l.position.set(i.pos[0],0,i.pos[1]);let b=new Vt(s.add(new Mn(.05,.05,.09,20)),c(2830133));b.position.y=i.height+.045;let v=s.add(new Ge({color:1776928})),M=new Vt(s.add(new Mn(.052,.052,.012,20)),v);M.position.y=i.height+.09,l.add(b,M),d.push(b,M);let S=s.effect(bd({y:i.height+.06,from:.08,to:.85,color:3458804,rings:3,speed:.9,opacity:.6}));l.add(S.object),_=(A,x,E)=>S.animate(A,x,E),f=A=>{let x=A.states[i.entity_id];v.color.set(x?.state==="playing"?3458804:1776928),S.setActive(x?.state==="playing")};break}case"sensor":case"motion":case"generic":{let b=i.entity_id.startsWith("media_player.");b?p(.02,.7,!0):l.position.set(i.pos[0],0,i.pos[1]);let v=b?[.26,.17,.015]:o==="motion"?[.1,.03,.1]:[.14,.14,.06],M=o==="motion"?e.settings.wall_height-.02:i.height+v[1]/2,S=new Vt(s.add(new be(...v)),c(b?1382170:15987958));S.position.y=M;let A=s.add(new Ge({color:5425549})),x=new Vt(b?s.add(new Rn(v[0]-.02,v[1]-.02)):s.add(new Oi(.018,8,6)),A);x.position.set(0,M+(b?0:v[1]/2),b?.009:0),l.add(S,x),d.push(S,x);let E=o==="motion"?s.effect(bd({y:.02,from:.2,to:1.7,color:16751181,rings:2,speed:.6})):void 0;E&&(l.add(E.object),_=(C,P,D)=>E.animate(C,P,D)),f=C=>{let P=C.states[i.entity_id];if(E?.setActive(P?.state==="on"),oa(P))return void A.color.set(6119784);if(b)return void A.color.set(YM.has(P.state)?2775690:329223);let D=Number(P.state);P.attributes.unit_of_measurement==="ppm"?A.color.set(D>1400?15688547:D>1e3?16174952:5425549):o==="motion"?A.color.set(P.state==="on"?16751181:5425549):A.color.set(5425549)};break}}let g=l.position.clone(),m=l.rotation.y;l.position.set(0,0,0),l.rotation.y=0,l.updateMatrixWorld(!0);let T=new dn().setFromObject(l);if(l.position.copy(g),l.rotation.y=m,!T.isEmpty()){let b=T.getSize(new L).addScalar(.16),v=new Vt(s.add(new be(b.x,b.y,b.z)),qM);v.position.copy(T.getCenter(new L)),v.visible=!1,l.add(v),d.push(v)}return Sd(l,i.entity_id),{root:l,pickables:d,update:f,step:()=>!1,animate:_,mount:u}}function lg(i,t,e=()=>{}){let n=new Md,s=new Re,r=new Re;s.add(r);let o=[],a=[],l=[];for(let h of i.openings){let u=h.type==="door"?ZM(h,i.rooms,i,n):h.type==="window"?jM(h,i.rooms,i,n):void 0;if(!u)continue;o.push(u),r.add(u.root);let[[p,c],[d,f]]=[h.wall.a,h.wall.b],_=Math.hypot(d-p,f-c)||1;a.push({root:u.root,center:[(p+d)/2,(c+f)/2],normal:[-(f-c)/_,(d-p)/_]}),l.push({root:u.root,at:[(p+d)/2,(c+f)/2],edge:!0})}for(let h of i.furniture??[]){let u=Nc(h,n,i.settings.wall_height);s.add(u),l.push({root:u,at:h.pos,edge:!1})}for(let h of i.items){let u=JM(h,i.rooms,i,t,n,e);o.push(u),s.add(u.root),l.push({root:u.root,at:h.pos,edge:!1,mount:u.mount})}return{group:s,openings:r,cutaway:a,placed:l,objects:o,pickables:o.flatMap(h=>h.pickables),dispose:()=>n.dispose()}}var Or={x:28,top:64,bottom:72},QM=i=>`rgb(${i.map(t=>Math.round(t*255)).join(",")})`,aa=class extends Pe{constructor(){super();this._downAt=0;this._resize=new ResizeObserver(([e])=>{let{width:n,height:s}=e.contentRect;this._size={w:n,h:s}});this._size={w:0,h:0},this.animations=!0,this.colorMode="temperature"}connectedCallback(){super.connectedCallback(),this._resize.observe(this)}disconnectedCallback(){this._resize.disconnect(),super.disconnectedCallback()}_layout(){let e=ci(this.plan?.rooms??[]),{w:n,h:s}=this._size;if(!e||!n||!s)return;let r=Math.max(e.maxX-e.minX,1),o=Math.max(e.maxY-e.minY,1),a=s>n*1.1&&r>o,[l,h]=a?[o,r]:[r,o],u=Math.min((n-2*Or.x)/l,(s-Or.top-Or.bottom)/h),p=(n-l*u)/2,c=Or.top+(s-Or.top-Or.bottom-h*u)/2;if(a){let _=p+e.maxY*u,g=c-e.minX*u;return{k:u,rotate:a,matrix:`matrix(0 ${u} ${-u} 0 ${_} ${g})`,toScreen:([m,T])=>[-u*T+_,u*m+g]}}let d=p-e.minX*u,f=c-e.minY*u;return{k:u,rotate:a,matrix:`matrix(${u} 0 0 ${u} ${d} ${f})`,toScreen:([_,g])=>[u*_+d,u*g+f]}}_tap(e,n){n?.stopPropagation(),this.dispatchEvent(new CustomEvent("room-tap",{detail:{id:e===this.selected?null:e}}))}_moreInfo(e,n){n?.stopPropagation(),e&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}render(){let e=this._layout();if(!e||!this.hass)return rt;let n=this.plan,s=n.settings.wall_thickness,r=o=>o.points.map(a=>a.join(",")).join(" ");return q`
      <svg class="map ${this.animations?"anim":""}" width=${this._size.w} height=${this._size.h} @click=${()=>this.selected&&this._tap(null)}>
        <defs>${this._glowGradients()}</defs>
        <g transform=${e.matrix}>
          ${n.rooms.map(o=>Y`<polygon class="floor ${o.id===this.selected?"sel":""}" points=${r(o)} style="fill:${QM(this._floor(o))}"
              @click=${a=>this._tap(o.id,a)} />`)}
          ${this._glows()}
          ${n.furniture.map(o=>Y`<g class="furniture" transform="translate(${o.pos[0]} ${o.pos[1]}) rotate(${o.rotation})">
              ${no(o.type,o.size[0],o.size[1])}
              ${io(o.type,o.size[0],o.size[1])}
            </g>`)}
          ${n.rooms.map(o=>Y`<polygon class="wall" points=${r(o)} stroke-width=${s} />`)}
          ${n.rooms.filter(o=>o.id===this.selected).map(o=>Y`<polygon class="sel-outline" points=${r(o)} stroke-width=${s*.6} />`)}
          ${n.openings.map(o=>this._opening(o,s))}
        </g>
        ${n.items.map(o=>this._item(o,e))}
      </svg>
      ${n.rooms.map(o=>this._label(o,e))}
    `}_lamps(){let e=this.hass;return this.plan.items.flatMap(n=>{let s=e.states[n.entity_id];return s?.state!=="on"||nn(n,s.attributes.device_class)!=="light"?[]:[{item:n,color:`rgb(${(Ur(s)??[255,209,140]).join(",")})`}]})}_glowGradients(){let e=new Set(this._lamps().map(({item:s})=>s.room_id));return[...this.plan.rooms.filter(s=>e.has(s.id)).map(s=>Y`<clipPath id=${`room-${s.id}`}><polygon points=${s.points.map(r=>r.join(",")).join(" ")} /></clipPath>`),...this._lamps().map(({item:s,color:r})=>Y`<radialGradient id=${`glow-${s.id}`}>
        <stop offset="0" stop-color=${r} stop-opacity="0.32" />
        <stop offset="1" stop-color=${r} stop-opacity="0" />
      </radialGradient>`)]}_glows(){return this._lamps().map(({item:e})=>Y`<circle class="glow" cx=${e.pos[0]} cy=${e.pos[1]} r="1.4" fill=${`url(#glow-${e.id})`}
        clip-path=${e.room_id?`url(#room-${e.room_id})`:rt} />`)}_floor(e){return qc(this.colorMode,this.hass,this.plan,e)}_opening(e,n){let[s,r]=e.wall.a,[o,a]=e.wall.b,l=!!e.entity_id&&this.hass.states[e.entity_id]?.state==="on",h=`opening ${e.type} ${l?"open":""} ${e.exterior?"ext":""} ${e.entity_id?"clickable":""}`;return Y`<g class=${h} @click=${u=>e.entity_id?this._moreInfo(e.entity_id,u):void 0}>
      <line class="gap" x1=${s} y1=${r} x2=${o} y2=${a} stroke-width=${n*1.15} />
      ${e.type==="opening"||e.type==="door"&&l?rt:Y`<line class="mark" x1=${s} y1=${r} x2=${o} y2=${a} stroke-width=${n*.55} />`}
      ${e.type==="door"&&l?this._doorLeaf(e):rt}
      <line class="hit" x1=${s} y1=${r} x2=${o} y2=${a} />
    </g>`}_doorLeaf(e){let[n,s]=e.wall.a,[r,o]=e.wall.b,a=Math.hypot(r-n,o-s);if(a<.05)return rt;let l=-(o-s)/a,h=(r-n)/a,u=this.plan.rooms.find(f=>f.id===e.room_ids[0]),p=[(n+r)/2,(s+o)/2];u&&!Ke([p[0]+l*.2,p[1]+h*.2],u.points)&&(l=-l,h=-h);let[c,d]=e.hinge==="left"?[n,s]:[r,o];return Y`<line class="leaf" x1=${c} y1=${d} x2=${c+l*a*.92} y2=${d+h*a*.92} />`}_item(e,n){let s=this.hass.states[e.entity_id],r=nn(e,s?.attributes.device_class),o=r==="radiator"?s?.attributes.hvac_action==="heating":["on","playing","cleaning","returning","open"].includes(s?.state??""),a=!s||s.state==="unavailable",[l,h]=n.toScreen(e.pos),u=e.label||s?.attributes.friendly_name||e.entity_id,p=r==="tv"?eh(kr(s)):"",c=r==="light"&&o?Ur(s):void 0;return Y`<g class="item ${r} ${o?"active":""} ${a?"off":""}" transform="translate(${l} ${h})"
      style=${c?`--lamp: rgb(${c.join(",")})`:""}
      @pointerdown=${()=>this._downAt=performance.now()}
      @click=${d=>{d.stopPropagation(),this.tapItem&&performance.now()-this._downAt<Qc?this.tapItem(e.entity_id):this._moreInfo(e.entity_id)}}>
      <title>${u}</title>
      <circle r="16" class="hitpad" />
      ${o&&(r==="motion"||r==="speaker")?Y`<circle r="10" class="ping" /><circle r="10" class="ping late" />`:rt}
      <circle r="10" class="disc" /><g class="glyph">${Ci[r]}</g>
      ${p?Y`<text class="caption" y="26">${p.length>26?`${p.slice(0,25)}…`:p}</text>`:rt}
    </g>`}_label(e,n){let s=this.hass,r=hn(s,e.temp_entity),o=hn(s,e.humidity_entity),[a,l]=n.toScreen(os(e.points)),h=Ir(s,this.plan,e,r,o),u=r?r.available&&r.value!==null?`${Se(r.value)}°`:"–":"",p=o?.available&&o.value!==null?`${Se(o.value,0)} %`:"",c=["room-label","clickable",r&&!r.available?"unavailable":"",h.some(d=>d.level==="alert")?"alert":""].join(" ");return q`<div class=${c} style="left:${a}px;top:${l}px" @click=${d=>this._tap(e.id,d)}>
      <span class="name">${e.name||ct().unnamed}</span>
      <span class="temp">${u}</span>
      <span class="hum">${p}</span>
      <span class="icons">${h.map(d=>q`<span class="icon ${d.level}" title=${d.text}>${sa(ji[d.icon])}</span>`)}</span>
    </div>`}};aa.properties={hass:{attribute:!1},plan:{attribute:!1},animations:{type:Boolean},colorMode:{attribute:!1},selected:{attribute:!1},tapItem:{attribute:!1},_size:{state:!0}},aa.styles=[Kc,De`
      :host {
        position: absolute;
        inset: 0;
        display: block;
        overflow: hidden;
      }
      svg.map {
        position: absolute;
        inset: 0;
      }
      .floor {
        stroke: none;
        transition: fill 1s ease;
        cursor: pointer;
      }
      .sel-outline {
        fill: none;
        stroke: var(--fp-accent);
        stroke-linejoin: miter;
        pointer-events: none;
      }
      .glow {
        pointer-events: none;
      }
      .opening .leaf {
        stroke: var(--fp-accent);
        stroke-width: 0.06;
        stroke-linecap: round;
      }
      .opening.ext .leaf {
        stroke: var(--fp-alert);
      }
      .wall {
        fill: none;
        stroke: var(--fp-wall, #d9dee5);
        stroke-linejoin: miter;
      }
      .furniture .body {
        fill: color-mix(in srgb, var(--fp-fg) 9%, transparent);
        stroke: color-mix(in srgb, var(--fp-fg) 22%, transparent);
        stroke-width: 0.02;
      }
      .furniture .g {
        fill: none;
        stroke: color-mix(in srgb, var(--fp-fg) 18%, transparent);
        stroke-width: 0.02;
      }
      .opening .gap {
        stroke: var(--fp-canvas);
      }
      .opening .mark {
        stroke: color-mix(in srgb, var(--fp-fg) 45%, var(--fp-canvas));
      }
      .opening.window .mark {
        stroke: color-mix(in srgb, var(--fp-frost) 60%, var(--fp-canvas));
      }
      .opening.open .mark {
        stroke: var(--fp-frost);
      }
      .opening.door.open .mark {
        stroke: var(--fp-accent);
      }
      .opening.door.open.ext .mark {
        stroke: var(--fp-alert);
      }
      .opening .hit {
        stroke: transparent;
        stroke-width: 0.5;
      }
      .opening.clickable {
        cursor: pointer;
      }
      .item {
        cursor: pointer;
      }
      .item .hitpad {
        fill: transparent;
      }
      .item .disc {
        fill: var(--fp-surface);
        stroke: color-mix(in srgb, var(--fp-fg) 35%, transparent);
        stroke-width: 1.5;
      }
      .item path,
      .item rect,
      .item circle:not(.disc):not(.hitpad) {
        fill: none;
        stroke: var(--fp-dim);
        stroke-width: 1.4;
      }
      .item .fill {
        fill: var(--fp-dim);
        stroke: none;
      }
      .item.active .disc {
        stroke: var(--fp-frost);
      }
      .item.active path,
      .item.active rect,
      .item.active circle:not(.disc):not(.hitpad) {
        stroke: var(--fp-frost);
      }
      .item.light.active .disc,
      .item.light.active .fill {
        fill: var(--lamp, var(--fp-lamp));
        stroke: var(--lamp, var(--fp-lamp));
      }
      .item.radiator.active .disc {
        fill: color-mix(in srgb, var(--fp-accent) 30%, var(--fp-surface));
        stroke: var(--fp-accent);
      }
      .item.radiator.active path {
        stroke: var(--fp-accent);
      }
      .item.off {
        opacity: 0.45;
      }
      .item .caption {
        font: 600 11px/1 var(--ha-font-family-body, system-ui, sans-serif);
        text-anchor: middle;
        fill: var(--fp-fg);
        stroke: var(--fp-surface);
        stroke-width: 3px;
        paint-order: stroke;
      }
      .room-label {
        position: absolute;
        transform: translate(-50%, -50%);
      }

      /* Animations */
      .ping {
        display: none;
        fill: none;
        stroke-width: 1.5;
        transform-box: fill-box;
        transform-origin: center;
      }
      .item.active.motion circle.ping {
        stroke: var(--fp-accent);
      }
      .item.active.speaker circle.ping {
        stroke: var(--fp-frost);
      }
      .anim .ping {
        display: block;
        animation: ping 1.8s ease-out infinite;
      }
      .anim .ping.late {
        animation-delay: 0.9s;
      }
      .anim .item.radiator.active .disc {
        animation: heat 2.4s ease-in-out infinite;
      }
      .anim .item.vacuum.active .glyph {
        transform-box: fill-box;
        transform-origin: center;
        animation: spin 3s linear infinite;
      }
      .anim .opening.window.open .mark {
        stroke-dasharray: 0.12 0.1;
        animation: air 1.4s linear infinite;
      }
      @keyframes ping {
        from {
          transform: scale(1);
          opacity: 0.8;
        }
        to {
          transform: scale(2.8);
          opacity: 0;
        }
      }
      @keyframes heat {
        50% {
          fill: color-mix(in srgb, var(--fp-accent) 55%, var(--fp-surface));
        }
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      @keyframes air {
        to {
          stroke-dashoffset: -0.44;
        }
      }
    `];customElements.get("fp-live-map")||customElements.define("fp-live-map",aa);var tS=["on","open","playing","cleaning","returning","heat","heating"];function cg(i,t){if(!t)return ct().notAvailable;if(t.entity_id.startsWith("climate.")){let n=Number(t.attributes.current_temperature),s=Number(t.attributes.temperature),r=[Number.isFinite(n)?`${Se(n)} °C`:"",Number.isFinite(s)?`${Se(s)} °C`:""].filter(Boolean);if(r.length)return r.join(" → ")}if(i.formatEntityState)return i.formatEntityState(t);let e=t.attributes.unit_of_measurement;return e?`${t.state} ${e}`:t.state}var la=class extends Pe{constructor(){super(),this.isolated=!1}_moreInfo(t){t&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}render(){let t=this.hass,e=this.room;if(!t||!e)return rt;let n=ct(),s=hn(t,e.temp_entity),r=hn(t,e.humidity_entity),o=ta(t,this.plan,e),a=this.plan.items.find(c=>c.room_id===e.id&&t.states[c.entity_id]?.attributes.unit_of_measurement==="ppm")?.entity_id,l=Ir(t,this.plan,e,s,r),h=this.plan.items.filter(c=>c.room_id===e.id&&c.entity_id!==a),u=this.plan.openings.filter(c=>c.entity_id&&c.room_ids.includes(e.id)),p=(c,d,f)=>c?.available&&c.value!==null?`${Se(c.value,d)}${f}`:"–";return q`<section aria-label=${e.name||n.unnamed}>
      <header>
        <div>
          <h2>${e.name||n.unnamed}</h2>
          <span class="area">${Se(Kn(e.points),1)} m²</span>
        </div>
        <button class="close" title=${n.close} aria-label=${n.close} @click=${()=>this.dispatchEvent(new CustomEvent("close"))}>${$t.close}</button>
      </header>
      ${s||r||o?q`<div class="readings">
            ${s?q`<button class="big" @click=${()=>this._moreInfo(e.temp_entity)}>${p(s,1,"°")}</button>`:rt}
            ${r?.available?q`<button @click=${()=>this._moreInfo(e.humidity_entity)}>${p(r,0," %")}</button>`:rt}
            ${o?.available?q`<button @click=${()=>this._moreInfo(a)}>${p(o,0," ppm")}</button>`:rt}
          </div>`:rt}
      ${l.length?q`<ul class="flags">
            ${l.map(c=>q`<li class=${c.level}><span class="icon">${sa(ji[c.icon])}</span>${c.text}</li>`)}
          </ul>`:rt}
      ${h.length||u.length?q`<ul class="devices">
            ${u.map(c=>{let d=t.states[c.entity_id],f=d?.state==="on";return q`<li>
                <button class=${f?"on":""} @click=${()=>this._moreInfo(c.entity_id)}>
                  <span class="icon">${sa(ji[c.type==="door"?"door":"window"])}</span>
                  <span class="name">${d?.attributes.friendly_name??n.openings[c.type]}</span>
                  <span class="state">${cg(t,d)}</span>
                </button>
              </li>`})}
            ${h.map(c=>{let d=t.states[c.entity_id],f=nn(c,d?.attributes.device_class),_=f==="radiator"?d?.attributes.hvac_action==="heating":tS.includes(d?.state??""),g=f==="light"&&_?Ur(d):void 0,m=f==="tv"?eh(kr(d)):"";return q`<li>
                <button class="${_?"on":""} ${f}" style=${g?`--lamp: rgb(${g.join(",")})`:""} @click=${()=>this._moreInfo(c.entity_id)}>
                  <svg class="glyph" viewBox="-8 -8 16 16" aria-hidden="true">${Y`${Ci[f]}`}</svg>
                  <span class="name">${c.label||d?.attributes.friendly_name||c.entity_id}</span>
                  <span class="state">${m||cg(t,d)}</span>
                </button>
              </li>`})}
          </ul>`:q`<p class="empty">${n.roomNoDevices}</p>`}
      ${this.isolated?q`<button class="all" @click=${()=>this.dispatchEvent(new CustomEvent("show-all"))}>${$t.fit} ${n.showAll}</button>`:rt}
    </section>`}};la.properties={hass:{attribute:!1},plan:{attribute:!1},room:{attribute:!1},isolated:{type:Boolean}},la.styles=De`
    :host {
      display: block;
      width: 300px;
      max-width: 100%;
      font-family: var(--fp-font);
      color: var(--fp-fg);
    }
    section {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-height: var(--fp-info-max-height, 60vh);
      overflow-y: auto;
      padding: 12px 12px 12px 14px;
      box-sizing: border-box;
      background: var(--fp-surface);
      border: 1px solid var(--fp-line);
      border-radius: 14px;
      box-shadow: 0 12px 32px rgb(0 0 0 / 35%);
    }
    header {
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }
    header > div {
      flex: 1;
      min-width: 0;
    }
    h2 {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .area {
      font-size: 12.5px;
      color: var(--fp-dim);
    }
    button {
      font: inherit;
      color: inherit;
      background: none;
      border: none;
      cursor: pointer;
    }
    button:focus-visible {
      outline: 2px solid var(--fp-accent);
      outline-offset: 2px;
    }
    .close {
      flex: none;
      display: grid;
      place-items: center;
      width: 30px;
      height: 30px;
      margin: -4px -4px 0 0;
      border-radius: 8px;
      color: var(--fp-dim);
    }
    .close:hover {
      color: var(--fp-fg);
      background: var(--fp-surface-2);
    }
    .close svg {
      width: 18px;
      height: 18px;
    }
    .readings {
      display: flex;
      align-items: baseline;
      gap: 14px;
      font-variant-numeric: tabular-nums;
    }
    .readings button {
      padding: 0;
      font-size: 15px;
      color: var(--fp-dim);
    }
    .readings button.big {
      font-size: 28px;
      font-weight: 300;
      color: var(--fp-fg);
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .flags {
      display: grid;
      gap: 4px;
      font-size: 13px;
    }
    .flags li {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .flags li.warn {
      color: var(--fp-lamp);
    }
    .flags li.alert {
      color: var(--fp-alert);
    }
    .icon {
      flex: none;
      display: grid;
      place-items: center;
      width: 18px;
      height: 18px;
    }
    .icon svg {
      width: 16px;
      height: 16px;
    }
    .devices {
      display: grid;
      gap: 2px;
      border-top: 1px solid var(--fp-line);
      padding-top: 8px;
    }
    .devices button {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 9px;
      padding: 6px 4px;
      border-radius: 8px;
      text-align: left;
      font-size: 13.5px;
    }
    .devices button:hover {
      background: var(--fp-surface-2);
    }
    .devices .name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .devices .state {
      flex: none;
      max-width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--fp-dim);
      font-variant-numeric: tabular-nums;
    }
    .devices .on .state {
      color: var(--fp-fg);
    }
    .glyph {
      flex: none;
      width: 18px;
      height: 18px;
      fill: none;
      stroke: var(--fp-dim);
      stroke-width: 1.4;
    }
    .glyph .fill {
      fill: var(--fp-dim);
      stroke: none;
    }
    .on .glyph {
      stroke: var(--fp-frost);
    }
    .on.light .glyph .fill {
      fill: var(--lamp, var(--fp-lamp));
    }
    .on.radiator .glyph {
      stroke: var(--fp-accent);
    }
    .devices .icon {
      color: var(--fp-dim);
    }
    .devices .on .icon {
      color: var(--fp-frost);
    }
    .empty {
      margin: 0;
      font-size: 13px;
      color: var(--fp-dim);
    }
    .all {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 8px;
      border-radius: 10px;
      background: var(--fp-surface-2);
      border: 1px solid var(--fp-line);
      font-size: 13px;
    }
    .all svg {
      width: 16px;
      height: 16px;
      color: var(--fp-accent);
    }
  `;customElements.get("fp-room-info")||customElements.define("fp-room-info",la);var eS=1.5,nS=320,iS=24,sS=1e3/30,rS=1e3/12,oS=18,hg="floorplan-3d.colorMode";function aS(){try{let i=localStorage.getItem(hg);return i&&Yc.includes(i)?i:void 0}catch{return}}var lS=()=>jc("animations",!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches),Fr=(i,t=1)=>Se(i,t);function cS(){try{return!!document.createElement("canvas").getContext("webgl2")}catch{return!1}}var ca=class extends Pe{constructor(){super();this._scene=new gs;this._camera=new He(40,1,.1,400);this._cut=Bm();this._occlusionRay=new gr;this._visibilityDirty=!0;this._rooms=new Map;this._last=0;this._renderCost=0;this._labelsDirty=!0;this._tapItem=e=>{let n=tg(e),s=this.plan.items.find(o=>o.entity_id===e),r=s&&nn(s,this.hass?.states[e]?.attributes.device_class);this._tapToggle&&n&&r==="light"&&this.hass?this.hass.callService(n,"toggle",{entity_id:e}):this._moreInfo(e)};this._showAll=()=>{this._isolate(void 0),this._fit(this._preset)};this._requestRender=()=>{this._labelsDirty=!0,this._requestFrame()};this._renderFrame=e=>{if(this._frame=void 0,!this._renderer)return;let n=Math.min(.1,this._last?(e-this._last)/1e3:.016);this._last=e;let s=!1,r=this._tween;if(r){let u=Math.min(1,(e-r.start)/r.duration),p=u<.5?2*u*u:1-(-2*u+2)**2/2;this._camera.position.lerpVectors(r.fromPos,r.toPos,p),this._controls.target.lerpVectors(r.fromTarget,r.toTarget,p),u>=1?this._tween=void 0:s=!0}for(let u of this._objects?.objects??[])u.step(n)&&(s=!0);s&&(this._labelsDirty=!0);let o=!1,a=e/1e3;for(let u of this._objects?.objects??[])u.animate?.(a,n,this._animations)&&(o=!0);let l=1-Math.exp(-n/.25);for(let u of this._rooms.values()){let p=Math.abs(u.color[0]-u.target[0])+Math.abs(u.color[1]-u.target[1])+Math.abs(u.color[2]-u.target[2]);p<.002?p>0&&(u.color=u.target):(u.color=Tn(u.color,u.target,l),s=!0),this._built?.floors.get(u.room.id)?.material.color.setRGB(...u.color,Ae)}this._controls?.update(),this._applyCut();let h=performance.now();this._renderer.render(this._scene,this._camera),(this._labelsDirty||s)&&(this._updateOcclusion(),this._labels?.render(this._scene,this._camera),this._labelsDirty=!1),this._renderCost=this._renderCost*.9+(performance.now()-h)*.1,s?this._requestRender():o?this._scheduleAmbient(e):this._last=0};this._preset="oblique",this._lowWalls=!1,this._legend=!1,this._fallback=!1,this._hint=!0,this._animations=lS(),this._autoCut=jc("autoCut",!0),this._tapToggle=jc("tapToggle",!1),this.forceMap=!1,this.hideControls=!1,this._colorMode=aS()}firstUpdated(){let e=this.renderRoot.querySelector(".viewport");if(this.forceMap||!cS()){this._fallback=!0;return}try{this._renderer=new Tr({antialias:!0,alpha:!0,powerPreference:"low-power"})}catch{this._fallback=!0;return}let n=this._renderer;n.setPixelRatio(Math.min(window.devicePixelRatio||1,eS)),n.outputColorSpace=Ae,e.appendChild(n.domElement),this._labels=new Hc,this._labels.domElement.className="labels",e.appendChild(this._labels.domElement),n.setClearColor(0,0),this._scene.add(new ys(15922687,3159615,2.2));let s=new bs(16777215,1.6);s.position.set(-6,14,9),this._scene.add(s);let r=new zc(this._camera,this._labels.domElement);r.enableDamping=!0,r.dampingFactor=.12,r.maxPolarAngle=Math.PI*.47,r.minDistance=2,r.maxDistance=80,r.screenSpacePanning=!0,r.addEventListener("change",this._requestRender),r.addEventListener("start",()=>this._tween=void 0),this._controls=r;let o=this._labels.domElement;o.addEventListener("pointerdown",a=>this._down=[a.clientX,a.clientY,a.timeStamp]),o.addEventListener("pointerup",a=>{let l=this._down;if(this._down=void 0,!l||Math.hypot(a.clientX-l[0],a.clientY-l[1])>=6)return;let h=this._lastTap;if(h&&a.timeStamp-h.time<nS&&Math.hypot(a.clientX-h.x,a.clientY-h.y)<iS){this._lastTap=void 0,this._focusAt(a.clientX,a.clientY);return}this._lastTap={x:a.clientX,y:a.clientY,time:a.timeStamp},!this._pick(a.clientX,a.clientY,a.timeStamp-l[2]>=Qc)&&this._tapRoom(a.clientX,a.clientY)}),this._resize=new ResizeObserver(()=>this._onResize()),this._resize.observe(e),this._onResize(),this._rebuild(),this._fit(this._preset,!1)}updated(e){if(this.toggleAttribute("info-open",!!(this._isolated??this._focused)),!this._renderer)return;let n=e.get("plan");if(e.has("plan")&&n!==void 0){this._rebuild();let s=new Set(n.rooms.map(r=>r.id));this.plan.rooms.some(r=>s.has(r.id))||(this._isolate(void 0),this._fit(this._preset,!1))}(e.has("plan")||e.has("hass")&&this._relevantChanged(e.get("hass")))&&this._applyStates(),e.has("_lowWalls")&&this._applyWallHeight(),(e.has("_animations")||e.has("_autoCut"))&&this._requestRender(),e.has("_colorMode")&&this._applyStates()}disconnectedCallback(){super.disconnectedCallback(),this._frame&&cancelAnimationFrame(this._frame),this._frame=void 0,window.clearTimeout(this._ambientTimer),this._ambientTimer=void 0,this._resize?.disconnect(),this._controls?.dispose(),this._clearPlan(),this._renderer?.dispose(),this._renderer?.forceContextLoss(),this._renderer?.domElement.remove(),this._labels?.domElement.remove(),this._renderer=void 0}_clearPlan(){this._built&&(this._scene.remove(this._built.group),this._built.dispose(),this._built=void 0),this._objects&&(this._scene.remove(this._objects.group),this._objects.dispose(),this._objects=void 0);for(let e of this._rooms.values())e.label.removeFromParent();this._rooms.clear()}_rebuild(){let e=new Map([...this._rooms].map(([r,o])=>[r,o.color]));if(this._clearPlan(),!this.plan)return;let n=Wm(this.plan,this._cut,this._keepPoints());this._cut.uStrength.value=-1,this._isolated&&!this.plan.rooms.some(r=>r.id===this._isolated)&&(this._isolated=void 0);let s=this.plan.rooms.find(r=>r.id===this._isolated);fd(this._cut,s?.points,this.plan.settings.wall_thickness/2+.02),this._visibilityDirty=!0,this._built=n,this._scene.add(n.group),this._objects=lg(this.plan,this.hass,this._requestRender),this._scene.add(this._objects.group);for(let r of this.plan.rooms){let o=document.createElement("div");o.className="room-label";let a=document.createElement("span");a.className="name",a.textContent=r.name||ct().unnamed;let l=document.createElement("span");l.className="temp";let h=document.createElement("span");h.className="hum";let u=document.createElement("span");u.className="icons",o.append(a,l,h,u),o.addEventListener("pointerdown",_=>{(r.temp_entity??r.humidity_entity)&&_.stopPropagation()}),o.addEventListener("click",()=>this._moreInfo(r.temp_entity??r.humidity_entity));let p=new $c(o),[c,d]=os(r.points);p.position.set(c,.15,d),n.group.add(p);let f=e.get(r.id)??In.none;this._rooms.set(r.id,{room:r,label:p,el:{root:o,temp:l,hum:h,icons:u},color:f,target:f,flags:""}),n.floors.get(r.id)?.material.color.setRGB(...f,Ae)}this._applyWallHeight(),this._applyStates(),this._requestRender()}_applyStates(){let e=this.hass;if(!e||!this.plan)return;let n=this._mode,s=!1;for(let r of this._rooms.values()){let o=hn(e,r.room.temp_entity),a=hn(e,r.room.humidity_entity),l=qc(n,e,this.plan,r.room);l.some((d,f)=>Math.abs(d-r.target[f])>.001)&&(r.target=l,s=!0);let h=o?o.available&&o.value!==null?`${Fr(o.value)}°`:"–":"",u=a?.available&&a.value!==null?`${Fr(a.value,0)} %`:"";r.el.temp.textContent!==h&&(r.el.temp.textContent=h),r.el.hum.textContent!==u&&(r.el.hum.textContent=u),r.el.root.classList.toggle("clickable",!!(r.room.temp_entity??r.room.humidity_entity)),r.el.root.classList.toggle("unavailable",!!o&&!o.available);let p=Ir(e,this.plan,r.room,o,a),c=p.map(d=>`${d.icon}:${d.level}`).join(",");c!==r.flags&&(r.flags=c,this._renderIcons(r.el.icons,p),r.el.root.classList.toggle("alert",p.some(d=>d.level==="alert")))}for(let r of this._objects?.objects??[])r.update(e);(s||this._objects)&&this._requestRender()}_applyWallHeight(){let e=this._lowWalls?.36:1;this._built?.walls&&(this._built.walls.scale.y=e),this._objects&&(this._objects.openings.scale.y=e),this._requestRender()}_relevantChanged(e){if(!e||!this.hass||!this.plan)return!0;let n=new Set;for(let s of this.plan.rooms)s.temp_entity&&n.add(s.temp_entity),s.humidity_entity&&n.add(s.humidity_entity);for(let s of this.plan.openings)s.entity_id&&n.add(s.entity_id);for(let s of this.plan.items)n.add(s.entity_id);for(let s of n)if(e.states[s]!==this.hass.states[s])return!0;return!1}_renderIcons(e,n){e.replaceChildren(...n.map(s=>{let r=document.createElement("span");return r.className=`icon ${s.level}`,r.title=s.text,r.innerHTML=ji[s.icon],r}))}_ray(e,n){let s=this._renderer.domElement.getBoundingClientRect(),r=new at((e-s.left)/s.width*2-1,-((n-s.top)/s.height)*2+1),o=new gr;return o.setFromCamera(r,this._camera),o}_pick(e,n,s=!1){if(!this._objects||!this._renderer)return!1;let o=this._ray(e,n).intersectObjects(this._objects.pickables,!0)[0]?.object.userData.entityId;return o?(s?this._moreInfo(o):this._tapItem(o),!0):!1}_roomAt(e,n){if(!this._built||!this._renderer)return;let s=[...this._built.floors.values()].filter(o=>o.visible),r=this._ray(e,n).intersectObjects(s,!1)[0];return this.plan.rooms.find(o=>o.id===r?.object.userData.roomId)}_tapRoom(e,n){let s=this.plan?.settings.room_tap??"focus";if(s==="none")return;let r=this._roomAt(e,n);if(!r){(this._isolated||this._focused)&&this._showAll();return}s==="isolate"&&this._isolate(r.id),this._focusRoom(r)}_moreInfo(e){e&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}_focusAt(e,n){let s=this._roomAt(e,n);s?this._focusRoom(s):this._showAll()}_isolate(e){if(this._isolated===e)return;this._isolated=e;let n=this.plan?.rooms.find(s=>s.id===e);fd(this._cut,n?.points,(this.plan?.settings.wall_thickness??.12)/2+.02),this._visibilityDirty=!0,this._requestRender()}_focusRoom(e){this._focused=e.id;let n=e.points.map(m=>m[0]),s=e.points.map(m=>m[1]),r=Math.max(...n)-Math.min(...n),o=Math.max(...s)-Math.min(...s),[a,l]=os(e.points),h=new L(a,0,l),u=this._camera.position,p=u.x-this._controls.target.x,c=u.z-this._controls.target.z,d=Math.hypot(p,c);d<.05?[p,c]=[.18,.78]:[p,c]=[p/d*.8,c/d*.8];let f=this._camera.fov*Math.PI/180,_=Math.max(r/(this._camera.aspect||1),o)*.5+.8,g=Math.max(this._controls.minDistance,_/Math.tan(f/2)*1.25);this._camera.up.set(0,1,0),this._tween={start:performance.now(),duration:650,fromPos:u.clone(),toPos:h.clone().add(new L(p,1,c).normalize().multiplyScalar(g)),fromTarget:this._controls.target.clone(),toTarget:h},this._requestRender()}_fit(e,n=!0){this._preset=e,this._focused=void 0;let s=this._built?.box;if(!s||s.isEmpty())return;let r=s.getCenter(new L);r.y=0;let o=s.getSize(new L),a=this._camera.aspect||1,l=this._camera.fov*Math.PI/180,h=a<.9&&o.x>o.z,u=h?o.z:o.x,p=h?o.x:o.z,d=(Math.max(u/a,p)*.5+.6)/Math.tan(l/2)*(e==="top"?1.04:1.32)+(e==="top"?o.y:0),f;e==="top"?f=h?new L(.001,1,0):new L(0,1,.001):f=h?new L(.78,1,-.18):new L(.18,1,.78),e==="top"&&h?this._camera.up.set(-1,0,0):this._camera.up.set(0,1,0);let _=r.clone().add(f.normalize().multiplyScalar(d));if(!n){this._camera.position.copy(_),this._controls.target.copy(r),this._controls.update(),this._requestRender();return}this._tween={start:performance.now(),duration:650,fromPos:this._camera.position.clone(),toPos:_,fromTarget:this._controls.target.clone(),toTarget:r},this._requestRender()}_onResize(){let e=this.renderRoot.querySelector(".viewport"),n=e.clientWidth,s=e.clientHeight;!n||!s||!this._renderer||(this._renderer.setSize(n,s),this._labels?.setSize(n,s),this._camera.aspect=n/s,this._camera.updateProjectionMatrix(),this._requestRender())}_requestFrame(){this._frame===void 0&&this._renderer&&(this._frame=requestAnimationFrame(this._renderFrame))}_updateOcclusion(){let e=this._built?.walls;if(!e||!this.plan)return;let n=e.geometry,s=n.getAttribute("aWall"),r=n.getAttribute("aKeep"),o=this.plan.settings.wall_height*e.scale.y,a=this.plan.rooms.find(c=>c.id===this._isolated)?.points,l=this.plan.settings.wall_thickness/2+.02,h=(c,d)=>!a||Ke([c,d],a)||a.some((f,_)=>Ln([c,d],f,a[(_+1)%a.length]).dist<l),u=this._camera.position,p=this._occlusionRay;for(let c of this._rooms.values()){if(!c.label.visible)continue;let f=c.label.position.clone().sub(u),_=f.length();p.set(u,f.normalize()),p.far=Math.max(0,_-.25);let g=p.intersectObject(e,!1).some(m=>{let T=m.face?.a??0,v=r.getX(T)>.5?1:Gc(this._cut,[s.getX(T),s.getY(T)],[s.getZ(T),s.getW(T)]);return m.point.y<=o*v+.01&&h(m.point.x,m.point.z)});c.el.root.classList.toggle("occluded",g)}}_keepPoints(){let e=[];for(let n of this.plan.items){if(n.rotation||!xa(n,nn(n,this.hass?.states[n.entity_id]?.attributes.device_class)))continue;let s=ls(this.plan.rooms,n.pos);s&&s.dist<=as&&e.push(s.foot)}return e}_onKeptWall(e){return(this._built?.kept??[]).some(([n,s])=>Ln(e,n,s).dist<.1)}get _mode(){let e=this._colorMode??this.plan?.settings.color_mode??"temperature";return Yc.includes(e)?e:"temperature"}_setColorMode(e){this._colorMode=e;try{localStorage.setItem(hg,e)}catch{}}_applyCut(){if(!this._controls||!zm(this._cut,this._camera,this._controls.target,this._autoCut&&!this._lowWalls)&&!this._visibilityDirty)return;this._visibilityDirty=!1;for(let r of this._objects?.cutaway??[])r.root.scale.y=this._onKeptWall(r.center)?1:Gc(this._cut,r.center,r.normal);let n=this.plan?.rooms.find(r=>r.id===this._isolated),s=(r,o)=>{if(!n||!o&&Ke(r,n.points))return!0;let a=n.points,l=o?.15:.3;return a.some((h,u)=>Ln(r,h,a[(u+1)%a.length]).dist<l)};for(let r of this._objects?.placed??[]){let o=!r.mount||this._onKeptWall(r.mount.center)||Gc(this._cut,r.mount.center,r.mount.normal)>.75;r.root.visible=o&&s(r.at,r.edge)}for(let r of this._rooms.values()){let o=!n||r.room.id===n.id;r.label.visible=o;let a=this._built?.floors.get(r.room.id);a&&(a.visible=o)}this._labelsDirty=!0}_scheduleAmbient(e){if(this._ambientTimer!==void 0)return;let n=this._renderCost>oS?rS:sS,s=Math.max(0,n-(performance.now()-e));this._ambientTimer=window.setTimeout(()=>{this._ambientTimer=void 0,this._requestFrame()},s)}_toggleAnimations(){this._animations=!this._animations,Jc("animations",this._animations)}_toggleAutoCut(){this._autoCut=!this._autoCut,Jc("autoCut",this._autoCut)}render(){let e=this.plan?.settings.temp_scale,n=this.plan&&!this.plan.rooms.length,s=ct();return q`
      <div class="viewport">
        ${this._fallback&&this.plan?q`<fp-live-map
              .hass=${this.hass}
              .plan=${this.plan}
              .animations=${this._animations}
              .colorMode=${this._mode}
              .selected=${this._focused}
              .tapItem=${this._tapItem}
              @room-tap=${r=>this._focused=r.detail.id??void 0}
            ></fp-live-map>`:rt}
      </div>
      ${n?q`<div class="message">${s.emptyPlan}</div>`:rt}
      <div class="top-left">
        <slot name="floors"></slot>
        ${this._renderRoomInfo()}
      </div>
      ${this._fallback&&this._hint&&!n&&!this.forceMap?q`<div class="hint" role="status">
            <span>${s.noWebgl}</span>
            <button aria-label=${s.dismiss} @click=${()=>this._hint=!1}>${$t.close}</button>
          </div>`:rt}
      ${this.hideControls?rt:this._fallback?q`<nav class="controls" aria-label=${s.viewControls}>${this._animationsButton()}</nav>`:q`<nav class="controls" aria-label=${s.viewControls}>
            <button class=${this._preset==="oblique"?"active":""} @click=${()=>this._fit("oblique")}>
              ${$t.cube}<span>${s.angled}</span>
            </button>
            <button class=${this._preset==="top"?"active":""} @click=${()=>this._fit("top")}>
              ${$t.plan}<span>${s.top}</span>
            </button>
            <span class="sep"></span>
            <button
              class=${this._lowWalls?"active":""}
              aria-pressed=${this._lowWalls}
              title=${s.lowWallsTitle}
              @click=${()=>this._lowWalls=!this._lowWalls}
            >
              ${$t.walls}<span>${s.lowWalls}</span>
            </button>
            <button
              class=${this._autoCut?"active":""}
              aria-pressed=${this._autoCut}
              title=${s.autoWallsTitle}
              @click=${this._toggleAutoCut}
            >
              ${$t.cutaway}<span>${s.autoWalls}</span>
            </button>
            ${this._animationsButton()}
          </nav>`}
      ${e?q`<button class="legend" aria-expanded=${this._legend} @click=${()=>this._legend=!this._legend}>
            ${this._mode==="temperature"?q`<span>${Fr(e.cold,0)}°</span><i style="background: ${yd.temperature}"></i><span>${Fr(e.hot,0)}°</span>`:q`<span>${s.colorModes[this._mode]}</span><i style="background: ${yd[this._mode]}"></i>`}
            <span class="more">${this._legend?s.close:s.legendOpen}</span>
          </button>`:rt}
      ${e&&this._legend?this._renderLegend():rt}
    `}_renderRoomInfo(){let e=this.plan?.rooms.find(n=>n.id===(this._isolated??this._focused));return e?q`<fp-room-info
      .hass=${this.hass}
      .plan=${this.plan}
      .room=${e}
      .isolated=${!!this._isolated}
      @close=${this._showAll}
      @show-all=${this._showAll}
    ></fp-room-info>`:rt}_animationsButton(){let e=ct();return q`<button
      class=${this._animations?"active":""}
      aria-pressed=${this._animations}
      title=${e.animationsTitle}
      @click=${this._toggleAnimations}
    >
      ${$t.sparkle}<span>${e.animations}</span>
    </button>`}_renderLegend(){let e=this.plan.settings.temp_scale,n=ai(this.plan),s=l=>`background: rgb(${l.map(h=>Math.round(h*255)).join(",")})`,r=ct(),o=Zm(this._mode,this.plan).map(l=>[s(l.color),l.name,l.text]),a=[["snow","",r.symCold(Fr(e.ok_low))],["hot","warn",r.symHot(Fr(e.ok_high))],["drop","",r.symHumid(n.humidity,n.humidity_alert)],["wind","warn",r.symCo2(n.co2,n.co2_alert)],["flame","warn",r.symHeating],["window","",r.symWindow],["door","alert",r.symDoor]];return q`<aside class="legend-card" aria-label=${r.legend}>
      <h3>${r.legendColors}</h3>
      <div class="modes" role="radiogroup" aria-label=${r.legendColors}>
        ${Yc.map(l=>q`<button role="radio" aria-checked=${l===this._mode} class=${l===this._mode?"active":""} @click=${()=>this._setColorMode(l)}>
            ${r.colorModes[l]}
          </button>`)}
      </div>
      <ul>
        ${o.map(([l,h,u])=>q`<li><i style=${l}></i><b>${h}</b><span>${u}</span></li>`)}
      </ul>
      <h3>${r.legendSymbols}</h3>
      <ul>
        ${a.map(([l,h,u])=>q`<li><span class="icon ${h}" .innerHTML=${ji[l]}></span><span>${u}</span></li>`)}
      </ul>
      <h3>${r.legendDevices}</h3>
      <p>${r.legendDevicesText}</p>
      <h3>${r.thisDevice}</h3>
      <label class="check">
        <input
          type="checkbox"
          .checked=${this._tapToggle}
          @change=${l=>{this._tapToggle=l.target.checked,Jc("tapToggle",this._tapToggle)}}
        />
        <span>${r.tapToggle}</span>
      </label>
    </aside>`}};ca.properties={hass:{attribute:!1},plan:{attribute:!1},forceMap:{type:Boolean},hideControls:{type:Boolean},_preset:{state:!0},_lowWalls:{state:!0},_legend:{state:!0},_fallback:{state:!0},_hint:{state:!0},_animations:{state:!0},_isolated:{state:!0},_focused:{state:!0},_colorMode:{state:!0},_autoCut:{state:!0},_tapToggle:{state:!0}},ca.styles=[Kc,De`
    :host {
      position: relative;
      display: block;
      overflow: hidden;
      background: var(--fp-canvas);
    }
    .viewport {
      position: absolute;
      inset: 0;
      /* CSS2D labels set their own z-index; keep them below legend, chip and controls */
      isolation: isolate;
    }
    .viewport canvas {
      display: block;
    }
    .labels {
      position: absolute;
      inset: 0;
      touch-action: none;
    }
    .controls {
      position: absolute;
      left: 50%;
      bottom: 16px;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 2px;
      padding: 5px;
      background: var(--fp-surface);
      border: 1px solid var(--fp-line);
      border-radius: 14px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
    }
    .controls button {
      font: inherit;
      font-size: 13.5px;
      color: var(--fp-dim);
      background: none;
      border: none;
      border-radius: 10px;
      height: 38px;
      padding: 0 12px;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      cursor: pointer;
      white-space: nowrap;
    }
    .controls button:hover {
      color: var(--fp-fg);
      background: var(--fp-surface-2);
    }
    .controls button.active {
      color: var(--fp-fg);
      background: var(--fp-surface-2);
    }
    .controls button:focus-visible {
      outline: 2px solid var(--fp-accent);
      outline-offset: 2px;
    }
    .controls .sep {
      width: 1px;
      height: 22px;
      background: var(--fp-line);
      margin: 0 4px;
    }

    .top-left {
      position: absolute;
      left: 16px;
      top: 16px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      max-width: calc(100% - 32px);
    }
    fp-room-info {
      --fp-info-max-height: calc(100vh - 220px);
    }
    .legend {
      position: absolute;
      right: 16px;
      top: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 10px;
      font: inherit;
      font-size: 12px;
      cursor: pointer;
      color: var(--fp-dim);
      background: color-mix(in srgb, var(--fp-surface) 80%, transparent);
      border: 1px solid var(--fp-line);
      border-radius: 10px;
      font-variant-numeric: tabular-nums;
    }
    .legend .more {
      color: var(--fp-fg);
      margin-left: 4px;
    }
    .legend-card {
      position: absolute;
      right: 16px;
      top: 58px;
      width: min(340px, calc(100% - 32px));
      max-height: calc(100% - 140px);
      overflow-y: auto;
      box-sizing: border-box;
      padding: 14px 16px 4px;
      background: var(--fp-surface);
      border: 1px solid var(--fp-line);
      border-radius: 14px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
      font-size: 13px;
      color: var(--fp-fg);
    }
    .legend-card h3 {
      margin: 0 0 8px;
      font-size: 12.5px;
      font-weight: 500;
      color: var(--fp-dim);
    }
    .legend-card ul {
      list-style: none;
      margin: 0 0 14px;
      padding: 0;
      display: grid;
      gap: 7px;
    }
    .legend-card li {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      line-height: 1.35;
    }
    .legend-card li > i {
      flex: none;
      width: 14px;
      height: 14px;
      border-radius: 4px;
      margin-top: 2px;
    }
    .legend-card li b {
      font-weight: 500;
      white-space: nowrap;
    }
    .legend-card li > span:last-child {
      color: var(--fp-dim);
    }
    .legend-card li .icon {
      flex: none;
    }
    .legend-card p {
      margin: 0 0 12px;
      color: var(--fp-dim);
      line-height: 1.45;
    }
    .legend-card .check {
      display: flex;
      align-items: flex-start;
      gap: 9px;
      margin: 0 0 12px;
      line-height: 1.4;
      color: var(--fp-dim);
      cursor: pointer;
    }
    .legend-card .check input {
      flex: none;
      width: 16px;
      height: 16px;
      margin: 1px 0 0;
      accent-color: var(--fp-accent);
    }
    .legend-card .modes {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin: 0 0 10px;
    }
    .legend-card .modes button {
      padding: 5px 10px;
      font: inherit;
      font-size: 12px;
      color: var(--fp-dim);
      background: transparent;
      border: 1px solid var(--fp-line);
      border-radius: 999px;
      cursor: pointer;
    }
    .legend-card .modes button.active {
      color: var(--fp-fg);
      border-color: var(--fp-accent);
      background: color-mix(in srgb, var(--fp-accent) 18%, transparent);
    }
    .legend i {
      width: 96px;
      height: 6px;
      border-radius: 3px;
      background: linear-gradient(90deg, #3f9fd8, #63c6e8 20%, #52c98d 40%, #52c98d 60%, #e9c45c 72%, #ff9a4d 86%, #ef6363);
    }

    .message {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      padding: 24px;
      text-align: center;
      color: var(--fp-dim);
      pointer-events: none;
    }

    .hint {
      position: absolute;
      left: 16px;
      bottom: 16px;
      max-width: min(420px, calc(100% - 32px));
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 8px 8px 14px;
      font-size: 13px;
      line-height: 1.4;
      color: var(--fp-dim);
      background: var(--fp-surface);
      border: 1px solid var(--fp-line);
      border-radius: 12px;
    }
    .hint button {
      flex: none;
      display: grid;
      place-items: center;
      width: 30px;
      height: 30px;
      border: none;
      border-radius: 8px;
      background: none;
      color: var(--fp-dim);
      cursor: pointer;
    }

    @media (max-width: 760px) {
      .hint {
        bottom: 72px;
      }
      .controls span:not(.sep) {
        display: none;
      }
      .controls button {
        padding: 0 11px;
      }
      .legend {
        right: 10px;
        top: 10px;
      }
      .top-left {
        left: 10px;
        top: 10px;
        right: 10px;
        max-width: none;
      }
      fp-room-info {
        width: 100%;
        --fp-info-max-height: 46vh;
      }
      :host([info-open]) .legend,
      :host([info-open]) .legend-card {
        display: none;
      }
    }
  `];customElements.get("fp-scene")||customElements.define("fp-scene",ca);var ha=class extends Pe{constructor(){super(...arguments);this._revision=-1;this._loading=!1}disconnectedCallback(){super.disconnectedCallback(),this._unsub?.then(e=>e()).catch(()=>{}),this._unsub=void 0}willUpdate(e){e.has("hass")&&zs(this.hass),this.hass&&!this._unsub&&this.isConnected&&(this._unsub=_a(this.hass,n=>{n!==this._revision&&this._load()}),this._unsub.catch(n=>{this._error=rs(n),this._load()}))}async _load(){if(!(!this.hass||this._loading)){this._loading=!0;try{let e=await ss(this.hass);this._revision=e.revision,this._plan={settings:e.settings,floors:e.floors,rooms:e.rooms,openings:e.openings,items:e.items,furniture:e.furniture},this._error=void 0}catch(e){this._error=ct().loadFailed(rs(e))}finally{this._loading=!1}}}render(){let e=Fc(this.config?.height);if(this._error&&!this._plan)return q`<div class="msg" style="height:${e}">${this._error}</div>`;if(!this._plan)return q`<div class="msg" style="height:${e}">${ct().loading}</div>`;let n=this._plan,s=Em(n,this.config?.floor),r=s??Jr(n,this._floor),o=Zn(n);return q`<fp-scene
      style="height:${e}"
      .hass=${this.hass}
      .plan=${this._view(n,r)}
      .forceMap=${this.config?.view==="2d"}
      .hideControls=${this.config?.controls===!1}
    >
      ${!s&&o.length>1?q`<div slot="floors" class="floors" role="tablist" aria-label=${ct().floors}>
            ${o.map(a=>q`<button role="tab" aria-selected=${a.id===r} class=${a.id===r?"active":""} @click=${()=>this._floor=a.id}>
                ${a.name||ct().floorName(a.level)}
              </button>`)}
          </div>`:rt}
    </fp-scene>
    ${n.rooms.length?rt:q`<div class="msg overlay">${ct().emptyPlan}</div>`}`}_view(e,n){let s=this._viewCache;if(s&&s.plan===e&&s.floor===n)return s.view;let r=ba(e,n);return this._viewCache={plan:e,floor:n,view:r},r}};ha.properties={hass:{attribute:!1},config:{attribute:!1},_plan:{state:!0},_error:{state:!0},_floor:{state:!0}},ha.styles=[Oc,De`
    :host {
      display: block;
      position: relative;
      color: var(--fp-fg);
      font-family: var(--fp-font);
      --fp-bg: var(--ha-card-background, var(--card-background-color, #151a21));
    }
    fp-scene {
      display: block;
      border-radius: inherit;
    }
    .msg {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      box-sizing: border-box;
      color: var(--secondary-text-color);
      text-align: center;
    }
    .floors {
      display: inline-flex;
      max-width: 100%;
      overflow-x: auto;
      padding: 3px;
      background: var(--fp-surface);
      border: 1px solid var(--fp-line);
      border-radius: 12px;
      box-shadow: 0 6px 20px rgb(0 0 0 / 25%);
    }
    .floors button {
      flex: none;
      font: inherit;
      font-size: 13px;
      color: var(--fp-dim);
      background: none;
      border: none;
      border-radius: 9px;
      height: 30px;
      padding: 0 11px;
      cursor: pointer;
      white-space: nowrap;
    }
    .floors button.active {
      color: var(--fp-fg);
      background: var(--fp-surface-2);
    }
    .floors button:focus-visible {
      outline: 2px solid var(--fp-accent);
      outline-offset: 2px;
    }
    .overlay {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
  `];customElements.get("floorplan-3d-card-view")||customElements.define("floorplan-3d-card-view",ha);var hS=100,ug="floorplan-3d.floor";function uS(){try{return localStorage.getItem(ug)}catch{return null}}function dS(i){return new Promise(t=>{let e=new Image;e.onload=()=>t(e.naturalWidth&&e.naturalHeight?{w:e.naturalWidth,h:e.naturalHeight}:void 0),e.onerror=()=>t(void 0),e.src=i})}var bi,ua=class extends Pe{constructor(){super();this._revision=0;this._remoteRevision=0;this._syncFailed=!1;this._loading=!1;this._onBeforeUnload=e=>{this._dirty&&e.preventDefault()};this._onKeyDown=e=>{if(!(e.ctrlKey||e.metaKey)||this._mode!=="plan")return;let n=e.composedPath()[0];if(n instanceof HTMLInputElement||n instanceof HTMLSelectElement||n instanceof HTMLTextAreaElement)return;let s=e.key.toLowerCase();if(s==="z"&&!e.shiftKey)this._undo();else if(s==="y"||s==="z"&&e.shiftKey)this._redo();else if(s==="s")this._save();else return;e.preventDefault(),e.stopPropagation()};this._onRevision=e=>{this._remoteRevision=Math.max(this._remoteRevision,e),!(this._saving||this._loading||!this._plan||e<=this._revision)&&(this._dirty?this._conflict!=="save"&&(this._conflict="remote"):this._load(!1))};this._addFloor=()=>{if(!this._plan)return;let e=ct(),n=Zn(this._plan).map(a=>a.level),s=n.length?Math.max(...n)+1:1,{plan:r,id:o}=dp(this._plan,e.floorName(s),e.floorName(0));this._apply(r),this._setFloor(o)};this._importFloors=()=>{if(!this.hass||!this._plan)return;let e=this.hass;this._apply(mp(this._plan,wa(e),n=>e.areas?.[n]?.floor_id)),this.updateComplete.then(()=>this._editor?.fit())};this._loadDemo=async()=>{if(!this._plan)return;let e=Rh(JSON.stringify(np),this._plan.settings);e&&(this._mode="plan",this._apply(e),this._selected=null,this._notice=ct().demoLoaded,await this.updateComplete,this._editor?.fit())};this._pickBackground=()=>{this.renderRoot.querySelector("input.bg-file")?.click()};this._onBackgroundFile=async e=>{let n=e.target,s=n.files?.[0];if(n.value="",!s||!this.hass)return;let r=ct();if(s.size>Qd||!s.type.startsWith("image/")){this._error=r.imageTooLarge;return}this._error=void 0,this._notice=r.uploading;try{await this._setBackground(await tp(this.hass,s))}catch(o){this._notice=void 0,this._error=o instanceof qr?r.uploadUnavailable:r.uploadFailed(rs(o))}};this._setBackground=async e=>{if(!this._plan)return;let n=await dS(e);if(!n){this._notice=void 0,this._error=ct().imageFailed;return}let s=this._view(this._plan),r=ci(s.rooms),o=Math.min(200,Math.max(r?r.maxX-r.minX:12,4)),a=Math.min(200,Math.max(.1,o*n.h/n.w)),l={url:e,x:r?.minX??0,y:r?.minY??0,width:o,height:a,opacity:.5,visible:!0};this._mode="plan",this._applyView({...s,settings:{...s.settings,background:l}}),this._notice=void 0,await this.updateComplete,this._editor?.fitBackground(),this._editor?.calibrate()};this._startDrawing=()=>{this._mode="plan",this._tool="room"};this._startAreas=async()=>{this._mode="plan",await this.updateComplete,await this._importAreas()};this._exportPlan=()=>{if(!this._plan)return;let e=URL.createObjectURL(new Blob([Mp(this._plan)],{type:"application/json"})),n=document.createElement("a");n.href=e,n.download=`floorplan-3d-${new Date().toISOString().slice(0,10)}.json`,n.click(),setTimeout(()=>URL.revokeObjectURL(e),1e3)};this.narrow=!1,this._mode="view",this._tool="select",this._selected=null,this._saving=!1,this._conflict=!1,this._sheet=!1,this._floor=uS(),this._past=[],this._future=[],this.addEventListener("keydown",this._onKeyDown)}connectedCallback(){super.connectedCallback(),window.addEventListener("beforeunload",this._onBeforeUnload),bi&&!this._plan&&(this._plan=bi.plan,this._saved=bi.saved,this._revision=bi.revision,this._past=bi.past,this._future=bi.future)}disconnectedCallback(){window.removeEventListener("beforeunload",this._onBeforeUnload),this._unsub?.then(e=>e()).catch(()=>{}),this._unsub=void 0,this._plan&&this._saved&&(bi={plan:this._plan,saved:this._saved,revision:this._revision,past:this._past,future:this._future}),super.disconnectedCallback()}willUpdate(e){e.has("hass")&&zs(this.hass),e.has("hass")&&this.hass&&!this._plan&&!this._loading&&!this._error&&this._load(),this.hass&&!this._unsub&&!this._syncFailed&&(this._unsub=_a(this.hass,this._onRevision),this._unsub.catch(()=>{this._unsub=void 0,this._syncFailed=!0})),this._mode==="plan"&&this.hass&&!this._isAdmin&&(this._mode="view")}get _isAdmin(){return this.hass?.user?.is_admin??!1}get _dirty(){return!!this._plan&&this._plan!==this._saved}async _load(e=!0){if(this.hass){this._loading=!0,this._error=void 0;try{let n=await ss(this.hass),s={settings:n.settings,floors:n.floors,rooms:n.rooms,openings:n.openings,items:n.items,furniture:n.furniture};this._plan=s,this._saved=s,this._revision=n.revision,this._past=[],this._future=[],this._conflict=!1,bi=void 0,await this.updateComplete,e!==!1&&this._editor?.fit()}catch(n){this._error=ct().loadFailed(rs(n))}finally{this._loading=!1}this._remoteRevision>this._revision&&this._onRevision(this._remoteRevision)}}async _save(e=!1){if(!this.hass||!this._plan||this._saving||!this._dirty)return;let n=this._plan;this._saving=!0,this._error=void 0;try{let s=e?(await ss(this.hass)).revision:this._revision;this._revision=await Jd(this.hass,n,s),this._saved=n,this._conflict=!1,bi=void 0}catch(s){ep(s)==="conflict"?this._conflict="save":this._error=ct().saveFailed(rs(s))}finally{this._saving=!1}this._remoteRevision>this._revision&&this._onRevision(this._remoteRevision)}_apply(e){!this._plan||e===this._plan||(this._past=[...this._past,this._plan].slice(-hS),this._future=[],this._plan=e)}_undo(){let e=this._past.at(-1);!e||!this._plan||(this._future=[this._plan,...this._future],this._past=this._past.slice(0,-1),this._plan=e)}_redo(){let e=this._future[0];!e||!this._plan||(this._past=[...this._past,this._plan],this._future=this._future.slice(1),this._plan=e)}get _activeFloor(){return this._plan?Jr(this._plan,this._floor):null}_view(e){let n=Jr(e,this._floor),s=this._viewCache;if(s&&s.plan===e&&s.floor===n)return s.view;let r=ba(e,n);return this._viewCache={plan:e,floor:n,view:r},r}_applyView(e){this._plan&&this._apply(hp(this._plan,this._activeFloor,e))}async _setFloor(e){if(!(!e||e===this._activeFloor)){this._floor=e,this._selected=null;try{localStorage.setItem(ug,e)}catch{}await this.updateComplete,this._editor?.fit()}}_updateFloor(e,n){this._plan&&this._apply(pp(this._plan,e,n))}_removeFloor(e){this._plan&&(this._apply(fp(this._plan,e)),this._selected=null)}async _selectObject(e,n){n&&await this._setFloor(n),this._selected=e,this._sheet=!0}get _editor(){return this.renderRoot.querySelector("fp-plan-editor")}async _importPlan(e){if(!this._plan)return;let n=e===null?void 0:Rh(e,this._plan.settings);if(!n){this._error=ct().importFailed;return}this._error=void 0,this._apply(n),this._selected=null,this._notice=ct().imported(n.rooms.length),await this.updateComplete,this._editor?.fit()}async _importAreas(){if(!this.hass||!this._plan)return;let e=Sa(this.hass,this._plan,this._activeFloor);e.length&&(this._apply({...this._plan,rooms:[...this._plan.rooms,...e]}),this._selected=null,await this.updateComplete,this._editor?.fit())}render(){let e=ct();return q`<div class="root">
      <header>
        <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
        <h1>${e.title}</h1>
        ${this._isAdmin?q`<div class="modes" role="tablist" aria-label=${e.modes}>
              ${this._modeButton("view",e.modeView,$t.cube)} ${this._modeButton("plan",e.modePlan,$t.plan)}
            </div>`:rt}
        ${this._plan?this._renderFloors(this._plan):rt}
        <div class="spacer"></div>
        ${this._isAdmin&&this._mode==="plan"&&this._plan?this._renderSaveBar():rt}
      </header>
      ${this._conflict?q`<div class="banner warn" role="alert">
            <span class="text">${this._conflict==="remote"?e.remoteChanged:e.conflict}</span>
            <button @click=${()=>this._load(!1)}>${e.reload}</button>
            ${this._conflict==="remote"?q`<button @click=${()=>this._conflict=!1}>${e.keepEditing}</button>`:q`<button @click=${()=>this._save(!0)}>${e.overwrite}</button>`}
          </div>`:rt}
      ${this._notice?q`<div class="banner warn" role="status">
            <span class="text">${this._notice}</span>
            <button @click=${()=>this._notice=void 0}>${e.ok}</button>
          </div>`:rt}
      ${this._error?q`<div class="banner error" role="alert">
            ${this._error} ${this._plan?rt:q`<button @click=${this._load}>${e.retry}</button>`}
          </div>`:rt}
      ${this._renderBody()}
      <input class="bg-file" type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden @change=${this._onBackgroundFile} />
    </div>`}_renderWelcome(){let e=ct(),n=this.hass?Object.keys(this.hass.areas??{}).length:0,s=(r,o,a,l,h=!1)=>q`<button class="start ${h?"primary-start":""}" @click=${l}>
        <span class="start-icon">${r}</span>
        <span class="start-text"><b>${o}</b><span>${a}</span></span>
      </button>`;return q`<div class="welcome">
      <div class="welcome-card">
        <h2>${e.welcomeTitle}</h2>
        <p>${e.welcomeText}</p>
        <div class="starts">
          ${n?s($t.import,e.startAreas,e.startAreasText(n),this._startAreas,!0):rt}
          ${s($t.image,e.startTrace,e.startTraceText,this._pickBackground,!n)}
          ${s($t.room,e.startDraw,e.startDrawText,this._startDrawing)}
          ${s($t.home,e.startDemo,e.startDemoText,this._loadDemo)}
        </div>
      </div>
    </div>`}_renderFloors(e){let n=Zn(e);if(n.length<2)return rt;let s=this._activeFloor,r=ct(),o=q`<select class="floor-select ${n.length>4?"":"compact"}" aria-label=${r.floor} @change=${a=>this._setFloor(a.target.value)}>
      ${[...n].reverse().map(a=>q`<option value=${a.id} ?selected=${a.id===s}>${a.name||r.floorName(a.level)}</option>`)}
    </select>`;return n.length>4?o:q`<div class="floors" role="tablist" aria-label=${r.floors}>
        ${n.map(a=>q`<button role="tab" aria-selected=${a.id===s} class=${a.id===s?"active":""} title=${a.name} @click=${()=>this._setFloor(a.id)}>
            ${a.name||r.floorName(a.level)}
          </button>`)}
      </div>
      ${o}`}_renderSaveBar(){let e=ct();return q`
      <div class="history">
        <button title=${e.undoKey} aria-label=${e.undo} ?disabled=${!this._past.length} @click=${this._undo}>${$t.undo}</button>
        <button title=${e.redoKey} aria-label=${e.redo} ?disabled=${!this._future.length} @click=${this._redo}>${$t.redo}</button>
      </div>
      <span class="state ${this._dirty?"dirty":""}">${this._saving?e.saving:this._dirty?e.unsaved:e.saved}</span>
      <button class="primary" ?disabled=${!this._dirty||this._saving} @click=${()=>this._save()} title=${e.saveKey}>${e.save}</button>
    `}_modeButton(e,n,s){return q`<button
      role="tab"
      aria-selected=${this._mode===e}
      class=${this._mode===e?"active":""}
      @click=${()=>this._mode=e}
    >
      ${s}<span>${n}</span>
    </button>`}_renderBody(){let e=this._plan;if(!e)return this._error?rt:q`<div class="center muted">${ct().loading}</div>`;if(this._mode==="view"&&this._isAdmin&&!e.rooms.length)return this._renderWelcome();if(this._mode==="view")return q`<fp-scene .hass=${this.hass} .plan=${this._view(e)}></fp-scene>`;let n=this._view(e),s=n.rooms.find(r=>r.id===this._selected);return q`<div class="workspace">
      <fp-plan-editor
        .hass=${this.hass}
        .plan=${n}
        .selected=${this._selected}
        .tool=${this._tool}
        @plan-change=${r=>this._applyView(r.detail.plan)}
        @select-room=${r=>{this._selected=r.detail.id,r.detail.id&&(this._sheet=!0)}}
        @tool-change=${r=>this._tool=r.detail.tool}
        @import-areas=${this._importAreas}
        @load-demo=${this._loadDemo}
        @pick-background=${this._pickBackground}
      ></fp-plan-editor>
      <aside class=${this._sheet?"open":""}>
        <button class="sheet-handle" @click=${()=>this._sheet=!this._sheet} aria-expanded=${this._sheet}>
          <span class="grip"></span>
          <span>${this._sheetTitle(n,s)}</span>
        </button>
        <fp-inspector
          .hass=${this.hass}
          .plan=${n}
          .full=${e}
          .floor=${this._activeFloor}
          .selected=${this._selected}
          @plan-change=${r=>this._applyView(r.detail.plan)}
          @floor-add=${this._addFloor}
          @floor-update=${r=>this._updateFloor(r.detail.id,r.detail.patch)}
          @floor-remove=${r=>this._removeFloor(r.detail.id)}
          @floors-import=${this._importFloors}
          @select-object=${r=>this._selectObject(r.detail.id,r.detail.floor)}
          @pick-background=${this._pickBackground}
          @background-url=${r=>this._setBackground(r.detail.url)}
          @calibrate=${()=>{this._sheet=!1,this._editor?.fitBackground(),this._editor?.calibrate()}}
          @select-room=${r=>this._selected=r.detail.id}
          @import-areas=${this._importAreas}
          @export-plan=${this._exportPlan}
          @import-plan=${r=>this._importPlan(r.detail.text)}
        ></fp-inspector>
      </aside>
    </div>`}_sheetTitle(e,n){let s=ct();if(n)return`${n.name||s.unnamed}, ${Se(Kn(n.points))} m²`;let r=ip(e,this._selected);return r==="item"?s.device:r==="opening"?s.doorWindow:r==="furniture"?s.furniture:s.homeArea(Se(Us(e)))}};ua.properties={hass:{attribute:!1},narrow:{type:Boolean},panel:{attribute:!1},_plan:{state:!0},_mode:{state:!0},_tool:{state:!0},_selected:{state:!0},_saving:{state:!0},_error:{state:!0},_conflict:{state:!0},_notice:{state:!0},_sheet:{state:!0},_floor:{state:!0},_past:{state:!0},_future:{state:!0}},ua.styles=[Oc,De`
    :host {
      display: block;
      background: var(--fp-bg);
      color: var(--fp-fg);
      font-family: var(--fp-font);
      -webkit-font-smoothing: antialiased;
    }
    /* Own panel without the HA toolbar: full window height */
    .root {
      display: flex;
      flex-direction: column;
      height: 100vh;
      height: 100dvh;
      overflow: hidden;
    }

    header {
      display: flex;
      align-items: center;
      gap: 10px;
      height: var(--header-height, 56px);
      padding: 0 12px 0 4px;
      background: var(--fp-surface);
      border-bottom: 1px solid var(--fp-line);
      box-sizing: border-box;
      flex-shrink: 0;
    }
    h1 {
      margin: 0 6px 0 0;
      font-size: 19px;
      font-weight: 400;
      white-space: nowrap;
    }
    .spacer {
      flex: 1;
    }

    button {
      font: inherit;
      color: var(--fp-fg);
      background: none;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    button:disabled {
      opacity: 0.38;
      cursor: default;
    }
    button:focus-visible {
      outline: 2px solid var(--fp-accent);
      outline-offset: 2px;
    }
    button.primary {
      background: var(--fp-accent);
      color: var(--fp-on-accent);
      font-weight: 500;
      padding: 0 16px;
      height: 36px;
      border-radius: 10px;
    }

    .modes {
      display: inline-flex;
      background: var(--fp-bg);
      border: 1px solid var(--fp-line);
      border-radius: 11px;
      padding: 3px;
    }
    .modes button {
      color: var(--fp-dim);
      border-radius: 8px;
      height: 30px;
      padding: 0 12px;
    }
    .modes button.active {
      background: var(--fp-surface-2);
      color: var(--fp-fg);
    }
    .modes svg {
      width: 17px;
      height: 17px;
    }

    .floors {
      display: inline-flex;
      min-width: 0;
      background: var(--fp-bg);
      border: 1px solid var(--fp-line);
      border-radius: 11px;
      padding: 3px;
    }
    .floors button {
      display: block;
      min-width: 0;
      max-width: 140px;
      height: 30px;
      padding: 0 12px;
      border-radius: 8px;
      color: var(--fp-dim);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .floors button.active {
      background: var(--fp-surface-2);
      color: var(--fp-fg);
    }
    .floor-select {
      font: inherit;
      font-size: 14px;
      color: var(--fp-fg);
      background: var(--fp-bg);
      border: 1px solid var(--fp-line);
      border-radius: 10px;
      height: 36px;
      padding: 0 8px;
      max-width: 160px;
      min-width: 0;
    }
    .floor-select.compact {
      display: none;
    }

    .history {
      display: flex;
    }
    .history button {
      width: 36px;
      height: 36px;
      border-radius: 9px;
      justify-content: center;
      color: var(--fp-dim);
    }
    .history button:not(:disabled):hover {
      background: var(--fp-surface-2);
      color: var(--fp-fg);
    }
    .state {
      font-size: 13px;
      color: var(--fp-dim);
      white-space: nowrap;
    }
    .state.dirty {
      color: var(--fp-lamp);
    }
    .state.dirty::before {
      content: "";
      display: inline-block;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: currentColor;
      margin-right: 7px;
      vertical-align: 1px;
    }

    .banner {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 9px 16px;
      font-size: 14px;
      line-height: 1.4;
    }
    .banner .text {
      flex: 1;
    }
    .banner button {
      flex-shrink: 0;
      padding: 6px 12px;
      border-radius: 8px;
      border: 1px solid currentColor;
    }
    .banner.warn {
      background: color-mix(in srgb, var(--fp-lamp) 16%, var(--fp-surface));
    }
    .banner.error {
      background: color-mix(in srgb, var(--fp-alert) 20%, var(--fp-surface));
    }

    .workspace {
      flex: 1;
      min-height: 0;
      display: grid;
      grid-template-columns: minmax(0, 1fr) 320px;
    }
    fp-plan-editor {
      min-height: 0;
    }
    fp-scene {
      flex: 1;
      min-height: 0;
    }
    aside {
      min-height: 0;
      overflow-y: auto;
      background: var(--fp-surface);
      border-left: 1px solid var(--fp-line);
    }
    .sheet-handle {
      display: none;
    }

    .welcome {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      display: grid;
      place-items: center;
      padding: 24px 16px;
      background: var(--fp-canvas);
    }
    .welcome-card {
      width: min(560px, 100%);
    }
    .welcome h2 {
      margin: 0 0 8px;
      font-size: 24px;
      font-weight: 400;
    }
    .welcome p {
      margin: 0 0 22px;
      color: var(--fp-dim);
      line-height: 1.5;
    }
    .starts {
      display: grid;
      gap: 10px;
    }
    button.start {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      width: 100%;
      padding: 14px 16px;
      text-align: left;
      background: var(--fp-surface);
      border: 1px solid var(--fp-line);
      border-radius: 14px;
    }
    button.start:hover {
      border-color: var(--fp-accent);
    }
    button.primary-start {
      border-color: color-mix(in srgb, var(--fp-accent) 60%, var(--fp-line));
    }
    .start-icon {
      flex: none;
      display: grid;
      place-items: center;
      width: 40px;
      height: 40px;
      border-radius: 11px;
      background: var(--fp-surface-2);
      color: var(--fp-accent);
    }
    .start-text {
      display: flex;
      flex-direction: column;
      gap: 3px;
      line-height: 1.4;
    }
    .start-text b {
      font-weight: 500;
    }
    .start-text span {
      color: var(--fp-dim);
      font-size: 13.5px;
    }

    .center {
      flex: 1;
      display: grid;
      place-items: center;
      padding: 24px;
      text-align: center;
    }
    .muted {
      color: var(--fp-dim);
    }

    @media (max-width: 760px) {
      h1 {
        display: none;
      }
      .modes button span,
      .state {
        display: none;
      }
      .modes button {
        padding: 0 10px;
      }
      .floors {
        display: none;
      }
      .floor-select.compact {
        display: block;
      }
      .workspace {
        grid-template-columns: 1fr;
        grid-template-rows: minmax(0, 1fr) auto;
      }
      aside {
        border-left: none;
        border-top: 1px solid var(--fp-line);
        max-height: 48px;
        overflow: hidden;
        transition: max-height 200ms ease;
      }
      aside.open {
        max-height: 55vh;
        overflow-y: auto;
      }
      .sheet-handle {
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 100%;
        height: 48px;
        justify-content: center;
        font-size: 14px;
        position: sticky;
        top: 0;
        background: var(--fp-surface);
        z-index: 1;
      }
      .grip {
        width: 36px;
        height: 4px;
        border-radius: 2px;
        background: var(--fp-line-strong);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      aside {
        transition: none;
      }
    }
  `];customElements.get("floorplan-3d-panel")||customElements.define("floorplan-3d-panel",ua);export{ua as Floorplan3dPanel};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
lit-html/directive.js:
lit-html/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
