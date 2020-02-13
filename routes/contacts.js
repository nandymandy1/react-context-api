const { userAuth } = require("./common");
const router = require("express").Router();
const { check, validationResult } = require("express-validator");

const Contact = require("../models/Contact");

router.get("/", userAuth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user._id }).sort({
      createdAt: -1
    });
    return res.status(200).json(contacts);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server error");
  }
});

router.post(
  "/",
  [
    userAuth,
    [
      check("name", "Name is required.")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newContact = new Contact({
        ...req.body,
        user: req.user._id
      });
      let result = await newContact.save();
      return res.status(201).json(result);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("Server error");
    }
  }
);

router.put("/:id", userAuth, async (req, res) => {
  try {
    let contact = await Contact.findOne({
      $and: [{ _id: req.params.id }, { user: req.user._id }]
    });
    if (!contact) {
      return res.status(404).send("Contact not found in your contactbook.");
    }
    contact = await Contact.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(contact);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server error");
  }
});

router.delete("/:id", userAuth, async (req, res) => {
  try {
    let contact = await Contact.findOne({
      $and: [{ _id: req.params.id }, { user: req.user._id }]
    });
    if (!contact) {
      return res.status(404).send("Contact not found in your contactbook.");
    }
    await Contact.findOneAndDelete({ _id: req.params.id });
    return res.status(200).json({ message: "Contact removed." });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
