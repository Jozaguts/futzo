<script lang="ts" setup>
const file = defineModel<File>("file");
const showDrops = ref(false);
const progress = ref(0);
const intervalId = ref();
const timeOutId = ref();
const [parent] = useAutoAnimate();
const status = ref("");

const formatsEnabled = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
];
const validateFile = (item: File | undefined): boolean => {
  if (!item) return false;
  return formatsEnabled.includes(item.type);
};

watch(file, (value) => {
  if (validateFile(value)) {
    initAnimation();
  } else {
    showDrops.value = false;
    active.value = false;
  }
});
watch(progress, (value) => {
  if (value === 100) {
    clearInterval(intervalId.value);
    status.value = "listo";
  }
});
const active = ref(false);
const fileSize = computed(() => {
  const size = Number(file.value?.size);
  return (size / 1024).toFixed(2);
});
const initAnimation = () => {
  status.value = "cargando...";
  showDrops.value = true;
  intervalId.value = setInterval(() => {
    if (progress.value === 100) {
      progress.value = 100;
    }
    progress.value += 10;
  }, 100);
  timeOutId.value = setTimeout(() => {
    active.value = true;
  }, 100);
};
onBeforeUnmount(() => {
  clearInterval(intervalId.value);
  clearTimeout(timeOutId.value);
});
</script>
<template>
  <div ref="parent" class="drops-container">
    <div v-if="showDrops" class="drop-row" :class="active ? 'active' : ''">
      <div class="__details">
        <div class="icon-container">
          <Icon name="futzo-icon:file-type" size="40"></Icon>
        </div>
        <div class="content-container">
          <p class="title">{{ file?.name }}</p>
          <p class="subtitle">
            {{ fileSize }} KB – {{ progress }}% {{ status }}
          </p>
        </div>
        <div class="progress-circular-container">
          <v-progress-circular
            :rotate="360"
            color="primary"
            :size="30"
            width="4"
            :model-value="progress"
          ></v-progress-circular>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="sass">
.drops-container
    padding: 1rem 24px
    width: 100%

.drop-row
    border: 1px solid #E4E7EC
    border-radius: 12px
    padding: 0 1rem
    width: 100%
    height: 100%
    min-height: 72px
    display: flex
    align-items: center
    background: #fff
    z-index: 9999

    > .__details
        width: 100%
        display: flex
        align-items: center

        > .icon-container, .content-container
            justify-self: flex-start

        > .content-container
            margin-left: 1rem

        > .progress-circular-container
            margin-left: auto

    > .title .subtitle
        font-size: 14px
        line-height: 20px

    > .title
        color: #344054
        font-weight: 500

    > .subtitle
        color: #475467
        font-weight: 400

.active
    position: relative
    z-index: 100
    overflow: hidden

.active::before
    animation: fill 1s ease-in both
    background: #F8FAFC
    content: ''
    width: 0
    height: 100%
    position: absolute
    z-index: -50
    left: 0

@keyframes fill
    0%
        width: 0
    10%
        width: 10%
    20%
        width: 20%
    30%
        width: 30%
    40%
        width: 40%
    50%
        width: 50%
    60%
        width: 60%
    70%
        width: 70%
    80%
        width: 80%
    90%
        width: 90%
    100%
        width: 100%

.progress-circular-container
    align-self: center
    justify-self: flex-end
</style>
