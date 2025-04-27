<script lang="ts" setup>
const file = defineModel<File>("file");
const showDrops = ref(false);
const progress = ref(0);
const intervalId = ref();
const timeOutId = ref();
const [parent] = useAutoAnimate();
const status = ref("");
const isValidFile = ref();
const active = ref(false);
const subtitle = ref("");
const border = ref({
  color: "#E4E7EC",
  size: "1px",
});
const formatsEnabled = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
];
const validateFile = (item: File | undefined): boolean => {
  if (!item) return false;
  return formatsEnabled.includes(item.type);
};

watch(file, (value) => {
  initAnimation();
  isValidFile.value = validateFile(value);
});
watch(progress, (value) => {
  if (value === 100) {
    clearInterval(intervalId.value);
    status.value = "Listo";
    const size = Number(file.value?.size);
    if (isValidFile.value) {
      subtitle.value = `${(size / 1024).toFixed(2)} KB ${progress.value}% ${status.value}`;
    } else {
      border.value.color = "#F04438";
      border.value.size = "2px";
      subtitle.value =
          "Error en la carga, por favor intenta nuevamente. </br> <span class='font-weight-bold'>Formato no valido</span>";
    }
  }
});

const initAnimation = () => {
  if (status.value === "Listo") {
    status.value = "";
    progress.value = 0;
    clearInterval(intervalId.value);
    clearTimeout(timeOutId.value);
    showDrops.value = false;
    active.value = false;
    border.value.color = "#E4E7EC";
    border.value.size = "1px";

  }
  status.value = "Cargando...";
  const size = Number(file.value?.size);
  subtitle.value = `${(size / 1024).toFixed(2)} KB ${progress.value}% ${status.value}`;
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
const emits = defineEmits(["import-players"]);
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
          <p class="subtitle" v-html="subtitle"></p>
        </div>
        <div class="progress-circular-container">
          <transition-fade group :duration="100">
            <v-progress-circular
                key="progress-circular"
                v-if="status === 'Cargando...'"
                :rotate="360"
                color="primary"
                :size="30"
                width="4"
                :model-value="progress"
            ></v-progress-circular>
            <Icon
                key="checkbox"
                name="futzo-icon:check-box"
                v-else-if="status === 'Listo' && isValidFile"
            ></Icon>
            <Icon
                key="trash"
                name="futzo-icon:trash-error"
                size="30"
                class="cursor-pointer"
                @click="() => showDrops = false"
                v-else-if="status === 'Listo' && !isValidFile"
            ></Icon>
          </transition-fade>
        </div>
      </div>
    </div>
    <div class="actions" v-if="progress === 100">
      <v-btn
          :size="44"
          class="mr-1 rounded-lg"
          color="secondary"
          variant="outlined"
          style="width: calc(50% - 4px)"
      >
        Cancelar
      </v-btn>
      <v-btn
          :size="44"
          class="ml-1 rounded-lg"
          color="primary"
          style="width: calc(50% - 4px)"
          @click="() => emits('import-players')"
      >
        Confirmar
      </v-btn>
    </div>
  </div>
</template>
<style scoped lang="sass">
.drops-container
  padding: 1rem 24px
  width: 100%

.drop-row
  border-color: v-bind('border.color')
  border-width: v-bind('border.size')
  border-style: solid
  border-radius: 12px
  padding: 1rem
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

.actions
  margin-top: 32px
</style>
