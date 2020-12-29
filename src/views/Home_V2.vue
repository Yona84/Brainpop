<template>
  <div id="wrapper">
    <div id="header_title">Timeline</div>
    <div class="modal" v-if="modal_state.isOpen">
      <div class="modal_wrapper">
        <div @click="closeModal()" class="close_button">
          <img src="../assets/icons/close.svg" alt="close_icon" />
        </div>
        <img
          :style="{ background: modal_state.title.includes('Camouflage') ? 'orange' : '#009688' }"
          class="image"
          :src="modal_state.img_src"
          alt="image"
        />
        <div class="modal_title">{{ modal_state.title }}</div>
        <div class="modal_date">{{ modal_state.date }}</div>
        <div class="modal_comment">{{ modal_state.comment }}</div>
        <div v-if="modal_state.scores" class="modal_score">
          Score
          <span class="text_bold">{{ modal_state.scores }}</span>
        </div>
      </div>
    </div>
    <div :style="{ position: 'relative', width: 'max-content', marginBottom: '32px' }">
      <div style="position:relative" v-bind:class="{ open: openActivity }">
        <vs-input class="input" placeholder="Search" v-model="search" @input="onInputChange" />
        <ul class="dropdown-menu" style="width:100%" v-if="this.open">
          <li
            :style="{ cursor: 'pointer', padding: '8px' }"
            v-for="activity in getActivitiesList"
            v-bind:class="{ active: false }"
            @click="activityClick(activity.id)"
            v-bind:key="activity.id"
          >
            <span>{{ activity.title }}</span>
          </li>
        </ul>
      </div>
      <img class="search_icon" src="../assets/icons/search.svg" alt="search_icon" />
    </div>
    <div :style="{ display: 'flex', alignItems: 'center', marginBottom: '16px' }">
      <div
        :style="{
          background: filter.value === getFilter ? 'rgba(0, 150, 136,0.2)' : 'initial'
        }"
        @click="setFilterBy(filter.value)"
        class="filter"
        v-bind:key="filter.text"
        v-for="(filter, index) in filters"
        v-bind:index="index"
        v-bind:is_selected="filter.isSelected"
      >
        <img src="../assets/icons/search.svg" v-if="filter.isSelected" alt="selected" />
        {{ filter.text }}
      </div>
    </div>
    <div
      @click="showAllActivities()"
      :style="{ margin: 'auto', color: '#009688', fontWeight: 600, cursor: 'pointer' }"
    >
      Show All Hidden Activities
    </div>
    <div class="header" v-if="getActivitiesListOct.length > 0">October</div>
    <ActivityCard
      :handleModalStateFromCard="handleModalState"
      v-for="(activity, index) in getActivitiesListOct"
      v-bind:index="index"
      v-bind:title="activity.title"
      v-bind:id="activity.id"
      v-bind:key="activity.id"
      v-bind:date="activity['d_created']"
      v-bind:image_name="activity['image_name']"
      v-bind:score="activity.score"
      v-bind:show_score="activity['show_score']"
      v-bind:possible_score="activity['possible_score']"
      v-bind:show_zoom="activity['show_zoom']"
      v-bind:comment="activity.comment"
      v-bind:product="activity.product"
      :setHiddenActivityFromCard="setHiddenActivity"
    ></ActivityCard>
    <div class="header" v-if="getActivitiesListSep.length > 0">September</div>
    <ActivityCard
      :handleModalStateFromCard="handleModalState"
      v-for="(activity, index) in getActivitiesListSep"
      v-bind:index="index"
      v-bind:id="activity.id"
      v-bind:title="activity.title"
      v-bind:key="activity.id"
      v-bind:date="activity['d_created']"
      v-bind:score="activity.score"
      v-bind:show_score="activity['show_score']"
      v-bind:image_name="activity['image_name']"
      v-bind:possible_score="activity['possible_score']"
      v-bind:show_zoom="activity['show_zoom']"
      v-bind:comment="activity.comment"
      v-bind:product="activity.product"
      :setHiddenActivityFromCard="setHiddenActivity"
    ></ActivityCard>
    <div class="header" v-if="getActivitiesListAug.length > 0">August</div>
    <ActivityCard
      :handleModalStateFromCard="handleModalState"
      v-for="(activity, index) in getActivitiesListAug"
      v-bind:image_name="activity['image_name']"
      v-bind:index="index"
      v-bind:id="activity.id"
      v-bind:key="activity.id"
      v-bind:title="activity.title"
      v-bind:date="activity['d_created']"
      v-bind:score="activity.score"
      v-bind:possible_score="activity['possible_score']"
      v-bind:show_score="activity['show_score']"
      v-bind:show_zoom="activity['show_zoom']"
      v-bind:comment="activity.comment"
      v-bind:product="activity.product"
      :setHiddenActivityFromCard="setHiddenActivity"
    ></ActivityCard>
    <div
      @click="handleShowMoreActivities()"
      class="load_more"
      :style="{ display: 'flex', alignItems: 'center' }"
    >
      <img
        src="../assets/icons/arrow.svg"
        alt="arrow"
        :style="{ transform: showMoreActivities ? 'rotate(180deg)' : 'none' }"
      />
      {{ !showMoreActivities ? "Load More" : "Load Less" }}
    </div>
  </div>
</template>

<style scoped>
@import "Home.css";
</style>

<script>
import moment from "moment";
import ActivityCard from "../components/ActivityCard";

export default {
  name: "home",
  components: {
    ActivityCard
  },
  data() {
    return {
      open: false,
      search: "",
      filters: [
        {
          text: "All Work",
          value: null
        },
        {
          text: "Movie",
          value: "movie"
        },
        {
          text: "Quiz",
          value: "quiz"
        },
        {
          text: "Easy Quiz",
          value: "easy_quiz"
        },
        {
          text: "Make-a-Map",
          value: "make_a_map"
        },
        {
          text: "Make-a-movie",
          value: "make_a_movie"
        },
        {
          text: "Word play",
          value: "word_play"
        },
        {
          text: "Related Reading",
          value: "related_reading"
        },
        {
          text: "Challenge",
          value: "challenge"
        },
        {
          text: "Draw About it",
          value: "draw_about_it"
        }
      ],
      idsForActivityToHide: [],
      showMoreActivities: false,
      activities: [],
      filter: "",
      activitiesAug: [],
      activitiesSep: [],
      activitiesOct: [],
      modal_state: {
        isOpen: false,
        title: "",
        date: "",
        comment: "",
        scores: "",
        img_src: ""
      }
    };
  },
  methods: {
    capitalFirstLatterOfString(str) {
      return str.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    },
    handleShowMoreActivities() {
      this.showMoreActivities = !this.showMoreActivities;
    },
    setFilterBy(filterBy) {
      this.filter = filterBy;
    },
    onInputChange() {
      if (this.open === false) {
        this.open = true;
      }
    },
    fetchActivities() {
      const myRequest = new Request("http://localhost:3000/activities/v2");

      fetch(myRequest)
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.activities = data.map(activity => ({
            ...activity.activities.map(activity => {
              return activity;
            })[0],
            d_created: moment.unix(activity.activities[0].d_created).format("lll"),
            image_name: this.getProperImageSrc(activity.activities[0]["topic_data"].icon_path),
            resource_type: activity["resource_type"],
            title:
              this.capitalFirstLatterOfString(activity.activities[0]["topic_data"].name) +
              " " +
              this.capitalFirstLatterOfString(activity["resource_type"])
          }));
        })
        .catch(error => {
          console.log(error);
        });
    },
    filterAndMapActivitiesByMonth(activities, month) {
      return activities.filter(activity => activity.d_created.includes(month));
    },
    getProperImageSrc(path) {
      switch (true) {
        case path.includes("cells"): {
          return require("../assets/cells.png");
        }
        case path.includes("camouflage"): {
          return require("../assets/camouflage.png");
        }
        case path.includes("adalovelace"): {
          return require("../assets/adalovelace.png");
        }
        case path.includes("dna"): {
          return require("../assets/dna.png");
        }
        case path.includes("dogs"): {
          return require("../assets/dogs.png");
        }
        default:
          return require("../assets/cells.png");
      }
    },
    handleModalState(state) {
      this.modal_state = state;
    },
    closeModal() {
      this.modal_state = {
        isOpen: false,
        title: "",
        date: "",
        comment: "",
        scores: "",
        img_src: ""
      };
    },
    showAllActivities() {
      this.idsForActivityToHide = [];
      localStorage.setItem("ids", JSON.stringify([]));
    },
    setHiddenActivity(id) {
      this.idsForActivityToHide.push(id);
      localStorage.setItem("ids", JSON.stringify(this.idsForActivityToHide));
    },
    openActivity() {
      return this.search !== "" && this.getActivitiesList.length !== 0 && this.open === true;
    },
    activityClick(id) {
      this.search = this.activities.find(activity => activity.id === id).title;
      this.open = false;
    },
    setHandleScoreModalByType(type) {
      switch (true) {
        case type.includes("movie"): {
          return {
            score: false,
            zoom: false
          };
        }
        case type.includes("quiz"): {
          return {
            score: true,
            zoom: true
          };
        }
        case type.includes("easy_quiz"): {
          return {
            score: true,
            zoom: true
          };
        }
        case type.includes("challenge"): {
          return {
            score: true,
            zoom: true
          };
        }
        case type.includes("make_a_map"): {
          return {
            score: false,
            zoom: true
          };
        }
        case type.includes("make_a_movie"): {
          return {
            score: false,
            zoom: true
          };
        }
        case type.includes("wordplay"): {
          return {
            score: false,
            zoom: true
          };
        }
        case type.includes("related_reading"): {
          return {
            score: false,
            zoom: false
          };
        }
        case type.includes("draw_about_it"): {
          return {
            score: false,
            zoom: true
          };
        }
        default:
          return {
            score: false,
            zoom: false
          };
      }
    }
  },
  computed: {
    getActivitiesList() {
      return this.activities
        .filter(activity => {
          return this.search
            ? activity.title.toLowerCase().includes(this.search.toLowerCase())
            : this.filter
            ? activity["resource_type"] === this.filter
            : true;
        })
        .slice(0, this.showMoreActivities ? this.activities.length : 10)
        .filter(activity => !this.getIdsToHide.includes(activity.id));
    },
    getFilter() {
      return this.filter;
    },
    getActivitiesListAug() {
      return this.filterAndMapActivitiesByMonth(this.getActivitiesList, "Aug");
    },
    getActivitiesListSep() {
      return this.filterAndMapActivitiesByMonth(this.getActivitiesList, "Sep");
    },
    getActivitiesListOct() {
      return this.filterAndMapActivitiesByMonth(this.getActivitiesList, "Oct");
    },
    getIdsToHide() {
      return this.idsForActivityToHide;
    }
  },
  mounted() {
    this.fetchActivities();
    let ids = JSON.parse(localStorage.getItem("ids"));
    if (ids) {
      this.idsForActivityToHide = ids;
    }
  }
};
</script>
