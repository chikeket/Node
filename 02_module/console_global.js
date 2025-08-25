const arr = [
  { name: "John Doe", email: "John@gmail.com" },
  { name: "Jeremy Go", email: "Jeremy Go@gmail.com" },
];

const obj = {
  students: {
    grade1: { class1: {}, class: {} },
    grade2: { class1: {}, class: {} },
    teachers: ["John Doe", "Jeremy Go"],
  },
};

console.dir(obj, { depth: 1, colors: true });

const obj2 = {
  students: {
    grade1: {
      class1: {
        student1: { name: "Alice", score: 92 },
        student2: { name: "Bob", score: 85 },
      },
      class2: {
        student1: { name: "Charlie", score: 78 },
        student2: { name: "Diana", score: 88 },
      },
    },
    grade2: {
      class1: {
        student1: { name: "Ethan", score: 90 },
        student2: { name: "Fiona", score: 95 },
      },
      class2: {
        student1: { name: "George", score: 82 },
        student2: { name: "Hannah", score: 89 },
      },
    },
    teachers: [
      { name: "John Doe", subject: "Math" },
      { name: "Jeremy Go", subject: "Science" },
    ],
  },
};

console.dir(obj2, { depth: 4, colors: true });
