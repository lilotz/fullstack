const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return await response.json()
}

const createNew = async (content) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 }),
  })

  if (!response.ok) {
    throw new Error('Failed to create anecdotes')
  }

  return await response.json()
}

const updateVotes = async (id) => {
  const old = await fetch(`${baseUrl}/${id}`)

  const oldAnecdote = await old.json()

  const updatedAnecdote = {
    ...oldAnecdote,
    votes: oldAnecdote.votes+1
  }

  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedAnecdote)
  })

  if (!response.ok) {
    throw new Error('Failed to update anecdote')
  }

  return await response.json()
}

export default { getAll, createNew, updateVotes }