import { usePosition } from "@/contexts/PositionContext";

type DataPanel = {
  Id: number;
  Power: number;
  Price: number;
};
type Data = {
  Town: {
    Name: string;
  };
  MinConsume: number;
  MaxConsume: number;
};

export const getRate = <T extends Data>(
  data: T[] | undefined,
  consume: number | null,
  town: string | null
) => {
  if (!data || consume == null || !town) return null;
  return (
    data?.find(
      (item) =>
        item.Town.Name == town &&
        (item.MinConsume == null ||
          ((item.MaxConsume >= consume || item.MaxConsume == null) &&
            item.MinConsume <= consume))
    ) ?? null
  );
};

export const getPanel = <T extends DataPanel>(
  data: T[] | undefined,
  consume: number | null
) => {};
// export const getInverter = <T extends Data>(
//   data: T[] | undefined,
//   consume: number | null,
//   town: string | null
// ) => {
//   if (!data || consume == null || !town) return null;
//   return (
//     data?.find(
//       (item) =>
//         item.Inverters.Power == town &&
//         (item.MinConsume == null ||
//           ((item.MaxConsume >= consume || item.MaxConsume == null) &&
//             item.MinConsume <= consume))
//     ) ?? null
//   );
// };
