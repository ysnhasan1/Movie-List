import Form from "./components/Form"
import MovieList from "./components/MovieList"

const App: React.FC = () => {
  return (
    <div className="container">
      <Form />
      <MovieList />
    </div>
  )
}

export default App