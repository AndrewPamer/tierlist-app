import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

import FriendCard from "@/components/friends/FriendCard";

import Search from "@/components/friends/Search";
import IncomingRequests from "@/components/friends/IncomingRequests";
import OutgoingRequests from "@/components/friends/OutgoingRequests";

async function removeFriend(friendID) {
  const supabase = createClient();

  const { error } = await supabase.rpc("remove_friend", {
    friend_id: friendID,
  });
}

async function getFriends() {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_friends");
  return data;
}

export default async function Friends() {
  const data = await getFriends();
  return (
    <section className="flex flex-col mt-3">
      {data.length !== 0 ? (
        <div className="flex flex-col">
          <h2 className="font-bold self-center">My Friends</h2>

          {data.map((friend) => {
            return (
              <FriendCard
                key={friend.friend_id}
                name={friend.friend_username}
                color={friend.color}
                buttons={[
                  {
                    buttonTitle: "Remove Friend",
                    popupTitle: `Remove ${friend.friend_username} as a friend`,
                    popupHeader: `Are you sure you want to remove ${friend.friend_username} as a friend?`,
                    popupAction: async () => {
                      "use server";

                      removeFriend(friend.friend_id);
                      revalidatePath("/account/friends");
                    },
                  },
                ]}
              />
            );
          })}
          <hr className="my-5" />
        </div>
      ) : null}
      <IncomingRequests />
      <OutgoingRequests />
      <Search />
    </section>
  );
}

// export default function Friends() {
//   console.log("Friends ran");
//   const supabase = createClient();
//   const user = getAuthContext();

//   const { data, isLoading, error, mutate } = useQuery(
//     supabase.rpc("get_friends"),
//     {
//       revalidateOnFocus: false,
//       revalidateOnReconnect: false,
//     }
//   );

//   // console.log(data, isLoading, error);

//   const { status } = useSubscription(
//     supabase,
//     "friend_db_changes",
//     {
//       event: "*",
//       schema: "public",
//       table: "friends",
//     },
//     ["userid1", "userid2"],
//     {
//       callback: (payload) => {
//         // console.log(payload);
//         mutate();
//       },
//     }
//   );

//   async function removeFriend(friend_id) {
//     try {
//       const { error } = await supabase.rpc("remove_friend", {
//         friend_id,
//       });

//       if (error) {
//         throw error;
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   }

//   if (isLoading) {
//     return "Loading...";
//   }

//   return (
//     <section className="flex flex-col  mt-3">
//       {data.length !== 0 ? (
//         <div className="flex flex-col">
//           <h2 className="font-bold self-center">My Friends</h2>

//           {data.map((friend) => {
//             return (
//               <FriendCard
//                 key={friend.friend_id}
//                 name={friend.friend_username}
//                 color={friend.color}
//                 buttons={[
//                   {
//                     buttonTitle: "Remove Friend",
//                     popupTitle: `Remove ${friend.friend_username} as a friend`,
//                     popupHeader: `Are you sure you want to remove ${friend.friend_username} as a friend?`,
//                     popupAction: () => removeFriend(friend.friend_id),
//                   },
//                 ]}
//               />
//             );
//           })}
//           <hr className="my-5" />
//         </div>
//       ) : null}
//       <IncomingRequests supabase={supabase} user={user} />
//       <OutgoingRequests supabase={supabase} user={user} />
//       <Search supabase={supabase} />
//     </section>
//   );
// }
