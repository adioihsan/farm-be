export function successResponse(message: string, data?: any) {
  return {
    status: "success",
    message,
    data: data ?? null,
  };
}

export function errorResponse(message: string, errors?: any) {
  return {
    status: "error",
    message,
    errors: errors ?? null,
  };
}
