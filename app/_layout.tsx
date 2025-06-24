import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "#673ab7", tabBarInactiveTintColor: "#999", tabBarStyle: { backgroundColor: "#fff" } }}>
        <Tabs.Screen name="index" options={{ title: "Home" }}  />
        <Tabs.Screen name="forms" options={{ title: "Forms" }} />
      </Tabs>
    </SafeAreaView>
  );
}
