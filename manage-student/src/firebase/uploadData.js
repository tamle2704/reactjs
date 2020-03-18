const firestoreService = require("firestore-export-import");

const serviceAccount = require("./serviceAccountKey.json");

firestoreService.initializeApp(serviceAccount, "https://manage-student-71a2b.firebaseio.com");

firestoreService.restore("data.json")