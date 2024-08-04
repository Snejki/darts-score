import { ClassicalGamePlayerThrow } from "../ClassicalTypes";

export const calculateCurrenRoundPoints = (
  throws: ClassicalGamePlayerThrow[]
) => throws.reduce((acc, curr) => (acc += curr.points ?? 0), 0);
