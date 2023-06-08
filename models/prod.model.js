const { Schema, model } = require("mongoose");

const ProdSchema = new Schema(
  {
    titlle: String,
    albumId: Number,
    url: String,
    id: Number,
    thumbnailUrl: String,
  },
  { versionKey: false }
);

const ProdModel = model("prod", ProdSchema);

module.exports = ProdModel;
