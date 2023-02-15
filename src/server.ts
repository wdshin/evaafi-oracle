import mongoose from "mongoose";
import { app } from "./app";
import { mongoUrl, port } from "./config";
import cron from "node-cron";
import { marketsWatcher } from "./crons/marketsWatcher";

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(() => console.log("✅ 🍃 Connected to MongoDB"))
  .catch((err) => {
    console.log(`❌  MongoDB connection error. Please make sure MongoDB is running. ${err}`);
    process.exit();
  });

app.listen(port ?? 5000, () => {
  console.log("🚀 Server ready at: http://localhost:" + port);
});

// cron.schedule("* * * * *", () => {
//   marketsWatcher().catch((e) => console.log("❌  Market Watcher Error: ", e));
// });
