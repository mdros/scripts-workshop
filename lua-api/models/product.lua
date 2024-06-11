local Model = require("lapis.db.model").Model

local Product = Model:extend("products", {
    primary_key = "id"
})

return Product
