import { CartProvider } from "./cartContext";
import { DishesProvider } from "./dishesContext";
import { ThemeProvider } from "./themeContext";
import { UserProvider } from "./userContext";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <DishesProvider>
          <CartProvider>{children}</CartProvider>
        </DishesProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
