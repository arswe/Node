console.log('Befor')

const user = gerUser(1)

console.log(user)

console.log('After')

function gerUser(id) {
  setTimeout(() => {
    console.log('Reading a user from database')
    return { id: id, username: 'arswe' }
  }, 1000)
  return 1
}
