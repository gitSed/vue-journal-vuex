<template>
  <div
    class="entry-container mb-3 pointer p-2"
    @click="$router.push({ name: 'entry', params: { id: entry.id } })"
  >
    <div class="entry-title d-flex">
      <span class="text-success fs-5 fw-bold">{{ day }}</span>
      <span class="mx-1 fs-5">{{ month }}</span>
      <span class="mx-2 fw-light">{{ yearDay }}</span>
    </div>
    <div class="entry-description">
      {{ shortText }}
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from "vue";

  /** Own */
  import { EntryType } from "../store/journal/types";
  import { getDayMonthYear } from "../helpers";

  export default defineComponent({
    props: {
      entry: {
        type: Object as PropType<EntryType>,
        required: true,
      },
    },
    computed: {
      shortText() {
        const length = this.entry.text.length;

        return length > 130
          ? this.entry.text.substring(0, 130) + " ..."
          : this.entry.text;
      },
      day() {
        const { day } = getDayMonthYear(this.entry.date);

        return day;
      },
      month() {
        const { month } = getDayMonthYear(this.entry.date);

        return month;
      },
      yearDay() {
        const { year } = getDayMonthYear(this.entry.date);

        return year;
      },
    },
  });
</script>

<style lang="scss" scoped>
  .entry-container {
    border-bottom: 1px solid #2c3e50;
    transition: 0.2s all ease-in;

    &:hover {
      background-color: lighten($color: grey, $amount: 45);
      transition: 0.2s all ease-in;
    }
    .entry-description {
      font-size: 12px;
    }
  }
</style>
