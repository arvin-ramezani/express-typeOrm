import { Router } from "express";
import { createQueryBuilder } from "typeorm";
import { Client } from "../entities/Client.entity";

const router = Router();

router.post("/", async (req, res) => {
  const { firstName, lastName, email, cardNumber, balance } = req.body;

  const newClient = Client.create({
    first_name: firstName,
    last_name: lastName,
    email,
    card_number: cardNumber,
    balance,
  });

  let savedClient = await newClient.save();
  return res.json(savedClient);
});

router.delete("/:clientId", async (req, res) => {
  const { clientId } = req.params;

  const deletedClient = await Client.delete(parseInt(clientId));

  res.json(deletedClient);
});

// Query Builder
router.get("/", async (req, res) => {
  const clients = await createQueryBuilder("client")
    .select("client.first_name")
    .addSelect("client.balance")
    .from(Client, "client")
    .leftJoinAndSelect("client.transactions", "transactionName")
    .where("client.balance <= :minBalance AND client.balance <= :maxBalance", {
      minBalance: 4000,
      maxBalance: 5000,
    })
    // .where("client.id = :clientId", { clientId: 3 })
    .getOne();
});

export default router;
