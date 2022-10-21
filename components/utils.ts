export const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "blue";
    case "completed":
      return "green";
    case "rejected":
      return "red";
    default:
      return "blue";
  }
};
