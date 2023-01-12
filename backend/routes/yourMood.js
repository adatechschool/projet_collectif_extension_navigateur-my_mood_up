const express = require('espress');
const router = express.Router();
const YourMood = require('../models/YourMood');

router.post('/yourmood/create', async (req, res) => {
  const { icon, title, needs, breathe, owner } = req.body;
  const newYourMood = new YourMood({
    icon: icon,
    title: title,
    needs: needs,
    breathe: breathe,
    owner: owner,
  });
  await newYourMood.save();
  res.json('saved');
});
