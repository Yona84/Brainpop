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

<style>
#card {
  width: 100%;
  border: 2px solid grey;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 16px;
  position: relative;
  margin: 10px 0;
}
#card::before {
  position: absolute;
  content: "'";
  left: 32px;
  top: -22px;
  border-right: 6px solid #827c7cb3;
  color: #827c7cb3;
}
.info {
  margin-left: auto;
  display: flex;
  align-items: center;
}
.score {
  color: #009688;
  margin-right: 24px;
}
.text_bold {
  color: #009688;
  font-weight: 900;
}
.jr_text {
  width: 20px;
  height: 20px;
  position: absolute;
  bottom: 4px;
  font-size: 12px;
  font-weight: 500;
  padding-left: 3px;
  right: 2px;
  background: #ecad39b8;
  border-radius: 50%;
  border: 1px solid white;
}
.image {
  width: 48px;
  height: 48px;
  margin-right: 8px;
  border-radius: 50%;
  border: 1px solid white;
  padding: 6px;
}
.headlines {
  display: flex;
  flex-direction: column;
  text-align: left;
}
.headline {
  color: black;
  font-weight: 600;
  font-size: 16px;
}
.subHeadline {
  color: grey;
  font-weight: 300;
  font-size: 14px;
}
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
