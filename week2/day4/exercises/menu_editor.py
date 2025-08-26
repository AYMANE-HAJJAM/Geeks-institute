from menu_item import MenuItem
from menu_manager import MenuManager

def show_user_menu():
    while True:
        print("Program Menu:")
        print("1. View an item(v)")
        print("2. Add an item(a)")
        print("3. Delete an item(d)")
        print("4. Update an item(u)")
        print("5. Show the menu(s)")
        input_choice = input(str("Enter your choice: ").strip().lower())
        if input_choice == "v":
            view_item()
            break
        elif input_choice == "a":
            add_item_to_menu()
            break
        elif input_choice == "d":
            remove_item_from_menu()
            break
        elif input_choice == "u":
            update_item_from_menu()
            break
        elif input_choice == "s":
            show_full_menu()
            break
        else:
            print("Invalid choice. Please try again.")

def add_item_to_menu():
    item_name = input("Enter the name of the item: ")
    item_price = float(input("Enter the price of the item: "))
    try:
        item = MenuItem(item_name, item_price)
        item.save()
        return {"message": "Item added successfully"}
    except Exception as e:
        print(f"Error adding item to menu: {e}")

def remove_item_from_menu():
    item_name = input("Enter the name of the item to remove: ")
    try:
        item = MenuManager.get_by_name(item_name)
        if item:
            item.delete()
            return {"message": "Item removed successfully"}
        else:
            return {"message": "Item not found"}
    except Exception as e:
        print(f"Error removing item from menu: {e}")


def update_item_from_menu():
    item_name = input("Enter the name of the item to update: ")
    item = MenuManager.get_by_name(item_name)
    if item:
        new_name = input("Enter the new name of the item: ")
        new_price = float(input("Enter the new price of the item: "))
        item.update(new_name, new_price)
        return {"message": "Item updated successfully"}
    else:
        return {"message": "Item not found"}
    

def view_item():
    item_name = input("Enter the name of the item to view: ")
    item = MenuManager.get_by_name(item_name)
    if item:
        print(f"Item found: {item.item_name} - ${item.item_price}")
    else:
        print("Item not found.")

def show_full_menu():
    items = MenuManager().all_items()
    if items:
        print("Full Menu:")
        for item in items:
            print(f"{item.item_name} - ${item.item_price}")
    else:
        print("No items found.")


show_user_menu()
