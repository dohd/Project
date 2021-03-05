// import imageCompression from 'browser-image-compression';

// const options = { 
//     maxSizeMB: 1, 
//     maxWidthOrHeight: 1920, 
//     useWebWorker: true 
// };

// export default async function scaleImage(file) {
//     try {
//         const blob = await imageCompression(file, options);
//         return new File([blob], blob.name, {type: blob.type});
//     } catch (err) {
//         console.log(err);
//     }
// };