import { Client } from "../entities/Client.entity";
import { Banker } from "./../entities/Banker.entity";
import { Router } from "express";

const router = Router();

router.put("/api/banker/:bankerId/client/:clientId", async (req, res) => {
  const { bankerId, clientId } = req.params;

  const banker = await Banker.findOne(parseInt(bankerId));

  const client = await Client.findOne(parseInt(clientId));

  if (!banker || !client) {
    throw new Error("Not Found");
  }

  banker.clients = [...banker.clients, client];

  res.json({ banker, client });
});

export default router;
