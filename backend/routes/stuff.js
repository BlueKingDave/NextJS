const express = require("express");
const router = express.Router();

const auth = require("../middlewear/auth");

const stuffCtrl = require("../controllers/stuff");

router.get("/", auth, stuffCtrl.getThings);
router.post("/", auth, stuffCtrl.createThing);
router.get("/:id", auth, stuffCtrl.getOneThing);
router.put("/:id", auth, stuffCtrl.changeOneThing);
router.delete("/:id", auth, stuffCtrl.deleteOneThing);

module.exports = router;
