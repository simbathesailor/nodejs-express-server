
import Link from 'next/link'
import {useEffect} from "react"
import Layout from '../components/Layout'

interface VPInterface extends HTMLElement {
  paused: boolean
  play: Function
  pause: Function
}
const IndexPage = () => {

  useEffect(() => {
    // @ts-ignore
    const VP : VPInterface  = document.getElementById('videoPlayer') // player
    if(VP === null) {
      return
    }
    const VPToggle = document.getElementById('toggleButton') // button

    function listener() {
     
      if (VP && VP.paused) VP.play()
      else VP.pause()
    }
    // @ts-ignore
    VPToggle.addEventListener('click', listener)
    
    return () => {
      VPToggle?.removeEventListener("click", listener)
    }
  }, [])
  return  (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <video id="videoPlayer" controls>
        <source src="http://localhost:8001/video" type="video/mp4" />
      </video>
      <button id="toggleButton">Toggle</button>
    </Layout>
  )
}

export default IndexPage
