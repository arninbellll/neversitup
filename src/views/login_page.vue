<template>
  <v-app style="background-image: linear-gradient(0deg, #ebf3f9, #b2e7d6)">
    <v-container fill-height class="pa-4" style="justify-content: center;">
      <v-form ref="form" lazy-validation v-model="valid">
        <v-layout row wrap class="ma-0" align-center justify-center>
          <v-flex lg10 md12 xs12 class="pa-2">
            <v-card>
              <v-layout row wrap align-center>
                <v-flex lg6 xs12 md6 class="hidden-sm-and-down">
                  <!-- ! Picture -->
                  <img src="@/assets/login.jpg" height="350vh" />
                </v-flex>
                <v-flex lg6 xs12 md6 class="text-center pa-4">
                  <!-- ! Login form -->
                  <v-layout row wrap class="pa-8">
                    <v-flex lg12 xs12 md12>
                      <h1>Login Todo List</h1>
                    </v-flex>
                    <!-- //todo validate -->
                    <v-flex lg12 xs12 md12>
                      <v-text-field
                        dense
                        outlined
                        color="#49B18F"
                        placeholder="Username"
                        :prepend-icon="icons.mdiAccount"
                        v-model.trim="inputData.username"
                        :rules="[(v) => !!v || 'Please enter username']"
                      ></v-text-field>
                      <v-text-field
                        dense
                        outlined
                        color="#49B18F"
                        placeholder="Password"
                        :prepend-icon="icons.mdiKey"
                        v-model.trim="inputData.password"
                        @click:append="showpassword = !showpassword"
                        :type="showpassword ? 'text' : 'password'"
                        :append-icon="
                          showpassword ? icons.mdiEye : icons.mdiEyeOff
                        "
                        :rules="[(v) => !!v || 'Please enter password']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex lg12 xs12 md12>
                      <v-btn
                        class="white--text"
                        color="#49B18F"
                        @click="fn_login()"
                        >Login</v-btn
                      >
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-form>
    </v-container>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import {
  mdiHomeCityOutline,
  mdiAccount,
  mdiKey,
  mdiEye,
  mdiEyeOff,
} from "@mdi/js";
import Swal from "sweetalert2";
export default {
  components: {},
  data() {
    return {
      icons: { mdiHomeCityOutline, mdiAccount, mdiKey, mdiEye, mdiEyeOff },
      inputData: {
        username: "",
        password: "",
      },
      showpassword: false,
      loading: false,
      valid: true,
    };
  },
  methods: {
    async fn_login() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        let payload = {
          username: this.inputData.username,
          password: this.inputData.password,
        };
        console.log(payload);
        let response = await this.$store.dispatch("login_authen", payload);
        this.loading = false;
        console.log(response, "RESR");
        if (response.status === "OK") {
          // ! login
          this.$router.push("/");
        } else {
          // ! handle error
          Swal.fire({
            icon: "error",
            title: "Invalid username or password.",
          });
        }
      }
    },
    fn_register() {
      Swal.fire({
        icon: "warning",
        title: "ยังไม่สามารถใช้งานได้",
        text: "เพราะยังไม่ได้ทำ",
      });
    },
  },
};
</script>

<style scoped>
/* 
@import "@/style/vcard.css"; */
.outline {
  border: 1px solid green;
}
</style>
