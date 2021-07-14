// TODO use compact binary and decimal representations to be more space and computation efficient
// const emptyRealBitmapOrdered = () => {
//     return 123456789; // permutations of this order applied to combo bitmaps produce permutations from each combo bitmap
// }
// const emptyRealBitmap = () => {
//     return 000000000;
// }
// const invertRealBitmap = (bitmap) => {
//     return !bitmap;
// }
// const andRealBitmaps = (bitmaps) => {
//     let andedBitmap = emptyRealBitmap();
//     for (bitmap of bitmaps) {
//         andedBitmap = and2RealBitmaps(andedBitmap, bitmap);
//     }
//     return andedBitmap;
// }
// const and2RealBitmaps = (bitmap1, bitmap2) => {
//     return bitmap1 & bitmap2;
// }
// const orRealBitmaps = (bitmaps) => {
//     let oredBitmap = emptyRealBitmap();
//     for (bitmap of bitmaps) {
//         oredBitmap = or2RealBitmaps(oredBitmap, bitmap);
//     }
//     return oredBitmap;
// }
// const and2RealBitmaps = (bitmap1, bitmap2) => {
//     return bitmap1 | bitmap2;
// }
// const xorRealBitmaps = (bitmaps) => {
//     let xoredBitmap = emptyRealBitmap();
//     for (bitmap of bitmaps) {
//         xoredBitmap = xor2RealBitmaps(andedBitmap, bitmap);
//     }
//     return xoredBitmap;
// }
// const xor2RealBitmaps = (bitmap1, bitmap2) => {
//     return !(bitmap1 | bitmap2);
// }
"use strict";