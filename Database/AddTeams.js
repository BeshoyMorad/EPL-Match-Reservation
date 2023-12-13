const prismaClient = require("@prisma/client").PrismaClient;
const prisma = new prismaClient();

const teams = [
  "Al Ahly SC",
  "Al Ittihad Alexandria Club",
  "Al Masry SC",
  "Al Mokawloon Al Arab SC",
  "Ceramica Cleopatra FC",
  "Eastern Company SC",
  "El Gouna FC",
  "ENPPI SC",
  "Future FC",
  "Ghazl El Mahalla SC",
  "Ismaily SC",
  "Misr Lel Makkasa SC",
  "National Bank of Egypt SC",
  "Pharco FC",
  "Pyramids FC",
  "Smouha SC",
  "Tala'ea El Gaish SC",
  "Zamalek SC",
];

// Loop to insert all the teams
teams.forEach(async (team) => {
  // console.log(team);
  // await prisma.team.create({
  //   data: {
  //     name: team,
  //     image: `/images/${team}.png`, // Add the image path here
  //   },
  // });
  // await prisma.team.updateMany({
  //   where: {
  //     name: team,
  //   },
  //   data: {
  //     image: `/images/${team}.png`, // Add the image path here
  //   },
  // });
});
