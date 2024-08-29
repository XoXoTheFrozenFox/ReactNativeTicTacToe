import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: 'purple' }, // Set the header background color to purple
        headerTitleStyle: { color: 'white' }, // Set the title text color to white for contrast
        headerTitleAlign: 'center', // Center the title text
      }}
    >
      <Stack.Screen
        name="index" // This should match the screen/component name you want to show
        options={{ title: 'Tic Tac Toe' }} // Set the header title text (optional)
      />
    </Stack>
  );
}