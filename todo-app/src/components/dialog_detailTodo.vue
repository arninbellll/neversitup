<template>
  <div>
    <v-dialog v-model="shower" persistent max-width="650px">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card>
          <v-layout row wrap class="ma-0 ext-left">
            <v-card-title> Edit todo </v-card-title>
            <v-divider></v-divider>
            <v-flex lg12 xs12 md12 class="pa-2">
              <p>Title</p>
              <v-text-field color="#49B18F" dense outlined v-model="input.title">
              </v-text-field>
            </v-flex>
            <v-flex lg12 xs12 md12 class="pa-2">
              <p>Descriptions</p>
              <v-textarea color="#49B18F" dense outlined v-model="input.description">
              </v-textarea>
              <v-card-actions class="text-end" style="justify-content: center;">
                <v-btn @click="$emit('close')"> CLOSE </v-btn>
                <v-btn color="#49B18F" class="white--text" @click="fn_editTodo"> EDIT </v-btn>
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
  props: ["show" , "id"],
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
          this.fn_getDetailTodo()
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
    //Function get detail by ID
    async fn_getDetailTodo(){
      try {
          let tk = this.$cookies.get("todo_token");
          let header_api = { headers: { authorization: "Bearer " + tk } };
          console.log(header_api);
          let call_api = await this.axios.get(
            process.env.VUE_APP_API_TODO + "/todos/" + this.id,
            header_api
          );
          console.log(call_api, "TEST");
          if(call_api.statusText === 'OK'){
            this.input.title = call_api.data.title
            this.input.description =  call_api.data.description
          }
      } catch (error) {
        console.log(error);
         Swal.fire({
              icon: "error",
              title: "Error, somethimg wrong ",
              text: error,
            });
      }
    },
    //Function edit todo
    async fn_editTodo() {
      if (this.$refs.form.validate()) {
        try {
          let tk = this.$cookies.get("todo_token");
          let header_api = { headers: { authorization: "Bearer " + tk } };
          let payload = {
            title: this.input.title,
            description: this.input.description,
            dateTime: this.input.dateTime,
          };
          let call_api = await this.axios.put(
            process.env.VUE_APP_API_TODO + "/todos/" + this.id,
            payload,
            header_api
          );
          if (call_api.statusText === "OK") {
            Swal.fire({
              icon: "success",
              title: "Edit todo",
              text: "edit to do in your task success!",
            });
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
