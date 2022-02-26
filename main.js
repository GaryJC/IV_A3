let features = [];
for (let feature of featureSource) {
  temp = {};
  temp.type = "Feature";
  temp.properties = {};
  temp.properties.name = feature.name;
  temp.properties.description = feature.brief;
  temp.properties.address = feature.address;
  temp.properties.time = feature.time;
  temp.properties.website = feature.website;
  temp.properties.phone = feature.phone;
  temp.properties.tag = feature.tag;
  temp.geometry = {};
  temp.geometry.type = "Point";
  temp.geometry.coordinates = [feature.long, feature.lat];
  features.push(temp);
}

let industryType = new Map([
  ["Cafes and Restaurants", 0],
  ["Takeaway", 0],
  ["Pubs, Taverns and Bars", 0],
  ["Others", 0],
]);

for (let i of chartData) {
  if (industryType.has(i.industryDescription)) {
    industryType.set(
      i.industryDescription,
      industryType.get(i.industryDescription) + 1
    );
  } else {
    industryType.set("Others", industryType.get("Others") + 1);
  }
}

let showedIndustry = new Map(
  [...industryType.entries()].sort((a, b) => b[1] - a[1])
);

let areaMap = new Map();

for (let i of chartData) {
  if (areaMap.has(i.smallArea)) {
    areaMap.set(i.smallArea, areaMap.get(i.smallArea) + 1);
  } else if (
    i.smallArea == "Melbourne (Remainder)" ||
    i.smallArea == "West Melbourne (Industrial)" ||
    i.smallArea == "West Melbourne (Residential)"
  ) {
    continue;
  } else {
    areaMap.set(i.smallArea, 1);
  }
}
