<template>
  <div>
    <v-card>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step step="1" :complete="step > 1">
            Select campaign settings
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="2" :complete="step > 2">
            Create an ad group
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3"> Create an ad </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card
              @drop.prevent="onDrop($event)"
              @dragover.prevent="dragover = true"
              @dragenter.prevent="dragover = true"
              @dragleave.prevent="dragover = false"
              :class="{ 'grey lighten-2': dragover }"
            >
              <v-card-text>
                <v-row
                  class="d-flex flex-column"
                  dense
                  align="center"
                  justify="center"
                >
                  <v-icon :class="[dragover ? 'mt-2, mb-6' : 'mt-5']" size="60">
                    mdi-cloud-upload
                  </v-icon>
                  <p>Drop your file(s) here, or click to select them.</p>
                </v-row>
                <v-virtual-scroll
                  v-if="uploadedFiles.length > 0"
                  :items="uploadedFiles"
                  height="150"
                  item-height="50"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item :key="item.name">
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ item.name }}
                          <span class="ml-3 text--secondary">
                            {{ item.size }} bytes</span
                          >
                        </v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-btn @click.stop="removeFile(item.name)" icon>
                          <v-icon> mdi-close-circle </v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>
                  </template>
                </v-virtual-scroll>
              </v-card-text>
            </v-card>

            <v-btn color="primary" @click="step = 2"> Continue </v-btn>

            <v-btn text> Cancel </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card>
              <v-img :src="pdfImage.src">
                <v-card
                  style="
                    position: absolute;
                    left: 190px;
                    top: 50px;
                    border: 1px solid red;
                    background-color: transparent;
                  "
                  height="50"
                  width="100"
                  flat
                ></v-card>
              </v-img>
            </v-card>

            <embed
              :src="pdfImage.src"
              width="500"
              height="375"
              type="application/pdf"
            />
            <object
              width="400"
              height="500"
              type="application/pdf"
              :data="pdfImage.src"
            >
              <p>
                Insert your error message here, if the PDF cannot be displayed.
              </p>
            </object>

            <v-btn color="primary" @click="step = 3"> Continue </v-btn>

            <v-btn text> Cancel </v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
            ></v-card>

            <v-btn color="primary" @click="step = 1"> Continue </v-btn>

            <v-btn text> Cancel </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
import FormData from "form-data";
export default {
  data() {
    return {
      step: 1,
      uploadedFiles: [],
      dragover: false,
      pdfImage: "",
    };
  },
  methods: {
    onDrop(e) {
      //https://george-hadjigeorgiou97.medium.com/step-by-step-custom-drag-drop-upload-component-in-vuetify-vue-2-43c99794643d
      this.dragover = false;
      console.log(e.dataTransfer.files);
      // Check if there are already uploaded files
      if (this.uploadedFiles.length > 0) this.uploadedFiles = [];
      if (!this.multiple && e.dataTransfer.files.length > 1) {
        this.$store.dispatch("addNotification", {
          message: "Only one file can be uploaded at a time..",
          colour: "error",
        });
      } else this.uploadedFiles.push(e.dataTransfer.files[0]);
      let reader = new FileReader();
      let image = new Image();

      reader.onload = (event) => {
        image.src = event.target.result;
      };
      reader.readAsDataURL(e.dataTransfer.files[0]);

      const formData = new FormData();
      formData.append(
        "instructions",
        JSON.stringify({
          parts: [
            {
              file: "document",
            },
          ],
          output: {
            type: "image",
            format: "jpg",
            dpi: 500,
          },
        })
      );
      formData.append("document", image);

      try {
        const response = axios.post(
          "https://api.pspdfkit.com/build",
          formData,
          {
            headers: formData.getHeaders({
              Authorization:
                "Bearer pdf_live_xpEfRhHp6shsCcJ6jpkQAkCN330iDn0j2fSbY0odpw5",
            }),
            responseType: "stream",
          }
        );

        console.log(response.data)
      } catch (e) {
        console.log(errorString);
      }

      this.pdfImage = image;
      console.log(image.height);
    },
    removeFile(fileName) {
      // Find the index of the
      const index = this.uploadedFiles.findIndex(
        (file) => file.name === fileName
      );
      // If file is in uploaded files remove it
      if (index > -1) this.uploadedFiles.splice(index, 1);
    },
  },
};
</script>