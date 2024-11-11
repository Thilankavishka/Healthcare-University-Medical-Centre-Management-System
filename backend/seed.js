const express = require("express");
const bcrypt = require("bcrypt");
const superadminmodel = require("./models/superadmin.js");
import("./mongodb.js");

async function adminaccount() {
  try {
    const superadmincount = await superadminmodel.countDocuments();
    if (superadmincount === 0) {
      const hashPassword = await bcrypt.hash("adminpassword", 10);
      const newAdmin = new superadminmodel({
        username: "admin",
        password: hashPassword,
      });
      await newAdmin.save();
      console.log("account created");
    } else {
      console.log("account alredy exists");
    }
  } catch (err) {
    console.log("error");
  }
}

adminaccount();
