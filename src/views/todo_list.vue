<template>
  <v-app style="background-image: linear-gradient(0deg, #ebf3f9, #b2e7d6)">
    <v-container fill-height class="pa-4">
      <v-layout row warp class="ma-0">
        <v-flex lg12 xs12 md12 class="pa-2">
          <v-card>
            <h1 class="pa-4">TODO</h1>
            <v-divider></v-divider>
            <v-card-text>
                <!-- List TODO -->
              <v-layout v-if="listTodo.length > 0" row wrap>
                <v-flex lg12 md12 xs12 class="text-left">
                  <v-list>
                    <v-list-item-group>
                      <v-list-item
                        v-for="(item, index) in listTodo"
                        :key="index"
                        @dblclick="fn_gotoDetail(item)"
                      >
                        <template>
                          <v-list-item-content>
                            <v-list-item-title class="pt-1 pb-1 pr-1">
                              <span>{{ item.title }}</span>
                            </v-list-item-title>
                            <v-list-item-subtitle>
                              {{ item.description }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-checkbox
                              color="#49B18F"
                              :value="item._id"
                              v-model="listDone"
                            >
                            </v-checkbox>
                            <v-list-item-action-text>{{
                              fn_formatdatetimestamp(
                                item.createdAt,
                                "dd-MM-yyyy hh:mm"
                              )
                            }}</v-list-item-action-text>
                          </v-list-item-action>
                        </template>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-flex>
              </v-layout>
              <!-- Nodata -->
              <v-layout v-else row wrap justify-center>
                <v-flex lg12 md12 xs12 class="pa-2">
                  <v-icon size="64px">{{ icons.mdiListBoxOutline }}</v-icon>
                  <br />
                  <br />
                  <span>Empty press ' + ' for add new todo</span>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-card-actions class="text-center pa-2" style="justify-content: center;">
                <div class="pa-2">
                    <v-btn @click="open_dialogAdd = true" fab color="#49B18F">
                        <v-icon color="white">{{ icons.mdiPlus }}</v-icon>
                    </v-btn>
                </div>
                <div class="pa-2">
                    <v-badge  v-if="listDone.length > 0" offset-x="15" offset-y="15" color="#f4784b" :content="listDone.length">
                        <v-btn v-if="listDone.length > 0" class="" color="#f25822" fab @click="fn_deleteTodo()">
                            <v-icon color="white">{{ icons.mdiCloseCircleOutline}}</v-icon>
                        </v-btn>
                    </v-badge>
                </div>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <DialogAdd :show="open_dialogAdd" @close="fn_close()"></DialogAdd>
    <DialogDetail
      :show="open_dialogDetail"
      :id="id"
      @close="fn_close()"
    ></DialogDetail>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>
<script>
import {
  mdiPlus,
  mdiCheckCircleOutline,
  mdiCloseCircleOutline,
  mdiListBoxOutline,
} from "@mdi/js";
import Converter from "../converter/formateDateTime";
import DialogAdd from "../components/dialog_addTodo.vue";
import DialogDetail from "../components/dialog_detailTodo.vue";
import Swal from "sweetalert2";

export default {
  components: { DialogAdd, DialogDetail },
  data() {
    return {
      icons: {
        mdiPlus,
        mdiCheckCircleOutline,
        mdiCloseCircleOutline,
        mdiListBoxOutline,
      },
      loading: false,
      overlay: false,
      open_dialogAdd: false,
      open_dialogDetail: false,
      id: "",
      listMock: [
        { text: "TO Do 1", date: "10/10/2023" },
        { text: "TO Do 2", date: "10/10/2023" },
        { text: "TO Do 3", date: "10/10/2023" },
      ],
      listTodo: [],
      listDone: [],
    };
  },
  methods: {
    // Function get Todo list 
    async fn_getListTodo() {
      console.log(this.$cookies.get("todo_token"));
      try {
        this.loading = true;
        this.overlay = true;
        //get token by cookie
        let tk = this.$cookies.get("todo_token");
        let header_api = { headers: { authorization: "Bearer " + tk } };
        let call_api = await this.axios.get( process.env.VUE_APP_API_TODO + "/todos", header_api );
        console.log(call_api, " AAPP");
        if (call_api.statusText === "OK") {
          this.listTodo = call_api.data;
        }
        this.loading = false;
        this.overlay = false;
      } catch (error) {
        console.log(error);
        this.overlay = false;
      }
    },
    // Function Delete Todo
    fn_deleteTodo() {
      console.log(this.listDone, "DONE");
      Swal.fire({
        title: "Do you want to end task?",
        icon: "info",
        width: 450,
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            let tk = this.$cookies.get("todo_token");
            let header_api = { headers: { authorization: "Bearer " + tk } };
            // Check list if delete more than one
            for (let i = 0; i < this.listDone.length; i++) {
              const id = this.listDone[i];
              let call_api = await this.axios.delete( process.env.VUE_APP_API_TODO + "/todos/" + id, header_api);
              if (call_api.statusText === "OK") {
                this.$emit("close");
              }
            }
            Swal.fire({
              icon: "success",
              title: "Delete todo",
              text: "Delete to do in your task success!",
            });
            this.fn_getListTodo();
          } catch (error) {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Error, somethimg wrong ",
              text: error,
            });
          }
        }
      });
    },
    // function open dialog Add todo
    fn_addList(item) {
      this.listDone.push(item);
      console.log(this.listDone, "DOM");
    },
    // function open dialog eetail and edit
    fn_gotoDetail(_item) {
      console.log(_item);
      this.id = _item._id;
      this.open_dialogDetail = true;
    },
    fn_close() {
      this.fn_getListTodo();
      this.open_dialogDetail = false;
      this.open_dialogAdd = false;
    },
    // แปลงวันที่จาก timestamp
    fn_formatdatetimestamp(_date, _format) {
      return Converter.timestampToYYYYMMDD(_date, _format);
    },
  },
  mounted() {
    this.fn_getListTodo();
  },
};
</script>
