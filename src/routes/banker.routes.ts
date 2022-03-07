import { Router } from "express";
import { Banker } from "../entities/Banker.entity";

const router = Router();

router.post("/", async (req, res) => {
  const { firstName, lastName, email, cardNumber, employeeNumber } = req.body;

  const banker = Banker.create({
    employee_number: employeeNumber,
    first_name: firstName,
    last_name: lastName,
    email,
    card_number: cardNumber,
  });

  const savedBanker = await banker.save();

  res.json(savedBanker);
});

export default router;
