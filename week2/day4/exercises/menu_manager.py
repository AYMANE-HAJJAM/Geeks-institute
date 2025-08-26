from menu_item import MenuItem

class MenuManager:
    @staticmethod
    def get_by_name(item_name):
        conn = MenuItem().get_connection()
        if not conn:
            return {"message": "Database connection failed"}, 500
        try:
            with conn.cursor() as cursor:
                query = "SELECT * FROM Menu_Items WHERE item_name = %s;"
                cursor.execute(query, (item_name,))
                row = cursor.fetchone()
                if row:
                    return MenuItem(row["item_name"], row["item_price"])
                return None
        except Exception as e:
            print(f"Error getting item by name: {e}")
            return None
        finally:
            conn.close()

    def all_items(self):
        conn = MenuItem().get_connection()
        if not conn:
            return {"message": "Database connection failed"}, 500
        try:
            with conn.cursor() as cursor:
                query = "SELECT * FROM Menu_Items;"
                cursor.execute(query)
                row = cursor.fetchall()
                if row:
                    return [MenuItem(item["item_name"], item["item_price"]) for item in row]
                return []
        except Exception as e:
            print(f"Error getting all items: {e}")
            return None
        finally:
            conn.close()


            

item = MenuItem('Burger', 35)
item.save()
item.update('Veggie Burger', 37)
item2 = MenuManager().get_by_name('Beef Stew')
items = MenuManager().all_items()