const industryLabels = [...areaMap.keys()];
const industryData = [...areaMap.values()];
const labels = industryLabels;
let ableToClick = true;
const data = {
  labels: labels,
  datasets: [
    {
      label: "Number of Food Services",
      backgroundColor: "#253494",
      // hoverBackgroundColor: "#225ea8",
      data: industryData,
      maxBarThickness: 80,
    },
  ],
};

const config = {
  type: "bar",
  data: data,
  options: {
    onHover: (event, chartElement) => {
      // console.log(chartElement);
      if (ableToClick == false) {
        document.getElementById("myChart").style.cursor = "default";
      } else {
        document.getElementById("myChart").style.cursor = chartElement[0]
          ? "pointer"
          : "default";
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Number of Food Services",
        font: { size: 18 },
      },
      // subtitle: {
      //   display: false,
      //   text: "",
      //   font: { size: 16 },
      // },
    },
  },
};

var myChart = new Chart(document.getElementById("myChart"), config);

let specificType = new Map();
// indoor, outdoor

function specificArea(area) {
  let indoor = 0;
  let outdoor = 0;
  for (let i of chartData) {
    if (i.smallArea == area) {
      if (i.seatingType == "Seats - Outdoor") {
        outdoor++;
      }
      if (i.seatingType == "Seats - Indoor") {
        indoor++;
      }
      if (specificType.has(i.industryDescription)) {
        specificType.set(
          i.industryDescription,
          specificType.get(i.industryDescription) + 1
        );
      } else {
        specificType.set(i.industryDescription, 1);
      }
    }
  }
  let seatingType = [indoor, outdoor];

  console.log(seatingType);
  console.log(specificType);

  let showedType = new Map(
    [...specificType.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3)
  );

  let processedType = new Map([["Others", 0]]);
  for (let [key, val] of specificType) {
    if (showedType.has(key)) {
      processedType.set(key, val);
    } else {
      processedType.set("Others", processedType.get("Others") + 1);
    }
  }
  processedType = new Map(
    [...processedType.entries()].sort((a, b) => b[1] - a[1])
  );
  console.log(processedType);

  // console.log(showedType);
  // specificType = filterType(showedType);
  // console.log(specificType);
  const subtitle = {
    display: true,
    text: "Region -- " + area,
    font: { size: 16 },
  };
  console.log(myChart.config.data.datasets[0].data);
  myChart.config.data.datasets[0].data = [...processedType.values()];
  myChart.config.data.labels = [...processedType.keys()];
  myChart.config.options.plugins.subtitle = subtitle;
  myChart.config.data.datasets[0].backgroundColor = [
    "#253494",
    "#1d91c0",
    "#7fcdbb",
    "#edf8b1",
  ];
  myChart.update();

  pieChart.config.data.datasets[0].data = seatingType;
  pieChart.config.data.labels = ["indoor", "outdoor"];
  pieChart.config.options.plugins.subtitle = subtitle;
  pieChart.update();
}

document.getElementById("myChart").onclick = function (evt) {
  var activePoints = myChart.getElementsAtEventForMode(
    evt,
    "point",
    myChart.options
  );
  if (activePoints.length && ableToClick == true) {
    let labelIndex = activePoints[0].index;
    let selectedArea = labels[labelIndex];
    specificArea(selectedArea);
    // console.log(selectedArea);
    ableToClick = false;
  }
};

const pieData = {
  labels: [...showedIndustry.keys()],
  datasets: [
    {
      label: "My First Dataset",
      data: [...showedIndustry.values()],
      backgroundColor: ["#253494", "#1d91c0", "#7fcdbb", "#edf8b1"],
      hoverOffset: 4,
    },
  ],
};

const pieConfig = {
  type: "pie",
  data: pieData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Type of Food Services",
        font: { size: 18 },
      },
      // subtitle: {
      //   display: false,
      //   text: "",
      //   font: { size: 16 },
      // },
    },
  },
};

var pieChart = new Chart(document.getElementById("pieChart"), pieConfig);
