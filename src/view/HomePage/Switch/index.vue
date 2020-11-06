<template>
<div class="switch_all">
  <div class="row">
    <button class="switch_btn" @click="open" style="margin-left: 0" ref="open">
      开
    </button>
    <button class="switch_btn" @click="close" style="background: red" ref="close">
      关
    </button>
    <button class="switch_btn" @click="hover" ref="hover">停</button>
  </div>
</div>
</template>

<script>
import {
  SwicthControl
} from "../../../api/Switch";
export default {
  name: "index",
  components: {},
  data() {
    return {};
  },
  methods: {
    open() {
      this.disabled("true", 0);
      SwicthControl(1);
      setTimeout(() => {
        this.disabled("", 1);
      }, 5000);
    },
    close() {
      this.disabled(true, 0);
      SwicthControl(0);
      setTimeout(() => {
        this.disabled("", 1);
      });
    },
    hover() {
      this.disabled(true, 0);
      SwicthControl(0);
      setTimeout(() => {
        this.disabled("", 1);
      });
    },
    disabled(bool, num) {
      this.$refs.open.disabled = bool;
      this.$refs.close.disabled = bool;
      this.$refs.hover.disabled = bool;
      if (num == 0) {
        this.$refs.open.style.background = "#919191";
        this.$refs.close.style.background = "#919191";
        this.$refs.hover.style.background = "#919191";
      } else {
        this.$refs.open.style.background = "#1990ff";
        this.$refs.close.style.background = "red";
        this.$refs.hover.style.background = "#1990ff";
      }
    },
  },
};
</script>

<style>
.switch_btn {
  height: 3rem;
  width: 5rem;
  border: none;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1990ff;
  color: white;
  margin-left: 3rem;
  font-size: 1rem;
}

.switch_btn:hover {
  opacity: 0.8;
}

.row {
  display: flex;
  flex-direction: row;
}

.switch_all {
  padding: 4rem 2rem 2rem 3rem;
  display: flex;
}
</style>
