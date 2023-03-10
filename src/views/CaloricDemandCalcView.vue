<template>
  <div class="about">
    <h1>Caloric demand calculator</h1>
    
    <div v-if="!inputsLoaded">
      Loading...
    </div>

    <div v-if="inputsLoaded" class="form-wrapper">
      
      <FormCheck :fields="missingFields" />

      <form>
        <label>
          Age <input type="number" v-model="userInput.age" required>
        </label>
        <hr>
        Gender:
        <label v-for="(gender, i) in inputsData.gender" :key="i">
          <input type="radio" v-model="userInput.gender" :value="gender"> {{gender}}
        </label>
        <hr>
        <label>
          Work type:
          <select v-model="userInput.workType">
            <option v-for="(type, i) in inputsData.workType" :key="i" :value="type">{{ type }}</option>
          </select>
        </label>
        <hr>
        <label>
          Number of trainings weekly: <input type="number" v-model="userInput.trainingsWeekly">
        </label>
        <hr>
        <label>
          Trainings intensity:
          <select v-model="userInput.trainingsIntensity">
            <option v-for="(type, i) in inputsData.trainingsIntensity" :key="i" :value="type">{{ type }}</option>
          </select>
        </label>
        <hr>
        <label>
          Average single training duration [h]: <input type="number" v-model="userInput.avTrainingDuration">
        </label>
        <hr>

        <div v-if="caloriesDemand">
          <strong>Your daily calories demand is: {{ caloriesDemand }}</strong>
        </div>

        <button type="submit" @click.prevent="sendData">Check</button>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive, onMounted, computed } from 'vue';
  import { calcData, checkInputs, getInitData } from '../services/CaloricDemandCalc.js';
  import FormCheck from '../components/FormCheck.vue';

  let inputsData = reactive({});
  let missingFields = ref([]);
  let caloriesDemand = ref('');

  const inputsLoaded = computed(() => {
    return !!Object.keys(inputsData).length;
  });

  const userInput = reactive({
    age: null,
    gender: undefined,
    workType: undefined,
    trainingsWeekly: null,
    trainingsIntensity: undefined,
    avTrainingDuration: null
  });

  async function sendData () {
    missingFields.value = checkInputs(userInput);
    caloriesDemand.value = await calcData(userInput);
  }

  onMounted(async () => {
    const initData = await getInitData();
    Object.assign(inputsData, initData);
  });
</script>

<style>
hr {
  margin-top: 5px;
  margin-bottom: 5px;
}
.form-wrapper {
  background: #dadada;
  padding: 20px;
}
strong {
  font-weight: bold;
}
</style>
