export const BASE_URL = 'https://swapi.dev/api'

export const getUrl = (url) => {
  let accumulatedResults = []

  const fetchAllPages = async (url) => {
    if (!url) {
      return Promise.resolve({ data: accumulatedResults })
    }
    const response = await fetch(url)
    const { results, next } = await response.json()
    accumulatedResults.push(...results)
    return fetchAllPages(next && next.replace('http', 'https'))
  }

  accumulatedResults = []
  return fetchAllPages(url)
}

export const getAllPeople = async (key, { peopleUrlArray }) => {
  return await Promise.all(
    peopleUrlArray.map(async (url) => {
      const response = await fetch(url)
      return response.json()
    }),
  )
}

export const calculateFavoritesAmount = (listItem, favorites) => {
  let people = []

  if (listItem.residents) {
    people = listItem.residents
  }

  if (listItem.people) {
    people = listItem.people
  }

  return people.reduce((acc, curr) => {
    if (favorites[curr]) {
      acc += 1
    }
    return acc
  }, 0)
}
