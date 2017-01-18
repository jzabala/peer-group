export const newPathValidations = {
  name: {
    presence: true,
  },
  urlName: {
    presence: true,
    format: {
      pattern: /[a-z0-9-]+/,
      message: 'can only contain a-z, 0-9 and -'
    }
  },
  route: {
    presence: true,
  },
}

export const newRouteValidations = {
  name: {
    presence: true,
  },
}
