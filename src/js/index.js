document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menus-left");
  const overlay = document.getElementById("overlay");

  menuToggle.addEventListener("click", () => {
    const isHidden = menu.classList.contains("hidden");
    if (isHidden) {
      menu.classList.remove("hidden", "left-[-350px]");
      menu.classList.add("inline-block", "left-0");
      overlay.classList.remove("opacity-0", "invisible");
      document.body.classList.add("overflow-hidden");
    } else {
      menu.classList.remove("inline-block", "left-0");
      menu.classList.add("hidden", "left-[-350px]");
      overlay.classList.add("opacity-0", "invisible");
      document.body.classList.remove("overflow-hidden");
    }
  });

  overlay.addEventListener("click", () => {
    menu.classList.remove("inline-block", "left-0");
    menu.classList.add("hidden", "left-[-350px]");
    overlay.classList.add("opacity-0", "invisible");
    document.body.classList.remove("overflow-hidden");
  });
});

// upload area code
const uploadArea = document.getElementById("upload-area");
const fileInput = document.getElementById("file-input");
const uploadedFilesDiv = document.getElementById("uploaded-files");

// Handle file upload
const allowedTypes = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "video/mp4",
];
const maxSize = 50 * 1024 * 1024; // 50MB in bytes

const validateAndProcessFiles = (files) => {
  for (const file of files) {
    if (!allowedTypes.includes(file.type)) {
      alert(
        `File "${file.name}" is not allowed. Only JPEG, PNG, PDF, and MP4 are supported.`
      );
      continue;
    }
    if (file.size > maxSize) {
      alert(`File "${file.name}" exceeds 50MB limit.`);
      continue;
    }
    // Display the uploaded file name
    const fileDiv = document.createElement("div");
    fileDiv.className = "text-gray-700 text-sm mt-2";
    fileDiv.textContent = file.name;
    uploadedFilesDiv.appendChild(fileDiv);
    console.log(`File "${file.name}" is valid and ready for upload.`);
    // Add upload logic here (e.g., using FormData and fetch)
  }
};

// Drag and drop events
uploadArea.addEventListener("dragover", (e) => {
  e.preventDefault(); // Prevent default to allow drop
  console.log("Drag over detected");
  uploadArea.classList.add("border-blue-500", "bg-blue-50");
});

uploadArea.addEventListener("dragenter", (e) => {
  e.preventDefault(); // Prevent default on enter
  console.log("Drag enter detected");
});

uploadArea.addEventListener("dragleave", (e) => {
  e.preventDefault(); // Prevent default on leave
  console.log("Drag leave detected");
  uploadArea.classList.remove("border-blue-500", "bg-blue-50");
});

uploadArea.addEventListener("drop", (e) => {
  e.preventDefault(); // Prevent default to process drop
  console.log("Drop detected", e.dataTransfer.files);
  uploadArea.classList.remove("border-blue-500", "bg-blue-50");
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    validateAndProcessFiles(files);
  } else {
    console.log("No files dropped");
  }
});

// Click to upload
fileInput.addEventListener("change", (e) => {
  const files = e.target.files;
  console.log("File input changed", files);
  validateAndProcessFiles(files);
});

// Allow clicking the upload area to trigger file input
uploadArea.addEventListener("click", (e) => {
  if (!e.target.closest("label")) {
    console.log("Clicking upload area to trigger file input");
    fileInput.click();
  }
});

//tabs
document.addEventListener("DOMContentLoaded", () => {
  const tabGroups = document.querySelectorAll("[data-tab-group]");

  tabGroups.forEach((group) => {
    const buttons = group.querySelectorAll(".tab-buttons");
    const contentWrapper = group.nextElementSibling; // assumes content directly follows the group
    const contents = contentWrapper.querySelectorAll(".tab-contents");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-tab-target");

        // Update buttons
        buttons.forEach((b) => {
          b.setAttribute("aria-selected", "false");
          b.classList.remove("bg-white", "text-[#045e70]");
          b.classList.add("bg-[#EFF6F8]", "text-[#5D6E72]");
        });
        btn.setAttribute("aria-selected", "true");
        btn.classList.remove("bg-[#EFF6F8]", "text-[#5D6E72]");
        btn.classList.add("bg-white", "text-[#045e70]");

        // Update contents
        contents.forEach((content) => {
          if (content.getAttribute("data-tab-id") === targetId) {
            content.classList.remove("hidden");
            content.classList.add("block");
          } else {
            content.classList.remove("block");
            content.classList.add("hidden");
          }
        });
      });
    });
  });
});
//chart p5 - c1
const ctx = document.getElementById("sentimentChart").getContext("2d");

new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Positive", "Negative"],
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ["#10B981", "#FBBF24"], // Green & Yellow
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: true,
    cutout: "70%",
    rotation: -90,
    circumference: 180,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  },
});
//chart p5 - c2
const ctxs = document.getElementById("trafficChart").getContext("2d");

new Chart(ctxs, {
  type: "doughnut",
  data: {
    labels: ["Oggi", "Ultima settimana", "Ultimo mese"],
    datasets: [
      {
        data: [20456, 22187, 21290],
        backgroundColor: ["#3DC269", "#F91E4A", "#DDEFF8"], // green, red, light blue
        borderWidth: 1,
        borderColor: "#FFFFFF",
      },
    ],
  },
  options: {
    cutout: "70%",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.label + ": " + context.formattedValue;
          },
        },
      },
    },
  },
});
//chart p5 - c3

const ctxss = document.getElementById("keywords").getContext("2d");

new Chart(ctxss, {
  type: "bubble",
  data: {
    datasets: [
      {
        label: "Green Bubbles",
        data: [
          { x: 25, y: 30, r: 50 },
          { x: 10, y: 15, r: 30 },
          { x: 40, y: 10, r: 30 },
        ],
        backgroundColor: "#22c55e",
        borderColor: "#22c55e",
        customLabels: ["Utile", "Dividend", "Brand"],
      },
      {
        label: "Red Bubbles",
        data: [
          { x: 40, y: 40, r: 25 },
          { x: 50, y: 30, r: 20 },
        ],
        backgroundColor: "#ef4444",
        borderColor: "#ef4444",
        customLabels: ["Dazi", "FI"],
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.dataset.customLabels[context.dataIndex];
          },
        },
      },
      bubbleText: {
        minFontSize: 14,
        padding: 5,
        color: '#ffffff',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
      },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  },
  plugins: [
    {
      id: 'bubbleText',
      afterDatasetsDraw(chart, args, pluginOptions) {
        const {
          ctx,
          data,
          scales: { x, y },
        } = chart;

        const padding = pluginOptions.padding || 5;
        const minFontSize = pluginOptions.minFontSize || 14;

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        data.datasets.forEach((dataset) => {
          dataset.data.forEach((point, index) => {
            const xPos = x.getPixelForValue(point.x);
            const yPos = y.getPixelForValue(point.y);
            const label = dataset.customLabels?.[index];

            if (label) {
              // Estimate max font size with padding
              const maxFontSize = (point.r - padding) * 2 * 0.5;
              const fontSize = Math.max(minFontSize, Math.min(maxFontSize, point.r));

              ctx.font = `${pluginOptions.fontWeight || 'bold'} ${fontSize}px ${pluginOptions.fontFamily || 'sans-serif'}`;
              ctx.fillStyle = pluginOptions.color || '#fff';

              // Optional: shrink further if text is wider than bubble
              const textWidth = ctx.measureText(label).width;
              const maxTextWidth = (point.r - padding) * 2;

              if (textWidth > maxTextWidth) {
                const scaledFontSize = fontSize * (maxTextWidth / textWidth);
                ctx.font = `${pluginOptions.fontWeight || 'bold'} ${scaledFontSize}px ${pluginOptions.fontFamily || 'sans-serif'}`;
              }

              ctx.fillText(label, xPos, yPos);
            }
          });
        });

        ctx.restore();
      },
    },
  ],
});

//chart p5 - c4
const ctxa = document.getElementById("geografica").getContext("2d");

new Chart(ctxa, {
  type: "doughnut",
  data: {
    labels: ["Oggi", "Ultima settimana", "Ultimo mese"],
    datasets: [
      {
        data: [30, 30, 25, 15],
        backgroundColor: ["#3DC269", "#F91E4A", "#DDEFF8", "#9400BD"], // green, red, light blue
        borderWidth: 1,
        borderColor: "#FFFFFF",
      },
    ],
  },
  options: {
    cutout: "70%",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.label + ": " + context.formattedValue;
          },
        },
      },
    },
  },
});

// market p1 - c1
const data = {
  labels: ["0%", "2%", "4%", "6%", "8%", "10%", "12%"],
  datasets: [
    {
      label: "Epsilon",
      data: [{ x: 2, y: 2 }],
      borderColor: "green",
      backgroundColor: "green",
      pointRadius: 5,
      borderWidth: 2,
      fill: false,
    },
    {
      label: "Delta",
      data: [{ x: 4, y: 5 }],
      borderColor: "blue",
      backgroundColor: "blue",
      pointRadius: 5,
      borderWidth: 2,
      fill: false,
    },
    {
      label: "Beta",
      data: [{ x: 10, y: 7 }],
      borderColor: "indigo",
      backgroundColor: "indigo",
      pointRadius: 5,
      borderWidth: 2,
      fill: false,
    },
    {
      label: "Gamma",
      data: [{ x: 4, y: 1 }],
      borderColor: "purple",
      backgroundColor: "purple",
      pointRadius: 5,
      borderWidth: 2,
      fill: false,
    },
    {
      label: "Alpha",
      data: [{ x: 8, y: 4 }],
      borderColor: "red",
      backgroundColor: "red",
      pointRadius: 5,
      borderWidth: 2,
      fill: false,
    },
  ],
};

// Chart options
const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: "linear",
      position: "bottom",
      ticks: {
        callback: function (value) {
          return value + "%";
        },
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

// Render the chart
const ctxgagrs = document.getElementById("gagrs").getContext("2d");
new Chart(ctxgagrs, {
  type: "scatter",
  data: data,
  options: options,
});
// Render the chart
const ctxgagr = document.getElementById("gagr").getContext("2d");
new Chart(ctxgagr, {
  type: "scatter",
  data: data,
  options: options,
});

// price chart
const ctxprices = document
  .getElementById("pricePerformanceChart")
  .getContext("2d");

new Chart(ctxprices, {
  type: "line",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Epsilon",
        data: [1.2, 1.8, 2.5, 3.2, 3.8, 4.5, 5.2], // Adjust data to match visual trend
        borderColor: "#62b185", // Greenish
        backgroundColor: "transparent",
        borderWidth: 2,
        pointRadius: 0, // No points visible
        tension: 0.4, // For curved lines
      },
      {
        label: "Delta",
        data: [0.2, 0.8, 1.5, 2.2, 3.0, 4.0, 5.5], // Adjust data
        borderColor: "#57b9e6", // Lighter blue
        backgroundColor: "transparent",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
      },
      {
        label: "Beta",
        data: [0.8, 1.5, 2.0, 2.8, 3.5, 4.8, 5.8], // Adjust data
        borderColor: "#7eb3db", // Medium blue
        backgroundColor: "transparent",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
      },
      {
        label: "Gamma",
        data: [1.0, 1.6, 2.2, 2.9, 3.6, 4.3, 6.5], // Adjust data
        borderColor: "#2f5f6e", // Darker blue/teal
        backgroundColor: "transparent",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
      },
      {
        label: "Alpha",
        data: [2.0, 2.8, 3.5, 3.9, 4.1, 4.8, 4.3], // Adjust data
        borderColor: "#e0545f", // Reddish
        backgroundColor: "transparent",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide default Chart.js legend as we're creating a custom one
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Darker tooltip background
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        cornerRadius: 4,
        displayColors: true, // Show color box in tooltip
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // No vertical grid lines
          drawBorder: false, // No x-axis border line
        },
        ticks: {
          font: {
            size: 12,
            color: "#6B7280", // Gray text color for ticks
          },
          padding: 10,
        },
        offset: true, // Center labels between grid lines
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 10, // Max value on y-axis
        ticks: {
          stepSize: 1, // 0, 1, 2...10
          font: {
            size: 12,
            color: "#6B7280", // Gray text color for ticks
          },
          padding: 10,
        },
        grid: {
          color: "rgba(0, 0, 0, 0.08)", // Light gray horizontal grid lines
          drawBorder: false, // No y-axis border line
        },
      },
    },
  },
});

//planning p5 - c4
const ctxshareholer = document.getElementById("shareholder").getContext("2d");

new Chart(ctxshareholer, {
  type: "doughnut",
  data: {
    labels: [
      "Partecipazioni strategiche",
      "Fondazioni",
      "Investitori istituzionali",
      "Azioni proprie",
      "Non rilevati e Retail",
    ],
    datasets: [
      {
        data: [40, 20, 15, 10, 5],
        backgroundColor: [
          "#01B0F1",
          "#F91E4A",
          "#3DC269",
          "#9400BD",
          "#045E70",
        ], // green, red, light blue
        borderWidth: 1,
        borderColor: "#FFFFFF",
      },
    ],
  },
  options: {
    cutout: "70%",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.label + ": " + context.formattedValue;
          },
        },
      },
    },
  },
});
//ownership p5 - c4
const ctxownership = document.getElementById("ownership").getContext("2d");

new Chart(ctxownership, {
  type: "doughnut",
  data: {
    labels: [
      "Partecipazioni strategiche",
      "Fondazioni",
      "Investitori istituzionali",
      "Azioni proprie",
      "Non rilevati e Retail",
    ],
    datasets: [
      {
        data: [40, 20, 15, 10, 5],
        backgroundColor: [
          "#01B0F1",
          "#F91E4A",
          "#3DC269",
          "#9400BD",
          "#045E70",
        ], // green, red, light blue
        borderWidth: 1,
        borderColor: "#FFFFFF",
      },
    ],
  },
  options: {
    cutout: "70%",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.label + ": " + context.formattedValue;
          },
        },
      },
    },
  },
});
//dropdown
// tab switch
