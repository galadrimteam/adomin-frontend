import {
  isAdonisError,
  isApiErrors,
  isApiFormErrors,
  isApiSimpleError,
} from "./apiErrors";

export const getErrorMessage = (
  error: unknown,
  backupMessage: string = "Une erreur imprévue est survenue"
) => {
  if (isApiSimpleError(error)) {
    return error.error;
  }
  if (isApiFormErrors(error)) {
    return error.errors[0].message;
  }
  if (isApiErrors(error) && error.errors.length > 0) {
    const errorType = error.errors[0].message.split(":")[0];
    if (errorType === "E_UNAUTHORIZED_ACCESS") {
      return "Accès non autorisé";
    }
    if (
      errorType === "E_INVALID_AUTH_UID" ||
      errorType === "E_INVALID_AUTH_PASSWORD"
    ) {
      return "Identifiants invalides";
    }
  }
  if (isAdonisError(error)) {
    const message = error.message.split(":").slice(1).join(":");

    if (
      [
        "E_UNAUTHORIZED_EXCEPTION",
        "E_FORBIDDEN_EXCEPTION",
        "E_AUTHORIZATION_FAILURE",
        "E_BAD_REQUEST_EXCEPTION",
      ].includes(error.code)
    ) {
      return message;
    }
    if (error.code === "E_ROUTE_NOT_FOUND") {
      return `$Route inconnue: ${message}`;
    }
    if (error.code === "E_ROW_NOT_FOUND") {
      return "Ressource introuvable";
    }
  }

  // eslint-disable-next-line no-console
  console.error(error);
  return backupMessage;
};
