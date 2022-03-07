import { TransactionTypes } from "../types/types";
import { Router } from "express";
import { Client } from "../entities/Client.entity";
import { Transaction } from "../entities/Transaction.entity";

const router = Router();

router.post("/:clientId/transactions", async (req, res) => {
  const { clientId } = req.params;
  const { amount, type } = req.body;

  const client = await Client.findOne(parseInt(clientId));

  if (!client) throw new Error("Client Not Found");

  const transaction = Transaction.create({
    amount,
    type,
    client,
  });

  const savedTransaction = await transaction.save();

  if (transaction.type === TransactionTypes.DEPOSIT) {
    client.balance += Number(amount);
  } else if (transaction.type === TransactionTypes.WITHdRAW) {
    client.balance -= Number(amount);
  }

  res.json({ client, transaction });
});

export default router;
