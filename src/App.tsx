import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import MemberInfo from "page/MemberInfo"
import DefaultLayout from "layout/DefaultLayout"

function App() {
  
  return (
    <Suspense fallback={<div/>}>
      <Routes>
        <Route path="/" element={<DefaultLayout/>} />
      </Routes>
    </Suspense>
  )
}

export default App
