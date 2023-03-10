<script setup>
import { computed } from 'vue';

const props = defineProps({
  fields: {
    missingInputs: Array,
    required: true
  }
})

  const notification = computed(() => {
    return props.fields ? props.fields.join(', ') : '';
  });

</script>

<template>
  <div v-if="fields.length">
    <div class="form-warning">
      Please fill in the following fields: {{ notification }}
    </div>
  </div>
</template>

<style scoped>
  .form-warning {
    border: 1px solid red;
    padding: 5px;
    color: red;
    margin-bottom: 10px;
  }
</style>
