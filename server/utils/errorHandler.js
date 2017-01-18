export const serverError = (res, err) => res.status(500).send(err);
