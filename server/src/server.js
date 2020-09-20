//const typeDefs = require('./config/typeDefs.js');
//const resolvers = require('./config/resolvers.js');
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const e = require('express');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server');


const typeDefs = gql`
  type Query {
    users: [User!]
    groups: [Group!]
    user(username: String!): User
  }
  type Mutation {
    createAccount(username: String!, password: String!): User!
    deactivateAccount(uid: ID!): [User!]
    updatePersonalInterests(uid: ID!, personalInterests: [String!]!): User!
    createGroup(uid: ID!, game: String!, groupSize: Int!): User!
    leaveGroup(uid: ID!, gid: ID!): User!
    sendMessage(uid: ID!, content: String!, gid: ID!): User!
    changePassword(uid: ID!, password: String!): User!
    renameGroup(uid: ID!, gid: ID!, name: String!): User!
    setLink(uid: ID!, gid: ID!, link: String!): User!
    requestFriend(uid: ID!, username: String!): User!
    acceptFriend(uid: ID!, from: String!): User!
    rejectFriend(uid: ID!, from: String!): User!
  }
  type User {
    uid: ID!
    username: String!
    password: String!
    groups: [Group!]
    friends: [User!]
    requests: [User!]
    personalInterests: [String!]
  }
  type Group {
    gid: ID!
    members: [User!]!
    name: String!
    link: String!
    game: String!
    messages: [Message!]
  }
  type Message {
    sender: User!
    content: String!
    time: String!
  }
`
// Some initial data
let userlist = [{
  uid: 'user-0',
  username: '',
  password: 'unloggable',
  groups: null,
  friends: null,
  requests: null,
  personalInterests: null,
}]
let grouplist = []
let groupreqs = {}; 
let uidCount = userlist.length
let gidCount = grouplist.length
// The resolvers
const resolvers = {
  Query: {
    users: () => userlist,
    groups: () => grouplist,
    user: (parent, args) => {
        for (let i =0; i<uidCount; i++) {
            if (userlist[i].username===args.username) {
                return userlist[i];
            }
        }
    }
  },

  Mutation : {

      createAccount: (parent, args) => {
        for (let i=0; i<userlist.length; i++) {
          if (userlist[i].username===args.username) {
            throw new Error("username taken");
          }
        }
        if (args.password.length<8) {
          throw new Error("Pick a longer password");
        } 
        const user = {
          uid: `user-${uidCount++}`,
          password: args.password,
          username: args.username,
          groups: [],
          friends: [],
          requests: [],
          personalInterests: [],
          }
          userlist.push(user)
          return user
      },

      deactivateAccount: (parent, args) => {
        if (userlist.length==1) {
          throw new Error("ID already deactivated");
        }  
        for (let i =1; i<userlist.length; i++) {
              if (userlist[i].uid===args.uid) {
                  let alpha = [...userlist]
                  userlist[i]=alpha[0]
                  userlist[0]=alpha[i]
                  userlist.shift()
                  return userlist;
              }
          }
          throw new Error("ID already deactivated");
      },

      updatePersonalInterests: (parent, args) => {
        if (args.personalInterests.length==0) {
          throw new Error("Please pick an interest")
        }
        for (let i =0; i<userlist.length; i++) {
            if (userlist[i].uid===args.uid) {
                userlist[i].personalInterests = args.personalInterests
                return userlist[i]
            }
        }
      },


        createGroup: (parent, args) => {
          let usr;
          for (let i =0; i<userlist.length; i++) {
            if (userlist[i].uid===args.uid) {
              if (userlist[i].personalInterests.length==0) {
                throw new Error("Please pick an interest first")
              }
              usr = userlist[i];
            }
        }
          let key = [args.game, args.groupSize];
          if (key in groupreqs) {
            urs = groupreqs[key];
            if (urs.includes(usr)) {
              throw new Error("Request being processed");
            }
            urs.push(usr);
            groupreqs[key] = urs;
            let max = groupreqs[key].length;
            if (max<args.groupSize) {
              return usr;
            }
            else {
              let found = false;
              let indxs = [];
              for (let i=0; i<args.groupSize-1; i++) {
                indxs.push[i];
                indxs[i]=i;
              }
              console.log(indxs[0]);
              console.log(urs);
              let common;
              let c;
              while (indxs[0]!=max-args.groupSize+1) {
                console.log(urs[max-1].personalInterests);
                let a = indxs[0];
                
                console.log(urs[a].personalInterests);
                for (let j=0; j<urs[a].personalInterests.length; j++) {
                  let passed = true;
                  console.log(urs[a].personalInterests[j]);
                  console.log(urs[max-1].personalInterests);
                  console.log(urs[max-1].personalInterests.includes(
                    urs[a].personalInterests[j]));
                  for (let k=1; k<args.groupSize-1; k++) {
                    let b = indxs[k];
                    if (urs[b].personalInterests.includes(
                      urs[a].personalInterests[j])) {
                        continue;
                      } else {passed = false; break;}
                  }
                  if (passed) {
                    if (urs[max-1].personalInterests.includes(
                      urs[a].personalInterests[j])) {
                        found = true;
                        c= indxs[0];
                        indxs[0]=max-args.groupSize+1;
                        common = urs[a].personalInterests[j];
                        j=urs[a].personalInterests.length;
                        break;
                      }
                  }
                }
                if (!found) {
                indxs[args.groupSize-2] = indxs[args.groupSize-2]+1;
                for (let m=indxs.length-1; m>0; m--) {
                  if (indxs[m]>=max-(indxs.length-m)) {
                    for (let g=0; g<=indxs.length-m; g++) {
                      indxs[m-1+g] = indxs[m-1] + g+1;
                    }
                  }
                } }
              }
              if (!found) {
                return usr;
              } else {
                let memb = [];
                indxs[0]=c;
                for (let i=0; i<indxs.length; i++) {
                  memb.push(urs[indxs[i]]);
                }
                let usersclone = [...urs];
                for (let i=0; i<indxs.length; i++) {
                  urs[0]=usersclone[indxs[i]-i];
                  urs[indxs[i]-i]=usersclone[0];
                  urs.shift();
                }
                memb.push(urs.pop());
                groupreqs[key]=urs;
                const group = {
                  gid: `group-${gidCount++}`,
                  members: memb,
                  name: `${memb[0].username}'s ${common} group for ${args.game}`,
                  link: "",
                  game: args.game,
                  messages: []
                }
                for (let k=0; k<memb.length; k++) {
                  memb[k].groups.push(group);
                }
                return memb[0];
  
              }
            }
          } else {
            groupreqs[key] = [usr]
            return usr;
          }
        },

      leaveGroup: (parent, args) => {
        for (let j=0; j<grouplist.length; j++) {
          if (grouplist[j].gid===args.gid) {
            let delta = [...grouplist[j].members]
            for (let i=0; i<delta.length; i++) {
              if (delta[i].uid===args.uid) {
                grouplist[j].members[0]=delta[i];
                grouplist[j].members[i]=delta[0];
                grouplist[j].members.shift();
                const message = {
                  sender: delta[i],
                  content: `${delta[i].username} has left the chat`,
                  time: new Date().toDateString
                }
                grouplist[j].messages.push(message);
                for(let k=0; k<grouplist[j].members.length; k++) {
                  let person = grouplist[j].members[k];
                  let found = false;
                  let pgroups = [...person.groups]
                  for (let m=0; m<person.groups.length-1;m++) {
                      if (person.groups[m].gid===args.gid) {
                        found = true;
                      }
                      if (found) {
                        person.groups[m] = pgroups[m+1];
                        person.groups[m+1] = pgroups[m];
                      }
                  }
                }
              }
            }
          }
        }
        for (let g=0; g<userlist.length; g++) {
          if (userlist[g].uid===args.uid) {
            let ugroups = [...userlist[g].groups]
            for (let h=0; h<userlist[g].groups.length; h++) {
              if (userlist[g].groups[h].gid===args.gid) {
                userlist[g].groups[h]=ugroups[0];
                userlist[g].groups[0]=ugroups[h];
                userlist[g].groups.shift();
                return userlist[g];
              }
            }
          }
        }
      },

      sendMessage: (parent, args) => {
        for (let j=0; j<userlist.length; j++) {
          if (userlist[j].uid===args.uid) {
            for (let i=0; i<userlist[j].groups.length;i++) {
              if (userlist[j].groups[i].gid===args.gid) {
                const message = {
                  sender: userlist[j],
                  content: args.content,
                  time: new Date().toDateString
                }
                userlist[j].groups[i].messages.push(message);
                for (let k=0; k<userlist[j].groups[i].members.length; k++) {
                  let person = userlist[j].groups[i].members[k];
                  let found = false;
                  let pgroups = [...person.groups]
                  for (let m=0; m<person.groups.length-1;m++) {
                      if (person.groups[m].gid===args.gid) {
                        found = true;
                      }
                      if (found) {
                        person.groups[m] = pgroups[m+1];
                        person.groups[m+1] = pgroups[m];
                      }
                  }
                }
                return userlist[j]
              }
            }
          }
        }
        
      },

      changePassword: (parent, args) => {
        for (let i=0; i<userlist.length; i++) {
          if (userlist[i].uid===args.uid) {
            if (args.password.length<8) {
              throw new Error("Pick a longer password");
            } else if (args.password===userlist[i].password) {
              throw new Error("Pick a different password") 
            } else {
              userlist[i].password=args.password;
              return userlist[i];
            }
          }
        }
      },

      renameGroup: (parent, args) => {
        for (let j=0; j<userlist.length; j++) {
          if (userlist[j].uid===args.uid) {
            for (let i=0; i<userlist[j].groups.length;i++) {
              if (userlist[j].groups[i].gid===args.gid) {
                userlist[j].groups[i].name=args.name;
                const message = {
                  sender: userlist[j],
                  content: `${userlist[j].username} renamed the group to ${args.name}`,
                  time: new Date().toDateString
                }
                userlist[j].groups[i].messages.push(message);
                for (let k=0; k<userlist[j].groups[i].members.length; k++) {
                  let person = userlist[j].groups[i].members[k];
                  let found = false;
                  let pgroups = [...person.groups]
                  for (let m=0; m<person.groups.length-1;m++) {
                      if (person.groups[m].gid===args.gid) {
                        found = true;
                      }
                      if (found) {
                        person.groups[m] = pgroups[m+1];
                        person.groups[m+1] = pgroups[m];
                      }
                  }
                }
                return userlist[j];
              }
            }
          }
        }
      },

      setLink: (parent, args) => {
        for (let j=0; j<userlist.length; j++) {
          if (userlist[j].uid===args.uid) {
            for (let i=0; i<userlist[j].groups.length;i++) {
              if (userlist[j].groups[i].gid===args.gid) {
                userlist[j].groups[i].link=args.link;
                const message = {
                  sender: userlist[j],
                  content: `${userlist[j].username} set a new link: ${args.link}`,
                  time: new Date().toDateString
                }
                userlist[j].groups[i].messages.push(message);
                for (let k=0; k<userlist[j].groups[i].members.length; k++) {
                  let person = userlist[j].groups[i].members[k];
                  let found = false;
                  let pgroups = [...person.groups]
                  for (let m=0; m<person.groups.length-1;m++) {
                      if (person.groups[m].gid===args.gid) {
                        found = true;
                      }
                      if (found) {
                        person.groups[m] = pgroups[m+1];
                        person.groups[m+1] = pgroups[m];
                      }
                  }
                }
                return userlist[j];
              }
            }
          }
        }
      },

      requestFriend: (parent, args) => {
        for (i=0; i<userlist.length; i++) {
          if (userlist[i].uid===args.uid) {
            for (j=0; j<userlist.length; j++) {
              if (userlist[j].username===args.username) {
                if (i===j) {
                  throw new Error("You're already friends with yourself!");
                } else if (userlist[i].friends.includes(userlist[j])) {
                  throw new Error("You're already friends with this person");
                }
                else {
                  if (userlist[j].requests.includes(userlist[i])) {
                    throw new Error("You've already sent a request");
                  }
                  userlist[j].requests.push(userlist[i]);
                  return userlist[i];
                  }
                }
              }
            }
          }
          throw new Error("User does not exist");
        },

        acceptFriend: (parent, args) => {
          for (i=0; i<userlist.length; i++) {
            if (userlist[i].uid===args.uid) {
              let ureqs = [...userlist[i].requests]
              for (j=0; j<userlist[i].requests.length; j++) {
                if (userlist[i].requests[j].username===args.from) {
                  userlist[i].friends.push(userlist[i].requests[j]);
                  userlist[i].requests[j].friends.push(userlist[i]);
                  userlist[i].requests[0]=ureqs[j];
                  userlist[i].requests[j]=ureqs[0];
                  userlist[i].requests.shift();
                  return userlist[i];
                }
              }
            }
        }
      },

        rejectFriend: (parent, args) => {
          for (i=0; i<userlist.length; i++) {
            if (userlist[i].uid===args.uid) {
              let ureqs = [...userlist[i].requests]
              for (j=0; j<userlist[i].requests.length; j++) {
                if (userlist[i].requests[j].username===args.from) {
                  userlist[i].requests[0]=ureqs[j];
                  userlist[i].requests[j]=ureqs[0];
                  userlist[i].requests.shift();
                  return userlist[i];
                }
              }
            }
        }
        },
  }
}

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const corsOptions = {
origin: 'http://localhost:3000',
credentials: true,
};

const server = new ApolloServer({ cors: corsOptions, typeDefs, resolvers});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

// Initialize the app
// const app = express();

// app.use(cors(corsOptions));

// // The GraphQL endpoint
// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// // GraphiQL, a visual editor for queries
// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// // Start the server
// app.listen(4000, () => {
//   console.log('Go to http://localhost:4000/graphiql to run queries!');
// });
