
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class CartController(StoreContext context): BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<CartDto>> GetCart()
    {
        var cart = await RetrieveCart();
        cart ??= CreateCart();

        return cart.ToDto();
    }

    [HttpPost]
    public async Task<ActionResult> AddItemToCart(int productId, int quantity)
    {
        var cart = await RetrieveCart();
        cart ??= CreateCart();
        var productToAdd = await context.Products.FindAsync(productId);

        if (productToAdd is null)  return BadRequest("no such product");
        
        cart.AddItem(productToAdd, quantity);

        var result = await context.SaveChangesAsync();

        if (result > 0) return CreatedAtAction(nameof(GetCart), cart.ToDto());

        return BadRequest("Problem updating cart");
    }
    
    [HttpDelete]
    public async Task<ActionResult> RemoveItemFromCart(int productId, int quantity)
    {
        var cart = await RetrieveCart();
        if (cart is null) return BadRequest("No cart");

        var product = await context.Products.FindAsync(productId);
        if (product is null)  return BadRequest("No such product");
        cart.RemoveItem(product, quantity);
        await context.SaveChangesAsync();
        return Ok(cart.ToDto());
    }

    private async Task<Cart?> RetrieveCart()
    {
        return await context.Carts
            .Include(x => x.Items)
            .ThenInclude(x =>x.Product)
            .FirstOrDefaultAsync(x => x.CartId == Request.Cookies["cartId"]);
    }

    private Cart CreateCart()
    {
        var cartId = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions
        {
            IsEssential = true,
            Expires = DateTime.UtcNow.AddDays(30)
        };
        Response.Cookies.Append("cartId",cartId, cookieOptions);

        var cart = new Cart {CartId = cartId};
        context.Carts.Add(cart);
        return cart;
    }
}