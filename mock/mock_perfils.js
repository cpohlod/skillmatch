const { Perfil } = require("../model/perfil");

const perfils = [  
  new Perfil("Diana", "Desenvolvimento de Front-end", ["HTML", "CSS"], 1),
  new Perfil("Tony Stark", "Desenvolvimento de Software", ["Java", "SQL", "Git"], 3),
  new Perfil("Homer Simpson", "Desenvolvimento", ["Windows", "Word", "Excel"], 2)
];

module.exports = perfils;