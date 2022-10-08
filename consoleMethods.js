const surprisingFact = "The bumblebee bat is the world's smallest mammal";

const familyTree = [
  {
    name: "Person 1",
    children: [
      {
        name: "Person 2",
        children: [
          {
            name: "Person 3",
            children: [
              {
                name: "Person 4",
              },
            ],
          },
        ],
      },
    ],
  },
];

console.group("Challenge 1");
console.info("Surprising fact:", surprisingFact);
console.warn("Surprising fact:", surprisingFact);
console.groupEnd();

console.group("Challenge 2");
console.table(familyTree);
console.dir({ familyTree }, { depth: null });
console.groupEnd();

console.group("Challenge 3");
function importantTask() {
  console.count("Important task");
}

importantTask();
importantTask();
importantTask();
importantTask();
console.countReset("Important task");
importantTask();
importantTask();
console.groupEnd();
