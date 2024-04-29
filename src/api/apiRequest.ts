
// https://image.tmdb.org/t/p/w3840_and_h2160_face/n96bSvMRmrC3Y8VIs7LMNMyXkwp.jpg
export function getMovieImage(file_path: string, size: string = "md") {
  const sizes = {
    xxxs: "w45",
    xxs: "w92",
    xs: "w154",
    sm: "w185",
    md: "w300",
    lg: "w500",
    xl: "w780",
    xxl: "w1280",
    original: "original",
  }

  return `https://image.tmdb.org/t/p/${sizes[size as keyof typeof sizes]}${file_path}`;
}

// ## Add Supported Image Sizes  
//                                  Min Res      Max Res  
// poster   = Poster ............  500 x 750   2000 x 3000  
// backdrop = Fanart ............ 1280 x 720   3840 x 2160  
// still    = TV Show Episode ... 1280 x 720   3840 x 2160  
// profile  = Actors Actresses ..  300 x 450   2000 x 3000  
// logo     = TMDb Logo  

// ## API Supported Image Sizes  

// |  poster  | backdrop |  still   | profile  |   logo   |
// | :------: | :------: | :------: | :------: | :------: |
// | -------- | -------- | -------- |    w45   |    w45   |
// |    w92   | -------- |    w92   | -------- |    w92   |
// |   w154   | -------- | -------- | -------- |   w154   |
// |   w185   | -------- |   w185   |   w185   |   w185   |
// | -------- |   w300   |   w300   | -------- |   w300   |
// |   w342   | -------- | -------- | -------- | -------- |
// |   w500   | -------- | -------- | -------- |   w500   |
// | -------- | -------- | -------- |   h632   | -------- |
// |   w780   |   w780   | -------- | -------- | -------- |
// | -------- |  w1280   | -------- | -------- | -------- |
// | original | original | original | original | original |  

// Original Size is the size of the uploaded image.  
// It can be between Minimum Resolution and Maximum Resolution.  