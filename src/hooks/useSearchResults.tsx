import { useState, useEffect } from "react";
import queryString from "query-string";
import { z } from "zod";
import { calculateDistances } from "../Api/api";

const schema = z.object({
  date: z.string(),
  passengers: z.string().transform((val) => parseInt(val)),
  city_origin: z.array(z.string().or(z.number())),
  city_destinations: z.record(
    z.array(z.union([z.string(), z.number(), z.number()]))
  ),
});

type fetchDataOptionsType = z.infer<typeof schema> | null;

export default function useSearchResults() {
  const [distances, setDistances] = useState<[string, number][]>();

  const [fetchDataOptions, setFetchDataOptions] =
    useState<fetchDataOptionsType>(null);
  const [destinations, setDestinations] = useState<
    Array<[string, number, number]>
  >([]);

  useEffect(() => {
    let query = queryString.parseUrl(window.location.href).query;

    if (typeof query.city_destinations === "string") {
      query.city_destinations = queryString.parse(query.city_destinations, {
        arrayFormat: "index",
      }) as any;
    }

    let options: fetchDataOptionsType = null;

    try {
      options = schema.parse(query);
    } catch (err) {
      console.error(err);
      return;
    }

    let newDestinations: Array<[string, number, number]> = [];

    if (typeof options.city_destinations === "object") {
      newDestinations = Object.values(options.city_destinations).map(
        ([name, lat, lng]) => [
          name.toString(),
          parseFloat(lat.toString()),
          parseFloat(lng.toString()),
        ]
      );
    } else {
      console.error(
        "Failed to parse city_destinations:",
        options.city_destinations
      );
    }

    setDestinations(newDestinations);
    setFetchDataOptions(options);
  }, []);

  useEffect(() => {
    if (!fetchDataOptions) {
      return;
    }

    calculateDistances(
      fetchDataOptions.city_origin as [string, number, number],
      destinations
    ).then((distances) => {
      setDistances(distances);
    });
  }, [fetchDataOptions, destinations]);

  return {
    fetchDataOptions,
    destinations,
    distances,
  };
}
