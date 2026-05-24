"use client"

import { useState } from "react"
import type { NavigateFn, ScreenName, UserData } from "@/types/gymtec"

import PhoneShell from "@/components/layout/PhoneShell"
import LoginScreen from "@/screens/LoginScreen"
import HomeScreen from "@/screens/HomeScreen"
import PredictionScreen from "@/screens/PredictionScreen"
import OptimizeScreen from "@/screens/OptimizeScreen"
import ResultsScreen from "@/screens/ResultsScreen"
import DetailScreen from "@/screens/DetailScreen"
import MyScheduleScreen from "@/screens/MyScheduleScreen"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>("login")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // Definir mockUser aquí para pasarlo a HomeScreen
  const [user, setUser] = useState<UserData | null>(null)

  const handleNavigate: NavigateFn = (screen) => {
    setCurrentScreen(screen)
  }

  const handleLogin = (loggedInUser: UserData) => {
    setIsLoggedIn(true)
    setUser(loggedInUser) // Establecer el usuario logueado
    setCurrentScreen("home")
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null) // Limpiar usuario al cerrar sesión
    setCurrentScreen("login")
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "login":
        return <LoginScreen onLogin={handleLogin} />
      case "home":
        return (
            // Pasar el `user` al HomeScreen
            <HomeScreen
                user={user}
                onNavigate={handleNavigate}
                onLogout={handleLogout}
            />
        )
      case "prediction":
        return <PredictionScreen onNavigate={handleNavigate} />
      case "optimize":
        return <OptimizeScreen onNavigate={handleNavigate} />
      case "results":
        return <ResultsScreen onNavigate={handleNavigate} />
      case "detail":
        return <DetailScreen onNavigate={handleNavigate} />
      case "my-schedule":
        return <MyScheduleScreen onNavigate={handleNavigate} />
      default:
        const exhaustiveCheck: never = currentScreen
        return exhaustiveCheck
    }
  }

  return (
      <PhoneShell
          currentScreen={currentScreen}
          showBottomNav={isLoggedIn && !["login"].includes(currentScreen)}
      >
        {renderScreen()}
      </PhoneShell>
  )
}