local Model = require("lapis.db.model").Model

local Category = Model:extend("categories", {
    primary_key = "id"
})

return Category
