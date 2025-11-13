// Define an API endpoint at '/api/content'.
// This is the route our frontend will use to get the content data.
// app.get('/api/content', (req, res) => {
//   // Send the 'content' array as a JSON response.
//   res.json(content);
// });

// TEMPORARY: Function to insert initial data if the database is empty
// const insertInitialData = async () => {
//   const count = await Content.countDocuments();
//   if (count === 0) {
//     const initialContent = [
//       {
//         title: 'First Post from DB',
//         description: 'This is the first piece of content from MongoDB.',
//         mediaUrl: 'https://placehold.co/600x400.png',
//       },
//       {
//         title: 'Second Post from DB',
//         description: 'This is the second piece of content from MongoDB.',
//         mediaUrl: 'https://placehold.co/400x600.png',
//       },
//       {
//         title: 'Third Post from DB',
//         description: 'This is the third piece of content from MongoDB.',
//         mediaUrl: 'https://placehold.co/600x400.png',
//       },
//     ];
//     await Content.insertMany(initialContent);
//     console.log('Initial data inserted successfully!');
//   } else {
//     console.log(`Database already contains ${count} documents.`);
//   }
// };

// // Call the function once connected
// mongoose.connection.once('open', () => {
//     insertInitialData();
// });