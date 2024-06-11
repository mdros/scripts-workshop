return function(app)
    local json_params = require("lapis.application").json_params
    local Product = require("models.product")
    local Category = require("models.category")

    app:post("/products", json_params(function(self)
        local category = Category:find(self.params.category_id)

        if not category then
            return { status = 404, json = { error = "Category not found" } }
        end

        local product = Product:create({
            category_id = self.params.category_id,
            name = self.params.name,
        })

        return { json = product }
    end))

    app:get("/products", function(self)
        local products = Product:select()
        return { json = products }
    end)


    app:get("/products/:id", function(self)
        local product = Product:find(self.params.id)

        if not product then
            return { status = 404, json = { error = "Product not found" } }
        end

        return { json = product }
    end)

    app:put("/products/:id", json_params(function(self)
        local product = Product:find(self.params.id)

        if not product then
            return { status = 404, json = { error = "Product not found" } }
        end

        local category = Category:find(self.params.category_id)

        if not category then
            return { status = 404, json = { error = "Category not found" } }
        end

        local ok, err = pcall(function()
            Product:update({
                category_id = self.params.category_id,
                name = self.params.name,
                image_url = self.params.image_url,
                price = self.params.price
            })
        end)

        if not ok then
            print("Error updating product:", err)
            return { status = 500, json = { error = "Failed to update product", details = err } }
        end

        return { json = product }
    end))

    app:delete("/products/:id", function(self)
        local Product = Product:find(self.params.id)
        if not Product then
            return { status = 404, json = { error = "Product not found" } }
        end
        Product:delete()
        return { status = 200, json = { success = true } }
    end)
end
