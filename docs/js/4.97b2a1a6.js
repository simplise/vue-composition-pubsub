(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"713b":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-layout",{attrs:{view:"lHh Lpr lFf"}},[a("q-header",{attrs:{elevated:""}},[a("q-toolbar",[a("q-btn",{attrs:{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu"},on:{click:function(t){e.leftDrawerOpen=!e.leftDrawerOpen}}}),a("q-toolbar-title",[e._v("\n        Quasar App\n      ")]),a("div",[e._v("Quasar v"+e._s(e.$q.version))])],1)],1),a("q-drawer",{attrs:{"show-if-above":"",bordered:"","content-class":"bg-grey-1"},model:{value:e.leftDrawerOpen,callback:function(t){e.leftDrawerOpen=t},expression:"leftDrawerOpen"}},[a("q-list",[a("q-item-label",{staticClass:"text-grey-8",attrs:{header:""}},[e._v("\n        Essential Links\n      ")]),e._l(e.essentialLinks,(function(t){return a("EssentialLink",e._b({key:t.title},"EssentialLink",t,!1))}))],2)],1),a("q-page-container",[a("router-view")],1)],1)},i=[],o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-item",{attrs:{clickable:"",to:e.to}},[e.icon?a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{name:e.icon}})],1):e._e(),a("q-item-section",[a("q-item-label",[e._v(e._s(e.title))]),a("q-item-label",{attrs:{caption:""}},[e._v("\n      "+e._s(e.caption)+"\n    ")])],1)],1)},r=[],s=a("e4fd"),c=Object(s["defineComponent"])({name:"EssentialLink",props:{title:{type:String,required:!0},caption:{type:String,default:""},to:{type:String,default:"/"},icon:{type:String,default:""}}}),l=c,u=a("2877"),p=a("66e5"),b=a("4074"),d=a("0016"),f=a("0170"),m=a("eebe"),v=a.n(m),q=Object(u["a"])(l,o,r,!1,null,null,null),w=q.exports;v()(q,"components",{QItem:p["a"],QItemSection:b["a"],QIcon:d["a"],QItemLabel:f["a"]});const L=[{title:"Primitive",caption:"Primitive Value Subscription",icon:"school",to:"/"},{title:"Message",caption:"Object Message Subscription",icon:"code",to:"/Message"},{title:"Product",caption:"Data Cache First API Second Storategy",icon:"chat",to:"/Product"},{title:"ProductList",caption:"Data Cache First API Second Storategy",icon:"chat",to:"/ProductList"}];var Q=Object(s["defineComponent"])({name:"MainLayout",components:{EssentialLink:w},setup(){const e=Object(s["ref"])(!1),t=Object(s["ref"])(L);return{leftDrawerOpen:e,essentialLinks:t}}}),_=Q,g=a("4d5a"),k=a("e359"),O=a("65c6"),h=a("9c40"),y=a("6ac5"),S=a("9404"),D=a("1c1c"),P=a("09e3"),j=Object(u["a"])(_,n,i,!1,null,null,null);t["default"]=j.exports;v()(j,"components",{QLayout:g["a"],QHeader:k["a"],QToolbar:O["a"],QBtn:h["a"],QToolbarTitle:y["a"],QDrawer:S["a"],QList:D["a"],QItemLabel:f["a"],QPageContainer:P["a"]})}}]);