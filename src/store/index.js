import Vue from "vue";
import axios from "axios";
import VueCookies from "vue-cookies";
import Vuex from "vuex";

Vue.use(VueCookies);
Vue.$cookies.config("1d");
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    state_authorize: false,
    state_user: "",
    state_token: "",
  },
  mutations: {
    login_fail(state) {
      state.state_authorize = false;
      state.state_user = "";
      state.state_token = "";
    },
    login_success(state, data) {
      state.state_authorize = true;
      state.state_user = data.username;
     
    },
    set_token(state,data){
      console.log(data,'AAA');
      state.state_token = data.data.token
    }
  },
  // ! Do something
  actions: {
    // ! login เข้าสู่ระบบ ยังไม่ใช่ของจริง
    async login_authen({ commit }, data) {
      let data_return = {};
      try {
        let payload = {
          username: data.username,
          password: data.password,
        };
        const call_api = await axios.post( process.env.VUE_APP_API_TODO + "/users/auth", payload);
        if (call_api.statusText === "OK") {
          // ! setting
          localStorage.setItem("user", data.username);
          Vue.$cookies.set("auth", true);
          Vue.$cookies.set("todo_token", call_api.data.token)
          // ! commit to login success
          commit("login_success", data);
          commit("set_token", call_api)
          
          data_return = { status: "OK", errorMessage: "" };
        } else {
          // ! commit to login fail
          commit("login_fail");
          data_return = { status: "ER", errorMessage: call_api.data.errorMessage };
        }
      } catch (error) {
        console.log("error in login_authen", error);
        data_return = { status: "ER", errorMessage: error.response.data.errorMessage || error.request || error };
      }
      // ! return
      return new Promise((res) => {
        res(data_return);
      });
    },
    logout_authen() {
      Vue.$cookies.remove("auth");
      Vue.$cookies.set("todo_token", "")
      localStorage.removeItem("user");
    },
  },
  getters: {
 
    gettersAuthorize: (state) => {
      return state.state_authorize;
    },
    gettersToken: (state) => {
      return state.state_token
    }
  },
});
