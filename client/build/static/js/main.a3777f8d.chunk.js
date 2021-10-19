(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{24:function(t,n,e){t.exports={game:"game_game__2xh_k",canvas:"game_canvas__EaLGy"}},57:function(t,n,e){},58:function(t,n,e){"use strict";e.r(n);var o=e(0),i=e.n(o),r=e(27),a=e.n(r),c=function(t){t&&t instanceof Function&&e.e(3).then(e.bind(null,59)).then((function(n){var e=n.getCLS,o=n.getFID,i=n.getFCP,r=n.getLCP,a=n.getTTFB;e(t),o(t),i(t),r(t),a(t)}))},s=e(9),l=e(22),u=e(2),d=e(17),p=e(1);function f(){var t=Object(s.b)().loginWithRedirect;return Object(p.jsx)("div",{children:Object(p.jsx)("button",{onClick:function(){return t({redirectUri:"https://chessapplicationcasews.herokuapp.com"})},children:"Log In"})})}var b,j=e(33),m=e(10),v=e(4),h=e(24),g=e.n(h),x={totalSquares:64,totalRows:8,totalCols:8,w:800,h:800,pw:30,ph:30,indexOffset:1},O=["#ffffff","#7621a3"],w=null,y=[],k={},_={b:new Image,k:new Image,n:new Image,p:new Image,q:new Image,r:new Image},C=function(t){return y=t},I=function(t){return w=t},S=function(t){return{x:(t.col-x.indexOffset)*x.w/x.totalCols,y:(t.row-x.indexOffset)*x.h/x.totalRows,w:x.w/x.totalRows,h:x.h/x.totalCols}},G=e(29),N=function(t){switch(t){case 1:return"A";case 2:return"B";case 3:return"C";case 4:return"D";case 5:return"E";case 6:return"F";case 7:return"G";case 8:return"H";default:throw Error("invalid")}},J=function(){var t=new G.Game,n=function(){for(var t=[],n=["white","black"],e=0;e<x.totalSquares;e++){var o=Math.floor(e%x.totalCols),i=Math.floor(e/x.totalRows)+x.indexOffset,r=N(o+x.indexOffset)+i,a=n[0];e%8===0&&n.reverse(),e%2===0&&(a=n[1]);var c={square:e+x.indexOffset,col:o+x.indexOffset,row:i,symbol:r,color:a};t.push(c)}return t}();return function(t){for(var n in t){var e=t[n],o=new Image;o.src="/public/pieces/".concat(e,".svg"),k[e]=o}for(var i in _)_[i].src="/public/pieces/green/".concat(i,".svg")}(t.board.configuration.pieces),{game:t,pieces:n}},L=J(),E=L.game,F=L.pieces,R=E.board.configuration,A=function(){L=J(),E=L.game,F=L.pieces,R=L.game.board.configuration};function M(t){var n=Object(o.useRef)(),e=null,i=function t(){if(null!==e){w&&C(E.moves(w.symbol));for(var n=0;n<F.length;n++){var o=S(F[n]);e.fillStyle=O["white"===F[n].color?0:1],y.includes(F[n].symbol)&&(e.fillStyle="white"===R.turn?"#32a852":"#324ea8"),e.fillRect(o.x,o.y,o.w,o.h);var i=R.pieces[F[n].symbol];if(i){var r=k[i];w&&n+1===w.square&&(r=_[i.toLowerCase()]),e.drawImage(r,o.x+x.pw,o.y+x.ph)}}}return requestAnimationFrame(t)},r=function(n,e,o){var i;t.send(JSON.stringify({type:n,payload:{from:e,to:o},uid:null===(i=t.user)||void 0===i?void 0:i.sub,rid:t.roomId}))};return Object(o.useEffect)((function(){n&&n.current&&(e=n.current.getContext("2d"),n.current.width=x.w,n.current.height=x.h,i())}),[n.current]),Object(p.jsx)("div",{className:g.a.game,children:Object(p.jsx)("canvas",{onClick:function(t){if(b===R.turn)for(var n,e=t.nativeEvent.offsetX,o=function(t){return Math.floor(t/(x.h/x.totalRows))+x.indexOffset}(t.nativeEvent.offsetY),i=function(t){return Math.floor(t/(x.w/x.totalCols))+x.indexOffset}(e),a=0;a<F.length;a++)if(F[a].col===i&&F[a].row===o){var c=R.pieces[F[a].symbol];if(w&&y.includes(F[a].symbol))return E.move(w.symbol,F[a].symbol),r("player move",w.symbol,F[a].symbol),I(null),C([]);if(((n=c)===n.toUpperCase()?"white":"black")===R.turn)return I(F[a])}},ref:n,className:g.a.canvas})})}var q,z,B,D,P,U,T,W,H,X,Y,Z=e(5),K=Z.b.div(q||(q=Object(v.a)([""]))),Q=Object(Z.b)("div")(z||(z=Object(v.a)(["\n\tdisplay: none;\n\ttransition: all 300ms ease;\n\tz-index: 5;\n\twidth: 60px;\n\theight: 60px;\n\tbackground-color: #fff;\n\tpadding: 0.5rem;\n\tborder-radius: 50%;\n\n\tspan {\n\t\tdisplay: block;\n\t\twidth: 75%;\n\t\theight: 2px;\n\t\tbackground-color: #333;\n\t}\n\n\t@media (max-width: 1150px) {\n\t\tposition: fixed;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tjustify-content: center;\n\t\talign-items: center;\n\t\tgap: 8px;\n\t\tleft: 0;\n\t\tmargin: 10px 0 0 10px;\n\t\tbox-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n\t\tcursor: pointer;\n\n\t\t&:hover {\n\t\t\ttransform: scale(0.9);\n\t\t}\n\n\t\t","\n\t}\n"])),(function(t){return t.open&&Object(Z.a)(B||(B=Object(v.a)(["\n\t\t\t\tleft: 250px;\n\t\t\t"])))})),V=Object(Z.b)("aside")(D||(D=Object(v.a)(["\n\theight: 100vh;\n\tbackground-color: #7621a3;\n\twidth: 250px;\n\tborder-right: 1px solid #fff;\n\ttransition: all 300ms ease;\n\n\t@media (max-width: 1150px) {\n\t\tposition: fixed;\n\t\twidth: 0;\n\t\toverflow: hidden;\n\t\tborder-right: none;\n\t\tz-index: 5;\n\n\t\t","\n\t}\n"])),(function(t){return t.open&&Object(Z.a)(P||(P=Object(v.a)(["\n\t\t\t\twidth: 250px;\n\t\t\t"])))})),$=Object(Z.b)("div")(U||(U=Object(v.a)(["\n\tposition: fixed;\n\tinset: 0;\n\tz-index: 4;\n\tbackground-color: rgba(0, 0, 0, 0);\n\tpointer-events: none;\n\ttransition: all 300ms ease;\n\n\t","\n"])),(function(t){return t.open&&Object(Z.a)(T||(T=Object(v.a)(["\n\t\t\tcursor: pointer;\n\t\t\tpointer-events: all;\n\t\t\tbackground-color: rgba(0, 0, 0, 0.5);\n\t\t"])))})),tt=Z.b.div(W||(W=Object(v.a)(["\n\tdisplay: flex;\n\tflex-direction: column;\n\tjustify-content: space-between;\n\theight: 100%;\n\tpadding: 50px 20px 20px 20px;\n\twidth: 250px;\n\n\th2,\n\tp {\n\t\tmargin: 10px 0;\n\t\tcolor: #fff;\n\t}\n\n\timg {\n\t\tborder-radius: 50%;\n\t\tborder: 2px solid #fff;\n\t}\n\n\tbutton {\n\t\twidth: 100%;\n\t\tpadding: 12px;\n\t}\n"])));function nt(t){var n=Object(s.b)(),e=n.user,i=n.isLoading,r=n.logout,a=Object(o.useState)(!1),c=Object(m.a)(a,2),l=c[0],u=c[1];return i?Object(p.jsx)(V,{open:l,children:"Loading ..."}):Object(p.jsxs)(K,{children:[Object(p.jsxs)(Q,{open:l,onClick:function(){return u(!l)},children:[Object(p.jsx)("span",{}),Object(p.jsx)("span",{}),Object(p.jsx)("span",{})]}),Object(p.jsx)($,{open:l,onClick:function(){return u(!1)}}),Object(p.jsx)(V,{open:l,children:Object(p.jsxs)(tt,{children:[Object(p.jsxs)("div",{children:[Object(p.jsx)("img",{src:null===e||void 0===e?void 0:e.picture,alt:null===e||void 0===e?void 0:e.name}),Object(p.jsx)("h2",{children:null===e||void 0===e?void 0:e.name}),Object(p.jsx)("p",{children:null===e||void 0===e?void 0:e.email}),Object(p.jsx)("button",{onClick:function(){return t.activeGame?t.leaveGame():t.startGame()},children:t.activeGame?"Leave Game":"New Game"})]}),Object(p.jsx)("button",{onClick:function(){return r()},children:"Logout"})]})})]})}var et=Z.b.header(H||(H=Object(v.a)(["\n\tposition: fixed;\n\tright: 0;\n\twidth: calc(100% - 250px);\n\tbackground-color: #7621a3;\n\tpadding: 1rem 2rem;\n\n\t.headerContent {\n\t\tmargin: 0 auto;\n\t\tdisplay: flex;\n\t\tjustify-content: space-between;\n\t\talign-items: center;\n\t}\n\n\tp {\n\t\tmargin: 0;\n\t\tcolor: #fff;\n\n\t\t.key {\n\t\t\tcolor: #ffffff;\n\t\t\tfont-weight: 700;\n\t\t}\n\t}\n\n\tbutton {\n\t\tpadding: 12px;\n\t\twidth: 125px;\n\t\tmargin-left: 5px;\n\t}\n\n\t.joinGameForm {\n\t\tdisplay: flex;\n\t}\n\n\tinput {\n\t\twidth: 100%;\n\t\tpadding: 12px;\n\t}\n\n\t@media (max-width: 1150px) {\n\t\twidth: 100%;\n\t}\n"]))),ot=Object(Z.b)("div")(X||(X=Object(v.a)(["\n\twidth: 40px;\n\theight: 40px;\n\tborder-radius: 50%;\n\tmargin-bottom: 5px;\n\tposition: relative;\n\tbackground-image: url(",");\n\tbackground-size: cover;\n\tbackground-position: center center;\n\tbackground-repeat: no-repeat;\n\n\t&::before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tinset: 0;\n\t\tbackground-color: #00000094;\n\t\tborder-radius: 50%;\n\t}\n"])),(function(t){return t.src})),it=Z.b.div(Y||(Y=Object(v.a)(["\n\tdisplay: flex;\n\tgap: 25px;\n\n\t.avatarContainer {\n\t\tposition: relative;\n\n\t\tspan {\n\t\t\tcolor: #fff;\n\t\t\tfont-weight: 700;\n\t\t\tposition: absolute;\n\t\t\tleft: 50%;\n\t\t\ttop: 50%;\n\t\t\ttransform: translate(-50%, -60%);\n\t\t\ttext-transform: uppercase;\n\t\t}\n\t}\n"])));function rt(t){var n=Object(o.useState)(""),e=Object(m.a)(n,2),i=e[0],r=e[1];return Object(p.jsx)(et,{children:Object(p.jsxs)("div",{className:"headerContent",children:[t.roomId.length>0&&Object(p.jsxs)("p",{children:[Object(p.jsx)("span",{className:"key",children:"Room ID:"})," ",t.roomId]}),t.roomId.length<=0&&Object(p.jsxs)("div",{className:"joinGameForm",children:[Object(p.jsx)("input",{value:i,placeholder:"cf1hc2jnbf93e6vo8_y6e_255",onChange:function(t){return r(t.target.value)}}),Object(p.jsx)("button",{disabled:i.length<=0,onClick:function(){return t.joinGame(i)},className:"joinGameBtn",children:"Join Game"})]}),Object(p.jsx)(it,{children:t.connections.map((function(t){return Object(p.jsxs)("div",{className:"avatarContainer",id:"player-".concat(t.role),children:[Object(p.jsx)(ot,{src:t.picture}),Object(p.jsx)("span",{children:t.role[0]})]},t.userId)}))})]})})}var at,ct="https://chessapplicationcasews.herokuapp.com/public/sounds",st={game_over:new Audio(ct+"/game_over.wav"),game_start:new Audio(ct+"/game_start.wav"),player_join:new Audio(ct+"/player_join.wav"),player_leave:new Audio(ct+"/player_leave.wav"),player_move:new Audio(ct+"/player_move.wav")},lt=function(t){st[t].play()},ut=Z.b.div(at||(at=Object(v.a)(["\n\tdisplay: flex;\n"])));function dt(){var t=new WebSocket("wss://chessapplicationcasews.herokuapp.com"),n=Object(s.b)(),e=n.user,i=n.isLoading,r=Object(o.useState)(!1),a=Object(m.a)(r,2),c=a[0],l=a[1],u=Object(o.useState)(""),d=Object(m.a)(u,2),f=d[0],v=d[1],h=Object(o.useState)([]),g=Object(m.a)(h,2),x=g[0],O=g[1],w=function(n){if(1===t.OPEN)return t.send(n);window.alert("connection lost.. please reload window")},y=function(t){if(t.uid===(null===e||void 0===e?void 0:e.sub))return n=t.connections.find((function(t){return t.userId===(null===e||void 0===e?void 0:e.sub)})).role,b=n;var n};return Object(o.useEffect)((function(){t.onopen=function(){console.log("ws connection open"),w(JSON.stringify({type:"reset user",uid:null===e||void 0===e?void 0:e.sub}))},t.onclose=function(){console.log("ws connection closed")},t.onmessage=function(t){var n,o=JSON.parse(t.data);switch(o.type){case"open room":return y(o),O(o.connections);case"join room":return y(o),n=o.id,w(JSON.stringify({type:"sync room",rid:n,uid:null===e||void 0===e?void 0:e.sub,payload:E.board.history.map((function(t){return{from:t.from,to:t.to}}))})),lt("player_join"),O(o.connections);case"player move":if(lt("player_move"),o.uid===(null===e||void 0===e?void 0:e.sub))return;return E.move(o.from,o.to);case"sync room":if(o.uid===(null===e||void 0===e?void 0:e.sub))return;return function(t){for(var n=0;n<t.length;n++)E.move(t[n].from,t[n].to)}(o.history);case"leave room":return lt("player_leave"),O(Object(j.a)(o.connections))}}}),[]),i?Object(p.jsx)("div",{children:"Loading ..."}):Object(p.jsxs)(ut,{children:[Object(p.jsx)(rt,{connections:x,roomId:f,joinGame:function(t){return w(JSON.stringify({type:"reset user",uid:null===e||void 0===e?void 0:e.sub})),O([]),A(),v(t),w(JSON.stringify({type:"join room",payload:{picture:null===e||void 0===e?void 0:e.picture,nickname:null===e||void 0===e?void 0:e.nickname},uid:null===e||void 0===e?void 0:e.sub,rid:t})),l(!0)}}),Object(p.jsx)(nt,{startGame:function(){f.length>0&&w(JSON.stringify({type:"leave room",uid:null===e||void 0===e?void 0:e.sub,rid:f})),O([]),A();var t=function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,n="qwertyuiopasdfghjklzxcvbnm1234567890_".split(""),e="",o=0;o<t;o++)e+=n[Math.floor(Math.random()*n.length)];return e}(25);return v(t),w(JSON.stringify({type:"open room",payload:{picture:null===e||void 0===e?void 0:e.picture,nickname:null===e||void 0===e?void 0:e.nickname},uid:null===e||void 0===e?void 0:e.sub,rid:t})),lt("game_start"),l(!0)},activeGame:c,leaveGame:function(){lt("player_leave"),w(JSON.stringify({type:"leave room",uid:null===e||void 0===e?void 0:e.sub,rid:f})),l(!1),v(""),O([])}}),Object(p.jsx)(M,{activeGame:c,send:w,user:e,roomId:f})]})}function pt(){return Object(p.jsx)("div",{children:"Not Found"})}function ft(){return Object(p.jsx)("div",{children:"Loading..."})}var bt=function(t,n,e){var o=t.meta.loggedIn;return void 0===t.meta.auth?e():t.meta.auth&&!o?e.redirect("/"):!t.meta.auth&&o?e.redirect("/play"):e()};function jt(){var t=Object(s.b)(),n=t.isAuthenticated;return t.isLoading?Object(p.jsx)(ft,{}):Object(p.jsx)(l.a,{children:Object(p.jsx)(d.a,{guards:[bt],loading:ft,error:pt,children:Object(p.jsxs)(u.d,{children:[Object(p.jsx)(d.b,{path:"/",exact:!0,component:f,meta:{auth:!1,loggedIn:n}}),Object(p.jsx)(d.b,{path:"/play",exact:!0,component:dt,meta:{auth:!0,loggedIn:n}}),Object(p.jsx)(d.b,{path:"*",component:pt})]})})})}function mt(){return Object(p.jsx)(s.a,{domain:"dustiastheguy.eu.auth0.com",clientId:"0l8mZ1xs6bhJMJkl5JujoNv4aiGipxJo",redirectUri:"https://chessapplicationcasews.herokuapp.com",children:Object(p.jsx)(jt,{})})}e(57);a.a.render(Object(p.jsx)(i.a.StrictMode,{children:Object(p.jsx)(mt,{})}),document.getElementById("root")),c()}},[[58,1,2]]]);
//# sourceMappingURL=main.a3777f8d.chunk.js.map