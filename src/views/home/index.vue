<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement>();
import Chart from 'chart.js/auto';

let chart: null | Chart<any> = null;
onMounted(() => {
  const data2 = {
    labels: Array.from({ length: 7 }).map((_, index) => `${index + 1}月`),
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
      ],
      borderWidth: 1,
    }],
  };

  chart = new Chart(canvasRef.value!, {
    type: 'pie',
    data: data2,
    options: {
      events: ['click'],
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Pie Chart',
        },
      },
    },
  });
  // obj = chart._
  // click = chart._listeners.click;
  // chart.unbindEvents();
  // chart.bindEvents();
});
chart;
function handleClick() {
  // click?.({
  //   ...e,
  //   type: 'click',
  //   native: {
  //     type: 'click',
  //   },
  // }, e.offsetX, e.offsetY);
}
</script>

<template>
  <div>
    <canvas ref="canvasRef" @click="handleClick"></canvas>
  </div>
</template>

<style scoped>
canvas{
  height: 200px;
  width: 200px;
}
</style>