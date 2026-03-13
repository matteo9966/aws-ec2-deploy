import { useCallback, useEffect, useState } from 'react'
import type { ApiResponse, User } from '@aws-ec2-deploy/types'
import './App.css'

const apiUrl = import.meta.env.VITE_API_URL

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState('')

  const getUsers = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch(`${apiUrl}/users`)
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }

      const payload = (await response.json()) as ApiResponse<User[]>
      setUsers(payload.data ?? [])
      setError('')
    } catch {
      setError('Unable to load users')
      setUsers([])
    }
  }, [])

  useEffect(() => {
    void getUsers()
  }, [getUsers])

  return (
    <>
      <section id="center">
        <h1>Users</h1>
        {error ? <p>{error}</p> : null}

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="ticks"></div>

  
      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
