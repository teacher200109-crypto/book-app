import { useState, useEffect } from "react"
import "./App.css"

function App() {
  const [search, setSearch] = useState("")
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [againPassword, setAgainPassword] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (search.trim() === "") {
      setBooks([])
      return
    }

    async function getBooks() {
      try {
        setLoading(true)
        setError("")

        const response = await fetch(
          `https://openlibrary.org/search.json?q=${search}`
        )

        if (!response.ok) {
          throw new Error("API xatosi")
        }

        const data = await response.json()

        setBooks(data.docs)
      } catch (error) {
        setError("Kitoblarni olishda xatolik yuz berdi")
      } finally {
        setLoading(false)
      }
    }

    getBooks()
  }, [search])

  function handleSubmit(e) {
    e.preventDefault()

    if (password !== againPassword) {
      setMessage("Parollar bir xil emas")
      return
    }

    setMessage("Ro'yxatdan o'tish muvaffaqiyatli!")
  }

  return (
    <div className="app">
      <h1>BOOK APP</h1>

      
      <input
        type="text"
        placeholder="Kitob qidirish..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h2>Kitoblar ro'yxati</h2>

     
      {loading && <p>Yuklanmoqda...</p>}

      
      {error && <p>{error}</p>}

     
      <div className="books">
        {books.slice(0, 10).map((book, index) => (
          <div
            className="book-card"
            key={book.key || index}
            onClick={() => setSelectedBook(book)}
          >
            <h3>{book.title}</h3>

            <p>
              Muallif: {book.author_name?.[0] || "Noma'lum"}
            </p>

            <p>
              Nashr yili: {book.first_publish_year || "Noma'lum"}
            </p>
          </div>
        ))}
      </div>
      
           
      {selectedBook && (
        <div className="book-info">
          <h2>Kitob haqida</h2>

          <h3>{selectedBook.title}</h3>

          <p>
            Muallif: {selectedBook.author_name?.[0] || "Noma'lum"}
          </p>

          <p>
            Nashr yili:{" "}
            {selectedBook.first_publish_year || "Noma'lum"}
          </p>

          <button onClick={() => setSelectedBook(null)}>
            Yopish
          </button>
        </div>
      )}

     
      <h2>Ro'yxatdan o'tish</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ismingiz"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Parol"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Parolni qayta kiriting"
          value={againPassword}
          onChange={(e) => setAgainPassword(e.target.value)}
        />

        <button type="submit">
          Ro'yxatdan o'tish
        </button>
      </form>

      <p>{message}</p>
    </div>
  )
}

export default App

