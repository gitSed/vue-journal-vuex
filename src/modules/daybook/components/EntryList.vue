<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input
        type="text"
        class="form-control"
        placeholder="Buscar entradas"
        v-model="term"
      />
    </div>
    <div class="mt-2 d-flex flex-column">
      <button @click="goToNewEntryCreationPath" class="btn btn-primary mx-3">
        <i class="fa fa-plus-circle" />
        Nueva entrada
      </button>
    </div>
    <div class="entry-scrollarea">
      <Entry v-for="entry in entriesByTerm" :key="entry.id" :entry="entry" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent } from "vue";

  /** Third-Party */
  import { mapGetters } from "vuex";

  /** Own */
  import { EntryListComponentType } from "../types";

  export default defineComponent<EntryListComponentType>({
    components: {
      Entry: defineAsyncComponent(() => import("./Entry.vue")),
    },
    computed: {
      ...mapGetters("journal", {
        getEntriesByTerm: "getEntriesByTerm",
      }),
      entriesByTerm() {
        return this.getEntriesByTerm(this.term);
      },
    },
    data(): Record<string, unknown> {
      return {
        term: "",
      };
    },
    methods: {
      goToNewEntryCreationPath() {
        this.$router.push({ name: "entry", params: { id: "new" } });
      },
    },
  });
</script>

<style lang="scss" scoped>
  .entry-list-container {
    border-right: 1px solid #2c3e50;
    height: calc(100vh - 56px);
  }
  .entry-scrollarea {
    height: calc(100vh - 110px);
    overflow: scroll;
  }
</style>
