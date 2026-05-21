import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { View } from 'react-native';
export default function DrawerLayout() {
  const {colors} = useTheme()
    return (<Drawer
        screenOptions={{
            drawerActiveTintColor: colors.primary,
            drawerInactiveTintColor: colors.foreground,
            drawerStyle: { backgroundColor: colors.background, width: 240 },
            headerBackground(props) {
                return <View style={{ flex: 1, backgroundColor: colors.background }} />
            },
            headerTitle: 'Swiftbite',
            headerTintColor: colors.foreground,
        }}
    >
        <Drawer.Screen
            name="(home)"
            options={{
                drawerLabel: 'Home',
                title: 'Home',
                drawerIcon: ({ color }) => (
                    <Ionicons name="home-outline" size={20} color={color} />
                ),
            }}
        />
        <Drawer.Screen
            name="cart"
            options={{
                drawerLabel: 'Cart',
                title: 'Cart',
                drawerIcon: ({ color }) => (
                    <Ionicons name="cart-outline" size={20} color={color} />
                ),
            }}
        />
        <Drawer.Screen
            name="settings"
            options={{
                drawerLabel: 'Setting',
                title: 'Setting',
                drawerIcon: ({ color }) => (
                    <Ionicons name="person-outline" size={20} color={color} />
                ),
            }}
        />
        <Drawer.Screen
            name="helpCenter"
            options={{
                drawerLabel: 'Help Center',
                title: 'Help Center',
                drawerIcon: ({ color }) => (
                    <Ionicons name="help-circle-outline" size={20} color={color} />
                ),
            }}
        />
    </Drawer>)
}