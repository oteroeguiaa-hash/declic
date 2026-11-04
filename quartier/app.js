var y_=Object.defineProperty;var __=(i,e,t)=>e in i?y_(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var $h=(i,e,t)=>__(i,typeof e!="symbol"?e+"":e,t);var pm=0,ku=1,mm=2;var Vu=1,gm=2,Sn=3,Si=0,Xt=1,mi=2,Vn=0,Nr=1,Hu=2,Gu=3,Wu=4,Xl=5,rr=100,ym=101,_m=102,xm=103,vm=104,ql=200,Yl=201,bm=202,Sm=203,El=204,Al=205,Tm=206,Mm=207,wm=208,Em=209,Am=210,Cm=211,Rm=212,Pm=213,Im=214,jl=0,Zl=1,$l=2,Fr=3,Kl=4,Jl=5,lo=6,Ql=7,Xu=0,Lm=1,Dm=2,Hn=0,ec=1,Um=2,Nm=3,Fm=4,Om=5,Bm=6,zm=7,Au="attached",km="detached",qu=300,Xr=301,qr=302,tc=303,ic=304,co=306,sr=1e3,pn=1001,Es=1002,kt=1003,nc=1004;var Yr=1005;var ti=1006,Vs=1007;var rn=1008;var Xi=1009,Yu=1010,ju=1011,Hs=1012,rc=1013,Gn=1014,ci=1015,Gs=1016,sc=1017,ac=1018,Ws=1020,Zu=35902,$u=35899,Ku=1021,Ju=1022,hi=1023,As=1026,Xs=1027,ho=1028,uo=1029,oc=1030,lc=1031;var fo=1033,po=33776,mo=33777,go=33778,yo=33779,cc=35840,hc=35841,uc=35842,dc=35843,fc=36196,pc=37492,mc=37496,gc=37808,yc=37809,_c=37810,xc=37811,vc=37812,bc=37813,Sc=37814,Tc=37815,Mc=37816,wc=37817,Ec=37818,Ac=37819,Cc=37820,Rc=37821,Pc=36492,Ic=36494,Lc=36495,Dc=36283,Uc=36284,Nc=36285,Fc=36286;var Or=2300,Br=2301,wl=2302,Cu=2400,Ru=2401,Pu=2402,Vm=2500;var Qu=0,_o=1,qs=2,Hm=3200,Gm=3201;var ed=0,Wm=1,Wn="",ut="srgb",Nt="srgb-linear",Ba="linear",lt="srgb";var Ur=7680;var Iu=519,Xm=512,qm=513,Ym=514,td=515,jm=516,Zm=517,$m=518,Km=519,Cl=35044;var id="300 es",Hi=2e3,za=2001;var ui=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},Zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ep=1234567,Fa=Math.PI/180,zr=180/Math.PI;function Qi(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Zt[i&255]+Zt[i>>8&255]+Zt[i>>16&255]+Zt[i>>24&255]+"-"+Zt[e&255]+Zt[e>>8&255]+"-"+Zt[e>>16&15|64]+Zt[e>>24&255]+"-"+Zt[t&63|128]+Zt[t>>8&255]+"-"+Zt[t>>16&255]+Zt[t>>24&255]+Zt[n&255]+Zt[n>>8&255]+Zt[n>>16&255]+Zt[n>>24&255]).toLowerCase()}function Oe(i,e,t){return Math.max(e,Math.min(t,i))}function nd(i,e){return(i%e+e)%e}function x_(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function v_(i,e,t){return i!==e?(t-i)/(e-i):0}function Oa(i,e,t){return(1-t)*i+t*e}function b_(i,e,t,n){return Oa(i,e,1-Math.exp(-t*n))}function S_(i,e=1){return e-Math.abs(nd(i,e*2)-e)}function T_(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function M_(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function w_(i,e){return i+Math.floor(Math.random()*(e-i+1))}function E_(i,e){return i+Math.random()*(e-i)}function A_(i){return i*(.5-Math.random())}function C_(i){i!==void 0&&(Ep=i);let e=Ep+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function R_(i){return i*Fa}function P_(i){return i*zr}function I_(i){return(i&i-1)===0&&i!==0}function L_(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function D_(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function U_(i,e,t,n,r){let s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),u=a((e+n)/2),h=s((e-n)/2),d=a((e-n)/2),f=s((n-e)/2),m=a((n-e)/2);switch(r){case"XYX":i.set(o*u,l*h,l*d,o*c);break;case"YZY":i.set(l*d,o*u,l*h,o*c);break;case"ZXZ":i.set(l*h,l*d,o*u,o*c);break;case"XZX":i.set(o*u,l*m,l*f,o*c);break;case"YXY":i.set(l*f,o*u,l*m,o*c);break;case"ZYZ":i.set(l*m,l*f,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Ji(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ot(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Ht={DEG2RAD:Fa,RAD2DEG:zr,generateUUID:Qi,clamp:Oe,euclideanModulo:nd,mapLinear:x_,inverseLerp:v_,lerp:Oa,damp:b_,pingpong:S_,smoothstep:T_,smootherstep:M_,randInt:w_,randFloat:E_,randFloatSpread:A_,seededRandom:C_,degToRad:R_,radToDeg:P_,isPowerOfTwo:I_,ceilPowerOfTwo:L_,floorPowerOfTwo:D_,setQuaternionFromProperEuler:U_,normalize:ot,denormalize:Ji},de=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Oe(this.x,e.x,t.x),this.y=Oe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Oe(this.x,e,t),this.y=Oe(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Oe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Oe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ii=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],u=n[r+2],h=n[r+3],d=s[a+0],f=s[a+1],m=s[a+2],y=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=m,e[t+3]=y;return}if(h!==y||l!==d||c!==f||u!==m){let g=1-o,p=l*d+c*f+u*m+h*y,v=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){let S=Math.sqrt(_),M=Math.atan2(S,p*v);g=Math.sin(g*M)/S,o=Math.sin(o*M)/S}let x=o*v;if(l=l*g+d*x,c=c*g+f*x,u=u*g+m*x,h=h*g+y*x,g===1-o){let S=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=S,c*=S,u*=S,h*=S}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,r,s,a){let o=n[r],l=n[r+1],c=n[r+2],u=n[r+3],h=s[a],d=s[a+1],f=s[a+2],m=s[a+3];return e[t]=o*m+u*h+l*f-c*d,e[t+1]=l*m+u*d+c*h-o*f,e[t+2]=c*m+u*f+o*d-l*h,e[t+3]=u*m-o*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(r/2),h=o(s/2),d=l(n/2),f=l(r/2),m=l(s/2);switch(a){case"XYZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"YXZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"ZXY":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"ZYX":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"YZX":this._x=d*u*h+c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h-d*f*m;break;case"XZY":this._x=d*u*h-c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(a-r)*f}else if(n>o&&n>h){let f=2*Math.sqrt(1+n-o-h);this._w=(u-l)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+c)/f}else if(o>h){let f=2*Math.sqrt(1+o-n-h);this._w=(s-c)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+h-n-o);this._w=(a-r)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Oe(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-r*o,this._w=a*u-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;let l=1-o*o;if(l<=Number.EPSILON){let f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*r+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=a*h+this._w*d,this._x=n*h+this._x*d,this._y=r*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},C=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ap.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ap.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),u=2*(o*t-s*r),h=2*(s*n-a*t);return this.x=t+l*c+a*h-o*u,this.y=n+l*u+o*c-s*h,this.z=r+l*h+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Oe(this.x,e.x,t.x),this.y=Oe(this.y,e.y,t.y),this.z=Oe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Oe(this.x,e,t),this.y=Oe(this.y,e,t),this.z=Oe(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Oe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Kh.copy(this).projectOnVector(e),this.sub(Kh)}reflect(e){return this.sub(Kh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Oe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Kh=new C,Ap=new ii,Le=class i{constructor(e,t,n,r,s,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],f=n[5],m=n[8],y=r[0],g=r[3],p=r[6],v=r[1],_=r[4],x=r[7],S=r[2],M=r[5],E=r[8];return s[0]=a*y+o*v+l*S,s[3]=a*g+o*_+l*M,s[6]=a*p+o*x+l*E,s[1]=c*y+u*v+h*S,s[4]=c*g+u*_+h*M,s[7]=c*p+u*x+h*E,s[2]=d*y+f*v+m*S,s[5]=d*g+f*_+m*M,s[8]=d*p+f*x+m*E,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+r*s*c-r*a*l}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,d=o*l-u*s,f=c*s-a*l,m=t*h+n*d+r*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/m;return e[0]=h*y,e[1]=(r*c-u*n)*y,e[2]=(o*n-r*a)*y,e[3]=d*y,e[4]=(u*t-r*l)*y,e[5]=(r*s-o*t)*y,e[6]=f*y,e[7]=(n*l-c*t)*y,e[8]=(a*t-n*s)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Jh.makeScale(e,t)),this}rotate(e){return this.premultiply(Jh.makeRotation(-e)),this}translate(e,t){return this.premultiply(Jh.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Jh=new Le;function rd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Cs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Jm(){let i=Cs("canvas");return i.style.display="block",i}var Cp={};function Rs(i){i in Cp||(Cp[i]=!0,console.warn(i))}function Qm(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}var Rp=new Le().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Pp=new Le().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function N_(){let i={enabled:!0,workingColorSpace:Nt,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===lt&&(r.r=Nn(r.r),r.g=Nn(r.g),r.b=Nn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===lt&&(r.r=ws(r.r),r.g=ws(r.g),r.b=ws(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Wn?Ba:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Rs("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Rs("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Nt]:{primaries:e,whitePoint:n,transfer:Ba,toXYZ:Rp,fromXYZ:Pp,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ut},outputColorSpaceConfig:{drawingBufferColorSpace:ut}},[ut]:{primaries:e,whitePoint:n,transfer:lt,toXYZ:Rp,fromXYZ:Pp,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ut}}}),i}var qe=N_();function Nn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ws(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var cs,Rl=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{cs===void 0&&(cs=Cs("canvas")),cs.width=e.width,cs.height=e.height;let r=cs.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=cs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Cs("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Nn(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Nn(t[n]/255)*255):t[n]=Nn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},F_=0,kr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:F_++}),this.uuid=Qi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Qh(r[a].image)):s.push(Qh(r[a]))}else s=Qh(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function Qh(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Rl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var O_=0,eu=new C,Ut=class i extends ui{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=pn,r=pn,s=ti,a=rn,o=hi,l=Xi,c=i.DEFAULT_ANISOTROPY,u=Wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:O_++}),this.uuid=Qi(),this.name="",this.source=new kr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new de(0,0),this.repeat=new de(1,1),this.center=new de(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Le,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(eu).x}get height(){return this.source.getSize(eu).y}get depth(){return this.source.getSize(eu).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==qu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case sr:e.x=e.x-Math.floor(e.x);break;case pn:e.x=e.x<0?0:1;break;case Es:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case sr:e.y=e.y-Math.floor(e.y);break;case pn:e.y=e.y<0?0:1;break;case Es:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ut.DEFAULT_IMAGE=null;Ut.DEFAULT_MAPPING=qu;Ut.DEFAULT_ANISOTROPY=1;var Qe=class i{constructor(e=0,t=0,n=0,r=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],m=l[9],y=l[2],g=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-y)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+y)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(c+1)/2,x=(f+1)/2,S=(p+1)/2,M=(u+d)/4,E=(h+y)/4,R=(m+g)/4;return _>x&&_>S?_<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(_),r=M/n,s=E/n):x>S?x<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),n=M/r,s=R/r):S<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(S),n=E/s,r=R/s),this.set(n,r,s,t),this}let v=Math.sqrt((g-m)*(g-m)+(h-y)*(h-y)+(d-u)*(d-u));return Math.abs(v)<.001&&(v=1),this.x=(g-m)/v,this.y=(h-y)/v,this.z=(d-u)/v,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Oe(this.x,e.x,t.x),this.y=Oe(this.y,e.y,t.y),this.z=Oe(this.z,e.z,t.z),this.w=Oe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Oe(this.x,e,t),this.y=Oe(this.y,e,t),this.z=Oe(this.z,e,t),this.w=Oe(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Oe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Pl=class extends ui{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ti,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Qe(0,0,e,t),this.scissorTest=!1,this.viewport=new Qe(0,0,e,t);let r={width:e,height:t,depth:n.depth},s=new Ut(r);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:ti,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new kr(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ui=class extends Pl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ka=class extends Ut{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=kt,this.minFilter=kt,this.wrapR=pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Il=class extends Ut{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=kt,this.minFilter=kt,this.wrapR=pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var je=class{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Zi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Zi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Zi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Zi):Zi.fromBufferAttribute(s,a),Zi.applyMatrix4(e.matrixWorld),this.expandByPoint(Zi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Jo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Jo.copy(n.boundingBox)),Jo.applyMatrix4(e.matrixWorld),this.union(Jo)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Zi),Zi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Aa),Qo.subVectors(this.max,Aa),hs.subVectors(e.a,Aa),us.subVectors(e.b,Aa),ds.subVectors(e.c,Aa),Jn.subVectors(us,hs),Qn.subVectors(ds,us),Cr.subVectors(hs,ds);let t=[0,-Jn.z,Jn.y,0,-Qn.z,Qn.y,0,-Cr.z,Cr.y,Jn.z,0,-Jn.x,Qn.z,0,-Qn.x,Cr.z,0,-Cr.x,-Jn.y,Jn.x,0,-Qn.y,Qn.x,0,-Cr.y,Cr.x,0];return!tu(t,hs,us,ds,Qo)||(t=[1,0,0,0,1,0,0,0,1],!tu(t,hs,us,ds,Qo))?!1:(el.crossVectors(Jn,Qn),t=[el.x,el.y,el.z],tu(t,hs,us,ds,Qo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Zi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Zi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Rn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Rn=[new C,new C,new C,new C,new C,new C,new C,new C],Zi=new C,Jo=new je,hs=new C,us=new C,ds=new C,Jn=new C,Qn=new C,Cr=new C,Aa=new C,Qo=new C,el=new C,Rr=new C;function tu(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Rr.fromArray(i,s);let o=r.x*Math.abs(Rr.x)+r.y*Math.abs(Rr.y)+r.z*Math.abs(Rr.z),l=e.dot(Rr),c=t.dot(Rr),u=n.dot(Rr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var B_=new je,Ca=new C,iu=new C,xt=class{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):B_.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ca.subVectors(e,this.center);let t=Ca.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Ca,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(iu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ca.copy(e.center).add(iu)),this.expandByPoint(Ca.copy(e.center).sub(iu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Pn=new C,nu=new C,tl=new C,er=new C,ru=new C,il=new C,su=new C,Vt=class{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Pn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Pn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Pn.copy(this.origin).addScaledVector(this.direction,t),Pn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){nu.copy(e).add(t).multiplyScalar(.5),tl.copy(t).sub(e).normalize(),er.copy(this.origin).sub(nu);let s=e.distanceTo(t)*.5,a=-this.direction.dot(tl),o=er.dot(this.direction),l=-er.dot(tl),c=er.lengthSq(),u=Math.abs(1-a*a),h,d,f,m;if(u>0)if(h=a*l-o,d=a*o-l,m=s*u,h>=0)if(d>=-m)if(d<=m){let y=1/u;h*=y,d*=y,f=h*(h+a*d+2*o)+d*(a*h+d+2*l)+c}else d=s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d<=-m?(h=Math.max(0,-(-a*s+o)),d=h>0?-s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c):d<=m?(h=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(h=Math.max(0,-(a*s+o)),d=h>0?s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c);else d=a>0?-s:s,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(nu).addScaledVector(tl,d),f}intersectSphere(e,t){Pn.subVectors(e.center,this.origin);let n=Pn.dot(this.direction),r=Pn.dot(Pn)-n*n,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l,c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Pn)!==null}intersectTriangle(e,t,n,r,s){ru.subVectors(t,e),il.subVectors(n,e),su.crossVectors(ru,il);let a=this.direction.dot(su),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;er.subVectors(this.origin,e);let l=o*this.direction.dot(il.crossVectors(er,il));if(l<0)return null;let c=o*this.direction.dot(ru.cross(er));if(c<0||l+c>a)return null;let u=-o*er.dot(su);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},re=class i{constructor(e,t,n,r,s,a,o,l,c,u,h,d,f,m,y,g){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,u,h,d,f,m,y,g)}set(e,t,n,r,s,a,o,l,c,u,h,d,f,m,y,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=m,p[11]=y,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/fs.setFromMatrixColumn(e,0).length(),s=1/fs.setFromMatrixColumn(e,1).length(),a=1/fs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){let d=a*u,f=a*h,m=o*u,y=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+m*c,t[5]=d-y*c,t[9]=-o*l,t[2]=y-d*c,t[6]=m+f*c,t[10]=a*l}else if(e.order==="YXZ"){let d=l*u,f=l*h,m=c*u,y=c*h;t[0]=d+y*o,t[4]=m*o-f,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=f*o-m,t[6]=y+d*o,t[10]=a*l}else if(e.order==="ZXY"){let d=l*u,f=l*h,m=c*u,y=c*h;t[0]=d-y*o,t[4]=-a*h,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*u,t[9]=y-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let d=a*u,f=a*h,m=o*u,y=o*h;t[0]=l*u,t[4]=m*c-f,t[8]=d*c+y,t[1]=l*h,t[5]=y*c+d,t[9]=f*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let d=a*l,f=a*c,m=o*l,y=o*c;t[0]=l*u,t[4]=y-d*h,t[8]=m*h+f,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*h+m,t[10]=d-y*h}else if(e.order==="XZY"){let d=a*l,f=a*c,m=o*l,y=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+y,t[5]=a*u,t[9]=f*h-m,t[2]=m*h-f,t[6]=o*u,t[10]=y*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(z_,e,k_)}lookAt(e,t,n){let r=this.elements;return Li.subVectors(e,t),Li.lengthSq()===0&&(Li.z=1),Li.normalize(),tr.crossVectors(n,Li),tr.lengthSq()===0&&(Math.abs(n.z)===1?Li.x+=1e-4:Li.z+=1e-4,Li.normalize(),tr.crossVectors(n,Li)),tr.normalize(),nl.crossVectors(Li,tr),r[0]=tr.x,r[4]=nl.x,r[8]=Li.x,r[1]=tr.y,r[5]=nl.y,r[9]=Li.y,r[2]=tr.z,r[6]=nl.z,r[10]=Li.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],f=n[13],m=n[2],y=n[6],g=n[10],p=n[14],v=n[3],_=n[7],x=n[11],S=n[15],M=r[0],E=r[4],R=r[8],T=r[12],b=r[1],P=r[5],L=r[9],D=r[13],F=r[2],k=r[6],V=r[10],K=r[14],W=r[3],se=r[7],ue=r[11],be=r[15];return s[0]=a*M+o*b+l*F+c*W,s[4]=a*E+o*P+l*k+c*se,s[8]=a*R+o*L+l*V+c*ue,s[12]=a*T+o*D+l*K+c*be,s[1]=u*M+h*b+d*F+f*W,s[5]=u*E+h*P+d*k+f*se,s[9]=u*R+h*L+d*V+f*ue,s[13]=u*T+h*D+d*K+f*be,s[2]=m*M+y*b+g*F+p*W,s[6]=m*E+y*P+g*k+p*se,s[10]=m*R+y*L+g*V+p*ue,s[14]=m*T+y*D+g*K+p*be,s[3]=v*M+_*b+x*F+S*W,s[7]=v*E+_*P+x*k+S*se,s[11]=v*R+_*L+x*V+S*ue,s[15]=v*T+_*D+x*K+S*be,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],m=e[3],y=e[7],g=e[11],p=e[15];return m*(+s*l*h-r*c*h-s*o*d+n*c*d+r*o*f-n*l*f)+y*(+t*l*f-t*c*d+s*a*d-r*a*f+r*c*u-s*l*u)+g*(+t*c*h-t*o*f-s*a*h+n*a*f+s*o*u-n*c*u)+p*(-r*o*u-t*l*h+t*o*d+r*a*h-n*a*d+n*l*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],m=e[12],y=e[13],g=e[14],p=e[15],v=h*g*c-y*d*c+y*l*f-o*g*f-h*l*p+o*d*p,_=m*d*c-u*g*c-m*l*f+a*g*f+u*l*p-a*d*p,x=u*y*c-m*h*c+m*o*f-a*y*f-u*o*p+a*h*p,S=m*h*l-u*y*l-m*o*d+a*y*d+u*o*g-a*h*g,M=t*v+n*_+r*x+s*S;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let E=1/M;return e[0]=v*E,e[1]=(y*d*s-h*g*s-y*r*f+n*g*f+h*r*p-n*d*p)*E,e[2]=(o*g*s-y*l*s+y*r*c-n*g*c-o*r*p+n*l*p)*E,e[3]=(h*l*s-o*d*s-h*r*c+n*d*c+o*r*f-n*l*f)*E,e[4]=_*E,e[5]=(u*g*s-m*d*s+m*r*f-t*g*f-u*r*p+t*d*p)*E,e[6]=(m*l*s-a*g*s-m*r*c+t*g*c+a*r*p-t*l*p)*E,e[7]=(a*d*s-u*l*s+u*r*c-t*d*c-a*r*f+t*l*f)*E,e[8]=x*E,e[9]=(m*h*s-u*y*s-m*n*f+t*y*f+u*n*p-t*h*p)*E,e[10]=(a*y*s-m*o*s+m*n*c-t*y*c-a*n*p+t*o*p)*E,e[11]=(u*o*s-a*h*s-u*n*c+t*h*c+a*n*f-t*o*f)*E,e[12]=S*E,e[13]=(u*y*r-m*h*r+m*n*d-t*y*d-u*n*g+t*h*g)*E,e[14]=(m*o*r-a*y*r-m*n*l+t*y*l+a*n*g-t*o*g)*E,e[15]=(a*h*r-u*o*r+u*n*l-t*h*l-a*n*d+t*o*d)*E,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+n,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,h=o+o,d=s*c,f=s*u,m=s*h,y=a*u,g=a*h,p=o*h,v=l*c,_=l*u,x=l*h,S=n.x,M=n.y,E=n.z;return r[0]=(1-(y+p))*S,r[1]=(f+x)*S,r[2]=(m-_)*S,r[3]=0,r[4]=(f-x)*M,r[5]=(1-(d+p))*M,r[6]=(g+v)*M,r[7]=0,r[8]=(m+_)*E,r[9]=(g-v)*E,r[10]=(1-(d+y))*E,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,s=fs.set(r[0],r[1],r[2]).length(),a=fs.set(r[4],r[5],r[6]).length(),o=fs.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],$i.copy(this);let c=1/s,u=1/a,h=1/o;return $i.elements[0]*=c,$i.elements[1]*=c,$i.elements[2]*=c,$i.elements[4]*=u,$i.elements[5]*=u,$i.elements[6]*=u,$i.elements[8]*=h,$i.elements[9]*=h,$i.elements[10]*=h,t.setFromRotationMatrix($i),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,r,s,a,o=Hi,l=!1){let c=this.elements,u=2*s/(t-e),h=2*s/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),m,y;if(l)m=s/(a-s),y=a*s/(a-s);else if(o===Hi)m=-(a+s)/(a-s),y=-2*a*s/(a-s);else if(o===za)m=-a/(a-s),y=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=Hi,l=!1){let c=this.elements,u=2/(t-e),h=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),m,y;if(l)m=1/(a-s),y=a/(a-s);else if(o===Hi)m=-2/(a-s),y=-(a+s)/(a-s);else if(o===za)m=-1/(a-s),y=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},fs=new C,$i=new re,z_=new C(0,0,0),k_=new C(1,1,1),tr=new C,nl=new C,Li=new C,Ip=new re,Lp=new ii,di=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],h=r[2],d=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(Oe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Oe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Oe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Oe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Oe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Oe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ip.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ip,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Lp.setFromEuler(this),this.setFromQuaternion(Lp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};di.DEFAULT_ORDER="XYZ";var Ps=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},V_=0,Dp=new C,ps=new ii,In=new re,rl=new C,Ra=new C,H_=new C,G_=new ii,Up=new C(1,0,0),Np=new C(0,1,0),Fp=new C(0,0,1),Op={type:"added"},W_={type:"removed"},ms={type:"childadded",child:null},au={type:"childremoved",child:null},Et=class i extends ui{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:V_++}),this.uuid=Qi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new C,t=new di,n=new ii,r=new C(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new re},normalMatrix:{value:new Le}}),this.matrix=new re,this.matrixWorld=new re,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ps,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ps.setFromAxisAngle(e,t),this.quaternion.multiply(ps),this}rotateOnWorldAxis(e,t){return ps.setFromAxisAngle(e,t),this.quaternion.premultiply(ps),this}rotateX(e){return this.rotateOnAxis(Up,e)}rotateY(e){return this.rotateOnAxis(Np,e)}rotateZ(e){return this.rotateOnAxis(Fp,e)}translateOnAxis(e,t){return Dp.copy(e).applyQuaternion(this.quaternion),this.position.add(Dp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Up,e)}translateY(e){return this.translateOnAxis(Np,e)}translateZ(e){return this.translateOnAxis(Fp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(In.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?rl.copy(e):rl.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Ra.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?In.lookAt(Ra,rl,this.up):In.lookAt(rl,Ra,this.up),this.quaternion.setFromRotationMatrix(In),r&&(In.extractRotation(r.matrixWorld),ps.setFromRotationMatrix(In),this.quaternion.premultiply(ps.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Op),ms.child=e,this.dispatchEvent(ms),ms.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(W_),au.child=e,this.dispatchEvent(au),au.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),In.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),In.multiply(e.parent.matrixWorld)),e.applyMatrix4(In),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Op),ms.child=e,this.dispatchEvent(ms),ms.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ra,e,H_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ra,G_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=r,n;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}};Et.DEFAULT_UP=new C(0,1,0);Et.DEFAULT_MATRIX_AUTO_UPDATE=!0;Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ki=new C,Ln=new C,ou=new C,Dn=new C,gs=new C,ys=new C,Bp=new C,lu=new C,cu=new C,hu=new C,uu=new Qe,du=new Qe,fu=new Qe,Wt=class i{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Ki.subVectors(e,t),r.cross(Ki);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Ki.subVectors(r,t),Ln.subVectors(n,t),ou.subVectors(e,t);let a=Ki.dot(Ki),o=Ki.dot(Ln),l=Ki.dot(ou),c=Ln.dot(Ln),u=Ln.dot(ou),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;let d=1/h,f=(c*l-o*u)*d,m=(a*u-o*l)*d;return s.set(1-f-m,m,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Dn)===null?!1:Dn.x>=0&&Dn.y>=0&&Dn.x+Dn.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,Dn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Dn.x),l.addScaledVector(a,Dn.y),l.addScaledVector(o,Dn.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return uu.setScalar(0),du.setScalar(0),fu.setScalar(0),uu.fromBufferAttribute(e,t),du.fromBufferAttribute(e,n),fu.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(uu,s.x),a.addScaledVector(du,s.y),a.addScaledVector(fu,s.z),a}static isFrontFacing(e,t,n,r){return Ki.subVectors(n,t),Ln.subVectors(e,t),Ki.cross(Ln).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ki.subVectors(this.c,this.b),Ln.subVectors(this.a,this.b),Ki.cross(Ln).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,a,o;gs.subVectors(r,n),ys.subVectors(s,n),lu.subVectors(e,n);let l=gs.dot(lu),c=ys.dot(lu);if(l<=0&&c<=0)return t.copy(n);cu.subVectors(e,r);let u=gs.dot(cu),h=ys.dot(cu);if(u>=0&&h<=u)return t.copy(r);let d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(gs,a);hu.subVectors(e,s);let f=gs.dot(hu),m=ys.dot(hu);if(m>=0&&f<=m)return t.copy(s);let y=f*c-l*m;if(y<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector(ys,o);let g=u*m-f*h;if(g<=0&&h-u>=0&&f-m>=0)return Bp.subVectors(s,r),o=(h-u)/(h-u+(f-m)),t.copy(r).addScaledVector(Bp,o);let p=1/(g+y+d);return a=y*p,o=d*p,t.copy(n).addScaledVector(gs,a).addScaledVector(ys,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},eg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ir={h:0,s:0,l:0},sl={h:0,s:0,l:0};function pu(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var pe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ut){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,qe.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=qe.workingColorSpace){if(e=nd(e,1),t=Oe(t,0,1),n=Oe(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=pu(a,s,e+1/3),this.g=pu(a,s,e),this.b=pu(a,s,e-1/3)}return qe.colorSpaceToWorking(this,r),this}setStyle(e,t=ut){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ut){let n=eg[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Nn(e.r),this.g=Nn(e.g),this.b=Nn(e.b),this}copyLinearToSRGB(e){return this.r=ws(e.r),this.g=ws(e.g),this.b=ws(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ut){return qe.workingToColorSpace($t.copy(this),e),Math.round(Oe($t.r*255,0,255))*65536+Math.round(Oe($t.g*255,0,255))*256+Math.round(Oe($t.b*255,0,255))}getHexString(e=ut){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.workingToColorSpace($t.copy(this),t);let n=$t.r,r=$t.g,s=$t.b,a=Math.max(n,r,s),o=Math.min(n,r,s),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-n)/h+2;break;case s:l=(n-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=qe.workingColorSpace){return qe.workingToColorSpace($t.copy(this),t),e.r=$t.r,e.g=$t.g,e.b=$t.b,e}getStyle(e=ut){qe.workingToColorSpace($t.copy(this),e);let t=$t.r,n=$t.g,r=$t.b;return e!==ut?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(ir),this.setHSL(ir.h+e,ir.s+t,ir.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ir),e.getHSL(sl);let n=Oa(ir.h,sl.h,t),r=Oa(ir.s,sl.s,t),s=Oa(ir.l,sl.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},$t=new pe;pe.NAMES=eg;var X_=0,Ti=class extends ui{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:X_++}),this.uuid=Qi(),this.name="",this.type="Material",this.blending=Nr,this.side=Si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=El,this.blendDst=Al,this.blendEquation=rr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new pe(0,0,0),this.blendAlpha=0,this.depthFunc=Fr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Iu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ur,this.stencilZFail=Ur,this.stencilZPass=Ur,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Nr&&(n.blending=this.blending),this.side!==Si&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==El&&(n.blendSrc=this.blendSrc),this.blendDst!==Al&&(n.blendDst=this.blendDst),this.blendEquation!==rr&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Fr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Iu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ur&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ur&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ur&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(t){let s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},fi=class extends Ti{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new pe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.combine=Xu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Dt=new C,al=new de,q_=0,ke=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:q_++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Cl,this.updateRanges=[],this.gpuType=ci,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)al.fromBufferAttribute(this,t),al.applyMatrix3(e),this.setXY(t,al.x,al.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix3(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ji(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ot(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ji(t,this.array)),t}setX(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ji(t,this.array)),t}setY(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ji(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ji(t,this.array)),t}setW(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),r=ot(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),r=ot(r,this.array),s=ot(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Cl&&(e.usage=this.usage),e}};var Va=class extends ke{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Ha=class extends ke{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var ei=class extends ke{constructor(e,t,n){super(new Float32Array(e),t,n)}},Y_=0,Vi=new re,mu=new Et,_s=new C,Di=new je,Pa=new je,zt=new C,dt=class i extends ui{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Y_++}),this.uuid=Qi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(rd(e)?Ha:Va)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Le().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Vi.makeRotationFromQuaternion(e),this.applyMatrix4(Vi),this}rotateX(e){return Vi.makeRotationX(e),this.applyMatrix4(Vi),this}rotateY(e){return Vi.makeRotationY(e),this.applyMatrix4(Vi),this}rotateZ(e){return Vi.makeRotationZ(e),this.applyMatrix4(Vi),this}translate(e,t,n){return Vi.makeTranslation(e,t,n),this.applyMatrix4(Vi),this}scale(e,t,n){return Vi.makeScale(e,t,n),this.applyMatrix4(Vi),this}lookAt(e){return mu.lookAt(e),mu.updateMatrix(),this.applyMatrix4(mu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_s).negate(),this.translate(_s.x,_s.y,_s.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let r=0,s=e.length;r<s;r++){let a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ei(n,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new je);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];Di.setFromBufferAttribute(s),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,Di.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,Di.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(Di.min),this.boundingBox.expandByPoint(Di.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){let n=this.boundingSphere.center;if(Di.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];Pa.setFromBufferAttribute(o),this.morphTargetsRelative?(zt.addVectors(Di.min,Pa.min),Di.expandByPoint(zt),zt.addVectors(Di.max,Pa.max),Di.expandByPoint(zt)):(Di.expandByPoint(Pa.min),Di.expandByPoint(Pa.max))}Di.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)zt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(zt));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)zt.fromBufferAttribute(o,c),l&&(_s.fromBufferAttribute(e,c),zt.add(_s)),r=Math.max(r,n.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ke(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let R=0;R<n.count;R++)o[R]=new C,l[R]=new C;let c=new C,u=new C,h=new C,d=new de,f=new de,m=new de,y=new C,g=new C;function p(R,T,b){c.fromBufferAttribute(n,R),u.fromBufferAttribute(n,T),h.fromBufferAttribute(n,b),d.fromBufferAttribute(s,R),f.fromBufferAttribute(s,T),m.fromBufferAttribute(s,b),u.sub(c),h.sub(c),f.sub(d),m.sub(d);let P=1/(f.x*m.y-m.x*f.y);isFinite(P)&&(y.copy(u).multiplyScalar(m.y).addScaledVector(h,-f.y).multiplyScalar(P),g.copy(h).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(P),o[R].add(y),o[T].add(y),o[b].add(y),l[R].add(g),l[T].add(g),l[b].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let R=0,T=v.length;R<T;++R){let b=v[R],P=b.start,L=b.count;for(let D=P,F=P+L;D<F;D+=3)p(e.getX(D+0),e.getX(D+1),e.getX(D+2))}let _=new C,x=new C,S=new C,M=new C;function E(R){S.fromBufferAttribute(r,R),M.copy(S);let T=o[R];_.copy(T),_.sub(S.multiplyScalar(S.dot(T))).normalize(),x.crossVectors(M,T);let P=x.dot(l[R])<0?-1:1;a.setXYZW(R,_.x,_.y,_.z,P)}for(let R=0,T=v.length;R<T;++R){let b=v[R],P=b.start,L=b.count;for(let D=P,F=P+L;D<F;D+=3)E(e.getX(D+0)),E(e.getX(D+1)),E(e.getX(D+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ke(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let r=new C,s=new C,a=new C,o=new C,l=new C,c=new C,u=new C,h=new C;if(e)for(let d=0,f=e.count;d<f;d+=3){let m=e.getX(d+0),y=e.getX(d+1),g=e.getX(d+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,y),a.fromBufferAttribute(t,g),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,g),o.add(u),l.add(u),c.add(u),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)zt.fromBufferAttribute(e,t),zt.normalize(),e.setXYZ(t,zt.x,zt.y,zt.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u),f=0,m=0;for(let y=0,g=l.length;y<g;y++){o.isInterleavedBufferAttribute?f=l[y]*o.data.stride+o.offset:f=l[y]*u;for(let p=0;p<u;p++)d[m++]=c[f++]}return new ke(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let o in r){let l=r[o],c=e(l,n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){let d=c[u],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){let f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let c in r){let u=r[c];this.setAttribute(c,u.clone(t))}let s=e.morphAttributes;for(let c in s){let u=[],h=s[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},zp=new re,Pr=new Vt,ol=new xt,kp=new C,ll=new C,cl=new C,hl=new C,gu=new C,ul=new C,Vp=new C,dl=new C,ct=class extends Et{constructor(e=new dt,t=new fi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){ul.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let u=o[l],h=s[l];u!==0&&(gu.fromBufferAttribute(h,e),a?ul.addScaledVector(gu,u):ul.addScaledVector(gu.sub(t),u))}t.add(ul)}return t}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ol.copy(n.boundingSphere),ol.applyMatrix4(s),Pr.copy(e.ray).recast(e.near),!(ol.containsPoint(Pr.origin)===!1&&(Pr.intersectSphere(ol,kp)===null||Pr.origin.distanceToSquared(kp)>(e.far-e.near)**2))&&(zp.copy(s).invert(),Pr.copy(e.ray).applyMatrix4(zp),!(n.boundingBox!==null&&Pr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Pr)))}_computeIntersections(e,t,n){let r,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,y=d.length;m<y;m++){let g=d[m],p=a[g.materialIndex],v=Math.max(g.start,f.start),_=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let x=v,S=_;x<S;x+=3){let M=o.getX(x),E=o.getX(x+1),R=o.getX(x+2);r=fl(this,p,e,n,c,u,h,M,E,R),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let m=Math.max(0,f.start),y=Math.min(o.count,f.start+f.count);for(let g=m,p=y;g<p;g+=3){let v=o.getX(g),_=o.getX(g+1),x=o.getX(g+2);r=fl(this,a,e,n,c,u,h,v,_,x),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,y=d.length;m<y;m++){let g=d[m],p=a[g.materialIndex],v=Math.max(g.start,f.start),_=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let x=v,S=_;x<S;x+=3){let M=x,E=x+1,R=x+2;r=fl(this,p,e,n,c,u,h,M,E,R),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let m=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let g=m,p=y;g<p;g+=3){let v=g,_=g+1,x=g+2;r=fl(this,a,e,n,c,u,h,v,_,x),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}};function j_(i,e,t,n,r,s,a,o){let l;if(e.side===Xt?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===Si,o),l===null)return null;dl.copy(o),dl.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(dl);return c<t.near||c>t.far?null:{distance:c,point:dl.clone(),object:i}}function fl(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,ll),i.getVertexPosition(l,cl),i.getVertexPosition(c,hl);let u=j_(i,e,t,n,ll,cl,hl,Vp);if(u){let h=new C;Wt.getBarycoord(Vp,ll,cl,hl,h),r&&(u.uv=Wt.getInterpolatedAttribute(r,o,l,c,h,new de)),s&&(u.uv1=Wt.getInterpolatedAttribute(s,o,l,c,h,new de)),a&&(u.normal=Wt.getInterpolatedAttribute(a,o,l,c,h,new C),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new C,materialIndex:0};Wt.getNormal(ll,cl,hl,d.normal),u.face=d,u.barycoord=h}return u}var Vr=class i extends dt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],u=[],h=[],d=0,f=0;m("z","y","x",-1,-1,n,t,e,a,s,0),m("z","y","x",1,-1,n,t,-e,a,s,1),m("x","z","y",1,1,e,n,t,r,a,2),m("x","z","y",1,-1,e,n,-t,r,a,3),m("x","y","z",1,-1,e,t,n,r,s,4),m("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new ei(c,3)),this.setAttribute("normal",new ei(u,3)),this.setAttribute("uv",new ei(h,2));function m(y,g,p,v,_,x,S,M,E,R,T){let b=x/E,P=S/R,L=x/2,D=S/2,F=M/2,k=E+1,V=R+1,K=0,W=0,se=new C;for(let ue=0;ue<V;ue++){let be=ue*P-D;for(let He=0;He<k;He++){let at=He*b-L;se[y]=at*v,se[g]=be*_,se[p]=F,c.push(se.x,se.y,se.z),se[y]=0,se[g]=0,se[p]=M>0?1:-1,u.push(se.x,se.y,se.z),h.push(He/E),h.push(1-ue/R),K+=1}}for(let ue=0;ue<R;ue++)for(let be=0;be<E;be++){let He=d+be+k*ue,at=d+be+k*(ue+1),vt=d+(be+1)+k*(ue+1),Ye=d+(be+1)+k*ue;l.push(He,at,Ye),l.push(at,vt,Ye),W+=6}o.addGroup(f,W,T),f+=W,d+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function jr(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function ni(i){let e={};for(let t=0;t<i.length;t++){let n=jr(i[t]);for(let r in n)e[r]=n[r]}return e}function Z_(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function sd(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}var tg={clone:jr,merge:ni},$_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,K_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Mi=class extends Ti{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$_,this.fragmentShader=K_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=jr(e.uniforms),this.uniformsGroups=Z_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Ga=class extends Et{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new re,this.projectionMatrix=new re,this.projectionMatrixInverse=new re,this.coordinateSystem=Hi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},nr=new C,Hp=new de,Gp=new de,Pt=class extends Ga{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=zr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Fa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return zr*2*Math.atan(Math.tan(Fa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){nr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(nr.x,nr.y).multiplyScalar(-e/nr.z),nr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(nr.x,nr.y).multiplyScalar(-e/nr.z)}getViewSize(e,t){return this.getViewBounds(e,Hp,Gp),t.subVectors(Gp,Hp)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Fa*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},xs=-90,vs=1,Ll=class extends Et{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Pt(xs,vs,e,t);r.layers=this.layers,this.add(r);let s=new Pt(xs,vs,e,t);s.layers=this.layers,this.add(s);let a=new Pt(xs,vs,e,t);a.layers=this.layers,this.add(a);let o=new Pt(xs,vs,e,t);o.layers=this.layers,this.add(o);let l=new Pt(xs,vs,e,t);l.layers=this.layers,this.add(l);let c=new Pt(xs,vs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===Hi)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===za)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Wa=class extends Ut{constructor(e=[],t=Xr,n,r,s,a,o,l,c,u){super(e,t,n,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Dl=class extends Ui{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Wa(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Vr(5,5,5),s=new Mi({name:"CubemapFromEquirect",uniforms:jr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Xt,blending:Vn});s.uniforms.tEquirect.value=t;let a=new ct(r,s),o=t.minFilter;return t.minFilter===rn&&(t.minFilter=ti),new Ll(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}},Qt=class extends Et{constructor(){super(),this.isGroup=!0,this.type="Group"}},J_={type:"move"},Is=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let y of e.hand.values()){let g=t.getJointPose(y,n),p=this._getHandJoint(c,y);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(J_)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Qt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var Xa=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new pe(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},qa=class extends Et{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new di,this.environmentIntensity=1,this.environmentRotation=new di,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ls=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Cl,this.updateRanges=[],this.version=0,this.uuid=Qi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Qi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Qi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},li=new C,Ds=class i{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)li.fromBufferAttribute(this,t),li.applyMatrix4(e),this.setXYZ(t,li.x,li.y,li.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)li.fromBufferAttribute(this,t),li.applyNormalMatrix(e),this.setXYZ(t,li.x,li.y,li.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)li.fromBufferAttribute(this,t),li.transformDirection(e),this.setXYZ(t,li.x,li.y,li.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Ji(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ot(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ji(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ji(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ji(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ji(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),r=ot(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),r=ot(r,this.array),s=ot(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new ke(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var Wp=new C,Xp=new Qe,qp=new Qe,Q_=new C,Yp=new re,pl=new C,yu=new xt,jp=new re,_u=new Vt,Ya=class extends ct{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Au,this.bindMatrix=new re,this.bindMatrixInverse=new re,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new je),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,pl),this.boundingBox.expandByPoint(pl)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new xt),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,pl),this.boundingSphere.expandByPoint(pl)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),yu.copy(this.boundingSphere),yu.applyMatrix4(r),e.ray.intersectsSphere(yu)!==!1&&(jp.copy(r).invert(),_u.copy(e.ray).applyMatrix4(jp),!(this.boundingBox!==null&&_u.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,_u)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Qe,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Au?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===km?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,r=this.geometry;Xp.fromBufferAttribute(r.attributes.skinIndex,e),qp.fromBufferAttribute(r.attributes.skinWeight,e),Wp.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let a=qp.getComponent(s);if(a!==0){let o=Xp.getComponent(s);Yp.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Q_.copy(Wp).applyMatrix4(Yp),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},Us=class extends Et{constructor(){super(),this.isBone=!0,this.type="Bone"}},gn=class extends Ut{constructor(e=null,t=1,n=1,r,s,a,o,l,c=kt,u=kt,h,d){super(null,a,o,l,c,u,r,s,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Zp=new re,ex=new re,ja=class i{constructor(e=[],t=[]){this.uuid=Qi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,r=this.bones.length;n<r;n++)this.boneInverses.push(new re)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new re;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let s=0,a=e.length;s<a;s++){let o=e[s]?e[s].matrixWorld:ex;Zp.multiplyMatrices(o,t[s]),Zp.toArray(n,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new gn(t,e,e,hi,ci);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){let s=e.bones[n],a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new Us),this.bones.push(a),this.boneInverses.push(new re().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let r=0,s=t.length;r<s;r++){let a=t[r];e.bones.push(a.uuid);let o=n[r];e.boneInverses.push(o.toArray())}return e}},ar=class extends ke{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},bs=new re,$p=new re,ml=[],Kp=new je,tx=new re,Ia=new ct,La=new xt,Hr=class extends ct{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ar(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,tx)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new je),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,bs),Kp.copy(e.boundingBox).applyMatrix4(bs),this.boundingBox.union(Kp)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new xt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,bs),La.copy(e.boundingSphere).applyMatrix4(bs),this.boundingSphere.union(La)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Ia.geometry=this.geometry,Ia.material=this.material,Ia.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),La.copy(this.boundingSphere),La.applyMatrix4(n),e.ray.intersectsSphere(La)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,bs),$p.multiplyMatrices(n,bs),Ia.matrixWorld=$p,Ia.raycast(e,ml);for(let a=0,o=ml.length;a<o;a++){let l=ml[a];l.instanceId=s,l.object=this,t.push(l)}ml.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ar(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new gn(new Float32Array(r*this.count),r,this.count,ho,ci));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},xu=new C,ix=new C,nx=new Le,Jt=class{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=xu.subVectors(n,t).cross(ix.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(xu),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||nx.getNormalMatrix(e),r=this.coplanarPoint(xu).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ir=new xt,rx=new de(.5,.5),gl=new C,en=class{constructor(e=new Jt,t=new Jt,n=new Jt,r=new Jt,s=new Jt,a=new Jt){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Hi,n=!1){let r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],h=s[5],d=s[6],f=s[7],m=s[8],y=s[9],g=s[10],p=s[11],v=s[12],_=s[13],x=s[14],S=s[15];if(r[0].setComponents(c-a,f-u,p-m,S-v).normalize(),r[1].setComponents(c+a,f+u,p+m,S+v).normalize(),r[2].setComponents(c+o,f+h,p+y,S+_).normalize(),r[3].setComponents(c-o,f-h,p-y,S-_).normalize(),n)r[4].setComponents(l,d,g,x).normalize(),r[5].setComponents(c-l,f-d,p-g,S-x).normalize();else if(r[4].setComponents(c-l,f-d,p-g,S-x).normalize(),t===Hi)r[5].setComponents(c+l,f+d,p+g,S+x).normalize();else if(t===za)r[5].setComponents(l,d,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ir.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ir.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ir)}intersectsSprite(e){Ir.center.set(0,0,0);let t=rx.distanceTo(e.center);return Ir.radius=.7071067811865476+t,Ir.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ir)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(gl.x=r.normal.x>0?e.max.x:e.min.x,gl.y=r.normal.y>0?e.max.y:e.min.y,gl.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(gl)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},dn=new re,fn=new en,Ul=class i{constructor(){this.coordinateSystem=Hi}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let r=t.cameras[n];if(dn.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),fn.setFromProjectionMatrix(dn,r.coordinateSystem,r.reversedDepth),fn.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let r=t.cameras[n];if(dn.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),fn.setFromProjectionMatrix(dn,r.coordinateSystem,r.reversedDepth),fn.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let r=t.cameras[n];if(dn.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),fn.setFromProjectionMatrix(dn,r.coordinateSystem,r.reversedDepth),fn.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let r=t.cameras[n];if(dn.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),fn.setFromProjectionMatrix(dn,r.coordinateSystem,r.reversedDepth),fn.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let r=t.cameras[n];if(dn.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),fn.setFromProjectionMatrix(dn,r.coordinateSystem,r.reversedDepth),fn.containsPoint(e))return!0}return!1}clone(){return new i}};function vu(i,e){return i-e}function sx(i,e){return i.z-e.z}function ax(i,e){return e.z-i.z}var Lu=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,r){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=r}reset(){this.list.length=0,this.index=0}},bi=new re,ox=new pe(1,1,1),Jp=new en,lx=new Ul,yl=new je,Lr=new xt,Da=new C,Qp=new C,cx=new C,bu=new Lu,Kt=new ct,_l=[];function hx(i,e,t=0){let n=e.itemSize;if(i.isInterleavedBufferAttribute||i.array.constructor!==e.array.constructor){let r=i.count;for(let s=0;s<r;s++)for(let a=0;a<n;a++)e.setComponent(s+t,a,i.getComponent(s,a))}else e.array.set(i.array,t*n);e.needsUpdate=!0}function Dr(i,e){if(i.constructor!==e.constructor){let t=Math.min(i.length,e.length);for(let n=0;n<t;n++)e[n]=i[n]}else{let t=Math.min(i.length,e.length);e.set(new i.constructor(i.buffer,0,t))}}var Ns=class extends ct{constructor(e,t,n=t*2,r){super(new dt,r),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._multiDrawInstances=null,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4),n=new gn(t,e,e,hi,ci);this._matricesTexture=n}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);let t=new Uint32Array(e*e),n=new gn(t,e,e,uo,Gn);this._indirectTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);let t=new Float32Array(e*e*4).fill(1),n=new gn(t,e,e,hi,ci);n.colorSpace=qe.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){let t=this.geometry,n=this._maxVertexCount,r=this._maxIndexCount;if(this._geometryInitialized===!1){for(let s in e.attributes){let a=e.getAttribute(s),{array:o,itemSize:l,normalized:c}=a,u=new o.constructor(n*l),h=new ke(u,l,c);t.setAttribute(s,h)}if(e.getIndex()!==null){let s=n>65535?new Uint32Array(r):new Uint16Array(r);t.setIndex(new ke(s,1))}this._geometryInitialized=!0}}_validateGeometry(e){let t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(let n in t.attributes){if(!e.hasAttribute(n))throw new Error(`THREE.BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);let r=e.getAttribute(n),s=t.getAttribute(n);if(r.itemSize!==s.itemSize||r.normalized!==s.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(e){let t=this._instanceInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${e}. Instance is either out of range or has been deleted.`)}validateGeometryId(e){let t=this._geometryInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${e}. Geometry is either out of range or has been deleted.`)}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new je);let e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let n=0,r=t.length;n<r;n++){if(t[n].active===!1)continue;let s=t[n].geometryIndex;this.getMatrixAt(n,bi),this.getBoundingBoxAt(s,yl).applyMatrix4(bi),e.union(yl)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xt);let e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let n=0,r=t.length;n<r;n++){if(t[n].active===!1)continue;let s=t[n].geometryIndex;this.getMatrixAt(n,bi),this.getBoundingSphereAt(s,Lr).applyMatrix4(bi),e.union(Lr)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("THREE.BatchedMesh: Maximum item count reached.");let n={visible:!0,active:!0,geometryIndex:e},r=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(vu),r=this._availableInstanceIds.shift(),this._instanceInfo[r]=n):(r=this._instanceInfo.length,this._instanceInfo.push(n));let s=this._matricesTexture;bi.identity().toArray(s.image.data,r*16),s.needsUpdate=!0;let a=this._colorsTexture;return a&&(ox.toArray(a.image.data,r*4),a.needsUpdate=!0),this._visibilityChanged=!0,r}addGeometry(e,t=-1,n=-1){this._initializeGeometry(e),this._validateGeometry(e);let r={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},s=this._geometryInfo;r.vertexStart=this._nextVertexStart,r.reservedVertexCount=t===-1?e.getAttribute("position").count:t;let a=e.getIndex();if(a!==null&&(r.indexStart=this._nextIndexStart,r.reservedIndexCount=n===-1?a.count:n),r.indexStart!==-1&&r.indexStart+r.reservedIndexCount>this._maxIndexCount||r.vertexStart+r.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(vu),l=this._availableGeometryIds.shift(),s[l]=r):(l=this._geometryCount,this._geometryCount++,s.push(r)),this.setGeometryAt(l,e),this._nextIndexStart=r.indexStart+r.reservedIndexCount,this._nextVertexStart=r.vertexStart+r.reservedVertexCount,l}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);let n=this.geometry,r=n.getIndex()!==null,s=n.getIndex(),a=t.getIndex(),o=this._geometryInfo[e];if(r&&a.count>o.reservedIndexCount||t.attributes.position.count>o.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");let l=o.vertexStart,c=o.reservedVertexCount;o.vertexCount=t.getAttribute("position").count;for(let u in n.attributes){let h=t.getAttribute(u),d=n.getAttribute(u);hx(h,d,l);let f=h.itemSize;for(let m=h.count,y=c;m<y;m++){let g=l+m;for(let p=0;p<f;p++)d.setComponent(g,p,0)}d.needsUpdate=!0,d.addUpdateRange(l*f,c*f)}if(r){let u=o.indexStart,h=o.reservedIndexCount;o.indexCount=t.getIndex().count;for(let d=0;d<a.count;d++)s.setX(u+d,l+a.getX(d));for(let d=a.count,f=h;d<f;d++)s.setX(u+d,l);s.needsUpdate=!0,s.addUpdateRange(u,o.reservedIndexCount)}return o.start=r?o.indexStart:o.vertexStart,o.count=r?o.indexCount:o.vertexCount,o.boundingBox=null,t.boundingBox!==null&&(o.boundingBox=t.boundingBox.clone()),o.boundingSphere=null,t.boundingSphere!==null&&(o.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){let t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;let n=this._instanceInfo;for(let r=0,s=n.length;r<s;r++)n[r].active&&n[r].geometryIndex===e&&this.deleteInstance(r);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){return this.validateInstanceId(e),this._instanceInfo[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this}optimize(){let e=0,t=0,n=this._geometryInfo,r=n.map((a,o)=>o).sort((a,o)=>n[a].vertexStart-n[o].vertexStart),s=this.geometry;for(let a=0,o=n.length;a<o;a++){let l=r[a],c=n[l];if(c.active!==!1){if(s.index!==null){if(c.indexStart!==t){let{indexStart:u,vertexStart:h,reservedIndexCount:d}=c,f=s.index,m=f.array,y=e-h;for(let g=u;g<u+d;g++)m[g]=m[g]+y;f.array.copyWithin(t,u,u+d),f.addUpdateRange(t,d),c.indexStart=t}t+=c.reservedIndexCount}if(c.vertexStart!==e){let{vertexStart:u,reservedVertexCount:h}=c,d=s.attributes;for(let f in d){let m=d[f],{array:y,itemSize:g}=m;y.copyWithin(e*g,u*g,(u+h)*g),m.addUpdateRange(e*g,h*g)}c.vertexStart=e}e+=c.reservedVertexCount,c.start=s.index?c.indexStart:c.vertexStart,this._nextIndexStart=s.index?c.indexStart+c.reservedIndexCount:0,this._nextVertexStart=c.vertexStart+c.reservedVertexCount}}return this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;let n=this.geometry,r=this._geometryInfo[e];if(r.boundingBox===null){let s=new je,a=n.index,o=n.attributes.position;for(let l=r.start,c=r.start+r.count;l<c;l++){let u=l;a&&(u=a.getX(u)),s.expandByPoint(Da.fromBufferAttribute(o,u))}r.boundingBox=s}return t.copy(r.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;let n=this.geometry,r=this._geometryInfo[e];if(r.boundingSphere===null){let s=new xt;this.getBoundingBoxAt(e,yl),yl.getCenter(s.center);let a=n.index,o=n.attributes.position,l=0;for(let c=r.start,u=r.start+r.count;c<u;c++){let h=c;a&&(h=a.getX(h)),Da.fromBufferAttribute(o,h),l=Math.max(l,s.center.distanceToSquared(Da))}s.radius=Math.sqrt(l),r.boundingSphere=s}return t.copy(r.boundingSphere),t}setMatrixAt(e,t){this.validateInstanceId(e);let n=this._matricesTexture,r=this._matricesTexture.image.data;return t.toArray(r,e*16),n.needsUpdate=!0,this}getMatrixAt(e,t){return this.validateInstanceId(e),t.fromArray(this._matricesTexture.image.data,e*16)}setColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null&&this._initColorsTexture(),t.toArray(this._colorsTexture.image.data,e*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(e,t){return this.validateInstanceId(e),t.fromArray(this._colorsTexture.image.data,e*4)}setVisibleAt(e,t){return this.validateInstanceId(e),this._instanceInfo[e].visible===t?this:(this._instanceInfo[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){return this.validateInstanceId(e),this._instanceInfo[e].visible}setGeometryIdAt(e,t){return this.validateInstanceId(e),this.validateGeometryId(t),this._instanceInfo[e].geometryIndex=t,this}getGeometryIdAt(e){return this.validateInstanceId(e),this._instanceInfo[e].geometryIndex}getGeometryRangeAt(e,t={}){this.validateGeometryId(e);let n=this._geometryInfo[e];return t.vertexStart=n.vertexStart,t.vertexCount=n.vertexCount,t.reservedVertexCount=n.reservedVertexCount,t.indexStart=n.indexStart,t.indexCount=n.indexCount,t.reservedIndexCount=n.reservedIndexCount,t.start=n.start,t.count=n.count,t}setInstanceCount(e){let t=this._availableInstanceIds,n=this._instanceInfo;for(t.sort(vu);t[t.length-1]===n.length-1;)n.pop(),t.pop();if(e<n.length)throw new Error(`BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);let r=new Int32Array(e),s=new Int32Array(e);Dr(this._multiDrawCounts,r),Dr(this._multiDrawStarts,s),this._multiDrawCounts=r,this._multiDrawStarts=s,this._maxInstanceCount=e;let a=this._indirectTexture,o=this._matricesTexture,l=this._colorsTexture;a.dispose(),this._initIndirectTexture(),Dr(a.image.data,this._indirectTexture.image.data),o.dispose(),this._initMatricesTexture(),Dr(o.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),Dr(l.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){let n=[...this._geometryInfo].filter(o=>o.active);if(Math.max(...n.map(o=>o.vertexStart+o.reservedVertexCount))>e)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(l=>l.indexStart+l.reservedIndexCount))>t)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);let s=this.geometry;s.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new dt,this._initializeGeometry(s));let a=this.geometry;s.index&&Dr(s.index.array,a.index.array);for(let o in s.attributes)Dr(s.attributes[o].array,a.attributes[o].array)}raycast(e,t){let n=this._instanceInfo,r=this._geometryInfo,s=this.matrixWorld,a=this.geometry;Kt.material=this.material,Kt.geometry.index=a.index,Kt.geometry.attributes=a.attributes,Kt.geometry.boundingBox===null&&(Kt.geometry.boundingBox=new je),Kt.geometry.boundingSphere===null&&(Kt.geometry.boundingSphere=new xt);for(let o=0,l=n.length;o<l;o++){if(!n[o].visible||!n[o].active)continue;let c=n[o].geometryIndex,u=r[c];Kt.geometry.setDrawRange(u.start,u.count),this.getMatrixAt(o,Kt.matrixWorld).premultiply(s),this.getBoundingBoxAt(c,Kt.geometry.boundingBox),this.getBoundingSphereAt(c,Kt.geometry.boundingSphere),Kt.raycast(e,_l);for(let h=0,d=_l.length;h<d;h++){let f=_l[h];f.object=this,f.batchId=o,t.push(f)}_l.length=0}Kt.material=null,Kt.geometry.index=null,Kt.geometry.attributes={},Kt.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._availableInstanceIds=e._availableInstanceIds.slice(),this._availableGeometryIds=e._availableGeometryIds.slice(),this._nextIndexStart=e._nextIndexStart,this._nextVertexStart=e._nextVertexStart,this._geometryCount=e._geometryCount,this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._indirectTexture=e._indirectTexture.clone(),this._indirectTexture.image.data=this._indirectTexture.image.data.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null)}onBeforeRender(e,t,n,r,s){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;let a=r.getIndex(),o=a===null?1:a.array.BYTES_PER_ELEMENT,l=this._instanceInfo,c=this._multiDrawStarts,u=this._multiDrawCounts,h=this._geometryInfo,d=this.perObjectFrustumCulled,f=this._indirectTexture,m=f.image.data,y=n.isArrayCamera?lx:Jp;d&&!n.isArrayCamera&&(bi.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),Jp.setFromProjectionMatrix(bi,n.coordinateSystem,n.reversedDepth));let g=0;if(this.sortObjects){bi.copy(this.matrixWorld).invert(),Da.setFromMatrixPosition(n.matrixWorld).applyMatrix4(bi),Qp.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(bi);for(let _=0,x=l.length;_<x;_++)if(l[_].visible&&l[_].active){let S=l[_].geometryIndex;this.getMatrixAt(_,bi),this.getBoundingSphereAt(S,Lr).applyMatrix4(bi);let M=!1;if(d&&(M=!y.intersectsSphere(Lr,n)),!M){let E=h[S],R=cx.subVectors(Lr.center,Da).dot(Qp);bu.push(E.start,E.count,R,_)}}let p=bu.list,v=this.customSort;v===null?p.sort(s.transparent?ax:sx):v.call(this,p,n);for(let _=0,x=p.length;_<x;_++){let S=p[_];c[g]=S.start*o,u[g]=S.count,m[g]=S.index,g++}bu.reset()}else for(let p=0,v=l.length;p<v;p++)if(l[p].visible&&l[p].active){let _=l[p].geometryIndex,x=!1;if(d&&(this.getMatrixAt(p,bi),this.getBoundingSphereAt(_,Lr).applyMatrix4(bi),x=!y.intersectsSphere(Lr,n)),!x){let S=h[_];c[g]=S.start*o,u[g]=S.count,m[g]=p,g++}}f.needsUpdate=!0,this._multiDrawCount=g,this._visibilityChanged=!1}onBeforeShadow(e,t,n,r,s,a){this.onBeforeRender(e,null,r,s,a)}},Fn=class extends Ti{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new pe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Nl=new C,Fl=new C,em=new re,Ua=new Vt,xl=new xt,Su=new C,tm=new C,yn=class extends Et{constructor(e=new dt,t=new Fn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Nl.fromBufferAttribute(t,r-1),Fl.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Nl.distanceTo(Fl);e.setAttribute("lineDistance",new ei(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),xl.copy(n.boundingSphere),xl.applyMatrix4(r),xl.radius+=s,e.ray.intersectsSphere(xl)===!1)return;em.copy(r).invert(),Ua.copy(e.ray).applyMatrix4(em);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){let f=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let y=f,g=m-1;y<g;y+=c){let p=u.getX(y),v=u.getX(y+1),_=vl(this,e,Ua,l,p,v,y);_&&t.push(_)}if(this.isLineLoop){let y=u.getX(m-1),g=u.getX(f),p=vl(this,e,Ua,l,y,g,m-1);p&&t.push(p)}}else{let f=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let y=f,g=m-1;y<g;y+=c){let p=vl(this,e,Ua,l,y,y+1,y);p&&t.push(p)}if(this.isLineLoop){let y=vl(this,e,Ua,l,m-1,f,m-1);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function vl(i,e,t,n,r,s,a){let o=i.geometry.attributes.position;if(Nl.fromBufferAttribute(o,r),Fl.fromBufferAttribute(o,s),t.distanceSqToSegment(Nl,Fl,Su,tm)>n)return;Su.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Su);if(!(c<e.near||c>e.far))return{distance:c,point:tm.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var im=new C,nm=new C,tn=class extends yn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)im.fromBufferAttribute(t,r),nm.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+im.distanceTo(nm);e.setAttribute("lineDistance",new ei(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},or=class extends yn{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Gi=class extends Ti{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new pe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},rm=new re,Du=new Vt,bl=new xt,Sl=new C,wi=class extends Et{constructor(e=new dt,t=new Gi){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),bl.copy(n.boundingSphere),bl.applyMatrix4(r),bl.radius+=s,e.ray.intersectsSphere(bl)===!1)return;rm.copy(r).invert(),Du.copy(e.ray).applyMatrix4(rm);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null){let d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=d,y=f;m<y;m++){let g=c.getX(m);Sl.fromBufferAttribute(h,g),sm(Sl,g,l,r,e,t,this)}}else{let d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let m=d,y=f;m<y;m++)Sl.fromBufferAttribute(h,m),sm(Sl,m,l,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function sm(i,e,t,n,r,s,a){let o=Du.distanceSqToPoint(i);if(o<t){let l=new C;Du.closestPointToPoint(i,l),l.applyMatrix4(n);let c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Fs=class extends Ut{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Za=class extends Ut{constructor(e,t,n=Gn,r,s,a,o=kt,l=kt,c,u=As,h=1){if(u!==As&&u!==Xs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:h};super(d,r,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new kr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},$a=class extends Ut{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var Gr=class i extends dt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,u=l+1,h=e/o,d=t/l,f=[],m=[],y=[],g=[];for(let p=0;p<u;p++){let v=p*d-a;for(let _=0;_<c;_++){let x=_*h-s;m.push(x,-v,0),y.push(0,0,1),g.push(_/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let v=0;v<o;v++){let _=v+c*p,x=v+c*(p+1),S=v+1+c*(p+1),M=v+1+c*p;f.push(_,x,M),f.push(x,S,M)}this.setIndex(f),this.setAttribute("position",new ei(m,3)),this.setAttribute("normal",new ei(y,3)),this.setAttribute("uv",new ei(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var lr=class extends Ti{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new pe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ed,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ei=class extends lr{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new de(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Oe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new pe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new pe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new pe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Ol=class extends Ti{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Hm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Bl=class extends Ti{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Tl(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function ux(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function dx(i){function e(r,s){return i[r]-i[s]}let t=i.length,n=new Array(t);for(let r=0;r!==t;++r)n[r]=r;return n.sort(e),n}function am(i,e,t){let n=i.length,r=new i.constructor(n);for(let s=0,a=0;a!==n;++s){let o=t[s]*e;for(let l=0;l!==e;++l)r[a++]=i[o+l]}return r}function ig(i,e,t,n){let r=1,s=i[0];for(;s!==void 0&&s[n]===void 0;)s=i[r++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push(...a)),s=i[r++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=i[r++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=i[r++];while(s!==void 0)}var On=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];i:{e:{let a;t:{n:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break n;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break i}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},zl=class extends On{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Cu,endingEnd:Cu}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ru:s=e,o=2*t-n;break;case Pu:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ru:a=e,l=2*n-t;break;case Pu:a=1,l=n+r[1]-r[0];break;default:a=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-t)/(r-t),y=m*m,g=y*m,p=-d*g+2*d*y-d*m,v=(1+d)*g+(-1.5-2*d)*y+(-.5+d)*m+1,_=(-1-f)*g+(1.5+f)*y+.5*m,x=f*g-f*y;for(let S=0;S!==o;++S)s[S]=p*a[u+S]+v*a[c+S]+_*a[l+S]+x*a[h+S];return s}},kl=class extends On{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(r-t),h=1-u;for(let d=0;d!==o;++d)s[d]=a[c+d]*h+a[l+d]*u;return s}},Vl=class extends On{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Ai=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Tl(t,this.TimeBufferType),this.values=Tl(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Tl(e.times,Array),values:Tl(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Vl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new kl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new zl(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Or:t=this.InterpolantFactoryMethodDiscrete;break;case Br:t=this.InterpolantFactoryMethodLinear;break;case wl:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Or;case this.InterpolantFactoryMethodLinear:return Br;case this.InterpolantFactoryMethodSmooth:return wl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&ux(r))for(let o=0,l=r.length;o!==l;++o){let c=r[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===wl,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(r)l=!0;else{let h=o*n,d=h-n,f=h+n;for(let m=0;m!==n;++m){let y=t[h+m];if(y!==t[d+m]||y!==t[f+m]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let h=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Ai.prototype.ValueTypeName="";Ai.prototype.TimeBufferType=Float32Array;Ai.prototype.ValueBufferType=Float32Array;Ai.prototype.DefaultInterpolation=Br;var Bn=class extends Ai{constructor(e,t,n){super(e,t,n)}};Bn.prototype.ValueTypeName="bool";Bn.prototype.ValueBufferType=Array;Bn.prototype.DefaultInterpolation=Or;Bn.prototype.InterpolantFactoryMethodLinear=void 0;Bn.prototype.InterpolantFactoryMethodSmooth=void 0;var Ka=class extends Ai{constructor(e,t,n,r){super(e,t,n,r)}};Ka.prototype.ValueTypeName="color";var _n=class extends Ai{constructor(e,t,n,r){super(e,t,n,r)}};_n.prototype.ValueTypeName="number";var Hl=class extends On{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(r-t),c=e*o;for(let u=c+o;c!==u;c+=4)ii.slerpFlat(s,0,a,c-o,a,c,l);return s}},xn=class extends Ai{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Hl(this.times,this.values,this.getValueSize(),e)}};xn.prototype.ValueTypeName="quaternion";xn.prototype.InterpolantFactoryMethodSmooth=void 0;var zn=class extends Ai{constructor(e,t,n){super(e,t,n)}};zn.prototype.ValueTypeName="string";zn.prototype.ValueBufferType=Array;zn.prototype.DefaultInterpolation=Or;zn.prototype.InterpolantFactoryMethodLinear=void 0;zn.prototype.InterpolantFactoryMethodSmooth=void 0;var vn=class extends Ai{constructor(e,t,n,r){super(e,t,n,r)}};vn.prototype.ValueTypeName="vector";var Ja=class{constructor(e="",t=-1,n=[],r=Vm){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=Qi(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,r=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(px(n[a]).scale(r));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){let t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,a=n.length;s!==a;++s)t.push(Ai.toJSON(n[s]));return r}static CreateFromMorphTargetSequence(e,t,n,r){let s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);let u=dx(l);l=am(l,1,u),c=am(c,1,u),!r&&l[0]===0&&(l.push(s),c.push(c[0])),a.push(new _n(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let r=e;n=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<n.length;r++)if(n[r].name===t)return n[r];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let r={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],u=c.name.match(s);if(u&&u.length>1){let h=u[1],d=r[h];d||(r[h]=d=[]),d.push(c)}}let a=[];for(let o in r)a.push(this.CreateFromMorphTargetSequence(o,r[o],t,n));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(h,d,f,m,y){if(f.length!==0){let g=[],p=[];ig(f,g,p,m),g.length!==0&&y.push(new h(d,g,p))}},r=[],s=e.name||"default",a=e.fps||30,o=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let h=0;h<c.length;h++){let d=c[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let f={},m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let y=0;y<d[m].morphTargets.length;y++)f[d[m].morphTargets[y]]=-1;for(let y in f){let g=[],p=[];for(let v=0;v!==d[m].morphTargets.length;++v){let _=d[m];g.push(_.time),p.push(_.morphTarget===y?1:0)}r.push(new _n(".morphTargetInfluence["+y+"]",g,p))}l=f.length*a}else{let f=".bones["+t[h].name+"]";n(vn,f+".position",d,"pos",r),n(xn,f+".quaternion",d,"rot",r),n(vn,f+".scale",d,"scl",r)}}return r.length===0?null:new this(s,l,r,o)}resetDuration(){let e=this.tracks,t=0;for(let n=0,r=e.length;n!==r;++n){let s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function fx(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return _n;case"vector":case"vector2":case"vector3":case"vector4":return vn;case"color":return Ka;case"quaternion":return xn;case"bool":case"boolean":return Bn;case"string":return zn}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function px(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=fx(i.type);if(i.times===void 0){let t=[],n=[];ig(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var mn={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},Os=class{constructor(e,t,n){let r=this,s=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){let h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){let f=c[h],m=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},cr=new Os,Wi=class{constructor(e){this.manager=e!==void 0?e:cr,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Wi.DEFAULT_MATERIAL_NAME="__DEFAULT";var Un={},Uu=class extends Error{constructor(e,t){super(e),this.response=t}},nn=class extends Wi{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=mn.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Un[e]!==void 0){Un[e].push({onLoad:t,onProgress:n,onError:r});return}Un[e]=[],Un[e].push({onLoad:t,onProgress:n,onError:r});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let u=Un[e],h=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0,y=0,g=new ReadableStream({start(p){v();function v(){h.read().then(({done:_,value:x})=>{if(_)p.close();else{y+=x.byteLength;let S=new ProgressEvent("progress",{lengthComputable:m,loaded:y,total:f});for(let M=0,E=u.length;M<E;M++){let R=u[M];R.onProgress&&R.onProgress(S)}p.enqueue(x),v()}},_=>{p.error(_)})}}});return new Response(g)}else throw new Uu(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o==="")return c.text();{let h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(m=>f.decode(m))}}}).then(c=>{mn.add(`file:${e}`,c);let u=Un[e];delete Un[e];for(let h=0,d=u.length;h<d;h++){let f=u[h];f.onLoad&&f.onLoad(c)}}).catch(c=>{let u=Un[e];if(u===void 0)throw this.manager.itemError(e),c;delete Un[e];for(let h=0,d=u.length;h<d;h++){let f=u[h];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Ss=new WeakMap,Gl=class extends Wi{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=mn.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let h=Ss.get(a);h===void 0&&(h=[],Ss.set(a,h)),h.push({onLoad:t,onError:r})}return a}let o=Cs("img");function l(){u(),t&&t(this);let h=Ss.get(this)||[];for(let d=0;d<h.length;d++){let f=h[d];f.onLoad&&f.onLoad(this)}Ss.delete(this),s.manager.itemEnd(e)}function c(h){u(),r&&r(h),mn.remove(`image:${e}`);let d=Ss.get(this)||[];for(let f=0;f<d.length;f++){let m=d[f];m.onError&&m.onError(h)}Ss.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),mn.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}};var Qa=class extends Wi{constructor(e){super(e)}load(e,t,n,r){let s=new Ut,a=new Gl(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}},Bs=class extends Et{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new pe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}};var Tu=new re,om=new C,lm=new C,eo=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new de(512,512),this.mapType=Xi,this.map=null,this.mapPass=null,this.matrix=new re,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new en,this._frameExtents=new de(1,1),this._viewportCount=1,this._viewports=[new Qe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;om.setFromMatrixPosition(e.matrixWorld),t.position.copy(om),lm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(lm),t.updateMatrixWorld(),Tu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Tu,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Tu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Nu=class extends eo{constructor(){super(new Pt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=zr*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},to=class extends Bs{constructor(e,t,n=0,r=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.target=new Et,this.distance=n,this.angle=r,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new Nu}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},cm=new re,Na=new C,Mu=new C,Fu=class extends eo{constructor(){super(new Pt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new de(4,2),this._viewportCount=6,this._viewports=[new Qe(2,1,1,1),new Qe(0,1,1,1),new Qe(3,1,1,1),new Qe(1,1,1,1),new Qe(3,0,1,1),new Qe(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,r=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Na.setFromMatrixPosition(e.matrixWorld),n.position.copy(Na),Mu.copy(n.position),Mu.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Mu),n.updateMatrixWorld(),r.makeTranslation(-Na.x,-Na.y,-Na.z),cm.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(cm,n.coordinateSystem,n.reversedDepth)}},io=class extends Bs{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new Fu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},bn=class extends Ga{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ou=class extends eo{constructor(){super(new bn(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},no=class extends Bs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.target=new Et,this.shadow=new Ou}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var kn=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var wu=new WeakMap,ro=class extends Wi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=mn.get(`image-bitmap:${e}`);if(a!==void 0){if(s.manager.itemStart(e),a.then){a.then(c=>{if(wu.has(a)===!0)r&&r(wu.get(a)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(c),s.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return mn.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){r&&r(c),wu.set(l,c),mn.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});mn.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Wl=class extends Pt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},zs=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};var ad="\\[\\]\\.:\\/",mx=new RegExp("["+ad+"]","g"),od="[^"+ad+"]",gx="[^"+ad.replace("\\.","")+"]",yx=/((?:WC+[\/:])*)/.source.replace("WC",od),_x=/(WCOD+)?/.source.replace("WCOD",gx),xx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",od),vx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",od),bx=new RegExp("^"+yx+_x+xx+vx+"$"),Sx=["material","materials","bones","map"],Bu=class{constructor(e,t,n){let r=n||mt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},mt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(mx,"")}static parseTrackName(e){let t=bx.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);Sx.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[r];if(a===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};mt.Composite=Bu;mt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};mt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};mt.prototype.GetterByBindingType=[mt.prototype._getValue_direct,mt.prototype._getValue_array,mt.prototype._getValue_arrayElement,mt.prototype._getValue_toArray];mt.prototype.SetterByBindingTypeAndVersioning=[[mt.prototype._setValue_direct,mt.prototype._setValue_direct_setNeedsUpdate,mt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_array,mt.prototype._setValue_array_setNeedsUpdate,mt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_arrayElement,mt.prototype._setValue_arrayElement_setNeedsUpdate,mt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_fromArray,mt.prototype._setValue_fromArray_setNeedsUpdate,mt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var IE=new Float32Array(1);var hm=new re,Wr=class{constructor(e,t,n=0,r=1/0){this.ray=new Vt(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Ps,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return hm.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(hm),this}intersectObject(e,t=!0,n=[]){return zu(e,this,n,t),n.sort(um),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)zu(e[r],this,n,t);return n.sort(um),n}};function um(i,e){return i.distance-e.distance}function zu(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){let s=i.children;for(let a=0,o=s.length;a<o;a++)zu(s[a],e,t,!0)}}var so=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Oe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Oe(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var ao=class i{constructor(e,t,n,r){i.prototype.isMatrix2=!0,this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}},dm=new de,oo=class{constructor(e=new de(1/0,1/0),t=new de(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=dm.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,dm).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},fm=new C,Ml=new C,Ts=new C,Ms=new C,Eu=new C,Tx=new C,Mx=new C,pi=class{constructor(e=new C,t=new C){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){fm.subVectors(e,this.start),Ml.subVectors(this.end,this.start);let n=Ml.dot(Ml),s=Ml.dot(fm)/n;return t&&(s=Oe(s,0,1)),s}closestPointToPoint(e,t,n){let r=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(r).add(this.start)}distanceSqToLine3(e,t=Tx,n=Mx){let r=10000000000000001e-32,s,a,o=this.start,l=e.start,c=this.end,u=e.end;Ts.subVectors(c,o),Ms.subVectors(u,l),Eu.subVectors(o,l);let h=Ts.dot(Ts),d=Ms.dot(Ms),f=Ms.dot(Eu);if(h<=r&&d<=r)return t.copy(o),n.copy(l),t.sub(n),t.dot(t);if(h<=r)s=0,a=f/d,a=Oe(a,0,1);else{let m=Ts.dot(Eu);if(d<=r)a=0,s=Oe(-m/h,0,1);else{let y=Ts.dot(Ms),g=h*d-y*y;g!==0?s=Oe((y*f-m*d)/g,0,1):s=0,a=(y*s+f)/d,a<0?(a=0,s=Oe(-m/h,0,1)):a>1&&(a=1,s=Oe((y-m)/h,0,1))}}return t.copy(o).add(Ts.multiplyScalar(s)),n.copy(l).add(Ms.multiplyScalar(a)),t.sub(n),t.dot(t)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};function wx(i,e){let t=i.image&&i.image.width?i.image.width/i.image.height:1;return t>e?(i.repeat.x=1,i.repeat.y=t/e,i.offset.x=0,i.offset.y=(1-i.repeat.y)/2):(i.repeat.x=e/t,i.repeat.y=1,i.offset.x=(1-i.repeat.x)/2,i.offset.y=0),i}function Ex(i,e){let t=i.image&&i.image.width?i.image.width/i.image.height:1;return t>e?(i.repeat.x=e/t,i.repeat.y=1,i.offset.x=(1-i.repeat.x)/2,i.offset.y=0):(i.repeat.x=1,i.repeat.y=t/e,i.offset.x=0,i.offset.y=(1-i.repeat.y)/2),i}function Ax(i){return i.repeat.x=1,i.repeat.y=1,i.offset.x=0,i.offset.y=0,i}function Oc(i,e,t,n){let r=Cx(n);switch(t){case Ku:return i*e;case ho:return i*e/r.components*r.byteLength;case uo:return i*e/r.components*r.byteLength;case oc:return i*e*2/r.components*r.byteLength;case lc:return i*e*2/r.components*r.byteLength;case Ju:return i*e*3/r.components*r.byteLength;case hi:return i*e*4/r.components*r.byteLength;case fo:return i*e*4/r.components*r.byteLength;case po:case mo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case go:case yo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case hc:case dc:return Math.max(i,16)*Math.max(e,8)/4;case cc:case uc:return Math.max(i,8)*Math.max(e,8)/2;case fc:case pc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case mc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case gc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case yc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case _c:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case xc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case vc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case bc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Sc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Tc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Mc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case wc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ec:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ac:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Cc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Rc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Pc:case Ic:case Lc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Dc:case Uc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Nc:case Fc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Cx(i){switch(i){case Xi:case Yu:return{byteLength:1,components:1};case Hs:case ju:case Gs:return{byteLength:2,components:1};case sc:case ac:return{byteLength:2,components:4};case Gn:case rc:case ci:return{byteLength:4,components:1};case Zu:case $u:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}var ks=class{static contain(e,t){return wx(e,t)}static cover(e,t){return Ex(e,t)}static fill(e){return Ax(e)}static getByteLength(e,t,n,r){return Oc(e,t,n,r)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Eg(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Ux(i){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,h=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,l,c){let u=l.array,h=l.updateRanges;if(i.bindBuffer(c,o),h.length===0)i.bufferSubData(c,0,u);else{h.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<h.length;f++){let m=h[d],y=h[f];y.start<=m.start+m.count+1?m.count=Math.max(m.count,y.start+y.count-m.start):(++d,h[d]=y)}h.length=d+1;for(let f=0,m=h.length;f<m;f++){let y=h[f];i.bufferSubData(c,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var Nx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Fx=`#ifdef USE_ALPHAHASH
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
#endif`,Ox=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,kx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Vx=`#ifdef USE_AOMAP
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
#endif`,Hx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gx=`#ifdef USE_BATCHING
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
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Wx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Xx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Yx=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,jx=`#ifdef USE_IRIDESCENCE
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
#endif`,Zx=`#ifdef USE_BUMPMAP
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
#endif`,$x=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Kx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Jx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ev=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,tv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,iv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,nv=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,rv=`#define PI 3.141592653589793
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
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
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
} // validated`,sv=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,av=`vec3 transformedNormal = objectNormal;
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
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ov=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,lv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,uv="gl_FragColor = linearToOutputTexel( gl_FragColor );",dv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,fv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,pv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,mv=`#ifdef USE_ENVMAP
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
#endif`,gv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,yv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,_v=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,bv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sv=`#ifdef USE_GRADIENTMAP
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
}`,Tv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Mv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,wv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ev=`uniform bool receiveShadow;
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
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
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
#endif`,Av=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
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
	#endif
#endif`,Cv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Pv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Iv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Lv=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
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
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
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
#endif`,Dv=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
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
		vec3 iridescenceF0;
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
		float v = 0.5 / ( gv + gl );
		return saturate(v);
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
	vec3 f0 = material.specularColor;
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
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
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
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
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
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
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
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Uv=`
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
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
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
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Nv=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Fv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ov=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Bv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Vv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Hv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Gv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Wv=`#if defined( USE_POINTS_UV )
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
#endif`,Xv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,qv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Yv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,jv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Zv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$v=`#ifdef USE_MORPHTARGETS
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
#endif`,Kv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Qv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,eb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ib=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,nb=`#ifdef USE_NORMALMAP
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
#endif`,rb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ab=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ob=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cb=`vec3 packNormalToRGB( const in vec3 normal ) {
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
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,hb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ub=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,db=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,fb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,pb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,mb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,gb=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
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
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
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
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
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
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,yb=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
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
#endif`,_b=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
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
#endif`,xb=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
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
	#if NUM_POINT_LIGHT_SHADOWS > 0
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
}`,vb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,bb=`#ifdef USE_SKINNING
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
#endif`,Sb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Tb=`#ifdef USE_SKINNING
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
#endif`,Mb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,wb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Eb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ab=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Cb=`#ifdef USE_TRANSMISSION
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
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Rb=`#ifdef USE_TRANSMISSION
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
#endif`,Pb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ib=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Db=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Ub=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Nb=`uniform sampler2D t2D;
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
}`,Fb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ob=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kb=`#include <common>
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
}`,Vb=`#if DEPTH_PACKING == 3200
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
}`,Hb=`#define DISTANCE
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
}`,Gb=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Wb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Xb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qb=`uniform float scale;
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
}`,Yb=`uniform vec3 diffuse;
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
}`,jb=`#include <common>
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
}`,Zb=`uniform vec3 diffuse;
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
}`,$b=`#define LAMBERT
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
}`,Kb=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
}`,Jb=`#define MATCAP
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
}`,Qb=`#define MATCAP
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
}`,eS=`#define NORMAL
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
}`,tS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
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
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,iS=`#define PHONG
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
}`,nS=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
}`,rS=`#define STANDARD
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
}`,sS=`#define STANDARD
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
#include <packing>
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
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
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
}`,aS=`#define TOON
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
}`,oS=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
}`,lS=`uniform float size;
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
}`,cS=`uniform vec3 diffuse;
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
}`,hS=`#include <common>
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
}`,uS=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
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
}`,dS=`uniform float rotation;
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
}`,fS=`uniform vec3 diffuse;
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
}`,Xe={alphahash_fragment:Nx,alphahash_pars_fragment:Fx,alphamap_fragment:Ox,alphamap_pars_fragment:Bx,alphatest_fragment:zx,alphatest_pars_fragment:kx,aomap_fragment:Vx,aomap_pars_fragment:Hx,batching_pars_vertex:Gx,batching_vertex:Wx,begin_vertex:Xx,beginnormal_vertex:qx,bsdfs:Yx,iridescence_fragment:jx,bumpmap_pars_fragment:Zx,clipping_planes_fragment:$x,clipping_planes_pars_fragment:Kx,clipping_planes_pars_vertex:Jx,clipping_planes_vertex:Qx,color_fragment:ev,color_pars_fragment:tv,color_pars_vertex:iv,color_vertex:nv,common:rv,cube_uv_reflection_fragment:sv,defaultnormal_vertex:av,displacementmap_pars_vertex:ov,displacementmap_vertex:lv,emissivemap_fragment:cv,emissivemap_pars_fragment:hv,colorspace_fragment:uv,colorspace_pars_fragment:dv,envmap_fragment:fv,envmap_common_pars_fragment:pv,envmap_pars_fragment:mv,envmap_pars_vertex:gv,envmap_physical_pars_fragment:Av,envmap_vertex:yv,fog_vertex:_v,fog_pars_vertex:xv,fog_fragment:vv,fog_pars_fragment:bv,gradientmap_pars_fragment:Sv,lightmap_pars_fragment:Tv,lights_lambert_fragment:Mv,lights_lambert_pars_fragment:wv,lights_pars_begin:Ev,lights_toon_fragment:Cv,lights_toon_pars_fragment:Rv,lights_phong_fragment:Pv,lights_phong_pars_fragment:Iv,lights_physical_fragment:Lv,lights_physical_pars_fragment:Dv,lights_fragment_begin:Uv,lights_fragment_maps:Nv,lights_fragment_end:Fv,logdepthbuf_fragment:Ov,logdepthbuf_pars_fragment:Bv,logdepthbuf_pars_vertex:zv,logdepthbuf_vertex:kv,map_fragment:Vv,map_pars_fragment:Hv,map_particle_fragment:Gv,map_particle_pars_fragment:Wv,metalnessmap_fragment:Xv,metalnessmap_pars_fragment:qv,morphinstance_vertex:Yv,morphcolor_vertex:jv,morphnormal_vertex:Zv,morphtarget_pars_vertex:$v,morphtarget_vertex:Kv,normal_fragment_begin:Jv,normal_fragment_maps:Qv,normal_pars_fragment:eb,normal_pars_vertex:tb,normal_vertex:ib,normalmap_pars_fragment:nb,clearcoat_normal_fragment_begin:rb,clearcoat_normal_fragment_maps:sb,clearcoat_pars_fragment:ab,iridescence_pars_fragment:ob,opaque_fragment:lb,packing:cb,premultiplied_alpha_fragment:hb,project_vertex:ub,dithering_fragment:db,dithering_pars_fragment:fb,roughnessmap_fragment:pb,roughnessmap_pars_fragment:mb,shadowmap_pars_fragment:gb,shadowmap_pars_vertex:yb,shadowmap_vertex:_b,shadowmask_pars_fragment:xb,skinbase_vertex:vb,skinning_pars_vertex:bb,skinning_vertex:Sb,skinnormal_vertex:Tb,specularmap_fragment:Mb,specularmap_pars_fragment:wb,tonemapping_fragment:Eb,tonemapping_pars_fragment:Ab,transmission_fragment:Cb,transmission_pars_fragment:Rb,uv_pars_fragment:Pb,uv_pars_vertex:Ib,uv_vertex:Lb,worldpos_vertex:Db,background_vert:Ub,background_frag:Nb,backgroundCube_vert:Fb,backgroundCube_frag:Ob,cube_vert:Bb,cube_frag:zb,depth_vert:kb,depth_frag:Vb,distanceRGBA_vert:Hb,distanceRGBA_frag:Gb,equirect_vert:Wb,equirect_frag:Xb,linedashed_vert:qb,linedashed_frag:Yb,meshbasic_vert:jb,meshbasic_frag:Zb,meshlambert_vert:$b,meshlambert_frag:Kb,meshmatcap_vert:Jb,meshmatcap_frag:Qb,meshnormal_vert:eS,meshnormal_frag:tS,meshphong_vert:iS,meshphong_frag:nS,meshphysical_vert:rS,meshphysical_frag:sS,meshtoon_vert:aS,meshtoon_frag:oS,points_vert:lS,points_frag:cS,shadow_vert:hS,shadow_frag:uS,sprite_vert:dS,sprite_frag:fS},oe={common:{diffuse:{value:new pe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Le},alphaMap:{value:null},alphaMapTransform:{value:new Le},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Le}},envmap:{envMap:{value:null},envMapRotation:{value:new Le},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Le}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Le}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Le},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Le},normalScale:{value:new de(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Le},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Le}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Le}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Le}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new pe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new pe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Le},alphaTest:{value:0},uvTransform:{value:new Le}},sprite:{diffuse:{value:new pe(16777215)},opacity:{value:1},center:{value:new de(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Le},alphaMap:{value:null},alphaMapTransform:{value:new Le},alphaTest:{value:0}}},Tn={basic:{uniforms:ni([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:ni([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new pe(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:ni([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new pe(0)},specular:{value:new pe(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:ni([oe.common,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.roughnessmap,oe.metalnessmap,oe.fog,oe.lights,{emissive:{value:new pe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:ni([oe.common,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.gradientmap,oe.fog,oe.lights,{emissive:{value:new pe(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:ni([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:ni([oe.points,oe.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:ni([oe.common,oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:ni([oe.common,oe.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:ni([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:ni([oe.sprite,oe.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new Le},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Le}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:ni([oe.common,oe.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:ni([oe.lights,oe.fog,{color:{value:new pe(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};Tn.physical={uniforms:ni([Tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Le},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Le},clearcoatNormalScale:{value:new de(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Le},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Le},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Le},sheen:{value:0},sheenColor:{value:new pe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Le},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Le},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Le},transmissionSamplerSize:{value:new de},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Le},attenuationDistance:{value:0},attenuationColor:{value:new pe(0)},specularColor:{value:new pe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Le},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Le},anisotropyVector:{value:new de},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Le}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};var Bc={r:0,b:0,g:0},Zr=new di,pS=new re;function mS(i,e,t,n,r,s,a){let o=new pe(0),l=s===!0?0:1,c,u,h=null,d=0,f=null;function m(_){let x=_.isScene===!0?_.background:null;return x&&x.isTexture&&(x=(_.backgroundBlurriness>0?t:e).get(x)),x}function y(_){let x=!1,S=m(_);S===null?p(o,l):S&&S.isColor&&(p(S,1),x=!0);let M=i.xr.getEnvironmentBlendMode();M==="additive"?n.buffers.color.setClear(0,0,0,1,a):M==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(_,x){let S=m(x);S&&(S.isCubeTexture||S.mapping===co)?(u===void 0&&(u=new ct(new Vr(1,1,1),new Mi({name:"BackgroundCubeMaterial",uniforms:jr(Tn.backgroundCube.uniforms),vertexShader:Tn.backgroundCube.vertexShader,fragmentShader:Tn.backgroundCube.fragmentShader,side:Xt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(M,E,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Zr.copy(x.backgroundRotation),Zr.x*=-1,Zr.y*=-1,Zr.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Zr.y*=-1,Zr.z*=-1),u.material.uniforms.envMap.value=S,u.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(pS.makeRotationFromEuler(Zr)),u.material.toneMapped=qe.getTransfer(S.colorSpace)!==lt,(h!==S||d!==S.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,h=S,d=S.version,f=i.toneMapping),u.layers.enableAll(),_.unshift(u,u.geometry,u.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new ct(new Gr(2,2),new Mi({name:"BackgroundMaterial",uniforms:jr(Tn.background.uniforms),vertexShader:Tn.background.vertexShader,fragmentShader:Tn.background.fragmentShader,side:Si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=qe.getTransfer(S.colorSpace)!==lt,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||d!==S.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=S,d=S.version,f=i.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function p(_,x){_.getRGB(Bc,sd(i)),n.buffers.color.setClear(Bc.r,Bc.g,Bc.b,x,a)}function v(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(_,x=1){o.set(_),l=x,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,p(o,l)},render:y,addToRenderList:g,dispose:v}}function gS(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=d(null),s=r,a=!1;function o(b,P,L,D,F){let k=!1,V=h(D,L,P);s!==V&&(s=V,c(s.object)),k=f(b,D,L,F),k&&m(b,D,L,F),F!==null&&e.update(F,i.ELEMENT_ARRAY_BUFFER),(k||a)&&(a=!1,x(b,P,L,D),F!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function l(){return i.createVertexArray()}function c(b){return i.bindVertexArray(b)}function u(b){return i.deleteVertexArray(b)}function h(b,P,L){let D=L.wireframe===!0,F=n[b.id];F===void 0&&(F={},n[b.id]=F);let k=F[P.id];k===void 0&&(k={},F[P.id]=k);let V=k[D];return V===void 0&&(V=d(l()),k[D]=V),V}function d(b){let P=[],L=[],D=[];for(let F=0;F<t;F++)P[F]=0,L[F]=0,D[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:L,attributeDivisors:D,object:b,attributes:{},index:null}}function f(b,P,L,D){let F=s.attributes,k=P.attributes,V=0,K=L.getAttributes();for(let W in K)if(K[W].location>=0){let ue=F[W],be=k[W];if(be===void 0&&(W==="instanceMatrix"&&b.instanceMatrix&&(be=b.instanceMatrix),W==="instanceColor"&&b.instanceColor&&(be=b.instanceColor)),ue===void 0||ue.attribute!==be||be&&ue.data!==be.data)return!0;V++}return s.attributesNum!==V||s.index!==D}function m(b,P,L,D){let F={},k=P.attributes,V=0,K=L.getAttributes();for(let W in K)if(K[W].location>=0){let ue=k[W];ue===void 0&&(W==="instanceMatrix"&&b.instanceMatrix&&(ue=b.instanceMatrix),W==="instanceColor"&&b.instanceColor&&(ue=b.instanceColor));let be={};be.attribute=ue,ue&&ue.data&&(be.data=ue.data),F[W]=be,V++}s.attributes=F,s.attributesNum=V,s.index=D}function y(){let b=s.newAttributes;for(let P=0,L=b.length;P<L;P++)b[P]=0}function g(b){p(b,0)}function p(b,P){let L=s.newAttributes,D=s.enabledAttributes,F=s.attributeDivisors;L[b]=1,D[b]===0&&(i.enableVertexAttribArray(b),D[b]=1),F[b]!==P&&(i.vertexAttribDivisor(b,P),F[b]=P)}function v(){let b=s.newAttributes,P=s.enabledAttributes;for(let L=0,D=P.length;L<D;L++)P[L]!==b[L]&&(i.disableVertexAttribArray(L),P[L]=0)}function _(b,P,L,D,F,k,V){V===!0?i.vertexAttribIPointer(b,P,L,F,k):i.vertexAttribPointer(b,P,L,D,F,k)}function x(b,P,L,D){y();let F=D.attributes,k=L.getAttributes(),V=P.defaultAttributeValues;for(let K in k){let W=k[K];if(W.location>=0){let se=F[K];if(se===void 0&&(K==="instanceMatrix"&&b.instanceMatrix&&(se=b.instanceMatrix),K==="instanceColor"&&b.instanceColor&&(se=b.instanceColor)),se!==void 0){let ue=se.normalized,be=se.itemSize,He=e.get(se);if(He===void 0)continue;let at=He.buffer,vt=He.type,Ye=He.bytesPerElement,Y=vt===i.INT||vt===i.UNSIGNED_INT||se.gpuType===rc;if(se.isInterleavedBufferAttribute){let Z=se.data,me=Z.stride,De=se.offset;if(Z.isInstancedInterleavedBuffer){for(let Te=0;Te<W.locationSize;Te++)p(W.location+Te,Z.meshPerAttribute);b.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let Te=0;Te<W.locationSize;Te++)g(W.location+Te);i.bindBuffer(i.ARRAY_BUFFER,at);for(let Te=0;Te<W.locationSize;Te++)_(W.location+Te,be/W.locationSize,vt,ue,me*Ye,(De+be/W.locationSize*Te)*Ye,Y)}else{if(se.isInstancedBufferAttribute){for(let Z=0;Z<W.locationSize;Z++)p(W.location+Z,se.meshPerAttribute);b.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Z=0;Z<W.locationSize;Z++)g(W.location+Z);i.bindBuffer(i.ARRAY_BUFFER,at);for(let Z=0;Z<W.locationSize;Z++)_(W.location+Z,be/W.locationSize,vt,ue,be*Ye,be/W.locationSize*Z*Ye,Y)}}else if(V!==void 0){let ue=V[K];if(ue!==void 0)switch(ue.length){case 2:i.vertexAttrib2fv(W.location,ue);break;case 3:i.vertexAttrib3fv(W.location,ue);break;case 4:i.vertexAttrib4fv(W.location,ue);break;default:i.vertexAttrib1fv(W.location,ue)}}}}v()}function S(){R();for(let b in n){let P=n[b];for(let L in P){let D=P[L];for(let F in D)u(D[F].object),delete D[F];delete P[L]}delete n[b]}}function M(b){if(n[b.id]===void 0)return;let P=n[b.id];for(let L in P){let D=P[L];for(let F in D)u(D[F].object),delete D[F];delete P[L]}delete n[b.id]}function E(b){for(let P in n){let L=n[P];if(L[b.id]===void 0)continue;let D=L[b.id];for(let F in D)u(D[F].object),delete D[F];delete L[b.id]}}function R(){T(),a=!0,s!==r&&(s=r,c(s.object))}function T(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:R,resetDefaultState:T,dispose:S,releaseStatesOfGeometry:M,releaseStatesOfProgram:E,initAttributes:y,enableAttribute:g,disableUnusedAttributes:v}}function yS(i,e,t){let n;function r(c){n=c}function s(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function a(c,u,h){h!==0&&(i.drawArraysInstanced(n,c,u,h),t.update(u,n,h))}function o(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let f=0;for(let m=0;m<h;m++)f+=u[m];t.update(f,n,1)}function l(c,u,h,d){if(h===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)a(c[m],u[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,d,0,h);let m=0;for(let y=0;y<h;y++)m+=u[y]*d[y];t.update(m,n,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function _S(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let E=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(E){return!(E!==hi&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){let R=E===Gs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==Xi&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==ci&&!R)}function l(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),_=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=m>0,M=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:v,maxVaryings:_,maxFragmentUniforms:x,vertexTextures:S,maxSamples:M}}function xS(i){let e=this,t=null,n=0,r=!1,s=!1,a=new Jt,o=new Le,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){let f=h.length!==0||d||n!==0||r;return r=d,n=h.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){let m=h.clippingPlanes,y=h.clipIntersection,g=h.clipShadows,p=i.get(h);if(!r||m===null||m.length===0||s&&!g)s?u(null):c();else{let v=s?0:n,_=v*4,x=p.clippingState||null;l.value=x,x=u(m,d,_,f);for(let S=0;S!==_;++S)x[S]=t[S];p.clippingState=x,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,m){let y=h!==null?h.length:0,g=null;if(y!==0){if(g=l.value,m!==!0||g===null){let p=f+y*4,v=d.matrixWorldInverse;o.getNormalMatrix(v),(g===null||g.length<p)&&(g=new Float32Array(p));for(let _=0,x=f;_!==y;++_,x+=4)a.copy(h[_]).applyMatrix4(v,o),a.normal.toArray(g,x),g[x+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,g}}function vS(i){let e=new WeakMap;function t(a,o){return o===tc?a.mapping=Xr:o===ic&&(a.mapping=qr),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===tc||o===ic)if(e.has(a)){let l=e.get(a).texture;return t(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new Dl(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){let o=a.target;o.removeEventListener("dispose",r);let l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}var js=4,ng=[.125,.215,.35,.446,.526,.582],Jr=20,ld=new bn,rg=new pe,cd=null,hd=0,ud=0,dd=!1,Kr=(1+Math.sqrt(5))/2,Ys=1/Kr,sg=[new C(-Kr,Ys,0),new C(Kr,Ys,0),new C(-Ys,0,Kr),new C(Ys,0,Kr),new C(0,Kr,-Ys),new C(0,Kr,Ys),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)],bS=new C,Vc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100,s={}){let{size:a=256,position:o=bS}=s;cd=this._renderer.getRenderTarget(),hd=this._renderer.getActiveCubeFace(),ud=this._renderer.getActiveMipmapLevel(),dd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=lg(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=og(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(cd,hd,ud),this._renderer.xr.enabled=dd,e.scissorTest=!1,zc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Xr||e.mapping===qr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),cd=this._renderer.getRenderTarget(),hd=this._renderer.getActiveCubeFace(),ud=this._renderer.getActiveMipmapLevel(),dd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ti,minFilter:ti,generateMipmaps:!1,type:Gs,format:hi,colorSpace:Nt,depthBuffer:!1},r=ag(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ag(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=SS(s)),this._blurMaterial=TS(s,e,t)}return r}_compileMaterial(e){let t=new ct(this._lodPlanes[0],e);this._renderer.compile(t,ld)}_sceneToCubeUV(e,t,n,r,s){let l=new Pt(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(rg),h.toneMapping=Hn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null));let y=new fi({name:"PMREM.Background",side:Xt,depthWrite:!1,depthTest:!1}),g=new ct(new Vr,y),p=!1,v=e.background;v?v.isColor&&(y.color.copy(v),e.background=null,p=!0):(y.color.copy(rg),p=!0);for(let _=0;_<6;_++){let x=_%3;x===0?(l.up.set(0,c[_],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[_],s.y,s.z)):x===1?(l.up.set(0,0,c[_]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[_],s.z)):(l.up.set(0,c[_],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[_]));let S=this._cubeSize;zc(r,x*S,_>2?S:0,S,S),h.setRenderTarget(r),p&&h.render(g,l),h.render(e,l)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=d,e.background=v}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===Xr||e.mapping===qr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=lg()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=og());let s=r?this._cubemapMaterial:this._equirectMaterial,a=new ct(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;let l=this._cubeSize;zc(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,ld)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let s=1;s<r;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=sg[(r-s-1)%sg.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,r,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new ct(this._lodPlanes[r],c),d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Jr-1),y=s/m,g=isFinite(s)?1+Math.floor(u*y):Jr;g>Jr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Jr}`);let p=[],v=0;for(let E=0;E<Jr;++E){let R=E/y,T=Math.exp(-R*R/2);p.push(T),E===0?v+=T:E<g&&(v+=2*T)}for(let E=0;E<p.length;E++)p[E]=p[E]/v;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);let{_lodMax:_}=this;d.dTheta.value=m,d.mipInt.value=_-n;let x=this._sizeLods[r],S=3*x*(r>_-js?r-_+js:0),M=4*(this._cubeSize-x);zc(t,S,M,3*x,2*x),l.setRenderTarget(t),l.render(h,ld)}};function SS(i){let e=[],t=[],n=[],r=i,s=i-js+1+ng.length;for(let a=0;a<s;a++){let o=Math.pow(2,r);t.push(o);let l=1/o;a>i-js?l=ng[a-i+js-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,m=6,y=3,g=2,p=1,v=new Float32Array(y*m*f),_=new Float32Array(g*m*f),x=new Float32Array(p*m*f);for(let M=0;M<f;M++){let E=M%3*2/3-1,R=M>2?0:-1,T=[E,R,0,E+2/3,R,0,E+2/3,R+1,0,E,R,0,E+2/3,R+1,0,E,R+1,0];v.set(T,y*m*M),_.set(d,g*m*M);let b=[M,M,M,M,M,M];x.set(b,p*m*M)}let S=new dt;S.setAttribute("position",new ke(v,y)),S.setAttribute("uv",new ke(_,g)),S.setAttribute("faceIndex",new ke(x,p)),e.push(S),r>js&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function ag(i,e,t){let n=new Ui(i,e,t);return n.texture.mapping=co,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function zc(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function TS(i,e,t){let n=new Float32Array(Jr),r=new C(0,1,0);return new Mi({name:"SphericalGaussianBlur",defines:{n:Jr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Sd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function og(){return new Mi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Sd(),fragmentShader:`

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
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function lg(){return new Mi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Sd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Sd(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function MS(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===tc||l===ic,u=l===Xr||l===qr;if(c||u){let h=e.get(o),d=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new Vc(i)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{let f=o.image;return c&&f&&f.height>0||u&&f&&r(f)?(t===null&&(t=new Vc(i)),h=c?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",s),h.texture):null}}}return o}function r(o){let l=0,c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){let l=o.target;l.removeEventListener("dispose",s);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function wS(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&Rs("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function ES(i,e,t,n){let r={},s=new WeakMap;function a(h){let d=h.target;d.index!==null&&e.remove(d.index);for(let m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",a),delete r[d.id];let f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function l(h){let d=h.attributes;for(let f in d)e.update(d[f],i.ARRAY_BUFFER)}function c(h){let d=[],f=h.index,m=h.attributes.position,y=0;if(f!==null){let v=f.array;y=f.version;for(let _=0,x=v.length;_<x;_+=3){let S=v[_+0],M=v[_+1],E=v[_+2];d.push(S,M,M,E,E,S)}}else if(m!==void 0){let v=m.array;y=m.version;for(let _=0,x=v.length/3-1;_<x;_+=3){let S=_+0,M=_+1,E=_+2;d.push(S,M,M,E,E,S)}}else return;let g=new(rd(d)?Ha:Va)(d,1);g.version=y;let p=s.get(h);p&&e.remove(p),s.set(h,g)}function u(h){let d=s.get(h);if(d){let f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function AS(i,e,t){let n;function r(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,f){i.drawElements(n,f,s,d*a),t.update(f,n,1)}function c(d,f,m){m!==0&&(i.drawElementsInstanced(n,f,s,d*a,m),t.update(f,n,m))}function u(d,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];t.update(g,n,1)}function h(d,f,m,y){if(m===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)c(d[p]/a,f[p],y[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,y,0,m);let p=0;for(let v=0;v<m;v++)p+=f[v]*y[v];t.update(p,n,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function CS(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function RS(i,e,t){let n=new WeakMap,r=new Qe;function s(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0,d=n.get(o);if(d===void 0||d.count!==h){let T=function(){E.dispose(),n.delete(o),o.removeEventListener("dispose",T)};d!==void 0&&d.texture.dispose();let f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],_=0;f===!0&&(_=1),m===!0&&(_=2),y===!0&&(_=3);let x=o.attributes.position.count*_,S=1;x>e.maxTextureSize&&(S=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let M=new Float32Array(x*S*4*h),E=new ka(M,x,S,h);E.type=ci,E.needsUpdate=!0;let R=_*4;for(let b=0;b<h;b++){let P=g[b],L=p[b],D=v[b],F=x*S*4*b;for(let k=0;k<P.count;k++){let V=k*R;f===!0&&(r.fromBufferAttribute(P,k),M[F+V+0]=r.x,M[F+V+1]=r.y,M[F+V+2]=r.z,M[F+V+3]=0),m===!0&&(r.fromBufferAttribute(L,k),M[F+V+4]=r.x,M[F+V+5]=r.y,M[F+V+6]=r.z,M[F+V+7]=0),y===!0&&(r.fromBufferAttribute(D,k),M[F+V+8]=r.x,M[F+V+9]=r.y,M[F+V+10]=r.z,M[F+V+11]=D.itemSize===4?r.w:1)}}d={count:h,texture:E,size:new de(x,S)},n.set(o,d),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let y=0;y<c.length;y++)f+=c[y];let m=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",m),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:s}}function PS(i,e,t,n){let r=new WeakMap;function s(l){let c=n.render.frame,u=l.geometry,h=e.get(l,u);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return h}function a(){r=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}var Ag=new Ut,cg=new Za(1,1),Cg=new ka,Rg=new Il,Pg=new Wa,hg=[],ug=[],dg=new Float32Array(16),fg=new Float32Array(9),pg=new Float32Array(4);function Ks(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=hg[r];if(s===void 0&&(s=new Float32Array(r),hg[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Ft(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ot(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Hc(i,e){let t=ug[e];t===void 0&&(t=new Int32Array(e),ug[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function IS(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function LS(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;i.uniform2fv(this.addr,e),Ot(t,e)}}function DS(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ft(t,e))return;i.uniform3fv(this.addr,e),Ot(t,e)}}function US(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;i.uniform4fv(this.addr,e),Ot(t,e)}}function NS(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,n))return;pg.set(n),i.uniformMatrix2fv(this.addr,!1,pg),Ot(t,n)}}function FS(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,n))return;fg.set(n),i.uniformMatrix3fv(this.addr,!1,fg),Ot(t,n)}}function OS(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,n))return;dg.set(n),i.uniformMatrix4fv(this.addr,!1,dg),Ot(t,n)}}function BS(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function zS(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;i.uniform2iv(this.addr,e),Ot(t,e)}}function kS(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;i.uniform3iv(this.addr,e),Ot(t,e)}}function VS(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;i.uniform4iv(this.addr,e),Ot(t,e)}}function HS(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function GS(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;i.uniform2uiv(this.addr,e),Ot(t,e)}}function WS(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;i.uniform3uiv(this.addr,e),Ot(t,e)}}function XS(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;i.uniform4uiv(this.addr,e),Ot(t,e)}}function qS(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(cg.compareFunction=td,s=cg):s=Ag,t.setTexture2D(e||s,r)}function YS(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Rg,r)}function jS(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Pg,r)}function ZS(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Cg,r)}function $S(i){switch(i){case 5126:return IS;case 35664:return LS;case 35665:return DS;case 35666:return US;case 35674:return NS;case 35675:return FS;case 35676:return OS;case 5124:case 35670:return BS;case 35667:case 35671:return zS;case 35668:case 35672:return kS;case 35669:case 35673:return VS;case 5125:return HS;case 36294:return GS;case 36295:return WS;case 36296:return XS;case 35678:case 36198:case 36298:case 36306:case 35682:return qS;case 35679:case 36299:case 36307:return YS;case 35680:case 36300:case 36308:case 36293:return jS;case 36289:case 36303:case 36311:case 36292:return ZS}}function KS(i,e){i.uniform1fv(this.addr,e)}function JS(i,e){let t=Ks(e,this.size,2);i.uniform2fv(this.addr,t)}function QS(i,e){let t=Ks(e,this.size,3);i.uniform3fv(this.addr,t)}function eT(i,e){let t=Ks(e,this.size,4);i.uniform4fv(this.addr,t)}function tT(i,e){let t=Ks(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function iT(i,e){let t=Ks(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function nT(i,e){let t=Ks(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function rT(i,e){i.uniform1iv(this.addr,e)}function sT(i,e){i.uniform2iv(this.addr,e)}function aT(i,e){i.uniform3iv(this.addr,e)}function oT(i,e){i.uniform4iv(this.addr,e)}function lT(i,e){i.uniform1uiv(this.addr,e)}function cT(i,e){i.uniform2uiv(this.addr,e)}function hT(i,e){i.uniform3uiv(this.addr,e)}function uT(i,e){i.uniform4uiv(this.addr,e)}function dT(i,e,t){let n=this.cache,r=e.length,s=Hc(t,r);Ft(n,s)||(i.uniform1iv(this.addr,s),Ot(n,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Ag,s[a])}function fT(i,e,t){let n=this.cache,r=e.length,s=Hc(t,r);Ft(n,s)||(i.uniform1iv(this.addr,s),Ot(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Rg,s[a])}function pT(i,e,t){let n=this.cache,r=e.length,s=Hc(t,r);Ft(n,s)||(i.uniform1iv(this.addr,s),Ot(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Pg,s[a])}function mT(i,e,t){let n=this.cache,r=e.length,s=Hc(t,r);Ft(n,s)||(i.uniform1iv(this.addr,s),Ot(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Cg,s[a])}function gT(i){switch(i){case 5126:return KS;case 35664:return JS;case 35665:return QS;case 35666:return eT;case 35674:return tT;case 35675:return iT;case 35676:return nT;case 5124:case 35670:return rT;case 35667:case 35671:return sT;case 35668:case 35672:return aT;case 35669:case 35673:return oT;case 5125:return lT;case 36294:return cT;case 36295:return hT;case 36296:return uT;case 35678:case 36198:case 36298:case 36306:case 35682:return dT;case 35679:case 36299:case 36307:return fT;case 35680:case 36300:case 36308:case 36293:return pT;case 36289:case 36303:case 36311:case 36292:return mT}}var pd=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=$S(t.type)}},md=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=gT(t.type)}},gd=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],n)}}},fd=/(\w+)(\])?(\[|\.)?/g;function mg(i,e){i.seq.push(e),i.map[e.id]=e}function yT(i,e,t){let n=i.name,r=n.length;for(fd.lastIndex=0;;){let s=fd.exec(n),a=fd.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){mg(t,c===void 0?new pd(o,i,e):new md(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new gd(o),mg(t,h)),t=h}}}var Zs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);yT(s,a,this)}}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&n.push(a)}return n}};function gg(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var _T=37297,xT=0;function vT(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var yg=new Le;function bT(i){qe._getMatrix(yg,qe.workingColorSpace,i);let e=`mat3( ${yg.elements.map(t=>t.toFixed(4))} )`;switch(qe.getTransfer(i)){case Ba:return[e,"LinearTransferOETF"];case lt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function _g(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";let a=/ERROR: 0:(\d+)/.exec(s);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+vT(i.getShaderSource(e),o)}else return s}function ST(i,e){let t=bT(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function TT(i,e){let t;switch(e){case ec:t="Linear";break;case Um:t="Reinhard";break;case Nm:t="Cineon";break;case Fm:t="ACESFilmic";break;case Bm:t="AgX";break;case zm:t="Neutral";break;case Om:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var kc=new C;function MT(){qe.getLuminanceCoefficients(kc);let i=kc.x.toFixed(4),e=kc.y.toFixed(4),t=kc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function wT(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xo).join(`
`)}function ET(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function AT(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(e,r),a=s.name,o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function xo(i){return i!==""}function xg(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function vg(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var CT=/^[ \t]*#include +<([\w\d./]+)>/gm;function yd(i){return i.replace(CT,PT)}var RT=new Map;function PT(i,e){let t=Xe[e];if(t===void 0){let n=RT.get(e);if(n!==void 0)t=Xe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return yd(t)}var IT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bg(i){return i.replace(IT,LT)}function LT(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Sg(i){let e=`precision ${i.precision} float;
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
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function DT(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Vu?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===gm?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Sn&&(e="SHADOWMAP_TYPE_VSM"),e}function UT(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Xr:case qr:e="ENVMAP_TYPE_CUBE";break;case co:e="ENVMAP_TYPE_CUBE_UV";break}return e}function NT(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===qr&&(e="ENVMAP_MODE_REFRACTION"),e}function FT(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Xu:e="ENVMAP_BLENDING_MULTIPLY";break;case Lm:e="ENVMAP_BLENDING_MIX";break;case Dm:e="ENVMAP_BLENDING_ADD";break}return e}function OT(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function BT(i,e,t,n){let r=i.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=DT(t),c=UT(t),u=NT(t),h=FT(t),d=OT(t),f=wT(t),m=ET(s),y=r.createProgram(),g,p,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(xo).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(xo).join(`
`),p.length>0&&(p+=`
`)):(g=[Sg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xo).join(`
`),p=[Sg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Hn?"#define TONE_MAPPING":"",t.toneMapping!==Hn?Xe.tonemapping_pars_fragment:"",t.toneMapping!==Hn?TT("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,ST("linearToOutputTexel",t.outputColorSpace),MT(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(xo).join(`
`)),a=yd(a),a=xg(a,t),a=vg(a,t),o=yd(o),o=xg(o,t),o=vg(o,t),a=bg(a),o=bg(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===id?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===id?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let _=v+g+a,x=v+p+o,S=gg(r,r.VERTEX_SHADER,_),M=gg(r,r.FRAGMENT_SHADER,x);r.attachShader(y,S),r.attachShader(y,M),t.index0AttributeName!==void 0?r.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function E(P){if(i.debug.checkShaderErrors){let L=r.getProgramInfoLog(y)||"",D=r.getShaderInfoLog(S)||"",F=r.getShaderInfoLog(M)||"",k=L.trim(),V=D.trim(),K=F.trim(),W=!0,se=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,y,S,M);else{let ue=_g(r,S,"vertex"),be=_g(r,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+k+`
`+ue+`
`+be)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(V===""||K==="")&&(se=!1);se&&(P.diagnostics={runnable:W,programLog:k,vertexShader:{log:V,prefix:g},fragmentShader:{log:K,prefix:p}})}r.deleteShader(S),r.deleteShader(M),R=new Zs(r,y),T=AT(r,y)}let R;this.getUniforms=function(){return R===void 0&&E(this),R};let T;this.getAttributes=function(){return T===void 0&&E(this),T};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=r.getProgramParameter(y,_T)),b},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=xT++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=S,this.fragmentShader=M,this}var zT=0,_d=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new xd(e),t.set(e,n)),n}},xd=class{constructor(e){this.id=zT++,this.code=e,this.usedTimes=0}};function kT(i,e,t,n,r,s,a){let o=new Ps,l=new _d,c=new Set,u=[],h=r.logarithmicDepthBuffer,d=r.vertexTextures,f=r.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(T){return c.add(T),T===0?"uv":`uv${T}`}function g(T,b,P,L,D){let F=L.fog,k=D.geometry,V=T.isMeshStandardMaterial?L.environment:null,K=(T.isMeshStandardMaterial?t:e).get(T.envMap||V),W=K&&K.mapping===co?K.image.height:null,se=m[T.type];T.precision!==null&&(f=r.getMaxPrecision(T.precision),f!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",f,"instead."));let ue=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,be=ue!==void 0?ue.length:0,He=0;k.morphAttributes.position!==void 0&&(He=1),k.morphAttributes.normal!==void 0&&(He=2),k.morphAttributes.color!==void 0&&(He=3);let at,vt,Ye,Y;if(se){let rt=Tn[se];at=rt.vertexShader,vt=rt.fragmentShader}else at=T.vertexShader,vt=T.fragmentShader,l.update(T),Ye=l.getVertexShaderID(T),Y=l.getFragmentShaderID(T);let Z=i.getRenderTarget(),me=i.state.buffers.depth.getReversed(),De=D.isInstancedMesh===!0,Te=D.isBatchedMesh===!0,Ke=!!T.map,Lt=!!T.matcap,U=!!K,St=!!T.aoMap,ze=!!T.lightMap,Ue=!!T.bumpMap,xe=!!T.normalMap,Tt=!!T.displacementMap,ve=!!T.emissiveMap,We=!!T.metalnessMap,Bt=!!T.roughnessMap,Rt=T.anisotropy>0,I=T.clearcoat>0,w=T.dispersion>0,z=T.iridescence>0,q=T.sheen>0,$=T.transmission>0,X=Rt&&!!T.anisotropyMap,Ee=I&&!!T.clearcoatMap,ne=I&&!!T.clearcoatNormalMap,Se=I&&!!T.clearcoatRoughnessMap,Me=z&&!!T.iridescenceMap,te=z&&!!T.iridescenceThicknessMap,he=q&&!!T.sheenColorMap,Ie=q&&!!T.sheenRoughnessMap,we=!!T.specularMap,le=!!T.specularColorMap,Ge=!!T.specularIntensityMap,N=$&&!!T.transmissionMap,ie=$&&!!T.thicknessMap,ae=!!T.gradientMap,ge=!!T.alphaMap,J=T.alphaTest>0,j=!!T.alphaHash,_e=!!T.extensions,Be=Hn;T.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(Be=i.toneMapping);let _t={shaderID:se,shaderType:T.type,shaderName:T.name,vertexShader:at,fragmentShader:vt,defines:T.defines,customVertexShaderID:Ye,customFragmentShaderID:Y,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:f,batching:Te,batchingColor:Te&&D._colorsTexture!==null,instancing:De,instancingColor:De&&D.instanceColor!==null,instancingMorph:De&&D.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:Z===null?i.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Nt,alphaToCoverage:!!T.alphaToCoverage,map:Ke,matcap:Lt,envMap:U,envMapMode:U&&K.mapping,envMapCubeUVHeight:W,aoMap:St,lightMap:ze,bumpMap:Ue,normalMap:xe,displacementMap:d&&Tt,emissiveMap:ve,normalMapObjectSpace:xe&&T.normalMapType===Wm,normalMapTangentSpace:xe&&T.normalMapType===ed,metalnessMap:We,roughnessMap:Bt,anisotropy:Rt,anisotropyMap:X,clearcoat:I,clearcoatMap:Ee,clearcoatNormalMap:ne,clearcoatRoughnessMap:Se,dispersion:w,iridescence:z,iridescenceMap:Me,iridescenceThicknessMap:te,sheen:q,sheenColorMap:he,sheenRoughnessMap:Ie,specularMap:we,specularColorMap:le,specularIntensityMap:Ge,transmission:$,transmissionMap:N,thicknessMap:ie,gradientMap:ae,opaque:T.transparent===!1&&T.blending===Nr&&T.alphaToCoverage===!1,alphaMap:ge,alphaTest:J,alphaHash:j,combine:T.combine,mapUv:Ke&&y(T.map.channel),aoMapUv:St&&y(T.aoMap.channel),lightMapUv:ze&&y(T.lightMap.channel),bumpMapUv:Ue&&y(T.bumpMap.channel),normalMapUv:xe&&y(T.normalMap.channel),displacementMapUv:Tt&&y(T.displacementMap.channel),emissiveMapUv:ve&&y(T.emissiveMap.channel),metalnessMapUv:We&&y(T.metalnessMap.channel),roughnessMapUv:Bt&&y(T.roughnessMap.channel),anisotropyMapUv:X&&y(T.anisotropyMap.channel),clearcoatMapUv:Ee&&y(T.clearcoatMap.channel),clearcoatNormalMapUv:ne&&y(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&y(T.clearcoatRoughnessMap.channel),iridescenceMapUv:Me&&y(T.iridescenceMap.channel),iridescenceThicknessMapUv:te&&y(T.iridescenceThicknessMap.channel),sheenColorMapUv:he&&y(T.sheenColorMap.channel),sheenRoughnessMapUv:Ie&&y(T.sheenRoughnessMap.channel),specularMapUv:we&&y(T.specularMap.channel),specularColorMapUv:le&&y(T.specularColorMap.channel),specularIntensityMapUv:Ge&&y(T.specularIntensityMap.channel),transmissionMapUv:N&&y(T.transmissionMap.channel),thicknessMapUv:ie&&y(T.thicknessMap.channel),alphaMapUv:ge&&y(T.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(xe||Rt),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!k.attributes.uv&&(Ke||ge),fog:!!F,useFog:T.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:T.flatShading===!0&&T.wireframe===!1,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:me,skinning:D.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:be,morphTextureStride:He,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:T.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Be,decodeVideoTexture:Ke&&T.map.isVideoTexture===!0&&qe.getTransfer(T.map.colorSpace)===lt,decodeVideoTextureEmissive:ve&&T.emissiveMap.isVideoTexture===!0&&qe.getTransfer(T.emissiveMap.colorSpace)===lt,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===mi,flipSided:T.side===Xt,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:_e&&T.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_e&&T.extensions.multiDraw===!0||Te)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return _t.vertexUv1s=c.has(1),_t.vertexUv2s=c.has(2),_t.vertexUv3s=c.has(3),c.clear(),_t}function p(T){let b=[];if(T.shaderID?b.push(T.shaderID):(b.push(T.customVertexShaderID),b.push(T.customFragmentShaderID)),T.defines!==void 0)for(let P in T.defines)b.push(P),b.push(T.defines[P]);return T.isRawShaderMaterial===!1&&(v(b,T),_(b,T),b.push(i.outputColorSpace)),b.push(T.customProgramCacheKey),b.join()}function v(T,b){T.push(b.precision),T.push(b.outputColorSpace),T.push(b.envMapMode),T.push(b.envMapCubeUVHeight),T.push(b.mapUv),T.push(b.alphaMapUv),T.push(b.lightMapUv),T.push(b.aoMapUv),T.push(b.bumpMapUv),T.push(b.normalMapUv),T.push(b.displacementMapUv),T.push(b.emissiveMapUv),T.push(b.metalnessMapUv),T.push(b.roughnessMapUv),T.push(b.anisotropyMapUv),T.push(b.clearcoatMapUv),T.push(b.clearcoatNormalMapUv),T.push(b.clearcoatRoughnessMapUv),T.push(b.iridescenceMapUv),T.push(b.iridescenceThicknessMapUv),T.push(b.sheenColorMapUv),T.push(b.sheenRoughnessMapUv),T.push(b.specularMapUv),T.push(b.specularColorMapUv),T.push(b.specularIntensityMapUv),T.push(b.transmissionMapUv),T.push(b.thicknessMapUv),T.push(b.combine),T.push(b.fogExp2),T.push(b.sizeAttenuation),T.push(b.morphTargetsCount),T.push(b.morphAttributeCount),T.push(b.numDirLights),T.push(b.numPointLights),T.push(b.numSpotLights),T.push(b.numSpotLightMaps),T.push(b.numHemiLights),T.push(b.numRectAreaLights),T.push(b.numDirLightShadows),T.push(b.numPointLightShadows),T.push(b.numSpotLightShadows),T.push(b.numSpotLightShadowsWithMaps),T.push(b.numLightProbes),T.push(b.shadowMapType),T.push(b.toneMapping),T.push(b.numClippingPlanes),T.push(b.numClipIntersection),T.push(b.depthPacking)}function _(T,b){o.disableAll(),b.supportsVertexTextures&&o.enable(0),b.instancing&&o.enable(1),b.instancingColor&&o.enable(2),b.instancingMorph&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),b.dispersion&&o.enable(20),b.batchingColor&&o.enable(21),b.gradientMap&&o.enable(22),T.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),T.push(o.mask)}function x(T){let b=m[T.type],P;if(b){let L=Tn[b];P=tg.clone(L.uniforms)}else P=T.uniforms;return P}function S(T,b){let P;for(let L=0,D=u.length;L<D;L++){let F=u[L];if(F.cacheKey===b){P=F,++P.usedTimes;break}}return P===void 0&&(P=new BT(i,b,T,s),u.push(P)),P}function M(T){if(--T.usedTimes===0){let b=u.indexOf(T);u[b]=u[u.length-1],u.pop(),T.destroy()}}function E(T){l.remove(T)}function R(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:x,acquireProgram:S,releaseProgram:M,releaseShaderCache:E,programs:u,dispose:R}}function VT(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,l){i.get(a)[o]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function HT(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Tg(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Mg(){let i=[],e=0,t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(h,d,f,m,y,g){let p=i[e];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:m,renderOrder:h.renderOrder,z:y,group:g},i[e]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=h.renderOrder,p.z=y,p.group=g),e++,p}function o(h,d,f,m,y,g){let p=a(h,d,f,m,y,g);f.transmission>0?n.push(p):f.transparent===!0?r.push(p):t.push(p)}function l(h,d,f,m,y,g){let p=a(h,d,f,m,y,g);f.transmission>0?n.unshift(p):f.transparent===!0?r.unshift(p):t.unshift(p)}function c(h,d){t.length>1&&t.sort(h||HT),n.length>1&&n.sort(d||Tg),r.length>1&&r.sort(d||Tg)}function u(){for(let h=e,d=i.length;h<d;h++){let f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:o,unshift:l,finish:u,sort:c}}function GT(){let i=new WeakMap;function e(n,r){let s=i.get(n),a;return s===void 0?(a=new Mg,i.set(n,[a])):r>=s.length?(a=new Mg,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function WT(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new pe};break;case"SpotLight":t={position:new C,direction:new C,color:new pe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new pe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new pe,groundColor:new pe};break;case"RectAreaLight":t={color:new pe,position:new C,halfWidth:new C,halfHeight:new C};break}return i[e.id]=t,t}}}function XT(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var qT=0;function YT(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function jT(i){let e=new WT,t=XT(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);let r=new C,s=new re,a=new re;function o(c){let u=0,h=0,d=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let f=0,m=0,y=0,g=0,p=0,v=0,_=0,x=0,S=0,M=0,E=0;c.sort(YT);for(let T=0,b=c.length;T<b;T++){let P=c[T],L=P.color,D=P.intensity,F=P.distance,k=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=L.r*D,h+=L.g*D,d+=L.b*D;else if(P.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(P.sh.coefficients[V],D);E++}else if(P.isDirectionalLight){let V=e.get(P);if(V.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let K=P.shadow,W=t.get(P);W.shadowIntensity=K.intensity,W.shadowBias=K.bias,W.shadowNormalBias=K.normalBias,W.shadowRadius=K.radius,W.shadowMapSize=K.mapSize,n.directionalShadow[f]=W,n.directionalShadowMap[f]=k,n.directionalShadowMatrix[f]=P.shadow.matrix,v++}n.directional[f]=V,f++}else if(P.isSpotLight){let V=e.get(P);V.position.setFromMatrixPosition(P.matrixWorld),V.color.copy(L).multiplyScalar(D),V.distance=F,V.coneCos=Math.cos(P.angle),V.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),V.decay=P.decay,n.spot[y]=V;let K=P.shadow;if(P.map&&(n.spotLightMap[S]=P.map,S++,K.updateMatrices(P),P.castShadow&&M++),n.spotLightMatrix[y]=K.matrix,P.castShadow){let W=t.get(P);W.shadowIntensity=K.intensity,W.shadowBias=K.bias,W.shadowNormalBias=K.normalBias,W.shadowRadius=K.radius,W.shadowMapSize=K.mapSize,n.spotShadow[y]=W,n.spotShadowMap[y]=k,x++}y++}else if(P.isRectAreaLight){let V=e.get(P);V.color.copy(L).multiplyScalar(D),V.halfWidth.set(P.width*.5,0,0),V.halfHeight.set(0,P.height*.5,0),n.rectArea[g]=V,g++}else if(P.isPointLight){let V=e.get(P);if(V.color.copy(P.color).multiplyScalar(P.intensity),V.distance=P.distance,V.decay=P.decay,P.castShadow){let K=P.shadow,W=t.get(P);W.shadowIntensity=K.intensity,W.shadowBias=K.bias,W.shadowNormalBias=K.normalBias,W.shadowRadius=K.radius,W.shadowMapSize=K.mapSize,W.shadowCameraNear=K.camera.near,W.shadowCameraFar=K.camera.far,n.pointShadow[m]=W,n.pointShadowMap[m]=k,n.pointShadowMatrix[m]=P.shadow.matrix,_++}n.point[m]=V,m++}else if(P.isHemisphereLight){let V=e.get(P);V.skyColor.copy(P.color).multiplyScalar(D),V.groundColor.copy(P.groundColor).multiplyScalar(D),n.hemi[p]=V,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=oe.LTC_FLOAT_1,n.rectAreaLTC2=oe.LTC_FLOAT_2):(n.rectAreaLTC1=oe.LTC_HALF_1,n.rectAreaLTC2=oe.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;let R=n.hash;(R.directionalLength!==f||R.pointLength!==m||R.spotLength!==y||R.rectAreaLength!==g||R.hemiLength!==p||R.numDirectionalShadows!==v||R.numPointShadows!==_||R.numSpotShadows!==x||R.numSpotMaps!==S||R.numLightProbes!==E)&&(n.directional.length=f,n.spot.length=y,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=x+S-M,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=M,n.numLightProbes=E,R.directionalLength=f,R.pointLength=m,R.spotLength=y,R.rectAreaLength=g,R.hemiLength=p,R.numDirectionalShadows=v,R.numPointShadows=_,R.numSpotShadows=x,R.numSpotMaps=S,R.numLightProbes=E,n.version=qT++)}function l(c,u){let h=0,d=0,f=0,m=0,y=0,g=u.matrixWorldInverse;for(let p=0,v=c.length;p<v;p++){let _=c[p];if(_.isDirectionalLight){let x=n.directional[h];x.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(g),h++}else if(_.isSpotLight){let x=n.spot[f];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(g),f++}else if(_.isRectAreaLight){let x=n.rectArea[m];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(g),a.identity(),s.copy(_.matrixWorld),s.premultiply(g),a.extractRotation(s),x.halfWidth.set(_.width*.5,0,0),x.halfHeight.set(0,_.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),m++}else if(_.isPointLight){let x=n.point[d];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(g),d++}else if(_.isHemisphereLight){let x=n.hemi[y];x.direction.setFromMatrixPosition(_.matrixWorld),x.direction.transformDirection(g),y++}}}return{setup:o,setupView:l,state:n}}function wg(i){let e=new jT(i),t=[],n=[];function r(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function ZT(i){let e=new WeakMap;function t(r,s=0){let a=e.get(r),o;return a===void 0?(o=new wg(i),e.set(r,[o])):s>=a.length?(o=new wg(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var $T=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,KT=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function JT(i,e,t){let n=new en,r=new de,s=new de,a=new Qe,o=new Ol({depthPacking:Gm}),l=new Bl,c={},u=t.maxTextureSize,h={[Si]:Xt,[Xt]:Si,[mi]:mi},d=new Mi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new de},radius:{value:4}},vertexShader:$T,fragmentShader:KT}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let m=new dt;m.setAttribute("position",new ke(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new ct(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vu;let p=this.type;this.render=function(M,E,R){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||M.length===0)return;let T=i.getRenderTarget(),b=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),L=i.state;L.setBlending(Vn),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let D=p!==Sn&&this.type===Sn,F=p===Sn&&this.type!==Sn;for(let k=0,V=M.length;k<V;k++){let K=M[k],W=K.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;r.copy(W.mapSize);let se=W.getFrameExtents();if(r.multiply(se),s.copy(W.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/se.x),r.x=s.x*se.x,W.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/se.y),r.y=s.y*se.y,W.mapSize.y=s.y)),W.map===null||D===!0||F===!0){let be=this.type!==Sn?{minFilter:kt,magFilter:kt}:{};W.map!==null&&W.map.dispose(),W.map=new Ui(r.x,r.y,be),W.map.texture.name=K.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();let ue=W.getViewportCount();for(let be=0;be<ue;be++){let He=W.getViewport(be);a.set(s.x*He.x,s.y*He.y,s.x*He.z,s.y*He.w),L.viewport(a),W.updateMatrices(K,be),n=W.getFrustum(),x(E,R,W.camera,K,this.type)}W.isPointLightShadow!==!0&&this.type===Sn&&v(W,R),W.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(T,b,P)};function v(M,E){let R=e.update(y);d.defines.VSM_SAMPLES!==M.blurSamples&&(d.defines.VSM_SAMPLES=M.blurSamples,f.defines.VSM_SAMPLES=M.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new Ui(r.x,r.y)),d.uniforms.shadow_pass.value=M.map.texture,d.uniforms.resolution.value=M.mapSize,d.uniforms.radius.value=M.radius,i.setRenderTarget(M.mapPass),i.clear(),i.renderBufferDirect(E,null,R,d,y,null),f.uniforms.shadow_pass.value=M.mapPass.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,i.setRenderTarget(M.map),i.clear(),i.renderBufferDirect(E,null,R,f,y,null)}function _(M,E,R,T){let b=null,P=R.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(P!==void 0)b=P;else if(b=R.isPointLight===!0?l:o,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){let L=b.uuid,D=E.uuid,F=c[L];F===void 0&&(F={},c[L]=F);let k=F[D];k===void 0&&(k=b.clone(),F[D]=k,E.addEventListener("dispose",S)),b=k}if(b.visible=E.visible,b.wireframe=E.wireframe,T===Sn?b.side=E.shadowSide!==null?E.shadowSide:E.side:b.side=E.shadowSide!==null?E.shadowSide:h[E.side],b.alphaMap=E.alphaMap,b.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,b.map=E.map,b.clipShadows=E.clipShadows,b.clippingPlanes=E.clippingPlanes,b.clipIntersection=E.clipIntersection,b.displacementMap=E.displacementMap,b.displacementScale=E.displacementScale,b.displacementBias=E.displacementBias,b.wireframeLinewidth=E.wireframeLinewidth,b.linewidth=E.linewidth,R.isPointLight===!0&&b.isMeshDistanceMaterial===!0){let L=i.properties.get(b);L.light=R}return b}function x(M,E,R,T,b){if(M.visible===!1)return;if(M.layers.test(E.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&b===Sn)&&(!M.frustumCulled||n.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,M.matrixWorld);let D=e.update(M),F=M.material;if(Array.isArray(F)){let k=D.groups;for(let V=0,K=k.length;V<K;V++){let W=k[V],se=F[W.materialIndex];if(se&&se.visible){let ue=_(M,se,T,b);M.onBeforeShadow(i,M,E,R,D,ue,W),i.renderBufferDirect(R,null,D,ue,M,W),M.onAfterShadow(i,M,E,R,D,ue,W)}}}else if(F.visible){let k=_(M,F,T,b);M.onBeforeShadow(i,M,E,R,D,k,null),i.renderBufferDirect(R,null,D,k,M,null),M.onAfterShadow(i,M,E,R,D,k,null)}}let L=M.children;for(let D=0,F=L.length;D<F;D++)x(L[D],E,R,T,b)}function S(M){M.target.removeEventListener("dispose",S);for(let R in c){let T=c[R],b=M.target.uuid;b in T&&(T[b].dispose(),delete T[b])}}}var QT={[jl]:Zl,[$l]:lo,[Kl]:Ql,[Fr]:Jl,[Zl]:jl,[lo]:$l,[Ql]:Kl,[Jl]:Fr};function eM(i,e){function t(){let N=!1,ie=new Qe,ae=null,ge=new Qe(0,0,0,0);return{setMask:function(J){ae!==J&&!N&&(i.colorMask(J,J,J,J),ae=J)},setLocked:function(J){N=J},setClear:function(J,j,_e,Be,_t){_t===!0&&(J*=Be,j*=Be,_e*=Be),ie.set(J,j,_e,Be),ge.equals(ie)===!1&&(i.clearColor(J,j,_e,Be),ge.copy(ie))},reset:function(){N=!1,ae=null,ge.set(-1,0,0,0)}}}function n(){let N=!1,ie=!1,ae=null,ge=null,J=null;return{setReversed:function(j){if(ie!==j){let _e=e.get("EXT_clip_control");j?_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.ZERO_TO_ONE_EXT):_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.NEGATIVE_ONE_TO_ONE_EXT),ie=j;let Be=J;J=null,this.setClear(Be)}},getReversed:function(){return ie},setTest:function(j){j?Z(i.DEPTH_TEST):me(i.DEPTH_TEST)},setMask:function(j){ae!==j&&!N&&(i.depthMask(j),ae=j)},setFunc:function(j){if(ie&&(j=QT[j]),ge!==j){switch(j){case jl:i.depthFunc(i.NEVER);break;case Zl:i.depthFunc(i.ALWAYS);break;case $l:i.depthFunc(i.LESS);break;case Fr:i.depthFunc(i.LEQUAL);break;case Kl:i.depthFunc(i.EQUAL);break;case Jl:i.depthFunc(i.GEQUAL);break;case lo:i.depthFunc(i.GREATER);break;case Ql:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ge=j}},setLocked:function(j){N=j},setClear:function(j){J!==j&&(ie&&(j=1-j),i.clearDepth(j),J=j)},reset:function(){N=!1,ae=null,ge=null,J=null,ie=!1}}}function r(){let N=!1,ie=null,ae=null,ge=null,J=null,j=null,_e=null,Be=null,_t=null;return{setTest:function(rt){N||(rt?Z(i.STENCIL_TEST):me(i.STENCIL_TEST))},setMask:function(rt){ie!==rt&&!N&&(i.stencilMask(rt),ie=rt)},setFunc:function(rt,Cn,un){(ae!==rt||ge!==Cn||J!==un)&&(i.stencilFunc(rt,Cn,un),ae=rt,ge=Cn,J=un)},setOp:function(rt,Cn,un){(j!==rt||_e!==Cn||Be!==un)&&(i.stencilOp(rt,Cn,un),j=rt,_e=Cn,Be=un)},setLocked:function(rt){N=rt},setClear:function(rt){_t!==rt&&(i.clearStencil(rt),_t=rt)},reset:function(){N=!1,ie=null,ae=null,ge=null,J=null,j=null,_e=null,Be=null,_t=null}}}let s=new t,a=new n,o=new r,l=new WeakMap,c=new WeakMap,u={},h={},d=new WeakMap,f=[],m=null,y=!1,g=null,p=null,v=null,_=null,x=null,S=null,M=null,E=new pe(0,0,0),R=0,T=!1,b=null,P=null,L=null,D=null,F=null,k=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,K=0,W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(W)[1]),V=K>=1):W.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),V=K>=2);let se=null,ue={},be=i.getParameter(i.SCISSOR_BOX),He=i.getParameter(i.VIEWPORT),at=new Qe().fromArray(be),vt=new Qe().fromArray(He);function Ye(N,ie,ae,ge){let J=new Uint8Array(4),j=i.createTexture();i.bindTexture(N,j),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let _e=0;_e<ae;_e++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(ie,0,i.RGBA,1,1,ge,0,i.RGBA,i.UNSIGNED_BYTE,J):i.texImage2D(ie+_e,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,J);return j}let Y={};Y[i.TEXTURE_2D]=Ye(i.TEXTURE_2D,i.TEXTURE_2D,1),Y[i.TEXTURE_CUBE_MAP]=Ye(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[i.TEXTURE_2D_ARRAY]=Ye(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Y[i.TEXTURE_3D]=Ye(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Z(i.DEPTH_TEST),a.setFunc(Fr),Ue(!1),xe(ku),Z(i.CULL_FACE),St(Vn);function Z(N){u[N]!==!0&&(i.enable(N),u[N]=!0)}function me(N){u[N]!==!1&&(i.disable(N),u[N]=!1)}function De(N,ie){return h[N]!==ie?(i.bindFramebuffer(N,ie),h[N]=ie,N===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ie),N===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ie),!0):!1}function Te(N,ie){let ae=f,ge=!1;if(N){ae=d.get(ie),ae===void 0&&(ae=[],d.set(ie,ae));let J=N.textures;if(ae.length!==J.length||ae[0]!==i.COLOR_ATTACHMENT0){for(let j=0,_e=J.length;j<_e;j++)ae[j]=i.COLOR_ATTACHMENT0+j;ae.length=J.length,ge=!0}}else ae[0]!==i.BACK&&(ae[0]=i.BACK,ge=!0);ge&&i.drawBuffers(ae)}function Ke(N){return m!==N?(i.useProgram(N),m=N,!0):!1}let Lt={[rr]:i.FUNC_ADD,[ym]:i.FUNC_SUBTRACT,[_m]:i.FUNC_REVERSE_SUBTRACT};Lt[xm]=i.MIN,Lt[vm]=i.MAX;let U={[ql]:i.ZERO,[Yl]:i.ONE,[bm]:i.SRC_COLOR,[El]:i.SRC_ALPHA,[Am]:i.SRC_ALPHA_SATURATE,[wm]:i.DST_COLOR,[Tm]:i.DST_ALPHA,[Sm]:i.ONE_MINUS_SRC_COLOR,[Al]:i.ONE_MINUS_SRC_ALPHA,[Em]:i.ONE_MINUS_DST_COLOR,[Mm]:i.ONE_MINUS_DST_ALPHA,[Cm]:i.CONSTANT_COLOR,[Rm]:i.ONE_MINUS_CONSTANT_COLOR,[Pm]:i.CONSTANT_ALPHA,[Im]:i.ONE_MINUS_CONSTANT_ALPHA};function St(N,ie,ae,ge,J,j,_e,Be,_t,rt){if(N===Vn){y===!0&&(me(i.BLEND),y=!1);return}if(y===!1&&(Z(i.BLEND),y=!0),N!==Xl){if(N!==g||rt!==T){if((p!==rr||x!==rr)&&(i.blendEquation(i.FUNC_ADD),p=rr,x=rr),rt)switch(N){case Nr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Hu:i.blendFunc(i.ONE,i.ONE);break;case Gu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Wu:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Nr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Hu:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Gu:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Wu:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}v=null,_=null,S=null,M=null,E.set(0,0,0),R=0,g=N,T=rt}return}J=J||ie,j=j||ae,_e=_e||ge,(ie!==p||J!==x)&&(i.blendEquationSeparate(Lt[ie],Lt[J]),p=ie,x=J),(ae!==v||ge!==_||j!==S||_e!==M)&&(i.blendFuncSeparate(U[ae],U[ge],U[j],U[_e]),v=ae,_=ge,S=j,M=_e),(Be.equals(E)===!1||_t!==R)&&(i.blendColor(Be.r,Be.g,Be.b,_t),E.copy(Be),R=_t),g=N,T=!1}function ze(N,ie){N.side===mi?me(i.CULL_FACE):Z(i.CULL_FACE);let ae=N.side===Xt;ie&&(ae=!ae),Ue(ae),N.blending===Nr&&N.transparent===!1?St(Vn):St(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),s.setMask(N.colorWrite);let ge=N.stencilWrite;o.setTest(ge),ge&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),ve(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?Z(i.SAMPLE_ALPHA_TO_COVERAGE):me(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ue(N){b!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),b=N)}function xe(N){N!==pm?(Z(i.CULL_FACE),N!==P&&(N===ku?i.cullFace(i.BACK):N===mm?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):me(i.CULL_FACE),P=N}function Tt(N){N!==L&&(V&&i.lineWidth(N),L=N)}function ve(N,ie,ae){N?(Z(i.POLYGON_OFFSET_FILL),(D!==ie||F!==ae)&&(i.polygonOffset(ie,ae),D=ie,F=ae)):me(i.POLYGON_OFFSET_FILL)}function We(N){N?Z(i.SCISSOR_TEST):me(i.SCISSOR_TEST)}function Bt(N){N===void 0&&(N=i.TEXTURE0+k-1),se!==N&&(i.activeTexture(N),se=N)}function Rt(N,ie,ae){ae===void 0&&(se===null?ae=i.TEXTURE0+k-1:ae=se);let ge=ue[ae];ge===void 0&&(ge={type:void 0,texture:void 0},ue[ae]=ge),(ge.type!==N||ge.texture!==ie)&&(se!==ae&&(i.activeTexture(ae),se=ae),i.bindTexture(N,ie||Y[N]),ge.type=N,ge.texture=ie)}function I(){let N=ue[se];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function w(){try{i.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function z(){try{i.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function q(){try{i.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function $(){try{i.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ee(){try{i.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ne(){try{i.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Se(){try{i.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Me(){try{i.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function te(){try{i.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function he(N){at.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),at.copy(N))}function Ie(N){vt.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),vt.copy(N))}function we(N,ie){let ae=c.get(ie);ae===void 0&&(ae=new WeakMap,c.set(ie,ae));let ge=ae.get(N);ge===void 0&&(ge=i.getUniformBlockIndex(ie,N.name),ae.set(N,ge))}function le(N,ie){let ge=c.get(ie).get(N);l.get(ie)!==ge&&(i.uniformBlockBinding(ie,ge,N.__bindingPointIndex),l.set(ie,ge))}function Ge(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},se=null,ue={},h={},d=new WeakMap,f=[],m=null,y=!1,g=null,p=null,v=null,_=null,x=null,S=null,M=null,E=new pe(0,0,0),R=0,T=!1,b=null,P=null,L=null,D=null,F=null,at.set(0,0,i.canvas.width,i.canvas.height),vt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:Z,disable:me,bindFramebuffer:De,drawBuffers:Te,useProgram:Ke,setBlending:St,setMaterial:ze,setFlipSided:Ue,setCullFace:xe,setLineWidth:Tt,setPolygonOffset:ve,setScissorTest:We,activeTexture:Bt,bindTexture:Rt,unbindTexture:I,compressedTexImage2D:w,compressedTexImage3D:z,texImage2D:Me,texImage3D:te,updateUBOMapping:we,uniformBlockBinding:le,texStorage2D:ne,texStorage3D:Se,texSubImage2D:q,texSubImage3D:$,compressedTexSubImage2D:X,compressedTexSubImage3D:Ee,scissor:he,viewport:Ie,reset:Ge}}function tM(i,e,t,n,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new de,u=new WeakMap,h,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(I,w){return f?new OffscreenCanvas(I,w):Cs("canvas")}function y(I,w,z){let q=1,$=Rt(I);if(($.width>z||$.height>z)&&(q=z/Math.max($.width,$.height)),q<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){let X=Math.floor(q*$.width),Ee=Math.floor(q*$.height);h===void 0&&(h=m(X,Ee));let ne=w?m(X,Ee):h;return ne.width=X,ne.height=Ee,ne.getContext("2d").drawImage(I,0,0,X,Ee),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+X+"x"+Ee+")."),ne}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),I;return I}function g(I){return I.generateMipmaps}function p(I){i.generateMipmap(I)}function v(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(I,w,z,q,$=!1){if(I!==null){if(i[I]!==void 0)return i[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let X=w;if(w===i.RED&&(z===i.FLOAT&&(X=i.R32F),z===i.HALF_FLOAT&&(X=i.R16F),z===i.UNSIGNED_BYTE&&(X=i.R8)),w===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(X=i.R8UI),z===i.UNSIGNED_SHORT&&(X=i.R16UI),z===i.UNSIGNED_INT&&(X=i.R32UI),z===i.BYTE&&(X=i.R8I),z===i.SHORT&&(X=i.R16I),z===i.INT&&(X=i.R32I)),w===i.RG&&(z===i.FLOAT&&(X=i.RG32F),z===i.HALF_FLOAT&&(X=i.RG16F),z===i.UNSIGNED_BYTE&&(X=i.RG8)),w===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(X=i.RG8UI),z===i.UNSIGNED_SHORT&&(X=i.RG16UI),z===i.UNSIGNED_INT&&(X=i.RG32UI),z===i.BYTE&&(X=i.RG8I),z===i.SHORT&&(X=i.RG16I),z===i.INT&&(X=i.RG32I)),w===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(X=i.RGB8UI),z===i.UNSIGNED_SHORT&&(X=i.RGB16UI),z===i.UNSIGNED_INT&&(X=i.RGB32UI),z===i.BYTE&&(X=i.RGB8I),z===i.SHORT&&(X=i.RGB16I),z===i.INT&&(X=i.RGB32I)),w===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),z===i.UNSIGNED_INT&&(X=i.RGBA32UI),z===i.BYTE&&(X=i.RGBA8I),z===i.SHORT&&(X=i.RGBA16I),z===i.INT&&(X=i.RGBA32I)),w===i.RGB&&(z===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&(X=i.R11F_G11F_B10F)),w===i.RGBA){let Ee=$?Ba:qe.getTransfer(q);z===i.FLOAT&&(X=i.RGBA32F),z===i.HALF_FLOAT&&(X=i.RGBA16F),z===i.UNSIGNED_BYTE&&(X=Ee===lt?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function x(I,w){let z;return I?w===null||w===Gn||w===Ws?z=i.DEPTH24_STENCIL8:w===ci?z=i.DEPTH32F_STENCIL8:w===Hs&&(z=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Gn||w===Ws?z=i.DEPTH_COMPONENT24:w===ci?z=i.DEPTH_COMPONENT32F:w===Hs&&(z=i.DEPTH_COMPONENT16),z}function S(I,w){return g(I)===!0||I.isFramebufferTexture&&I.minFilter!==kt&&I.minFilter!==ti?Math.log2(Math.max(w.width,w.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?w.mipmaps.length:1}function M(I){let w=I.target;w.removeEventListener("dispose",M),R(w),w.isVideoTexture&&u.delete(w)}function E(I){let w=I.target;w.removeEventListener("dispose",E),b(w)}function R(I){let w=n.get(I);if(w.__webglInit===void 0)return;let z=I.source,q=d.get(z);if(q){let $=q[w.__cacheKey];$.usedTimes--,$.usedTimes===0&&T(I),Object.keys(q).length===0&&d.delete(z)}n.remove(I)}function T(I){let w=n.get(I);i.deleteTexture(w.__webglTexture);let z=I.source,q=d.get(z);delete q[w.__cacheKey],a.memory.textures--}function b(I){let w=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(w.__webglFramebuffer[q]))for(let $=0;$<w.__webglFramebuffer[q].length;$++)i.deleteFramebuffer(w.__webglFramebuffer[q][$]);else i.deleteFramebuffer(w.__webglFramebuffer[q]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[q])}else{if(Array.isArray(w.__webglFramebuffer))for(let q=0;q<w.__webglFramebuffer.length;q++)i.deleteFramebuffer(w.__webglFramebuffer[q]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let q=0;q<w.__webglColorRenderbuffer.length;q++)w.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[q]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}let z=I.textures;for(let q=0,$=z.length;q<$;q++){let X=n.get(z[q]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),a.memory.textures--),n.remove(z[q])}n.remove(I)}let P=0;function L(){P=0}function D(){let I=P;return I>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+r.maxTextures),P+=1,I}function F(I){let w=[];return w.push(I.wrapS),w.push(I.wrapT),w.push(I.wrapR||0),w.push(I.magFilter),w.push(I.minFilter),w.push(I.anisotropy),w.push(I.internalFormat),w.push(I.format),w.push(I.type),w.push(I.generateMipmaps),w.push(I.premultiplyAlpha),w.push(I.flipY),w.push(I.unpackAlignment),w.push(I.colorSpace),w.join()}function k(I,w){let z=n.get(I);if(I.isVideoTexture&&We(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&z.__version!==I.version){let q=I.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(z,I,w);return}}else I.isExternalTexture&&(z.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+w)}function V(I,w){let z=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&z.__version!==I.version){Y(z,I,w);return}t.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+w)}function K(I,w){let z=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&z.__version!==I.version){Y(z,I,w);return}t.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+w)}function W(I,w){let z=n.get(I);if(I.version>0&&z.__version!==I.version){Z(z,I,w);return}t.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+w)}let se={[sr]:i.REPEAT,[pn]:i.CLAMP_TO_EDGE,[Es]:i.MIRRORED_REPEAT},ue={[kt]:i.NEAREST,[nc]:i.NEAREST_MIPMAP_NEAREST,[Yr]:i.NEAREST_MIPMAP_LINEAR,[ti]:i.LINEAR,[Vs]:i.LINEAR_MIPMAP_NEAREST,[rn]:i.LINEAR_MIPMAP_LINEAR},be={[Xm]:i.NEVER,[Km]:i.ALWAYS,[qm]:i.LESS,[td]:i.LEQUAL,[Ym]:i.EQUAL,[$m]:i.GEQUAL,[jm]:i.GREATER,[Zm]:i.NOTEQUAL};function He(I,w){if(w.type===ci&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===ti||w.magFilter===Vs||w.magFilter===Yr||w.magFilter===rn||w.minFilter===ti||w.minFilter===Vs||w.minFilter===Yr||w.minFilter===rn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,se[w.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,se[w.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,se[w.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,ue[w.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,ue[w.minFilter]),w.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,be[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===kt||w.minFilter!==Yr&&w.minFilter!==rn||w.type===ci&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){let z=e.get("EXT_texture_filter_anisotropic");i.texParameterf(I,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,r.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function at(I,w){let z=!1;I.__webglInit===void 0&&(I.__webglInit=!0,w.addEventListener("dispose",M));let q=w.source,$=d.get(q);$===void 0&&($={},d.set(q,$));let X=F(w);if(X!==I.__cacheKey){$[X]===void 0&&($[X]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,z=!0),$[X].usedTimes++;let Ee=$[I.__cacheKey];Ee!==void 0&&($[I.__cacheKey].usedTimes--,Ee.usedTimes===0&&T(w)),I.__cacheKey=X,I.__webglTexture=$[X].texture}return z}function vt(I,w,z){return Math.floor(Math.floor(I/z)/w)}function Ye(I,w,z,q){let X=I.updateRanges;if(X.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,w.width,w.height,z,q,w.data);else{X.sort((te,he)=>te.start-he.start);let Ee=0;for(let te=1;te<X.length;te++){let he=X[Ee],Ie=X[te],we=he.start+he.count,le=vt(Ie.start,w.width,4),Ge=vt(he.start,w.width,4);Ie.start<=we+1&&le===Ge&&vt(Ie.start+Ie.count-1,w.width,4)===le?he.count=Math.max(he.count,Ie.start+Ie.count-he.start):(++Ee,X[Ee]=Ie)}X.length=Ee+1;let ne=i.getParameter(i.UNPACK_ROW_LENGTH),Se=i.getParameter(i.UNPACK_SKIP_PIXELS),Me=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,w.width);for(let te=0,he=X.length;te<he;te++){let Ie=X[te],we=Math.floor(Ie.start/4),le=Math.ceil(Ie.count/4),Ge=we%w.width,N=Math.floor(we/w.width),ie=le,ae=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ge),i.pixelStorei(i.UNPACK_SKIP_ROWS,N),t.texSubImage2D(i.TEXTURE_2D,0,Ge,N,ie,ae,z,q,w.data)}I.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ne),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Se),i.pixelStorei(i.UNPACK_SKIP_ROWS,Me)}}function Y(I,w,z){let q=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(q=i.TEXTURE_3D);let $=at(I,w),X=w.source;t.bindTexture(q,I.__webglTexture,i.TEXTURE0+z);let Ee=n.get(X);if(X.version!==Ee.__version||$===!0){t.activeTexture(i.TEXTURE0+z);let ne=qe.getPrimaries(qe.workingColorSpace),Se=w.colorSpace===Wn?null:qe.getPrimaries(w.colorSpace),Me=w.colorSpace===Wn||ne===Se?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);let te=y(w.image,!1,r.maxTextureSize);te=Bt(w,te);let he=s.convert(w.format,w.colorSpace),Ie=s.convert(w.type),we=_(w.internalFormat,he,Ie,w.colorSpace,w.isVideoTexture);He(q,w);let le,Ge=w.mipmaps,N=w.isVideoTexture!==!0,ie=Ee.__version===void 0||$===!0,ae=X.dataReady,ge=S(w,te);if(w.isDepthTexture)we=x(w.format===Xs,w.type),ie&&(N?t.texStorage2D(i.TEXTURE_2D,1,we,te.width,te.height):t.texImage2D(i.TEXTURE_2D,0,we,te.width,te.height,0,he,Ie,null));else if(w.isDataTexture)if(Ge.length>0){N&&ie&&t.texStorage2D(i.TEXTURE_2D,ge,we,Ge[0].width,Ge[0].height);for(let J=0,j=Ge.length;J<j;J++)le=Ge[J],N?ae&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,le.width,le.height,he,Ie,le.data):t.texImage2D(i.TEXTURE_2D,J,we,le.width,le.height,0,he,Ie,le.data);w.generateMipmaps=!1}else N?(ie&&t.texStorage2D(i.TEXTURE_2D,ge,we,te.width,te.height),ae&&Ye(w,te,he,Ie)):t.texImage2D(i.TEXTURE_2D,0,we,te.width,te.height,0,he,Ie,te.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){N&&ie&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,we,Ge[0].width,Ge[0].height,te.depth);for(let J=0,j=Ge.length;J<j;J++)if(le=Ge[J],w.format!==hi)if(he!==null)if(N){if(ae)if(w.layerUpdates.size>0){let _e=Oc(le.width,le.height,w.format,w.type);for(let Be of w.layerUpdates){let _t=le.data.subarray(Be*_e/le.data.BYTES_PER_ELEMENT,(Be+1)*_e/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,Be,le.width,le.height,1,he,_t)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,le.width,le.height,te.depth,he,le.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,we,le.width,le.height,te.depth,0,le.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?ae&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,le.width,le.height,te.depth,he,Ie,le.data):t.texImage3D(i.TEXTURE_2D_ARRAY,J,we,le.width,le.height,te.depth,0,he,Ie,le.data)}else{N&&ie&&t.texStorage2D(i.TEXTURE_2D,ge,we,Ge[0].width,Ge[0].height);for(let J=0,j=Ge.length;J<j;J++)le=Ge[J],w.format!==hi?he!==null?N?ae&&t.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,le.width,le.height,he,le.data):t.compressedTexImage2D(i.TEXTURE_2D,J,we,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?ae&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,le.width,le.height,he,Ie,le.data):t.texImage2D(i.TEXTURE_2D,J,we,le.width,le.height,0,he,Ie,le.data)}else if(w.isDataArrayTexture)if(N){if(ie&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,we,te.width,te.height,te.depth),ae)if(w.layerUpdates.size>0){let J=Oc(te.width,te.height,w.format,w.type);for(let j of w.layerUpdates){let _e=te.data.subarray(j*J/te.data.BYTES_PER_ELEMENT,(j+1)*J/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,j,te.width,te.height,1,he,Ie,_e)}w.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,he,Ie,te.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,we,te.width,te.height,te.depth,0,he,Ie,te.data);else if(w.isData3DTexture)N?(ie&&t.texStorage3D(i.TEXTURE_3D,ge,we,te.width,te.height,te.depth),ae&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,he,Ie,te.data)):t.texImage3D(i.TEXTURE_3D,0,we,te.width,te.height,te.depth,0,he,Ie,te.data);else if(w.isFramebufferTexture){if(ie)if(N)t.texStorage2D(i.TEXTURE_2D,ge,we,te.width,te.height);else{let J=te.width,j=te.height;for(let _e=0;_e<ge;_e++)t.texImage2D(i.TEXTURE_2D,_e,we,J,j,0,he,Ie,null),J>>=1,j>>=1}}else if(Ge.length>0){if(N&&ie){let J=Rt(Ge[0]);t.texStorage2D(i.TEXTURE_2D,ge,we,J.width,J.height)}for(let J=0,j=Ge.length;J<j;J++)le=Ge[J],N?ae&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,he,Ie,le):t.texImage2D(i.TEXTURE_2D,J,we,he,Ie,le);w.generateMipmaps=!1}else if(N){if(ie){let J=Rt(te);t.texStorage2D(i.TEXTURE_2D,ge,we,J.width,J.height)}ae&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,he,Ie,te)}else t.texImage2D(i.TEXTURE_2D,0,we,he,Ie,te);g(w)&&p(q),Ee.__version=X.version,w.onUpdate&&w.onUpdate(w)}I.__version=w.version}function Z(I,w,z){if(w.image.length!==6)return;let q=at(I,w),$=w.source;t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+z);let X=n.get($);if($.version!==X.__version||q===!0){t.activeTexture(i.TEXTURE0+z);let Ee=qe.getPrimaries(qe.workingColorSpace),ne=w.colorSpace===Wn?null:qe.getPrimaries(w.colorSpace),Se=w.colorSpace===Wn||Ee===ne?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);let Me=w.isCompressedTexture||w.image[0].isCompressedTexture,te=w.image[0]&&w.image[0].isDataTexture,he=[];for(let j=0;j<6;j++)!Me&&!te?he[j]=y(w.image[j],!0,r.maxCubemapSize):he[j]=te?w.image[j].image:w.image[j],he[j]=Bt(w,he[j]);let Ie=he[0],we=s.convert(w.format,w.colorSpace),le=s.convert(w.type),Ge=_(w.internalFormat,we,le,w.colorSpace),N=w.isVideoTexture!==!0,ie=X.__version===void 0||q===!0,ae=$.dataReady,ge=S(w,Ie);He(i.TEXTURE_CUBE_MAP,w);let J;if(Me){N&&ie&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,Ge,Ie.width,Ie.height);for(let j=0;j<6;j++){J=he[j].mipmaps;for(let _e=0;_e<J.length;_e++){let Be=J[_e];w.format!==hi?we!==null?N?ae&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,_e,0,0,Be.width,Be.height,we,Be.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,_e,Ge,Be.width,Be.height,0,Be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,_e,0,0,Be.width,Be.height,we,le,Be.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,_e,Ge,Be.width,Be.height,0,we,le,Be.data)}}}else{if(J=w.mipmaps,N&&ie){J.length>0&&ge++;let j=Rt(he[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,Ge,j.width,j.height)}for(let j=0;j<6;j++)if(te){N?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,he[j].width,he[j].height,we,le,he[j].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Ge,he[j].width,he[j].height,0,we,le,he[j].data);for(let _e=0;_e<J.length;_e++){let _t=J[_e].image[j].image;N?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,_e+1,0,0,_t.width,_t.height,we,le,_t.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,_e+1,Ge,_t.width,_t.height,0,we,le,_t.data)}}else{N?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,we,le,he[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Ge,we,le,he[j]);for(let _e=0;_e<J.length;_e++){let Be=J[_e];N?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,_e+1,0,0,we,le,Be.image[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,_e+1,Ge,we,le,Be.image[j])}}}g(w)&&p(i.TEXTURE_CUBE_MAP),X.__version=$.version,w.onUpdate&&w.onUpdate(w)}I.__version=w.version}function me(I,w,z,q,$,X){let Ee=s.convert(z.format,z.colorSpace),ne=s.convert(z.type),Se=_(z.internalFormat,Ee,ne,z.colorSpace),Me=n.get(w),te=n.get(z);if(te.__renderTarget=w,!Me.__hasExternalTextures){let he=Math.max(1,w.width>>X),Ie=Math.max(1,w.height>>X);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?t.texImage3D($,X,Se,he,Ie,w.depth,0,Ee,ne,null):t.texImage2D($,X,Se,he,Ie,0,Ee,ne,null)}t.bindFramebuffer(i.FRAMEBUFFER,I),ve(w)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,$,te.__webglTexture,0,Tt(w)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,$,te.__webglTexture,X),t.bindFramebuffer(i.FRAMEBUFFER,null)}function De(I,w,z){if(i.bindRenderbuffer(i.RENDERBUFFER,I),w.depthBuffer){let q=w.depthTexture,$=q&&q.isDepthTexture?q.type:null,X=x(w.stencilBuffer,$),Ee=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=Tt(w);ve(w)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ne,X,w.width,w.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,ne,X,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,X,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ee,i.RENDERBUFFER,I)}else{let q=w.textures;for(let $=0;$<q.length;$++){let X=q[$],Ee=s.convert(X.format,X.colorSpace),ne=s.convert(X.type),Se=_(X.internalFormat,Ee,ne,X.colorSpace),Me=Tt(w);z&&ve(w)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Me,Se,w.width,w.height):ve(w)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Me,Se,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,Se,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Te(I,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,I),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let q=n.get(w.depthTexture);q.__renderTarget=w,(!q.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),k(w.depthTexture,0);let $=q.__webglTexture,X=Tt(w);if(w.depthTexture.format===As)ve(w)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0);else if(w.depthTexture.format===Xs)ve(w)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function Ke(I){let w=n.get(I),z=I.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==I.depthTexture){let q=I.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),q){let $=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,q.removeEventListener("dispose",$)};q.addEventListener("dispose",$),w.__depthDisposeCallback=$}w.__boundDepthTexture=q}if(I.depthTexture&&!w.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");let q=I.texture.mipmaps;q&&q.length>0?Te(w.__webglFramebuffer[0],I):Te(w.__webglFramebuffer,I)}else if(z){w.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[q]),w.__webglDepthbuffer[q]===void 0)w.__webglDepthbuffer[q]=i.createRenderbuffer(),De(w.__webglDepthbuffer[q],I,!1);else{let $=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=w.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,X)}}else{let q=I.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=i.createRenderbuffer(),De(w.__webglDepthbuffer,I,!1);else{let $=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=w.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,X)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Lt(I,w,z){let q=n.get(I);w!==void 0&&me(q.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&Ke(I)}function U(I){let w=I.texture,z=n.get(I),q=n.get(w);I.addEventListener("dispose",E);let $=I.textures,X=I.isWebGLCubeRenderTarget===!0,Ee=$.length>1;if(Ee||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=w.version,a.memory.textures++),X){z.__webglFramebuffer=[];for(let ne=0;ne<6;ne++)if(w.mipmaps&&w.mipmaps.length>0){z.__webglFramebuffer[ne]=[];for(let Se=0;Se<w.mipmaps.length;Se++)z.__webglFramebuffer[ne][Se]=i.createFramebuffer()}else z.__webglFramebuffer[ne]=i.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){z.__webglFramebuffer=[];for(let ne=0;ne<w.mipmaps.length;ne++)z.__webglFramebuffer[ne]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(Ee)for(let ne=0,Se=$.length;ne<Se;ne++){let Me=n.get($[ne]);Me.__webglTexture===void 0&&(Me.__webglTexture=i.createTexture(),a.memory.textures++)}if(I.samples>0&&ve(I)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let ne=0;ne<$.length;ne++){let Se=$[ne];z.__webglColorRenderbuffer[ne]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[ne]);let Me=s.convert(Se.format,Se.colorSpace),te=s.convert(Se.type),he=_(Se.internalFormat,Me,te,Se.colorSpace,I.isXRRenderTarget===!0),Ie=Tt(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ie,he,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ne,i.RENDERBUFFER,z.__webglColorRenderbuffer[ne])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),De(z.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),He(i.TEXTURE_CUBE_MAP,w);for(let ne=0;ne<6;ne++)if(w.mipmaps&&w.mipmaps.length>0)for(let Se=0;Se<w.mipmaps.length;Se++)me(z.__webglFramebuffer[ne][Se],I,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Se);else me(z.__webglFramebuffer[ne],I,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0);g(w)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let ne=0,Se=$.length;ne<Se;ne++){let Me=$[ne],te=n.get(Me),he=i.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(he=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(he,te.__webglTexture),He(he,Me),me(z.__webglFramebuffer,I,Me,i.COLOR_ATTACHMENT0+ne,he,0),g(Me)&&p(he)}t.unbindTexture()}else{let ne=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ne=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ne,q.__webglTexture),He(ne,w),w.mipmaps&&w.mipmaps.length>0)for(let Se=0;Se<w.mipmaps.length;Se++)me(z.__webglFramebuffer[Se],I,w,i.COLOR_ATTACHMENT0,ne,Se);else me(z.__webglFramebuffer,I,w,i.COLOR_ATTACHMENT0,ne,0);g(w)&&p(ne),t.unbindTexture()}I.depthBuffer&&Ke(I)}function St(I){let w=I.textures;for(let z=0,q=w.length;z<q;z++){let $=w[z];if(g($)){let X=v(I),Ee=n.get($).__webglTexture;t.bindTexture(X,Ee),p(X),t.unbindTexture()}}}let ze=[],Ue=[];function xe(I){if(I.samples>0){if(ve(I)===!1){let w=I.textures,z=I.width,q=I.height,$=i.COLOR_BUFFER_BIT,X=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ee=n.get(I),ne=w.length>1;if(ne)for(let Me=0;Me<w.length;Me++)t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer);let Se=I.texture.mipmaps;Se&&Se.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let Me=0;Me<w.length;Me++){if(I.resolveDepthBuffer&&(I.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),ne){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ee.__webglColorRenderbuffer[Me]);let te=n.get(w[Me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,te,0)}i.blitFramebuffer(0,0,z,q,0,0,z,q,$,i.NEAREST),l===!0&&(ze.length=0,Ue.length=0,ze.push(i.COLOR_ATTACHMENT0+Me),I.depthBuffer&&I.resolveDepthBuffer===!1&&(ze.push(X),Ue.push(X),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ue)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ze))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ne)for(let Me=0;Me<w.length;Me++){t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,Ee.__webglColorRenderbuffer[Me]);let te=n.get(w[Me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,te,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){let w=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}}function Tt(I){return Math.min(r.maxSamples,I.samples)}function ve(I){let w=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function We(I){let w=a.render.frame;u.get(I)!==w&&(u.set(I,w),I.update())}function Bt(I,w){let z=I.colorSpace,q=I.format,$=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||z!==Nt&&z!==Wn&&(qe.getTransfer(z)===lt?(q!==hi||$!==Xi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),w}function Rt(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=D,this.resetTextureUnits=L,this.setTexture2D=k,this.setTexture2DArray=V,this.setTexture3D=K,this.setTextureCube=W,this.rebindTextures=Lt,this.setupRenderTarget=U,this.updateRenderTargetMipmap=St,this.updateMultisampleRenderTarget=xe,this.setupDepthRenderbuffer=Ke,this.setupFrameBufferTexture=me,this.useMultisampledRTT=ve}function iM(i,e){function t(n,r=Wn){let s,a=qe.getTransfer(r);if(n===Xi)return i.UNSIGNED_BYTE;if(n===sc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ac)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Zu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===$u)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Yu)return i.BYTE;if(n===ju)return i.SHORT;if(n===Hs)return i.UNSIGNED_SHORT;if(n===rc)return i.INT;if(n===Gn)return i.UNSIGNED_INT;if(n===ci)return i.FLOAT;if(n===Gs)return i.HALF_FLOAT;if(n===Ku)return i.ALPHA;if(n===Ju)return i.RGB;if(n===hi)return i.RGBA;if(n===As)return i.DEPTH_COMPONENT;if(n===Xs)return i.DEPTH_STENCIL;if(n===ho)return i.RED;if(n===uo)return i.RED_INTEGER;if(n===oc)return i.RG;if(n===lc)return i.RG_INTEGER;if(n===fo)return i.RGBA_INTEGER;if(n===po||n===mo||n===go||n===yo)if(a===lt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===po)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===mo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===go)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===yo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===po)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===mo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===go)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===yo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===cc||n===hc||n===uc||n===dc)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===cc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===hc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===uc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===dc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===fc||n===pc||n===mc)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===fc||n===pc)return a===lt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===mc)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===gc||n===yc||n===_c||n===xc||n===vc||n===bc||n===Sc||n===Tc||n===Mc||n===wc||n===Ec||n===Ac||n===Cc||n===Rc)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===gc)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===yc)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===_c)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===xc)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===vc)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===bc)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Sc)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Tc)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Mc)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===wc)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ec)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ac)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Cc)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Rc)return a===lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Pc||n===Ic||n===Lc)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Pc)return a===lt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ic)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Lc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Dc||n===Uc||n===Nc||n===Fc)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Dc)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Uc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Nc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Fc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ws?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var nM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,rM=`
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

}`,vd=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new $a(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Mi({vertexShader:nM,fragmentShader:rM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ct(new Gr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},bd=class extends ui{constructor(e,t){super();let n=this,r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,m=null,y=typeof XRWebGLBinding<"u",g=new vd,p={},v=t.getContextAttributes(),_=null,x=null,S=[],M=[],E=new de,R=null,T=new Pt;T.viewport=new Qe;let b=new Pt;b.viewport=new Qe;let P=[T,b],L=new Wl,D=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let Z=S[Y];return Z===void 0&&(Z=new Is,S[Y]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(Y){let Z=S[Y];return Z===void 0&&(Z=new Is,S[Y]=Z),Z.getGripSpace()},this.getHand=function(Y){let Z=S[Y];return Z===void 0&&(Z=new Is,S[Y]=Z),Z.getHandSpace()};function k(Y){let Z=M.indexOf(Y.inputSource);if(Z===-1)return;let me=S[Z];me!==void 0&&(me.update(Y.inputSource,Y.frame,c||a),me.dispatchEvent({type:Y.type,data:Y.inputSource}))}function V(){r.removeEventListener("select",k),r.removeEventListener("selectstart",k),r.removeEventListener("selectend",k),r.removeEventListener("squeeze",k),r.removeEventListener("squeezestart",k),r.removeEventListener("squeezeend",k),r.removeEventListener("end",V),r.removeEventListener("inputsourceschange",K);for(let Y=0;Y<S.length;Y++){let Z=M[Y];Z!==null&&(M[Y]=null,S[Y].disconnect(Z))}D=null,F=null,g.reset();for(let Y in p)delete p[Y];e.setRenderTarget(_),f=null,d=null,h=null,r=null,x=null,Ye.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h===null&&y&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(Y){if(r=Y,r!==null){if(_=e.getRenderTarget(),r.addEventListener("select",k),r.addEventListener("selectstart",k),r.addEventListener("selectend",k),r.addEventListener("squeeze",k),r.addEventListener("squeezestart",k),r.addEventListener("squeezeend",k),r.addEventListener("end",V),r.addEventListener("inputsourceschange",K),v.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(E),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,De=null,Te=null;v.depth&&(Te=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=v.stencil?Xs:As,De=v.stencil?Ws:Gn);let Ke={colorFormat:t.RGBA8,depthFormat:Te,scaleFactor:s};h=this.getBinding(),d=h.createProjectionLayer(Ke),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new Ui(d.textureWidth,d.textureHeight,{format:hi,type:Xi,depthTexture:new Za(d.textureWidth,d.textureHeight,De,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let me={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,me),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Ui(f.framebufferWidth,f.framebufferHeight,{format:hi,type:Xi,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Ye.setContext(r),Ye.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function K(Y){for(let Z=0;Z<Y.removed.length;Z++){let me=Y.removed[Z],De=M.indexOf(me);De>=0&&(M[De]=null,S[De].disconnect(me))}for(let Z=0;Z<Y.added.length;Z++){let me=Y.added[Z],De=M.indexOf(me);if(De===-1){for(let Ke=0;Ke<S.length;Ke++)if(Ke>=M.length){M.push(me),De=Ke;break}else if(M[Ke]===null){M[Ke]=me,De=Ke;break}if(De===-1)break}let Te=S[De];Te&&Te.connect(me)}}let W=new C,se=new C;function ue(Y,Z,me){W.setFromMatrixPosition(Z.matrixWorld),se.setFromMatrixPosition(me.matrixWorld);let De=W.distanceTo(se),Te=Z.projectionMatrix.elements,Ke=me.projectionMatrix.elements,Lt=Te[14]/(Te[10]-1),U=Te[14]/(Te[10]+1),St=(Te[9]+1)/Te[5],ze=(Te[9]-1)/Te[5],Ue=(Te[8]-1)/Te[0],xe=(Ke[8]+1)/Ke[0],Tt=Lt*Ue,ve=Lt*xe,We=De/(-Ue+xe),Bt=We*-Ue;if(Z.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Bt),Y.translateZ(We),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Te[10]===-1)Y.projectionMatrix.copy(Z.projectionMatrix),Y.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{let Rt=Lt+We,I=U+We,w=Tt-Bt,z=ve+(De-Bt),q=St*U/I*Rt,$=ze*U/I*Rt;Y.projectionMatrix.makePerspective(w,z,q,$,Rt,I),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function be(Y,Z){Z===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(Z.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(r===null)return;let Z=Y.near,me=Y.far;g.texture!==null&&(g.depthNear>0&&(Z=g.depthNear),g.depthFar>0&&(me=g.depthFar)),L.near=b.near=T.near=Z,L.far=b.far=T.far=me,(D!==L.near||F!==L.far)&&(r.updateRenderState({depthNear:L.near,depthFar:L.far}),D=L.near,F=L.far),L.layers.mask=Y.layers.mask|6,T.layers.mask=L.layers.mask&3,b.layers.mask=L.layers.mask&5;let De=Y.parent,Te=L.cameras;be(L,De);for(let Ke=0;Ke<Te.length;Ke++)be(Te[Ke],De);Te.length===2?ue(L,T,b):L.projectionMatrix.copy(T.projectionMatrix),He(Y,L,De)};function He(Y,Z,me){me===null?Y.matrix.copy(Z.matrixWorld):(Y.matrix.copy(me.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(Z.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(Z.projectionMatrix),Y.projectionMatrixInverse.copy(Z.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=zr*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Y){l=Y,d!==null&&(d.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(L)},this.getCameraTexture=function(Y){return p[Y]};let at=null;function vt(Y,Z){if(u=Z.getViewerPose(c||a),m=Z,u!==null){let me=u.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let De=!1;me.length!==L.cameras.length&&(L.cameras.length=0,De=!0);for(let U=0;U<me.length;U++){let St=me[U],ze=null;if(f!==null)ze=f.getViewport(St);else{let xe=h.getViewSubImage(d,St);ze=xe.viewport,U===0&&(e.setRenderTargetTextures(x,xe.colorTexture,xe.depthStencilTexture),e.setRenderTarget(x))}let Ue=P[U];Ue===void 0&&(Ue=new Pt,Ue.layers.enable(U),Ue.viewport=new Qe,P[U]=Ue),Ue.matrix.fromArray(St.transform.matrix),Ue.matrix.decompose(Ue.position,Ue.quaternion,Ue.scale),Ue.projectionMatrix.fromArray(St.projectionMatrix),Ue.projectionMatrixInverse.copy(Ue.projectionMatrix).invert(),Ue.viewport.set(ze.x,ze.y,ze.width,ze.height),U===0&&(L.matrix.copy(Ue.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),De===!0&&L.cameras.push(Ue)}let Te=r.enabledFeatures;if(Te&&Te.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&y){h=n.getBinding();let U=h.getDepthInformation(me[0]);U&&U.isValid&&U.texture&&g.init(U,r.renderState)}if(Te&&Te.includes("camera-access")&&y){e.state.unbindTexture(),h=n.getBinding();for(let U=0;U<me.length;U++){let St=me[U].camera;if(St){let ze=p[St];ze||(ze=new $a,p[St]=ze);let Ue=h.getCameraImage(St);ze.sourceTexture=Ue}}}}for(let me=0;me<S.length;me++){let De=M[me],Te=S[me];De!==null&&Te!==void 0&&Te.update(De,Z,c||a)}at&&at(Y,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),m=null}let Ye=new Eg;Ye.setAnimationLoop(vt),this.setAnimationLoop=function(Y){at=Y},this.dispose=function(){}}},$r=new di,sM=new re;function aM(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,sd(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function r(g,p,v,_,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(g,p):p.isMeshToonMaterial?(s(g,p),h(g,p)):p.isMeshPhongMaterial?(s(g,p),u(g,p)):p.isMeshStandardMaterial?(s(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,x)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),y(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,v,_):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Xt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Xt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let v=e.get(p),_=v.envMap,x=v.envMapRotation;_&&(g.envMap.value=_,$r.copy(x),$r.x*=-1,$r.y*=-1,$r.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&($r.y*=-1,$r.z*=-1),g.envMapRotation.value.setFromMatrix4(sM.makeRotationFromEuler($r)),g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,v,_){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*v,g.scale.value=_*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function h(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,v){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Xt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function y(g,p){let v=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function oM(i,e,t,n){let r={},s={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,_){let x=_.program;n.uniformBlockBinding(v,x)}function c(v,_){let x=r[v.id];x===void 0&&(m(v),x=u(v),r[v.id]=x,v.addEventListener("dispose",g));let S=_.program;n.updateUBOMapping(v,S);let M=e.render.frame;s[v.id]!==M&&(d(v),s[v.id]=M)}function u(v){let _=h();v.__bindingPointIndex=_;let x=i.createBuffer(),S=v.__size,M=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,S,M),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,x),x}function h(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){let _=r[v.id],x=v.uniforms,S=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let M=0,E=x.length;M<E;M++){let R=Array.isArray(x[M])?x[M]:[x[M]];for(let T=0,b=R.length;T<b;T++){let P=R[T];if(f(P,M,T,S)===!0){let L=P.__offset,D=Array.isArray(P.value)?P.value:[P.value],F=0;for(let k=0;k<D.length;k++){let V=D[k],K=y(V);typeof V=="number"||typeof V=="boolean"?(P.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,L+F,P.__data)):V.isMatrix3?(P.__data[0]=V.elements[0],P.__data[1]=V.elements[1],P.__data[2]=V.elements[2],P.__data[3]=0,P.__data[4]=V.elements[3],P.__data[5]=V.elements[4],P.__data[6]=V.elements[5],P.__data[7]=0,P.__data[8]=V.elements[6],P.__data[9]=V.elements[7],P.__data[10]=V.elements[8],P.__data[11]=0):(V.toArray(P.__data,F),F+=K.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,L,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(v,_,x,S){let M=v.value,E=_+"_"+x;if(S[E]===void 0)return typeof M=="number"||typeof M=="boolean"?S[E]=M:S[E]=M.clone(),!0;{let R=S[E];if(typeof M=="number"||typeof M=="boolean"){if(R!==M)return S[E]=M,!0}else if(R.equals(M)===!1)return R.copy(M),!0}return!1}function m(v){let _=v.uniforms,x=0,S=16;for(let E=0,R=_.length;E<R;E++){let T=Array.isArray(_[E])?_[E]:[_[E]];for(let b=0,P=T.length;b<P;b++){let L=T[b],D=Array.isArray(L.value)?L.value:[L.value];for(let F=0,k=D.length;F<k;F++){let V=D[F],K=y(V),W=x%S,se=W%K.boundary,ue=W+se;x+=se,ue!==0&&S-ue<K.storage&&(x+=S-ue),L.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=x,x+=K.storage}}}let M=x%S;return M>0&&(x+=S-M),v.__size=x,v.__cache={},this}function y(v){let _={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(_.boundary=4,_.storage=4):v.isVector2?(_.boundary=8,_.storage=8):v.isVector3||v.isColor?(_.boundary=16,_.storage=12):v.isVector4?(_.boundary=16,_.storage=16):v.isMatrix3?(_.boundary=48,_.storage=48):v.isMatrix4?(_.boundary=64,_.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),_}function g(v){let _=v.target;_.removeEventListener("dispose",g);let x=a.indexOf(_.__bindingPointIndex);a.splice(x,1),i.deleteBuffer(r[_.id]),delete r[_.id],delete s[_.id]}function p(){for(let v in r)i.deleteBuffer(r[v]);a=[],r={},s={}}return{bind:l,update:c,dispose:p}}var $s=class{constructor(e={}){let{canvas:t=Jm(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;let m=new Uint32Array(4),y=new Int32Array(4),g=null,p=null,v=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Hn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,S=!1;this._outputColorSpace=ut;let M=0,E=0,R=null,T=-1,b=null,P=new Qe,L=new Qe,D=null,F=new pe(0),k=0,V=t.width,K=t.height,W=1,se=null,ue=null,be=new Qe(0,0,V,K),He=new Qe(0,0,V,K),at=!1,vt=new en,Ye=!1,Y=!1,Z=new re,me=new C,De=new Qe,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ke=!1;function Lt(){return R===null?W:1}let U=n;function St(A,O){return t.getContext(A,O)}try{let A={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",ae,!1),t.addEventListener("webglcontextrestored",ge,!1),t.addEventListener("webglcontextcreationerror",J,!1),U===null){let O="webgl2";if(U=St(O,A),U===null)throw St(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let ze,Ue,xe,Tt,ve,We,Bt,Rt,I,w,z,q,$,X,Ee,ne,Se,Me,te,he,Ie,we,le,Ge;function N(){ze=new wS(U),ze.init(),we=new iM(U,ze),Ue=new _S(U,ze,e,we),xe=new eM(U,ze),Ue.reversedDepthBuffer&&d&&xe.buffers.depth.setReversed(!0),Tt=new CS(U),ve=new VT,We=new tM(U,ze,xe,ve,Ue,we,Tt),Bt=new vS(x),Rt=new MS(x),I=new Ux(U),le=new gS(U,I),w=new ES(U,I,Tt,le),z=new PS(U,w,I,Tt),te=new RS(U,Ue,We),ne=new xS(ve),q=new kT(x,Bt,Rt,ze,Ue,le,ne),$=new aM(x,ve),X=new GT,Ee=new ZT(ze),Me=new mS(x,Bt,Rt,xe,z,f,l),Se=new JT(x,z,Ue),Ge=new oM(U,Tt,Ue,xe),he=new yS(U,ze,Tt),Ie=new AS(U,ze,Tt),Tt.programs=q.programs,x.capabilities=Ue,x.extensions=ze,x.properties=ve,x.renderLists=X,x.shadowMap=Se,x.state=xe,x.info=Tt}N();let ie=new bd(x,U);this.xr=ie,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let A=ze.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=ze.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(A){A!==void 0&&(W=A,this.setSize(V,K,!1))},this.getSize=function(A){return A.set(V,K)},this.setSize=function(A,O,H=!0){if(ie.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=A,K=O,t.width=Math.floor(A*W),t.height=Math.floor(O*W),H===!0&&(t.style.width=A+"px",t.style.height=O+"px"),this.setViewport(0,0,A,O)},this.getDrawingBufferSize=function(A){return A.set(V*W,K*W).floor()},this.setDrawingBufferSize=function(A,O,H){V=A,K=O,W=H,t.width=Math.floor(A*H),t.height=Math.floor(O*H),this.setViewport(0,0,A,O)},this.getCurrentViewport=function(A){return A.copy(P)},this.getViewport=function(A){return A.copy(be)},this.setViewport=function(A,O,H,G){A.isVector4?be.set(A.x,A.y,A.z,A.w):be.set(A,O,H,G),xe.viewport(P.copy(be).multiplyScalar(W).round())},this.getScissor=function(A){return A.copy(He)},this.setScissor=function(A,O,H,G){A.isVector4?He.set(A.x,A.y,A.z,A.w):He.set(A,O,H,G),xe.scissor(L.copy(He).multiplyScalar(W).round())},this.getScissorTest=function(){return at},this.setScissorTest=function(A){xe.setScissorTest(at=A)},this.setOpaqueSort=function(A){se=A},this.setTransparentSort=function(A){ue=A},this.getClearColor=function(A){return A.copy(Me.getClearColor())},this.setClearColor=function(){Me.setClearColor(...arguments)},this.getClearAlpha=function(){return Me.getClearAlpha()},this.setClearAlpha=function(){Me.setClearAlpha(...arguments)},this.clear=function(A=!0,O=!0,H=!0){let G=0;if(A){let B=!1;if(R!==null){let ee=R.texture.format;B=ee===fo||ee===lc||ee===uo}if(B){let ee=R.texture.type,ce=ee===Xi||ee===Gn||ee===Hs||ee===Ws||ee===sc||ee===ac,ye=Me.getClearColor(),fe=Me.getClearAlpha(),Pe=ye.r,Ne=ye.g,Ce=ye.b;ce?(m[0]=Pe,m[1]=Ne,m[2]=Ce,m[3]=fe,U.clearBufferuiv(U.COLOR,0,m)):(y[0]=Pe,y[1]=Ne,y[2]=Ce,y[3]=fe,U.clearBufferiv(U.COLOR,0,y))}else G|=U.COLOR_BUFFER_BIT}O&&(G|=U.DEPTH_BUFFER_BIT),H&&(G|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ae,!1),t.removeEventListener("webglcontextrestored",ge,!1),t.removeEventListener("webglcontextcreationerror",J,!1),Me.dispose(),X.dispose(),Ee.dispose(),ve.dispose(),Bt.dispose(),Rt.dispose(),z.dispose(),le.dispose(),Ge.dispose(),q.dispose(),ie.dispose(),ie.removeEventListener("sessionstart",un),ie.removeEventListener("sessionend",vp),Er.stop()};function ae(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function ge(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;let A=Tt.autoReset,O=Se.enabled,H=Se.autoUpdate,G=Se.needsUpdate,B=Se.type;N(),Tt.autoReset=A,Se.enabled=O,Se.autoUpdate=H,Se.needsUpdate=G,Se.type=B}function J(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function j(A){let O=A.target;O.removeEventListener("dispose",j),_e(O)}function _e(A){Be(A),ve.remove(A)}function Be(A){let O=ve.get(A).programs;O!==void 0&&(O.forEach(function(H){q.releaseProgram(H)}),A.isShaderMaterial&&q.releaseShaderCache(A))}this.renderBufferDirect=function(A,O,H,G,B,ee){O===null&&(O=Te);let ce=B.isMesh&&B.matrixWorld.determinant()<0,ye=u_(A,O,H,G,B);xe.setMaterial(G,ce);let fe=H.index,Pe=1;if(G.wireframe===!0){if(fe=w.getWireframeAttribute(H),fe===void 0)return;Pe=2}let Ne=H.drawRange,Ce=H.attributes.position,Je=Ne.start*Pe,ht=(Ne.start+Ne.count)*Pe;ee!==null&&(Je=Math.max(Je,ee.start*Pe),ht=Math.min(ht,(ee.start+ee.count)*Pe)),fe!==null?(Je=Math.max(Je,0),ht=Math.min(ht,fe.count)):Ce!=null&&(Je=Math.max(Je,0),ht=Math.min(ht,Ce.count));let At=ht-Je;if(At<0||At===1/0)return;le.setup(B,G,ye,H,fe);let bt,pt=he;if(fe!==null&&(bt=I.get(fe),pt=Ie,pt.setIndex(bt)),B.isMesh)G.wireframe===!0?(xe.setLineWidth(G.wireframeLinewidth*Lt()),pt.setMode(U.LINES)):pt.setMode(U.TRIANGLES);else if(B.isLine){let Re=G.linewidth;Re===void 0&&(Re=1),xe.setLineWidth(Re*Lt()),B.isLineSegments?pt.setMode(U.LINES):B.isLineLoop?pt.setMode(U.LINE_LOOP):pt.setMode(U.LINE_STRIP)}else B.isPoints?pt.setMode(U.POINTS):B.isSprite&&pt.setMode(U.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)Rs("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),pt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(ze.get("WEBGL_multi_draw"))pt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{let Re=B._multiDrawStarts,Mt=B._multiDrawCounts,tt=B._multiDrawCount,Pi=fe?I.get(fe).bytesPerElement:1,ls=ve.get(G).currentProgram.getUniforms();for(let Ii=0;Ii<tt;Ii++)ls.setValue(U,"_gl_DrawID",Ii),pt.render(Re[Ii]/Pi,Mt[Ii])}else if(B.isInstancedMesh)pt.renderInstances(Je,At,B.count);else if(H.isInstancedBufferGeometry){let Re=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Mt=Math.min(H.instanceCount,Re);pt.renderInstances(Je,At,Mt)}else pt.render(Je,At)};function _t(A,O,H){A.transparent===!0&&A.side===mi&&A.forceSinglePass===!1?(A.side=Xt,A.needsUpdate=!0,Ko(A,O,H),A.side=Si,A.needsUpdate=!0,Ko(A,O,H),A.side=mi):Ko(A,O,H)}this.compile=function(A,O,H=null){H===null&&(H=A),p=Ee.get(H),p.init(O),_.push(p),H.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),A!==H&&A.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();let G=new Set;return A.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;let ee=B.material;if(ee)if(Array.isArray(ee))for(let ce=0;ce<ee.length;ce++){let ye=ee[ce];_t(ye,H,B),G.add(ye)}else _t(ee,H,B),G.add(ee)}),p=_.pop(),G},this.compileAsync=function(A,O,H=null){let G=this.compile(A,O,H);return new Promise(B=>{function ee(){if(G.forEach(function(ce){ve.get(ce).currentProgram.isReady()&&G.delete(ce)}),G.size===0){B(A);return}setTimeout(ee,10)}ze.get("KHR_parallel_shader_compile")!==null?ee():setTimeout(ee,10)})};let rt=null;function Cn(A){rt&&rt(A)}function un(){Er.stop()}function vp(){Er.start()}let Er=new Eg;Er.setAnimationLoop(Cn),typeof self<"u"&&Er.setContext(self),this.setAnimationLoop=function(A){rt=A,ie.setAnimationLoop(A),A===null?Er.stop():Er.start()},ie.addEventListener("sessionstart",un),ie.addEventListener("sessionend",vp),this.render=function(A,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),ie.enabled===!0&&ie.isPresenting===!0&&(ie.cameraAutoUpdate===!0&&ie.updateCamera(O),O=ie.getCamera()),A.isScene===!0&&A.onBeforeRender(x,A,O,R),p=Ee.get(A,_.length),p.init(O),_.push(p),Z.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),vt.setFromProjectionMatrix(Z,Hi,O.reversedDepth),Y=this.localClippingEnabled,Ye=ne.init(this.clippingPlanes,Y),g=X.get(A,v.length),g.init(),v.push(g),ie.enabled===!0&&ie.isPresenting===!0){let ee=x.xr.getDepthSensingMesh();ee!==null&&jh(ee,O,-1/0,x.sortObjects)}jh(A,O,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(se,ue),Ke=ie.enabled===!1||ie.isPresenting===!1||ie.hasDepthSensing()===!1,Ke&&Me.addToRenderList(g,A),this.info.render.frame++,Ye===!0&&ne.beginShadows();let H=p.state.shadowsArray;Se.render(H,A,O),Ye===!0&&ne.endShadows(),this.info.autoReset===!0&&this.info.reset();let G=g.opaque,B=g.transmissive;if(p.setupLights(),O.isArrayCamera){let ee=O.cameras;if(B.length>0)for(let ce=0,ye=ee.length;ce<ye;ce++){let fe=ee[ce];Sp(G,B,A,fe)}Ke&&Me.render(A);for(let ce=0,ye=ee.length;ce<ye;ce++){let fe=ee[ce];bp(g,A,fe,fe.viewport)}}else B.length>0&&Sp(G,B,A,O),Ke&&Me.render(A),bp(g,A,O);R!==null&&E===0&&(We.updateMultisampleRenderTarget(R),We.updateRenderTargetMipmap(R)),A.isScene===!0&&A.onAfterRender(x,A,O),le.resetDefaultState(),T=-1,b=null,_.pop(),_.length>0?(p=_[_.length-1],Ye===!0&&ne.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?g=v[v.length-1]:g=null};function jh(A,O,H,G){if(A.visible===!1)return;if(A.layers.test(O.layers)){if(A.isGroup)H=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(O);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||vt.intersectsSprite(A)){G&&De.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Z);let ce=z.update(A),ye=A.material;ye.visible&&g.push(A,ce,ye,H,De.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||vt.intersectsObject(A))){let ce=z.update(A),ye=A.material;if(G&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),De.copy(A.boundingSphere.center)):(ce.boundingSphere===null&&ce.computeBoundingSphere(),De.copy(ce.boundingSphere.center)),De.applyMatrix4(A.matrixWorld).applyMatrix4(Z)),Array.isArray(ye)){let fe=ce.groups;for(let Pe=0,Ne=fe.length;Pe<Ne;Pe++){let Ce=fe[Pe],Je=ye[Ce.materialIndex];Je&&Je.visible&&g.push(A,ce,Je,H,De.z,Ce)}}else ye.visible&&g.push(A,ce,ye,H,De.z,null)}}let ee=A.children;for(let ce=0,ye=ee.length;ce<ye;ce++)jh(ee[ce],O,H,G)}function bp(A,O,H,G){let B=A.opaque,ee=A.transmissive,ce=A.transparent;p.setupLightsView(H),Ye===!0&&ne.setGlobalState(x.clippingPlanes,H),G&&xe.viewport(P.copy(G)),B.length>0&&$o(B,O,H),ee.length>0&&$o(ee,O,H),ce.length>0&&$o(ce,O,H),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function Sp(A,O,H,G){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new Ui(1,1,{generateMipmaps:!0,type:ze.has("EXT_color_buffer_half_float")||ze.has("EXT_color_buffer_float")?Gs:Xi,minFilter:rn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace}));let ee=p.state.transmissionRenderTarget[G.id],ce=G.viewport||P;ee.setSize(ce.z*x.transmissionResolutionScale,ce.w*x.transmissionResolutionScale);let ye=x.getRenderTarget(),fe=x.getActiveCubeFace(),Pe=x.getActiveMipmapLevel();x.setRenderTarget(ee),x.getClearColor(F),k=x.getClearAlpha(),k<1&&x.setClearColor(16777215,.5),x.clear(),Ke&&Me.render(H);let Ne=x.toneMapping;x.toneMapping=Hn;let Ce=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),Ye===!0&&ne.setGlobalState(x.clippingPlanes,G),$o(A,H,G),We.updateMultisampleRenderTarget(ee),We.updateRenderTargetMipmap(ee),ze.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let ht=0,At=O.length;ht<At;ht++){let bt=O[ht],pt=bt.object,Re=bt.geometry,Mt=bt.material,tt=bt.group;if(Mt.side===mi&&pt.layers.test(G.layers)){let Pi=Mt.side;Mt.side=Xt,Mt.needsUpdate=!0,Tp(pt,H,G,Re,Mt,tt),Mt.side=Pi,Mt.needsUpdate=!0,Je=!0}}Je===!0&&(We.updateMultisampleRenderTarget(ee),We.updateRenderTargetMipmap(ee))}x.setRenderTarget(ye,fe,Pe),x.setClearColor(F,k),Ce!==void 0&&(G.viewport=Ce),x.toneMapping=Ne}function $o(A,O,H){let G=O.isScene===!0?O.overrideMaterial:null;for(let B=0,ee=A.length;B<ee;B++){let ce=A[B],ye=ce.object,fe=ce.geometry,Pe=ce.group,Ne=ce.material;Ne.allowOverride===!0&&G!==null&&(Ne=G),ye.layers.test(H.layers)&&Tp(ye,O,H,fe,Ne,Pe)}}function Tp(A,O,H,G,B,ee){A.onBeforeRender(x,O,H,G,B,ee),A.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),B.onBeforeRender(x,O,H,G,A,ee),B.transparent===!0&&B.side===mi&&B.forceSinglePass===!1?(B.side=Xt,B.needsUpdate=!0,x.renderBufferDirect(H,O,G,B,A,ee),B.side=Si,B.needsUpdate=!0,x.renderBufferDirect(H,O,G,B,A,ee),B.side=mi):x.renderBufferDirect(H,O,G,B,A,ee),A.onAfterRender(x,O,H,G,B,ee)}function Ko(A,O,H){O.isScene!==!0&&(O=Te);let G=ve.get(A),B=p.state.lights,ee=p.state.shadowsArray,ce=B.state.version,ye=q.getParameters(A,B.state,ee,O,H),fe=q.getProgramCacheKey(ye),Pe=G.programs;G.environment=A.isMeshStandardMaterial?O.environment:null,G.fog=O.fog,G.envMap=(A.isMeshStandardMaterial?Rt:Bt).get(A.envMap||G.environment),G.envMapRotation=G.environment!==null&&A.envMap===null?O.environmentRotation:A.envMapRotation,Pe===void 0&&(A.addEventListener("dispose",j),Pe=new Map,G.programs=Pe);let Ne=Pe.get(fe);if(Ne!==void 0){if(G.currentProgram===Ne&&G.lightsStateVersion===ce)return wp(A,ye),Ne}else ye.uniforms=q.getUniforms(A),A.onBeforeCompile(ye,x),Ne=q.acquireProgram(ye,fe),Pe.set(fe,Ne),G.uniforms=ye.uniforms;let Ce=G.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ce.clippingPlanes=ne.uniform),wp(A,ye),G.needsLights=f_(A),G.lightsStateVersion=ce,G.needsLights&&(Ce.ambientLightColor.value=B.state.ambient,Ce.lightProbe.value=B.state.probe,Ce.directionalLights.value=B.state.directional,Ce.directionalLightShadows.value=B.state.directionalShadow,Ce.spotLights.value=B.state.spot,Ce.spotLightShadows.value=B.state.spotShadow,Ce.rectAreaLights.value=B.state.rectArea,Ce.ltc_1.value=B.state.rectAreaLTC1,Ce.ltc_2.value=B.state.rectAreaLTC2,Ce.pointLights.value=B.state.point,Ce.pointLightShadows.value=B.state.pointShadow,Ce.hemisphereLights.value=B.state.hemi,Ce.directionalShadowMap.value=B.state.directionalShadowMap,Ce.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Ce.spotShadowMap.value=B.state.spotShadowMap,Ce.spotLightMatrix.value=B.state.spotLightMatrix,Ce.spotLightMap.value=B.state.spotLightMap,Ce.pointShadowMap.value=B.state.pointShadowMap,Ce.pointShadowMatrix.value=B.state.pointShadowMatrix),G.currentProgram=Ne,G.uniformsList=null,Ne}function Mp(A){if(A.uniformsList===null){let O=A.currentProgram.getUniforms();A.uniformsList=Zs.seqWithValue(O.seq,A.uniforms)}return A.uniformsList}function wp(A,O){let H=ve.get(A);H.outputColorSpace=O.outputColorSpace,H.batching=O.batching,H.batchingColor=O.batchingColor,H.instancing=O.instancing,H.instancingColor=O.instancingColor,H.instancingMorph=O.instancingMorph,H.skinning=O.skinning,H.morphTargets=O.morphTargets,H.morphNormals=O.morphNormals,H.morphColors=O.morphColors,H.morphTargetsCount=O.morphTargetsCount,H.numClippingPlanes=O.numClippingPlanes,H.numIntersection=O.numClipIntersection,H.vertexAlphas=O.vertexAlphas,H.vertexTangents=O.vertexTangents,H.toneMapping=O.toneMapping}function u_(A,O,H,G,B){O.isScene!==!0&&(O=Te),We.resetTextureUnits();let ee=O.fog,ce=G.isMeshStandardMaterial?O.environment:null,ye=R===null?x.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Nt,fe=(G.isMeshStandardMaterial?Rt:Bt).get(G.envMap||ce),Pe=G.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Ne=!!H.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ce=!!H.morphAttributes.position,Je=!!H.morphAttributes.normal,ht=!!H.morphAttributes.color,At=Hn;G.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(At=x.toneMapping);let bt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,pt=bt!==void 0?bt.length:0,Re=ve.get(G),Mt=p.state.lights;if(Ye===!0&&(Y===!0||A!==b)){let oi=A===b&&G.id===T;ne.setState(G,A,oi)}let tt=!1;G.version===Re.__version?(Re.needsLights&&Re.lightsStateVersion!==Mt.state.version||Re.outputColorSpace!==ye||B.isBatchedMesh&&Re.batching===!1||!B.isBatchedMesh&&Re.batching===!0||B.isBatchedMesh&&Re.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Re.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Re.instancing===!1||!B.isInstancedMesh&&Re.instancing===!0||B.isSkinnedMesh&&Re.skinning===!1||!B.isSkinnedMesh&&Re.skinning===!0||B.isInstancedMesh&&Re.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Re.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Re.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Re.instancingMorph===!1&&B.morphTexture!==null||Re.envMap!==fe||G.fog===!0&&Re.fog!==ee||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==ne.numPlanes||Re.numIntersection!==ne.numIntersection)||Re.vertexAlphas!==Pe||Re.vertexTangents!==Ne||Re.morphTargets!==Ce||Re.morphNormals!==Je||Re.morphColors!==ht||Re.toneMapping!==At||Re.morphTargetsCount!==pt)&&(tt=!0):(tt=!0,Re.__version=G.version);let Pi=Re.currentProgram;tt===!0&&(Pi=Ko(G,O,B));let ls=!1,Ii=!1,Ea=!1,wt=Pi.getUniforms(),zi=Re.uniforms;if(xe.useProgram(Pi.program)&&(ls=!0,Ii=!0,Ea=!0),G.id!==T&&(T=G.id,Ii=!0),ls||b!==A){xe.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),wt.setValue(U,"projectionMatrix",A.projectionMatrix),wt.setValue(U,"viewMatrix",A.matrixWorldInverse);let vi=wt.map.cameraPosition;vi!==void 0&&vi.setValue(U,me.setFromMatrixPosition(A.matrixWorld)),Ue.logarithmicDepthBuffer&&wt.setValue(U,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&wt.setValue(U,"isOrthographic",A.isOrthographicCamera===!0),b!==A&&(b=A,Ii=!0,Ea=!0)}if(B.isSkinnedMesh){wt.setOptional(U,B,"bindMatrix"),wt.setOptional(U,B,"bindMatrixInverse");let oi=B.skeleton;oi&&(oi.boneTexture===null&&oi.computeBoneTexture(),wt.setValue(U,"boneTexture",oi.boneTexture,We))}B.isBatchedMesh&&(wt.setOptional(U,B,"batchingTexture"),wt.setValue(U,"batchingTexture",B._matricesTexture,We),wt.setOptional(U,B,"batchingIdTexture"),wt.setValue(U,"batchingIdTexture",B._indirectTexture,We),wt.setOptional(U,B,"batchingColorTexture"),B._colorsTexture!==null&&wt.setValue(U,"batchingColorTexture",B._colorsTexture,We));let ki=H.morphAttributes;if((ki.position!==void 0||ki.normal!==void 0||ki.color!==void 0)&&te.update(B,H,Pi),(Ii||Re.receiveShadow!==B.receiveShadow)&&(Re.receiveShadow=B.receiveShadow,wt.setValue(U,"receiveShadow",B.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(zi.envMap.value=fe,zi.flipEnvMap.value=fe.isCubeTexture&&fe.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&O.environment!==null&&(zi.envMapIntensity.value=O.environmentIntensity),Ii&&(wt.setValue(U,"toneMappingExposure",x.toneMappingExposure),Re.needsLights&&d_(zi,Ea),ee&&G.fog===!0&&$.refreshFogUniforms(zi,ee),$.refreshMaterialUniforms(zi,G,W,K,p.state.transmissionRenderTarget[A.id]),Zs.upload(U,Mp(Re),zi,We)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Zs.upload(U,Mp(Re),zi,We),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&wt.setValue(U,"center",B.center),wt.setValue(U,"modelViewMatrix",B.modelViewMatrix),wt.setValue(U,"normalMatrix",B.normalMatrix),wt.setValue(U,"modelMatrix",B.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){let oi=G.uniformsGroups;for(let vi=0,Zh=oi.length;vi<Zh;vi++){let Ar=oi[vi];Ge.update(Ar,Pi),Ge.bind(Ar,Pi)}}return Pi}function d_(A,O){A.ambientLightColor.needsUpdate=O,A.lightProbe.needsUpdate=O,A.directionalLights.needsUpdate=O,A.directionalLightShadows.needsUpdate=O,A.pointLights.needsUpdate=O,A.pointLightShadows.needsUpdate=O,A.spotLights.needsUpdate=O,A.spotLightShadows.needsUpdate=O,A.rectAreaLights.needsUpdate=O,A.hemisphereLights.needsUpdate=O}function f_(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return M},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(A,O,H){let G=ve.get(A);G.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),ve.get(A.texture).__webglTexture=O,ve.get(A.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:H,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,O){let H=ve.get(A);H.__webglFramebuffer=O,H.__useDefaultFramebuffer=O===void 0};let p_=U.createFramebuffer();this.setRenderTarget=function(A,O=0,H=0){R=A,M=O,E=H;let G=!0,B=null,ee=!1,ce=!1;if(A){let fe=ve.get(A);if(fe.__useDefaultFramebuffer!==void 0)xe.bindFramebuffer(U.FRAMEBUFFER,null),G=!1;else if(fe.__webglFramebuffer===void 0)We.setupRenderTarget(A);else if(fe.__hasExternalTextures)We.rebindTextures(A,ve.get(A.texture).__webglTexture,ve.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let Ce=A.depthTexture;if(fe.__boundDepthTexture!==Ce){if(Ce!==null&&ve.has(Ce)&&(A.width!==Ce.image.width||A.height!==Ce.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");We.setupDepthRenderbuffer(A)}}let Pe=A.texture;(Pe.isData3DTexture||Pe.isDataArrayTexture||Pe.isCompressedArrayTexture)&&(ce=!0);let Ne=ve.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ne[O])?B=Ne[O][H]:B=Ne[O],ee=!0):A.samples>0&&We.useMultisampledRTT(A)===!1?B=ve.get(A).__webglMultisampledFramebuffer:Array.isArray(Ne)?B=Ne[H]:B=Ne,P.copy(A.viewport),L.copy(A.scissor),D=A.scissorTest}else P.copy(be).multiplyScalar(W).floor(),L.copy(He).multiplyScalar(W).floor(),D=at;if(H!==0&&(B=p_),xe.bindFramebuffer(U.FRAMEBUFFER,B)&&G&&xe.drawBuffers(A,B),xe.viewport(P),xe.scissor(L),xe.setScissorTest(D),ee){let fe=ve.get(A.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+O,fe.__webglTexture,H)}else if(ce){let fe=O;for(let Pe=0;Pe<A.textures.length;Pe++){let Ne=ve.get(A.textures[Pe]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Pe,Ne.__webglTexture,H,fe)}}else if(A!==null&&H!==0){let fe=ve.get(A.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,fe.__webglTexture,H)}T=-1},this.readRenderTargetPixels=function(A,O,H,G,B,ee,ce,ye=0){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let fe=ve.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&ce!==void 0&&(fe=fe[ce]),fe){xe.bindFramebuffer(U.FRAMEBUFFER,fe);try{let Pe=A.textures[ye],Ne=Pe.format,Ce=Pe.type;if(!Ue.textureFormatReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ue.textureTypeReadable(Ce)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=A.width-G&&H>=0&&H<=A.height-B&&(A.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ye),U.readPixels(O,H,G,B,we.convert(Ne),we.convert(Ce),ee))}finally{let Pe=R!==null?ve.get(R).__webglFramebuffer:null;xe.bindFramebuffer(U.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(A,O,H,G,B,ee,ce,ye=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let fe=ve.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&ce!==void 0&&(fe=fe[ce]),fe)if(O>=0&&O<=A.width-G&&H>=0&&H<=A.height-B){xe.bindFramebuffer(U.FRAMEBUFFER,fe);let Pe=A.textures[ye],Ne=Pe.format,Ce=Pe.type;if(!Ue.textureFormatReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ue.textureTypeReadable(Ce))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Je=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Je),U.bufferData(U.PIXEL_PACK_BUFFER,ee.byteLength,U.STREAM_READ),A.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ye),U.readPixels(O,H,G,B,we.convert(Ne),we.convert(Ce),0);let ht=R!==null?ve.get(R).__webglFramebuffer:null;xe.bindFramebuffer(U.FRAMEBUFFER,ht);let At=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Qm(U,At,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Je),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,ee),U.deleteBuffer(Je),U.deleteSync(At),ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,O=null,H=0){let G=Math.pow(2,-H),B=Math.floor(A.image.width*G),ee=Math.floor(A.image.height*G),ce=O!==null?O.x:0,ye=O!==null?O.y:0;We.setTexture2D(A,0),U.copyTexSubImage2D(U.TEXTURE_2D,H,0,0,ce,ye,B,ee),xe.unbindTexture()};let m_=U.createFramebuffer(),g_=U.createFramebuffer();this.copyTextureToTexture=function(A,O,H=null,G=null,B=0,ee=null){ee===null&&(B!==0?(Rs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ee=B,B=0):ee=0);let ce,ye,fe,Pe,Ne,Ce,Je,ht,At,bt=A.isCompressedTexture?A.mipmaps[ee]:A.image;if(H!==null)ce=H.max.x-H.min.x,ye=H.max.y-H.min.y,fe=H.isBox3?H.max.z-H.min.z:1,Pe=H.min.x,Ne=H.min.y,Ce=H.isBox3?H.min.z:0;else{let ki=Math.pow(2,-B);ce=Math.floor(bt.width*ki),ye=Math.floor(bt.height*ki),A.isDataArrayTexture?fe=bt.depth:A.isData3DTexture?fe=Math.floor(bt.depth*ki):fe=1,Pe=0,Ne=0,Ce=0}G!==null?(Je=G.x,ht=G.y,At=G.z):(Je=0,ht=0,At=0);let pt=we.convert(O.format),Re=we.convert(O.type),Mt;O.isData3DTexture?(We.setTexture3D(O,0),Mt=U.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(We.setTexture2DArray(O,0),Mt=U.TEXTURE_2D_ARRAY):(We.setTexture2D(O,0),Mt=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,O.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,O.unpackAlignment);let tt=U.getParameter(U.UNPACK_ROW_LENGTH),Pi=U.getParameter(U.UNPACK_IMAGE_HEIGHT),ls=U.getParameter(U.UNPACK_SKIP_PIXELS),Ii=U.getParameter(U.UNPACK_SKIP_ROWS),Ea=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,bt.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,bt.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Pe),U.pixelStorei(U.UNPACK_SKIP_ROWS,Ne),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ce);let wt=A.isDataArrayTexture||A.isData3DTexture,zi=O.isDataArrayTexture||O.isData3DTexture;if(A.isDepthTexture){let ki=ve.get(A),oi=ve.get(O),vi=ve.get(ki.__renderTarget),Zh=ve.get(oi.__renderTarget);xe.bindFramebuffer(U.READ_FRAMEBUFFER,vi.__webglFramebuffer),xe.bindFramebuffer(U.DRAW_FRAMEBUFFER,Zh.__webglFramebuffer);for(let Ar=0;Ar<fe;Ar++)wt&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ve.get(A).__webglTexture,B,Ce+Ar),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ve.get(O).__webglTexture,ee,At+Ar)),U.blitFramebuffer(Pe,Ne,ce,ye,Je,ht,ce,ye,U.DEPTH_BUFFER_BIT,U.NEAREST);xe.bindFramebuffer(U.READ_FRAMEBUFFER,null),xe.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(B!==0||A.isRenderTargetTexture||ve.has(A)){let ki=ve.get(A),oi=ve.get(O);xe.bindFramebuffer(U.READ_FRAMEBUFFER,m_),xe.bindFramebuffer(U.DRAW_FRAMEBUFFER,g_);for(let vi=0;vi<fe;vi++)wt?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ki.__webglTexture,B,Ce+vi):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ki.__webglTexture,B),zi?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,oi.__webglTexture,ee,At+vi):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,oi.__webglTexture,ee),B!==0?U.blitFramebuffer(Pe,Ne,ce,ye,Je,ht,ce,ye,U.COLOR_BUFFER_BIT,U.NEAREST):zi?U.copyTexSubImage3D(Mt,ee,Je,ht,At+vi,Pe,Ne,ce,ye):U.copyTexSubImage2D(Mt,ee,Je,ht,Pe,Ne,ce,ye);xe.bindFramebuffer(U.READ_FRAMEBUFFER,null),xe.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else zi?A.isDataTexture||A.isData3DTexture?U.texSubImage3D(Mt,ee,Je,ht,At,ce,ye,fe,pt,Re,bt.data):O.isCompressedArrayTexture?U.compressedTexSubImage3D(Mt,ee,Je,ht,At,ce,ye,fe,pt,bt.data):U.texSubImage3D(Mt,ee,Je,ht,At,ce,ye,fe,pt,Re,bt):A.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,ee,Je,ht,ce,ye,pt,Re,bt.data):A.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,ee,Je,ht,bt.width,bt.height,pt,bt.data):U.texSubImage2D(U.TEXTURE_2D,ee,Je,ht,ce,ye,pt,Re,bt);U.pixelStorei(U.UNPACK_ROW_LENGTH,tt),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Pi),U.pixelStorei(U.UNPACK_SKIP_PIXELS,ls),U.pixelStorei(U.UNPACK_SKIP_ROWS,Ii),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ea),ee===0&&O.generateMipmaps&&U.generateMipmap(Mt),xe.unbindTexture()},this.initRenderTarget=function(A){ve.get(A).__webglFramebuffer===void 0&&We.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?We.setTextureCube(A,0):A.isData3DTexture?We.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?We.setTexture2DArray(A,0):We.setTexture2D(A,0),xe.unbindTexture()},this.resetState=function(){M=0,E=0,R=null,xe.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Hi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=qe._getUnpackColorSpace()}};var Td=new WeakMap,Gc=class extends Wi{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,r){let s=new nn(this.manager);s.setPath(this.path),s.setResponseType("arraybuffer"),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,a=>{this.parse(a,t,r)},n,r)}parse(e,t,n=()=>{}){this.decodeDracoFile(e,t,null,null,ut,n).catch(n)}decodeDracoFile(e,t,n,r,s=Nt,a=()=>{}){let o={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:r||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:s};return this.decodeGeometry(e,o).then(t).catch(a)}decodeGeometry(e,t){let n=JSON.stringify(t);if(Td.has(e)){let l=Td.get(e);if(l.key===n)return l.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let r,s=this.workerNextTaskID++,a=e.byteLength,o=this._getWorker(s,a).then(l=>(r=l,new Promise((c,u)=>{r._callbacks[s]={resolve:c,reject:u},r.postMessage({type:"decode",id:s,taskConfig:t,buffer:e},[e])}))).then(l=>this._createGeometry(l.geometry));return o.catch(()=>!0).then(()=>{r&&s&&this._releaseTask(r,s)}),Td.set(e,{key:n,promise:o}),o}_createGeometry(e){let t=new dt;e.index&&t.setIndex(new ke(e.index.array,1));for(let n=0;n<e.attributes.length;n++){let r=e.attributes[n],s=r.name,a=r.array,o=r.itemSize,l=new ke(a,o);s==="color"&&(this._assignVertexColorSpace(l,r.vertexColorSpace),l.normalized=!(a instanceof Float32Array)),t.setAttribute(s,l)}return t}_assignVertexColorSpace(e,t){if(t!==ut)return;let n=new pe;for(let r=0,s=e.count;r<s;r++)n.fromBufferAttribute(e,r),qe.colorSpaceToWorking(n,ut),e.setXYZ(r,n.r,n.g,n.b)}_loadLibrary(e,t){let n=new nn(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((r,s)=>{n.load(e,r,void 0,s)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;let e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{let r=n[0];e||(this.decoderConfig.wasmBinary=n[1]);let s=lM.toString(),a=["/* draco decoder */",r,"","/* worker */",s.substring(s.indexOf("{")+1,s.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([a]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){let r=new Worker(this.workerSourceURL);r._callbacks={},r._taskCosts={},r._taskLoad=0,r.postMessage({type:"init",decoderConfig:this.decoderConfig}),r.onmessage=function(s){let a=s.data;switch(a.type){case"decode":r._callbacks[a.id].resolve(a);break;case"error":r._callbacks[a.id].reject(a);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+a.type+'"')}},this.workerPool.push(r)}else this.workerPool.sort(function(r,s){return r._taskLoad>s._taskLoad?-1:1});let n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}};function lM(){let i,e;onmessage=function(a){let o=a.data;switch(o.type){case"init":i=o.decoderConfig,e=new Promise(function(u){i.onModuleLoaded=function(h){u({draco:h})},DracoDecoderModule(i)});break;case"decode":let l=o.buffer,c=o.taskConfig;e.then(u=>{let h=u.draco,d=new h.Decoder;try{let f=t(h,d,new Int8Array(l),c),m=f.attributes.map(y=>y.array.buffer);f.index&&m.push(f.index.array.buffer),self.postMessage({type:"decode",id:o.id,geometry:f},m)}catch(f){console.error(f),self.postMessage({type:"error",id:o.id,error:f.message})}finally{h.destroy(d)}});break}};function t(a,o,l,c){let u=c.attributeIDs,h=c.attributeTypes,d,f,m=o.GetEncodedGeometryType(l);if(m===a.TRIANGULAR_MESH)d=new a.Mesh,f=o.DecodeArrayToMesh(l,l.byteLength,d);else if(m===a.POINT_CLOUD)d=new a.PointCloud,f=o.DecodeArrayToPointCloud(l,l.byteLength,d);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!f.ok()||d.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+f.error_msg());let y={index:null,attributes:[]};for(let g in u){let p=self[h[g]],v,_;if(c.useUniqueIDs)_=u[g],v=o.GetAttributeByUniqueId(d,_);else{if(_=o.GetAttributeId(d,a[u[g]]),_===-1)continue;v=o.GetAttribute(d,_)}let x=r(a,o,d,g,p,v);g==="color"&&(x.vertexColorSpace=c.vertexColorSpace),y.attributes.push(x)}return m===a.TRIANGULAR_MESH&&(y.index=n(a,o,d)),a.destroy(d),y}function n(a,o,l){let u=l.num_faces()*3,h=u*4,d=a._malloc(h);o.GetTrianglesUInt32Array(l,h,d);let f=new Uint32Array(a.HEAPF32.buffer,d,u).slice();return a._free(d),{array:f,itemSize:1}}function r(a,o,l,c,u,h){let d=h.num_components(),m=l.num_points()*d,y=m*u.BYTES_PER_ELEMENT,g=s(a,u),p=a._malloc(y);o.GetAttributeDataArrayForAllPoints(l,h,g,y,p);let v=new u(a.HEAPF32.buffer,p,m).slice();return a._free(p),{name:c,array:v,itemSize:d}}function s(a,o){switch(o){case Float32Array:return a.DT_FLOAT32;case Int8Array:return a.DT_INT8;case Int16Array:return a.DT_INT16;case Int32Array:return a.DT_INT32;case Uint8Array:return a.DT_UINT8;case Uint16Array:return a.DT_UINT16;case Uint32Array:return a.DT_UINT32}}}var Js=Math.pow(2,-24),vo=Symbol("SKIP_GENERATION"),Wc={strategy:0,maxDepth:40,targetLeafSize:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null,[vo]:!1};function gt(i,e,t){return t.min.x=e[i],t.min.y=e[i+1],t.min.z=e[i+2],t.max.x=e[i+3],t.max.y=e[i+4],t.max.z=e[i+5],t}function bo(i){let e=-1,t=-1/0;for(let n=0;n<3;n++){let r=i[n+3]-i[n];r>t&&(t=r,e=n)}return e}function Md(i,e,t){for(let n=0;n<3;n++){let r=e[i+2*n],s=e[i+2*n+1],a=r-s,o=r+s;a<t[n]&&(t[n]=a),o>t[n+3]&&(t[n+3]=o)}}function Xc(i){let e=i[3]-i[0],t=i[4]-i[1],n=i[5]-i[2];return 2*(e*t+t*n+n*e)}function et(i,e){return e[i+15]===65535}function st(i,e){return e[i+6]}function ft(i,e){return e[i+14]}function it(i){return i+8}function nt(i,e){let t=e[i+6];return i+t*8}function Qs(i,e){return e[i+7]}function qc(i,e,t,n,r){let s=1/0,a=1/0,o=1/0,l=-1/0,c=-1/0,u=-1/0,h=1/0,d=1/0,f=1/0,m=-1/0,y=-1/0,g=-1/0,p=i.offset||0;for(let v=(e-p)*6,_=(e+t-p)*6;v<_;v+=6){let x=i[v+0],S=i[v+1],M=x-S,E=x+S;M<s&&(s=M),E>l&&(l=E),x<h&&(h=x),x>m&&(m=x);let R=i[v+2],T=i[v+3],b=R-T,P=R+T;b<a&&(a=b),P>c&&(c=P),R<d&&(d=R),R>y&&(y=R);let L=i[v+4],D=i[v+5],F=L-D,k=L+D;F<o&&(o=F),k>u&&(u=k),L<f&&(f=L),L>g&&(g=L)}n[0]=s,n[1]=a,n[2]=o,n[3]=l,n[4]=c,n[5]=u,r[0]=h,r[1]=d,r[2]=f,r[3]=m,r[4]=y,r[5]=g}var wn=8,Ed=8,wd=new Int32Array(wn),Mn=new Float32Array(wn*6),ea=new Float32Array(wn*6),sn=new Float32Array(6),Yc=new Float32Array(6),hr=new Int32Array(Ed),Dg=new Float32Array(Ed*6);function uM(i,e,t,n){for(let r=0;r<3;r++){let s=e[i+2*r],a=e[i+2*r+1],o=s-a,l=s+a;o<t[n+r]&&(t[n+r]=o),l>t[n+r+3]&&(t[n+r+3]=l)}}function Ug(i,e){let t=i[e+3]-i[e],n=i[e+4]-i[e+1],r=i[e+5]-i[e+2];return 2*(t*n+n*r+r*t)}function Ng(i,e,t,n,r,s){let a=-1,o=0;if(s===0)a=bo(e),a!==-1&&(o=(e[a]+e[a+3])/2);else if(s===1)a=bo(i),a!==-1&&(o=dM(t,n,r,a));else if(s===2){let l=Xc(i),c=1.25*r,u=t.offset||0,h=(n-u)*6,d=(n+r-u)*6;for(let f=0;f<3;f++){let m=e[f],p=(e[f+3]-m)/wn;if(r<Ed){for(let v=0;v<r;v++){let _=h+v*6,x=t[_+2*f],S=v;for(;S>0&&t[hr[S-1]+2*f]>x;)hr[S]=hr[S-1],S--;hr[S]=_}for(let v=0;v<3;v++)sn[v]=1/0,sn[v+3]=-1/0,Yc[v]=1/0,Yc[v+3]=-1/0;for(let v=r-1;v>=0;v--)Md(hr[v],t,Yc),Dg.set(Yc,v*6);for(let v=0;v<r-1;v++){Md(hr[v],t,sn);let _=t[hr[v+1]+2*f];if(t[hr[v]+2*f]===_)continue;let x=v+1,S=r-x,M=Xc(sn)/l,E=Ug(Dg,x*6)/l,R=1+1.25*(M*x+E*S);R<c&&(a=f,c=R,o=_)}}else{for(let x=0;x<wn;x++){wd[x]=0;for(let S=0;S<3;S++)Mn[x*6+S]=1/0,Mn[x*6+S+3]=-1/0}for(let x=h;x<d;x+=6){let E=~~((t[x+2*f]-m)/p);E>=wn&&(E=wn-1),wd[E]++,uM(x,t,Mn,E*6)}let v=(wn-1)*6;for(let x=0;x<6;x++)ea[v+x]=Mn[v+x];for(let x=wn-2;x>=0;x--){let S=x*6,M=S+6;for(let E=0;E<3;E++)ea[S+E]=Math.min(Mn[S+E],ea[M+E]),ea[S+E+3]=Math.max(Mn[S+E+3],ea[M+E+3])}let _=0;for(let x=0;x<wn-1;x++){let S=x*6,M=wd[x];if(M!==0)for(let P=0;P<3;P++)_===0?(sn[P]=Mn[S+P],sn[P+3]=Mn[S+P+3]):(sn[P]=Math.min(sn[P],Mn[S+P]),sn[P+3]=Math.max(sn[P+3],Mn[S+P+3]));_+=M;let E=0,R=0;_!==0&&(E=Xc(sn)/l);let T=r-_;T!==0&&(R=Ug(ea,S+6)/l);let b=1+1.25*(E*_+R*T);b<c&&(a=f,c=b,o=m+p+x*p)}}}}else console.warn(`BVH: Invalid build strategy value ${s} used.`);return{axis:a,pos:o}}function dM(i,e,t,n){let r=0,s=i.offset;for(let a=e,o=e+t;a<o;a++)r+=i[(a-s)*6+n*2];return r/t}function Fg(i,e,t,n,r,s){let a=n,o=n+r-1,l=s.pos,c=s.axis*2,u=t.offset||0;for(;;){for(;a<=o&&t[(a-u)*6+c]<l;)a++;for(;a<=o&&t[(o-u)*6+c]>=l;)o--;if(a<o){for(let h=0;h<e;h++){let d=i[a*e+h];i[a*e+h]=i[o*e+h],i[o*e+h]=d}for(let h=0;h<6;h++){let d=a-u,f=o-u,m=t[d*6+h];t[d*6+h]=t[f*6+h],t[f*6+h]=m}a++,o--}else return a}}var fM=Math.pow(2,32),ta=new Float32Array(6),jc=new Float32Array(6);function pM(i,e,t,n,r,s){let{maxDepth:a,verbose:o,targetLeafSize:l,_strictLeafSize:c=1/0,strategy:u,onProgress:h,useSharedArrayBuffer:d=!1}=r,f=i.primitiveBuffer,m=i.primitiveBufferStride,y=d?SharedArrayBuffer:ArrayBuffer,g=new y(32*Math.max(1,2*Math.ceil(n)-1)),p=new Float32Array(g),v=new Uint32Array(g),_=new Uint16Array(g),x=0,S=!1;return qc(e,t,n,ta,jc),R(t,n,0),g.slice(0,x*32);function M(T){h&&h((T-s.offset)/s.count)}function E(T,b,P){let L=T*2;v[T+6]=b,_[L+14]=P,_[L+15]=65535,M(b+P)}function R(T,b,P){let L=x++,D=L*8;p.set(ta,D),!S&&P>=a&&(S=!0,o&&console.warn(`BVH: Max depth of ${a} reached when generating BVH. Consider increasing maxDepth.`));let F=b>c;if(b<=l&&!F||P>=a){E(D,T,b);return}let k=Ng(ta,jc,e,T,b,u),V=k.axis===-1?-1:Fg(f,m,e,T,b,k);if(k.axis===-1||V===T||V===T+b){if(!F){E(D,T,b);return}k.axis=Math.max(0,bo(ta)),V=T+Math.max(1,Math.floor(b/2))}v[D+7]=k.axis;let K=V-T;qc(e,T,K,ta,jc),R(T,K,P+1);let W=x-L;if(W>fM)throw new Error("MeshBVH: Cannot store relative child node offset greater than 32 bits.");v[D+6]=W;let se=b-K;qc(e,V,se,ta,jc),R(V,se,P+1)}}function Og(i,e){let t=i.getRootRanges(e.range),n=t[0],r=t[t.length-1],s={offset:n.offset,count:r.offset+r.count-n.offset},a=new Float32Array(6*s.count);a.offset=s.offset,i.computePrimitiveBounds(s.offset,s.count,a),i._roots=t.map(o=>pM(i,a,o.offset,o.count,e,s))}var ur=class{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){let e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}};var Ad=class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;let e=[],t=null;this.setBuffer=n=>{t&&e.push(t),t=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}},Ze=new Ad;var dr,na,ia=[],Zc=new ur(()=>new je);function Bg(i,e,t,n,r,s){dr=Zc.getPrimitive(),na=Zc.getPrimitive(),ia.push(dr,na),Ze.setBuffer(i._roots[e]);let a=Cd(0,i.geometry,t,n,r,s);Ze.clearBuffer(),Zc.releasePrimitive(dr),Zc.releasePrimitive(na),ia.pop(),ia.pop();let o=ia.length;return o>0&&(na=ia[o-1],dr=ia[o-2]),a}function Cd(i,e,t,n,r=null,s=0,a=0){let{float32Array:o,uint16Array:l,uint32Array:c}=Ze,u=i*2;if(et(u,l)){let d=st(i,c),f=ft(u,l);return gt(i,o,dr),n(d,f,!1,a,s+i/8,dr)}else{let b=function(L){let{uint16Array:D,uint32Array:F}=Ze,k=L*2;for(;!et(k,D);)L=it(L),k=L*2;return st(L,F)},P=function(L){let{uint16Array:D,uint32Array:F}=Ze,k=L*2;for(;!et(k,D);)L=nt(L,F),k=L*2;return st(L,F)+ft(k,D)},d=it(i),f=nt(i,c),m=d,y=f,g,p,v,_;if(r&&(v=dr,_=na,gt(m,o,v),gt(y,o,_),g=r(v),p=r(_),p<g)){m=f,y=d;let L=g;g=p,p=L,v=_}v||(v=dr,gt(m,o,v));let x=et(m*2,l),S=t(v,x,g,a+1,s+m/8),M;if(S===2){let L=b(m),F=P(m)-L;M=n(L,F,!0,a+1,s+m/8,v)}else M=S&&Cd(m,e,t,n,r,s,a+1);if(M)return!0;_=na,gt(y,o,_);let E=et(y*2,l),R=t(_,E,p,a+1,s+y/8),T;if(R===2){let L=b(y),F=P(y)-L;T=n(L,F,!0,a+1,s+y/8,_)}else T=R&&Cd(y,e,t,n,r,s,a+1);return!!T}}var So=new Ze.constructor,$c=new Ze.constructor,fr=new ur(()=>new je),ra=new je,sa=new je,Pd=new je,Id=new je,Ld=!1;function zg(i,e,t,n){if(Ld)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");Ld=!0;let r=i._roots,s=e._roots,a,o=0,l=0,c=new re().copy(t).invert();for(let u=0,h=r.length;u<h;u++){So.setBuffer(r[u]),l=0;let d=fr.getPrimitive();gt(0,So.float32Array,d),d.applyMatrix4(c);for(let f=0,m=s.length;f<m&&($c.setBuffer(s[f]),a=an(0,0,t,c,n,o,l,0,0,d),$c.clearBuffer(),l+=s[f].byteLength/32,!a);f++);if(fr.releasePrimitive(d),So.clearBuffer(),o+=r[u].byteLength/32,a)break}return Ld=!1,a}function an(i,e,t,n,r,s=0,a=0,o=0,l=0,c=null,u=!1){let h,d;u?(h=$c,d=So):(h=So,d=$c);let f=h.float32Array,m=h.uint32Array,y=h.uint16Array,g=d.float32Array,p=d.uint32Array,v=d.uint16Array,_=i*2,x=e*2,S=et(_,y),M=et(x,v),E=!1;if(M&&S)u?E=r(st(e,p),ft(e*2,v),st(i,m),ft(i*2,y),l,a+e/8,o,s+i/8):E=r(st(i,m),ft(i*2,y),st(e,p),ft(e*2,v),o,s+i/8,l,a+e/8);else if(M){let R=fr.getPrimitive();gt(e,g,R),R.applyMatrix4(t);let T=it(i),b=nt(i,m);gt(T,f,ra),gt(b,f,sa);let P=R.intersectsBox(ra),L=R.intersectsBox(sa);E=P&&an(e,T,n,t,r,a,s,l,o+1,R,!u)||L&&an(e,b,n,t,r,a,s,l,o+1,R,!u),fr.releasePrimitive(R)}else{let R=it(e),T=nt(e,p);gt(R,g,Pd),gt(T,g,Id);let b=c.intersectsBox(Pd),P=c.intersectsBox(Id);if(b&&P)E=an(i,R,t,n,r,s,a,o,l+1,c,u)||an(i,T,t,n,r,s,a,o,l+1,c,u);else if(b)if(S)E=an(i,R,t,n,r,s,a,o,l+1,c,u);else{let L=fr.getPrimitive();L.copy(Pd).applyMatrix4(t);let D=it(i),F=nt(i,m);gt(D,f,ra),gt(F,f,sa);let k=L.intersectsBox(ra),V=L.intersectsBox(sa);E=k&&an(R,D,n,t,r,a,s,l,o+1,L,!u)||V&&an(R,F,n,t,r,a,s,l,o+1,L,!u),fr.releasePrimitive(L)}else if(P)if(S)E=an(i,T,t,n,r,s,a,o,l+1,c,u);else{let L=fr.getPrimitive();L.copy(Id).applyMatrix4(t);let D=it(i),F=nt(i,m);gt(D,f,ra),gt(F,f,sa);let k=L.intersectsBox(ra),V=L.intersectsBox(sa);E=k&&an(T,D,n,t,r,a,s,l,o+1,L,!u)||V&&an(T,F,n,t,r,a,s,l,o+1,L,!u),fr.releasePrimitive(L)}}return E}var Kc=new class{constructor(){let i=null,e=null,t=null,n=!1;this.root=null,this.buffer=null,this.uint32Array=null,this.uint16Array=null,this.setBVH=(s,a)=>{if(n)throw new Error("BVHTraversalHelper: cannot call setBVH during an active traversal.");this.root=a,this.buffer=i=s._roots[a],this.uint16Array=t=new Uint16Array(i),this.uint32Array=e=new Uint32Array(i)},this.reset=()=>{this.root=null,this.buffer=i=null,this.uint16Array=t=null,this.uint32Array=e=null},this.getRangeStart=s=>{let a=s*2;for(;!et(a,t);)s=it(s),a=s*2;return st(s,e)},this.getRangeEnd=s=>{let a=s*2;for(;!et(a,t);)s=nt(s,e),a=s*2;return st(s,e)+ft(a,t)};let r=(s,a,o)=>{let l=a*2,c=et(l,t);if(!s(o,c,a)&&!c){let h=it(a),d=nt(a,e);r(s,h,o+1),r(s,d,o+1)}};this.traverseBuffer=s=>{if(n)throw new Error("BVHTraversalHelper: cannot start a traversal during an active traversal.");n=!0;try{r(s,0,0)}finally{n=!1}},this.traverse=s=>{this.traverseBuffer((a,o,l)=>{if(o){let c=l*2,u=e[l+6],h=t[c+14];return s(a,o,new Float32Array(i,l*4,6),u,h)}else{let c=Qs(l,e);return s(a,o,new Float32Array(i,l*4,6),c)}})}}};var kg=new je,aa=new Float32Array(6),Jc=class{constructor(){this._roots=null,this.primitiveBuffer=null,this.primitiveBufferStride=null}init(e){e={...Wc,...e},"maxLeafSize"in e&&(console.warn('BVH: "maxLeafSize" option has been deprecated. Use "targetLeafSize", instead.'),e={...e,targetLeafSize:e.maxLeafSize}),Og(this,e)}getRootRanges(){throw new Error("BVH: getRootRanges() not implemented")}writePrimitiveBounds(){throw new Error("BVH: writePrimitiveBounds() not implemented")}writePrimitiveRangeBounds(e,t,n,r){let s=1/0,a=1/0,o=1/0,l=-1/0,c=-1/0,u=-1/0;for(let h=e,d=e+t;h<d;h++){this.writePrimitiveBounds(h,aa,0);let[f,m,y,g,p,v]=aa;f<s&&(s=f),g>l&&(l=g),m<a&&(a=m),p>c&&(c=p),y<o&&(o=y),v>u&&(u=v)}return n[r+0]=s,n[r+1]=a,n[r+2]=o,n[r+3]=l,n[r+4]=c,n[r+5]=u,n}computePrimitiveBounds(e,t,n){let r=n.offset||0;for(let s=e,a=e+t;s<a;s++){this.writePrimitiveBounds(s,aa,0);let[o,l,c,u,h,d]=aa,f=(o+u)/2,m=(l+h)/2,y=(c+d)/2,g=(u-o)/2,p=(h-l)/2,v=(d-c)/2,_=(s-r)*6;n[_+0]=f,n[_+1]=g+(Math.abs(f)+g)*Js,n[_+2]=m,n[_+3]=p+(Math.abs(m)+p)*Js,n[_+4]=y,n[_+5]=v+(Math.abs(y)+v)*Js}return n}shiftPrimitiveOffsets(e){let t=this._indirectBuffer;if(t)for(let n=0,r=t.length;n<r;n++)t[n]+=e;else{let n=this._roots;for(let r=0;r<n.length;r++){let s=n[r],a=new Uint32Array(s),o=new Uint16Array(s),l=s.byteLength/32;for(let c=0;c<l;c++){let u=8*c,h=2*u;et(h,o)&&(a[u+6]+=e)}}}}traverse(e,t=0){Kc.setBVH(this,t),Kc.traverse(e),Kc.reset()}refit(){let e=this._roots;for(let t=0,n=e.length;t<n;t++){let r=e[t],s=new Uint32Array(r),a=new Uint16Array(r),o=new Float32Array(r),l=r.byteLength/32;for(let c=l-1;c>=0;c--){let u=c*8,h=u*2;if(et(h,a)){let f=st(u,s),m=ft(h,a);this.writePrimitiveRangeBounds(f,m,aa,0),o.set(aa,u)}else{let f=it(u),m=nt(u,s);for(let y=0;y<3;y++){let g=o[f+y],p=o[f+y+3],v=o[m+y],_=o[m+y+3];o[u+y]=g<v?g:v,o[u+y+3]=p>_?p:_}}}}}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(n=>{gt(0,new Float32Array(n),kg),e.union(kg)}),e}shapecast(e){let{boundsTraverseOrder:t,intersectsBounds:n,intersectsRange:r,intersectsPrimitive:s,scratchPrimitive:a,iterate:o}=e;if(r&&s){let h=r;r=(d,f,m,y,g)=>h(d,f,m,y,g)?!0:o(d,f,this,s,m,y,a)}else r||(s?r=(h,d,f,m)=>o(h,d,this,s,f,m,a):r=(h,d,f)=>f);let l=!1,c=0,u=this._roots;for(let h=0,d=u.length;h<d;h++){let f=u[h];if(l=Bg(this,h,n,r,t,c),l)break;c+=f.byteLength/32}return l}bvhcast(e,t,n){let{intersectsRanges:r}=n;return zg(this,e,t,r)}};function Vg(){return typeof SharedArrayBuffer<"u"}function Dd(i){return i.index?i.index.count:i.attributes.position.count}function pr(i){return Dd(i)/3}function gM(i,e=ArrayBuffer){return i>65535?new Uint32Array(new e(4*i)):new Uint16Array(new e(2*i))}function Hg(i,e){if(!i.index){let t=i.attributes.position.count,n=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,r=gM(t,n);i.setIndex(new ke(r,1));for(let s=0;s<t;s++)r[s]=s}}function yM(i,e,t){let n=Dd(i)/t,r=e||i.drawRange,s=r.start/t,a=(r.start+r.count)/t,o=Math.max(0,s),l=Math.min(n,a)-o;return{offset:Math.floor(o),count:Math.floor(l)}}function _M(i,e){return i.groups.map(t=>({offset:t.start/e,count:t.count/e}))}function Ud(i,e,t){let n=yM(i,e,t),r=_M(i,t);if(!r.length)return[n];let s=[],a=n.offset,o=n.offset+n.count,l=Dd(i)/t,c=[];for(let d of r){let{offset:f,count:m}=d,y=f,g=isFinite(m)?m:l-f,p=f+g;y<o&&p>a&&(c.push({pos:Math.max(a,y),isStart:!0}),c.push({pos:Math.min(o,p),isStart:!1}))}c.sort((d,f)=>d.pos!==f.pos?d.pos-f.pos:d.type==="end"?-1:1);let u=0,h=null;for(let d of c){let f=d.pos;u!==0&&f!==h&&s.push({offset:h,count:f-h}),u+=d.isStart?1:-1,h=f}return s}function xM(i,e){let t=i[i.length-1],n=t.offset+t.count>2**16,r=i.reduce((c,u)=>c+u.count,0),s=n?4:2,a=e?new SharedArrayBuffer(r*s):new ArrayBuffer(r*s),o=n?new Uint32Array(a):new Uint16Array(a),l=0;for(let c=0;c<i.length;c++){let{offset:u,count:h}=i[c];for(let d=0;d<h;d++)o[l+d]=u+d;l+=h}return o}var Qc=class extends Jc{get indirect(){return!!this._indirectBuffer}get primitiveStride(){return null}get primitiveBufferStride(){return this.indirect?1:this.primitiveStride}set primitiveBufferStride(e){}get primitiveBuffer(){return this.indirect?this._indirectBuffer:this.geometry.index.array}set primitiveBuffer(e){}constructor(e,t={}){if(e.isBufferGeometry){if(e.index&&e.index.isInterleavedBufferAttribute)throw new Error("BVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("BVH: Only BufferGeometries are supported.");if(t.useSharedArrayBuffer&&!Vg())throw new Error("BVH: SharedArrayBuffer is not available.");super(),this.geometry=e,this.resolvePrimitiveIndex=t.indirect?n=>this._indirectBuffer[n]:n=>n,this.primitiveBuffer=null,this.primitiveBufferStride=null,this._indirectBuffer=null,t={...Wc,...t},t[vo]||this.init(t)}init(e){let{geometry:t,primitiveStride:n}=this;if(e.indirect){let r=Ud(t,e.range,n),s=xM(r,e.useSharedArrayBuffer);this._indirectBuffer=s}else Hg(t,e);super.init(e),!t.boundingBox&&e.setBoundingBox&&(t.boundingBox=this.getBoundingBox(new je))}getRootRanges(e){return this.indirect?[{offset:0,count:this._indirectBuffer.length}]:Ud(this.geometry,e,this.primitiveStride)}raycastObject3D(){throw new Error("BVH: raycastObject3D() not implemented")}};var Fi=class{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let n=1/0,r=-1/0;for(let s=0,a=e.length;s<a;s++){let l=e[s][t];n=l<n?l:n,r=l>r?l:r}this.min=n,this.max=r}setFromPoints(e,t){let n=1/0,r=-1/0;for(let s=0,a=t.length;s<a;s++){let o=t[s],l=e.dot(o);n=l<n?l:n,r=l>r?l:r}this.min=n,this.max=r}isSeparated(e){return this.min>e.max||e.min>this.max}};Fi.prototype.setFromBox=(function(){let i=new C;return function(t,n){let r=n.min,s=n.max,a=1/0,o=-1/0;for(let l=0;l<=1;l++)for(let c=0;c<=1;c++)for(let u=0;u<=1;u++){i.x=r.x*l+s.x*(1-l),i.y=r.y*c+s.y*(1-c),i.z=r.z*u+s.z*(1-u);let h=t.dot(i);a=Math.min(h,a),o=Math.max(h,o)}this.min=a,this.max=o}})();var vM=(function(){let i=new C,e=new C,t=new C;return function(r,s,a){let o=r.start,l=i,c=s.start,u=e;t.subVectors(o,c),i.subVectors(r.end,r.start),e.subVectors(s.end,s.start);let h=t.dot(u),d=u.dot(l),f=u.dot(u),m=t.dot(l),g=l.dot(l)*f-d*d,p,v;g!==0?p=(h*d-m*f)/g:p=0,v=(h+p*d)/f,a.x=p,a.y=v}})(),To=(function(){let i=new de,e=new C,t=new C;return function(r,s,a,o){vM(r,s,i);let l=i.x,c=i.y;if(l>=0&&l<=1&&c>=0&&c<=1){r.at(l,a),s.at(c,o);return}else if(l>=0&&l<=1){c<0?s.at(0,o):s.at(1,o),r.closestPointToPoint(o,!0,a);return}else if(c>=0&&c<=1){l<0?r.at(0,a):r.at(1,a),s.closestPointToPoint(a,!0,o);return}else{let u;l<0?u=r.start:u=r.end;let h;c<0?h=s.start:h=s.end;let d=e,f=t;if(r.closestPointToPoint(h,!0,e),s.closestPointToPoint(u,!0,t),d.distanceToSquared(h)<=f.distanceToSquared(u)){a.copy(d),o.copy(h);return}else{a.copy(u),o.copy(f);return}}}})(),Gg=(function(){let i=new C,e=new C,t=new Jt,n=new pi;return function(s,a){let{radius:o,center:l}=s,{a:c,b:u,c:h}=a;if(n.start=c,n.end=u,n.closestPointToPoint(l,!0,i).distanceTo(l)<=o||(n.start=c,n.end=h,n.closestPointToPoint(l,!0,i).distanceTo(l)<=o)||(n.start=u,n.end=h,n.closestPointToPoint(l,!0,i).distanceTo(l)<=o))return!0;let y=a.getPlane(t);if(Math.abs(y.distanceToPoint(l))<=o){let p=y.projectPoint(l,e);if(a.containsPoint(p))return!0}return!1}})();var bM=["x","y","z"],Xn=1e-15,Wg=Xn*Xn;function qi(i){return Math.abs(i)<Xn}var qt=class extends Wt{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new C),this.satBounds=new Array(4).fill().map(()=>new Fi),this.points=[this.a,this.b,this.c],this.plane=new Jt,this.isDegenerateIntoSegment=!1,this.isDegenerateIntoPoint=!1,this.degenerateSegment=new pi,this.needsUpdate=!0}intersectsSphere(e){return Gg(e,this)}update(){let e=this.a,t=this.b,n=this.c,r=this.points,s=this.satAxes,a=this.satBounds,o=s[0],l=a[0];this.getNormal(o),l.setFromPoints(o,r);let c=s[1],u=a[1];c.subVectors(e,t),u.setFromPoints(c,r);let h=s[2],d=a[2];h.subVectors(t,n),d.setFromPoints(h,r);let f=s[3],m=a[3];f.subVectors(n,e),m.setFromPoints(f,r);let y=c.length(),g=h.length(),p=f.length();this.isDegenerateIntoPoint=!1,this.isDegenerateIntoSegment=!1,y<Xn?g<Xn||p<Xn?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(e),this.degenerateSegment.end.copy(n)):g<Xn?p<Xn?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(t),this.degenerateSegment.end.copy(e)):p<Xn&&(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(n),this.degenerateSegment.end.copy(t)),this.plane.setFromNormalAndCoplanarPoint(o,e),this.needsUpdate=!1}};qt.prototype.closestPointToSegment=(function(){let i=new C,e=new C,t=new pi;return function(r,s=null,a=null){this.needsUpdate&&this.update();let{start:o,end:l}=r,c=this.points,u,h=1/0,d=this.plane.distanceToPoint(o),f=this.plane.distanceToPoint(l);if(d*f<0&&this.plane.intersectLine(r,i)!==null&&this.containsPoint(i))return s&&s.copy(i),a&&a.copy(i),0;for(let m=0;m<3;m++){let y=(m+1)%3;t.start.copy(c[m]),t.end.copy(c[y]),To(t,r,i,e),u=i.distanceToSquared(e),u<h&&(h=u,s&&s.copy(i),a&&a.copy(e))}return this.closestPointToPoint(o,i),u=o.distanceToSquared(i),u<h&&(h=u,s&&s.copy(i),a&&a.copy(o)),this.closestPointToPoint(l,i),u=l.distanceToSquared(i),u<h&&(h=u,s&&s.copy(i),a&&a.copy(l)),Math.sqrt(h)}})();qt.prototype.intersectsTriangle=(function(){let i=new qt,e=new Fi,t=new Fi,n=new C,r=new C,s=new C,a=new C,o=new pi,l=new pi,c=new C,u=new de,h=new de;function d(_,x,S,M){let E=n;!_.isDegenerateIntoPoint&&!_.isDegenerateIntoSegment?E.copy(_.plane.normal):E.copy(x.plane.normal);let R=_.satBounds,T=_.satAxes;for(let L=1;L<4;L++){let D=R[L],F=T[L];if(e.setFromPoints(F,x.points),D.isSeparated(e)||(a.copy(E).cross(F),e.setFromPoints(a,_.points),t.setFromPoints(a,x.points),e.isSeparated(t)))return!1}let b=x.satBounds,P=x.satAxes;for(let L=1;L<4;L++){let D=b[L],F=P[L];if(e.setFromPoints(F,_.points),D.isSeparated(e)||(a.crossVectors(E,F),e.setFromPoints(a,_.points),t.setFromPoints(a,x.points),e.isSeparated(t)))return!1}return S&&(M||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),S.start.set(0,0,0),S.end.set(0,0,0)),!0}function f(_,x,S,M,E,R,T,b,P,L,D){let F=T/(T-b);L.x=M+(E-M)*F,D.start.subVectors(x,_).multiplyScalar(F).add(_),F=T/(T-P),L.y=M+(R-M)*F,D.end.subVectors(S,_).multiplyScalar(F).add(_)}function m(_,x,S,M,E,R,T,b,P,L,D){if(E>0)f(_.c,_.a,_.b,M,x,S,P,T,b,L,D);else if(R>0)f(_.b,_.a,_.c,S,x,M,b,T,P,L,D);else if(b*P>0||T!=0)f(_.a,_.b,_.c,x,S,M,T,b,P,L,D);else if(b!=0)f(_.b,_.a,_.c,S,x,M,b,T,P,L,D);else if(P!=0)f(_.c,_.a,_.b,M,x,S,P,T,b,L,D);else return!0;return!1}function y(_,x,S,M){let E=x.degenerateSegment,R=_.plane.distanceToPoint(E.start),T=_.plane.distanceToPoint(E.end);return qi(R)?qi(T)?d(_,x,S,M):(S&&(S.start.copy(E.start),S.end.copy(E.start)),_.containsPoint(E.start)):qi(T)?(S&&(S.start.copy(E.end),S.end.copy(E.end)),_.containsPoint(E.end)):_.plane.intersectLine(E,n)!=null?(S&&(S.start.copy(n),S.end.copy(n)),_.containsPoint(n)):!1}function g(_,x,S){let M=x.a;return qi(_.plane.distanceToPoint(M))&&_.containsPoint(M)?(S&&(S.start.copy(M),S.end.copy(M)),!0):!1}function p(_,x,S){let M=_.degenerateSegment,E=x.a;return M.closestPointToPoint(E,!0,n),E.distanceToSquared(n)<Wg?(S&&(S.start.copy(E),S.end.copy(E)),!0):!1}function v(_,x,S,M){if(_.isDegenerateIntoSegment)if(x.isDegenerateIntoSegment){let E=_.degenerateSegment,R=x.degenerateSegment,T=r,b=s;E.delta(T),R.delta(b);let P=n.subVectors(R.start,E.start),L=T.x*b.y-T.y*b.x;if(qi(L))return!1;let D=(P.x*b.y-P.y*b.x)/L,F=-(T.x*P.y-T.y*P.x)/L;if(D<0||D>1||F<0||F>1)return!1;let k=E.start.z+T.z*D,V=R.start.z+b.z*F;return qi(k-V)?(S&&(S.start.copy(E.start).addScaledVector(T,D),S.end.copy(E.start).addScaledVector(T,D)),!0):!1}else return x.isDegenerateIntoPoint?p(_,x,S):y(x,_,S,M);else{if(_.isDegenerateIntoPoint)return x.isDegenerateIntoPoint?x.a.distanceToSquared(_.a)<Wg?(S&&(S.start.copy(_.a),S.end.copy(_.a)),!0):!1:x.isDegenerateIntoSegment?p(x,_,S):g(x,_,S);if(x.isDegenerateIntoPoint)return g(_,x,S);if(x.isDegenerateIntoSegment)return y(_,x,S,M)}}return function(x,S=null,M=!1){this.needsUpdate&&this.update(),x.isExtendedTriangle?x.needsUpdate&&x.update():(i.copy(x),i.update(),x=i);let E=v(this,x,S,M);if(E!==void 0)return E;let R=this.plane,T=x.plane,b=T.distanceToPoint(this.a),P=T.distanceToPoint(this.b),L=T.distanceToPoint(this.c);qi(b)&&(b=0),qi(P)&&(P=0),qi(L)&&(L=0);let D=b*P,F=b*L;if(D>0&&F>0)return!1;let k=R.distanceToPoint(x.a),V=R.distanceToPoint(x.b),K=R.distanceToPoint(x.c);qi(k)&&(k=0),qi(V)&&(V=0),qi(K)&&(K=0);let W=k*V,se=k*K;if(W>0&&se>0)return!1;r.copy(R.normal),s.copy(T.normal);let ue=r.cross(s),be=0,He=Math.abs(ue.x),at=Math.abs(ue.y);at>He&&(He=at,be=1),Math.abs(ue.z)>He&&(be=2);let Ye=bM[be],Y=this.a[Ye],Z=this.b[Ye],me=this.c[Ye],De=x.a[Ye],Te=x.b[Ye],Ke=x.c[Ye];if(m(this,Y,Z,me,D,F,b,P,L,u,o))return d(this,x,S,M);if(m(x,De,Te,Ke,W,se,k,V,K,h,l))return d(this,x,S,M);if(u.y<u.x){let Lt=u.y;u.y=u.x,u.x=Lt,c.copy(o.start),o.start.copy(o.end),o.end.copy(c)}if(h.y<h.x){let Lt=h.y;h.y=h.x,h.x=Lt,c.copy(l.start),l.start.copy(l.end),l.end.copy(c)}return u.y<h.x||h.y<u.x?!1:(S&&(h.x>u.x?S.start.copy(l.start):S.start.copy(o.start),h.y<u.y?S.end.copy(l.end):S.end.copy(o.end)),!0)}})();qt.prototype.distanceToPoint=(function(){let i=new C;return function(t){return this.closestPointToPoint(t,i),t.distanceTo(i)}})();qt.prototype.distanceToTriangle=(function(){let i=new C,e=new C,t=["a","b","c"],n=new pi,r=new pi;return function(a,o=null,l=null){let c=o||l?n:null;if(this.intersectsTriangle(a,c,!0))return(o||l)&&(o&&c.getCenter(o),l&&c.getCenter(l)),0;let u=1/0;for(let h=0;h<3;h++){let d,f=t[h],m=a[f];this.closestPointToPoint(m,i),d=m.distanceToSquared(i),d<u&&(u=d,o&&o.copy(i),l&&l.copy(m));let y=this[f];a.closestPointToPoint(y,i),d=y.distanceToSquared(i),d<u&&(u=d,o&&o.copy(y),l&&l.copy(i))}for(let h=0;h<3;h++){let d=t[h],f=t[(h+1)%3];n.set(this[d],this[f]);for(let m=0;m<3;m++){let y=t[m],g=t[(m+1)%3];r.set(a[y],a[g]),To(n,r,i,e);let p=i.distanceToSquared(e);p<u&&(u=p,o&&o.copy(i),l&&l.copy(e))}}return Math.sqrt(u)}})();var Ct=class{constructor(e,t,n){this.isOrientedBox=!0,this.min=new C,this.max=new C,this.matrix=new re,this.invMatrix=new re,this.points=new Array(8).fill().map(()=>new C),this.satAxes=new Array(3).fill().map(()=>new C),this.satBounds=new Array(3).fill().map(()=>new Fi),this.alignedSatBounds=new Array(3).fill().map(()=>new Fi),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),n&&this.matrix.copy(n)}set(e,t,n){this.min.copy(e),this.max.copy(t),this.matrix.copy(n),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}};Ct.prototype.update=(function(){return function(){let e=this.matrix,t=this.min,n=this.max,r=this.points;for(let c=0;c<=1;c++)for(let u=0;u<=1;u++)for(let h=0;h<=1;h++){let d=1*c|2*u|4*h,f=r[d];f.x=c?n.x:t.x,f.y=u?n.y:t.y,f.z=h?n.z:t.z,f.applyMatrix4(e)}let s=this.satBounds,a=this.satAxes,o=r[0];for(let c=0;c<3;c++){let u=a[c],h=s[c],d=1<<c,f=r[d];u.subVectors(o,f),h.setFromPoints(u,r)}let l=this.alignedSatBounds;l[0].setFromPointsField(r,"x"),l[1].setFromPointsField(r,"y"),l[2].setFromPointsField(r,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})();Ct.prototype.intersectsBox=(function(){let i=new Fi;return function(t){this.needsUpdate&&this.update();let n=t.min,r=t.max,s=this.satBounds,a=this.satAxes,o=this.alignedSatBounds;if(i.min=n.x,i.max=r.x,o[0].isSeparated(i)||(i.min=n.y,i.max=r.y,o[1].isSeparated(i))||(i.min=n.z,i.max=r.z,o[2].isSeparated(i)))return!1;for(let l=0;l<3;l++){let c=a[l],u=s[l];if(i.setFromBox(c,t),u.isSeparated(i))return!1}return!0}})();Ct.prototype.intersectsTriangle=(function(){let i=new qt,e=new Array(3),t=new Fi,n=new Fi,r=new C;return function(a){this.needsUpdate&&this.update(),a.isExtendedTriangle?a.needsUpdate&&a.update():(i.copy(a),i.update(),a=i);let o=this.satBounds,l=this.satAxes;e[0]=a.a,e[1]=a.b,e[2]=a.c;for(let d=0;d<3;d++){let f=o[d],m=l[d];if(t.setFromPoints(m,e),f.isSeparated(t))return!1}let c=a.satBounds,u=a.satAxes,h=this.points;for(let d=0;d<3;d++){let f=c[d],m=u[d];if(t.setFromPoints(m,h),f.isSeparated(t))return!1}for(let d=0;d<3;d++){let f=l[d];for(let m=0;m<4;m++){let y=u[m];if(r.crossVectors(f,y),t.setFromPoints(r,e),n.setFromPoints(r,h),t.isSeparated(n))return!1}}return!0}})();Ct.prototype.closestPointToPoint=(function(){return function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t}})();Ct.prototype.distanceToPoint=(function(){let i=new C;return function(t){return this.closestPointToPoint(t,i),t.distanceTo(i)}})();Ct.prototype.distanceToBox=(function(){let i=["x","y","z"],e=new Array(12).fill().map(()=>new pi),t=new Array(12).fill().map(()=>new pi),n=new C,r=new C;return function(a,o=0,l=null,c=null){if(this.needsUpdate&&this.update(),this.intersectsBox(a))return(l||c)&&(a.getCenter(r),this.closestPointToPoint(r,n),a.closestPointToPoint(n,r),l&&l.copy(n),c&&c.copy(r)),0;let u=o*o,h=a.min,d=a.max,f=this.points,m=1/0;for(let g=0;g<8;g++){let p=f[g];r.copy(p).clamp(h,d);let v=p.distanceToSquared(r);if(v<m&&(m=v,l&&l.copy(p),c&&c.copy(r),v<u))return Math.sqrt(v)}let y=0;for(let g=0;g<3;g++)for(let p=0;p<=1;p++)for(let v=0;v<=1;v++){let _=(g+1)%3,x=(g+2)%3,S=p<<_|v<<x,M=1<<g|p<<_|v<<x,E=f[S],R=f[M];e[y].set(E,R);let b=i[g],P=i[_],L=i[x],D=t[y],F=D.start,k=D.end;F[b]=h[b],F[P]=p?h[P]:d[P],F[L]=v?h[L]:d[L],k[b]=d[b],k[P]=p?h[P]:d[P],k[L]=v?h[L]:d[L],y++}for(let g=0;g<=1;g++)for(let p=0;p<=1;p++)for(let v=0;v<=1;v++){r.x=g?d.x:h.x,r.y=p?d.y:h.y,r.z=v?d.z:h.z,this.closestPointToPoint(r,n);let _=r.distanceToSquared(n);if(_<m&&(m=_,l&&l.copy(n),c&&c.copy(r),_<u))return Math.sqrt(_)}for(let g=0;g<12;g++){let p=e[g];for(let v=0;v<12;v++){let _=t[v];To(p,_,n,r);let x=n.distanceToSquared(r);if(x<m&&(m=x,l&&l.copy(n),c&&c.copy(r),x<u))return Math.sqrt(x)}}return Math.sqrt(m)}})();var Nd=class extends ur{constructor(){super(()=>new qt)}},gi=new Nd;var Mo=new C,Fd=new C;function Xg(i,e,t={},n=0,r=1/0){let s=n*n,a=r*r,o=1/0,l=null;if(i.shapecast({boundsTraverseOrder:u=>(Mo.copy(e).clamp(u.min,u.max),Mo.distanceToSquared(e)),intersectsBounds:(u,h,d)=>d<o&&d<a,intersectsTriangle:(u,h)=>{u.closestPointToPoint(e,Mo);let d=e.distanceToSquared(Mo);return d<o&&(Fd.copy(Mo),o=d,l=h),d<s}}),o===1/0)return null;let c=Math.sqrt(o);return t.point?t.point.copy(Fd):t.point=Fd.clone(),t.distance=c,t.faceIndex=l,t}var eh=parseInt("180")>=169,SM=parseInt("180")<=161,es=new C,ts=new C,is=new C,th=new de,ih=new de,nh=new de,qg=new C,Yg=new C,jg=new C,wo=new C;function TM(i,e,t,n,r,s,a,o){let l;if(s===Xt?l=i.intersectTriangle(n,t,e,!0,r):l=i.intersectTriangle(e,t,n,s!==mi,r),l===null)return null;let c=i.origin.distanceTo(r);return c<a||c>o?null:{distance:c,point:r.clone()}}function Zg(i,e,t,n,r,s,a,o,l,c,u){es.fromBufferAttribute(e,s),ts.fromBufferAttribute(e,a),is.fromBufferAttribute(e,o);let h=TM(i,es,ts,is,wo,l,c,u);if(h){if(n){th.fromBufferAttribute(n,s),ih.fromBufferAttribute(n,a),nh.fromBufferAttribute(n,o),h.uv=new de;let f=Wt.getInterpolation(wo,es,ts,is,th,ih,nh,h.uv);eh||(h.uv=f)}if(r){th.fromBufferAttribute(r,s),ih.fromBufferAttribute(r,a),nh.fromBufferAttribute(r,o),h.uv1=new de;let f=Wt.getInterpolation(wo,es,ts,is,th,ih,nh,h.uv1);eh||(h.uv1=f),SM&&(h.uv2=h.uv1)}if(t){qg.fromBufferAttribute(t,s),Yg.fromBufferAttribute(t,a),jg.fromBufferAttribute(t,o),h.normal=new C;let f=Wt.getInterpolation(wo,es,ts,is,qg,Yg,jg,h.normal);h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1),eh||(h.normal=f)}let d={a:s,b:a,c:o,normal:new C,materialIndex:0};if(Wt.getNormal(es,ts,is,d.normal),h.face=d,h.faceIndex=s,eh){let f=new C;Wt.getBarycoord(wo,es,ts,is,f),h.barycoord=f}}return h}function $g(i){return i&&i.isMaterial?i.side:i}function oa(i,e,t,n,r,s,a){let o=n*3,l=o+0,c=o+1,u=o+2,{index:h,groups:d}=i;i.index&&(l=h.getX(l),c=h.getX(c),u=h.getX(u));let{position:f,normal:m,uv:y,uv1:g}=i.attributes;if(Array.isArray(e)){let p=n*3;for(let v=0,_=d.length;v<_;v++){let{start:x,count:S,materialIndex:M}=d[v];if(p>=x&&p<x+S){let E=$g(e[M]),R=Zg(t,f,m,y,g,l,c,u,E,s,a);if(R)if(R.faceIndex=n,R.face.materialIndex=M,r)r.push(R);else return R}}}else{let p=$g(e),v=Zg(t,f,m,y,g,l,c,u,p,s,a);if(v)if(v.faceIndex=n,v.face.materialIndex=0,r)r.push(v);else return v}return null}function yt(i,e,t,n){let r=i.a,s=i.b,a=i.c,o=e,l=e+1,c=e+2;t&&(o=t.getX(o),l=t.getX(l),c=t.getX(c)),r.x=n.getX(o),r.y=n.getY(o),r.z=n.getZ(o),s.x=n.getX(l),s.y=n.getY(l),s.z=n.getZ(l),a.x=n.getX(c),a.y=n.getY(c),a.z=n.getZ(c)}function Kg(i,e,t,n,r,s,a,o){let{geometry:l,_indirectBuffer:c}=i;for(let u=n,h=n+r;u<h;u++)oa(l,e,t,u,s,a,o)}function Jg(i,e,t,n,r,s,a){let{geometry:o,_indirectBuffer:l}=i,c=1/0,u=null;for(let h=n,d=n+r;h<d;h++){let f;f=oa(o,e,t,h,null,s,a),f&&f.distance<c&&(u=f,c=f.distance)}return u}function Qg(i,e,t,n,r,s,a){let{geometry:o}=t,{index:l}=o,c=o.attributes.position;for(let u=i,h=e+i;u<h;u++){let d;if(d=u,yt(a,d*3,l,c),a.needsUpdate=!0,n(a,d,r,s))return!0}return!1}function ey(i,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=i.geometry,n=t.index?t.index.array:null,r=t.attributes.position,s,a,o,l,c=0,u=i._roots;for(let d=0,f=u.length;d<f;d++)s=u[d],a=new Uint32Array(s),o=new Uint16Array(s),l=new Float32Array(s),h(0,c),c+=s.byteLength;function h(d,f,m=!1){let y=d*2;if(et(y,o)){let g=st(d,a),p=ft(y,o),v=1/0,_=1/0,x=1/0,S=-1/0,M=-1/0,E=-1/0;for(let R=3*g,T=3*(g+p);R<T;R++){let b=n[R],P=r.getX(b),L=r.getY(b),D=r.getZ(b);P<v&&(v=P),P>S&&(S=P),L<_&&(_=L),L>M&&(M=L),D<x&&(x=D),D>E&&(E=D)}return l[d+0]!==v||l[d+1]!==_||l[d+2]!==x||l[d+3]!==S||l[d+4]!==M||l[d+5]!==E?(l[d+0]=v,l[d+1]=_,l[d+2]=x,l[d+3]=S,l[d+4]=M,l[d+5]=E,!0):!1}else{let g=it(d),p=nt(d,a),v=m,_=!1,x=!1;if(e){if(!v){let b=g/8+f/32,P=p/8+f/32;_=e.has(b),x=e.has(P),v=!_&&!x}}else _=!0,x=!0;let S=v||_,M=v||x,E=!1;S&&(E=h(g,f,v));let R=!1;M&&(R=h(p,f,v));let T=E||R;if(T)for(let b=0;b<3;b++){let P=g+b,L=p+b,D=l[P],F=l[P+3],k=l[L],V=l[L+3];l[d+b]=D<k?D:k,l[d+b+3]=F>V?F:V}return T}}}function ri(i,e,t,n,r){let s,a,o,l,c,u,h=1/t.direction.x,d=1/t.direction.y,f=1/t.direction.z,m=t.origin.x,y=t.origin.y,g=t.origin.z,p=e[i],v=e[i+3],_=e[i+1],x=e[i+3+1],S=e[i+2],M=e[i+3+2];return h>=0?(s=(p-m)*h,a=(v-m)*h):(s=(v-m)*h,a=(p-m)*h),d>=0?(o=(_-y)*d,l=(x-y)*d):(o=(x-y)*d,l=(_-y)*d),s>l||o>a||((o>s||isNaN(s))&&(s=o),(l<a||isNaN(a))&&(a=l),f>=0?(c=(S-g)*f,u=(M-g)*f):(c=(M-g)*f,u=(S-g)*f),s>u||c>a)?!1:((c>s||s!==s)&&(s=c),(u<a||a!==a)&&(a=u),s<=r&&a>=n)}function ty(i,e,t,n,r,s,a,o){let{geometry:l,_indirectBuffer:c}=i;for(let u=n,h=n+r;u<h;u++){let d=c?c[u]:u;oa(l,e,t,d,s,a,o)}}function iy(i,e,t,n,r,s,a){let{geometry:o,_indirectBuffer:l}=i,c=1/0,u=null;for(let h=n,d=n+r;h<d;h++){let f;f=oa(o,e,t,l?l[h]:h,null,s,a),f&&f.distance<c&&(u=f,c=f.distance)}return u}function ny(i,e,t,n,r,s,a){let{geometry:o}=t,{index:l}=o,c=o.attributes.position;for(let u=i,h=e+i;u<h;u++){let d;if(d=t.resolveTriangleIndex(u),yt(a,d*3,l,c),a.needsUpdate=!0,n(a,d,r,s))return!0}return!1}function ry(i,e,t,n,r,s,a){Ze.setBuffer(i._roots[e]),ri(0,Ze.float32Array,n,s,a)&&Od(0,i,t,n,r,s,a),Ze.clearBuffer()}function Od(i,e,t,n,r,s,a){let{float32Array:o,uint16Array:l,uint32Array:c}=Ze,u=i*2;if(et(u,l)){let d=st(i,c),f=ft(u,l);Kg(e,t,n,d,f,r,s,a)}else{let d=it(i);ri(d,o,n,s,a)&&Od(d,e,t,n,r,s,a);let f=nt(i,c);ri(f,o,n,s,a)&&Od(f,e,t,n,r,s,a)}}var MM=["x","y","z"];function sy(i,e,t,n,r,s){Ze.setBuffer(i._roots[e]);let a=null;return ri(0,Ze.float32Array,n,r,s)&&(a=Bd(0,i,t,n,r,s)),Ze.clearBuffer(),a}function Bd(i,e,t,n,r,s){let{float32Array:a,uint16Array:o,uint32Array:l}=Ze,c=i*2;if(et(c,o)){let h=st(i,l),d=ft(c,o);return Jg(e,t,n,h,d,r,s)}else{let h=Qs(i,l),d=MM[h],m=n.direction[d]>=0,y,g;m?(y=it(i),g=nt(i,l)):(y=nt(i,l),g=it(i));let v=ri(y,a,n,r,s)?Bd(y,e,t,n,r,s):null;if(v){let S=v.point[d];if(m?S<=a[g+h]:S>=a[g+h+3])return v}let x=ri(g,a,n,r,s)?Bd(g,e,t,n,r,s):null;return v&&x?v.distance<=x.distance?v:x:v||x||null}}var rh=new je,la=new qt,ca=new qt,Eo=new re,ay=new Ct,sh=new Ct;function oy(i,e,t,n){Ze.setBuffer(i._roots[e]);let r=zd(0,i,t,n);return Ze.clearBuffer(),r}function zd(i,e,t,n,r=null){let{float32Array:s,uint16Array:a,uint32Array:o}=Ze,l=i*2;if(r===null&&(t.boundingBox||t.computeBoundingBox(),ay.set(t.boundingBox.min,t.boundingBox.max,n),r=ay),et(l,a)){let u=e.geometry,h=u.index,d=u.attributes.position,f=t.index,m=t.attributes.position,y=st(i,o),g=ft(l,a);if(Eo.copy(n).invert(),t.boundsTree)return gt(i,s,sh),sh.matrix.copy(Eo),sh.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:v=>sh.intersectsBox(v),intersectsTriangle:v=>{v.a.applyMatrix4(n),v.b.applyMatrix4(n),v.c.applyMatrix4(n),v.needsUpdate=!0;for(let _=y*3,x=(g+y)*3;_<x;_+=3)if(yt(ca,_,h,d),ca.needsUpdate=!0,v.intersectsTriangle(ca))return!0;return!1}});{let p=pr(t);for(let v=y*3,_=(g+y)*3;v<_;v+=3){yt(la,v,h,d),la.a.applyMatrix4(Eo),la.b.applyMatrix4(Eo),la.c.applyMatrix4(Eo),la.needsUpdate=!0;for(let x=0,S=p*3;x<S;x+=3)if(yt(ca,x,f,m),ca.needsUpdate=!0,la.intersectsTriangle(ca))return!0}}}else{let u=it(i),h=nt(i,o);return gt(u,s,rh),!!(r.intersectsBox(rh)&&zd(u,e,t,n,r)||(gt(h,s,rh),r.intersectsBox(rh)&&zd(h,e,t,n,r)))}}var ah=new re,kd=new Ct,Ao=new Ct,wM=new C,EM=new C,AM=new C,CM=new C;function ly(i,e,t,n={},r={},s=0,a=1/0){e.boundingBox||e.computeBoundingBox(),kd.set(e.boundingBox.min,e.boundingBox.max,t),kd.needsUpdate=!0;let o=i.geometry,l=o.attributes.position,c=o.index,u=e.attributes.position,h=e.index,d=gi.getPrimitive(),f=gi.getPrimitive(),m=wM,y=EM,g=null,p=null;r&&(g=AM,p=CM);let v=1/0,_=null,x=null;return ah.copy(t).invert(),Ao.matrix.copy(ah),i.shapecast({boundsTraverseOrder:S=>kd.distanceToBox(S),intersectsBounds:(S,M,E)=>E<v&&E<a?(M&&(Ao.min.copy(S.min),Ao.max.copy(S.max),Ao.needsUpdate=!0),!0):!1,intersectsRange:(S,M)=>{if(e.boundsTree)return e.boundsTree.shapecast({boundsTraverseOrder:R=>Ao.distanceToBox(R),intersectsBounds:(R,T,b)=>b<v&&b<a,intersectsRange:(R,T)=>{for(let b=R,P=R+T;b<P;b++){yt(f,3*b,h,u),f.a.applyMatrix4(t),f.b.applyMatrix4(t),f.c.applyMatrix4(t),f.needsUpdate=!0;for(let L=S,D=S+M;L<D;L++){yt(d,3*L,c,l),d.needsUpdate=!0;let F=d.distanceToTriangle(f,m,g);if(F<v&&(y.copy(m),p&&p.copy(g),v=F,_=L,x=b),F<s)return!0}}}});{let E=pr(e);for(let R=0,T=E;R<T;R++){yt(f,3*R,h,u),f.a.applyMatrix4(t),f.b.applyMatrix4(t),f.c.applyMatrix4(t),f.needsUpdate=!0;for(let b=S,P=S+M;b<P;b++){yt(d,3*b,c,l),d.needsUpdate=!0;let L=d.distanceToTriangle(f,m,g);if(L<v&&(y.copy(m),p&&p.copy(g),v=L,_=b,x=R),L<s)return!0}}}}}),gi.releasePrimitive(d),gi.releasePrimitive(f),v===1/0?null:(n.point?n.point.copy(y):n.point=y.clone(),n.distance=v,n.faceIndex=_,r&&(r.point?r.point.copy(p):r.point=p.clone(),r.point.applyMatrix4(ah),y.applyMatrix4(ah),r.distance=y.sub(r.point).length(),r.faceIndex=x),n)}function cy(i,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=i.geometry,n=t.index?t.index.array:null,r=t.attributes.position,s,a,o,l,c=0,u=i._roots;for(let d=0,f=u.length;d<f;d++)s=u[d],a=new Uint32Array(s),o=new Uint16Array(s),l=new Float32Array(s),h(0,c),c+=s.byteLength;function h(d,f,m=!1){let y=d*2;if(et(y,o)){let g=st(d,a),p=ft(y,o),v=1/0,_=1/0,x=1/0,S=-1/0,M=-1/0,E=-1/0;for(let R=g,T=g+p;R<T;R++){let b=3*i.resolveTriangleIndex(R);for(let P=0;P<3;P++){let L=b+P;L=n?n[L]:L;let D=r.getX(L),F=r.getY(L),k=r.getZ(L);D<v&&(v=D),D>S&&(S=D),F<_&&(_=F),F>M&&(M=F),k<x&&(x=k),k>E&&(E=k)}}return l[d+0]!==v||l[d+1]!==_||l[d+2]!==x||l[d+3]!==S||l[d+4]!==M||l[d+5]!==E?(l[d+0]=v,l[d+1]=_,l[d+2]=x,l[d+3]=S,l[d+4]=M,l[d+5]=E,!0):!1}else{let g=it(d),p=nt(d,a),v=m,_=!1,x=!1;if(e){if(!v){let b=g/8+f/32,P=p/8+f/32;_=e.has(b),x=e.has(P),v=!_&&!x}}else _=!0,x=!0;let S=v||_,M=v||x,E=!1;S&&(E=h(g,f,v));let R=!1;M&&(R=h(p,f,v));let T=E||R;if(T)for(let b=0;b<3;b++){let P=g+b,L=p+b,D=l[P],F=l[P+3],k=l[L],V=l[L+3];l[d+b]=D<k?D:k,l[d+b+3]=F>V?F:V}return T}}}function hy(i,e,t,n,r,s,a){Ze.setBuffer(i._roots[e]),ri(0,Ze.float32Array,n,s,a)&&Vd(0,i,t,n,r,s,a),Ze.clearBuffer()}function Vd(i,e,t,n,r,s,a){let{float32Array:o,uint16Array:l,uint32Array:c}=Ze,u=i*2;if(et(u,l)){let d=st(i,c),f=ft(u,l);ty(e,t,n,d,f,r,s,a)}else{let d=it(i);ri(d,o,n,s,a)&&Vd(d,e,t,n,r,s,a);let f=nt(i,c);ri(f,o,n,s,a)&&Vd(f,e,t,n,r,s,a)}}var RM=["x","y","z"];function uy(i,e,t,n,r,s){Ze.setBuffer(i._roots[e]);let a=null;return ri(0,Ze.float32Array,n,r,s)&&(a=Hd(0,i,t,n,r,s)),Ze.clearBuffer(),a}function Hd(i,e,t,n,r,s){let{float32Array:a,uint16Array:o,uint32Array:l}=Ze,c=i*2;if(et(c,o)){let h=st(i,l),d=ft(c,o);return iy(e,t,n,h,d,r,s)}else{let h=Qs(i,l),d=RM[h],m=n.direction[d]>=0,y,g;m?(y=it(i),g=nt(i,l)):(y=nt(i,l),g=it(i));let v=ri(y,a,n,r,s)?Hd(y,e,t,n,r,s):null;if(v){let S=v.point[d];if(m?S<=a[g+h]:S>=a[g+h+3])return v}let x=ri(g,a,n,r,s)?Hd(g,e,t,n,r,s):null;return v&&x?v.distance<=x.distance?v:x:v||x||null}}var oh=new je,ha=new qt,ua=new qt,Co=new re,dy=new Ct,lh=new Ct;function fy(i,e,t,n){Ze.setBuffer(i._roots[e]);let r=Gd(0,i,t,n);return Ze.clearBuffer(),r}function Gd(i,e,t,n,r=null){let{float32Array:s,uint16Array:a,uint32Array:o}=Ze,l=i*2;if(r===null&&(t.boundingBox||t.computeBoundingBox(),dy.set(t.boundingBox.min,t.boundingBox.max,n),r=dy),et(l,a)){let u=e.geometry,h=u.index,d=u.attributes.position,f=t.index,m=t.attributes.position,y=st(i,o),g=ft(l,a);if(Co.copy(n).invert(),t.boundsTree)return gt(i,s,lh),lh.matrix.copy(Co),lh.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:v=>lh.intersectsBox(v),intersectsTriangle:v=>{v.a.applyMatrix4(n),v.b.applyMatrix4(n),v.c.applyMatrix4(n),v.needsUpdate=!0;for(let _=y,x=g+y;_<x;_++)if(yt(ua,3*e.resolveTriangleIndex(_),h,d),ua.needsUpdate=!0,v.intersectsTriangle(ua))return!0;return!1}});{let p=pr(t);for(let v=y,_=g+y;v<_;v++){let x=e.resolveTriangleIndex(v);yt(ha,3*x,h,d),ha.a.applyMatrix4(Co),ha.b.applyMatrix4(Co),ha.c.applyMatrix4(Co),ha.needsUpdate=!0;for(let S=0,M=p*3;S<M;S+=3)if(yt(ua,S,f,m),ua.needsUpdate=!0,ha.intersectsTriangle(ua))return!0}}}else{let u=it(i),h=nt(i,o);return gt(u,s,oh),!!(r.intersectsBox(oh)&&Gd(u,e,t,n,r)||(gt(h,s,oh),r.intersectsBox(oh)&&Gd(h,e,t,n,r)))}}var ch=new re,Wd=new Ct,Ro=new Ct,PM=new C,IM=new C,LM=new C,DM=new C;function py(i,e,t,n={},r={},s=0,a=1/0){e.boundingBox||e.computeBoundingBox(),Wd.set(e.boundingBox.min,e.boundingBox.max,t),Wd.needsUpdate=!0;let o=i.geometry,l=o.attributes.position,c=o.index,u=e.attributes.position,h=e.index,d=gi.getPrimitive(),f=gi.getPrimitive(),m=PM,y=IM,g=null,p=null;r&&(g=LM,p=DM);let v=1/0,_=null,x=null;return ch.copy(t).invert(),Ro.matrix.copy(ch),i.shapecast({boundsTraverseOrder:S=>Wd.distanceToBox(S),intersectsBounds:(S,M,E)=>E<v&&E<a?(M&&(Ro.min.copy(S.min),Ro.max.copy(S.max),Ro.needsUpdate=!0),!0):!1,intersectsRange:(S,M)=>{if(e.boundsTree){let E=e.boundsTree;return E.shapecast({boundsTraverseOrder:R=>Ro.distanceToBox(R),intersectsBounds:(R,T,b)=>b<v&&b<a,intersectsRange:(R,T)=>{for(let b=R,P=R+T;b<P;b++){let L=E.resolveTriangleIndex(b);yt(f,3*L,h,u),f.a.applyMatrix4(t),f.b.applyMatrix4(t),f.c.applyMatrix4(t),f.needsUpdate=!0;for(let D=S,F=S+M;D<F;D++){let k=i.resolveTriangleIndex(D);yt(d,3*k,c,l),d.needsUpdate=!0;let V=d.distanceToTriangle(f,m,g);if(V<v&&(y.copy(m),p&&p.copy(g),v=V,_=D,x=b),V<s)return!0}}}})}else{let E=pr(e);for(let R=0,T=E;R<T;R++){yt(f,3*R,h,u),f.a.applyMatrix4(t),f.b.applyMatrix4(t),f.c.applyMatrix4(t),f.needsUpdate=!0;for(let b=S,P=S+M;b<P;b++){let L=i.resolveTriangleIndex(b);yt(d,3*L,c,l),d.needsUpdate=!0;let D=d.distanceToTriangle(f,m,g);if(D<v&&(y.copy(m),p&&p.copy(g),v=D,_=b,x=R),D<s)return!0}}}}}),gi.releasePrimitive(d),gi.releasePrimitive(f),v===1/0?null:(n.point?n.point.copy(y):n.point=y.clone(),n.distance=v,n.faceIndex=_,r&&(r.point?r.point.copy(p):r.point=p.clone(),r.point.applyMatrix4(ch),y.applyMatrix4(ch),r.distance=y.sub(r.point).length(),r.faceIndex=x),n)}function Xd(i,e,t){return i===null?null:(i.point.applyMatrix4(e.matrixWorld),i.distance=i.point.distanceTo(t.ray.origin),i.object=e,i)}var hh=new Ct,uh=new Vt,my=new C,gy=new re,yy=new C,qd=["getX","getY","getZ"],dh=class i extends Qc{static serialize(e,t={}){t={cloneBuffers:!0,...t};let n=e.geometry,r=e._roots,s=e._indirectBuffer,a=n.getIndex(),o={version:1,roots:null,index:null,indirectBuffer:null};return t.cloneBuffers?(o.roots=r.map(l=>l.slice()),o.index=a?a.array.slice():null,o.indirectBuffer=s?s.slice():null):(o.roots=r,o.index=a?a.array:null,o.indirectBuffer=s),o}static deserialize(e,t,n={}){n={setIndex:!0,indirect:!!e.indirectBuffer,...n};let{index:r,roots:s,indirectBuffer:a}=e;e.version||(console.warn("MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data."),l(s));let o=new i(t,{...n,[vo]:!0});if(o._roots=s,o._indirectBuffer=a||null,n.setIndex){let c=t.getIndex();if(c===null){let u=new ke(e.index,1,!1);t.setIndex(u)}else c.array!==r&&(c.array.set(r),c.needsUpdate=!0)}return o;function l(c){for(let u=0;u<c.length;u++){let h=c[u],d=new Uint32Array(h),f=new Uint16Array(h);for(let m=0,y=h.byteLength/32;m<y;m++){let g=8*m,p=2*g;et(p,f)||(d[g+6]=d[g+6]/8-m)}}}}get primitiveStride(){return 3}get resolveTriangleIndex(){return this.resolvePrimitiveIndex}constructor(e,t={}){t.maxLeafTris&&(console.warn('MeshBVH: "maxLeafTris" option has been deprecated. Use "targetLeafSize", instead.'),t={...t,targetLeafSize:t.maxLeafTris}),super(e,t)}shiftTriangleOffsets(e){return super.shiftPrimitiveOffsets(e)}writePrimitiveBounds(e,t,n){let r=this.geometry,s=this._indirectBuffer,a=r.attributes.position,o=r.index?r.index.array:null,c=(s?s[e]:e)*3,u=c+0,h=c+1,d=c+2;o&&(u=o[u],h=o[h],d=o[d]);for(let f=0;f<3;f++){let m=a[qd[f]](u),y=a[qd[f]](h),g=a[qd[f]](d),p=m;y<p&&(p=y),g<p&&(p=g);let v=m;y>v&&(v=y),g>v&&(v=g),t[n+f]=p,t[n+f+3]=v}return t}computePrimitiveBounds(e,t,n){let r=this.geometry,s=this._indirectBuffer,a=r.attributes.position,o=r.index?r.index.array:null,l=a.normalized;if(e<0||t+e-n.offset>n.length/6)throw new Error("MeshBVH: compute triangle bounds range is invalid.");let c=a.array,u=a.offset||0,h=3;a.isInterleavedBufferAttribute&&(h=a.data.stride);let d=["getX","getY","getZ"],f=n.offset;for(let m=e,y=e+t;m<y;m++){let p=(s?s[m]:m)*3,v=(m-f)*6,_=p+0,x=p+1,S=p+2;o&&(_=o[_],x=o[x],S=o[S]),l||(_=_*h+u,x=x*h+u,S=S*h+u);for(let M=0;M<3;M++){let E,R,T;l?(E=a[d[M]](_),R=a[d[M]](x),T=a[d[M]](S)):(E=c[_+M],R=c[x+M],T=c[S+M]);let b=E;R<b&&(b=R),T<b&&(b=T);let P=E;R>P&&(P=R),T>P&&(P=T);let L=(P-b)/2,D=M*2;n[v+D+0]=b+L,n[v+D+1]=L+(Math.abs(b)+L)*Js}}return n}raycastObject3D(e,t,n=[]){let{material:r}=e;if(r===void 0)return;gy.copy(e.matrixWorld).invert(),uh.copy(t.ray).applyMatrix4(gy),yy.setFromMatrixScale(e.matrixWorld),my.copy(uh.direction).multiply(yy);let s=my.length(),a=t.near/s,o=t.far/s;if(t.firstHitOnly===!0){let l=this.raycastFirst(uh,r,a,o);l=Xd(l,e,t),l&&n.push(l)}else{let l=this.raycast(uh,r,a,o);for(let c=0,u=l.length;c<u;c++){let h=Xd(l[c],e,t);h&&n.push(h)}}return n}refit(e=null){return(this.indirect?cy:ey)(this,e)}raycast(e,t=Si,n=0,r=1/0){let s=this._roots,a=[],o=this.indirect?hy:ry;for(let l=0,c=s.length;l<c;l++)o(this,l,t,e,a,n,r);return a}raycastFirst(e,t=Si,n=0,r=1/0){let s=this._roots,a=null,o=this.indirect?uy:sy;for(let l=0,c=s.length;l<c;l++){let u=o(this,l,t,e,n,r);u!=null&&(a==null||u.distance<a.distance)&&(a=u)}return a}intersectsGeometry(e,t){let n=!1,r=this._roots,s=this.indirect?fy:oy;for(let a=0,o=r.length;a<o&&(n=s(this,a,e,t),!n);a++);return n}shapecast(e){let t=gi.getPrimitive(),n=super.shapecast({...e,intersectsPrimitive:e.intersectsTriangle,scratchPrimitive:t,iterate:this.indirect?ny:Qg});return gi.releasePrimitive(t),n}bvhcast(e,t,n){let{intersectsRanges:r,intersectsTriangles:s}=n,a=gi.getPrimitive(),o=this.geometry.index,l=this.geometry.attributes.position,c=this.indirect?m=>{let y=this.resolveTriangleIndex(m);yt(a,y*3,o,l)}:m=>{yt(a,m*3,o,l)},u=gi.getPrimitive(),h=e.geometry.index,d=e.geometry.attributes.position,f=e.indirect?m=>{let y=e.resolveTriangleIndex(m);yt(u,y*3,h,d)}:m=>{yt(u,m*3,h,d)};if(s){if(!(e instanceof i))throw new Error('MeshBVH: "intersectsTriangles" callback can only be used with another MeshBVH.');let m=(y,g,p,v,_,x,S,M)=>{for(let E=p,R=p+v;E<R;E++){f(E),u.a.applyMatrix4(t),u.b.applyMatrix4(t),u.c.applyMatrix4(t),u.needsUpdate=!0;for(let T=y,b=y+g;T<b;T++)if(c(T),a.needsUpdate=!0,s(a,u,T,E,_,x,S,M))return!0}return!1};if(r){let y=r;r=function(g,p,v,_,x,S,M,E){return y(g,p,v,_,x,S,M,E)?!0:m(g,p,v,_,x,S,M,E)}}else r=m}return super.bvhcast(e,t,{intersectsRanges:r})}intersectsBox(e,t){return hh.set(e.min,e.max,t),hh.needsUpdate=!0,this.shapecast({intersectsBounds:n=>hh.intersectsBox(n),intersectsTriangle:n=>hh.intersectsTriangle(n)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,n={},r={},s=0,a=1/0){return(this.indirect?py:ly)(this,e,t,n,r,s,a)}closestPointToPoint(e,t={},n=0,r=1/0){return Xg(this,e,t,n,r)}};var pI=parseInt("180")>=166,da={Mesh:ct.prototype.raycast,Line:yn.prototype.raycast,LineSegments:tn.prototype.raycast,LineLoop:or.prototype.raycast,Points:wi.prototype.raycast,BatchedMesh:Ns.prototype.raycast},Yt=new ct,fh=[];function _y(i,e){if(this.isBatchedMesh)UM.call(this,i,e);else{let{geometry:t}=this;if(t.boundsTree)t.boundsTree.raycastObject3D(this,i,e);else{let n;if(this instanceof ct)n=da.Mesh;else if(this instanceof tn)n=da.LineSegments;else if(this instanceof or)n=da.LineLoop;else if(this instanceof yn)n=da.Line;else if(this instanceof wi)n=da.Points;else throw new Error("BVH: Fallback raycast function not found.");n.call(this,i,e)}}}function UM(i,e){if(this.boundsTrees){let t=this.boundsTrees,n=this._drawInfo||this._instanceInfo,r=this._drawRanges||this._geometryInfo,s=this.matrixWorld;Yt.material=this.material,Yt.geometry=this.geometry;let a=Yt.geometry.boundsTree,o=Yt.geometry.drawRange;Yt.geometry.boundingSphere===null&&(Yt.geometry.boundingSphere=new xt);for(let l=0,c=n.length;l<c;l++){if(!this.getVisibleAt(l))continue;let u=n[l].geometryIndex;if(Yt.geometry.boundsTree=t[u],this.getMatrixAt(l,Yt.matrixWorld).premultiply(s),!Yt.geometry.boundsTree){this.getBoundingBoxAt(u,Yt.geometry.boundingBox),this.getBoundingSphereAt(u,Yt.geometry.boundingSphere);let h=r[u];Yt.geometry.setDrawRange(h.start,h.count)}Yt.raycast(i,fh);for(let h=0,d=fh.length;h<d;h++){let f=fh[h];f.object=this,f.batchId=l,e.push(f)}fh.length=0}Yt.geometry.boundsTree=a,Yt.geometry.drawRange=o,Yt.material=null,Yt.geometry=null}else da.BatchedMesh.call(this,i,e)}function xy(i={}){let{type:e=dh}=i;return this.boundsTree=new e(this,i),this.boundsTree}function vy(){this.boundsTree=null}var ns=Math.PI/180,NM={0:["Ciel d\xE9gag\xE9","\u2600\uFE0F"],1:["Plut\xF4t d\xE9gag\xE9","\u{1F324}\uFE0F"],2:["Nuageux","\u26C5"],3:["Couvert","\u2601\uFE0F"],45:["Brouillard","\u{1F32B}\uFE0F"],48:["Brouillard givrant","\u{1F32B}\uFE0F"],51:["Bruine","\u{1F326}\uFE0F"],53:["Bruine","\u{1F326}\uFE0F"],55:["Bruine forte","\u{1F327}\uFE0F"],56:["Bruine vergla\xE7ante","\u{1F327}\uFE0F"],57:["Bruine vergla\xE7ante","\u{1F327}\uFE0F"],61:["Pluie faible","\u{1F326}\uFE0F"],63:["Pluie","\u{1F327}\uFE0F"],65:["Forte pluie","\u{1F327}\uFE0F"],66:["Pluie vergla\xE7ante","\u{1F327}\uFE0F"],67:["Pluie vergla\xE7ante","\u{1F327}\uFE0F"],71:["Neige faible","\u{1F328}\uFE0F"],73:["Neige","\u{1F328}\uFE0F"],75:["Forte neige","\u2744\uFE0F"],77:["Grains de neige","\u{1F328}\uFE0F"],80:["Averses","\u{1F326}\uFE0F"],81:["Averses","\u{1F327}\uFE0F"],82:["Fortes averses","\u26C8\uFE0F"],85:["Averses de neige","\u{1F328}\uFE0F"],86:["Averses de neige","\u2744\uFE0F"],95:["Orage","\u26C8\uFE0F"],96:["Orage et gr\xEAle","\u26C8\uFE0F"],99:["Orage et gr\xEAle","\u26C8\uFE0F"]},by=new URLSearchParams(location.search).get("meteo"),ph=class{constructor(e,t,n,r,s=2400){this.maxFar=s,this.fogFar=s,this.fogNear=s*.25,this.scene=e,this.renderer=t,this.lat=n,this.lon=r,this.now={code:1,cloud:.2,rain:0,snow:0,temp:null,wind:5,visibility:2e4},this.tint=new pe(1,1,1),this.sunElev=30,this.listeners=[],this.skyCanvas=document.createElement("canvas"),this.skyCanvas.width=2,this.skyCanvas.height=256,this.sky=new Fs(this.skyCanvas),this.sky.colorSpace=ut,e.background=this.sky,e.fog=new Xa(13229295,900,4e3),t.toneMapping=ec,t.toneMappingExposure=1,this.rain=OM(),this.snow=BM(),this.stars=zM(),e.add(this.rain,this.snow,this.stars),this.refresh(),setInterval(()=>this.refresh(),600*1e3),this.apply(),setInterval(()=>this.apply(),30*1e3)}onTint(e){this.listeners.push(e)}setLocation(e,t){let n=Math.hypot((e-this.lat)*111,(t-this.lon)*70);this.lat=e,this.lon=t,n>5&&this.refresh()}async refresh(){if(by){this.force(by),this.apply();return}try{let e="https://api.open-meteo.com/v1/forecast?latitude="+this.lat.toFixed(3)+"&longitude="+this.lon.toFixed(3)+"&current=temperature_2m,weather_code,cloud_cover,rain,showers,snowfall,wind_speed_10m,visibility&timezone=auto",t=await fetch(e);if(!t.ok)return;let n=(await t.json()).current;this.now={code:n.weather_code,cloud:(n.cloud_cover??30)/100,rain:(n.rain||0)+(n.showers||0),snow:n.snowfall||0,temp:n.temperature_2m,wind:n.wind_speed_10m||0,visibility:n.visibility??2e4},this.now.rain===0&&[51,53,55,61,63,65,80,81,82,95,96,99].includes(this.now.code)&&(this.now.rain=this.now.code>=63?2:.5),this.now.snow===0&&[71,73,75,77,85,86].includes(this.now.code)&&(this.now.snow=.5),this.apply()}catch{}}force(e){let t={temp:12,wind:10,visibility:2e4,rain:0,snow:0};this.forcedNight=e==="nuit",this.now={pluie:{...t,code:63,cloud:1,rain:3,visibility:6e3},neige:{...t,code:73,cloud:1,snow:1,temp:-1,visibility:3e3},brouillard:{...t,code:45,cloud:1,visibility:300},nuit:{...t,code:0,cloud:.1}}[e]||{...t,code:0,cloud:0}}apply(){let e=this.now;this.sunElev=this.forcedNight?-20:FM(new Date,this.lat,this.lon);let t=Ht.smoothstep(this.sunElev,-7,6),n=Math.max(0,1-Math.abs(this.sunElev-1)/8),r=Ht.clamp(e.cloud*.8+(e.rain>0||e.snow>0?.3:0),0,1),s=fa(fa("#0a1330","#5d93d6",t),"#7f8994",r*t),a=fa(fa("#1d2846","#e3edf6",t),"#c3c9d0",r*t);a=fa(a,"#f3a66a",n*(1-r)*.8);let o=fa(s,a,.55),l=this.skyCanvas.getContext("2d"),c=l.createLinearGradient(0,0,0,256);c.addColorStop(0,s.getStyle()),c.addColorStop(.55,o.getStyle()),c.addColorStop(1,a.getStyle()),l.fillStyle=c,l.fillRect(0,0,2,256),this.sky.needsUpdate=!0;let u=[45,48].includes(e.code),h=Ht.clamp(u?Math.min(e.visibility,400):e.visibility,150,2e4);this.scene.fog.color.copy(a),this.fogFar=Math.min(this.maxFar,h*.9+200),this.fogNear=Math.min(this.maxFar*.25,h*.15),this.renderer.toneMappingExposure=Ht.lerp(.28,1,t)*(1-.22*r*t);let d=new pe(1,1,1);d.lerp(new pe(.62,.72,1),1-t),d.lerp(new pe(1,.86,.72),n*(1-r)*.6),d.lerp(new pe(.9,.93,.97),r*t*.6),this.tint.copy(d),this.listeners.forEach(m=>m(this.tint)),this.rain.visible=e.rain>0;let f=Ht.clamp(e.rain/4,.25,1);this.rain.material.opacity=.2+.3*f,this.rain.geometry.setDrawRange(0,Math.floor(this.rain.geometry.attributes.position.count*f/2)*2),this.snow.visible=e.snow>0,this.stars.visible=t<.3&&e.cloud<.7,this.stars.material.opacity=(1-t/.3)*(1-e.cloud)}label(){let[e,t]=NM[this.now.code]||["",""];this.sunElev<-6&&this.now.code<=2&&(t="\u{1F319}");let n=this.now.temp==null?"":Math.round(this.now.temp)+" \xB0C \xB7 ",r=this.sunElev<-6?"nuit \xB7 ":"",s=new Date().toLocaleTimeString("fr-BE",{hour:"2-digit",minute:"2-digit",timeZone:"Europe/Brussels"});return t+" "+n+r+e+" \xB7 "+s}update(e,t){let n=this.now.wind/3.6,r=performance.now()/1e3;for(let[s,a]of[[this.rain,n*.25],[this.snow,n*.15]]){let o=s.userData.uniforms;o.uTime.value=r,o.uCam.value.copy(t),o.uDrift.value=a}this.stars.position.copy(t)}};function FM(i,e,t){let n=i.getTime()/864e5-10957.5,r=(357.529+.98560028*n)*ns,a=(280.459+.98564736*n+1.915*Math.sin(r)+.02*Math.sin(2*r))*ns,o=(23.439-36e-8*n)*ns,l=Math.asin(Math.sin(o)*Math.sin(a)),c=Math.atan2(Math.cos(o)*Math.sin(a),Math.cos(a)),h=((18.697374558+24.06570982441908*n)%24*15+t)*ns-c;return Math.asin(Math.sin(e*ns)*Math.sin(l)+Math.cos(e*ns)*Math.cos(l)*Math.cos(h))/ns}function fa(i,e,t){return new pe(i).lerp(new pe(e),Ht.clamp(t,0,1))}var pa=50,Yd=30;function Sy(i,e,t,n){let r={uTime:{value:0},uCam:{value:new C},uDrift:{value:0}};return i.onBeforeCompile=s=>{Object.assign(s.uniforms,r),s.vertexShader=`uniform float uTime; uniform vec3 uCam; uniform float uDrift; attribute float aTail;
`+s.vertexShader.replace("#include <begin_vertex>",`
			vec3 transformed = position;
			float fall = uTime * ${e.toFixed(2)};
			transformed.x += uDrift * uTime ${n?"+ sin( uTime * 0.9 + position.y * 3.1 + position.z ) * 0.4":""};
			transformed.x = uCam.x + mod( transformed.x - uCam.x, ${pa.toFixed(1)} ) - ${(pa/2).toFixed(1)};
			transformed.z = uCam.z + mod( transformed.z - uCam.z, ${pa.toFixed(1)} ) - ${(pa/2).toFixed(1)};
			transformed.y = uCam.y - ${(Yd/2).toFixed(1)} + mod( position.y - fall, ${Yd.toFixed(1)} ) - aTail * ${t.toFixed(2)};
			transformed.x -= aTail * uDrift * 0.04;
			`)},r}function Ty(i,e){let t=new Float32Array(i*e*3),n=new Float32Array(i*e);for(let s=0;s<i;s++){let a=Math.random()*pa,o=Math.random()*Yd,l=Math.random()*pa;for(let c=0;c<e;c++)t.set([a,o,l],(s*e+c)*3),n[s*e+c]=c}let r=new dt;return r.setAttribute("position",new ke(t,3)),r.setAttribute("aTail",new ke(n,1)),r}function OM(){let i=new Fn({color:12109008,transparent:!0,opacity:.45,fog:!1,depthWrite:!1}),e=Sy(i,9.5,.45,!1),t=new tn(Ty(6e3,2),i);return t.frustumCulled=!1,t.visible=!1,t.userData.uniforms=e,t}function BM(){let i=new Gi({color:16777215,size:.07,transparent:!0,opacity:.9,fog:!1,depthWrite:!1}),e=Sy(i,1.1,0,!0),t=new wi(Ty(5e3,1),i);return t.frustumCulled=!1,t.visible=!1,t.userData.uniforms=e,t}function zM(){let e=new Float32Array(4500);for(let s=0;s<1500;s++){let a=new C().randomDirection();a.y=Math.abs(a.y)+.05,a.normalize().multiplyScalar(1200),e.set([a.x,a.y,a.z],s*3)}let t=new dt;t.setAttribute("position",new ke(e,3));let n=new Gi({color:16777215,size:1.6,sizeAttenuation:!1,transparent:!0,opacity:0,fog:!1,depthWrite:!1,depthTest:!1}),r=new wi(t,n);return r.frustumCulled=!1,r.visible=!1,r.renderOrder=-1,r}function kM(i){try{let e=typeof location<"u"?location.href:void 0;return new URL(i,e).origin}catch{return null}}function My(i){if(!i)return null;let e=i.length,t=i.indexOf("?"),n=i.indexOf("#");t!==-1&&(e=Math.min(e,t)),n!==-1&&(e=Math.min(e,n));let r=i.lastIndexOf(".",e),s=i.lastIndexOf("/",e),a=i.indexOf("://");return a!==-1&&a+2===s||r===-1||r<s?null:i.substring(r+1,e)||null}var gh,yh=(gh=class{static setXRSession(i){i!==this.session&&(this.flushPending(),this.session=i)}static requestAnimationFrame(i){let{session:e,pending:t}=this,n,r=()=>{t.delete(n),i()};return n=e?e.requestAnimationFrame(r):requestAnimationFrame(r),t.set(n,i),n}static cancelAnimationFrame(i){let{pending:e,session:t}=this;e.delete(i),t?t.cancelAnimationFrame(i):cancelAnimationFrame(i)}static flushPending(){this.pending.forEach((i,e)=>{i(),this.cancelAnimationFrame(e)})}},$h(gh,"pending",new Map),$h(gh,"session",null),gh),wy=2**30,Kd=class{get unloadPriorityCallback(){return this._unloadPriorityCallback}set unloadPriorityCallback(i){i.length===1?(console.warn('LRUCache: "unloadPriorityCallback" function has been changed to take two arguments.'),this._unloadPriorityCallback=(e,t)=>{let n=i(e),r=i(t);return n<r?-1:+(n>r)}):this._unloadPriorityCallback=i}constructor(){this.minSize=6e3,this.maxSize=8e3,this.minBytesSize=.3*wy,this.maxBytesSize=.4*wy,this.unloadPercent=.05,this.autoMarkUnused=!0,this.cachedBytes=0,this.itemSet=new Map,this.itemList=[],this.usedSet=new Set,this.callbacks=new Map,this.unloadingHandle=-1,this.bytesMap=new Map,this.loadedSet=new Set,this._unloadPriorityCallback=null;let i=this.itemSet;this.defaultPriorityCallback=e=>i.get(e)}isFull(){return this.itemSet.size>=this.maxSize||this.cachedBytes>=this.maxBytesSize}getMemoryUsage(i){return this.bytesMap.get(i)||0}setMemoryUsage(i,e){let{bytesMap:t,itemSet:n}=this;n.has(i)&&(e=Math.round(e),this.cachedBytes-=t.get(i)||0,t.set(i,e),this.cachedBytes+=e)}add(i,e){let t=this.itemSet;if(t.has(i)||this.isFull())return!1;let n=this.usedSet,r=this.itemList,s=this.callbacks;return r.push(i),n.add(i),t.set(i,Date.now()),s.set(i,e),!0}has(i){return this.itemSet.has(i)}remove(i){let e=this.usedSet,t=this.itemSet,n=this.itemList,r=this.bytesMap,s=this.callbacks,a=this.loadedSet;if(t.has(i)){this.cachedBytes-=r.get(i)||0,r.delete(i),s.get(i)(i);let o=n.indexOf(i);return n.splice(o,1),e.delete(i),t.delete(i),s.delete(i),a.delete(i),!0}return!1}setLoaded(i,e){let{itemSet:t,loadedSet:n}=this;t.has(i)&&(e===!0?n.add(i):n.delete(i))}markUsed(i){let e=this.itemSet,t=this.usedSet;e.has(i)&&!t.has(i)&&(e.set(i,Date.now()),t.add(i))}markUnused(i){this.usedSet.delete(i)}markAllUnused(){this.usedSet.clear()}isUsed(i){return this.usedSet.has(i)}unloadUnusedContent(){let{unloadPercent:i,minSize:e,maxSize:t,itemList:n,itemSet:r,usedSet:s,loadedSet:a,callbacks:o,bytesMap:l,minBytesSize:c,maxBytesSize:u}=this,h=n.length-s.size,d=n.length-a.size,f=Math.max(Math.min(n.length-e,h),0),m=this.cachedBytes-c,y=this.unloadPriorityCallback||this.defaultPriorityCallback,g=!1,p=f>0&&h>0||d&&n.length>t;if(h&&this.cachedBytes>c||d&&this.cachedBytes>u||p){n.sort((R,T)=>{let b=s.has(R);if(b===s.has(T)){let P=a.has(R);return P===a.has(T)?-y(R,T):P?1:-1}return b?1:-1});let v=Math.max(e*i,f*i),_=Math.ceil(Math.min(v,h,f)),x=Math.max(i*m,i*c),S=Math.min(x,m),M=0,E=0;for(;M<n.length&&(this.cachedBytes-E>u||n.length-M>t);){let R=n[M],T=l.get(R)||0;if(s.has(R)&&a.has(R)||this.cachedBytes-E-T<u&&n.length-M<=t)break;E+=T,M++}for(;M<n.length&&(E<S||M<_);){let R=n[M],T=l.get(R)||0;if(s.has(R)||this.cachedBytes-E-T<c&&M>=_)break;E+=T,M++}n.splice(0,M).forEach(R=>{this.cachedBytes-=l.get(R)||0,o.get(R)(R),l.delete(R),r.delete(R),o.delete(R),a.delete(R),s.delete(R)}),g=M<f||E<m&&M<h,g&&(g=M>0)}g&&(this.unloadingHandle=yh.requestAnimationFrame(()=>this.scheduleUnload()))}scheduleUnload(){yh.cancelAnimationFrame(this.unloadingHandle),this.scheduled||(this.scheduled=!0,queueMicrotask(()=>{this.scheduled=!1,this.unloadUnusedContent()}))}},VM=class extends DOMException{constructor(){super("PriorityQueue: Item removed","AbortError")}},ma=class{get running(){return this.items.length!==0||this.currJobs!==0}constructor(){this.maxJobs=6,this.items=[],this.callbacks=new Map,this.currJobs=0,this.scheduled=!1,this.autoUpdate=!0,this.priorityCallback=null,this._schedulingCallback=i=>{yh.requestAnimationFrame(i)},this._runjobs=()=>{this.scheduled=!1,this.tryRunJobs()}}sort(){let i=this.priorityCallback,e=this.items;i!==null&&e.sort(i)}has(i){return this.callbacks.has(i)}add(i,e){let t={callback:e,reject:null,resolve:null,promise:null};return t.promise=new Promise((n,r)=>{let s=this.items,a=this.callbacks;t.resolve=n,t.reject=r,s.unshift(i),a.set(i,t),this.autoUpdate&&this.scheduleJobRun()}),t.promise}remove(i){let e=this.items,t=this.callbacks,n=e.indexOf(i);if(n!==-1){let r=t.get(i);r.promise.catch(s=>{if(s.name!=="AbortError")throw s}),r.reject(new VM),e.splice(n,1),t.delete(i)}}removeByFilter(i){let{items:e}=this;for(let t=0;t<e.length;t++){let n=e[t];i(n)&&(this.remove(n),t--)}}tryRunJobs(){this.sort();let i=this.items,e=this.callbacks,t=this.maxJobs,n=0,r=()=>{this.currJobs--,this.autoUpdate&&this.scheduleJobRun()};for(;t>this.currJobs&&i.length>0&&n<t;){this.currJobs++,n++;let s=i.pop(),{callback:a,resolve:o,reject:l}=e.get(s);e.delete(s);let c;try{c=a(s)}catch(u){l(u),r();continue}c instanceof Promise?c.then(o).catch(l).finally(r):(o(c),r())}}flush(i){let{items:e,callbacks:t}=this,n=e.indexOf(i);if(!t.has(i))return;let{callback:r,resolve:s,reject:a}=t.get(i);t.delete(i),e.splice(n,1);let o;try{o=r(i)}catch(l){a(l);return}return o instanceof Promise?o.then(s).catch(a):s(o),o}scheduleJobRun(){this.scheduled||(this.scheduled=(this._schedulingCallback(this._runjobs),!0))}},HM=class{get running(){for(let i of this.originQueues.values())if(i.running)return!0;return!1}get maxJobsPerOrigin(){return this._maxJobsPerOrigin}set maxJobsPerOrigin(i){this._maxJobsPerOrigin=i,this.originQueues.forEach(e=>e.maxJobs=i)}get maxJobs(){return this.maxJobsPerOrigin}set maxJobs(i){console.warn('DownloadPriorityQueue: "maxJobs" is no longer valid and limits jobs per server origin. Use "maxJobsPerOrigin", instead.'),this.maxJobsPerOrigin=i}get priorityCallback(){return this._priorityCallback}set priorityCallback(i){this._priorityCallback=i,this.originQueues.forEach(e=>e.priorityCallback=i)}constructor(){this.originQueues=new Map,this._itemQueues=new WeakMap,this._maxJobsPerOrigin=6,this._priorityCallback=null}add(i,e,t,n=null){this.originQueues.forEach((l,c)=>{l.running||this.originQueues.delete(c)});let r=i===null?null:kM(i),s=this.originQueues.get(r);s||(s=new ma,s.maxJobs=this._maxJobsPerOrigin,s.priorityCallback=this._priorityCallback,this.originQueues.set(r,s));let a=this._itemQueues.get(e);if(a&&a!==s&&a.has(e))throw Error("DownloadPriorityQueue: Item is already queued with a different url origin.");this._itemQueues.set(e,s);let o=s.add(e,t);return n!==null&&(n.aborted?this.remove(e):n.addEventListener("abort",()=>this.remove(e),{once:!0})),o}remove(i){let e=this._itemQueues.get(i);e&&(e.remove(i),this._itemQueues.delete(i))}has(i){let e=this._itemQueues.get(i);return!!(e&&e.has(i))}};var ga=6378137,yI=1/298.257223563,Cy=6356752314245179e-9,mh={inView:!1,error:1/0,distanceFromCamera:1/0};function vh(i){return i===4||i===-1}function qn(i,e){return bh(i)&&i.traversal.lastFrameVisited===e&&i.traversal.used}function bh(i){return!!i.traversal}function Io(i){let{children:e}=i,t=e.length===0||bh(e[e.length-1]),n=!i.internal.hasUnrenderableContent||vh(i.internal.loadingState);return t&&n}function rs(i){return i.traversal.unconditionallyRefine}function Po(i,e,t=!0){if(bh(i)&&(e.ensureChildrenArePreprocessed(i),i.traversal.lastFrameVisited!==e.frameCount&&(i.traversal.wasInFrustum=i.traversal.inFrustum,i.traversal.wasSetActive=i.traversal.active,i.traversal.wasSetVisible=i.traversal.visible,i.traversal.usedLastFrame=i.traversal.used,i.traversal.lastFrameVisited=e.frameCount,i.traversal.used=!1,i.traversal.inFrustum=!1,i.traversal.isLeaf=!1,i.traversal.visible=!1,i.traversal.active=!1,i.traversal.error=1/0,i.traversal.distanceFromCamera=1/0,i.traversal.allChildrenReady=!1,i.traversal.allChildrenLoaded=!1,i.traversal.kicked=!1,i.traversal.allUsedChildrenProcessed=!1,t&&(e.calculateTileViewErrorWithPlugin(i,mh),i.traversal.inFrustum=mh.inView,i.traversal.error=mh.error,i.traversal.distanceFromCamera=mh.distanceFromCamera),i.traversal.unconditionallyRefine=i.internal.hasUnrenderableContent,!i.traversal.unconditionallyRefine))){let n=i.parent;for(;n&&n.traversal.unconditionallyRefine;)n=n.parent;n&&n.geometricError<=i.geometricError&&(i.traversal.unconditionallyRefine=!0)}}function jd(i,e,t=!1){if(Po(i,e),t?e.markTileUsed(i):_h(i),rs(i)&&Io(i)){let n=i.children;for(let r=0,s=n.length;r<s;r++)jd(n[r],e,t)}}function Ry(i,e){if(Po(i,e),i.traversal.usedLastFrame&&(_h(i),i.traversal.wasSetActive&&(i.traversal.active=!0),(!i.traversal.active||rs(i))&&Io(i))){let t=i.children;for(let n=0,r=t.length;n<r;n++)Ry(t[n],e)}}function _h(i){i.traversal.used=!0}function GM(i,e){return!(i.traversal.error<=e.errorTarget&&!rs(i)||e.maxDepth>0&&i.internal.depth+1>=e.maxDepth||!Io(i))}function Py(i,e){let{frameCount:t}=e,{children:n}=i;for(let r=0,s=n.length;r<s;r++){let a=n[r];qn(a,t)&&(a.traversal.active&&(a.traversal.kicked=!0,a.traversal.active=!1),Py(a,e))}}function Ey(i){return!rs(i)&&(!i.internal.hasContent||vh(i.internal.loadingState))}function Iy(i,e){if(Po(i,e),!i.traversal.inFrustum)return;let t=i.parent;if(t&&t.refine==="ADD"&&!t.internal.hasUnrenderableContent&&i.geometricError>0&&i.traversal.error*(t.geometricError/i.geometricError)<=e.errorTarget)return;if(!GM(i,e)){_h(i);return}let n=!1,r=!1,s=i.children;for(let a=0,o=s.length;a<o;a++){let l=s[a];Iy(l,e),n||(n=qn(l,e.frameCount)),r||(r=l.traversal.inFrustum)}if(i.refine==="REPLACE"&&!r&&s.length!==0){i.traversal.inFrustum=!1,e.markTileUsed(i);for(let a=0,o=s.length;a<o;a++)jd(s[a],e,!0)}else if(_h(i),i.refine==="REPLACE"&&n&&(e.loadSiblings||e.loadAncestors))for(let a=0,o=s.length;a<o;a++)jd(s[a],e)}function Ly(i,e){let t=e.frameCount;if(!qn(i,t))return;let n=i.children,r=!1;for(let a=0,o=n.length;a<o;a++){let l=n[a];r||(r=qn(l,t))}if(!r)i.traversal.isLeaf=!0;else{for(let o=0,l=n.length;o<l;o++)Ly(n[o],e);let a=!0;for(let o=0,l=n.length;o<l;o++){let c=n[o];if(qn(c,t)){let u=!rs(c),h=!c.internal.hasContent||vh(c.internal.loadingState);u&&h||c.traversal.allChildrenLoaded||(a=!1)}}i.traversal.allChildrenLoaded=a}let s=!0;for(let a=0,o=n.length;a<o;a++){let l=n[a];qn(l,e.frameCount)&&!l.traversal.allUsedChildrenProcessed&&(s=!1)}i.traversal.allUsedChildrenProcessed=s&&Io(i)}function Dy(i,e){if(!qn(i,e.frameCount))return;let t=i.children;if(i.refine==="REPLACE"&&e.loadAncestors&&!i.traversal.allChildrenLoaded&&!rs(i)&&(i.traversal.isLeaf=!0),i.traversal.isLeaf){if(!rs(i)&&(i.traversal.active=!0,Io(i)&&i.internal.hasContent&&!vh(i.internal.loadingState)))for(let r=0,s=t.length;r<s;r++)Ry(t[r],e);return}let n=t.length>0;for(let r=0,s=t.length;r<s;r++){let a=t[r];Dy(a,e),qn(a,e.frameCount)&&!(a.traversal.active&&Ey(a))&&!a.traversal.allChildrenReady&&(n=!1)}i.traversal.allChildrenReady=n,i.refine==="REPLACE"&&!n&&i.traversal.wasSetActive&&Ey(i)&&(i.traversal.active=!0,Py(i,e))}function Uy(i,e){Po(i,e,!1);let t=qn(i,e.frameCount);if(t&&(i.internal.hasUnrenderableContent&&(e.markTileUsed(i),e.queueTileForDownload(i)),i.refine==="ADD"&&(i.traversal.active=!0),(i.traversal.active||i.traversal.kicked)&&i.internal.hasContent&&(e.markTileUsed(i),i.traversal.allUsedChildrenProcessed&&e.queueTileForDownload(i),i.internal.loadingState!==4&&(i.traversal.active=!1)),e.loadAncestors&&i.internal.hasContent&&(e.markTileUsed(i),e.queueTileForDownload(i)),i.internal.virtualChildCount>0&&i.internal.hasContent&&e.markTileUsed(i),i.traversal.visible=i.internal.hasRenderableContent&&i.traversal.active&&i.traversal.inFrustum&&i.internal.loadingState===4,e.stats.used++,i.traversal.inFrustum&&e.stats.inFrustum++),t||bh(i)&&i.traversal.usedLastFrame){let n=!1,r=!1;t?(n=i.traversal.active,r=e.displayActiveTiles&&i.traversal.active||i.traversal.visible):Po(i,e,!1),i.internal.hasRenderableContent&&i.internal.loadingState===4?(n&&e.stats.active++,r&&e.stats.visible++,i.traversal.wasSetActive!==n&&e.invokeOnePlugin(a=>a.setTileActive&&a.setTileActive(i,n)),i.traversal.wasSetVisible!==r&&e.invokeOnePlugin(a=>a.setTileVisible&&a.setTileVisible(i,r))):i.internal.hasRenderableContent||(r=i.traversal.active&&i.traversal.inFrustum,i.traversal.wasSetVisible!==r&&e.invokeOnePlugin(a=>a.setEmptyTileVisible&&a.setEmptyTileVisible(i,r))),i.traversal.visible=r,i.traversal.active=n;let s=i.children;for(let a=0,o=s.length;a<o;a++){let l=s[a];Uy(l,e)}}}function WM(i,e){Iy(i,e),Ly(i,e),Dy(i,e),Uy(i,e)}function XM(i){let e=null;return()=>{e===null&&(e=yh.requestAnimationFrame(()=>{e=null,i()}))}}function Jd(i,e=null,t=null){let n=[];for(n.push(i),n.push(null),n.push(0);n.length>0;){let r=n.pop(),s=n.pop(),a=n.pop();if(e&&e(a,s,r)){t&&t(a,s,r);return}let o=a.children;if(o)for(let l=o.length-1;l>=0;l--)n.push(o[l]),n.push(a),n.push(r+1);t&&t(a,s,r)}}var Ay=Symbol("PLUGIN_REGISTERED"),mr={inView:!0,error:0,distance:1/0},qM=(i,e)=>{let t=i.priority||0,n=e.priority||0;return t===n?!i.traversal||!e.traversal?0:i.traversal.used===e.traversal.used?i.traversal.error===e.traversal.error?i.traversal.distanceFromCamera===e.traversal.distanceFromCamera?i.internal.depthFromRenderedParent===e.internal.depthFromRenderedParent?0:i.internal.depthFromRenderedParent>e.internal.depthFromRenderedParent?-1:1:i.traversal.distanceFromCamera>e.traversal.distanceFromCamera?-1:1:i.traversal.error>e.traversal.error?1:-1:i.traversal.used?1:-1:t>n?1:-1},YM=(i,e)=>i.traversal.used===e.traversal.used?i.traversal.inFrustum===e.traversal.inFrustum?i.internal.hasUnrenderableContent===e.internal.hasUnrenderableContent?i.traversal.distanceFromCamera===e.traversal.distanceFromCamera?i.internal.depthFromRenderedParent===e.internal.depthFromRenderedParent?0:i.internal.depthFromRenderedParent>e.internal.depthFromRenderedParent?-1:1:i.traversal.distanceFromCamera>e.traversal.distanceFromCamera?-1:1:i.internal.hasUnrenderableContent?1:-1:i.traversal.inFrustum?1:-1:i.traversal.used?1:-1,jM=(i,e)=>i.traversal.lastFrameVisited===e.traversal.lastFrameVisited?i.internal.depthFromRenderedParent===e.internal.depthFromRenderedParent?i.internal.loadingState===e.internal.loadingState?i.internal.hasUnrenderableContent===e.internal.hasUnrenderableContent?i.traversal.error===e.traversal.error?0:i.traversal.error>e.traversal.error?-1:1:i.internal.hasUnrenderableContent?-1:1:i.internal.loadingState>e.internal.loadingState?-1:1:i.internal.depthFromRenderedParent>e.internal.depthFromRenderedParent?1:-1:i.traversal.lastFrameVisited>e.traversal.lastFrameVisited?-1:1,Lo=(i,e)=>{let t=i.priority??1/0,n=e.priority??1/0;if(t!==n)return t>n?1:-1;if(!i.internal||!e.internal)return 0;let r=i.internal.renderer,s=e.internal.renderer,a=!r.loadAncestors,o=!s.loadAncestors;return a&&o?YM(i,e):qM(i,e)},Ny=new Kd;Ny.unloadPriorityCallback=jM;var xh=new HM;xh.maxJobsPerOrigin=25,xh.priorityCallback=Lo;var Zd=new ma;Zd.maxJobs=5,Zd.priorityCallback=Lo;var $d=new ma;$d.maxJobs=25,$d.priorityCallback=(i,e)=>{let t=i.parent,n=e.parent;return t===n?0:t?n?Lo(t,n):-1:1};var Fy=class{get root(){let i=this.rootTileset;return i?i.root:null}get loadProgress(){let{stats:i,isLoading:e}=this,t=i.queued+i.downloading+i.parsing,n=i.inCacheSinceLoad+ +!!e;return n===0?1:1-t/n}get downloadQueue(){return this._downloadQueue}set downloadQueue(i){i instanceof ma?console.warn('TilesRenderer: "downloadQueue" is no longer valid as a PriorityQueue. Use a DownloadPriorityQueue, instead.'):this._downloadQueue=i}constructor(i=null){this.rootLoadingState=0,this.rootTileset=null,this.rootURL=i,this.fetchOptions={},this.plugins=[],this.queuedTiles=[],this.queuedTileSet=new Set,this.cachedSinceLoadComplete=new Set,this.isLoading=!1,this.processedTiles=new WeakSet,this.visibleTiles=new Set,this.activeTiles=new Set,this.usedSet=new Set,this.loadingTiles=new Set,this.lruCache=Ny,this.downloadQueue=xh,this.parseQueue=Zd,this.processNodeQueue=$d,this.stats={inCacheSinceLoad:0,inCache:0,queued:0,downloading:0,parsing:0,loaded:0,failed:0,inFrustum:0,used:0,active:0,visible:0,refused:0,tilesProcessed:0},this.frameCount=0,this._dispatchNeedsUpdateEvent=XM(()=>{this.dispatchEvent({type:"needs-update"})}),this.errorTarget=16,this.errorFalloff=0,this.errorFalloffDensity=2e-4,this.displayActiveTiles=!1,this.maxDepth=1/0,this.loadSiblings=!0,this.loadAncestors=!0,this.maxTilesProcessed=250}registerPlugin(i){if(i[Ay]===!0)throw Error("TilesRendererBase: A plugin can only be registered to a single tileset");let e=this.plugins,t=i.priority||0,n=e.length;for(let r=0;r<e.length;r++)if((e[r].priority||0)>t){n=r;break}e.splice(n,0,i),i[Ay]=!0,i.init&&i.init(this)}unregisterPlugin(i){let e=this.plugins;if(typeof i=="string"&&(i=this.getPluginByName(i)),e.includes(i)){let t=e.indexOf(i);return e.splice(t,1),i.dispose&&i.dispose(),!0}return!1}getPluginByName(i){return this.plugins.find(e=>e.name===i)||null}invokeOnePlugin(i){let e=[...this.plugins,this];for(let t=0;t<e.length;t++){let n=i(e[t]);if(n)return n}return null}invokeAllPlugins(i){let e=[...this.plugins,this],t=[];for(let n=0;n<e.length;n++){let r=i(e[n]);r&&t.push(r)}return t.length===0?null:Promise.all(t)}traverse(i,e,t=!0){this.root&&Jd(this.root,(n,...r)=>(t&&this.ensureChildrenArePreprocessed(n,!0),i?i(n,...r):!1),e)}getAttributions(i=[]){return this.invokeAllPlugins(e=>e!==this&&e.getAttributions&&e.getAttributions(i)),i}update(){let{lruCache:i,usedSet:e,stats:t,root:n,downloadQueue:r,parseQueue:s,processNodeQueue:a,queuedTiles:o,queuedTileSet:l}=this;if(this.rootLoadingState===0&&(this.rootLoadingState=2,this.invokeOnePlugin(d=>d.loadRootTileset&&d.loadRootTileset()).then(d=>{let f=this.rootURL;f!==null&&this.invokeAllPlugins(m=>f=m.preprocessURL?m.preprocessURL(f,null):f),this.rootLoadingState=4,this.rootTileset=d,this.dispatchEvent({type:"needs-update"}),this.dispatchEvent({type:"load-tileset",tileset:d,url:f}),this.dispatchEvent({type:"load-root-tileset",tileset:d,url:f})}).catch(d=>{this.rootLoadingState=-1,console.error(d),this.rootTileset=null,this.dispatchEvent({type:"load-error",tile:null,error:d,url:this.rootURL})})),!n)return;let c=null;if(this.invokeAllPlugins(d=>{if(d.doTilesNeedUpdate){let f=d.doTilesNeedUpdate();c=c===null?f:!!(c||f)}}),c===!1){this.dispatchEvent({type:"update-before"}),this.dispatchEvent({type:"update-after"});return}this.dispatchEvent({type:"update-before"}),t.inFrustum=0,t.used=0,t.active=0,t.visible=0,t.refused=0,t.tilesProcessed=0,this.frameCount++,e.forEach(d=>i.markUnused(d)),e.clear(),this.prepareForTraversal(),WM(n,this),this.removeUnusedPendingTiles(),o.sort(i.unloadPriorityCallback);let u=0,h=o.length;for(;u<h&&!i.isFull();u++)this.requestTileContents(o[u]);t.refused+=o.length-u,o.length=0,l.clear(),i.scheduleUnload(),(r.running||s.running||a.running)===!1&&this.isLoading===!0&&(this.cachedSinceLoadComplete.clear(),t.inCacheSinceLoad=0,this.dispatchEvent({type:"tiles-load-end"}),this.isLoading=!1),this.dispatchEvent({type:"update-after"})}resetFailedTiles(){this.rootLoadingState===-1&&(this.rootLoadingState=0);let i=this.stats;i.failed!==0&&(this.traverse(e=>{e.internal.loadingState===-1&&(e.internal.loadingState=0)},null,!1),i.failed=0)}calculateTileViewErrorWithPlugin(i,e){this.calculateTileViewError(i,e);let{errorFalloff:t,errorFalloffDensity:n}=this;if(t>0&&Number.isFinite(e.distanceFromCamera)){let o=e.distanceFromCamera*n;e.error-=t*(1-Math.exp(-o*o))}let r=null,s=0,a=1/0;this.invokeAllPlugins(o=>{o!==this&&o.calculateTileViewError&&(mr.inView=!0,mr.error=0,mr.distance=1/0,o.calculateTileViewError(i,mr)&&(r===null&&(r=!0),r&&(r=mr.inView),mr.inView&&(a=Math.min(a,mr.distance),s=Math.max(s,mr.error))))}),e.inView&&r!==!1?(e.error=Math.max(e.error,s),e.distanceFromCamera=Math.min(e.distanceFromCamera,a)):r?(e.inView=!0,e.error=s,e.distanceFromCamera=a):e.inView=!1}dispose(){[...this.plugins].forEach(t=>{this.unregisterPlugin(t)});let i=this.lruCache,e=[];this.traverse(t=>(e.push(t),!1),null,!1);for(let t=0,n=e.length;t<n;t++)i.remove(e[t]);this.stats={queued:0,parsing:0,downloading:0,failed:0,inFrustum:0,traversed:0,used:0,active:0,visible:0},this.frameCount=0,this.loadingTiles.clear()}calculateBytesUsed(i,e){return 0}dispatchEvent(i){}addEventListener(i,e){}removeEventListener(i,e){}parseTile(i,e,t){return null}prepareForTraversal(){}disposeTile(i){i.traversal.visible&&(i.internal.hasRenderableContent?this.invokeOnePlugin(t=>t.setTileVisible&&t.setTileVisible(i,!1)):this.invokeOnePlugin(t=>t.setEmptyTileVisible&&t.setEmptyTileVisible(i,!1)),i.traversal.visible=!1),i.traversal.active&&i.internal.hasRenderableContent&&this.invokeOnePlugin(t=>t.setTileActive&&t.setTileActive(i,!1)),i.traversal.active=!1;let{scene:e}=i.engineData;e&&this.dispatchEvent({type:"dispose-model",scene:e,tile:i})}preprocessNode(i,e,t=null){if(this.processedTiles.add(i),this.stats.tilesProcessed++,i.content&&(!("uri"in i.content)&&"url"in i.content&&(i.content.uri=i.content.url,delete i.content.url),i.content.boundingVolume&&!("box"in i.content.boundingVolume||"sphere"in i.content.boundingVolume||"region"in i.content.boundingVolume)&&delete i.content.boundingVolume),i.parent=t,i.children=i.children||[],i.internal={hasContent:!1,hasRenderableContent:!1,hasUnrenderableContent:!1,loadingState:0,basePath:e,depth:-1,depthFromRenderedParent:-1,isVirtual:!1,virtualChildCount:0,renderer:this,...i.internal},i.content?.uri){let n=My(i.content.uri),r=!!(n&&/json$/.test(n));i.internal.hasContent=!0,i.internal.hasUnrenderableContent=r,i.internal.hasRenderableContent=!r}else i.internal.hasContent=!1,i.internal.hasUnrenderableContent=!1,i.internal.hasRenderableContent=!1;t?(i.internal.depth=t.internal.depth+1,i.internal.depthFromRenderedParent=t.internal.depthFromRenderedParent+ +!!i.internal.hasRenderableContent):(i.internal.depth=0,i.internal.depthFromRenderedParent=+!!i.internal.hasRenderableContent),i.traversal={distanceFromCamera:1/0,error:1/0,inFrustum:!1,wasInFrustum:!1,isLeaf:!1,used:!1,usedLastFrame:!1,visible:!1,wasSetVisible:!1,active:!1,wasSetActive:!1,allChildrenReady:!1,allChildrenLoaded:!1,kicked:!1,allUsedChildrenProcessed:!1,lastFrameVisited:-1},i.refine=t===null?i.refine||"REPLACE":i.refine||t.refine,i.engineData={scene:null,metadata:null,boundingVolume:null},Object.defineProperty(i,"cached",{get(){return console.warn('TilesRenderer: "tile.cached" field has been renamed to "tile.engineData".'),this.engineData},enumerable:!1,configurable:!0}),this.invokeAllPlugins(n=>{n!==this&&n.preprocessNode&&n.preprocessNode(i,e,t)})}setTileActive(i,e){e?this.activeTiles.add(i):this.activeTiles.delete(i)}setTileVisible(i,e){e?this.visibleTiles.add(i):this.visibleTiles.delete(i),this.dispatchEvent({type:"tile-visibility-change",scene:i.engineData.scene,tile:i,visible:e})}calculateTileViewError(i,e){}removeUnusedPendingTiles(){let{lruCache:i,loadingTiles:e}=this,t=[];for(let n of e)!i.isUsed(n)&&n.internal.loadingState===1&&t.push(n);for(let n=0;n<t.length;n++)i.remove(t[n])}queueTileForDownload(i){let{queuedTileSet:e}=this;i.internal.loadingState!==0||e.has(i)||(e.add(i),this.lruCache.isFull()?this.stats.refused++:this.queuedTiles.push(i))}markTileUsed(i){this.usedSet.add(i),this.lruCache.markUsed(i)}fetchData(i,e){return fetch(i,e)}ensureChildrenArePreprocessed(i,e=this.stats.tilesProcessed<this.maxTilesProcessed){let t=i.children;if(t.length===0||t[t.length-1].traversal)return;let n=r=>{for(let s=0,a=r.length;s<a;s++){let o=r[s];o&&!o.traversal&&this.preprocessNode(o,i.internal.basePath,i)}};e?(this.processNodeQueue.remove(i),n(t)):this.processNodeQueue.has(i)||this.processNodeQueue.add(i,r=>{n(r.children),this._dispatchNeedsUpdateEvent()})}getBytesUsed(i){let e=0;return this.invokeAllPlugins(t=>{t.calculateBytesUsed&&(e+=t.calculateBytesUsed(i,i.engineData.scene)||0)}),e}recalculateBytesUsed(i=null){let{lruCache:e,processedTiles:t}=this;i===null?e.itemSet.forEach(n=>{t.has(n)&&e.setMemoryUsage(n,this.getBytesUsed(n))}):e.setMemoryUsage(i,this.getBytesUsed(i))}preprocessTileset(i,e,t=null){let[n,r]=i.asset.version.split(".").map(a=>parseInt(a));console.assert(n<=1,"TilesRenderer: asset.version is expected to be a 1.x or a compatible version."),n===1&&r>0&&console.warn("TilesRenderer: tiles versions at 1.1 or higher have limited support. Some new extensions and features may not be supported.");let s=e.replace(/\/[^/]*$/,"");s=new URL(s,window.location.href).toString(),this.preprocessNode(i.root,s,t)}loadRootTileset(){let i=this.rootURL;return this.invokeAllPlugins(e=>i=e.preprocessURL?e.preprocessURL(i,null):i),this.invokeOnePlugin(e=>e.fetchData&&e.fetchData(i,this.fetchOptions)).then(e=>{if(!(e instanceof Response))return e;if(e.ok)return e.json();throw Error(`TilesRenderer: Failed to load tileset "${i}" with status ${e.status} : ${e.statusText}`)}).then(e=>(this.preprocessTileset(e,i),e))}requestTileContents(i){if(i.internal.loadingState!==0)return;let e=!1,t=null,n=new URL(i.content.uri,i.internal.basePath+"/").toString();this.invokeAllPlugins(d=>n=d.preprocessURL?d.preprocessURL(n,i):n);let r=this.stats,s=this.lruCache,a=this.downloadQueue,o=this.parseQueue,l=this.loadingTiles,c=My(n),u=new AbortController,h=u.signal;if(s.add(i,d=>{u.abort(),e?d.children.length=0:this.invokeAllPlugins(f=>{f.disposeTile&&f.disposeTile(d)}),r.inCache--,this.cachedSinceLoadComplete.has(i)&&(this.cachedSinceLoadComplete.delete(i),r.inCacheSinceLoad--),d.internal.loadingState===1?r.queued--:d.internal.loadingState===2?r.downloading--:d.internal.loadingState===3?r.parsing--:d.internal.loadingState===4&&r.loaded--,d.internal.loadingState=0,o.remove(d),a.remove(d),l.delete(d)}))return this.isLoading||(this.isLoading=!0,this.dispatchEvent({type:"tiles-load-start"})),s.setMemoryUsage(i,this.getBytesUsed(i)),this.cachedSinceLoadComplete.add(i),r.inCacheSinceLoad++,r.inCache++,r.queued++,i.internal.loadingState=1,l.add(i),a.add(n,i,d=>{if(h.aborted)return Promise.resolve();i.internal.loadingState=2,r.downloading++,r.queued--;let f=this.invokeOnePlugin(m=>m.fetchData&&m.fetchData(n,{...this.fetchOptions,signal:h}));return this.dispatchEvent({type:"tile-download-start",tile:i,url:n,get uri(){return console.warn('tile-download-start event: "uri" has been renamed to "url".'),this.url}}),f}).then(d=>{if(!h.aborted){if(!(d instanceof Response))return d;if(d.ok)return c==="json"?d.json():d.arrayBuffer();throw Error(`Failed to load model with error code ${d.status}`)}}).then(d=>{if(!h.aborted)return r.downloading--,r.parsing++,i.internal.loadingState=3,o.add(i,f=>h.aborted?Promise.resolve():c==="json"&&d.root?(this.preprocessTileset(d,n,i),i.children.push(d.root),t=d,e=!0,Promise.resolve()):this.invokeOnePlugin(m=>m.parseTile&&m.parseTile(d,f,c,n,h)))}).then(()=>{if(h.aborted)return;r.parsing--,r.loaded++,i.internal.loadingState=4,l.delete(i),s.setLoaded(i,!0);let d=this.getBytesUsed(i);s.getMemoryUsage(i)===0&&d>0&&s.isFull()?s.remove(i):(s.setMemoryUsage(i,d),this.dispatchEvent({type:"needs-update"}),e&&this.dispatchEvent({type:"load-tileset",tileset:t,url:n}),i.engineData.scene&&this.dispatchEvent({type:"load-model",scene:i.engineData.scene,tile:i,url:n}))}).catch(d=>{h.aborted||(d.name==="AbortError"?s.remove(i):(o.remove(i),a.remove(i),i.internal.loadingState===1?r.queued--:i.internal.loadingState===2?r.downloading--:i.internal.loadingState===3?r.parsing--:i.internal.loadingState===4&&r.loaded--,r.failed++,console.error(`TilesRenderer : Failed to load tile at url "${i.content.uri}".`),console.error(d),i.internal.loadingState=-1,l.delete(i),s.setLoaded(i,!0),this.dispatchEvent({type:"load-error",tile:i,error:d,url:n})))})}};function gr(i){if(i===null||i.byteLength<4)return"";let e;if(e=i instanceof DataView?i:new DataView(i),String.fromCharCode(e.getUint8(0))==="{")return null;let t="";for(let n=0;n<4;n++)t+=String.fromCharCode(e.getUint8(n));return t}var ZM=new TextDecoder;function Qd(i){return ZM.decode(i)}function Sh(i){return i.replace(/[\\/][^\\/]+$/,"")+"/"}var ya=class{constructor(){this.fetchOptions={},this.workingPath=""}loadAsync(i){return fetch(i,this.fetchOptions).then(e=>{if(!e.ok)throw Error(`Failed to load file "${i}" with status ${e.status} : ${e.statusText}`);return e.arrayBuffer()}).then(e=>(this.workingPath===""&&(this.workingPath=Sh(i)),this.parse(e)))}resolveExternalURL(i){return new URL(i,this.workingPath).href}parse(i){throw Error("LoaderBase: Parse not implemented.")}};function Oy(i,e,t,n,r,s){let a;switch(n){case"SCALAR":a=1;break;case"VEC2":a=2;break;case"VEC3":a=3;break;case"VEC4":a=4;break;default:throw Error(`FeatureTable : Feature type not provided for "${s}".`)}let o,l=t*a;switch(r){case"BYTE":o=new Int8Array(i,e,l);break;case"UNSIGNED_BYTE":o=new Uint8Array(i,e,l);break;case"SHORT":o=new Int16Array(i,e,l);break;case"UNSIGNED_SHORT":o=new Uint16Array(i,e,l);break;case"INT":o=new Int32Array(i,e,l);break;case"UNSIGNED_INT":o=new Uint32Array(i,e,l);break;case"FLOAT":o=new Float32Array(i,e,l);break;case"DOUBLE":o=new Float64Array(i,e,l);break;default:throw Error(`FeatureTable : Feature component type not provided for "${s}".`)}return o}var Th=class{constructor(i,e,t,n){this.buffer=i,this.binOffset=e+t,this.binLength=n;let r=null;if(t!==0){let s=new Uint8Array(i,e,t);r=JSON.parse(Qd(s))}else r={};this.header=r}getKeys(){return Object.keys(this.header).filter(i=>i!=="extensions")}getData(i,e,t=null,n=null){let r=this.header;if(!(i in r))return null;let s=r[i];if(!(s instanceof Object)||Array.isArray(s))return s;{let{buffer:a,binOffset:o,binLength:l}=this,c=s.byteOffset||0,u=s.type||n,h=s.componentType||t;if("type"in s&&n&&s.type!==n)throw Error("FeatureTable: Specified type does not match expected type.");let d=o+c,f=Oy(a,d,e,u,h,i);if(d+f.byteLength>o+l)throw Error("FeatureTable: Feature data read outside binary body length.");return f}}getBuffer(i,e){let{buffer:t,binOffset:n}=this;return t.slice(n+i,n+i+e)}},$M=class{constructor(i){this.batchTable=i;let e=i.header.extensions["3DTILES_batch_table_hierarchy"];this.classes=e.classes;for(let n of this.classes){let r=n.instances;for(let s in r)n.instances[s]=this._parseProperty(r[s],n.length,s)}if(this.instancesLength=e.instancesLength,this.classIds=this._parseProperty(e.classIds,this.instancesLength,"classIds"),this.parentCounts=e.parentCounts?this._parseProperty(e.parentCounts,this.instancesLength,"parentCounts"):Array(this.instancesLength).fill(1),e.parentIds){let n=this.parentCounts.reduce((r,s)=>r+s,0);this.parentIds=this._parseProperty(e.parentIds,n,"parentIds")}else this.parentIds=null;this.instancesIds=[];let t={};for(let n of this.classIds)t[n]=t[n]??0,this.instancesIds.push(t[n]),t[n]++}_parseProperty(i,e,t){if(Array.isArray(i))return i;{let{buffer:n,binOffset:r}=this.batchTable,s=i.byteOffset,a=i.componentType||"UNSIGNED_SHORT";return Oy(n,r+s,e,"SCALAR",a,t)}}getDataFromId(i,e={}){let t=this.parentCounts[i];if(this.parentIds&&t>0){let o=0;for(let l=0;l<i;l++)o+=this.parentCounts[l];for(let l=0;l<t;l++){let c=this.parentIds[o+l];c!==i&&this.getDataFromId(c,e)}}let n=this.classIds[i],r=this.classes[n].instances,s=this.classes[n].name,a=this.instancesIds[i];for(let o in r)e[s]=e[s]||{},e[s][o]=r[o][a];return e}},ef=class extends Th{constructor(i,e,t,n,r){super(i,t,n,r),this.count=e,this.extensions={};let s=this.header.extensions;s&&s["3DTILES_batch_table_hierarchy"]&&(this.extensions["3DTILES_batch_table_hierarchy"]=new $M(this))}getDataFromId(i,e={}){if(i<0||i>=this.count)throw Error(`BatchTable: id value "${i}" out of bounds for "${this.count}" features number.`);for(let t of this.getKeys()){let n=super.getData(t,this.count),r=ArrayBuffer.isView(n)?n.length/this.count:1;if(r===1)e[t]=n[i];else{let s=i*r;e[t]=Array.from(n.subarray(s,s+r))}}for(let t in this.extensions){let n=this.extensions[t];n.getDataFromId instanceof Function&&(e[t]=e[t]||{},n.getDataFromId(i,e[t]))}return e}getPropertyArray(i){return super.getData(i,this.count)}},By=class extends ya{parse(i){let e=new DataView(i),t=gr(e);console.assert(t==="b3dm");let n=e.getUint32(4,!0);console.assert(n===1);let r=e.getUint32(8,!0);console.assert(r===i.byteLength);let s=e.getUint32(12,!0),a=e.getUint32(16,!0),o=e.getUint32(20,!0),l=e.getUint32(24,!0),c=new Th(i.slice(28,28+s+a),0,s,a),u=28+s+a,h=new ef(i.slice(u,u+o+l),c.getData("BATCH_LENGTH"),0,o,l),d=u+o+l;return{version:n,featureTable:c,batchTable:h,glbBytes:new Uint8Array(i,d,r-d)}}},zy=class extends ya{parse(i){let e=new DataView(i),t=gr(e);console.assert(t==="i3dm");let n=e.getUint32(4,!0);console.assert(n===1);let r=e.getUint32(8,!0);console.assert(r===i.byteLength);let s=e.getUint32(12,!0),a=e.getUint32(16,!0),o=e.getUint32(20,!0),l=e.getUint32(24,!0),c=e.getUint32(28,!0),u=new Th(i.slice(32,32+s+a),0,s,a),h=32+s+a,d=new ef(i.slice(h,h+o+l),u.getData("INSTANCES_LENGTH"),0,o,l),f=h+o+l,m=new Uint8Array(i,f,r-f),y=null,g=null,p=null;if(c)y=m,g=Promise.resolve();else{let v=this.resolveExternalURL(Qd(m));p=Sh(v),g=fetch(v,this.fetchOptions).then(_=>{if(!_.ok)throw Error(`I3DMLoaderBase : Failed to load file "${v}" with status ${_.status} : ${_.statusText}`);return _.arrayBuffer()}).then(_=>{y=new Uint8Array(_)})}return g.then(()=>({version:n,featureTable:u,batchTable:d,glbBytes:y,gltfWorkingPath:p}))}},ky=class extends ya{parse(i){let e=new DataView(i),t=gr(e);console.assert(t==="pnts");let n=e.getUint32(4,!0);console.assert(n===1);let r=e.getUint32(8,!0);console.assert(r===i.byteLength);let s=e.getUint32(12,!0),a=e.getUint32(16,!0),o=e.getUint32(20,!0),l=e.getUint32(24,!0),c=new Th(i.slice(28,28+s+a),0,s,a),u=28+s+a,h=new ef(i.slice(u,u+o+l),c.getData("BATCH_LENGTH")||c.getData("POINTS_LENGTH"),0,o,l);return Promise.resolve({version:n,featureTable:c,batchTable:h})}},Vy=class extends ya{parse(i){let e=new DataView(i),t=gr(e);console.assert(t==="cmpt",'CMPTLoader: The magic bytes equal "cmpt".');let n=e.getUint32(4,!0);console.assert(n===1,'CMPTLoader: The version listed in the header is "1".');let r=e.getUint32(8,!0);console.assert(r===i.byteLength,"CMPTLoader: The contents buffer length listed in the header matches the file.");let s=e.getUint32(12,!0),a=[],o=16;for(let l=0;l<s;l++){let c=new DataView(i,o,12),u=gr(c),h=c.getUint32(4,!0),d=c.getUint32(8,!0),f=new Uint8Array(i,o,d);a.push({type:u,buffer:f,version:h}),o+=d}return{version:n,tiles:a}}};function Hy(i){let e=0;for(let n in i.attributes){let r=i.getAttribute(n);e+=r.count*r.itemSize*r.array.BYTES_PER_ELEMENT}let t=i.getIndex();return e+=t?t.count*t.itemSize*t.array.BYTES_PER_ELEMENT:0,e}function tf(i,e){if(e===Qu)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===qs||e===_o){let t=i.getIndex();if(t===null){let a=[],o=i.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);i.setIndex(a),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,r=[];if(e===qs)for(let a=1;a<=n;a++)r.push(t.getX(0)),r.push(t.getX(a)),r.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(r.push(t.getX(a)),r.push(t.getX(a+1)),r.push(t.getX(a+2))):(r.push(t.getX(a+2)),r.push(t.getX(a+1)),r.push(t.getX(a)));r.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let s=i.clone();return s.setIndex(r),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}var _r=class extends Wi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new cf(t)}),this.register(function(t){return new hf(t)}),this.register(function(t){return new xf(t)}),this.register(function(t){return new vf(t)}),this.register(function(t){return new bf(t)}),this.register(function(t){return new df(t)}),this.register(function(t){return new ff(t)}),this.register(function(t){return new pf(t)}),this.register(function(t){return new mf(t)}),this.register(function(t){return new lf(t)}),this.register(function(t){return new gf(t)}),this.register(function(t){return new uf(t)}),this.register(function(t){return new _f(t)}),this.register(function(t){return new yf(t)}),this.register(function(t){return new af(t)}),this.register(function(t){return new Sf(t)}),this.register(function(t){return new Tf(t)})}load(e,t,n,r){let s=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let c=kn.extractUrlBase(e);a=kn.resolveURL(c,this.path)}else a=kn.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){r?r(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new nn(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,a,function(u){t(u),s.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let s,a={},o={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Yy){try{a[$e.KHR_BINARY_GLTF]=new Mf(e)}catch(h){r&&r(h);return}s=JSON.parse(a[$e.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new If(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let h=this.pluginCallbacks[u](c);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,a[h.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){let h=s.extensionsUsed[u],d=s.extensionsRequired||[];switch(h){case $e.KHR_MATERIALS_UNLIT:a[h]=new of;break;case $e.KHR_DRACO_MESH_COMPRESSION:a[h]=new wf(s,this.dracoLoader);break;case $e.KHR_TEXTURE_TRANSFORM:a[h]=new Ef;break;case $e.KHR_MESH_QUANTIZATION:a[h]=new Af;break;default:d.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,r)}parseAsync(e,t){let n=this;return new Promise(function(r,s){n.parse(e,t,r,s)})}};function KM(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}var $e={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},af=class{constructor(e){this.parser=e,this.name=$e.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){let s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,r=t.cache.get(n);if(r)return r;let s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],c,u=new pe(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],Nt);let h=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new no(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new io(u),c.distance=h;break;case"spot":c=new to(u),c.distance=h,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),En(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),r=Promise.resolve(c),t.cache.add(n,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}},of=class{constructor(){this.name=$e.KHR_MATERIALS_UNLIT}getMaterialType(){return fi}extendParams(e,t,n){let r=[];e.color=new pe(1,1,1),e.opacity=1;let s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let a=s.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Nt),e.opacity=a[3]}s.baseColorTexture!==void 0&&r.push(n.assignTexture(e,"map",s.baseColorTexture,ut))}return Promise.all(r)}},lf=class{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=r.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}},cf=class{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ei}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],a=r.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){let o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new de(o,o)}return Promise.all(s)}},hf=class{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ei}extendMaterialParams(e,t){let r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=r.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}},uf=class{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ei}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],a=r.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(s)}},df=class{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ei}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[];t.sheenColor=new pe(0,0,0),t.sheenRoughness=0,t.sheen=1;let a=r.extensions[this.name];if(a.sheenColorFactor!==void 0){let o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Nt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,ut)),a.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(s)}},ff=class{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ei}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],a=r.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(s)}},pf=class{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ei}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],a=r.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;let o=a.attenuationColor||[1,1,1];return t.attenuationColor=new pe().setRGB(o[0],o[1],o[2],Nt),Promise.all(s)}},mf=class{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ei}extendMaterialParams(e,t){let r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=r.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}},gf=class{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ei}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],a=r.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));let o=a.specularColorFactor||[1,1,1];return t.specularColor=new pe().setRGB(o[0],o[1],o[2],Nt),a.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,ut)),Promise.all(s)}},yf=class{constructor(e){this.parser=e,this.name=$e.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ei}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],a=r.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(s)}},_f=class{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ei}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],a=r.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(s)}},xf=class{constructor(e){this.parser=e,this.name=$e.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let s=r.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}},vf=class{constructor(e){this.parser=e,this.name=$e.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,r=n.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=r.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}},bf=class{constructor(e){this.parser=e,this.name=$e.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,r=n.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=r.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}},Sf=class{constructor(e){this.name=$e.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let r=n.extensions[this.name],s=this.parser.getDependency("buffer",r.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){let l=r.byteOffset||0,c=r.byteLength||0,u=r.count,h=r.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,d,r.mode,r.filter).then(function(f){return f.buffer}):a.ready.then(function(){let f=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(f),u,h,d,r.mode,r.filter),f})})}else return null}},Tf=class{constructor(e){this.name=$e.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let r=t.meshes[n.mesh];for(let c of r.primitives)if(c.mode!==Yi.TRIANGLES&&c.mode!==Yi.TRIANGLE_STRIP&&c.mode!==Yi.TRIANGLE_FAN&&c.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],l={};for(let c in a)o.push(this.parser.getDependency("accessor",a[c]).then(u=>(l[c]=u,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let u=c.pop(),h=u.isGroup?u.children:[u],d=c[0].count,f=[];for(let m of h){let y=new re,g=new C,p=new ii,v=new C(1,1,1),_=new Hr(m.geometry,m.material,d);for(let x=0;x<d;x++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,x),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,x),l.SCALE&&v.fromBufferAttribute(l.SCALE,x),_.setMatrixAt(x,y.compose(g,p,v));for(let x in l)if(x==="_COLOR_0"){let S=l[x];_.instanceColor=new ar(S.array,S.itemSize,S.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&m.geometry.setAttribute(x,l[x]);Et.prototype.copy.call(_,m),this.parser.assignFinalMaterial(_),f.push(_)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}},Yy="glTF",Do=12,Gy={JSON:1313821514,BIN:5130562},Mf=class{constructor(e){this.name=$e.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Do),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Yy)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let r=this.header.length-Do,s=new DataView(e,Do),a=0;for(;a<r;){let o=s.getUint32(a,!0);a+=4;let l=s.getUint32(a,!0);if(a+=4,l===Gy.JSON){let c=new Uint8Array(e,Do+a,o);this.content=n.decode(c)}else if(l===Gy.BIN){let c=Do+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},wf=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=$e.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,r=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(let u in a){let h=Rf[u]||u.toLowerCase();o[h]=a[u]}for(let u in e.attributes){let h=Rf[u]||u.toLowerCase();if(a[u]!==void 0){let d=n.accessors[e.attributes[u]],f=_a[d.componentType];c[h]=f.name,l[h]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(h,d){r.decodeDracoFile(u,function(f){for(let m in f.attributes){let y=f.attributes[m],g=l[m];g!==void 0&&(y.normalized=g)}h(f)},o,c,Nt,d)})})}},Ef=class{constructor(){this.name=$e.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Af=class{constructor(){this.name=$e.KHR_MESH_QUANTIZATION}},Mh=class extends On{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r*3+r;for(let a=0;a!==r;a++)t[a]=n[s+a];return t}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,u=r-t,h=(n-t)/u,d=h*h,f=d*h,m=e*c,y=m-c,g=-2*f+3*d,p=f-d,v=1-g,_=p-d+h;for(let x=0;x!==o;x++){let S=a[y+x+o],M=a[y+x+l]*u,E=a[m+x+o],R=a[m+x]*u;s[x]=v*S+_*M+g*E+p*R}return s}},JM=new ii,Cf=class extends Mh{interpolate_(e,t,n,r){let s=super.interpolate_(e,t,n,r);return JM.fromArray(s).normalize().toArray(s),s}},Yi={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},_a={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Wy={9728:kt,9729:ti,9984:nc,9985:Vs,9986:Yr,9987:rn},Xy={33071:pn,33648:Es,10497:sr},nf={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Rf={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},yr={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},QM={CUBICSPLINE:void 0,LINEAR:Br,STEP:Or},rf={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function ew(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new lr({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Si})),i.DefaultMaterial}function ss(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function En(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function tw(i,e,t){let n=!1,r=!1,s=!1;for(let c=0,u=e.length;c<u;c++){let h=e[c];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(r=!0),h.COLOR_0!==void 0&&(s=!0),n&&r&&s)break}if(!n&&!r&&!s)return Promise.resolve(i);let a=[],o=[],l=[];for(let c=0,u=e.length;c<u;c++){let h=e[c];if(n){let d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):i.attributes.position;a.push(d)}if(r){let d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):i.attributes.normal;o.push(d)}if(s){let d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):i.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){let u=c[0],h=c[1],d=c[2];return n&&(i.morphAttributes.position=u),r&&(i.morphAttributes.normal=h),s&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function iw(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,r=t.length;n<r;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function nw(i){let e,t=i.extensions&&i.extensions[$e.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+sf(t.attributes):e=i.indices+":"+sf(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,r=i.targets.length;n<r;n++)e+=":"+sf(i.targets[n]);return e}function sf(i){let e="",t=Object.keys(i).sort();for(let n=0,r=t.length;n<r;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Pf(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function rw(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var sw=new re,If=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new KM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=-1,s=!1,a=-1;if(typeof navigator<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let l=o.match(/Version\/(\d+)/);r=n&&l?parseInt(l[1],10):-1,s=o.indexOf("Firefox")>-1,a=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&r<17||s&&a<98?this.textureLoader=new Qa(this.options.manager):this.textureLoader=new ro(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new nn(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,r=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][r.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:r.asset,parser:n,userData:{}};return ss(s,o,r),En(o,r),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(let l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let r=0,s=t.length;r<s;r++){let a=t[r].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let r=0,s=e.length;r<s;r++){let a=e[r];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let r=n.clone(),s=(a,o)=>{let l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(let[c,u]of a.children.entries())s(u,o.children[c])};return s(n,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let r=e(t[n]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let r=0;r<t.length;r++){let s=e(t[r]);s&&n.push(s)}return n}getDependency(e,t){let n=e+":"+t,r=this.cache.get(n);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":r=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(s,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[$e.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(s,a){n.load(kn.resolveURL(t.uri,r.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let r=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+r)})}loadAccessor(e){let t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let a=nf[r.type],o=_a[r.componentType],l=r.normalized===!0,c=new o(r.count*a);return Promise.resolve(new ke(c,a,l))}let s=[];return r.bufferView!==void 0?s.push(this.getDependency("bufferView",r.bufferView)):s.push(null),r.sparse!==void 0&&(s.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(s).then(function(a){let o=a[0],l=nf[r.type],c=_a[r.componentType],u=c.BYTES_PER_ELEMENT,h=u*l,d=r.byteOffset||0,f=r.bufferView!==void 0?n.bufferViews[r.bufferView].byteStride:void 0,m=r.normalized===!0,y,g;if(f&&f!==h){let p=Math.floor(d/f),v="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+p+":"+r.count,_=t.cache.get(v);_||(y=new c(o,p*f,r.count*f/u),_=new Ls(y,f/u),t.cache.add(v,_)),g=new Ds(_,l,d%f/u,m)}else o===null?y=new c(r.count*l):y=new c(o,d,r.count*l),g=new ke(y,l,m);if(r.sparse!==void 0){let p=nf.SCALAR,v=_a[r.sparse.indices.componentType],_=r.sparse.indices.byteOffset||0,x=r.sparse.values.byteOffset||0,S=new v(a[1],_,r.sparse.count*p),M=new c(a[2],x,r.sparse.count*l);o!==null&&(g=new ke(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let E=0,R=S.length;E<R;E++){let T=S[E];if(g.setX(T,M[E*l]),l>=2&&g.setY(T,M[E*l+1]),l>=3&&g.setZ(T,M[E*l+2]),l>=4&&g.setW(T,M[E*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(e){let t=this.json,n=this.options,s=t.textures[e].source,a=t.images[s],o=this.textureLoader;if(a.uri){let l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){let r=this,s=this.json,a=s.textures[e],o=s.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);let d=(s.samplers||{})[a.sampler]||{};return u.magFilter=Wy[d.magFilter]||ti,u.minFilter=Wy[d.minFilter]||rn,u.wrapS=Xy[d.wrapS]||sr,u.wrapT=Xy[d.wrapT]||sr,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==kt&&u.minFilter!==ti,r.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,r=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());let a=r.images[e],o=self.URL||self.webkitURL,l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(h){c=!0;let d=new Blob([h],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(l).then(function(h){return new Promise(function(d,f){let m=d;t.isImageBitmapLoader===!0&&(m=function(y){let g=new Ut(y);g.needsUpdate=!0,d(g)}),t.load(kn.resolveURL(h,s.path),m,void 0,f)})}).then(function(h){return c===!0&&o.revokeObjectURL(l),En(h,a),h.userData.mimeType=a.mimeType||rw(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,r){let s=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),s.extensions[$e.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[$e.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let l=s.associations.get(a);a=s.extensions[$e.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,l)}}return r!==void 0&&(a.colorSpace=r),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,r=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new Gi,Ti.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new Fn,Ti.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(r||s||a){let o="ClonedMaterial:"+n.uuid+":";r&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),s&&(l.vertexColors=!0),a&&(l.flatShading=!0),r&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return lr}loadMaterial(e){let t=this,n=this.json,r=this.extensions,s=n.materials[e],a,o={},l=s.extensions||{},c=[];if(l[$e.KHR_MATERIALS_UNLIT]){let h=r[$e.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),c.push(h.extendParams(o,s,t))}else{let h=s.pbrMetallicRoughness||{};if(o.color=new pe(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){let d=h.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Nt),o.opacity=d[3]}h.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",h.baseColorTexture,ut)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=mi);let u=s.alphaMode||rf.OPAQUE;if(u===rf.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===rf.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==fi&&(c.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new de(1,1),s.normalTexture.scale!==void 0)){let h=s.normalTexture.scale;o.normalScale.set(h,h)}if(s.occlusionTexture!==void 0&&a!==fi&&(c.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==fi){let h=s.emissiveFactor;o.emissive=new pe().setRGB(h[0],h[1],h[2],Nt)}return s.emissiveTexture!==void 0&&a!==fi&&c.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,ut)),Promise.all(c).then(function(){let h=new a(o);return s.name&&(h.name=s.name),En(h,s),t.associations.set(h,{materials:e}),s.extensions&&ss(r,h,s),h})}createUniqueName(e){let t=mt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,r=this.primitiveCache;function s(o){return n[$e.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return qy(l,o,t)})}let a=[];for(let o=0,l=e.length;o<l;o++){let c=e[o],u=nw(c),h=r[u];if(h)a.push(h.promise);else{let d;c.extensions&&c.extensions[$e.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=qy(new dt,c,t),r[u]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,r=this.extensions,s=n.meshes[e],a=s.primitives,o=[];for(let l=0,c=a.length;l<c;l++){let u=a[l].material===void 0?ew(this.cache):this.getDependency("material",a[l].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){let c=l.slice(0,l.length-1),u=l[l.length-1],h=[];for(let f=0,m=u.length;f<m;f++){let y=u[f],g=a[f],p,v=c[f];if(g.mode===Yi.TRIANGLES||g.mode===Yi.TRIANGLE_STRIP||g.mode===Yi.TRIANGLE_FAN||g.mode===void 0)p=s.isSkinnedMesh===!0?new Ya(y,v):new ct(y,v),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),g.mode===Yi.TRIANGLE_STRIP?p.geometry=tf(p.geometry,_o):g.mode===Yi.TRIANGLE_FAN&&(p.geometry=tf(p.geometry,qs));else if(g.mode===Yi.LINES)p=new tn(y,v);else if(g.mode===Yi.LINE_STRIP)p=new yn(y,v);else if(g.mode===Yi.LINE_LOOP)p=new or(y,v);else if(g.mode===Yi.POINTS)p=new wi(y,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&iw(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),En(p,s),g.extensions&&ss(r,p,g),t.assignFinalMaterial(p),h.push(p)}for(let f=0,m=h.length;f<m;f++)t.associations.set(h[f],{meshes:e,primitives:f});if(h.length===1)return s.extensions&&ss(r,h[0],s),h[0];let d=new Qt;s.extensions&&ss(r,d,s),t.associations.set(d,{meshes:e});for(let f=0,m=h.length;f<m;f++)d.add(h[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],r=n[n.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Pt(Ht.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type==="orthographic"&&(t=new bn(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),En(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let r=0,s=t.joints.length;r<s;r++)n.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(r){let s=r.pop(),a=r,o=[],l=[];for(let c=0,u=a.length;c<u;c++){let h=a[c];if(h){o.push(h);let d=new re;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new ja(o,l)})}loadAnimation(e){let t=this.json,n=this,r=t.animations[e],s=r.name?r.name:"animation_"+e,a=[],o=[],l=[],c=[],u=[];for(let h=0,d=r.channels.length;h<d;h++){let f=r.channels[h],m=r.samplers[f.sampler],y=f.target,g=y.node,p=r.parameters!==void 0?r.parameters[m.input]:m.input,v=r.parameters!==void 0?r.parameters[m.output]:m.output;y.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",v)),c.push(m),u.push(y))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(h){let d=h[0],f=h[1],m=h[2],y=h[3],g=h[4],p=[];for(let _=0,x=d.length;_<x;_++){let S=d[_],M=f[_],E=m[_],R=y[_],T=g[_];if(S===void 0)continue;S.updateMatrix&&S.updateMatrix();let b=n._createAnimationTracks(S,M,E,R,T);if(b)for(let P=0;P<b.length;P++)p.push(b[P])}let v=new Ja(s,void 0,p);return En(v,r),v})}createNodeMesh(e){let t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency("mesh",r.mesh).then(function(s){let a=n._getNodeRef(n.meshCache,r.mesh,s);return r.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=r.weights.length;l<c;l++)o.morphTargetInfluences[l]=r.weights[l]}),a})}loadNode(e){let t=this.json,n=this,r=t.nodes[e],s=n._loadNodeShallow(e),a=[],o=r.children||[];for(let c=0,u=o.length;c<u;c++)a.push(n.getDependency("node",o[c]));let l=r.skin===void 0?Promise.resolve(null):n.getDependency("skin",r.skin);return Promise.all([s,Promise.all(a),l]).then(function(c){let u=c[0],h=c[1],d=c[2];d!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(d,sw)});for(let f=0,m=h.length;f<m;f++)u.add(h[f]);return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=t.nodes[e],a=s.name?r.createUniqueName(s.name):"",o=[],l=r._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),s.camera!==void 0&&o.push(r.getDependency("camera",s.camera).then(function(c){return r._getNodeRef(r.cameraCache,s.camera,c)})),r._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let u;if(s.isBone===!0?u=new Us:c.length>1?u=new Qt:c.length===1?u=c[0]:u=new Et,u!==c[0])for(let h=0,d=c.length;h<d;h++)u.add(c[h]);if(s.name&&(u.userData.name=s.name,u.name=a),En(u,s),s.extensions&&ss(n,u,s),s.matrix!==void 0){let h=new re;h.fromArray(s.matrix),u.applyMatrix4(h)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);if(!r.associations.has(u))r.associations.set(u,{});else if(s.mesh!==void 0&&r.meshCache.refs[s.mesh]>1){let h=r.associations.get(u);r.associations.set(u,{...h})}return r.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],r=this,s=new Qt;n.name&&(s.name=r.createUniqueName(n.name)),En(s,n),n.extensions&&ss(t,s,n);let a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(r.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let u=0,h=l.length;u<h;u++)s.add(l[u]);let c=u=>{let h=new Map;for(let[d,f]of r.associations)(d instanceof Ti||d instanceof Ut)&&h.set(d,f);return u.traverse(d=>{let f=r.associations.get(d);f!=null&&h.set(d,f)}),h};return r.associations=c(s),s})}_createAnimationTracks(e,t,n,r,s){let a=[],o=e.name?e.name:e.uuid,l=[];yr[s.path]===yr.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(yr[s.path]){case yr.weights:c=_n;break;case yr.rotation:c=xn;break;case yr.translation:case yr.scale:c=vn;break;default:n.itemSize===1?c=_n:c=vn;break}let u=r.interpolation!==void 0?QM[r.interpolation]:Br,h=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){let m=new c(l[d]+"."+yr[s.path],t.array,h,u);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),a.push(m)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Pf(t.constructor),r=new Float32Array(t.length);for(let s=0,a=t.length;s<a;s++)r[s]=t[s]*n;t=r}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let r=this instanceof xn?Cf:Mh;return new r(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function aw(i,e,t){let n=e.attributes,r=new je;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(r.set(new C(l[0],l[1],l[2]),new C(c[0],c[1],c[2])),o.normalized){let u=Pf(_a[o.componentType]);r.min.multiplyScalar(u),r.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let o=new C,l=new C;for(let c=0,u=s.length;c<u;c++){let h=s[c];if(h.POSITION!==void 0){let d=t.json.accessors[h.POSITION],f=d.min,m=d.max;if(f!==void 0&&m!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),d.normalized){let y=Pf(_a[d.componentType]);l.multiplyScalar(y)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(o)}i.boundingBox=r;let a=new xt;r.getCenter(a.center),a.radius=r.min.distanceTo(r.max)/2,i.boundingSphere=a}function qy(i,e,t){let n=e.attributes,r=[];function s(a,o){return t.getDependency("accessor",a).then(function(l){i.setAttribute(o,l)})}for(let a in n){let o=Rf[a]||a.toLowerCase();o in i.attributes||r.push(s(n[a],o))}if(e.indices!==void 0&&!i.index){let a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});r.push(a)}return qe.workingColorSpace!==Nt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${qe.workingColorSpace}" not supported.`),En(i,e),aw(i,e,t),Promise.all(r).then(function(){return e.targets!==void 0?tw(i,e.targets,t):i})}var Vf=class extends By{constructor(i=cr){super(),this.manager=i,this.adjustmentTransform=new re}parse(i){let e=super.parse(i),t=e.glbBytes.slice().buffer;return new Promise((n,r)=>{let s=this.manager,a=this.fetchOptions,o=s.getHandler("path.gltf")||new _r(s);a.credentials==="include"&&a.mode==="cors"&&o.setCrossOrigin("use-credentials"),"credentials"in a&&o.setWithCredentials(a.credentials==="include"),a.headers&&o.setRequestHeader(a.headers);let l=this.workingPath;!/[\\/]$/.test(l)&&l.length&&(l+="/");let c=this.adjustmentTransform;o.parse(t,l,u=>{let{batchTable:h,featureTable:d}=e,{scene:f}=u,m=d.getData("RTC_CENTER",1,"FLOAT","VEC3");m&&(f.position.x+=m[0],f.position.y+=m[1],f.position.z+=m[2]),u.scene.updateMatrix(),u.scene.matrix.multiply(c),u.scene.matrix.decompose(u.scene.position,u.scene.quaternion,u.scene.scale),u.batchTable=h,u.featureTable=d,f.batchTable=h,f.featureTable=d,n(u)},r)})}};function ow(i){let e=i>>11,t=i>>5&63,n=i&31;return[Math.round(e/31*255),Math.round(t/63*255),Math.round(n/31*255)]}var Uo=new de;function lw(i,e,t=new C){Uo.set(i,e).divideScalar(256).multiplyScalar(2).subScalar(1),t.set(Uo.x,Uo.y,1-Math.abs(Uo.x)-Math.abs(Uo.y));let n=Ht.clamp(-t.z,0,1);return t.x>=0?t.setX(t.x-n):t.setX(t.x+n),t.y>=0?t.setY(t.y-n):t.setY(t.y+n),t.normalize(),t}var jy={RGB:"color",POSITION:"position"},Hf=class extends ky{constructor(i=cr){super(),this.manager=i}parse(i){return super.parse(i).then(async e=>{let{featureTable:t,batchTable:n}=e,r=new Gi,s=t.header.extensions,a=new C,o;if(s&&s["3DTILES_draco_point_compression"]){let{byteOffset:u,byteLength:h,properties:d}=s["3DTILES_draco_point_compression"],f=this.manager.getHandler("draco.drc");if(f==null)throw Error("PNTSLoader: dracoLoader not available.");let m={};for(let p in d)if(p in jy&&p in d){let v=jy[p];m[v]=d[p]}let y={attributeIDs:m,attributeTypes:{position:"Float32Array",color:"Uint8Array"},useUniqueIDs:!0},g=t.getBuffer(u,h);o=await f.decodeGeometry(g,y),o.attributes.color&&(r.vertexColors=!0)}else{let u=t.getData("POINTS_LENGTH"),h=t.getData("POSITION",u,"FLOAT","VEC3"),d=t.getData("NORMAL",u,"FLOAT","VEC3"),f=t.getData("NORMAL",u,"UNSIGNED_BYTE","VEC2"),m=t.getData("RGB",u,"UNSIGNED_BYTE","VEC3"),y=t.getData("RGBA",u,"UNSIGNED_BYTE","VEC4"),g=t.getData("RGB565",u,"UNSIGNED_SHORT","SCALAR"),p=t.getData("CONSTANT_RGBA",u,"UNSIGNED_BYTE","VEC4"),v=t.getData("POSITION_QUANTIZED",u,"UNSIGNED_SHORT","VEC3"),_=t.getData("QUANTIZED_VOLUME_SCALE",u,"FLOAT","VEC3"),x=t.getData("QUANTIZED_VOLUME_OFFSET",u,"FLOAT","VEC3");if(o=new dt,v){let S=new Float32Array(u*3);for(let M=0;M<u;M++)for(let E=0;E<3;E++){let R=3*M+E;S[R]=v[R]/65535*_[E]}a.x=x[0],a.y=x[1],a.z=x[2],o.setAttribute("position",new ke(S,3,!1))}else o.setAttribute("position",new ke(h,3,!1));if(d!==null)o.setAttribute("normal",new ke(d,3,!1));else if(f!==null){let S=new Float32Array(u*3),M=new C;for(let E=0;E<u;E++){let R=f[E*2],T=f[E*2+1],b=lw(R,T,M);S[E*3]=b.x,S[E*3+1]=b.y,S[E*3+2]=b.z}o.setAttribute("normal",new ke(S,3,!1))}if(y!==null)o.setAttribute("color",new ke(y,4,!0)),r.vertexColors=!0,r.transparent=!0,r.depthWrite=!1;else if(m!==null)o.setAttribute("color",new ke(m,3,!0)),r.vertexColors=!0;else if(g!==null){let S=new Uint8Array(u*3);for(let M=0;M<u;M++){let E=ow(g[M]);for(let R=0;R<3;R++){let T=3*M+R;S[T]=E[R]}}o.setAttribute("color",new ke(S,3,!0)),r.vertexColors=!0}else if(p!==null){r.color=new pe(p[0],p[1],p[2]);let S=p[3]/255;S<1&&(r.opacity=S,r.transparent=!0,r.depthWrite=!1)}}let l=new wi(o,r);l.position.copy(a),e.scene=l,e.scene.featureTable=t,e.scene.batchTable=n;let c=t.getData("RTC_CENTER",1,"FLOAT","VEC3");return c&&(e.scene.position.x+=c[0],e.scene.position.y+=c[1],e.scene.position.z+=c[2]),e})}};function cw(i){let{x:e,y:t,z:n}=i;i.x=n,i.y=e,i.z=t}function hw(i){return-i+Math.PI/2}var Zy=new so,xr=new C,yi=new C,Lf=new C,ji=new re,An=new re,Df=new xt,Ci=new di,$y=new C,Ky=new C,Jy=new C,No=new C,wh=new Vt,uw=1e-12,dw=.1;var Gf=class{constructor(i=1,e=1,t=1){this.isEllipsoid=!0,this.name="",this.radius=new C(i,e,t)}intersectRay(i,e){return ji.makeScale(...this.radius).invert(),Df.center.set(0,0,0),Df.radius=1,wh.copy(i).applyMatrix4(ji),wh.intersectSphere(Df,e)?(ji.makeScale(...this.radius),e.applyMatrix4(ji),e):null}getEastNorthUpFrame(i,e,t,n){return t.isMatrix4&&(n=t,t=0,console.warn('Ellipsoid: The signature for "getEastNorthUpFrame" has changed.')),this.getEastNorthUpAxes(i,e,$y,Ky,Jy),this.getCartographicToPosition(i,e,t,No),n.makeBasis($y,Ky,Jy).setPosition(No)}getOrientedEastNorthUpFrame(i,e,t,n,r,s,a){return this.getObjectFrame(i,e,t,n,r,s,a,0)}getObjectFrame(i,e,t,n,r,s,a,o=2){return this.getEastNorthUpFrame(i,e,t,ji),Ci.set(r,s,-n,"ZXY"),a.makeRotationFromEuler(Ci).premultiply(ji),o===1?(Ci.set(Math.PI/2,0,0,"XYZ"),An.makeRotationFromEuler(Ci),a.multiply(An)):o===2&&(Ci.set(-Math.PI/2,0,Math.PI,"XYZ"),An.makeRotationFromEuler(Ci),a.multiply(An)),a}getCartographicFromObjectFrame(i,e,t=2){return t===1?(Ci.set(-Math.PI/2,0,0,"XYZ"),An.makeRotationFromEuler(Ci).premultiply(i)):t===2?(Ci.set(-Math.PI/2,0,Math.PI,"XYZ"),An.makeRotationFromEuler(Ci).premultiply(i)):An.copy(i),No.setFromMatrixPosition(An),this.getPositionToCartographic(No,e),this.getEastNorthUpFrame(e.lat,e.lon,0,ji).invert(),An.premultiply(ji),Ci.setFromRotationMatrix(An,"ZXY"),e.azimuth=-Ci.z,e.elevation=Ci.x,e.roll=Ci.y,e}getEastNorthUpAxes(i,e,t,n,r,s=No){this.getCartographicToPosition(i,e,0,s),this.getCartographicToNormal(i,e,r),t.set(-s.y,s.x,0).normalize(),n.crossVectors(r,t).normalize()}getCartographicToPosition(i,e,t,n){this.getCartographicToNormal(i,e,xr);let r=this.radius;yi.copy(xr),yi.x*=r.x**2,yi.y*=r.y**2,yi.z*=r.z**2;let s=Math.sqrt(xr.dot(yi));return yi.divideScalar(s),n.copy(yi).addScaledVector(xr,t)}getPositionToCartographic(i,e){this.getPositionToSurfacePoint(i,yi),this.getPositionToNormal(yi,xr);let t=Lf.subVectors(i,yi);return e.lon=Math.atan2(xr.y,xr.x),e.lat=Math.asin(xr.z),e.height=Math.sign(t.dot(i))*t.length(),e}getCartographicToNormal(i,e,t){return Zy.set(1,hw(i),e),t.setFromSpherical(Zy).normalize(),cw(t),t}getPositionToNormal(i,e){let t=this.radius;return e.copy(i),e.x/=t.x**2,e.y/=t.y**2,e.z/=t.z**2,e.normalize(),e}getPositionToSurfacePoint(i,e){let t=this.radius,n=1/t.x**2,r=1/t.y**2,s=1/t.z**2,a=i.x*i.x*n,o=i.y*i.y*r,l=i.z*i.z*s,c=a+o+l,u=Math.sqrt(1/c),h=yi.copy(i).multiplyScalar(u);if(c<dw)return isFinite(u)?e.copy(h):null;let d=Lf.set(h.x*n*2,h.y*r*2,h.z*s*2),f=(1-u)*i.length()/(.5*d.length()),m=0,y,g,p,v,_,x,S,M,E,R,T;do{f-=m,p=1/(1+f*n),v=1/(1+f*r),_=1/(1+f*s),x=p*p,S=v*v,M=_*_,E=x*p,R=S*v,T=M*_,y=a*x+o*S+l*M-1,g=a*E*n+o*R*r+l*T*s;let b=-2*g;m=y/b}while(Math.abs(y)>uw);return e.set(i.x*p,i.y*v,i.z*_)}calculateHorizonDistance(i,e){let t=this.calculateEffectiveRadius(i);return Math.sqrt(2*t*e+e**2)}calculateEffectiveRadius(i){let e=this.radius.x,t=1-this.radius.z**2/e**2,n=i*Ht.DEG2RAD,r=Math.sin(n)**2;return e/Math.sqrt(1-t*r)}getPositionElevation(i){this.getPositionToSurfacePoint(i,yi);let e=Lf.subVectors(i,yi);return Math.sign(e.dot(i))*e.length()}closestPointToRayEstimate(i,e){return this.intersectRay(i,e)?e:(ji.makeScale(...this.radius).invert(),wh.copy(i).applyMatrix4(ji),yi.set(0,0,0),wh.closestPointToPoint(yi,e).normalize(),ji.makeScale(...this.radius),e.applyMatrix4(ji))}copy(i){return this.radius.copy(i.radius),this}clone(){return new this.constructor().copy(this)}},ko=new Gf(ga,ga,Cy);ko.name="WGS84 Earth";var Eh=new C,xa=new C,va=new C,Uf=new C,Ah=new ii,Ch=new C,ba=new re,Qy=new re,e0=new C,t0=new re,Nf=new ii,Ff={};function i0(i,e,t,n){if(i=i/t*2-1,e=e/t*2-1,n.x=i,n.y=e,n.z=1-Math.abs(i)-Math.abs(e),n.z<0){let r=n.x;n.x=(1-Math.abs(n.y))*(r>=0?1:-1),n.y=(1-Math.abs(r))*(n.y>=0?1:-1)}return n.normalize(),n}var Wf=class extends zy{constructor(i=cr){super(),this.manager=i,this.adjustmentTransform=new re,this.ellipsoid=ko.clone()}resolveExternalURL(i){return this.manager.resolveURL(super.resolveExternalURL(i))}parse(i){return super.parse(i).then(e=>{let{featureTable:t,batchTable:n}=e,r=e.glbBytes.slice().buffer;return new Promise((s,a)=>{let o=this.fetchOptions,l=this.manager,c=l.getHandler("path.gltf")||new _r(l);o.credentials==="include"&&o.mode==="cors"&&c.setCrossOrigin("use-credentials"),"credentials"in o&&c.setWithCredentials(o.credentials==="include"),o.headers&&c.setRequestHeader(o.headers);let u=e.gltfWorkingPath??this.workingPath;/[\\/]$/.test(u)||(u+="/");let h=this.adjustmentTransform;c.parse(r,u,d=>{let f=t.getData("INSTANCES_LENGTH"),m=t.getData("POSITION",f,"FLOAT","VEC3"),y=t.getData("POSITION_QUANTIZED",f,"UNSIGNED_SHORT","VEC3"),g=t.getData("QUANTIZED_VOLUME_OFFSET",1,"FLOAT","VEC3"),p=t.getData("QUANTIZED_VOLUME_SCALE",1,"FLOAT","VEC3"),v=t.getData("NORMAL_UP",f,"FLOAT","VEC3"),_=t.getData("NORMAL_RIGHT",f,"FLOAT","VEC3"),x=t.getData("NORMAL_UP_OCT32P",f,"UNSIGNED_SHORT","VEC2"),S=t.getData("NORMAL_RIGHT_OCT32P",f,"UNSIGNED_SHORT","VEC2"),M=t.getData("SCALE_NON_UNIFORM",f,"FLOAT","VEC3"),E=t.getData("SCALE",f,"FLOAT","SCALAR"),R=t.getData("RTC_CENTER",1,"FLOAT","VEC3"),T=t.getData("EAST_NORTH_UP");if(!m&&y){m=new Float32Array(f*3);for(let D=0;D<f;D++)m[D*3+0]=g[0]+y[D*3+0]/65535*p[0],m[D*3+1]=g[1]+y[D*3+1]/65535*p[1],m[D*3+2]=g[2]+y[D*3+2]/65535*p[2]}let b=new C;for(let D=0;D<f;D++)b.x+=m[D*3+0]/f,b.y+=m[D*3+1]/f,b.z+=m[D*3+2]/f;let P=[],L=[];d.scene.updateMatrixWorld(),d.scene.traverse(D=>{if(D.isMesh){L.push(D);let{geometry:F,material:k}=D,V=new Hr(F,k,f);V.position.copy(b),R&&(V.position.x+=R[0],V.position.y+=R[1],V.position.z+=R[2]),P.push(V)}});for(let D=0;D<f;D++){Uf.set(m[D*3+0]-b.x,m[D*3+1]-b.y,m[D*3+2]-b.z),Ah.identity(),v&&_?(xa.set(v[D*3+0],v[D*3+1],v[D*3+2]),va.set(_[D*3+0],_[D*3+1],_[D*3+2]),Eh.crossVectors(va,xa).normalize(),ba.makeBasis(va,xa,Eh),Ah.setFromRotationMatrix(ba)):x&&S&&(i0(x[D*2+0],x[D*2+1],65535,xa),i0(S[D*2+0],S[D*2+1],65535,va),Eh.crossVectors(va,xa).normalize(),ba.makeBasis(va,xa,Eh),Ah.setFromRotationMatrix(ba)),Ch.set(1,1,1),M&&Ch.set(M[D*3+0],M[D*3+1],M[D*3+2]),E&&Ch.multiplyScalar(E[D]);for(let F=0,k=P.length;F<k;F++){let V=P[F];Nf.copy(Ah),T&&(V.updateMatrixWorld(),e0.copy(Uf).applyMatrix4(V.matrixWorld),this.ellipsoid.getPositionToCartographic(e0,Ff),this.ellipsoid.getEastNorthUpFrame(Ff.lat,Ff.lon,t0),Nf.setFromRotationMatrix(t0)),ba.compose(Uf,Nf,Ch).multiply(h);let K=L[F];Qy.multiplyMatrices(ba,K.matrixWorld),V.setMatrixAt(D,Qy)}}d.scene.clear(),d.scene.add(...P),d.batchTable=n,d.featureTable=t,d.scene.batchTable=n,d.scene.featureTable=t,s(d)},a)})})}},c0=class extends Vy{constructor(i=cr){super(),this.manager=i,this.adjustmentTransform=new re,this.ellipsoid=ko.clone()}parse(i){let e=super.parse(i),{manager:t,ellipsoid:n,adjustmentTransform:r}=this,s=[];for(let a in e.tiles){let{type:o,buffer:l}=e.tiles[a];switch(o){case"b3dm":{let c=l.slice(),u=new Vf(t);u.workingPath=this.workingPath,u.fetchOptions=this.fetchOptions,u.adjustmentTransform.copy(r);let h=u.parse(c.buffer);s.push(h);break}case"pnts":{let c=l.slice(),u=new Hf(t);u.workingPath=this.workingPath,u.fetchOptions=this.fetchOptions;let h=u.parse(c.buffer);s.push(h);break}case"i3dm":{let c=l.slice(),u=new Wf(t);u.workingPath=this.workingPath,u.fetchOptions=this.fetchOptions,u.ellipsoid.copy(n),u.adjustmentTransform.copy(r);let h=u.parse(c.buffer);s.push(h);break}}}return Promise.all(s).then(a=>{let o=new Qt;return a.forEach(l=>{o.add(l.scene)}),{tiles:a,scene:o}})}},Fo=new re,fw=class extends Qt{constructor(i){super(),this.isTilesGroup=!0,this.name="TilesRenderer.TilesGroup",this.tilesRenderer=i,this.matrixWorldInverse=new re}raycast(i,e){return this.tilesRenderer.raycast(i,e),!1}updateMatrixWorld(i){if(this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldNeedsUpdate||i){this.parent===null?Fo.copy(this.matrix):Fo.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1;let e=Fo.elements,t=this.matrixWorld.elements,n=!1;for(let r=0;r<16;r++){let s=e[r],a=t[r];if(Math.abs(s-a)>2**-52){n=!0;break}}if(n){this.matrixWorld.copy(Fo),this.matrixWorldInverse.copy(Fo).invert();let r=this.children;for(let l=0,c=r.length;l<c;l++)r[l].updateMatrixWorld();let{tilesRenderer:s}=this,{activeTiles:a,visibleTiles:o}=s;a.forEach(l=>{o.has(l)||l.engineData.scene.updateMatrixWorld(!0)})}}}updateWorldMatrix(i,e){this.parent&&i&&this.parent.updateWorldMatrix(i,!1),this.updateMatrixWorld(!0)}},pw=new Vt;function mw(i,e,t,n){let{scene:r}=i.engineData;t.invokeOnePlugin(s=>s.raycastTile&&s.raycastTile(i,r,e,n))||e.intersectObject(r,!0,n)}function gw(i){return"traversal"in i}function h0(i,e,t,n,r=null){if(!gw(e))return;let{group:s,activeTiles:a}=i,{boundingVolume:o}=e.engineData;if(r===null&&(r=pw,r.copy(t.ray).applyMatrix4(s.matrixWorldInverse)),!e.traversal.used||!o.intersectsRay(r))return;a.has(e)&&mw(e,t,i,n);let l=e.children;for(let c=0,u=l.length;c<u;c++)h0(i,l[c],t,n,r)}var Rh=new C,Ph=new C,Ri=new C,Ih=new Vt,zf=class{constructor(i=new je,e=new re){this.box=i.clone(),this.transform=e.clone(),this.inverseTransform=new re,this.points=Array(8).fill().map(()=>new C),this.planes=[,,,,,,].fill().map(()=>new Jt)}copy(i){return this.box.copy(i.box),this.transform.copy(i.transform),this.update(),this}clone(){return new this.constructor().copy(this)}clampPoint(i,e){return e.copy(i).applyMatrix4(this.inverseTransform).clamp(this.box.min,this.box.max).applyMatrix4(this.transform)}distanceToPoint(i){return this.clampPoint(i,Ri).distanceTo(i)}containsPoint(i){return Ri.copy(i).applyMatrix4(this.inverseTransform),this.box.containsPoint(Ri)}intersectsRay(i){return Ih.copy(i).applyMatrix4(this.inverseTransform),Ih.intersectsBox(this.box)}intersectRay(i,e){return Ih.copy(i).applyMatrix4(this.inverseTransform),Ih.intersectBox(this.box,e)?(e.applyMatrix4(this.transform),e):null}update(){let{points:i,inverseTransform:e,transform:t,box:n}=this;e.copy(t).invert();let{min:r,max:s}=n,a=0;for(let o=-1;o<=1;o+=2)for(let l=-1;l<=1;l+=2)for(let c=-1;c<=1;c+=2)i[a].set(o<0?r.x:s.x,l<0?r.y:s.y,c<0?r.z:s.z).applyMatrix4(t),a++;this.updatePlanes()}updatePlanes(){Rh.copy(this.box.min).applyMatrix4(this.transform),Ph.copy(this.box.max).applyMatrix4(this.transform),Ri.set(0,0,1).transformDirection(this.transform),this.planes[0].setFromNormalAndCoplanarPoint(Ri,Rh),this.planes[1].setFromNormalAndCoplanarPoint(Ri,Ph).negate(),Ri.set(0,1,0).transformDirection(this.transform),this.planes[2].setFromNormalAndCoplanarPoint(Ri,Rh),this.planes[3].setFromNormalAndCoplanarPoint(Ri,Ph).negate(),Ri.set(1,0,0).transformDirection(this.transform),this.planes[4].setFromNormalAndCoplanarPoint(Ri,Rh),this.planes[5].setFromNormalAndCoplanarPoint(Ri,Ph).negate()}intersectsSphere(i){return this.clampPoint(i.center,Ri),Ri.distanceToSquared(i.center)<=i.radius*i.radius}intersectsFrustum(i){return this._intersectsPlaneShape(i.planes,i.points)}intersectsOBB(i){return this._intersectsPlaneShape(i.planes,i.points)}_intersectsPlaneShape(i,e){let t=this.points,n=this.planes;for(let r=0;r<6;r++){let s=i[r],a=-1/0;for(let o=0;o<8;o++){let l=t[o],c=s.distanceToPoint(l);a=a<c?c:a}if(a<0)return!1}for(let r=0;r<6;r++){let s=n[r],a=-1/0;for(let o=0;o<8;o++){let l=e[o],c=s.distanceToPoint(l);a=a<c?c:a}if(a<0)return!1}return!0}},zo=Math.PI,Of=zo/2,Oo=new C,as=new C,on=new C,Fe=new C,_i=new re,yw=new je,n0=new re;function vr(i,e){e.radius=Math.max(e.radius,i.distanceToSquared(e.center))}function r0(i){return i.x!==i.y}var u0=class extends Gf{constructor(i=1,e=1,t=1,n=-Of,r=Of,s=0,a=2*zo,o=0,l=0){super(i,e,t),this.latStart=n,this.latEnd=r,this.lonStart=s,this.lonEnd=a,this.heightStart=o,this.heightEnd=l}getBoundingBox(i,e){r0(this.radius)&&console.warn("EllipsoidRegion: Triaxial ellipsoids are not supported.");let{latStart:t,latEnd:n,lonStart:r,lonEnd:s,heightStart:a,heightEnd:o}=this,l=(t+n)*.5,c=(r+s)*.5,u=t>0,h=n<0,d;d=u?t:h?n:0;let{min:f,max:m}=i;f.setScalar(1/0),m.setScalar(-1/0),s-r<=zo?(this.getCartographicToNormal(l,c,on),as.set(0,0,1),Oo.crossVectors(as,on).normalize(),as.crossVectors(on,Oo).normalize(),e.makeBasis(Oo,as,on),_i.copy(e).invert(),this.getCartographicToPosition(d,r,o,Fe).applyMatrix4(_i),m.x=Math.abs(Fe.x),f.x=-m.x,this.getCartographicToPosition(n,r,o,Fe).applyMatrix4(_i),m.y=Fe.y,this.getCartographicToPosition(n,c,o,Fe).applyMatrix4(_i),m.y=Math.max(Fe.y,m.y),this.getCartographicToPosition(t,r,o,Fe).applyMatrix4(_i),f.y=Fe.y,this.getCartographicToPosition(t,c,o,Fe).applyMatrix4(_i),f.y=Math.min(Fe.y,f.y),this.getCartographicToPosition(l,c,o,Fe).applyMatrix4(_i),m.z=Fe.z,this.getCartographicToPosition(t,r,a,Fe).applyMatrix4(_i),f.z=Fe.z,this.getCartographicToPosition(n,r,a,Fe).applyMatrix4(_i),f.z=Math.min(Fe.z,f.z)):(this.getCartographicToPosition(d,c,o,on),on.z=0,on.length()<1e-10?on.set(1,0,0):on.normalize(),as.set(0,0,1),Oo.crossVectors(on,as).normalize(),e.makeBasis(Oo,as,on),_i.copy(e).invert(),this.getCartographicToPosition(d,c+Of,o,Fe).applyMatrix4(_i),m.x=Math.abs(Fe.x),f.x=-m.x,this.getCartographicToPosition(n,0,h?a:o,Fe).applyMatrix4(_i),m.y=Fe.y,this.getCartographicToPosition(t,0,u?a:o,Fe).applyMatrix4(_i),f.y=Fe.y,this.getCartographicToPosition(d,c,o,Fe).applyMatrix4(_i),m.z=Fe.z,this.getCartographicToPosition(d,s,o,Fe).applyMatrix4(_i),f.z=Fe.z),i.getCenter(Fe),i.min.sub(Fe).multiplyScalar(1.0000000000001),i.max.sub(Fe).multiplyScalar(1.0000000000001),Fe.applyMatrix4(e),e.setPosition(Fe)}getBoundingSphere(i){r0(this.radius)&&console.warn("EllipsoidRegion: Triaxial ellipsoids are not supported."),this.getBoundingBox(yw,n0),i.center.setFromMatrixPosition(n0),i.radius=0;let{latStart:e,latEnd:t,lonStart:n,lonEnd:r,heightStart:s,heightEnd:a}=this,o=(e+t)*.5,l=(n+r)*.5,c=e>0,u=t<0,h;h=c?e:u?t:0,this.getCartographicToPosition(h,n,a,Fe),vr(Fe,i),this.getCartographicToPosition(t,n,a,Fe),vr(Fe,i),this.getCartographicToPosition(t,l,a,Fe),vr(Fe,i),this.getCartographicToPosition(e,n,a,Fe),vr(Fe,i),this.getCartographicToPosition(e,l,a,Fe),vr(Fe,i),this.getCartographicToPosition(o,l,a,Fe),vr(Fe,i),this.getCartographicToPosition(e,n,s,Fe),vr(Fe,i),r-n>zo&&(this.getCartographicToPosition(h,l+zo,a,Fe),vr(Fe,i)),i.radius=Math.sqrt(i.radius)*1.0000000000001}},Yn=new C,jn=new C,Zn=new C,s0=new C,a0=new C,_w=class{constructor(){this.sphere=null,this.obb=null,this.region=null,this.regionObb=null}intersectsRay(i){let e=this.sphere,t=this.obb||this.regionObb;return!(e&&!i.intersectsSphere(e)||t&&!t.intersectsRay(i))}intersectRay(i,e=null){let t=this.sphere,n=this.obb||this.regionObb,r=-1/0,s=-1/0;t&&i.intersectSphere(t,s0)&&(r=t.containsPoint(i.origin)?0:i.origin.distanceToSquared(s0)),n&&n.intersectRay(i,a0)&&(s=n.containsPoint(i.origin)?0:i.origin.distanceToSquared(a0));let a=Math.max(r,s);return a===-1/0?null:(i.at(Math.sqrt(a),e),e)}distanceToPoint(i){let e=this.sphere,t=this.obb||this.regionObb,n=-1/0,r=-1/0;return e&&(n=Math.max(e.distanceToPoint(i),0)),t&&(r=t.distanceToPoint(i)),n>r?n:r}intersectsFrustum(i){let e=this.obb||this.regionObb,t=this.sphere;return t&&!i.intersectsSphere(t)||e&&!e.intersectsFrustum(i)?!1:!!(t||e)}intersectsSphere(i){let e=this.obb||this.regionObb,t=this.sphere;return t&&!t.intersectsSphere(i)||e&&!e.intersectsSphere(i)?!1:!!(t||e)}intersectsOBB(i){let e=this.obb||this.regionObb,t=this.sphere;return t&&!i.intersectsSphere(t)||e&&!e.intersectsOBB(i)?!1:!!(t||e)}getOBB(i,e){let t=this.obb||this.regionObb;t?(i.copy(t.box),e.copy(t.transform)):(this.getAABB(i),e.identity())}getAABB(i){if(this.sphere)this.sphere.getBoundingBox(i);else{let e=this.obb||this.regionObb;i.copy(e.box).applyMatrix4(e.transform)}}getSphere(i){if(this.sphere)i.copy(this.sphere);else if(this.region)this.region.getBoundingSphere(i);else{let e=this.obb||this.regionObb;e.box.getBoundingSphere(i),i.applyMatrix4(e.transform)}}setObbData(i,e){let t=new zf;Yn.set(i[3],i[4],i[5]),jn.set(i[6],i[7],i[8]),Zn.set(i[9],i[10],i[11]);let n=Yn.length(),r=jn.length(),s=Zn.length();Yn.normalize(),jn.normalize(),Zn.normalize(),n===0&&Yn.crossVectors(jn,Zn),r===0&&jn.crossVectors(Yn,Zn),s===0&&Zn.crossVectors(Yn,jn),t.transform.set(Yn.x,jn.x,Zn.x,i[0],Yn.y,jn.y,Zn.y,i[1],Yn.z,jn.z,Zn.z,i[2],0,0,0,1).premultiply(e),t.box.min.set(-n,-r,-s),t.box.max.set(n,r,s),t.update(),this.obb=t}setSphereData(i,e,t,n,r){let s=new xt;s.center.set(i,e,t),s.radius=n,s.applyMatrix4(r),this.sphere=s}setRegionData(i,e,t,n,r,s,a){let o=new u0(...i.radius,t,r,e,n,s,a),l=new zf;o.getBoundingBox(l.box,l.transform),l.update(),this.region=o,this.regionObb=l}},xw=new Le;function vw(i,e,t,n){let r=xw.set(i.normal.x,i.normal.y,i.normal.z,e.normal.x,e.normal.y,e.normal.z,t.normal.x,t.normal.y,t.normal.z);return n.set(-i.constant,-e.constant,-t.constant),n.applyMatrix3(r.invert()),n}var bw=class extends en{constructor(){super(),this.points=Array(8).fill().map(()=>new C)}setFromProjectionMatrix(...i){return super.setFromProjectionMatrix(...i),this.calculateFrustumPoints(),this}calculateFrustumPoints(){let{planes:i,points:e}=this;[[i[0],i[3],i[4]],[i[1],i[3],i[4]],[i[0],i[2],i[4]],[i[1],i[2],i[4]],[i[0],i[3],i[5]],[i[1],i[3],i[5]],[i[0],i[2],i[5]],[i[1],i[2],i[5]]].forEach((t,n)=>{vw(t[0],t[1],t[2],e[n])})}};var kf=0;function o0(i,e,t,n){try{return ks.getByteLength(i,e,t,n)}catch{return kf}}function Sw(i){if(!i)return 0;if(i.isExternalTexture)return i.userData?.byteLength??kf;let{format:e,type:t,image:n,mipmaps:r}=i;if(i.isCompressedTexture&&Array.isArray(r)&&r.length>0){let a=0;for(let o of r)o?.data?.byteLength?a+=o.data.byteLength:a+=o0(o.width,o.height,e,t);return a}if(!n)return kf;let s=o0(n.width,n.height,e,t);return s*=i.generateMipmaps?4/3:1,s}function Tw(i){let e=new Set,t=0;return i.traverse(n=>{if(n.geometry&&!e.has(n.geometry)&&(t+=Hy(n.geometry),e.add(n.geometry)),n.material){let r=n.material;for(let s in r){let a=r[s];a&&a.isTexture&&!e.has(a)&&(t+=Sw(a),e.add(a))}}}),t}var d0=Symbol("INITIAL_FRUSTUM_CULLED"),Lh=new re,Bo=new C,Bf=new de,Mw=new C(1,0,0),ww=new C(0,1,0),Ew=()=>null;function l0(i,e){i.traverse(t=>{t.frustumCulled=t[d0]&&e})}var Xf=class extends Fy{get autoDisableRendererCulling(){return this._autoDisableRendererCulling}set autoDisableRendererCulling(i){this._autoDisableRendererCulling!==i&&(super._autoDisableRendererCulling=i,this.forEachLoadedModel(e=>{l0(e,!i)}))}constructor(...i){super(...i),this.accelerateRaycast=!0,this.group=new fw(this),this.ellipsoid=ko.clone(),this.surface=this.ellipsoid,this.cameras=[],this.cameraMap=new Map,this.cameraInfo=[],this._upRotationMatrix=new re,this._bytesUsed=new WeakMap,this._autoDisableRendererCulling=!0,this.manager=new Os,this._listeners={}}addEventListener(i,e){ui.prototype.addEventListener.call(this,i,e)}hasEventListener(i,e){return ui.prototype.hasEventListener.call(this,i,e)}removeEventListener(i,e){ui.prototype.removeEventListener.call(this,i,e)}dispatchEvent(i){ui.prototype.dispatchEvent.call(this,i)}getBoundingBox(i){if(!this.root)return!1;let e=this.root.engineData.boundingVolume;return e?(e.getAABB(i),!0):!1}getOrientedBoundingBox(i,e){if(!this.root)return!1;let t=this.root.engineData.boundingVolume;return t?(t.getOBB(i,e),!0):!1}getBoundingSphere(i){if(!this.root)return!1;let e=this.root.engineData.boundingVolume;return e?(e.getSphere(i),!0):!1}forEachLoadedModel(i){this.traverse(e=>{let t=e.engineData&&e.engineData.scene;t&&i(t,e)},null,!1)}raycast(i,e){if(this.root)if(this.accelerateRaycast)h0(this,this.root,i,e);else{let t=i.firstHitOnly?[]:e;for(let n of this.activeTiles){let{scene:r}=n.engineData;this.invokeOnePlugin(s=>s.raycastTile&&s.raycastTile(n,r,i,t))||i.intersectObject(r,!0,t)}i.firstHitOnly&&t.length>0&&(t.sort((n,r)=>n.distance-r.distance),e.push(t[0]))}}hasCamera(i){return this.cameraMap.has(i)}setCamera(i){let e=this.cameras,t=this.cameraMap;return!t.has(i)&&(t.set(i,new de),e.push(i),this.dispatchEvent({type:"add-camera",camera:i}),!0)}setResolution(i,e,t){let n=this.cameraMap;if(!n.has(i))return!1;let r=e.isVector2?e.x:e,s=e.isVector2?e.y:t,a=n.get(i);return(a.width!==r||a.height!==s)&&(a.set(r,s),this.dispatchEvent({type:"camera-resolution-change"})),!0}getResolution(i,e){let t=this.cameraMap.get(i);return t?e.copy(t):null}setResolutionFromRenderer(i,e){return e.getSize(Bf),this.setResolution(i,Bf.x,Bf.y)}deleteCamera(i){let e=this.cameras,t=this.cameraMap;if(t.has(i)){let n=e.indexOf(i);return e.splice(n,1),t.delete(i),this.dispatchEvent({type:"delete-camera",camera:i}),!0}return!1}loadRootTileset(...i){return super.loadRootTileset(...i).then(e=>{let{asset:t,extensions:n={}}=e;switch((t&&t.gltfUpAxis||"y").toLowerCase()){case"x":this._upRotationMatrix.makeRotationAxis(ww,-Math.PI/2);break;case"y":this._upRotationMatrix.makeRotationAxis(Mw,Math.PI/2)}if("3DTILES_ellipsoid"in n){let r=n["3DTILES_ellipsoid"],{ellipsoid:s}=this;s.name=r.body,r.radii?s.radius.set(...r.radii):s.radius.set(1,1,1)}return e})}prepareForTraversal(){let i=this.group,e=this.cameras,t=this.cameraMap,n=this.cameraInfo;for(;n.length>e.length;)n.pop();for(;n.length<e.length;)n.push({frustum:new bw,isOrthographic:!1,sseDenominator:-1,position:new C,invScale:-1,pixelSize:0});Bo.setFromMatrixScale(i.matrixWorldInverse),Math.abs(Math.max(Bo.x-Bo.y,Bo.x-Bo.z))>1e-6&&console.warn("ThreeTilesRenderer : Non uniform scale used for tile which may cause issues when calculating screen space error.");for(let r=0,s=n.length;r<s;r++){let a=e[r],o=n[r],l=o.frustum,c=o.position,u=t.get(a);(u.width===0||u.height===0)&&console.warn("TilesRenderer: resolution for camera error calculation is not set.");let h=a.projectionMatrix.elements;if(o.isOrthographic=h[15]===1,o.isOrthographic){let d=2/h[0],f=2/h[5];o.pixelSize=Math.max(f/u.height,d/u.width)}else o.sseDenominator=2/h[5]/u.height;Lh.copy(i.matrixWorld),Lh.premultiply(a.matrixWorldInverse),Lh.premultiply(a.projectionMatrix),l.setFromProjectionMatrix(Lh,a.coordinateSystem,a.reversedDepth),c.set(0,0,0),c.applyMatrix4(a.matrixWorld),c.applyMatrix4(i.matrixWorldInverse)}}update(){if(super.update(),this.cameras.length===0&&this.root){let i=!1;this.invokeAllPlugins(e=>i||(i=!!(e!==this&&e.calculateTileViewError))),i===!1&&console.warn("TilesRenderer: no cameras defined. Cannot update 3d tiles.")}}preprocessNode(i,e,t=null){super.preprocessNode(i,e,t);let n=new re;if(i.transform){let a=i.transform;for(let o=0;o<16;o++)n.elements[o]=a[o]}t&&n.premultiply(t.engineData.transform);let r=new re().copy(n).invert(),s=new _w;"sphere"in i.boundingVolume&&s.setSphereData(...i.boundingVolume.sphere,n),"box"in i.boundingVolume&&s.setObbData(i.boundingVolume.box,n),"region"in i.boundingVolume&&s.setRegionData(this.ellipsoid,...i.boundingVolume.region),i.engineData.transform=n,i.engineData.transformInverse=r,i.engineData.boundingVolume=s,i.engineData.geometry=null,i.engineData.materials=null,i.engineData.textures=null,i.toJSON=Ew}async parseTile(i,e,t,n,r){let s=e.engineData,a=Sh(n),o=this.fetchOptions,l=this.manager,c=null,u=s.transform,h=this._upRotationMatrix,d=(gr(i)||t).toLowerCase();switch(d){case"b3dm":{let _=new Vf(l);_.workingPath=a,_.fetchOptions=o,_.adjustmentTransform.copy(h),c=_.parse(i);break}case"pnts":{let _=new Hf(l);_.workingPath=a,_.fetchOptions=o,c=_.parse(i);break}case"i3dm":{let _=new Wf(l);_.workingPath=a,_.fetchOptions=o,_.adjustmentTransform.copy(h),_.ellipsoid.copy(this.ellipsoid),c=_.parse(i);break}case"cmpt":{let _=new c0(l);_.workingPath=a,_.fetchOptions=o,_.adjustmentTransform.copy(h),_.ellipsoid.copy(this.ellipsoid),c=_.parse(i).then(x=>x.scene);break}case"gltf":case"glb":{let _=l.getHandler("path.gltf")||l.getHandler("path.glb")||new _r(l);_.setWithCredentials(o.credentials==="include"),_.setRequestHeader(o.headers||{}),o.credentials==="include"&&o.mode==="cors"&&_.setCrossOrigin("use-credentials");let x=_.resourcePath||_.path||a;!/[\\/]$/.test(x)&&x.length&&(x+="/"),c=_.parseAsync(i,x).then(S=>{S.scene=S.scene||new Qt;let{scene:M}=S;return M.updateMatrix(),M.matrix.multiply(h).decompose(M.position,M.quaternion,M.scale),S});break}default:c=this.invokeOnePlugin(_=>_.parseToMesh&&_.parseToMesh(i,e,t,n,r))}let f=await c;if(f===null)throw Error(`TilesRenderer: Content type "${d}" not supported.`);let m,y;f.isObject3D?(m=f,y=null):(m=f.scene,y=f),m.updateMatrix(),m.matrix.premultiply(u),m.matrix.decompose(m.position,m.quaternion,m.scale),await this.invokeAllPlugins(_=>_.processTileModel&&_.processTileModel(m,e)),m.traverse(_=>{_[d0]=_.frustumCulled,_.userData.tile=e}),l0(m,!this.autoDisableRendererCulling);let g=[],p=[],v=[];if(m.traverse(_=>{if(_.geometry&&p.push(_.geometry),_.material){let x=_.material;g.push(_.material);for(let S in x){let M=x[S];M&&M.isTexture&&v.push(M)}}}),r.aborted)for(let _=0,x=v.length;_<x;_++){let S=v[_];S.image instanceof ImageBitmap&&S.image.close(),S.dispose()}else s.materials=g,s.geometry=p,s.textures=v,s.scene=m,s.metadata=y}disposeTile(i){super.disposeTile(i);let e=i.engineData;if(e.scene){let t=e.materials,n=e.geometry,r=e.textures,s=e.scene.parent;e.scene.traverse(a=>{a.userData.meshFeatures&&a.userData.meshFeatures.dispose(),a.userData.structuralMetadata&&a.userData.structuralMetadata.dispose()});for(let a=0,o=n.length;a<o;a++)n[a].dispose();for(let a=0,o=t.length;a<o;a++)t[a].dispose();for(let a=0,o=r.length;a<o;a++){let l=r[a];l.image instanceof ImageBitmap&&l.image.close(),l.dispose()}s&&s.remove(e.scene),e.scene=null,e.materials=null,e.textures=null,e.geometry=null,e.metadata=null}}setTileActive(i,e){super.setTileActive(i,e);let t=i.engineData.scene;t&&(e?(t.parent=this.group,t.updateMatrixWorld(!0)):this.visibleTiles.has(i)||(t.parent=null))}setTileVisible(i,e){let t=i.engineData.scene,{activeTiles:n,group:r}=this;t&&(e?r.add(t):(r.remove(t),n.has(i)&&(t.parent=r))),super.setTileVisible(i,e)}calculateBytesUsed(i,e){let t=this._bytesUsed;return!t.has(i)&&e&&t.set(i,Tw(e)),t.get(i)??null}calculateTileViewError(i,e){let t=i.engineData,n=this.cameras,r=this.cameraInfo,s=t.boundingVolume,a=!1,o=0,l=1/0,c=0,u=1/0;for(let h=0,d=n.length;h<d;h++){let f=r[h],m,y;if(f.isOrthographic){let p=f.pixelSize;m=i.geometricError/p,y=1/0}else{let p=f.sseDenominator;y=s.distanceToPoint(f.position),m=y===0?1/0:i.geometricError/(y*p)}let g=r[h].frustum;s.intersectsFrustum(g)&&(a=!0,o=Math.max(o,m),l=Math.min(l,y)),c=Math.max(c,m),u=Math.min(u,y)}a?(e.inView=!0,e.error=o,e.distanceFromCamera=l):(e.inView=!1,e.error=c,e.distanceFromCamera=u)}dispose(){super.dispose(),this.group.removeFromParent()}};var f0="https://tile.googleapis.com/v1/createSession",m0=class{get isMapTilesSession(){return this.authURL===f0}constructor(i={}){let{apiToken:e,sessionOptions:t=null,autoRefreshToken:n=!1}=i;this.apiToken=e,this.autoRefreshToken=n,this.authURL=f0,this.sessionToken=null,this.sessionOptions=t,this._tokenRefreshPromise=null,this._authHostname=null}async fetch(i,e){this.sessionToken===null&&this.isMapTilesSession&&this.refreshToken(e),await this._tokenRefreshPromise,this._authHostname===null&&(this._authHostname=new URL(this.authURL).host);let t=new URL(i),n=t.host===this._authHostname;n&&(t.searchParams.set("key",this.apiToken),this.sessionToken&&t.searchParams.set("session",this.sessionToken));let r=await fetch(t,e);return n&&r.status>=400&&r.status<=499&&this.autoRefreshToken&&(await this.refreshToken(e),this.sessionToken&&t.searchParams.set("session",this.sessionToken),r=await fetch(t,e)),this.sessionToken===null&&!this.isMapTilesSession?r.json().then(s=>(this.sessionToken=p0(s),s)):r}refreshToken(i){if(this._tokenRefreshPromise===null){let e=new URL(this.authURL);e.searchParams.set("key",this.apiToken);let t={...i};this.isMapTilesSession&&(t.method="POST",t.body=JSON.stringify(this.sessionOptions),t.headers=t.headers||{},t.headers={...t.headers,"Content-Type":"application/json"}),this._tokenRefreshPromise=fetch(e,t).then(n=>{if(!n.ok)throw Error(`GoogleCloudAuth: Failed to load data with error code ${n.status}`);return n.json()}).then(n=>(this.sessionToken=p0(n),this._tokenRefreshPromise=null,n))}return this._tokenRefreshPromise}};function p0(i){if("session"in i)return i.session;{let e=null,t=i.root;return Jd(t,n=>{if(n.content&&n.content.uri){let[,r]=n.content.uri.split("?");return e=new URLSearchParams(r).get("session"),!0}return!1}),e}}var Aw=class{constructor(){this.creditsCount={}}_adjustAttributions(i,e){let t=this.creditsCount,n=i.split(/;/g);for(let r=0,s=n.length;r<s;r++){let a=n[r];a in t||(t[a]=0),t[a]+=e?1:-1,t[a]<=0&&delete t[a]}}addAttributions(i){this._adjustAttributions(i,!0)}removeAttributions(i){this._adjustAttributions(i,!1)}toString(){return Object.entries(this.creditsCount).sort((i,e)=>{let t=i[1];return e[1]-t}).map(i=>i[0]).join("; ")}},Cw="https://tile.googleapis.com/v1/3dtiles/root.json",qf=class{constructor({apiToken:i,sessionOptions:e=null,autoRefreshToken:t=!1,logoUrl:n=null,useRecommendedSettings:r=!0}){this.name="GOOGLE_CLOUD_AUTH_PLUGIN",this.apiToken=i,this.useRecommendedSettings=r,this.logoUrl=n,this.auth=new m0({apiToken:i,autoRefreshToken:t,sessionOptions:e}),this.tiles=null,this._visibilityChangeCallback=null,this._attributionsManager=new Aw,this._logoAttribution={value:"",type:"image",collapsible:!1},this._attribution={value:"",type:"string",collapsible:!0}}init(i){let{useRecommendedSettings:e,auth:t}=this;i.resetFailedTiles(),i.rootURL??(i.rootURL=Cw),t.sessionOptions||(t.authURL=i.rootURL),e&&!t.isMapTilesSession&&(i.errorTarget=20),this.tiles=i,this._visibilityChangeCallback=({tile:n,visible:r})=>{let s=n.engineData.metadata?.asset?.copyright||"";r?this._attributionsManager.addAttributions(s):this._attributionsManager.removeAttributions(s)},i.addEventListener("tile-visibility-change",this._visibilityChangeCallback)}getAttributions(i){this.tiles.visibleTiles.size>0&&(this.logoUrl&&(this._logoAttribution.value=this.logoUrl,i.push(this._logoAttribution)),this._attribution.value=this._attributionsManager.toString(),i.push(this._attribution))}dispose(){this.tiles.removeEventListener("tile-visibility-change",this._visibilityChangeCallback)}async fetchData(i,e){return this.auth.fetch(i,e)}};var Rw=new bn(-1,1,1,-1,0,1),Yf=class extends dt{constructor(){super(),this.setAttribute("position",new ei([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ei([0,2,0,0,2,0],2))}},Pw=new Yf,Vo=class{constructor(e){this._mesh=new ct(Pw,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Rw)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var g0=1.340264,y0=-.081106,_0=893e-6,x0=.003796,v0=Math.sqrt(3)/2;function U0(i,e,t){let n=Math.asin(v0*Math.sin(e)),r=n*n,s=r*r*r;return t[0]=i*Math.cos(n)/(v0*(g0+3*y0*r+s*(7*_0+9*x0*r))),t[1]=n*(g0+y0*r+s*(_0+x0*r)),t}var ML=U0(Math.PI,0,[0,0])[0],wL=U0(0,Math.PI/2,[0,0])[1];var EL=Object.freeze({fill:"#cccccc",stroke:"transparent",strokeWidth:1,radius:2,order:0,visible:!0});var b0=new ma;b0.maxJobs=10,b0.priorityCallback=(i,e)=>{let t=i.tile,n=e.tile,r=t.internal.renderer,s=n.internal.renderer,a=r.visibleTiles.has(t);return a===s.visibleTiles.has(n)?Lo(t,n):a?1:-1};function Gt(i,e,t){return i&&e in i?i[e]:t}function N0(i){return i!=="BOOLEAN"&&i!=="STRING"&&i!=="ENUM"}function Iw(i){return/^FLOAT/.test(i)}function Xo(i){return/^VEC/.test(i)}function qo(i){return/^MAT/.test(i)}function F0(i,e,t,n=null){return qo(t)||Xo(t)?n.fromArray(i,e):i[e]}function jf(i){let{type:e,componentType:t}=i;switch(e){case"SCALAR":return t==="INT64"?0n:0;case"VEC2":return new de;case"VEC3":return new C;case"VEC4":return new Qe;case"MAT2":return new ao;case"MAT3":return new Le;case"MAT4":return new re;case"BOOLEAN":return!1;case"STRING":return"";case"ENUM":return 0}}function S0(i,e){if(e==null)return!1;switch(i){case"SCALAR":return typeof e=="number"||typeof e=="bigint";case"VEC2":return e.isVector2;case"VEC3":return e.isVector3;case"VEC4":return e.isVector4;case"MAT2":return e.isMatrix2;case"MAT3":return e.isMatrix3;case"MAT4":return e.isMatrix4;case"BOOLEAN":return typeof e=="boolean";case"STRING":return typeof e=="string";case"ENUM":return typeof e=="number"||typeof e=="bigint"}throw Error("ClassProperty: invalid type.")}function Wo(i,e=null){switch(i){case"INT8":return Int8Array;case"INT16":return Int16Array;case"INT32":return Int32Array;case"INT64":return BigInt64Array;case"UINT8":return Uint8Array;case"UINT16":return Uint16Array;case"UINT32":return Uint32Array;case"UINT64":return BigUint64Array;case"FLOAT32":return Float32Array;case"FLOAT64":return Float64Array}switch(e){case"BOOLEAN":return Uint8Array;case"STRING":return Uint8Array}throw Error("ClassProperty: invalid type.")}function Lw(i,e=null){if(i.array){e=e&&Array.isArray(e)?e:[],e.length=i.count;for(let t=0,n=e.length;t<n;t++)e[t]=Uh(i,e[t])}else e=Uh(i,e);return e}function Uh(i,e=null){let t=i.default,n=i.type;if(e||(e=jf(i)),t===null){switch(n){case"SCALAR":return 0;case"VEC2":return e.set(0,0);case"VEC3":return e.set(0,0,0);case"VEC4":return e.set(0,0,0,0);case"MAT2":return e.identity();case"MAT3":return e.identity();case"MAT4":return e.identity();case"BOOLEAN":return!1;case"STRING":return"";case"ENUM":return""}throw Error("ClassProperty: invalid type.")}if(qo(n))e.fromArray(t);else if(Xo(n))e.fromArray(t);else return t}function Dw(i,e){if(i.noData===null)return e;let t=i.noData,n=i.type;if(Array.isArray(e))for(let a=0,o=e.length;a<o;a++)e[a]=r(e[a]);else e=r(e);return e;function r(a){return s(a)&&(a=Uh(i,a)),a}function s(a){if(qo(n)){let o=a.elements;for(let l=0,c=t.length;l<c;l++)if(t[l]!==o[l])return!1;return!0}if(Xo(n)){for(let o=0,l=t.length;o<l;o++)if(t[o]!==a.getComponent(o))return!1;return!0}return t===a}}function Uw(i,e){switch(i){case"INT8":return Math.max(e/127,-1);case"INT16":return Math.max(e,32767,-1);case"INT32":return Math.max(e/2147483647,-1);case"INT64":return Math.max(Number(e)/9223372036854776e3,-1);case"UINT8":return e/255;case"UINT16":return e/65535;case"UINT32":return e/4294967295;case"UINT64":return Number(e)/18446744073709552e3}}function Nw(i,e){let{type:t,componentType:n,scale:r,offset:s,normalized:a}=i;if(Array.isArray(e))for(let h=0,d=e.length;h<d;h++)e[h]=o(e[h]);else e=o(e);return e;function o(h){return h=qo(t)?c(h):Xo(t)?l(h):u(h),h}function l(h){return h.x=u(h.x),h.y=u(h.y),"z"in h&&(h.z=u(h.z)),"w"in h&&(h.w=u(h.w)),h}function c(h){let d=h.elements;for(let f=0,m=d.length;f<m;f++)d[f]=u(d[f]);return h}function u(h){return a&&(h=Uw(n,h)),(a||Iw(n))&&(h=h*r+s),h}}function $f(i,e,t=null){if(i.array){Array.isArray(e)||(e=Array(i.count||0)),e.length=t===null?i.count:t;for(let n=0,r=e.length;n<r;n++)S0(i.type,e[n])||(e[n]=jf(i))}else S0(i.type,e)||(e=jf(i));return e}function Nh(i,e){for(let t in e)t in i||delete e[t];for(let t in i){let n=i[t];e[t]=$f(n,e[t])}}function Fw(i){switch(i){case"ENUM":return 1;case"SCALAR":return 1;case"VEC2":return 2;case"VEC3":return 3;case"VEC4":return 4;case"MAT2":return 4;case"MAT3":return 9;case"MAT4":return 16;case"BOOLEAN":return-1;case"STRING":return-1;default:return-1}}var Oh=class{constructor(i,e,t=null){this.name=e.name||null,this.description=e.description||null,this.type=e.type,this.componentType=e.componentType||null,this.enumType=e.enumType||null,this.array=e.array||!1,this.count=e.count||0,this.normalized=e.normalized||!1,this.offset=e.offset||0,this.scale=Gt(e,"scale",1),this.max=Gt(e,"max",1/0),this.min=Gt(e,"min",-1/0),this.required=e.required||!1,this.noData=Gt(e,"noData",null),this.default=Gt(e,"default",null),this.semantic=Gt(e,"semantic",null),this.enumSet=null,this.accessorProperty=t,t&&(this.offset=Gt(t,"offset",this.offset),this.scale=Gt(t,"scale",this.scale),this.max=Gt(t,"max",this.max),this.min=Gt(t,"min",this.min)),e.type==="ENUM"&&(this.enumSet=i[this.enumType],this.componentType===null&&(this.componentType=Gt(this.enumSet,"valueType","UINT16")))}shapeToProperty(i,e=null){return $f(this,i,e)}resolveDefaultElement(i){return Uh(this,i)}resolveDefault(i){return Lw(this,i)}resolveNoData(i){return Dw(this,i)}resolveEnumsToStrings(i){let e=this.enumSet;if(this.type==="ENUM")if(Array.isArray(i))for(let n=0,r=i.length;n<r;n++)i[n]=t(i[n]);else i=t(i);return i;function t(n){let r=e.values.find(s=>s.value===n);return r===null?"":r.name}}adjustValueScaleOffset(i){return N0(this.type)?Nw(this,i):i}},Kf=class{constructor(i,e={},t={},n=null){this.definition=i,this.class=e[i.class],this.className=i.class,this.enums=t,this.data=n,this.name="name"in i?i.name:null,this.properties=null}getPropertyNames(){return Object.keys(this.class.properties)}includesData(i){return!!this.definition.properties[i]}dispose(){}_initProperties(i=Oh){let e={};for(let t in this.class.properties)e[t]=new i(this.enums,this.class.properties[t],this.definition.properties[t]);this.properties=e}},Ow=class extends Oh{constructor(i,e,t=null){super(i,e,t),this.attribute=t?.attribute??null}},Bw=class extends Kf{constructor(...i){super(...i),this.isPropertyAttributeAccessor=!0,this._initProperties(Ow)}getData(i,e,t={}){let n=this.properties;Nh(n,t);for(let r in n)t[r]=this.getPropertyValue(r,i,e,t[r]);return t}getPropertyValue(i,e,t,n=null){if(e>=this.count)throw Error("PropertyAttributeAccessor: Requested index is outside the range of the buffer.");let r=this.properties[i],s=r.type;if(!r)throw Error("PropertyAttributeAccessor: Requested class property does not exist.");if(!this.definition.properties[i])return r.resolveDefault(n);n=r.shapeToProperty(n);let a=t.getAttribute(r.attribute.toLowerCase());if(qo(s)){let o=n.elements;for(let l=o.length;0<l;)o[0]=a.getComponent(e,0)}else if(Xo(s))n.fromBufferAttribute(a,e);else if(s==="SCALAR"||s==="ENUM")n=a.getX(e);else throw Error("StructuredMetadata.PropertyAttributeAccessor: BOOLEAN and STRING types are not supported by property attributes.");return n=r.adjustValueScaleOffset(n),n=r.resolveEnumsToStrings(n),n=r.resolveNoData(n),n}},zw=class extends Oh{constructor(i,e,t=null){super(i,e,t),this.values=t?.values??null,this.valueLength=Fw(this.type),this.arrayOffsets=Gt(t,"arrayOffsets",null),this.stringOffsets=Gt(t,"stringOffsets",null),this.arrayOffsetType=Gt(t,"arrayOffsetType","UINT32"),this.stringOffsetType=Gt(t,"stringOffsetType","UINT32")}getArrayLengthFromId(i,e){let t=this.count;if(this.arrayOffsets!==null){let{arrayOffsets:n,arrayOffsetType:r}=this,s=new(Wo(r))(i[n]);t=s[e+1]-s[e]}return t}getIndexOffsetFromId(i,e){let t=e;if(this.arrayOffsets){let{arrayOffsets:n,arrayOffsetType:r}=this;t=new(Wo(r))(i[n])[t]}else this.array&&(t*=this.count);return t}},kw=class extends Kf{constructor(...i){super(...i),this.isPropertyTableAccessor=!0,this.count=this.definition.count,this._initProperties(zw)}getData(i,e={}){let t=this.properties;Nh(t,e);for(let n in t)e[n]=this.getPropertyValue(n,i,e[n]);return e}_readValueAtIndex(i,e,t,n=null){let r=this.properties[i],{componentType:s,type:a}=r,o=this.data,l=o[r.values],c=new(Wo(s,a))(l),u=r.getIndexOffsetFromId(o,e);if(N0(a)||a==="ENUM")return F0(c,(u+t)*r.valueLength,a,n);if(a==="STRING"){let h=u+t,d=0;if(r.stringOffsets!==null){let{stringOffsets:m,stringOffsetType:y}=r,g=new(Wo(y))(o[m]);d=g[h+1]-g[h],h=g[h]}let f=new Uint8Array(c.buffer,h,d);n=new TextDecoder().decode(f)}else if(a==="BOOLEAN"){let h=u+t,d=Math.floor(h/8),f=h%8;n=(c[d]>>f&1)==1}return n}getPropertyValue(i,e,t=null){if(e>=this.count)throw Error("PropertyTableAccessor: Requested index is outside the range of the table.");let n=this.properties[i];if(!n)throw Error("PropertyTableAccessor: Requested property does not exist.");if(!this.definition.properties[i])return n.resolveDefault(t);let r=n.array,s=this.data,a=n.getArrayLengthFromId(s,e);if(t=n.shapeToProperty(t,a),r)for(let o=0,l=t.length;o<l;o++)t[o]=this._readValueAtIndex(i,e,o,t[o]);else t=this._readValueAtIndex(i,e,0,t);return t=n.adjustValueScaleOffset(t),t=n.resolveEnumsToStrings(t),t=n.resolveNoData(t),t}},Ho=new oo,T0=class{constructor(){this._renderer=new $s,this._target=new Ui(1,1),this._texTarget=new Ui,this._quad=new Vo(new Mi({blending:Xl,blendDst:ql,blendSrc:Yl,uniforms:{map:{value:null},pixel:{value:new de}},vertexShader:`
				void main() {

					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`,fragmentShader:`
				uniform sampler2D map;
				uniform ivec2 pixel;

				void main() {

					gl_FragColor = texelFetch( map, pixel, 0 );

				}
			`}))}increaseSizeTo(i){this._target.setSize(Math.max(this._target.width,i),1)}readDataAsync(i){let{_renderer:e,_target:t}=this;return e.readRenderTargetPixelsAsync(t,0,0,i.length/4,1,i)}readData(i){let{_renderer:e,_target:t}=this;e.readRenderTargetPixels(t,0,0,i.length/4,1,i)}renderPixelToTarget(i,e,t){let{_renderer:n,_target:r}=this;Ho.min.copy(e),Ho.max.copy(e),Ho.max.x+=1,Ho.max.y+=1,n.initRenderTarget(r),n.copyTextureToTexture(i,r.texture,Ho,t,0)}},Sr=new class{constructor(){let i=null;Object.getOwnPropertyNames(T0.prototype).forEach(e=>{e!=="constructor"&&(this[e]=(...t)=>(i||(i=new T0),i[e](...t)))})}},M0=new de,w0=new de,E0=new de;function Vw(i,e){return e===0?i.getAttribute("uv"):i.getAttribute(`uv${e}`)}function O0(i,e,t=[,,,]){let n=3*e,r=3*e+1,s=3*e+2;return i.index&&(n=i.index.getX(n),r=i.index.getX(r),s=i.index.getX(s)),t[0]=n,t[1]=r,t[2]=s,t}function B0(i,e,t,n,r){let[s,a,o]=n,l=Vw(i,e);M0.fromBufferAttribute(l,s),w0.fromBufferAttribute(l,a),E0.fromBufferAttribute(l,o),r.set(0,0,0).addScaledVector(M0,t.x).addScaledVector(w0,t.y).addScaledVector(E0,t.z)}function z0(i,e,t,n){let r=i.x-Math.floor(i.x),s=i.y-Math.floor(i.y),a=Math.floor(r*e%e),o=Math.floor(s*t%t);return n.set(a,o),n}var A0=new de,C0=new de,R0=new de,Hw=class extends Oh{constructor(i,e,t=null){super(i,e,t),this.channels=Gt(t,"channels",[0]),this.index=Gt(t,"index",null),this.texCoord=Gt(t,"texCoord",null),this.valueLength=parseInt(this.type.replace(/[^0-9]/g,""))||1}readDataFromBuffer(i,e,t=null){let n=this.type;if(n==="BOOLEAN"||n==="STRING")throw Error("PropertyTextureAccessor: BOOLEAN and STRING types not supported.");return F0(i,e*this.valueLength,n,t)}},Gw=class extends Kf{constructor(...i){super(...i),this.isPropertyTextureAccessor=!0,this._asyncRead=!1,this._initProperties(Hw)}getData(i,e,t,n={}){let r=this.properties;Nh(r,n);let s=Object.keys(r),a=s.map(o=>n[o]);return this.getPropertyValuesAtTexel(s,i,e,t,a),s.forEach((o,l)=>n[o]=a[l]),n}async getDataAsync(i,e,t,n={}){let r=this.properties;Nh(r,n);let s=Object.keys(r),a=s.map(o=>n[o]);return await this.getPropertyValuesAtTexelAsync(s,i,e,t,a),s.forEach((o,l)=>n[o]=a[l]),n}getPropertyValuesAtTexelAsync(...i){this._asyncRead=!0;let e=this.getPropertyValuesAtTexel(...i);return this._asyncRead=!1,e}getPropertyValuesAtTexel(i,e,t,n,r=[]){for(;r.length<i.length;)r.push(null);r.length=i.length,Sr.increaseSizeTo(r.length);let s=this.data,a=this.definition.properties,o=this.properties,l=O0(n,e);for(let h=0,d=i.length;h<d;h++){let f=i[h];if(!a[f])continue;let m=o[f],y=s[m.index];B0(n,m.texCoord,t,l,A0),z0(A0,y.image.width,y.image.height,C0),R0.set(h,0),Sr.renderPixelToTarget(y,C0,R0)}let c=new Uint8Array(i.length*4);return this._asyncRead?Sr.readDataAsync(c).then(()=>(u.call(this),r)):(Sr.readData(c),u.call(this),r);function u(){for(let h=0,d=i.length;h<d;h++){let f=i[h],m=o[f],y=m.type;if(r[h]=$f(m,r[h]),!m)throw Error("PropertyTextureAccessor: Requested property does not exist.");if(!a[f]){r[h]=m.resolveDefault(r);continue}let g=m.valueLength*(m.count||1),p=m.channels.map(x=>c[4*h+x]),v=m.componentType,_=new(Wo(v,y))(g);if(new Uint8Array(_.buffer).set(p),m.array){let x=r[h];for(let S=0,M=x.length;S<M;S++)x[S]=m.readDataFromBuffer(_,S,x[S])}else r[h]=m.readDataFromBuffer(_,0,r[h]);r[h]=m.adjustValueScaleOffset(r[h]),r[h]=m.resolveEnumsToStrings(r[h]),r[h]=m.resolveNoData(r[h])}}}dispose(){this.data.forEach(i=>{i&&(i.dispose(),i.image instanceof ImageBitmap&&i.image.close())})}},Zf=class{constructor(i,e,t,n=null,r=null){let{schema:s,propertyTables:a=[],propertyTextures:o=[],propertyAttributes:l=[]}=i,{enums:c,classes:u}=s,h=a.map(m=>new kw(m,u,c,t)),d=[],f=[];n&&(n.propertyTextures&&(d=n.propertyTextures.map(m=>new Gw(o[m],u,c,e))),n.propertyAttributes&&(f=n.propertyAttributes.map(m=>new Bw(l[m],u,c)))),this.schema=s,this.tableAccessors=h,this.textureAccessors=d,this.attributeAccessors=f,this.object=r,this.textures=e,this.nodeMetadata=n}getPropertyTableData(i,e,t=null){if(!Array.isArray(i))t||(t={}),t=this.tableAccessors[i].getData(e,t);else{t||(t=[]);let n=Math.min(i.length,e.length);t.length=n;for(let r=0;r<n;r++){let s=this.tableAccessors[i[r]];t[r]=s.getData(e[r],t[r])}}if(Array.isArray(i)!==Array.isArray(t)||Array.isArray(i)!==Array.isArray(e))throw Error("StructuralMetadata: Scalar and array inputs cannot be mixed.");return t}getPropertyTableInfo(i=null){if(i===null&&(i=this.tableAccessors.map((e,t)=>t)),Array.isArray(i))return i.map(e=>{let t=this.tableAccessors[e];return{name:t.name,className:t.definition.class}});{let e=this.tableAccessors[i];return{name:e.name,className:e.definition.class}}}getPropertyTextureData(i,e,t=[]){let n=this.textureAccessors;t.length=n.length;for(let r=0;r<n.length;r++){let s=n[r];t[r]=s.getData(i,e,this.object.geometry,t[r])}return t}async getPropertyTextureDataAsync(i,e,t=[]){let n=this.textureAccessors;t.length=n.length;let r=[];for(let s=0;s<n.length;s++){let a=n[s].getDataAsync(i,e,this.object.geometry,t[s]).then(o=>{t[s]=o});r.push(a)}return await Promise.all(r),t}getPropertyTextureInfo(){return this.textureAccessors}getPropertyAttributeData(i,e=[]){let t=this.attributeAccessors;e.length=t.length;for(let n=0;n<t.length;n++){let r=t[n];e[n]=r.getData(i,this.object.geometry,e[n])}return e}getPropertyAttributeInfo(){return this.attributeAccessors.map(i=>({name:i.name,className:i.definition.class}))}dispose(){this.textureAccessors.forEach(i=>i.dispose()),this.tableAccessors.forEach(i=>i.dispose()),this.attributeAccessors.forEach(i=>i.dispose())}},Go="EXT_structural_metadata";function Ww(i,e=[]){let t=i.json.textures?.length||0,n=Array(t).fill(null);return e.forEach(({properties:r})=>{for(let s in r){let{index:a}=r[s];n[a]===null&&(n[a]=i.loadTexture(a))}}),Promise.all(n)}function Xw(i,e=[]){let t=i.json.bufferViews?.length||0,n=Array(t).fill(null);return e.forEach(({properties:r})=>{for(let s in r){let{values:a,arrayOffsets:o,stringOffsets:l}=r[s];n[a]===null&&(n[a]=i.getDependency("bufferView",a)),n[o]===null&&(n[o]=i.getDependency("bufferView",o)),n[l]===null&&(n[l]=i.getDependency("bufferView",l))}}),Promise.all(n)}var k0=class{constructor(i){this.parser=i,this.name=Go}async afterRoot({scene:i,parser:e}){let t=e.json.extensionsUsed;if(!t||!t.includes(Go))return;let n=null,r=e.json.extensions[Go];if(r.schemaUri){let{manager:l,path:c,requestHeader:u,crossOrigin:h}=e.options,d=new URL(r.schemaUri,c).toString(),f=new nn(l);f.setCrossOrigin(h),f.setResponseType("json"),f.setRequestHeader(u),n=f.loadAsync(d).then(m=>{r={...r,schema:m}})}let[s,a]=await Promise.all([Ww(e,r.propertyTextures),Xw(e,r.propertyTables),n]),o=new Zf(r,s,a);i.userData.structuralMetadata=o,i.traverse(l=>{if(e.associations.has(l)){let{meshes:c,primitives:u}=e.associations.get(l),h=e.json.meshes[c]?.primitives[u];if(h&&h.extensions&&h.extensions[Go]){let d=h.extensions[Go];l.userData.structuralMetadata=new Zf(r,s,a,d,l)}else l.userData.structuralMetadata=o}})}},P0=new de,I0=new de,L0=new de;function qw(i){return i.x>i.y&&i.x>i.z?0:i.y>i.z?1:2}var V0=class{constructor(i,e,t){this.geometry=i,this.textures=e,this.data=t,this._asyncRead=!1,this.featureIds=t.featureIds.map(n=>{let{texture:r,...s}=n,a={label:null,propertyTable:null,nullFeatureId:null,...s};return r&&(a.texture={texCoord:0,channels:[0],...r}),a})}getTextures(){return this.textures}getFeatureInfo(){return this.featureIds}getFeaturesAsync(...i){this._asyncRead=!0;let e=this.getFeatures(...i);return this._asyncRead=!1,e}getFeatures(i,e){let{geometry:t,textures:n,featureIds:r}=this,s=Array(r.length).fill(null),a=r.length;Sr.increaseSizeTo(a);let o=O0(t,i),l=o[qw(e)];for(let h=0,d=r.length;h<d;h++){let f=r[h],m="nullFeatureId"in f?f.nullFeatureId:null;if("texture"in f){let y=n[f.texture.index];B0(t,f.texture.texCoord,e,o,P0),z0(P0,y.image.width,y.image.height,I0),L0.set(h,0),Sr.renderPixelToTarget(n[f.texture.index],I0,L0)}else if("attribute"in f){let y=t.getAttribute(`_feature_id_${f.attribute}`).getX(l);y!==m&&(s[h]=y)}else{let y=l;y!==m&&(s[h]=y)}}let c=new Uint8Array(a*4);return this._asyncRead?Sr.readDataAsync(c).then(()=>(u(),s)):(Sr.readData(c),u(),s);function u(){let h=new Uint32Array(1);for(let d=0,f=r.length;d<f;d++){let m=r[d],y="nullFeatureId"in m?m.nullFeatureId:null;if("texture"in m){let{channels:g}=m.texture,p=g.map(_=>c[4*d+_]);new Uint8Array(h.buffer).set(p);let v=h[0];v!==y&&(s[d]=v)}}}}dispose(){this.textures.forEach(i=>{i&&(i.dispose(),i.image instanceof ImageBitmap&&i.image.close())})}},Fh="EXT_mesh_features";function D0(i,e,t){i.traverse(n=>{if(e.associations.has(n)){let{meshes:r,primitives:s}=e.associations.get(n),a=e.json.meshes[r]?.primitives[s];a&&a.extensions&&a.extensions[Fh]&&t(n,a.extensions[Fh])}})}var H0=class{constructor(i){this.parser=i,this.name=Fh}async afterRoot({scene:i,parser:e}){let t=e.json.extensionsUsed;if(!t||!t.includes(Fh))return;let n=e.json.textures?.length||0,r=Array(n).fill(null);D0(i,e,(a,{featureIds:o})=>{o.forEach(l=>{if(l.texture&&r[l.texture.index]===null){let c=l.texture.index;r[c]=e.loadTexture(c)}})});let s=await Promise.all(r);D0(i,e,(a,o)=>{a.userData.meshFeatures=new V0(a.geometry,s,o)})}},G0=class{constructor(){this.name="CESIUM_RTC"}afterRoot(i){if(i.parser.json.extensions&&i.parser.json.extensions.CESIUM_RTC){let{center:e}=i.parser.json.extensions.CESIUM_RTC;e&&(i.scene.position.x+=e[0],i.scene.position.y+=e[1],i.scene.position.z+=e[2])}}},Jf=class{constructor(i){i={metadata:!0,rtc:!0,plugins:[],dracoLoader:null,ktxLoader:null,meshoptDecoder:null,autoDispose:!0,...i},this.tiles=null,this.metadata=i.metadata,this.rtc=i.rtc,this.plugins=i.plugins,this.dracoLoader=i.dracoLoader,this.ktxLoader=i.ktxLoader,this.meshoptDecoder=i.meshoptDecoder,this._gltfRegex=/\.(gltf|glb)$/g,this._dracoRegex=/\.drc$/g,this._loader=null}init(i){let e=new _r(i.manager);this.dracoLoader&&(e.setDRACOLoader(this.dracoLoader),i.manager.addHandler(this._dracoRegex,this.dracoLoader)),this.ktxLoader&&e.setKTX2Loader(this.ktxLoader),this.meshoptDecoder&&e.setMeshoptDecoder(this.meshoptDecoder),this.rtc&&e.register(()=>new G0),this.metadata&&(e.register(()=>new k0),e.register(()=>new H0)),this.plugins.forEach(t=>e.register(t)),i.manager.addHandler(this._gltfRegex,e),this.tiles=i,this._loader=e}dispose(){this.tiles.manager.removeHandler(this._gltfRegex),this.tiles.manager.removeHandler(this._dracoRegex),this.autoDispose&&(this.ktxLoader.dispose(),this.dracoLoader.dispose())}},Dh=new xt,Bh=class{constructor(i){i={up:"+z",recenter:!0,lat:null,lon:null,height:0,azimuth:0,elevation:0,roll:0,...i},this.tiles=null,this.up=i.up.toLowerCase().replace(/\s+/,""),this.lat=i.lat,this.lon=i.lon,this.height=i.height,this.azimuth=i.azimuth,this.elevation=i.elevation,this.roll=i.roll,this.recenter=i.recenter,this._callback=null}init(i){this.tiles=i,this._callback=()=>{let{up:e,lat:t,lon:n,height:r,azimuth:s,elevation:a,roll:o,recenter:l}=this;if(t!==null&&n!==null)this.transformLatLonHeightToOrigin(t,n,r,s,a,o);else{let{ellipsoid:c}=i,u=Math.min(...c.radius);if(i.getBoundingSphere(Dh),Dh.center.length()>u*.5){let h={};c.getPositionToCartographic(Dh.center,h),this.transformLatLonHeightToOrigin(h.lat,h.lon,h.height)}else{let h=i.group;switch(h.rotation.set(0,0,0),e){case"x":case"+x":h.rotation.z=Math.PI/2;break;case"-x":h.rotation.z=-Math.PI/2;break;case"y":case"+y":break;case"-y":h.rotation.z=Math.PI;break;case"z":case"+z":h.rotation.x=-Math.PI/2;break;case"-z":h.rotation.x=Math.PI/2}i.group.position.copy(Dh.center).applyEuler(h.rotation).multiplyScalar(-1)}}l||i.group.position.setScalar(0),i.removeEventListener("load-root-tileset",this._callback)},i.addEventListener("load-root-tileset",this._callback),i.root&&this._callback()}transformLatLonHeightToOrigin(i,e,t=0,n=0,r=0,s=0){let{group:a,ellipsoid:o}=this.tiles;o.getObjectFrame(i,e,t,n,r,s,a.matrix,2),a.matrix.invert().decompose(a.position,a.quaternion,a.scale),a.updateMatrixWorld()}dispose(){let{group:i}=this.tiles;i.position.setScalar(0),i.quaternion.identity(),i.scale.set(1,1,1),this.tiles.removeEventListener("load-root-tileset",this._callback)}},Qf=class{set delay(i){this.deferCallbacks.delay=i}get delay(){return this.deferCallbacks.delay}set bytesTarget(i){this.lruCache.minBytesSize=i}get bytesTarget(){return this.lruCache.minBytesSize}get estimatedGpuBytes(){return this.lruCache.cachedBytes}constructor(i={}){let{delay:e=0,bytesTarget:t=0}=i;this.name="UNLOAD_TILES_PLUGIN",this.tiles=null,this.lruCache=new Kd,this.deferCallbacks=new Yw,this.delay=e,this.bytesTarget=t}init(i){this.tiles=i;let{lruCache:e,deferCallbacks:t}=this,n=r=>{let s=r.engineData.scene;i.visibleTiles.has(r)||i.invokeOnePlugin(a=>a.unloadTileFromGPU&&a.unloadTileFromGPU(s,r))};this._onUpdateBefore=()=>{e.unloadPriorityCallback=i.lruCache.unloadPriorityCallback,e.minSize=1/0,e.maxSize=1/0,e.maxBytesSize=1/0,e.unloadPercent=1,e.autoMarkUnused=!1},this._onVisibilityChangeCallback=({tile:r,scene:s,visible:a})=>{a?(e.add(r,n),e.setMemoryUsage(r,i.calculateBytesUsed(r,s)||1),e.markUsed(r),i.markTileUsed(r),t.cancel(r)):t.run(r)},this._onDisposeModel=({tile:r})=>{e.remove(r),t.cancel(r)},t.callback=r=>{e.markUnused(r),e.scheduleUnload()},i.forEachLoadedModel((r,s)=>{let a=i.visibleTiles.has(s);this._onVisibilityChangeCallback({tile:s,visible:a})}),i.addEventListener("tile-visibility-change",this._onVisibilityChangeCallback),i.addEventListener("update-before",this._onUpdateBefore),i.addEventListener("dispose-model",this._onDisposeModel)}unloadTileFromGPU(i,e){i&&i.traverse(t=>{if(t.material){let n=t.material;n.dispose();for(let r in n){let s=n[r];s&&s.isTexture&&s.dispose()}}t.geometry&&t.geometry.dispose()})}dispose(){let{lruCache:i,tiles:e,deferCallbacks:t}=this;e.removeEventListener("tile-visibility-change",this._onVisibilityChangeCallback),e.removeEventListener("update-before",this._onUpdateBefore),e.removeEventListener("dispose-model",this._onDisposeModel),t.cancelAll(),i.minBytesSize=0,i.minSize=0,i.maxSize=0,i.markAllUnused(),i.scheduleUnload()}},Yw=class{constructor(i=()=>{}){this.map=new Map,this.callback=i,this.delay=0}run(i){let{map:e,delay:t}=this;if(e.has(i))throw Error("DeferCallbackManager: Callback already initialized.");t===0?this.callback(i):e.set(i,setTimeout(()=>{this.callback(i),e.delete(i)},t))}cancel(i){let{map:e}=this;e.has(i)&&(clearTimeout(e.get(i)),e.delete(i))}cancelAll(){this.map.forEach((i,e)=>{this.cancel(e)})}};var AL=new Vo(new fi),jw=new gn(new Uint8Array([255,255,255,255]),1,1);jw.needsUpdate=!0;var ep=class{constructor(i={}){let{regions:e=[]}=i;this.name="LOAD_REGION_PLUGIN",this.regions=[],this.tiles=null,e.forEach(t=>this.addRegion(t))}init(i){this.tiles=i}addRegion(i){this.regions.indexOf(i)===-1&&this.regions.push(i)}removeRegion(i){let e=this.regions.indexOf(i);e!==-1&&this.regions.splice(e,1)}hasRegion(i){return this.regions.indexOf(i)!==-1}clearRegions(){this.regions=[]}calculateTileViewError(i,e){let t=i.engineData.boundingVolume,{regions:n,tiles:r}=this,s=!1,a=null,o=0,l=1/0;for(let c of n){let u=c.intersectsTile(t,i,r);s||(s=u),u&&(o=Math.max(c.calculateError(i,r),o),l=Math.min(c.calculateDistance(t,i,r),l)),c.mask&&(a||(a=u))}return e.inView=s&&a!==!1,e.error=o,e.distance=l,e.inView||a!==null}dispose(){this.regions=[]}},tp=class{constructor(i={}){let{errorTarget:e=10,mask:t=!1}=i;this.errorTarget=e,this.mask=t}intersectsTile(i,e,t){return!1}calculateDistance(i,e,t){return 1/0}calculateError(i,e){return i.geometricError-this.errorTarget+e.errorTarget}},ip=class extends tp{constructor(i={}){let{sphere:e=new xt}=i;super(i),this.sphere=e.clone()}intersectsTile(i){return i.intersectsSphere(this.sphere)}},np=class extends tp{constructor(i={}){let{ray:e=new Vt}=i;super(i),this.ray=e.clone()}intersectsTile(i){return i.intersectsRay(this.ray)}};var Zw=0,$w=1,Kw=2,Jw=3,Qw=4,eE=5,tE=6,iE=7,nE=8,rE=9,sE=10,aE=11,CL=Object.freeze({NONE:Zw,SCREEN_ERROR:$w,GEOMETRIC_ERROR:Kw,DISTANCE:Jw,DEPTH:Qw,RELATIVE_DEPTH:eE,IS_LEAF:tE,RANDOM_COLOR:iE,RANDOM_NODE_COLOR:nE,CUSTOM_COLOR:rE,LOAD_ORDER:sE,INDEXED_COLOR:aE});var RL=Math.PI/4,PL=3/5;var br={NONE:0,NOT_READY:1,NO_FIT:2,DEPTH:3,OCCUPANCY:4,SPACING:5,ANGLE:6,FACING:7};var IL=new class{constructor(){this._cache={}}getColor(...i){let e=i.pop(),t=i.join("_"),{_cache:n}=this;return t in n||(e.setHSL(Math.random(),1,.5),n[t]=e.getHex()),e.set(n[t])}};var LL={[br.NONE]:16777215,[br.NOT_READY]:7829367,[br.NO_FIT]:2250239,[br.DEPTH]:4473924,[br.OCCUPANCY]:65535,[br.SPACING]:16776960,[br.ANGLE]:16711680,[br.FACING]:16711935};var DL=Math.PI/180;var UL=ga*Math.PI*2;var NL=ga*Math.PI*2;dt.prototype.computeBoundsTree=xy;dt.prototype.disposeBoundsTree=vy;ct.prototype.raycast=function(i,e){let t=this.geometry;if(this.userData.tile&&!t.boundsTree)try{t.computeBoundsTree()}catch{this.userData.tile=!1}return _y.call(this,i,e)};var Ae=i=>document.getElementById(i),Bi={get(i){try{return localStorage.getItem(i)||""}catch{return""}},set(i,e){try{localStorage.setItem(i,e)}catch{}}},Yh=[{id:"parc",name:"Parc Georges-Henri",q:["Parc Georges Henri, Woluwe-Saint-Lambert"],lat:50.8418,lon:4.4093},{id:"cinquantenaire",name:"Parc du Cinquantenaire",q:["Parc du Cinquantenaire, Bruxelles"],lat:50.8399,lon:4.393},{id:"vergote",name:"Rue Vergote",q:["Rue Vergote, Woluwe-Saint-Lambert","Rue Vergote, Bruxelles","Square Vergote, Bruxelles"]},{id:"hoftenberg",name:"Hof ten Berg",q:["Hof ten Berg, Woluwe-Saint-Lambert","Hof ten Berg, Bruxelles"]},{id:"andromede",name:"Androm\xE8de",q:["Androm\xE8de, Woluwe-Saint-Lambert","Avenue Androm\xE8de, Bruxelles"]},{id:"docks",name:"Docks Bruxsel",q:["Docks Bruxsel, Bruxelles","Docks Bruxsel"],lat:50.8792,lon:4.3737},{id:"shopping",name:"Woluwe Shopping",q:["Woluwe Shopping, Woluwe-Saint-Lambert","Woluwe Shopping"],lat:50.8473,lon:4.4296},{id:"court",name:"Court-Saint-\xC9tienne \xB7 rue \xC9mile Henricot",q:["Rue \xC9mile Henricot, Court-Saint-\xC9tienne"],lat:50.6405,lon:4.566}],hn=Math.PI/180,Ta=new URLSearchParams(location.search).get("tileset"),Oi=1.7,oE=1.5,lE=8,Hh=[1,2,5,10],Wh=1,cE=22,hE=7;Ae("key").value=Bi.get("quartier.key");Ae("home").value=Bi.get("quartier.home");Ae("quality").value=Bi.get("quartier.quality")||"haute";async function mp(i){let e="https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=be&q="+encodeURIComponent(i),t=await fetch(e,{headers:{"Accept-Language":"fr"}});if(!t.ok)throw new Error("recherche indisponible");let[n]=await t.json();return n?{lat:+n.lat,lon:+n.lon,name:n.display_name.split(",").slice(0,2).join(",")}:null}var wr={home:null},cp=()=>{try{return JSON.parse(Bi.get("quartier.favs")||"[]")}catch{return[]}};async function t_(i){if(i.resolved)return i.resolved;let e="quartier.geo."+i.id;try{let t=JSON.parse(Bi.get(e)||"null");if(t)return i.resolved={...t,name:i.name}}catch{}for(let t of i.q)try{let n=await mp(t);if(n)return Bi.set(e,JSON.stringify({lat:n.lat,lon:n.lon})),i.resolved={lat:n.lat,lon:n.lon,name:i.name}}catch{break}return i.lat!=null?{lat:i.lat,lon:i.lon,name:i.name,approx:!0}:null}async function uE(){let i=Ae("home").value.trim();if(!i){wr.home=null;return}let e=/woluwe|bruxelles|brussel|\d{4}/i.test(i)?i:i+", Woluwe-Saint-Lambert";try{let t=await mp(e);wr.home=t?{...t,name:"Ma rue"}:null}catch{wr.home=null}}for(let i of Yh)Ae("start-place").add(new Option(i.name,i.id));Ae("start-place").value=Bi.get("quartier.startPlace")||"parc";async function i_(i){let e=Ae("key").value.trim();if(!e){Ae("msg").textContent="Il faut une cl\xE9 Google (voir le mode d'emploi juste en dessous).";return}Bi.set("quartier.key",e),Bi.set("quartier.home",Ae("home").value.trim()),Bi.set("quartier.quality",Ae("quality").value),Bi.set("quartier.startPlace",Ae("start-place").value),Ae("msg").textContent="Recherche des adresses\u2026",await uE();let t;if(i==="home"){if(t=wr.home,!t){Ae("msg").textContent=Ae("home").value.trim()?"Adresse introuvable. Essaie par exemple \xAB Rue \u2026, 1200 Woluwe-Saint-Lambert \xBB.":"\xC9cris d'abord ton adresse.";return}}else if(t=await t_(Yh.find(n=>n.id===Ae("start-place").value)),!t){Ae("msg").textContent="Lieu introuvable pour le moment, choisis-en un autre.";return}Ae("menu").hidden=!0,document.body.classList.add("playing"),dE(),Ae("hud").hidden=!1,fE(e,t,Ae("quality").value)}Ae("go-home-start").onclick=()=>i_("home");Ae("go-start").onclick=()=>i_("pick");function dE(){if(!matchMedia("(pointer: coarse)").matches)return;let e=document.documentElement.requestFullscreen?.({navigationUI:"hide"});Promise.resolve(e).catch(()=>{}).then(()=>screen.orientation?.lock?.("landscape")).catch(()=>{})}var si,Ma,jt,Ve,xi,Tr,Yo,hp={normale:{error:12,radius:40,maxPR:1.25,minPR:.6,cache:700,far:1600,msaa:!1},haute:{error:6,radius:70,maxPR:1.6,minPR:.75,cache:1100,far:2400,msaa:"lowdpi"},ultra:{error:3,radius:110,maxPR:2,minPR:.9,cache:1800,far:3200,msaa:!0}},ai=hp.haute,$n=1,Q={pos:new C,vel:new C,yaw:0,pitch:0,onGround:!1,fly:!1,grounded:!1},up=new ip({errorTarget:.5}),n_=new np({errorTarget:.5}),Kn={time:0,quiet:0};function fE(i,e,t){ai=hp[t]||hp.haute;let n=ai.msaa===!0||ai.msaa==="lowdpi"&&devicePixelRatio<1.5;si=new $s({antialias:n,powerPreference:"high-performance",stencil:!1}),$n=Math.min(devicePixelRatio,ai.maxPR),si.setPixelRatio($n),si.setSize(innerWidth,innerHeight),si.outputColorSpace=ut,document.body.prepend(si.domElement),Ma=new qa,Tr=new ph(Ma,si,e.lat,e.lon,ai.far),jt=new Pt(70,innerWidth/innerHeight,.3,ai.far+200),Ve=new Xf(Ta||void 0),Ta||Ve.registerPlugin(new qf({apiToken:i,autoRefreshToken:!0,useRecommendedSettings:!1}));let r=new Gc().setDecoderPath("./draco/");Ve.registerPlugin(new Jf({dracoLoader:r})),Ve.registerPlugin(new Qf),Ve.registerPlugin(new ep({regions:[up,n_]})),Yo=Ta?new Bh({up:"+z",recenter:!1}):new Bh({lat:e.lat*hn,lon:e.lon*hn,height:0,recenter:!0}),Ve.registerPlugin(Yo),Ve.errorTarget=ai.error,Ve.lruCache.maxSize=ai.cache,Ve.lruCache.minSize=Math.round(ai.cache*.6),Ve.downloadQueue.maxJobs=12,Ve.parseQueue.maxJobs=2;let s=si.capabilities.getMaxAnisotropy();Ve.addEventListener("load-model",({scene:a})=>{a.traverse(o=>{if(!o.isMesh)return;o.userData.tile=!0;let l=o.material;if(Array.isArray(l))return;let c=new fi({map:l.map||null,side:l.side});!l.map&&l.color&&c.color.copy(l.color),c.map&&(c.map.anisotropy=s,c.map.needsUpdate=!0),c.onBeforeCompile=pE,c.customProgramCacheKey=()=>"tile-grade",o.material=c,l.dispose()})}),Ve.addEventListener("dispose-model",({scene:a})=>{a.traverse(o=>{o.isMesh&&o.geometry.boundsTree&&o.geometry.disposeBoundsTree()})}),Tr.onTint(a=>dp.uTint.value.copy(a)),dp.uTint.value.copy(Tr.tint),Ve.setCamera(jt),Ve.setResolutionFromRenderer(jt,si),Ma.add(Ve.group),Ve.addEventListener("load-error",a=>{let o=a.error?.message||"";/40[013]|API key|PERMISSION/i.test(o)&&gE("Google refuse la cl\xE9. V\xE9rifie la cl\xE9, que \xAB Map Tiles API \xBB est activ\xE9e sur ce projet et que la facturation est configur\xE9e.")}),xi=new Wr,xi.firstHitOnly=!0,addEventListener("resize",mE),yE(),wa(e),si.setAnimationLoop(RE)}var dp={uTint:{value:new pe(1,1,1)}};function pE(i){i.uniforms.uTint=dp.uTint,i.fragmentShader=`uniform vec3 uTint;
`+i.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
	{
		vec3 c = diffuseColor.rgb;
		float l = dot( c, vec3( 0.2126, 0.7152, 0.0722 ) );
		c = mix( vec3( l ), c, 1.12 );                       // couleurs un peu plus vives
		c = 0.18 * pow( max( c, 0.0 ) / 0.18, vec3( 1.06 ) ); // un peu plus de contraste
		diffuseColor.rgb = c * uTint;
	}`)}function mE(){jt.aspect=innerWidth/innerHeight,jt.updateProjectionMatrix(),si.setSize(innerWidth,innerHeight),Ve.setResolutionFromRenderer(jt,si)}function gE(i){Ae("error").textContent=i,Ae("error").hidden=!1}var Zo=new C,Sa=new re,rp={};function sp(i,e,t,n){return Ve.group.updateMatrixWorld(!0),Ve.ellipsoid.getCartographicToPosition(i*hn,e*hn,t,n),n.applyMatrix4(Ve.group.matrixWorld)}function r_(i){return Ve.group.updateMatrixWorld(!0),Sa.copy(Ve.group.matrixWorld).invert(),Zo.copy(i).applyMatrix4(Sa),Ve.ellipsoid.getPositionToCartographic(Zo,rp),{lat:rp.lat/hn,lon:rp.lon/hn}}function wa(i){Ta?Q.pos.set(0,400,0):(Yo.lat=i.lat*hn,Yo.lon=i.lon*hn,Yo.transformLatLonHeightToOrigin(i.lat*hn,i.lon*hn,0),Ve.group.updateMatrixWorld(!0),sp(i.lat,i.lon,0,Q.pos),Q.pos.y+=400),Tr.setLocation(i.lat,i.lon);let e=Ta?new C(0,0,-1):sp(i.lat+.001,i.lon,0,new C).sub(sp(i.lat,i.lon,0,Zo));h_=Math.atan2(-e.x,-e.z),Q.vel.set(0,0,0),Q.grounded=!1,Kn.time=0,Kn.quiet=0,Q.pitch=-.35,Ae("place").textContent=i.name,os("Chargement de "+i.name+"\u2026"+(i.approx?" (position approximative)":"")),yp()}var jo=new Set,Mr={x:0,y:0};function yE(){let i=si.domElement;addEventListener("keydown",e=>{if(e.target.tagName==="INPUT")return;jo.add(e.code),e.code==="KeyF"&&q0(),e.code==="KeyH"&&wr.home&&wa(wr.home),e.code==="KeyP"&&a_(Yh[0]),(e.code==="KeyT"||e.code==="KeyL")&&X0(),e.code==="KeyV"&&W0();let t=["Digit1","Digit2","Digit3","Digit4"].indexOf(e.code);t>=0&&s_(Hh[t]),e.code==="Space"&&e.preventDefault()}),addEventListener("keyup",e=>jo.delete(e.code)),addEventListener("blur",()=>jo.clear()),i.addEventListener("click",()=>{fp||i.requestPointerLock?.()}),addEventListener("mousemove",e=>{document.pointerLockElement===i&&o_(e.movementX*.0022,e.movementY*.0022)}),document.addEventListener("pointerlockchange",()=>{Ae("hint").hidden=document.pointerLockElement===i}),Ae("places-btn").onclick=X0,Ae("places-close").onclick=yp,Ae("speed").onclick=W0,Ae("fly").onclick=q0,Ae("goto-form").onsubmit=async e=>{e.preventDefault();let t=Ae("goto").value.trim();if(t){Ae("goto-msg").textContent="Recherche\u2026";try{let n=await mp(t);if(!n){Ae("goto-msg").textContent="Adresse introuvable.";return}Ae("goto-msg").textContent="",wa({lat:n.lat,lon:n.lon,name:n.name})}catch{Ae("goto-msg").textContent="Recherche indisponible, r\xE9essaie."}}},Ae("save-here").onclick=()=>{let e=prompt("Nom de ce lieu ?",Ae("place").textContent);if(!e)return;let{lat:t,lon:n}=r_(Q.pos);Bi.set("quartier.favs",JSON.stringify([...cp(),{name:e,lat:t,lon:n}])),gp(),os("\xAB "+e+" \xBB enregistr\xE9")},Ae("jump").onclick=l_,_E(i)}var fp=matchMedia("(pointer: coarse)").matches;function _E(i){let e=Ae("pad"),t=Ae("knob"),n=null,r=null,s=0,a=0,o=0,l=0;fp&&document.body.classList.add("touch"),i.addEventListener("touchstart",u=>{fp=!0,document.body.classList.add("touch");for(let h of u.changedTouches)h.clientX<innerWidth*.45&&n===null?(n=h.identifier,o=h.clientX,l=h.clientY,e.style.left=o+"px",e.style.top=l+"px",e.hidden=!1,t.style.transform="translate(-50%,-50%)"):r===null&&(r=h.identifier,s=h.clientX,a=h.clientY);u.preventDefault()},{passive:!1}),i.addEventListener("touchmove",u=>{for(let h of u.changedTouches)if(h.identifier===n){let d=h.clientX-o,f=h.clientY-l,m=Math.hypot(d,f),y=55;m>y&&(d*=y/m,f*=y/m),Mr.x=d/y,Mr.y=f/y,t.style.transform=`translate(calc(-50% + ${d}px), calc(-50% + ${f}px))`}else h.identifier===r&&(o_((h.clientX-s)*.005,(h.clientY-a)*.005),s=h.clientX,a=h.clientY);u.preventDefault()},{passive:!1});let c=u=>{for(let h of u.changedTouches)h.identifier===n&&(n=null,Mr.x=Mr.y=0,e.hidden=!0),h.identifier===r&&(r=null)};i.addEventListener("touchend",c),i.addEventListener("touchcancel",c)}function s_(i){Wh=i,Ae("speed").textContent="\xD7"+i,Ae("speed").classList.toggle("on",i>1),os("Vitesse \xD7"+i+(i===1?" (marche tranquille)":""))}function W0(){s_(Hh[(Hh.indexOf(Wh)+1)%Hh.length])}function gp(){let i=Ae("places-list");i.textContent="";let e=(t,n,r)=>{let s=document.createElement("div");s.className="prow";let a=document.createElement("button");if(a.textContent=t,a.onclick=n,s.append(a),r){let o=document.createElement("button");o.textContent="\u2715",o.className="del",o.title="Supprimer",o.onclick=r,s.append(o)}i.append(s)};wr.home&&e("\u{1F3E0} Ma rue",()=>wa(wr.home));for(let t of Yh)e(t.name,()=>a_(t));cp().forEach((t,n)=>e("\u2605 "+t.name,()=>wa(t),()=>{let r=cp();r.splice(n,1),Bi.set("quartier.favs",JSON.stringify(r)),gp()}))}function X0(){Ae("places").hidden?xE():yp()}function xE(){gp(),Ae("places").hidden=!1,document.exitPointerLock?.(),jo.clear()}function yp(){Ae("places").hidden=!0}async function a_(i){os("Recherche de "+i.name+"\u2026");let e=await t_(i);e?wa(e):os(i.name+" : introuvable pour le moment")}function o_(i,e){Q.yaw-=i,Q.pitch=Ht.clamp(Q.pitch-e,-1.5,1.5)}function q0(){Q.fly=!Q.fly,Q.vel.set(0,0,0),Ae("fly").classList.toggle("on",Q.fly),os(Q.fly?"Mode drone : Espace monte, C descend":"Retour \xE0 pied")}function l_(){!Q.fly&&Q.onGround&&(Q.vel.y=hE,Q.onGround=!1)}var _p=new C(0,-1,0);function Xh(i,e,t){return xi.set(i,e),xi.far=t,xi.intersectObject(Ve.group,!0)[0]||null}function Y0(i,e,t,n){xi.set(Zo.set(i,t,e),_p),xi.far=n,xi.firstHitOnly=!1;let r=xi.intersectObject(Ve.group,!0);return xi.firstHitOnly=!0,r.filter(s=>s.face&&xp(s).y>.3)}var ap=new Vt;function vE(){Ve.group.updateMatrixWorld(!0),Sa.copy(Ve.group.matrixWorld).invert(),up.sphere.center.copy(Q.pos).applyMatrix4(Sa),up.sphere.radius=Q.grounded?ai.radius:25,ap.origin.set(Q.pos.x,Q.pos.y+200,Q.pos.z).applyMatrix4(Sa),ap.direction.copy(_p).transformDirection(Sa),n_.ray.copy(ap)}function pp(i,e,t,n=400,r=!1){xi.set(Zo.set(i,t,e),_p),xi.far=n,xi.firstHitOnly=!r;let s=xi.intersectObject(Ve.group,!0);return xi.firstHitOnly=!0,s.length?r?s[s.length-1].point.y:s[0].point.y:null}var c_=.9,ln=new C,zh=new C,qh=new C,j0=new C;function bE(i){let e=Q.pos.y-Oi;for(let s of[1,1.6])if(j0.set(Q.pos.x,e+s,Q.pos.z),!SE(j0,i))return!1;let t=Q.pos.x+i.x,n=Q.pos.z+i.z,r=pp(t,n,e+c_,400);return r===null||e-r>6?!1:(Q.pos.x=t,Q.pos.z=n,!0)}function SE(i,e){let t=e.length();if(t<1e-6)return!1;let n=Xh(i,qh.copy(e).divideScalar(t),t+.35);if(!n||!n.face)return!0;let r=xp(n);if(Math.abs(r.y)>.6)return!0;r.y=0,r.normalize(),e.addScaledVector(r,-e.dot(r));let s=e.length();return s<1e-4?!1:!Xh(i,qh.copy(e).divideScalar(s),s+.35)}function TE(i,e,t){let n=e.length();if(n<1e-6)return!1;let r=Xh(i,qh.copy(e).divideScalar(n),n+t);if(r&&r.face){let s=xp(r);e.addScaledVector(s,-e.dot(s));let a=e.length();if(a<1e-4||Xh(i,qh.copy(e).divideScalar(a),a+t))return!1}return i.add(e),!0}var Z0=new C,Gh=new C,kh=new C,$0=new C,ME=new di;function wE(i){let e=c=>jo.has(c),t=0,n=0;(e("KeyW")||e("KeyZ")||e("ArrowUp"))&&(t+=1),(e("KeyS")||e("ArrowDown"))&&(t-=1),(e("KeyD")||e("ArrowRight"))&&(n+=1),(e("KeyA")||e("KeyQ")||e("ArrowLeft"))&&(n-=1),t-=Mr.y,n+=Mr.x;let r=e("ShiftLeft")||e("ShiftRight")||Math.hypot(Mr.x,Mr.y)>.95;if(Z0.set(-Math.sin(Q.yaw),0,-Math.cos(Q.yaw)),Gh.set(Math.cos(Q.yaw),0,-Math.sin(Q.yaw)),kh.set(0,0,0).addScaledVector(Z0,t).addScaledVector(Gh,n),kh.lengthSq()>1&&kh.normalize(),Q.fly){let c=lE*Wh*(r?3:1);$0.set(0,0,-1).applyEuler(ME.set(Q.pitch,Q.yaw,0,"YXZ")),ln.set(0,0,0).addScaledVector($0,t).addScaledVector(Gh,n),e("Space")&&(ln.y+=1),(e("KeyC")||e("ControlLeft"))&&(ln.y-=1),ln.lengthSq()>1&&ln.normalize(),ln.multiplyScalar(c*i);let u=Math.ceil(ln.length()/1.5);if(u>0){zh.copy(ln).divideScalar(u);for(let d=0;d<u&&TE(Q.pos,zh,1.2);d++);}let h=pp(Q.pos.x,Q.pos.z,Q.pos.y+1,600);h!==null&&Q.pos.y<h+Oi&&(Q.pos.y=h+Oi);return}if(!Q.grounded){Kn.time+=i;let c=Ve.stats.downloading+Ve.stats.parsing>0;if(Kn.quiet=c?0:Kn.quiet+i,Kn.time<1.5||Kn.quiet<.8&&Kn.time<20)return;let u=Y0(Q.pos.x,Q.pos.z,Q.pos.y+100,3e3);if(!u.length){Kn.time=1.5;return}Q.pos.y=u[u.length-1].point.y+Oi,Q.vel.set(0,0,0),Q.grounded=!0,Q.pitch=0,os("Bonne balade !");return}e("Space")&&l_();let s=Q.pos.y-Oi,a=oE*Wh*(r?3:1);ln.copy(kh).multiplyScalar(a*i);let o=ln.length();if(o>0){let c=Math.ceil(o/.35);zh.copy(ln).divideScalar(c);for(let u=0;u<c&&bE(zh);u++);s=Q.pos.y-Oi}Q.vel.y-=cE*i,Q.pos.y+=Q.vel.y*i,s=Q.pos.y-Oi;let l=pp(Q.pos.x,Q.pos.z,Math.max(s,Q.pos.y-Q.vel.y*i-Oi)+c_,400);if(l===null){let c=Y0(Q.pos.x,Q.pos.z,s+80,200).filter(u=>u.point.y>s-.5);c.length?Q.pos.y=c[c.length-1].point.y+Oi:Q.pos.y-=Q.vel.y*i,Q.vel.y=0;return}s<=l||s-l<.25&&Q.vel.y<=0?(Q.pos.y=s<l?Ht.damp(s,l,20,i)+Oi:l+Oi,Q.pos.y-Oi<l-.08&&(Q.pos.y=l-.08+Oi),Q.vel.y=0,Q.onGround=!0):Q.onGround=!1}var EE=new C,K0=new Le;function xp(i){return K0.getNormalMatrix(i.object.matrixWorld),EE.copy(i.face.normal).applyMatrix3(K0).normalize()}var h_=0,J0=0,Q0=0,op=0,Vh=0,AE=new zs,lp=0,cn={frames:0,time:0,fps:60};function CE(i){if(cn.frames++,cn.time+=i,cn.time<1)return;cn.fps=cn.frames/cn.time,cn.frames=0,cn.time=0;let e=Math.min(devicePixelRatio,ai.maxPR),t=!1;cn.fps<48?$n>ai.minPR+.01?($n=Math.max(ai.minPR,$n-.15),t=!0):Ve.errorTarget<ai.error*2&&(Ve.errorTarget*=1.2):cn.fps>57&&(Ve.errorTarget>ai.error?Ve.errorTarget=Math.max(ai.error,Ve.errorTarget/1.2):$n<e-.01&&($n=Math.min(e,$n+.05),t=!0)),t&&(si.setPixelRatio($n),si.setSize(innerWidth,innerHeight),Ve.setResolutionFromRenderer(jt,si))}function RE(){let i=AE.getDelta(),e=Math.min(i,.05);CE(i),wE(e);let t=Math.hypot(Q.pos.x-J0,Q.pos.z-Q0)/Math.max(e,1e-4);J0=Q.pos.x,Q0=Q.pos.z;let n=!Q.fly&&Q.onGround&&t>.3&&t<10;Vh=Ht.damp(Vh,n?1:0,6,e),n&&(op+=e*t*2.6),jt.position.copy(Q.pos),jt.position.y+=Math.sin(op*2)*.025*Vh,jt.position.addScaledVector(Gh.set(Math.cos(Q.yaw),0,-Math.sin(Q.yaw)),Math.sin(op)*.015*Vh),jt.rotation.set(Q.pitch,Q.yaw,0,"YXZ"),jt.updateMatrixWorld();let r=Tr.fogFar*(Q.fly?3:1);if(Ma.fog.far=r,Ma.fog.near=Tr.fogNear*(Q.fly?3:1),Math.abs(jt.far-(r+200))>1&&(jt.far=r+200,jt.updateProjectionMatrix()),vE(),Ve.update(),Tr.update(e,jt.position),si.render(Ma,jt),lp-=e,lp<=0){lp=.5;let{lat:s,lon:a}=r_(Q.pos);Ae("coords").textContent=Ta?Q.pos.toArray().map(u=>u.toFixed(1)).join(" "):s.toFixed(5)+", "+a.toFixed(5);let o=((h_-Q.yaw)/hn%360+360)%360;Ae("compass").textContent=["N","NE","E","SE","S","SO","O","NO"][Math.round(o/45)%8];let l=Ve.stats.downloading+Ve.stats.parsing;Ae("loading").hidden=l===0;let c=Ve.getAttributions().filter(u=>u.type==="string").map(u=>u.value).join(" ");Ae("attrib").textContent=c?"Google \xB7 "+c:"Google",Ae("weather").textContent=Tr.label(),Ae("fps").textContent=Math.round(cn.fps)+" FPS"}}var e_;function os(i){Ae("toast").textContent=i,Ae("toast").hidden=!1,clearTimeout(e_),e_=setTimeout(()=>{Ae("toast").hidden=!0},2500)}
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
