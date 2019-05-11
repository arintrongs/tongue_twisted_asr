export const withBackendUrl = path => {
  if (process.env.NODE_ENV === 'development') {
    return `ws://localhost:8080${path}`
  }
  if (process.env.NODE_ENV === 'production') {
    // Put your production backend server url here
    return `...${path}`
  }
}
