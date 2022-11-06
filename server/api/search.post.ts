// import { getStorage, ref, uploadBytes } from 'firebase/storage';
// // import app from './FirebaseConfig';

// // import formidable from 'formidable';

// // Get a reference to the storage service, which is used to create references in your storage bucket
// const storage = getStorage(app);

// // Create a storage reference from our storage service
// const storageRef = ref(storage, "images/space.jpg");


// export default defineEventHandler(async (event) => {
//   // const form = formidable({ multiples: true });
//   // const data = await new Promise((resolve, reject) => {
//   //   form.parse(event.req, (err, fields, files) => {
//   //     if (err) {
//   //       reject(err);
//   //     }
//   //     resolve()
//   //     ))))
  
//   const body = await readBody(event);
//   // const body = await useBody(event);
//   // console.log(typeof(body));
//   // console.log(body.content);
  
  
//   // const file = body.files[0];
//   console.log(body);
//   // console.log(event.req.file.filename);
//   console.log("----------------------------------------------------------------")
//   console.log(event.req)
//   // console.log(event.req._readableState.buffer
//   return {
//     text: "Hello World",
//     // req: event.req
    
//   };
// });
