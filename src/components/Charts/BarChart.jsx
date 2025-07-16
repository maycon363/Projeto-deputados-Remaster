import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

export function BarChart({ chartData }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Permite ajustar altura manualmente
    plugins: {
      legend: {
        display: false, // Oculta legenda se só tem uma série
      },
      title: {
        display: true,
        text: "Gastos Mensais (R$)",
        font: {
          size: 18,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const valor = context.raw.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            });
            return `${context.label}: ${valor}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `R$ ${value.toLocaleString("pt-BR")}`;
          },
        },
        title: {
          display: true,
          text: "Valor (R$)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Mês",
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}
