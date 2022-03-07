import { createConnection } from "typeorm";
import express from "express";
import { Client } from "./entities/Client.entity";
import { Banker } from "./entities/Banker.entity";
import { Transaction } from "./entities/Transaction.entity";
import bankerRoutes from "./routes/banker.routes";
import clientRoutes from "./routes/client.routes";
import transactionRoutes from "./routes/transaction.routes";
import connectBankerToClientRoutes from "./routes/connect-banker-to-client.routes";

const app: express.Application = express();

const PORT = Number(process.env.PORT || 5000);

const main = async () => {
  try {
    const connection = await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5433,
      username: "postgres",
      password: "123456",
      database: "postgres",
      entities: [Client, Banker, Transaction],
      synchronize: true,
    });
    console.log("Connected to Postgres");

    app.use(express.json());

    // Router
    app.use("/api/bankers", bankerRoutes);
    app.use("/api/clients", clientRoutes);
    app.use("/api/clients", transactionRoutes);
    app.use("/", connectBankerToClientRoutes);

    app.listen(PORT, () => {
      console.log("Running on port " + PORT);
    });
  } catch (error) {
    console.log("error" + error);
  }
};

main();
