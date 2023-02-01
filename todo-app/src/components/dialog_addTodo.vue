<template>
  <div>
    <v-dialog v-model="shower" persistent max-width="650px">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card>
          <v-layout row wrap class="ma-0 text-left">
            <v-card-title> Add new task </v-card-title>
            <v-divider></v-divider>
            <v-flex lg12 xs12 md12 class="pa-2">
              <p>Title</p>
              <v-text-field  color="#49B18F" dense outlined v-model="input.title" :rules="[(v) => !!v || 'Please enter title']">
              </v-text-field>
            </v-flex>
            <v-flex lg12 xs12 md12 class="pa-2">
              <p>Descriptions</p>
              <v-textarea  color="#49B18F" dense outlined v-model="input.description">
              </v-textarea>
              <v-card-actions class="text-end" style="justify-content: center;">
                <v-btn @click="$emit('close')"> CLOSE </v-btn>
                <v-btn color="#49B18F" class="white--text" @click="fn_addTodo"> SAVE </v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>
<script>
import Swal from "sweetalert2";

export default {
  props: ["show"],
  data: function () {
    return {
      valid: true,
      loading: false,
      input: {
        title: "",
        description: "",
        dateTime: "",
      },
    };
  },
  computed: {
    shower: {
      get() {
        if (this.show === true) {
          return this.show;
        } else {
          return false;
        }
      },
      set(value) {
        if (!value) {
          this.$emit("close", false);
        }
      },
    },
  },
  methods: {
    //Function Add todo
    async fn_addTodo() {
      if (this.$refs.form.validate()) {
        try {
          let tk = this.$cookies.get("todo_token");
          let header_api = { headers: { authorization: "Bearer " + tk } };
          let payload = {
            title: this.input.title,
            description: this.input.description,
            dateTime: this.input.dateTime,
          };
          let call_api = await this.axios.post(
            process.env.VUE_APP_API_TODO + "/todos/",
            payload,
            header_api
          );
        //   console.log(call_api, "TEST");
          if (call_api.statusText === "OK") {
            Swal.fire({
              icon: "success",
              title: "Add todo",
              text: "add to do in your task success!",
            });
            this.input.title = '',
            this.input.description = '',
            this.$emit('close')
          }
        } catch (error) {
          console.log(error);
            Swal.fire({
              icon: "error",
              title: "Error, somethimg wrong ",
              text: error,
            });
        }
      }
    },
  },
};
</script>
