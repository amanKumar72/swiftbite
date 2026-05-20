import { CartProvider } from "./cartContext";
import { DishesProvider } from "./dishesContext";
import { ThemeProvider } from "./themeContext";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <DishesProvider>
        <CartProvider>{children}</CartProvider>
      </DishesProvider>
    </ThemeProvider>
  );
}
