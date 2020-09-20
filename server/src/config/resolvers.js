// Some initial data
let userlist = [{
    uid: 'user-0',
    username: 'admin',
    password: 'unloggable',
    groups: null,
    friends: null,
    personalInterests: null,
    gameInterests: null
  }]
let grouplist = []
let uidCount = userlist.length
let gidCount = grouplist.length
  // The resolvers
const resolvers = {
    Query: {
      users: () => userlist,
      groups: () => grouplist,
      user: (parent, args) => {
          for (let i =0; i<=uidCount; i++) {
              if (userlist[i].username===args.username) {
                  return userlist[i];
              }
          }
      }
    },

    Mutation : {

        createAccount: (parent, args) => {
            const user = {
            id: `user-${uidCount++}`,
            password: args.password,
            username: args.username,
            groups: [],
            friends: [],
            requests: [],
            personalInterests: [],
            gameInterests: []
            }
            userlist.push(user)
            return user
        },

        deactivateAccount: (parent, args) => {
            for (let i =0; i<=uidCount; i++) {
                if (userlist[i].id===args.id) {
                    let alpha = [...userlist]
                    userlist[i]=alpha[0]
                    userlist[0]=alpha[i]
                    userlist.shift()
                    break;
                }
            }
            return userlist;
        },

        updatePersonalInterests: (parent, args) => {
          for (let i =0; i<=uidCount; i++) {
              if (userlist[i].id===args.id) {
                  userlist[i].personalInterests = args.personalInterests
                  return userlist[i]
              }
          }
        },

        updateGameInterests: (parent, args) => {
            for (let i =0; i<=uidCount; i++) {
                if (userlist[i].id===args.id) {
                    userlist[i].gameInterests = args.gameInterests
                    return userlist[i]
                }
            }
          },

        createGame: (parent, args) => {
        }
        
  
    }
  }
  