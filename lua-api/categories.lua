return function(app)
    local json_params = require("lapis.application").json_params
    local Category = require("models.category")

    app:post("/categories", json_params(function(self)
        local category = Category:create({
            name = self.params.name
        })

        return { json = category }
    end))

    app:get("/categories", function(self)
        return { json = Category:select() }
    end)

    app:get("/categories/:id", function(self)
        local category = Category:find(self.params.id)

        if not category then
            return { status = 404, json = { error = "Category not found" } }
        end

        return { json = category }
    end)

    app:put("/categories/:id", json_params(function(self)
        local category = Category:find(self.params.id)

        if not category then
            return { status = 404, json = { error = "Category not found" } }
        end

        category:update({
            name = self.params.name
        })

        return { json = category }
    end))

    app:delete("/categories/:id", function(self)
        local category = Category:find(self.params.id)

        if not category then
            return { status = 404, json = { error = "Category not found" } }
        end

        category:delete()

        return { status = 200, json = { success = true } }
    end)
end
