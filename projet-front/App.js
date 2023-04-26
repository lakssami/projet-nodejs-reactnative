const Tab = createBottomTabNavigator()


export default function App() {
  return (
    <View style={styles.container}>
      <ProfilContextProvider>  
     
          <NavigationContainer>
            <Tab.Navigator>
            
                <Tab.Screen name="accueil" component={ Accueil }
                options={{
                  tabBarIcon : ()=><MaterialCommunityIcons name="home" size={30} />
                }}/>
                <Tab.Screen name="connexion" component={ Login }
                options={{
                  tabBarIcon : ()=><MaterialCommunityIcons name="login" size={30} />
                }}/>
            </Tab.Navigator>
          </NavigationContainer>
      </ProfilContextProvider>
      <StatusBar style="auto" backgroundColor='orange'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
