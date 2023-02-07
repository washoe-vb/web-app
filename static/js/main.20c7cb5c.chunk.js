(this["webpackJsonpwashoe-app"]=this["webpackJsonpwashoe-app"]||[]).push([[0],{341:function(e,t,n){"use strict";n.r(t);var r=n(34),c=n.n(r),i=n(44),a=n(0),o=n(221),s=n(412),j=n(51),d=n(4),l=n(5),u=n(142),b=n.n(u),O=b.a.create({baseURL:"https://api.streltsov.rocks:3001/api/v1"});O.interceptors.request.use((function(e){return Object(l.a)(Object(l.a)({},e),{},{headers:Object(l.a)(Object(l.a)({},e.headers),{},{authorization:localStorage.getItem("token")})})}),(function(e){return Promise.reject(e)}));var x=n(223),h=n(2),p=Object(a.createContext)({}),m=function(e){var t=e.children,n=Object(a.useState)((function(){return Boolean(localStorage.token)})),r=Object(d.a)(n,2),c=r[0],i=r[1];window.onstorage=function(e){var t=e.key,n=e.newValue;return"token"===t&&i(Boolean(n))};var o=Object(j.useMutation)((function(e){return O.post("/user/login",e)}),{onSuccess:function(e){var t=e.data.token;i(Boolean(t)),localStorage.setItem("token",t)},onError:function(){x.b.error("Something went wrong")}}),s=o.mutate,l=o.isLoading,u=Object(j.useMutation)((function(e){return O.post("/user/signup",e)}),{onSuccess:function(e){var t=e.data.token;i(Boolean(t)),localStorage.setItem("token",t)},onError:function(){x.b.error("Something went wrong")}}),b=u.mutate,m={isAuthenticated:c,isLoggingIn:l,logIn:s,isSigningUp:u.isLoading,signUp:b};return Object(h.jsx)(p.Provider,{value:m,children:t})},f=function(){return Object(a.useContext)(p)},g=n(403),v=n(399),w=n(17),y=n(417),S=n(414),k=n(416),I=n(411),E=function(){return Object(h.jsxs)(S.a,{position:"fixed",component:"nav",children:[Object(h.jsxs)(k.a,{children:[Object(h.jsx)(I.a,{color:"inherit",component:i.b,to:"/",children:"Washoe"}),Object(h.jsxs)(y.a,{ml:"auto",display:"flex",gap:1,children:[Object(h.jsx)(I.a,{color:"inherit",component:i.b,to:"/add-word",children:"Add Word"}),Object(h.jsx)(I.a,{color:"inherit",component:i.b,to:"/my-words",children:"My Words"})]})]}),Object(h.jsx)(v.a,{})]})},C=function(){return f().isAuthenticated?Object(h.jsxs)(y.a,{sx:{marginTop:"64px"},children:[Object(h.jsx)(E,{}),Object(h.jsx)(w.b,{})]}):Object(h.jsx)(w.b,{})},T=n(406),L=n(418),P=n(405),F=n(409),A=n(222),B=n(433),W=n(434),q=T.a.Title,M=T.a.Text,U=function(e){var t=e.onLogIn;return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)(L.b,{direction:"vertical",align:"center",style:{width:"100%",marginBottom:"16px"},children:[Object(h.jsx)(q,{level:3,children:"Log In"}),Object(h.jsx)(M,{type:"secondary",children:"to continue to Washoe"})]}),Object(h.jsxs)(P.a,{onFinish:t,children:[Object(h.jsx)(P.a.Item,{name:"email",rules:[{type:"email",message:"The input is not valid E-mail!"},{required:!0,message:"Please input your E-mail!"}],children:Object(h.jsx)(F.a,{prefix:Object(h.jsx)(B.a,{}),placeholder:"Email"})}),Object(h.jsx)(P.a.Item,{name:"password",rules:[{required:!0,message:"Please input your Password!"}],children:Object(h.jsx)(F.a.Password,{prefix:Object(h.jsx)(W.a,{}),placeholder:"Password"})}),Object(h.jsx)(P.a.Item,{children:Object(h.jsx)(A.a,{type:"primary",htmlType:"submit",style:{width:"100%"},children:"Log In"})})]}),Object(h.jsx)(L.b,{direction:"vertical",align:"center",style:{width:"100%"},children:Object(h.jsxs)(M,{children:["New to Washoe? ",Object(h.jsx)(i.b,{to:"/signup",children:"Create an account"})]})})]})};var z=function(){var e=f(),t=e.logIn;return function(e){var t,n,r=Object(w.l)().state,c=Object(w.n)(),i=(null===r||void 0===r||null===(t=r.from)||void 0===t?void 0:t.pathname)+(null===r||void 0===r||null===(n=r.from)||void 0===n?void 0:n.search)||"/";Object(a.useEffect)((function(){e&&c(i,{replace:!0})}),[e,i,c])}(e.isAuthenticated),Object(h.jsx)(U,{onLogIn:t})},D=T.a.Title,_=T.a.Text,N=function(e){var t=e.onSignUp;return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)(L.b,{direction:"vertical",align:"center",style:{width:"100%",marginBottom:"16px"},children:[Object(h.jsx)(D,{level:3,children:"Sign Up"}),Object(h.jsx)(_,{type:"secondary",children:"to continue to Washoe"})]}),Object(h.jsxs)(P.a,{onFinish:t,children:[Object(h.jsx)(P.a.Item,{name:"email",rules:[{type:"email",message:"The input is not valid E-mail!"},{required:!0,message:"Please input your E-mail!"}],children:Object(h.jsx)(F.a,{prefix:Object(h.jsx)(B.a,{}),placeholder:"Email"})}),Object(h.jsx)(P.a.Item,{name:"password",rules:[{required:!0,message:"Please input your password!"}],hasFeedback:!0,children:Object(h.jsx)(F.a.Password,{prefix:Object(h.jsx)(W.a,{}),placeholder:"Password"})}),Object(h.jsx)(P.a.Item,{children:Object(h.jsx)(A.a,{type:"primary",htmlType:"submit",style:{width:"100%"},children:"Sign Up"})})]}),Object(h.jsx)(L.b,{direction:"vertical",align:"center",style:{width:"100%"},children:Object(h.jsxs)(_,{children:["Already have an account? ",Object(h.jsx)(i.b,{to:"/login",children:"Log In"})]})})]})},Q=function(){var e=f().signUp;return Object(h.jsx)(N,{onSignUp:e})},J=function(){return Object(j.useMutation)((function(e){return O.post("/word/create",e)}))},V=n(3);function R(e){var t=Object(i.c)(),n=Object(d.a)(t,2),r=n[0],c=n[1];return[r.get(e)||"",function(t){var n=Object.fromEntries(r),i=Object(V.a)({},e,t),a=Object(l.a)(Object(l.a)({},n),i);c(a,{replace:!0})}]}var G=function(e){return Object(j.useQuery)(["get-definition",e],(function(){return function(e){return b.a.get("https://api.dictionaryapi.dev/api/v2/entries/en/"+e).then((function(e){return e.data}))}(e)}),{refetchOnWindowFocus:!1,cacheTime:1/0,enabled:Boolean(e),initialData:[]})},H=function(e){var t=e.children;return Object(h.jsx)(y.a,{children:t})},K=T.a.Title,X=function(){var e=R("word"),t=Object(d.a)(e,2),n=t[0],r=t[1],c=R("definition"),i=Object(d.a)(c,2),a=i[0],o=i[1],s=R("example"),j=Object(d.a)(s,2),u=j[0],b=j[1],O=J(),p=O.mutate,m=O.isLoading,f=P.a.useForm(),g=Object(d.a)(f,1)[0];return Object(h.jsx)(h.Fragment,{children:Object(h.jsxs)(H,{children:[Object(h.jsx)(K,{level:3,children:"Add a Word"}),Object(h.jsxs)(P.a,{form:g,initialValues:{word:n,definition:a,example:u},onFinish:function(e){p(function(e){var t=e.word,n=e.definition,r=e.example;return Object(l.a)(Object(l.a)({word:t},n?{definition:n}:{}),r?{example:r}:{})}(e),{onSuccess:function(){x.b.success("Success!"),g.resetFields()},onError:function(){x.b.error("Something went wrong")}})},children:[Object(h.jsx)(P.a.Item,{name:"word",required:!0,children:Object(h.jsx)(F.a,{onChange:function(e){var t=e.currentTarget;return r(t.value)},disabled:m,placeholder:"Word"})}),Object(h.jsx)(P.a.Item,{name:"definition",required:!0,children:Object(h.jsx)(F.a.TextArea,{onChange:function(e){var t=e.currentTarget;return o(t.value)},disabled:m,placeholder:"Definition"})}),Object(h.jsx)(P.a.Item,{name:"example",required:!0,children:Object(h.jsx)(F.a.TextArea,{onChange:function(e){var t=e.currentTarget;return b(t.value)},disabled:m,placeholder:"Example"})}),Object(h.jsx)(A.a,{loading:m,type:"primary",htmlType:"submit",style:{width:"100%"},children:"Add"})]})]})})},Y=n(94),Z=n(217),$=n(408),ee=n(426),te=n(429),ne=n(431),re=n(425),ce=n(427),ie=n(428),ae=n(415),oe=n(430),se=n(8),je=n(404);function de(e){return Object(h.jsx)(je.a,Object(l.a)(Object(l.a)({},e),{},{multiline:!0,variant:"outlined"}))}var le,ue=n(219),be=n.n(ue),Oe=n(407),xe=n(421),he=n(423),pe=n(424),me=n(420);function fe(e){var t=e.children,n=e.onClose,r=e.isOpen,c=Object(g.a)((function(e){return e.breakpoints.down("sm")}));return Object(h.jsx)(Oe.a,{open:r,children:Object(h.jsxs)(me.a,{sx:c?{position:"absolute",inset:"0 0 0 0",bgcolor:"background.paper",p:1}:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",p:4},children:[Object(h.jsx)(xe.a,{action:n&&Object(h.jsx)(he.a,{onClick:n,children:Object(h.jsx)(be.a,{})}),title:"Edit word"}),Object(h.jsx)(pe.a,{sx:{display:"flex",flexDirection:"column",gap:"24px"},children:t})]})})}function ge(e,t){var n=e.data.count,r=25*t.length;if(n>r)return r}var ve=function(){var e=Object(j.useInfiniteQuery)("words",(function(e){var t=e.pageParam,n=void 0===t?0:t;return O.get("/word",{params:{skip:n,limit:25}})}),{getNextPageParam:ge}),t=e.data,n=e.fetchNextPage,r=e.hasNextPage,c=(null===t||void 0===t?void 0:t.pages.reduce((function(e,t){return e.concat(t.data.words)}),[]))||[],i=Object(a.useState)(""),o=Object(d.a)(i,2),s=o[0],l=o[1],u=function(e){e.onClose;var t=Object(j.useMutation)((function(e){return O.delete("/word/delete?id=".concat(e))})).mutate,n=Object(j.useMutation)((function(e){return O.patch("/word/update",e)})),r=n.mutate,i=Object(a.useState)(c.find((function(e){return e._id===s})).word),o=Object(d.a)(i,2),l=o[0],u=o[1],b=Object(a.useState)(c.find((function(e){return e._id===s})).definition),x=Object(d.a)(b,2),p=x[0],m=x[1],f=Object(a.useState)(c.find((function(e){return e._id===s})).example),g=Object(d.a)(f,2),v=g[0],w=g[1];return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(de,{value:l,onChange:function(e){return u(e.target.value)}}),Object(h.jsx)(de,{value:p,onChange:function(e){return m(e.target.value)}}),Object(h.jsx)(de,{value:v,onChange:function(e){return w(e.target.value)}}),Object(h.jsx)(I.a,{size:"large",variant:"contained",color:"error",onClick:function(){return t(s)},children:"Delete"}),Object(h.jsx)(I.a,{size:"large",variant:"contained",color:"primary",onClick:function(){return r({_id:s,word:l,definition:p||"",example:v||""})},children:"Save"})]})};return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(fe,{isOpen:Boolean(s),onClose:function(){return l("")},children:Object(h.jsx)(u,{})}),Object(h.jsx)(Z.a,{dataLength:c.length,next:n,hasMore:Boolean(r),loader:Object(h.jsx)($.a,{active:!0}),children:Object(h.jsx)(re.a,{component:ae.a,sx:{padding:0},children:Object(h.jsxs)(ee.a,{size:"small",children:[Object(h.jsx)(ce.a,{children:Object(h.jsxs)(ie.a,{children:[Object(h.jsx)(we,{children:"Word"}),Object(h.jsx)(we,{children:"Definition/Example"})]})}),Object(h.jsx)(te.a,{children:c.map((function(e){return Object(h.jsxs)(ie.a,{onClick:function(){return l(e._id)},children:[Object(h.jsx)(we,{component:"th",scope:"row",children:e.word}),Object(h.jsxs)(we,{children:[e.definition,Boolean(e.definition&&e.example)&&Object(h.jsx)(oe.a,{sx:{margin:"4px"}}),Object(h.jsx)("i",{children:e.example})]})]},e._id)}))})]})})})]})},we=Object(se.a)(ne.a)(le||(le=Object(Y.a)(["\n  font-size: 12px;\n  padding: 4px 8px;\n"]))),ye=n(35),Se=n(19),ke=n(30),Ie=n(422),Ee=n(432),Ce=function(e){var t=e.word,n=e.definition,r=e.example,c=e.synonyms,a=Boolean(c.length)?" : "+JSON.stringify(c):"",o=": ".concat(n.toLowerCase()).concat(a),s="/add-word?word=".concat(t,"&definition=").concat(o||"","&example=").concat(r||""),j=J(),d=j.mutate,l=j.isLoading;function u(){return(u=Object(ke.a)(Object(Se.a)().mark((function e(){return Object(Se.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:d({word:t,definition:o,example:r});case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(h.jsx)(y.a,{sx:{mb:1},children:Object(h.jsxs)(me.a,{variant:"outlined",children:[Object(h.jsxs)(pe.a,{children:[Object(h.jsx)(Ie.a,{variant:"body1",children:o}),r&&Object(h.jsx)(Ie.a,{sx:{mb:1.5},variant:"body2",color:"text.secondary",children:Object(h.jsx)("ul",{children:Object(h.jsx)("li",{children:Object(h.jsx)("i",{children:r})})})})]}),Object(h.jsxs)(Ee.a,{children:[Object(h.jsx)(I.a,{component:i.b,to:s,size:"large",children:"Add"}),Object(h.jsx)(I.a,{disabled:l,onClick:function(){return u.apply(this,arguments)},size:"large",children:l?"Adding...":"Quick Add"})]})]})})},Te=n(419),Le=["word"],Pe=function(e){var t=e.isLoading,n=e.isError,r=e.isSuccess,c=e.data;return n?Object(h.jsx)("span",{children:"Error occured"}):t?Object(h.jsx)("span",{children:"Loading..."}):c.length?r?Object(h.jsx)(h.Fragment,{children:c.map((function(e){var t=e.word;return Object(ye.a)(e,Le).meanings.map((function(e,n){return Object(h.jsxs)(y.a,{children:[Object(h.jsx)(Ie.a,{variant:"h5",children:e.partOfSpeech}),e.definitions.map((function(e,n){return Object(h.jsx)(Ce,{word:t,definition:e.definition,synonyms:e.synonyms,example:e.example},n)}))]},n)}))}))}):Object(h.jsx)("span",{children:"Enter some word to see it definition"}):Object(h.jsx)("span",{children:'"Empty data'})},Fe=function(){var e=R("word"),t=Object(d.a)(e,2),n=t[0],r=t[1],c=G(n),i=c.isError,a=c.isLoading,o=c.isSuccess,s=c.data;return Object(h.jsxs)(y.a,{children:[Object(h.jsx)("form",{onSubmit:function(e){e.preventDefault();var t=new FormData(e.currentTarget);r(t.get("word"))},children:Object(h.jsx)(Te.a,{fullWidth:!0,children:Object(h.jsx)(je.a,{variant:"standard",name:"word",defaultValue:n,autoFocus:!0,margin:"normal"})})}),Object(h.jsx)(Pe,{isLoading:a,isError:i,isSuccess:o,data:s})]})};function Ae(e){var t=e.children,n=Object(w.l)();return f().isAuthenticated?t:Object(h.jsx)(w.a,{to:"/login",state:{from:n}})}var Be=function(){return Object(h.jsx)(w.e,{children:Object(h.jsxs)(w.c,{element:Object(h.jsx)(C,{}),children:[Object(h.jsx)(w.c,{path:"/",element:Object(h.jsx)(Ae,{children:Object(h.jsx)(Fe,{})})}),Object(h.jsx)(w.c,{path:"/add-word",element:Object(h.jsx)(Ae,{children:Object(h.jsx)(X,{})})}),Object(h.jsx)(w.c,{path:"/my-words",element:Object(h.jsx)(Ae,{children:Object(h.jsx)(ve,{})})}),Object(h.jsx)(w.c,{path:"/dictionary",element:Object(h.jsx)(Fe,{})}),Object(h.jsx)(w.c,{path:"/signup",element:Object(h.jsx)(Q,{})}),Object(h.jsx)(w.c,{path:"/login",element:Object(h.jsx)(z,{})})]})})},We=function(){var e=Object(g.a)("(prefers-color-scheme: dark)"),t=Object(o.a)({palette:{mode:e?"dark":"light"}}),n=new j.QueryClient;return Object(h.jsx)(a.StrictMode,{children:Object(h.jsxs)(s.a,{theme:t,children:[Object(h.jsx)(j.QueryClientProvider,{client:n,children:Object(h.jsx)(m,{children:Object(h.jsx)(i.a,{children:Object(h.jsx)(Be,{})})})}),Object(h.jsx)(v.a,{})]})})};c.a.render(Object(h.jsx)(We,{}),document.getElementById("root"))}},[[341,1,2]]]);
//# sourceMappingURL=main.20c7cb5c.chunk.js.map