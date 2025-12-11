
namespace API.Entities;

public class Cart
{
    public int Id { get; set; }
    public required string CartId { get; set;}
    public List<CartItem> Items {get; set;} = [];

    public void AddItem(Product product, int quantity)
    {
        if (product is null) ArgumentNullException.ThrowIfNull(product);
        if (quantity <= 0) 
            throw new ArgumentException("Quantity shall be greater than zero",
            nameof(quantity));

        var existingItem = FindItem(product.Id);
        if (existingItem is null)
        {
            Items.Add(new CartItem
            {
                Quantity = quantity,
                Product = product
            });
        } else
        {
            existingItem.Quantity += quantity;
        }
    }

    public void RemoveItem(Product product, int quantity)
    {
        if (product is null) ArgumentNullException.ThrowIfNull(product);
        if (quantity <= 0) 
            throw new ArgumentException("Quantity shall be greater than zero",
            nameof(quantity));

        var item = FindItem(product.Id);
        if (item is null) return;
        
        item.Quantity -= quantity;
        if (item.Quantity <= 0) Items.Remove(item);
    }

    private CartItem? FindItem(int productId)
    {
        return Items.FirstOrDefault(item => item.ProductId == productId);
    }
}

