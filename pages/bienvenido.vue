<script lang="ts" setup>
definePageMeta({
  layout: 'blank',
  bodyAttrs: {
    class: 'd-none'
  }
});

</script>

<template>
  <v-sheet height="100%" class="d-flex justify-center align-center">
    <v-card class="w-lg-50 w-md-50" >
     <div class="logo-container" >
       <Logo max-width="165" />
     </div>
      <v-card-item class="d-flex align-center justify-center">
        <v-card-title>
          <h1 class="font-weight-bold text-h5">Vamos a crear tu primera liga</h1>
        </v-card-title>
      </v-card-item>
      <v-card-text>
       <v-form class="w-50 mx-auto">
        <v-text-field
            label="Nombra tu liga"
            variant="outlined"
            hint="Ejemplo: Liga de amigos"
            persistent-hint
        >
          <template #append-inner>
            <Icon name="ph:question" size="20"></Icon>
          </template>
        </v-text-field>
       </v-form>
        <v-card-actions>
          <v-btn
              class="ml-auto text-capitalize"
              color="primary"
              variant="elevated"
              size="large"
              density="default"
          >
            Crear liga
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>
<style >
footer{
  display: none !important;
}
.logo-container {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  text-align: center;
}


</style>