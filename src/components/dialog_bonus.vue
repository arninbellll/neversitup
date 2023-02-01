<template>
  <div>
    <v-dialog v-model="shower" persistent max-width="650px">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card>
          <v-layout row wrap class="ma-0">
            <v-card-title> Bonus find number </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-layout row wrap class="pa-2" v-if="result === ''">
                <v-flex lg12 class="pa-2 text-left">
                  <p>Set 1</p>
                </v-flex>
                <v-flex lg2 class="pa-2">
                  <v-text-field
                    color="#49B18F"
                    dense
                    outlined
                    v-model="input.ar1"
                    @change="fn_pushIt(input.ar1, 1)"
                    :rules="[(v) => !!v || 'enter number']"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex lg2 class="pa-2">
                  <v-text-field
                    color="#49B18F"
                    dense
                    outlined
                    v-model="input.ar2"
                    @change="fn_pushIt(input.ar2, 1)"
                    :rules="[(v) => !!v || 'enter number']"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex lg2 class="pa-2">
                  <v-text-field
                    color="#49B18F"
                    dense
                    outlined
                    v-model="input.ar3"
                    @change="fn_pushIt(input.ar3, 1)"
                    :rules="[(v) => !!v || 'enter number']"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex lg2 class="pa-2">
                  <v-text-field
                    color="#49B18F"
                    dense
                    outlined
                    v-model="input.ar4"
                    @change="fn_pushIt(input.ar4, 1)"
                    :rules="[(v) => !!v || 'enter number']"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex lg2 class="pa-2">
                  <v-text-field
                    color="#49B18F"
                    dense
                    outlined
                    v-model="input.ar5"
                    @change="fn_pushIt(input.ar5, 1)"
                    :rules="[(v) => !!v || 'enter number']"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex lg2 class="pa-2">
                  <v-text-field
                    color="#49B18F"
                    dense
                    outlined
                    v-model="input.ar6"
                    @change="fn_pushIt(input.ar6, 1)"
                    :rules="[(v) => !!v || 'enter number']"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex lg12 class="pa-2 text-left">
                  <p>Set 2</p>
                </v-flex>
                <v-flex lg2 class="pa-2">
                  <v-text-field
                    color="#49B18F"
                    dense
                    outlined
                    v-model="input.ra1"
                    @change="fn_pushIt(input.ra1, 2)"
                    :rules="[(v) => !!v || 'Please enter number']"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex lg2 class="pa-2">
                  <v-text-field
                    color="#49B18F"
                    dense
                    outlined
                    v-model="input.ra2"
                    @change="fn_pushIt(input.ra2, 2)"
                    :rules="[(v) => !!v || 'enter number']"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex lg2 class="pa-2">
                  <v-text-field
                    color="#49B18F"
                    dense
                    outlined
                    v-model="input.ra3"
                    @change="fn_pushIt(input.ra3, 2)"
                    :rules="[(v) => !!v || 'enter number']"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex lg2 class="pa-2">
                  <v-text-field
                    color="#49B18F"
                    dense
                    outlined
                    v-model="input.ra4"
                    @change="fn_pushIt(input.ra4, 2)"
                    :rules="[(v) => !!v || 'enter number']"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex lg2 class="pa-2">
                  <v-text-field
                    color="#49B18F"
                    dense
                    outlined
                    v-model="input.ra5"
                    @change="fn_pushIt(input.ra5, 2)"
                    :rules="[(v) => !!v || 'enter number']"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex lg2 class="pa-2">
                  <v-text-field
                    color="#49B18F"
                    dense
                    outlined
                    v-model="input.ra6"
                    @change="fn_pushIt(input.ra6, 2)"
                    :rules="[(v) => !!v || 'enter number']"
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout v-else row justify-center align-center class="pa-2">
                <v-flex lg2>
                  <h4>Result is:</h4>
                </v-flex>
                <v-flex lg4>
                  <div class="col-md-3 col-sm-6">
                    <div v-for="(num, i) in Found" :key="i">
                      <span class="pa-2" style="display: flex">{{ num }}</span>
                    </div>
                  </div>
                </v-flex>
              </v-layout>
            </v-card-text>
                <v-card-actions style="justify-content: center;">
                    <v-btn @click="$emit('close')"> CLOSE </v-btn>
                    <v-btn :disabled="result !== ''" color="#49B18F" class="white--text" @click="fn_findIt">Find it </v-btn>
            </v-card-actions>
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
      Arr1: [],
      Arr2: [],
      Found: [],
      result: "",
      input: {
        ar1: "",
        ar2: "",
        ar3: "",
        ar4: "",
        ar5: "",
        ar6: "",
        ra1: "",
        ra2: "",
        ra3: "",
        ra4: "",
        ra5: "",
        ra6: "",
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
    fn_pushIt(val, set) {
      console.log(val, "ll");
      if (set == 1) {
        this.Arr1.push(val);
      } else {
        this.Arr2.push(val);
      }
    },
    fn_findIt() {
      for (let i = 0; i < this.Arr1.length; i++) {
        const num = this.Arr1[i];
        this.Arr2.find((item) => {
          if (item === num) {
            this.Found.push(item);
          }
        });
      }
      this.result = "found";
      console.log(this.Found, "FOUNDDD");
      // this.Arr1.push()
    },
  },
};
</script>
