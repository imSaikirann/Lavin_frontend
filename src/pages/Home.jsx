import Collection from "./Collection"
import Hero from "./Hero"
import Subscribe from "./Subscribe"

const Home = () => {
  return (
    <div className="mt-2">
      <Hero/>
      <Collection/>
      <Subscribe/>
    </div>
  )
}

export default Home