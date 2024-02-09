const isNotUndefinedOrNull = <T>(value: T | undefined | null): value is T => {
  return value !== undefined && value !== null;
};

export const filterUndefinedOrNullValues = <T>(
  arr: (T | undefined | null)[]
) => {
  return arr.filter(isNotUndefinedOrNull);
};

export type BitsetValues<T extends string> = {
  [K in T]: number;
};

export type BitsetLabels<T extends string> = {
  [K in T]: string;
};

export const bitsetContains = <T extends string>(
  bitsetValues: BitsetValues<T>,
  value: number,
  roleToCheck: T
) => {
  return (value & bitsetValues[roleToCheck]) !== 0;
};

export const getBitsetRoles = <T extends string>(
  bitsetValues: BitsetValues<T>,
  value: number
): T[] => {
  const keys = Object.keys(bitsetValues) as T[];
  const roles = keys.map((r) => {
    if (bitsetContains(bitsetValues, value, r)) return r;
    return null;
  });

  return filterUndefinedOrNullValues(roles);
};

export const getBitsetRolesLabels = <T extends string>(
  bitsetValues: BitsetValues<T>,
  rights: number,
  bitsetLabels?: BitsetLabels<T>
) => {
  const roles = getBitsetRoles(bitsetValues, rights);

  if (!bitsetLabels) return roles;

  return roles.map((r) => bitsetLabels[r]);
};

type BitsetFilterOption = {
  value: string;
  label: string;
};

export const getBitsetFilterOptions = <T extends string>(
  bitsetValues: BitsetValues<T>,
  bitsetLabels?: BitsetLabels<T>
): BitsetFilterOption[] => {
  const keys = Object.keys(bitsetValues) as T[];

  return keys.map((r) => ({
    value: bitsetValues[r].toString(10),
    label: bitsetLabels?.[r] ?? r,
  }));
};
