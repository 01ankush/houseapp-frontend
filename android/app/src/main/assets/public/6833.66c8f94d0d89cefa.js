"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6833],{6833:(y,u,s)=>{s.r(u),s.d(u,{StreetViewPageModule:()=>v});var m=s(6814),f=s(95),a=s(3582),l=s(3044),d=s(5861),t=s(6689),h=s(3681);const p=["streetViewContainer"],w=[{path:"",component:(()=>{var o;class i{constructor(e,n,r){this.route=e,this.roomService=n,this.router=r}ngOnInit(){this.route.paramMap.subscribe(e=>{const n=e.get("id");this.roomid=n,n&&(console.log(n),this.roomService.getRoomDetails(n).subscribe(r=>{this.markers=r.location,console.log(this.markers),this.fetchCoordinatesAndShowOnMap(this.markers)}))})}fetchCoordinatesAndShowOnMap(e){var n=this;return(0,d.Z)(function*(){try{const r=yield n.getCoordinatesForLocation(e);r&&(console.log(r.lat,r.lng),n.loadStreetView(r))}catch(r){console.error("Error fetching coordinates for location",r)}})()}getCoordinatesForLocation(e){return(0,d.Z)(function*(){const n=`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(e)}&key=AIzaSyCIg58baI6932Ur5BAou6kk6ohg1uqSPtc`;try{const g=yield(yield fetch(n)).json();if(g.results.length>0)return g.results[0].geometry.location}catch(r){return console.error("Error fetching coordinates",r),null}})()}loadStreetView(e){if(e&&"number"==typeof e.lat&&"number"==typeof e.lng){console.log(e.lat,e.lng);const n={lat:e.lat,lng:e.lng};new google.maps.StreetViewPanorama(document.getElementById("street-view"),{position:n,pov:{heading:165,pitch:0}})}else console.error("Invalid coordinates:",e)}}return(o=i).\u0275fac=function(e){return new(e||o)(t.Y36(l.gz),t.Y36(h.L),t.Y36(l.F0))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-street-view"]],viewQuery:function(e,n){if(1&e&&t.Gf(p,5),2&e){let r;t.iGM(r=t.CRH())&&(n.streetViewContainer=r.first)}},decls:8,vars:2,consts:[[3,"translucent"],["slot","start"],["defaultHref","/room-details/${roomid}"],[3,"fullscreen"],["id","street-view",1,"street-view"]],template:function(e,n){1&e&&(t.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),t._uU(3," Street View "),t.qZA(),t.TgZ(4,"ion-buttons",1),t._UZ(5,"ion-back-button",2),t.qZA()()(),t.TgZ(6,"ion-content",3),t._UZ(7,"div",4),t.qZA()),2&e&&(t.Q6J("translucent",!0),t.xp6(6),t.Q6J("fullscreen",!0))},dependencies:[a.Sm,a.W2,a.Gu,a.wd,a.sr,a.oU],styles:["#street-view[_ngcontent-%COMP%]{width:100%;height:100%}"]}),i})()}];let S=(()=>{var o;class i{}return(o=i).\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[l.Bz.forChild(w),l.Bz]}),i})(),v=(()=>{var o;class i{}return(o=i).\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[m.ez,f.u5,a.Pc,S]}),i})()}}]);