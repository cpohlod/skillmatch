const Perfil = require("../model/perfil");

const perfils = [  
  new Perfil("Diana", "Desenvolvimento de Front-end", ["HTML", "CSS"], 1, "mulher.maravilha@gmail.com"),
  new Perfil("Tony Stark", "Desenvolvimento de Software", ["Java", "SQL", "Git"], 3, "tony.stark@gmail.com"),
  new Perfil("Homer Simpson", "Desenvolvimento", ["Windows", "Word", "Excel"], 2, "homer.simpson@gmail.com")
];

module.exports = perfils;