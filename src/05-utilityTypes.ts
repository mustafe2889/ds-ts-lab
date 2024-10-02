
import { friends, colleagues } from "./01-basics"; // Assume these are defined in your 01-basics.ts
import { Friend, Colleague, SecureFriendContact, FriendPartial, EventPass } from "./myTypes";

// Function to update a friend
function updateFriend(friend: Friend, updates: FriendPartial): Friend {
  return { ...friend, ...updates };
}

console.log(updateFriend(friends[0], {
  phone: '08712345',
  dob: new Date("1998-10-22") // Assuming dob is optional and in Friend
}));

// Function to securely find friends
function secureFindFriends(
  friends: Friend[],
  criteria: (f: Friend) => boolean
): SecureFriendContact[] {
  const matches = friends.filter(criteria);
  return matches.map((f) => {
    const secure: SecureFriendContact = {
      name: f.name,
      phone: f.phone,
    };
    return secure;
  });
}

let result = secureFindFriends(
  friends,
  (f: Friend) => f.age < 30
);
console.log(result);

// This line will cause a compiler error since SecureFriendContact is read-only
// result[0].phone = '08654321'; // Uncomment to see the error

// Function to generate an EventPass
function generateEventPass(colleague: Colleague): EventPass {
  const passCode = Math.round(Math.random() * (1000 - 1) + 1);
  return {
    name: colleague.name,
    department: colleague.department,
    passCode: passCode,
  };
}

console.log(generateEventPass(colleagues.current[0]));

// Complete the intersection function
type IntersectionType = {
  name: string;
  age: number;
  email: string;
  extension: number;
};

function intersection(
  friends: Friend[],
  colleagues: Colleague[]
): IntersectionType[] {
  let result: IntersectionType[] = [];
  friends.reduce((res, friend) => {
    const colleague = colleagues.find((col) => col.name === friend.name);
    if (colleague) {
      // Colleague is also a Friend
      res.push({
        name: friend.name,
        age: friend.age,
        email: colleague.contact.email,
        extension: colleague.contact.extension,
      });
    }
    return res;
  }, result);
  return result;
}

console.log(intersection(friends, colleagues.current));
