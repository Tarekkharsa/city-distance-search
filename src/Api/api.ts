export function calculateDistances(
  origin: [string, number, number],
  destinations: Array<[string, number, number]>
): Promise<Array<[string, number]>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const R = 6371; // Earth radius in km
      const distances: [string, number][] = destinations.map((destination) => {
        const dLat = toRadians(destination[1] - origin[1]);
        const dLon = toRadians(destination[2] - origin[2]);
        const lat1 = toRadians(origin[1]);
        const lat2 = toRadians(destination[1]);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.sin(dLon / 2) *
            Math.sin(dLon / 2) *
            Math.cos(lat1) *
            Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return [destination[0], distance];
      });
      resolve(distances);
    }, 1000);
  });
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function filterCities(
  searchKey?: string
): Promise<Array<[string, number, number]>> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!searchKey) {
        resolve(cities);
      } else {
        const lowerCasedSearchKey = searchKey.toLowerCase();
        const filteredCities = cities.filter((city) =>
          city[0].toLowerCase().includes(lowerCasedSearchKey)
        );
        resolve(filteredCities);
      }
    }, 1000); // simulate a delay of 1 second
  });
}

const cities: Array<[string, number, number]> = [
  ["Paris", 48.856614, 2.352222],

  ["Marseille", 43.296482, 5.36978],

  ["Lyon", 45.764043, 4.835659],

  ["Toulouse", 43.604652, 1.444209],

  ["Nice", 43.710173, 7.261953],

  ["Nantes", 47.218371, -1.553621],

  ["Strasbourg", 48.573405, 7.752111],

  ["Montpellier", 43.610769, 3.876716],

  ["Bordeaux", 44.837789, -0.57918],

  ["Lille", 50.62925, 3.057256],

  ["Rennes", 48.117266, -1.677793],

  ["Reims", 49.258329, 4.031696],

  ["Le Havre", 49.49437, 0.107929],

  ["Saint-Étienne", 45.439695, 4.387178],

  ["Toulon", 43.124228, 5.928],

  ["Angers", 47.478419, -0.563166],

  ["Grenoble", 45.188529, 5.724524],

  ["Dijon", 47.322047, 5.04148],

  ["Nîmes", 43.836699, 4.360054],

  ["Aix-en-Provence", 43.529742, 5.447427],
];
