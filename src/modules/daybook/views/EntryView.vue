<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
      </div>
      <div>
        <input
          v-show="false"
          ref="imageSelector"
          @change="onImageSelected"
          type="file"
          accept="image/png, image/jpeg"
        />
        <button
          v-if="entry?.id"
          @click="removeEntry"
          class="btn btn-danger mx-2"
        >
          Borrar
          <i class="fa fa-trash-alt"></i>
        </button>
        <button @click="onSelectImage" class="btn btn-primary">
          Subir foto
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>
    <hr />
    <div class="d-flex flex-column px-3 h-75">
      <textarea v-model="entry.text" placeholder="¿Qué sucedió hoy?"></textarea>
    </div>
  </template>
  <Fab icon="fa-save" @onClick="saveEntry" />
  <img
    v-if="entry?.picture && !localImage"
    :src="entry.picture"
    alt="entry-picture"
    class="img-thumbnail"
  />
  <img
    v-if="localImage"
    :src="localImage"
    alt="entry-picture"
    class="img-thumbnail"
  />
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent } from "vue";

  /** Third-Party */
  import { mapGetters, mapActions } from "vuex";
  import Swal from "sweetalert2";

  /** Own */
  import { EntryType } from "../store/journal/types";
  import { getDayMonthYear, uploadImage } from "../helpers";
  import { EntryViewDataType } from "../types";

  export default defineComponent({
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    components: {
      Fab: defineAsyncComponent(() => import("../components/Fab.vue")),
    },
    data(): EntryViewDataType {
      return {
        entry: null,
        localImage: null,
        file: null,
      };
    },
    computed: {
      ...mapGetters("journal", ["getEntryById"]),
      day(): number | string {
        if (!this.entry) return "";

        const { day } = getDayMonthYear(this.entry.date);

        return day;
      },
      month() {
        if (!this.entry) return "";

        const { month } = getDayMonthYear(this.entry.date);

        return month;
      },
      yearDay() {
        if (!this.entry) return "";

        const { year } = getDayMonthYear(this.entry.date);

        return year;
      },
    },
    methods: {
      ...mapActions("journal", ["updateEntry", "createEntry", "deleteEntry"]),
      loadEntry(): EntryType | undefined {
        let entry: EntryType;

        if (this.id === "new") {
          entry = {
            id: null,
            text: "",
            date: new Date().toDateString(),
            picture: null,
          };
        } else {
          entry = this.getEntryById(this.id);

          if (!entry) {
            this.$router.push({ name: "no-entry" });

            return;
          }
        }

        this.entry = entry;
      },
      async saveEntry() {
        Swal.fire({
          title: "Espere por favor",
          allowOutsideClick: true,
          backdrop: true,
          showConfirmButton: false,
        });
        Swal.showLoading();

        if (this.entry)
          this.entry.picture = this.file ? await uploadImage(this.file) : null;

        if (this.entry?.id) {
          await this.updateEntry(this.entry);
        } else {
          const entryId = await this.createEntry(this.entry);

          this.$router.push({ name: "entry", params: { id: entryId } });
        }

        Swal.fire("Guardado", "Entrada registrada con éxito", "success");
        this.file = null;
      },
      async removeEntry() {
        const { isConfirmed } = await Swal.fire({
          title: "¿Estas seguro?",
          text: "Una vez borrado, no se puede recuperar",
          showDenyButton: true,
          confirmButtonText: "Si, estoy seguro",
        });

        if (this.entry?.id && isConfirmed) {
          Swal.fire({
            title: "Espere por favor",
            allowOutsideClick: true,
            backdrop: true,
          });
          Swal.showLoading();

          const entryId: string | null = await this.deleteEntry(this.entry.id);

          if (entryId) {
            this.$router.push({ name: "no-entry" });
            Swal.fire("Eliminado", "", "success");
          } else {
            Swal.fire(
              "No se ha podido eliminar, intena nuevamente",
              "",
              "error"
            );
          }
        }
      },
      onImageSelected(event: Event) {
        const { files } = event.target as any;

        const file = files.length && files[0];

        if (!file) {
          this.file = null;
          return;
        }

        this.file = file;

        const fr = new FileReader();
        fr.onload = () => (this.localImage = fr.result);
        fr.readAsDataURL(file);
      },
      onSelectImage() {
        (this.$refs.imageSelector as any).click();
      },
    },
    created() {
      this.loadEntry();
    },
    watch: {
      id() {
        this.loadEntry();
      },
    },
  });
</script>

<style lang="scss" scoped>
  textarea {
    font-size: 20px;
    border: none;
    height: 100%;

    &:focus {
      outline: none;
    }
  }
  img {
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
  }
</style>
