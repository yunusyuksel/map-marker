export const convertPixelToCoordinate = (x,y) => {
    const lon = ((360*x)/800 - 180).toFixed(4)
    const lat = (90 -(180*y)/450).toFixed(4)
    return [lon,lat]
}