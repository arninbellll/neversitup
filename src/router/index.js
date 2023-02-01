import Vue from "vue";
import VueRouter from "vue-router";
import VueCookies from "vue-cookies";

Vue.use(VueCookies);
Vue.$cookies.config("1d");
Vue.use(VueRouter);

// ! กัน bypass เข้าหน้าเวป
const ifAuthenticated = (to, from, next) => {
  if (Vue.$cookies.isKey("auth") === true) {
    // ! login success
    next();
  } else {
    // ! ไปเช็ค auth ก่อน
    // store.dispatch("login_authen",{}).then((res) => {
    //   if (res.status === "OK") {
    //     next();
    //   } else {
    //     next("/login");
    //   }
    // });
    next("/login");
  }
};
const routes = [
//   {
//     path: "/default",
//     name: "home",
//     component: () => import("../views/default_page.vue"),
//   },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login_page.vue"),
  },
  {
    path: "/",
    name: "Todo list",
    component: () => import("../views/todo_list.vue"),
    beforeEnter: ifAuthenticated,
  },
 
 
];

const router = new VueRouter({
  mode: "history",
  routes,
  duplicateNavigationPolicy: "ignore",
});

Vue.use(router);

export default router;
