import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./components/Home/Home";
import Login from "./components/User/Login";
import { Icon } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Lesson from "./components/Home/Lesson";
import Register from "./components/User/Register";
import { MyDispatchContext, MyUserContext } from "./configs/MyContexts";
import { useContext, useReducer } from "react";
import MyUserReducer from "./reducers/MyUserReducer";
import Profile from "./components/User/Profile";
import LessonDetails from "./components/Home/LessonDetails";

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator >
      <Tab.Screen name="home" component={Home} options={{title: "Danh sách khóa học"}}  />
      <Tab.Screen name="lesson" component={Lesson} options={{title: "Danh sách bài học"}}  />
      <Tab.Screen name="lesson-details" component={LessonDetails} options={{title: "Danh sách bài học"}}  />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const user = useContext(MyUserContext);

  return (
    <Tab.Navigator>
      <Tab.Screen name="index" component={StackNavigator} options={{title: "Khóa học",tabBarIcon: () => <Icon source="home" size={20} />}}  />

      {user === null?<>
        <Tab.Screen name="login" component={Login} options={{title: "Đăng nhập",tabBarIcon: () => <Icon source="account" size={20} />}} />
        <Tab.Screen name="register" component={Register} options={{title: "Đăng ký", tabBarIcon: () => <Icon source="account-plus" size={20} />}} />
      </>:<>
        <Tab.Screen name="profile" component={Profile} options={{title: "Tài khoản",tabBarIcon: () => <Icon source="account" size={20} />}} />
      </>}
      
    </Tab.Navigator>
  );
}

const App = () => {
  const [user, dispatch] = useReducer(MyUserReducer, null);

  return (
    <MyUserContext.Provider value={user}>
      <MyDispatchContext.Provider value={dispatch}>
        <NavigationContainer>
        
            <TabNavigator />
          
        </NavigationContainer>
      </MyDispatchContext.Provider>
    </MyUserContext.Provider>
  );
}

export default App;