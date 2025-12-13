export type SubjectResponse = {
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    prevPage: number;
  };
  subjects: { _id: string; name: string; icon: string; createdAt: string }[];
};
