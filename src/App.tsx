
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout } from './components/mainComponents/Layout'
import { Homepage } from './components/mainComponents/Homepage'
import { Signup } from './components/mainComponents/Signup'
import { Signin } from './components/mainComponents/Signin'
import { PublicVisible } from './components/mainComponents/PublicVisible'
import { Tweets } from './components/mainComponents/Tweets'
import { Videos } from './components/mainComponents/Videos'
import { AlertProvider } from './components/ui/Alert'
import { Tags } from './components/mainComponents/Tags'
import { AllContent } from './components/mainComponents/AllContent'
import { Documents } from './components/mainComponents/Documents'
import { Links } from './components/mainComponents/Links'
import { ContentProvider } from './components/mainComponents/useContent'

function App() {


  return (
    <>
    <ContentProvider>
    <BrowserRouter>
    <AlertProvider>
    
    <Routes>

      <Route path='/home' element={<Layout />}>

      <Route index element={<Homepage />} />
      <Route path='/home/tweets' element={<Tweets />} />
      <Route path='/home/videos' element={<Videos />} />
      <Route path='/home/documents' element={<Documents />} />
      <Route path='/home/links' element={<Links />} />
      <Route path='/home/tags' element={<Tags />} />
      
      </Route>

      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/public/:hash' element={<PublicVisible />} />
      <Route path='*' element={<Layout />} />

    </Routes>
    </AlertProvider>
    
    </BrowserRouter>
    </ContentProvider>

     
    </>
  )
}

export default App
