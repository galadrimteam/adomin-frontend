import { add } from "date-fns";
import { AdominDateFieldConfig } from "../../fields.types";

export const getDateDefaultValue = (fieldConfig: AdominDateFieldConfig) => {
  if (!fieldConfig.defaultValue) {
    return null;
  }

  if (fieldConfig.defaultValue.mode === "now") {
    const now = new Date();

    const {
      plusYears,
      plusMonths,
      plusWeeks,
      plusDays,
      plusHours,
      plusMinutes,
      plusSeconds,
    } = fieldConfig.defaultValue;

    const newDate = add(now, {
      years: plusYears,
      months: plusMonths,
      weeks: plusWeeks,
      days: plusDays,
      hours: plusHours,
      minutes: plusMinutes,
      seconds: plusSeconds,
    });

    return newDate;
  }

  return new Date(fieldConfig.defaultValue.value);
};
