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
