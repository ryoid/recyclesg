export default defineEventHandler((event) => {
  return {
    labels: [1, 2, 3, 4, 5, 6],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
});
