<template>
  <div id="card">
    <div
      @click="setHiddenActivityFromCard(id)"
      :style="{ marginRight: '8px', fontWeight: 600, cursor: 'pointer' }"
    >
      Hide
    </div>
    <div :style="{ position: 'relative' }">
      <img
        class="image"
        :style="{ background: title.includes('Camouflage') ? 'orange' : '#009688' }"
        :src="image_name"
        alt="thumbnail"
      />
      <div v-if="product === 'bpjr'" class="jr_text">Jr.</div>
    </div>
    <div class="headlines">
      <div class="headline">
        {{ title }}
      </div>
      <div class="subHeadline">
        {{ date }}
      </div>
    </div>
    <div class="info">
      <div class="score" v-if="show_score">
        Score:
        <span class="text_bold">{{ score }} /{{ possible_score }} </span>
      </div>
      <div
        class="text_bold"
        v-if="show_zoom"
        :style="{ cursor: 'pointer', display: 'flex', alignItems: 'center' }"
        @click="setModalStateFromCard()"
      >
        <img :style="{ marginRight: '4px' }" src="../assets/icons/show.svg" alt="show_icon" />
        View work
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "ActivityCard.css";
</style>

<script>
export default {
  name: "ActivityCard",
  props: {
    title: String,
    id: String,
    date: String,
    image_name: String,
    show_score: Boolean,
    show_zoom: Boolean,
    score: String,
    possible_score: String,
    handleModalStateFromCard: Function,
    comment: String,
    product: String,
    setHiddenActivityFromCard: Function
  },
  methods: {
    setModalStateFromCard() {
      return this.handleModalStateFromCard({
        isOpen: true,
        title: this.title,
        date: this.date,
        comment: this.comment,
        scores: this.score && this.score + "/" + this.possible_score,
        img_src: this.image_name
      });
    }
  }
};
</script>
