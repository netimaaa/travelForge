import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'

import { Dashboard } from './dashboard'
import TravelApp from './pages/travel/App'
import { BudgetProvider } from './context/BudgetContext'
import { AuthProvider } from './context/AuthContext'

import { store } from './__data__/store'
import './styles.css'
import './index.css'

const App = () => {
  return (
    <BrowserRouter basename="/travelforge">
      <ChakraProvider>
        <ReduxProvider store={store}>
          <AuthProvider>
            <BudgetProvider>
              <Routes>
                <Route path="/*" element={<TravelApp />} />
                <Route path="/main/*" element={<Dashboard />} />
              </Routes>
            </BudgetProvider>
          </AuthProvider>
        </ReduxProvider>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
